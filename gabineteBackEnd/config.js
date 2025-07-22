import { config } from "dotenv";
config();

export const PORT = process.env.PORT || "http://192.168.1.20:3000/create-payment-intent";

