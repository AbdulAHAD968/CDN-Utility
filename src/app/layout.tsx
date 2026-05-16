import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Cloudinary Asset Utility | Internal",
  description: "Internal team utility for Cloudinary asset management.",
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-canvas font-sans antialiased",
          inter.variable,
          cormorant.variable,
          jetbrains.variable
        )}
      >
        <TooltipProvider>
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster position="top-right" expand={false} richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
