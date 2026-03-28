"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#tools" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

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
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* CTF Banner */}
                <AnimatePresence>
                    {showBanner && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full bg-neon-blue/5 border-b border-neon-blue/20 overflow-hidden backdrop-blur-sm relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent animate-pulse opacity-50 pointer-events-none" />
                            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2 md:py-2.5 flex items-center justify-between text-xs md:text-sm font-mono text-gray-300 relative z-10">
                                <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                                    <span className="hidden sm:flex items-center justify-center bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded text-[10px] font-bold border border-neon-blue/30 tracking-widest shrink-0 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                                        SYSTEM_ALERT
                                    </span>
                                    <span className="truncate">
                                        <span className="text-neon-blue">[{">_"}]</span> A <span className="text-white font-medium drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Capture The Flag (CTF)</span> simulation is active. Access the terminal to join the game.
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowBanner(false)}
                                    className="text-gray-500 hover:text-neon-blue transition-colors p-1 ml-4 sm:ml-6 flex-shrink-0 flex items-center gap-1 hover:bg-neon-blue/10 rounded"
                                    aria-label="Dismiss banner"
                                >
                                    <span className="hidden sm:inline text-[10px] tracking-wider">DISMISS</span>
                                    <span>✕</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
