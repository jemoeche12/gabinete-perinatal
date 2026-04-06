import { useState, useEffect, useRef } from "react";

const API_BASE_URL = "https://api-yela3b24ha-uc.a.run.app";
const MEMORY_TTL_MS = 10 * 60 * 1000;

const countryToCurrency = {
  AR: "ARS",
  ES: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  US: "USD",
};
function resolveCurrency(provider, country){
            if(provider === "mercadopago" ) return "ARS";
            return getCurrencyForCountry(country); 
        };

const getCurrencyForCountry = (countryCode) => {
  return countryToCurrency[countryCode] || "EUR";
};

let memoryCache = null;

export function usePaymentProvider(idToken = null) {
  const [provider, setProvider] = useState(null);
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState("EUR");
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
          setCurrency(memoryCache.currency);
          setLoading(false);
        }
        return;
      }

      try {
        const headers = {};

        if (idToken) {
          headers["Authorization"] = `Bearer ${idToken}`;
        }

        const response = await fetch(`${API_BASE_URL}/get-payment-provider`, {
          headers,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const resolvedProvider =
          data.provider === "mercadopago" ? "mercadopago" : "stripe";

        
        const resolvedCurrency = resolveCurrency(resolvedProvider, data.country);

        memoryCache = {
          provider: resolvedProvider,
          country: data.country,
          currency: resolvedCurrency,
          at: Date.now(),
        };

        if (mounted.current) {
          setProvider(resolvedProvider);
          setCountry(data.country);
          setCurrency(resolvedCurrency);
          setLoading(false);
        }
      } catch (err) {
        console.error("usePaymentProvider error:", err);
        if (mounted.current) {
          setProvider("stripe");
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

  return { provider, country, currency, loading, error };
}
