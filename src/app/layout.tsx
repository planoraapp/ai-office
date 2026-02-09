import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OFFICE AI - Edição Inteligente de Documentos",
  description: "Transforme suas apresentações e documentos com Inteligência Artificial.",
};

import { Header } from "@/components/header";
import { AuthProvider } from "@/contexts/auth-context";
import { DocumentProvider } from "@/contexts/document-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DocumentProvider>
            <Header />
            {children}
          </DocumentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
