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
  title: "Cloudinary Asset Utility | Optimize & Manage Your Images",
  description: "Professional internal tool for teams to upload, optimize, and manage Cloudinary assets with ease. Features batch uploads, library management, and live playgrounds.",
  metadataBase: new URL("https://cdnutility.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cloudinary Asset Utility | Optimize & Manage Your Images",
    description: "Professional internal tool for teams to upload, optimize, and manage Cloudinary assets with ease.",
    url: "https://cdnutility.vercel.app",
    siteName: "Cloudinary Asset Utility",
    images: [
      {
        url: "https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png",
        width: 1200,
        height: 630,
        alt: "Cloudinary Asset Utility",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudinary Asset Utility | Optimize & Manage Your Images",
    description: "Professional internal tool for teams to upload, optimize, and manage Cloudinary assets with ease.",
    images: ["https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png"],
  },
  icons: {
    icon: "https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png",
  },
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cloudinary Asset Utility",
              "url": "https://cdnutility.vercel.app",
              "logo": "https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png",
              "description": "Professional internal tool for teams to upload, optimize, and manage Cloudinary assets.",
              "sameAs": [
                "https://facebook.com/cdnutility",
                "https://x.com/cdnutility",
                "https://linkedin.com/company/cdnutility"
              ]
            }),
          }}
        />
      </head>
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
