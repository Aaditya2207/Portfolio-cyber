import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CTFProvider } from "@/contexts/CTFContext";
import { CTFTerminal } from "@/components/ui/CTFTerminal";
import { CTFProgressHUD } from "@/components/ui/CTFProgressHUD";
import { CTFFlagToast } from "@/components/ui/CTFFlagToast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaditya | Cybersecurity Portfolio",
  description: "3rd year CS student. Security researcher, CTF player, and aspiring penetration tester.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-dark-bg text-foreground min-h-screen selection:bg-neon-blue/30 selection:text-neon-blue relative`}
      >
        <CTFProvider>
          <AmbientBackground />
          <ScrollProgress />
          <Navbar />
          {children}
          {/* CTF Game Layer */}
          <CTFTerminal />
          <CTFProgressHUD />
          <CTFFlagToast />
        </CTFProvider>
      </body>
    </html>
  );
}
