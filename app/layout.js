import { Toaster } from 'sonner';
import Script from "next/script";
import "@/app/styles/global.css";
import {
  PoppinsBlack,
  PoppinsBold,
  PoppinsExtraBold,
  PoppinsExtraLight,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
  PoppinsThin,
} from "@/app/fonts/font";

const SITE_URL = "https://tips90predict.com";
const BANNER_URL = "https://raw.githubusercontent.com/DarknessMonarch/tips90prediction/refs/heads/master/public/assets/banner.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Tips90predict - Sports Betting Predictions & Tips",
    template: "%s | Tips90predict"
  },
  applicationName: "Tips90predict",
  description: "Get expert sports betting predictions and tips on football, soccer, basketball, and more at Tips90predict. Join us for winning insights and tips to boost your betting game.",
  authors: [{ name: "Tips90predict", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Tips90predict",
    "sports betting",
    "betting predictions",
    "football tips",
    "soccer predictions",
    "basketball betting",
    "betting strategies",
    "sports analysis",
    "betting odds",
    "expert predictions",
    "vip tips",
    "betting tips",
    "sports predictions",
    "banker tips",
    "straight wins",
    "winning predictions"
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Tips90predict - Sports Betting Predictions & Tips",
    description: "Get expert sports betting predictions and tips on football, soccer, basketball, and more at Tips90predict. Join us for winning insights and tips to boost your betting game.",
    url: SITE_URL,
    siteName: "Tips90predict",
    images: [{
      url: BANNER_URL,
      width: 1200,
      height: 630,
      alt: "Tips90predict Banner"
    }]
  },

  twitter: {
    card: "summary_large_image",
    title: "Tips90predict - Sports Betting Predictions & Tips",
    description: "Expert sports betting predictions and tips",
    images: [BANNER_URL],
    creator: "@Tips90predict"
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },

  verification: {
    google: "",
    yandex: "",
  },

  alternates: {
    canonical: `${SITE_URL}/page/banker`,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico"
  },

  theme: {
    color: "#0a0e1a"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PayPal SDK */}
        <Script
          id="paypal-sdk"
          strategy="lazyOnload"
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        />
      </head>
      <body
        className={`
          ${PoppinsBlack.variable}
          ${PoppinsBold.variable} 
          ${PoppinsExtraBold.variable}
          ${PoppinsExtraLight.variable}
          ${PoppinsLight.variable} 
          ${PoppinsMedium.variable} 
          ${PoppinsRegular.variable} 
          ${PoppinsSemiBold.variable}
          ${PoppinsThin.variable}
          min-h-screen bg-[#0a0e1a]
        `}
      >
        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: {
              background: "#080a30",
              border: "1px solid #ff3269",
              color: "#ff3269",
              borderRadius: "15px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}