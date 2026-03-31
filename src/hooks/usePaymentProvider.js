import { useState, useEffect, useRef } from "react";

const API_BASE_URL = "https://api-yela3b24ha-uc.a.run.app";
const MEMORY_TTL_MS = 10 * 60 * 1000; 

let memoryCache = null;

export function usePaymentProvider(idToken = null) {
  const [provider, setProvider] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function resolve() {
      if (memoryCache && Date.now() - memoryCache.at < MEMORY_TTL_MS) {
        if (mounted.current) {
          setProvider(memoryCache.provider);
          setCountry(memoryCache.country);
          setLoading(false);
        }
        return;
      }

      try {
        const headers = {};

        if (idToken) {
          headers["Authorization"] = `Bearer ${idToken}`;
        }

        const response = await fetch(`${API_BASE_URL}/get-payment-provider`, { headers });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const resolvedProvider = data.provider === "mercadopago" ? "mercadopago" : "stripe";

        memoryCache = { provider: resolvedProvider, country: data.country, at: Date.now() };

        if (mounted.current) {
          setProvider(resolvedProvider);
          setCountry(data.country);
          setLoading(false);
        }
      } catch (err) {
        console.error("usePaymentProvider error:", err);
        if (mounted.current) {
          setProvider("stripe"); // fallback seguro
          setError(err);
          setLoading(false);
        }
      }
    }

    resolve();

    return () => {
      mounted.current = false;
    };
  }, [idToken]);


  return { provider, country, loading, error };
}