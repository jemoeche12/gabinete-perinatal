const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const Mailjet = require("node-mailjet");
const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");

const stripeSecretKey = "sk_test_51RgMQYFJ1XWiS5lgSH6lIeJxFIuVj6eLvn2oLRRYCFLpGG6dmNs7qC08eZB54J130KR6H8XcKRaL9SRfH27FkP0O009PZXRiqN";
const stripeWebhookSecret = "whsec_OPmKusDitS57VinkAcZOj0rduFu2Ocr9";
const mailjetApiKey = "3326de0752c681ca2eda3da28b76ecfd";
const mailjetApiSecret = "a49d76568733421067b6ebb48844059b";

const app = express();
app.use(cors({ origin: true }));

const admin = require("firebase-admin");
if (!admin.apps.length) admin.initializeApp();

const sendEmailFromClient = async ({ email, subject, body }) => {
 
  return Promise.resolve();
};

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
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
      stripeWebhookSecret
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

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20",
  });

  try {
    const { amount, currency, cartItems, customerEmail, customerName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "El monto debe ser mayor a 0" });
    }

    if (!currency) {
      return res.status(400).json({ error: "Currency es requerida" });
    }

    const amountInCents = Math.round(amount * 100);

    

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
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error en /create-payment-intent:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  console.error("Error no manejado en Express:", error);
  res.status(500).json({ error: "Error interno del servidor" });
});

const sendEmailFunction = onCall(async (request) => {
  if (!mailjetApiKey || !mailjetApiSecret) {
    console.error(
      "Faltan las claves de Mailjet en la configuración de Firebase Functions."
    );
    throw new HttpsError(
      "failed-precondition",
      "Mailjet no está configurado correctamente en Firebase Functions. Por favor, configura 'MAILJET_API_KEY' y 'MAILJET_API_SECRET'."
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
      "Destinatarios de email inválidos. Se requiere un array de objetos con propiedad 'email'."
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
        JSON.stringify(response.body, null, 2)
      );
      throw new HttpsError(
        "internal",
        `Mailjet no pudo enviar el email: ${mailjetErrorMessage}`
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
      errorMessage || "Error interno al enviar email."
    );
  }
});

exports.api = onRequest(app);
exports.sendEmailFunction = sendEmailFunction;