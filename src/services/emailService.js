import { functions, httpsCallable } from '../config/firebaseConfig';


export async function sendEmailFromClient({ to, subject, htmlContent }) {

    console.log(to, subject, htmlContent)
    try {
        const callSendEmailFunction = httpsCallable(functions, 'sendEmailFunction');

        const result = await callSendEmailFunction({ to, subject, htmlContent });


        console.log("Respuesta de Cloud Function:", result.data);
        return result.data; 
    } catch (error) {
        console.error("Error al llamar a la Cloud Function sendEmailFunction:", error.message);
        if (error.code) {
            console.error("Código de error de Cloud Function:", error.code);
        }
        throw error;
    }
}