import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // ⭐ IMPORTANTE ⭐

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOCO — Gestão de Tarefas",
  description: "Projeto do Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ⚡ MAGIA AQUI: Contexto de Autenticação ao redor de tudo ⚡ */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
