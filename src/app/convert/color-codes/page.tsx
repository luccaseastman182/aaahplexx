// CODED BY: LUCCAS EASTMAN
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * ColorCodesConverterPage Component
 * Convert between HEX, RGB, and HSL color codes in a minimal, production-ready manner.
 */

/**
 * parseHexToRgb
 * @param hex - string, e.g. "#FF0000"
 * @returns { r: number; g: number; b: number } or throws error
 */
function parseHexToRgb(hex: string) {
  let cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    // Convert shorthand (e.g. #F00) to full form (#FF0000)
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error("Invalid HEX color format.");
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * rgbToHex
 * @param r - red
 * @param g - green
 * @param b - blue
 * @returns "#RRGGBB"
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (num: number) => {
    const hexVal = num.toString(16).toUpperCase();
    return hexVal.length === 1 ? "0" + hexVal : hexVal;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

/**
 * rgbToHsl
 * @param r - red (0-255)
 * @param g - green (0-255)
 * @param b - blue (0-255)
 * @returns HSL string "hsl(H, S%, L%)"
 */
function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h: number = 0, s: number = 0, l: number = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * parseRgbString
 * Expects a string like "255, 0, 0" or "255 0 0" or "255,0,0"
 * @returns { r, g, b } or throws error
 */
function parseRgbString(rgbString: string) {
  const parts = rgbString.split(/[\s,]+/).map((val) => parseInt(val, 10));
  if (parts.length !== 3 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    throw new Error("Invalid RGB input. Expected 3 numbers between 0-255.");
  }
  return { r: parts[0], g: parts[1], b: parts[2] };
}

export default function ColorCodesConverterPage() {
  const [hexInput, setHexInput] = useState<string>("#FF0000");
  const [rgbInput, setRgbInput] = useState<string>("255, 0, 0");
  const [outputHsl, setOutputHsl] = useState<string>("hsl(0, 100%, 50%)");
  const [error, setError] = useState<string | null>(null);

  /**
   * handleConvertToRgb
   * Reads hexInput and sets rgbInput + outputHsl
   */
  const handleConvertToRgb = () => {
    try {
      setError(null);
      const { r, g, b } = parseHexToRgb(hexInput);
      const rgbStr = `${r}, ${g}, ${b}`;
      const hslStr = rgbToHsl(r, g, b);
      setRgbInput(rgbStr);
      setOutputHsl(hslStr);
    } catch (e: any) {
      setError(e.message);
    }
  };

  /**
   * handleConvertToHex
   * Reads rgbInput and sets hexInput + outputHsl
   */
  const handleConvertToHex = () => {
    try {
      setError(null);
      const { r, g, b } = parseRgbString(rgbInput);
      const hex = rgbToHex(r, g, b);
      const hslStr = rgbToHsl(r, g, b);
      setHexInput(hex);
      setOutputHsl(hslStr);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="container space-y-6 py-6">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Color Code Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Convert between HEX, RGB, and HSL color codes in real-time.
          </p>
          {/* HEX -> RGB */}
          <div className="grid gap-2">
            <Label htmlFor="hexInput">HEX (e.g. #FF0000)</Label>
            <Input
              id="hexInput"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              className="w-full md:w-[200px]"
            />
            <Button onClick={handleConvertToRgb}>Convert HEX to RGB/HSL</Button>
          </div>
          {/* RGB -> HEX */}
          <div className="grid gap-2 mt-4">
            <Label htmlFor="rgbInput">RGB (e.g. 255, 0, 0)</Label>
            <Input
              id="rgbInput"
              value={rgbInput}
              onChange={(e) => setRgbInput(e.target.value)}
              className="w-full md:w-[200px]"
            />
            <Button onClick={handleConvertToHex}>Convert RGB to HEX/HSL</Button>
          </div>
          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 border border-red-300 bg-red-50 text-red-700 rounded-md">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}
          {/* HSL Output */}
          {!error && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
              <p className="font-semibold">Current HSL: {outputHsl}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
