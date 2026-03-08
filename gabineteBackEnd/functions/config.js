import { config } from "dotenv";
config();

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
export const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;
export const EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
export const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
export const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY;
export const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET;

