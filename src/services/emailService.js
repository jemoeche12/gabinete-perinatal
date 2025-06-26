import { functions, httpsCallable } from "../config/firebaseConfig";

export async function sendEmailFromClient({ to, subject, htmlContent }) {
  try {
    const callSendEmailFunction = httpsCallable(functions, "sendEmailFunction");
    const result = await callSendEmailFunction({ to, subject, htmlContent });
    return result.data;
  } catch (error) {
    throw error;
  }
}
