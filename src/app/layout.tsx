import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CTFProvider } from "@/contexts/CTFContext";
import { CTFTerminal } from "@/components/ui/CTFTerminal";
import { CTFProgressHUD } from "@/components/ui/CTFProgressHUD";
import { CTFFlagToast } from "@/components/ui/CTFFlagToast";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Aaditya Kaushik | Cybersecurity Portfolio",
    description:
        "4th-year CS student. Security researcher, CTF player, and aspiring penetration tester focused on cloud security and network defense.",
    keywords: [
        "cybersecurity",
        "penetration testing",
        "CTF",
        "cloud security",
        "network security",
        "portfolio",
        "Aaditya Kaushik",
    ],
    authors: [{ name: "Aaditya Kaushik" }],
    openGraph: {
        title: "Aaditya Kaushik | Cybersecurity Portfolio",
        description:
            "Security researcher, CTF player, and aspiring penetration tester. Explore projects and skills.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aaditya Kaushik | Cybersecurity Portfolio",
        description:
            "Security researcher, CTF player, and aspiring penetration tester.",
    },
    icons: {
        icon: "/favicon.png",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
};

// Inline script injected BEFORE React hydrates — prevents flash of wrong theme
const antiFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.add('light');
    } else if (!stored) {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!prefersDark) {
        document.documentElement.classList.add('light');
      }
    }
  } catch(e) {}
})();
`.trim();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Anti-flash: apply theme class synchronously before first paint */}
                <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
            </head>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-dark-bg text-foreground min-h-screen selection:bg-neon-blue/30 selection:text-neon-blue relative`}
            >
                <ThemeProvider>
                    <CTFProvider>
                        {/* Custom cursor — hides default cursor, shows dot + ring on desktop */}
                        <CustomCursor />

                        <AmbientBackground />
                        <ScrollProgress />
                        <Navbar />
                        {children}

                        {/* CTF Game Layer */}
                        <CTFTerminal />
                        <CTFProgressHUD />
                        <CTFFlagToast />
                    </CTFProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
