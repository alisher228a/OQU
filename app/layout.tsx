import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "./Providers";
import { ThemeContextProvider } from "@/app/context/ThemeContext";
import ThemeProvider from '@/app/providers/ThemeProvider';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Orken",
  description: "Orken - AI-powered assistant for school students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"/>
      </head>
      <body>
      <Theme>
        <ThemeContextProvider>
        <ThemeProvider>
          <Navbar />
          <AuthProvider>
          {children}
          </AuthProvider>
          <Footer />
          </ThemeProvider>
        </ThemeContextProvider>
      </Theme>
      </body>
    </html>
  );
}
