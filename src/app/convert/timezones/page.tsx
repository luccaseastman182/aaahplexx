// CODED BY: LUCCAS EASTMAN
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatInTimeZone } from "date-fns-tz";

/**
 * A minimal Timezone Converter using date-fns-tz for example.
 * To expand, you can store a large list of time zones or fetch dynamically from an API.
 */

const timeZones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export default function TimezonesConverterPage() {
  const [sourceTZ, setSourceTZ] = useState<string>("UTC");
  const [targetTZ, setTargetTZ] = useState<string>("America/New_York");
  const [dateInput, setDateInput] = useState<string>("");
  const [timeInput, setTimeInput] = useState<string>("");
  const [convertedTime, setConvertedTime] = useState<string>("");

  /**
   * handleConvert
   * Combines date and time input into a single Date object based on source time zone,
   * then uses date-fns-tz to format that date/time in the target time zone.
   */
  const handleConvert = () => {
    try {
      if (!dateInput || !timeInput) {
        throw new Error("Please select a date and time.");
      }
      // Combine date and time strings into a single ISO-like format
      // Example: "2023-01-01" + " 13:00" => "2023-01-01T13:00:00"
      const combined = `${dateInput}T${timeInput}:00`;
      const sourceDate = new Date(combined);

      if (isNaN(sourceDate.getTime())) {
        throw new Error("Invalid date/time provided.");
      }

      // Format the date in the target time zone
      const targetDateTime = formatInTimeZone(sourceDate, targetTZ, "yyyy-MM-dd HH:mm:ss zzz");
      setConvertedTime(targetDateTime);
    } catch (error: any) {
      alert(error.message);
      setConvertedTime("");
    }
  };

  return (
    <div className="container space-y-6 py-6">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Timezone Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Convert times between different timezones around the world using date-fns-tz.
          </p>
          {/* Source Time Zone */}
          <div className="grid gap-2">
            <Label>Source Time Zone</Label>
            <Select value={sourceTZ} onValueChange={(val) => setSourceTZ(val)}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Target Time Zone */}
          <div className="grid gap-2">
            <Label>Target Time Zone</Label>
            <Select value={targetTZ} onValueChange={(val) => setTargetTZ(val)}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Date & Time Input */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="dateInput">Date (YYYY-MM-DD)</Label>
              <Input
                id="dateInput"
                type="date"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value);
                  setConvertedTime("");
                }}
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="timeInput">Time (HH:MM in 24-hour format)</Label>
              <Input
                id="timeInput"
                type="time"
                step="60"
                value={timeInput}
                onChange={(e) => {
                  setTimeInput(e.target.value);
                  setConvertedTime("");
                }}
              />
            </div>
          </div>
          {/* Convert Button */}
          <Button onClick={handleConvert} className="mt-2">
            Convert
          </Button>
          {/* Result */}
          {convertedTime && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
              <p className="font-semibold">
                Converted Time: {convertedTime}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
