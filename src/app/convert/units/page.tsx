// CODED BY: LUCCAS EASTMAN
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A dictionary of unit conversion factors relative to a base unit for each category.
 * For example, length uses meters as the base unit, temperature uses Celsius, etc.
 */
const unitConversionData = {
  length: {
    base: "meter",
    units: {
      meter: 1,
      kilometer: 0.001,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701,
      centimeter: 100,
    },
  },
  weight: {
    base: "kilogram",
    units: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
    },
  },
  temperature: {
    // Temperature conversions require different formulas rather than simple factors.
    // We'll handle them in a custom function below.
    base: "celsius",
    units: ["celsius", "fahrenheit", "kelvin"],
  },
};

type Category = "length" | "weight" | "temperature";

/**
 * Converts temperature from a source unit to a target unit.
 * @param value - The numeric temperature value.
 * @param from - Source unit ("celsius" | "fahrenheit" | "kelvin").
 * @param to - Target unit ("celsius" | "fahrenheit" | "kelvin").
 * @returns The converted temperature value.
 */
function convertTemperature(value: number, from: string, to: string): number {
  // Convert from source unit to Celsius
  let celsiusValue: number;
  if (from === "celsius") {
    celsiusValue = value;
  } else if (from === "fahrenheit") {
    celsiusValue = (value - 32) * (5 / 9);
  } else {
    // from === "kelvin"
    celsiusValue = value - 273.15;
  }

  // Convert from Celsius to target unit
  if (to === "celsius") {
    return celsiusValue;
  } else if (to === "fahrenheit") {
    return celsiusValue * (9 / 5) + 32;
  } else {
    // to === "kelvin"
    return celsiusValue + 273.15;
  }
}

/**
 * Generic function to handle length or weight conversions using a factor approach.
 * @param value - numeric value
 * @param from - source unit
 * @param to - target unit
 * @param conversionData - the unit data object (e.g., unitConversionData.length)
 * @returns The converted numeric value
 */
function convertByFactor(
  value: number,
  from: string,
  to: string,
  conversionData: { base: string; units: Record<string, number> }
): number {
  // Convert from "from" unit to base
  const toBase = value / conversionData.units[from];
  // Convert base to "to" unit
  return toBase * conversionData.units[to];
}

export default function UnitsConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("kilometer");
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const categories: Category[] = ["length", "weight", "temperature"];

  // Dynamically get units for the current category
  const getUnits = () => {
    if (category === "temperature") {
      return unitConversionData.temperature.units;
    } else if (category === "length") {
      return Object.keys(unitConversionData.length.units);
    } else {
      // weight
      return Object.keys(unitConversionData.weight.units);
    }
  };

  const onConvert = () => {
    // Temperature requires a special function
    if (category === "temperature") {
      const convertedTemp = convertTemperature(Number(inputValue), fromUnit, toUnit);
      setResult(convertedTemp);
      return;
    }
    // length or weight => factor-based
    const data = unitConversionData[category];
    if ("units" in data) {
      const convertedValue = convertByFactor(Number(inputValue), fromUnit, toUnit, data);
      setResult(convertedValue);
    }
  };

  return (
    <div className="container space-y-6 py-6">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Convert between various units of measurement. Select a category, then pick the source unit and target unit.
          </p>
          {/* Category Selection */}
          <div className="grid gap-2">
            <Label htmlFor="categorySelect">Category</Label>
            <Select
              onValueChange={(val) => {
                setCategory(val as Category);
                // Reset from/to units to first 2 for that category
                const units = category === "temperature"
                  ? unitConversionData.temperature.units
                  : Object.keys(unitConversionData[val].units);
                setFromUnit(units[0]);
                setToUnit(units[1]);
                setResult(0);
              }}
              defaultValue={category}
            >
              <SelectTrigger id="categorySelect" className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem value={cat} key={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* From/To Units */}
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1 space-y-2">
              <Label>From Unit</Label>
              <Select
                onValueChange={(val) => {
                  setFromUnit(val);
                  setResult(0);
                }}
                value={fromUnit}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUnits().map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label>To Unit</Label>
              <Select
                onValueChange={(val) => {
                  setToUnit(val);
                  setResult(0);
                }}
                value={toUnit}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUnits().map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Input Value */}
          <div className="grid gap-2 mt-2">
            <Label htmlFor="valueInput">Value</Label>
            <Input
              id="valueInput"
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(Number(e.target.value));
                setResult(0);
              }}
              className="w-full md:w-[200px]"
            />
          </div>
          {/* Convert Button */}
          <Button onClick={onConvert} className="mt-4">
            Convert
          </Button>
          {/* Result */}
          {result !== 0 && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
              <p className="font-semibold">
                Result: {result.toFixed(4)} {toUnit}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
