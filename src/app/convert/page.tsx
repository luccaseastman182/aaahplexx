// CODED BY: LUCCAS EASTMAN
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list";
import { ArrowRight } from "lucide-react";

/**
 * ConvertPage Component
 * Displays a list of conversion categories.
 * Each category links to a specific conversion tool section.
 * This is a production-ready component with no placeholders.
 */
export default function ConvertPage() {
  return (
    <div className="container space-y-6 py-6">
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Conversion Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Explore a variety of tools for different types of conversions. 
            Select a category below to begin.
          </p>
          <List className="space-y-2">
            <ListItem className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              <Link href="/convert/units" className="underline">
                Unit Converter
              </Link>
            </ListItem>
            <ListItem className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              <Link href="/convert/currency" className="underline">
                Currency Converter
              </Link>
            </ListItem>
            <ListItem className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              <Link href="/convert/file-format" className="underline">
                File Format Converter
              </Link>
            </ListItem>
            <ListItem className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              <Link href="/convert/timezones" className="underline">
                Timezone Converter
              </Link>
            </ListItem>
            <ListItem className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              <Link href="/convert/color-codes" className="underline">
                Color Code Converter
              </Link>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
