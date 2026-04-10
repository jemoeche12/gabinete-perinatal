const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const Mailjet = require("node-mailjet");
const {
  onRequest,
  onCall,
  HttpsError,
} = require("firebase-functions/v2/https");

const { MercadoPagoConfig, Payment } = require("mercadopago");
const crypto = require("crypto");
const path = require("path");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const mailjetApiKey = process.env.MAILJET_API_KEY;
const mailjetApiSecret = process.env.MAILJET_API_SECRET;

const mpAccessToken = process.env.MP_ACCESS_TOKEN;
const mpWebhookSecret = process.env.MP_WEBHOOK_SECRET;
const mpPublicKey = process.env.MP_PUBLIC_KEY;

const app = express();
app.use(cors({ origin: true }));

const admin = require("firebase-admin");
if (!admin.apps.length) admin.initializeApp();

const mpClient = new MercadoPagoConfig({ accessToken: mpAccessToken });
const mpPayment = new Payment(mpClient);

app.use(express.static(path.join(__dirname, "public")));

const sendEmailFromClient = async ({ email, subject, body }) => {
  return Promise.resolve();
};

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.post("/webhook", async (request, response) => {
  const signature = request.headers["stripe-signature"];
  let event;

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20",
  });

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      signature,
      stripeWebhookSecret,
    );
  } catch (err) {
    console.error("⚠️  Error verificando firma del webhook:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.order_id;
      const customerEmail = paymentIntent.metadata.customer_email;
      const customerName = paymentIntent.metadata.customer_name;
      const totalAmount = paymentIntent.metadata.total_amount;

      try {
        await admin.database().ref(`/ordenes/${orderId}`).update({
          estado: "pagado",
          fecha_pago: Date.now(),
        });

        await sendEmailFromClient({
          email: customerEmail,
          subject: "Pago exitoso",
          body: `Hola ${customerName}, tu pago de $${totalAmount} ha sido recibido con éxito. Gracias por tu compra!`,
        });

        await sendEmailFromClient({
          email: "florenciavelascopsi@hotmail.com",
          subject: "Nueva orden",
          body: `Se ha recibido una nueva orden: ${orderId}`,
        });
      } catch (error) {
        console.error(`❌ Error actualizando orden ${orderId}:`, error);
      }

      break;
    }

    case "payment_method.attached": {
      const paymentMethod = event.data.object;

      break;
    }

    default:
  }

  response.json({ received: true });
});

app.post("/create-payment-intent", async (req, res) => {
  if (!stripeSecretKey) {
    console.error("Falta STRIPE_SECRET_KEY en las variables de entorno.");
    return res.status(500).json({ error: "Stripe no está configurado." });
  }

  const stripe = stripeSecretKey
    ? new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })
    : null;

  try {
    const {
      amount,
      currency,
      cartItems,
      customerEmail,
      customerName,
      membresiaActual,
    } = req.body;

    let amountFinal = amount;

    if (
      membresiaActual &&
      membresiaActual.fechaFin &&
      membresiaActual.amount > 0
    ) {
      const ahora = Date.now();
      const diasRestantes =
        (membresiaActual.fechaFin - ahora) / (1000 * 60 * 60 * 24);

      if (diasRestantes > 0) {
        const creditoDiario =
          membresiaActual.amount / membresiaActual.diasTotales;
        const creditoRestante = creditoDiario * diasRestantes;
        amountFinal = Math.max(0, amount - creditoRestante / 100);
      }
    }

    if (!currency) {
      return res.status(400).json({ error: "Currency es requerida" });
    }

    const amountInCents = Math.round(amountFinal * 100);

    const orderId = `order_${Date.now()}`;
    const productNames = cartItems
      .map((item) => item.titulo || item.name)
      .join(", ");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: orderId,
        customer_email: customerEmail || "",
        customer_name: customerName || "",
        product_names: productNames,
        total_amount: amount.toString(),
        integration_check: "accept_a_payment",
        type: "membresia",
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error en /create-payment-intent:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
});

app.post("/create-mp-order", async (req, res) => {
  const { amount, customerEmail, customerName, cartItems } = req.body;

  if (!amount || !customerEmail || !customerName) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  try {
    const description = cartItems
      ?.map((item) => item.titulo || item.name)
      .join(", ");

    const orderRef = admin.database().ref("/ordenes").push();
    await orderRef.set({
      estado: "pending",
      metodo: "mercado_pago",
      amount,
      customerEmail,
      customerName,
      description,
      cartItems: cartItems || [],
      createdAt: Date.now(),
    });

    res.json({ orderId: orderRef.key, publicKey: mpPublicKey });
  } catch (error) {
    console.error("Error creando orden de Mercado Pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/create-mercadopago-payment", async (req, res) => {
  const { token, paymentMethod, payer, orderId } = req.body;

  if (!token || !paymentMethod || !payer || !orderId) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const orderSnap = await admin
      .database()
      .ref(`ordenes/${orderId}`)
      .once("value");
    if (!orderSnap.exists()) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    const orderData = orderSnap.val();

    const order = await mpPayment.create({
      body: {
        transaction_amount: orderData.amount,
        token,
        description: orderData.description,
        installments: 1,
        payment_method_id: paymentMethod,
        payer: {
          email: orderData.customerEmail,
        },
        metadata: {
          order_id: orderId,
        },
      },
    });
    res.json({
      status: order.status,
      id: order.id,
    });
  } catch (error) {
    console.error("Error creando pago MP:", JSON.stringify(error));
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  console.error("Error no manejado en Express:", error);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.post("/mercadopago-webhook", async (req, res) => {
  const xSignature = req.headers["x-signature"];
  const xRequestId = req.headers["x-request-id"];
  const dataId = req.query["data.id"];

  if (xSignature && mpWebhookSecret) {
    const parts = {};
    xSignature.split(",").forEach((part) => {
      const [key, value] = part.trim().split("=");
      parts[key] = value;
    });

    const { ts, v1 } = parts;

    if (ts && v1) {
      const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
      const hmac = crypto.createHmac("sha256", mpWebhookSecret);
      hmac.update(manifest);
      const expectedSignature = hmac.digest("hex");

      if (expectedSignature !== v1) {
        console.warn("Webhook MP con firma inválida");
        return res.sendStatus(401);
      }
    }
  }

  try {
    const type = req.query.type || req.body?.type;

    if (type !== "payment") return res.sendStatus(200);
    if (!dataId) return res.sendStatus(200);

    const payment = await mpPayment.get({ id: dataId });

    const orderId = payment.metadata?.order_id;
    if (!orderId) return res.sendStatus(200);

    const orderRef = admin.database().ref(`/ordenes/${orderId}`);
    const orderSnap = await orderRef.once("value");

    if (!orderSnap.exists()) {
      console.error(`Orden ${orderId} no encontrada`);
      return res.sendStatus(200);
    }

    const order = orderSnap.val();

    if (order.estado === "pagado") return res.sendStatus(200);

    if (payment.status === "approved") {
      await orderRef.update({
        estado: "pagado",
        fecha_pago: Date.now(),
        mp_payment_id: payment.id,
      });
    } else if (payment.status === "rejected") {
      await orderRef.update({
        estado: "rechazado",
        mp_payment_id: payment.id,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook MP:", error);
    res.sendStatus(500);
  }
});

const sendEmailFunction = onCall(
  {
    secrets: ["MAILJET_API_KEY", "MAILJET_API_SECRET"],
  },
  async (request) => {
    const mailjetApiKey = process.env.MAILJET_API_KEY;
    const mailjetApiSecret = process.env.MAILJET_API_SECRET;

    if (!mailjetApiKey || !mailjetApiSecret) {
      console.error(
        "Faltan las claves de Mailjet en la configuración de Firebase Functions.",
      );
      throw new HttpsError(
        "failed-precondition",
        "Mailjet no está configurado correctamente en Firebase Functions. Por favor, configura 'MAILJET_API_KEY' y 'MAILJET_API_SECRET'.",
      );
    }

    const mailer = new Mailjet({
      apiKey: mailjetApiKey,
      apiSecret: mailjetApiSecret,
    });

    const { to, subject, htmlContent } = request.data;

    if (
      !Array.isArray(to) ||
      to.length === 0 ||
      to.some((r) => !r?.email || !r.email.includes("@"))
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Destinatarios de email inválidos. Se requiere un array de objetos con propiedad 'email'.",
      );
    }

    try {
      const messagePayload = {
        Messages: [
          {
            From: {
              email: "info@redperinataldigital.com",
              name: "Red Perinatal Digital",
            },
            To: to.map((recipient) => ({
              email: recipient.email,
              name: recipient.name || "",
            })),
            Subject: subject,
            HTMLPart: htmlContent,
          },
        ],
      };

      const response = await mailer
        .post("send", { version: "v3.1" })
        .request(messagePayload);

      if (
        response.body &&
        response.body.Messages &&
        response.body.Messages[0].Status === "success"
      ) {
        return {
          status: "success",
          message: "Email enviado exitosamente",
          data: response.body,
        };
      } else {
        const mailjetErrorMessage =
          response.body?.Messages?.[0]?.Errors?.[0]?.ErrorMessage ||
          "Error desconocido en Mailjet.";
        console.error(
          "Mailjet no reportó éxito en el envío:",
          JSON.stringify(response.body, null, 2),
        );
        throw new HttpsError(
          "internal",
          `Mailjet no pudo enviar el email: ${mailjetErrorMessage}`,
        );
      }
    } catch (error) {
      console.error("Error al enviar email (catch general):", error);
      const errorMessage = error.statusCode
        ? `Mailjet API Error (${error.statusCode}): ${
            error.message || JSON.stringify(error)
          }`
        : error.message;

      throw new HttpsError(
        "internal",
        errorMessage || "Error interno al enviar email.",
      );
    }
  },
);

exports.api = onRequest(
  {
    secrets: [
      "MP_ACCESS_TOKEN",
      "MP_PUBLIC_KEY",
      "MP_WEBHOOK_SECRET",
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
    ],
  },
  app,
);
exports.sendEmailFunction = sendEmailFunction;
