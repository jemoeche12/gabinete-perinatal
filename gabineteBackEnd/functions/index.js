const functions = require("firebase-functions");
const Mailjet = require("node-mailjet");
const {onCall} = require("firebase-functions/v2/https");

exports.sendEmailFunction = onCall(async (request) => {
  const mailer = new Mailjet({
    apiKey: "3326de0752c681ca2eda3da28b76ecfd",
    apiSecret: "a49d76568733421067b6ebb48844059b",
  });

  const {to, subject, htmlContent} = request.data;

  console.log("Datos recibidos:", JSON.stringify({to, subject}, null, 2));

  if (
    !Array.isArray(to) ||
    to.length === 0 ||
    to.some(
        (r) =>
          !r ||
        typeof r !== "object" ||
        typeof r.email !== "string" ||
        !r.email.trim() ||
        !r.email.includes("@"),
    )
  ) {
    console.error("Destinatarios inválidos:", JSON.stringify(to, null, 2));
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Uno o más destinatarios tienen un email inválido o vacío.",
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

    console.log("Payload enviado:", JSON.stringify(messagePayload, null, 2));

    const mailjetResponse = await mailer
        .post("send", {version: "v3.1"})
        .request(messagePayload);

    console.log("mail enviado exitosamente:", mailjetResponse.body);

    return {
      status: "success",
      message: "Email enviado exitosamente",
      data: mailjetResponse.body,
    };
  } catch (error) {
    console.error(
        "ERROR DE MAILJET:",
        error.message,
        "Status Code:",
        error.statusCode,
        "Body:",
    );

    throw new functions.https.HttpsError(
        "internal",
        "Error al enviar el correo electrónico: " + error.message,
    );
  }
});
