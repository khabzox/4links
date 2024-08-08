import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free Short Link Service",
  description: "Experience our powerful short link service for free! Enjoy unlimited link shortening, advanced analytics, and customizable URLs. After the free trial, continue for just $9/month. Get started now!",
  keywords: "free URL shortener, link shortening, short link service, custom URLs, link management, URL tracking, analytics, free trial",
  robots: "index, follow",
  openGraph: {
    title: "Free Short Link Service | Easy URL Shortening & Management",
    description: "Try our short link service for free! Enjoy unlimited link shortening, detailed analytics, and custom URL options. After the free trial, it's just $9/month.",
    image: "[URL to an image representing your service]",
    url: "https://www.4l.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Short Link Service | Easy URL Shortening & Management",
    description: "Try our powerful short link service for free! Unlimited link shortening, advanced analytics, and custom URLs. After the free trial, it's just $9/month.",
    image: "[URL to an image representing your service]",
    url: "https://www.4l.xyz",
  },
  canonical: "https://www.4l.xyz",
};

import {
  ClerkProvider,
} from '@clerk/nextjs'


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} text-primary`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
