const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const Mailjet = require("node-mailjet");
const { onCall } = require("firebase-functions/v2/https"); 


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

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

    const orderId = `order_${Date.now()}`;
    const productNames = cartItems.map((item) => item.titulo || item.name).join(", ");

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: orderId,
        customer_email: customerEmail || "",
        customer_name: customerName || "",
        product_names: productNames,
        total_amount: (amount / 100).toString(),
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
 
  const mailjetApiKey = functions.config().mailjet.api_key;
  const mailjetApiSecret = functions.config().mailjet.api_secret;

  if (!mailjetApiKey || !mailjetApiSecret) {
    console.error("Faltan las claves de Mailjet en la configuración de Firebase Functions.");
    throw new functions.https.HttpsError(
      "internal",
      "Mailjet no está configurado correctamente en Firebase Functions. Por favor, configura 'mailjet.api_key' y 'mailjet.api_secret'."
    );
  }

  const mailer = new Mailjet({ apiKey: mailjetApiKey, apiSecret: mailjetApiSecret });
  const { to, subject, htmlContent } = request.data;

  if (
    !Array.isArray(to) ||
    to.length === 0 ||
    to.some((r) => !r?.email || !r.email.includes("@"))
  ) {
    throw new functions.https.HttpsError(
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
          // agregar texto plano si es que lo necesito, revisar con flor 
        },
      ],
    };

    const response = await mailer.post("send", { version: "v3.1" }).request(messagePayload);

    console.log("Respuesta de Mailjet:", JSON.stringify(response.body, null, 2));

    if (response.body && response.body.Messages && response.body.Messages[0].Status === "success") {
      return {
        status: "success",
        message: "Email enviado exitosamente",
        data: response.body, 
      };
    } else {
      const mailjetErrorMessage = response.body?.Messages?.[0]?.Errors?.[0]?.ErrorMessage || "Error desconocido en Mailjet.";
      console.error("Mailjet no reportó éxito en el envío:", JSON.stringify(response.body, null, 2));
      throw new functions.https.HttpsError(
        "internal",
        `Mailjet no pudo enviar el email: ${mailjetErrorMessage}`
      );
    }
  } catch (error) {
    console.error("Error al enviar email (catch general):", error);
    const errorMessage = error.statusCode
      ? `Mailjet API Error (${error.statusCode}): ${error.message || JSON.stringify(error)}`
      : error.message;

    throw new functions.https.HttpsError("internal", errorMessage || "Error interno al enviar email.");
  }
});

exports.api = functions.https.onRequest(app);
exports.sendEmailFunction = sendEmailFunction;