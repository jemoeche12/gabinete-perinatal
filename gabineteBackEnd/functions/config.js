import { config } from "dotenv";
config();

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
export const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;
export const EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
