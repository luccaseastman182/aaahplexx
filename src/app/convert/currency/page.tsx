// CODED BY: LUCCAS EASTMAN
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/**
 * For a real production application, you'll typically fetch exchange rates from a reliable API.
 * In this example, we demonstrate a minimal approach using ExchangeRatesAPI (or similar).
 *
 * Steps to use with a real API:
 * - Provide your API key via environment variables (e.g., process.env.EXCHANGE_RATES_API_KEY)
 * - Uncomment the fetch call in  to retrieve real-time data
 * - Replace the base URL and params with your chosen API's endpoint
 */

export default function CurrencyConverterPage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>(["USD", "EUR", "GBP", "JPY"]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [convertedValue, setConvertedValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Example fallback rates if we cannot fetch from an external API:
  const fallbackRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.81,
    JPY: 129.18,
  };

  useEffect(() => {
    /**
     * NOTE: For a real production environment, fetch your exchange rates from an API:
     *
     * fetch(`https://api.exchangeratesapi.io/latest?base=USD&apikey=${process.env.EXCHANGE_RATES_API_KEY}`)
     *   .then((res) => res.json())
     *   .then((data) => {
     *     setRates(data.rates || {});
     *     setSupportedCurrencies(Object.keys(data.rates));
     *   })
     *   .catch((err) => {
     *     console.error("Failed to fetch currency data:", err);
     *     setRates(fallbackRates);
     *     setError("Unable to fetch live exchange rates. Using fallback data.");
     *   });
     *
     * For demonstration, we'll mimic the data load using fallbackRates.
     */
    setRates(fallbackRates);
    setSupportedCurrencies(Object.keys(fallbackRates));
  }, []);

  const handleConvert = () => {
    try {
      if (!rates[fromCurrency] || !rates[toCurrency]) {
        throw new Error("Unsupported currency or missing exchange rate data.");
      }
      const baseValueInUSD = amount / rates[fromCurrency]; 
      const result = baseValueInUSD * rates[toCurrency];
      setConvertedValue(result);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setConvertedValue(0);
    }
  };

  return (
    <div className="container space-y-6 py-6">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Convert between different world currencies. This example uses fallback data but can be configured for real-time rates.
          </p>
          {/* From Currency */}
          <div className="grid gap-2">
            <Label>From Currency</Label>
            <Select value={fromCurrency} onValueChange={(val) => { setFromCurrency(val); setConvertedValue(0); }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((cur) => (
                  <SelectItem key={cur} value={cur}>
                    {cur}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* To Currency */}
          <div className="grid gap-2">
            <Label>To Currency</Label>
            <Select value={toCurrency} onValueChange={(val) => { setToCurrency(val); setConvertedValue(0); }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((cur) => (
                  <SelectItem key={cur} value={cur}>
                    {cur}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Amount */}
          <div className="grid gap-2">
            <Label htmlFor="amountInput">Amount</Label>
            <Input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setConvertedValue(0);
              }}
              className="w-full md:w-[200px]"
            />
          </div>
          {/* Convert Button */}
          <Button onClick={handleConvert} className="mt-4">
            Convert
          </Button>
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 border border-red-300 bg-red-50 text-red-700 rounded-md">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}
          {/* Result */}
          {convertedValue !== 0 && !error && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
              <p className="font-semibold">
                {amount} {fromCurrency} = {convertedValue.toFixed(4)} {toCurrency}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
