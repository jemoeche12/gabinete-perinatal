import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51RgMQYFJ1XWiS5lgSH6lIeJxFIuVj6eLvn2oLRRYCFLpGG6dmNs7qC08eZB54J130KR6H8XcKRaL9SRfH27FkP0O009PZXRiqN');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

app.post('/create-payment-intent', async (req, res) => {
  try {
       
    const { amount, currency } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'El monto debe ser mayor a 0' 
      });
    }

    if (!currency) {
      return res.status(400).json({ 
        error: 'Currency es requerida' 
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    

    res.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
  
    
    res.status(500).json({ 
      error: error.message || 'Error interno del servidor'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, '0.0.0.0', () => {
 
  if (!process.env.STRIPE_SECRET_KEY && !stripe._api.auth.includes('sk_')) {
    console.warn('⚠️  ADVERTENCIA: No se detectó una clave de Stripe válida');
  }
});

export default app;