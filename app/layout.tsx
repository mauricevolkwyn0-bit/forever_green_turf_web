import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "./components/QuoteModalContext";
import QuoteModal from "./components/QuoteModal";
import { CookieConsentProvider } from "./components/CookieConsentContext";
import CookieConsentBanner from "./components/CookieConsentBanner";
import WhatsAppButton from "./components/WhatsAppButton";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forevergreenturf.co.za"),
  title: "Home | ForeverGreenTurf",
  description:
    "Premium lawn installation and brick paving for homes and developments across Cape Town and nearby areas.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider>
          <QuoteModalProvider>
            {children}
            <QuoteModal />
          </QuoteModalProvider>
          <WhatsAppButton />
          <CookieConsentBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
