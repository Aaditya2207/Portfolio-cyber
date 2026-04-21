"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCTF } from "@/contexts/CTFContext";

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#tools" },
    { name: "Projects", href: "#projects" },
    { name: "CTF Competitions", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const { setTerminalOpen } = useCTF();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const scrollToHash = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent flex flex-col",
                    scrolled ? "glass border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
                )}
            >
                <div className={cn(
                    "w-full transition-all duration-300",
                    scrolled ? "py-3 md:py-4" : "py-4 md:py-6"
                )}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        {/* Logo */}
                        <a href="#" onClick={(e) => scrollToHash(e, "#hero")} className="group flex items-center gap-1.5 font-mono text-lg sm:text-xl font-bold tracking-tighter text-white z-50 flex-shrink-0">
                            <span className="text-neon-blue opacity-50 group-hover:opacity-100 transition-opacity">{"<"}</span>
                            <span className="relative">
                                AK
                                <span className="absolute -inset-1 bg-neon-blue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </span>
                            <span className="text-neon-blue opacity-50 group-hover:opacity-100 transition-opacity">{"/>"}</span>
                        </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToHash(e, link.href)}
                                className="text-xs lg:text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors relative group whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden relative z-50 flex flex-col items-center justify-center w-10 h-10 gap-[6px] group"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className={cn(
                                "block w-6 h-[1.5px] bg-gray-300 transition-all duration-300 origin-center",
                                mobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
                            )}></span>
                            <span className={cn(
                                "block w-6 h-[1.5px] bg-gray-300 transition-all duration-300",
                                mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                            )}></span>
                            <span className={cn(
                                "block w-6 h-[1.5px] bg-gray-300 transition-all duration-300 origin-center",
                                mobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
                            )}></span>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* CTF Popup Banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md bg-[#030305]/95 backdrop-blur-xl border border-neon-blue/30 rounded-xl shadow-[0_5px_30px_rgba(0,240,255,0.15)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-3">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500/70"></span>
                                        <span className="w-2 h-2 rounded-full bg-yellow-500/70"></span>
                                        <span className="w-2 h-2 rounded-full bg-green-500/70"></span>
                                    </div>
                                    <span className="text-neon-blue font-mono text-[10px] tracking-widest px-2 py-0.5 rounded uppercase border border-neon-blue/20 bg-neon-blue/10">
                                        SYSTEM_ALERT
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowBanner(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                    aria-label="Dismiss popup"
                                >
                                    <span className="font-mono text-xs">✕</span>
                                </button>
                            </div>
                            {/* Body */}
                            <div className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed pl-1">
                                <span className="text-neon-blue">[{">_"}]</span> A <span className="text-white font-semibold">Capture The Flag (CTF)</span> simulation is active. Access the terminal to join the game.
                                
                                <button
                                    onClick={() => {
                                        setTerminalOpen(true);
                                        setShowBanner(false);
                                    }}
                                    className="mt-3 w-full sm:w-auto px-4 py-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:border-neon-blue/50 rounded flex items-center justify-center gap-2 transition-all duration-300 group"
                                >
                                    <span className="text-xs font-semibold tracking-wider uppercase">Open Terminal</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Full-screen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 flex flex-col bg-dark-bg/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center flex-1 gap-3 px-8">
                            {NAV_LINKS.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToHash(e, link.href)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                    className="font-mono text-2xl text-gray-300 hover:text-neon-blue transition-colors py-3 border-b border-white/5 w-full text-center tracking-wider"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                        <div className="py-8 text-center">
                            <p className="font-mono text-gray-600 text-xs tracking-widest">aadityak22@outlook.com</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
