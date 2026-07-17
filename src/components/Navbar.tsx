"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCTF } from "@/contexts/CTFContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBriefcase } from "react-icons/fa";

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#tools" },
    { name: "Projects", href: "#projects" },
    { name: "CTF Competitions", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

// IDs to track for active section
const SECTION_IDS = ["hero", "about", "tools", "projects", "experience", "education", "certifications", "contact"];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [pastHero, setPastHero] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const { setTerminalOpen } = useCTF();
    const { isLight } = useTheme();

    // Scroll + active section detection
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            setPastHero(y > window.innerHeight * 0.7);

            // Active section via scroll position
            let current = "hero";
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) current = id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const scrollToHash = useCallback((e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
    }, []);

    const isActive = (href: string) => {
        const sectionId = href.replace("#", "");
        return activeSection === sectionId;
    };

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent flex flex-col",
                    scrolled
                        ? isLight
                            ? "backdrop-blur-xl bg-white/80 border-[#D8E3F2] shadow-[0_4px_20px_rgba(15,23,42,0.08)]"
                            : "backdrop-blur-xl bg-dark-bg/80 border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                        : "bg-transparent"
                )}
            >
                <div className={cn("w-full transition-all duration-300", scrolled ? "py-3 md:py-4" : "py-4 md:py-6")}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                        {/* Logo */}
                        <a
                            href="#"
                            onClick={(e) => scrollToHash(e, "#hero")}
                            className="group flex items-center gap-1.5 font-mono text-lg sm:text-xl font-bold tracking-tighter z-50 flex-shrink-0"
                            style={{ color: isLight ? "#111827" : "#ffffff" }}
                        >
                            <span className="text-neon-blue opacity-50 group-hover:opacity-100 transition-opacity">{"<"}</span>
                            <span className="relative">
                                AK
                                <span className="absolute -inset-1 bg-neon-blue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-neon-blue opacity-50 group-hover:opacity-100 transition-opacity">{"/>"}</span>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2" role="navigation" aria-label="Main navigation">
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => scrollToHash(e, link.href)}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "relative px-3 py-2 text-xs lg:text-sm font-mono transition-colors duration-200 rounded-lg whitespace-nowrap group",
                                            active
                                                ? isLight ? "text-[#06B6D4]" : "text-neon-blue"
                                                : isLight
                                                    ? "text-[#6B7280] hover:text-[#111827]"
                                                    : "text-gray-500 hover:text-gray-200"
                                        )}
                                    >
                                        {/* Active indicator pill */}
                                        {active && (
                                            <motion.span
                                                layoutId="nav-active"
                                                className="absolute inset-0 rounded-lg"
                                                style={{
                                                    background: isLight
                                                        ? "rgba(6,182,212,0.08)"
                                                        : "rgba(0,240,255,0.06)",
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.name}</span>
                                        {/* Underline on hover */}
                                        <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-neon-blue/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    </a>
                                );
                            })}

                            {/* Sticky Hire CTA — appears after hero */}
                            <AnimatePresence>
                                {pastHero && (
                                    <motion.a
                                        href="#contact"
                                        onClick={(e) => scrollToHash(e, "#contact")}
                                        initial={{ opacity: 0, scale: 0.8, x: 10 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className={cn(
                                            "ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider border transition-all duration-300 whitespace-nowrap",
                                            isLight
                                                ? "bg-[#06B6D4]/10 border-[#06B6D4]/40 text-[#06B6D4] hover:bg-[#06B6D4]/20"
                                                : "bg-neon-blue/10 border-neon-blue/40 text-neon-blue hover:bg-neon-blue/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                                        )}
                                        aria-label="Hire me — navigate to contact"
                                    >
                                        <FaBriefcase size={11} />
                                        Hire Me
                                    </motion.a>
                                )}
                            </AnimatePresence>

                            {/* Theme Toggle */}
                            <div className="ml-2">
                                <ThemeToggle />
                            </div>
                        </nav>

                        {/* Mobile: Theme toggle + Hamburger */}
                        <div className="md:hidden flex items-center gap-3 z-50">
                            <ThemeToggle />
                            <button
                                className="relative flex flex-col items-center justify-center w-10 h-10 gap-[6px] group"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle Menu"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                <span className={cn(
                                    "block w-6 h-[1.5px] transition-all duration-300 origin-center",
                                    isLight ? "bg-gray-600" : "bg-gray-300",
                                    mobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
                                )} />
                                <span className={cn(
                                    "block w-6 h-[1.5px] transition-all duration-300",
                                    isLight ? "bg-gray-600" : "bg-gray-300",
                                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                                )} />
                                <span className={cn(
                                    "block w-6 h-[1.5px] transition-all duration-300 origin-center",
                                    isLight ? "bg-gray-600" : "bg-gray-300",
                                    mobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
                                )} />
                            </button>
                        </div>
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
                        className={cn(
                            "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md backdrop-blur-xl border rounded-xl overflow-hidden",
                            isLight
                                ? "bg-white/95 border-[#D8E3F2] shadow-[0_5px_30px_rgba(15,23,42,0.12)]"
                                : "bg-[#030305]/95 border-neon-blue/30 shadow-[0_5px_30px_rgba(0,240,255,0.15)]"
                        )}
                        role="alert"
                        aria-live="polite"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-3">
                            <div className={cn("flex items-center justify-between border-b pb-2", isLight ? "border-[#E5E7EB]" : "border-white/5")}>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500/70" />
                                        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                        <span className="w-2 h-2 rounded-full bg-green-500/70" />
                                    </div>
                                    <span className="text-neon-blue font-mono text-[10px] tracking-widest px-2 py-0.5 rounded uppercase border border-neon-blue/20 bg-neon-blue/10">
                                        SYSTEM_ALERT
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowBanner(false)}
                                    className={cn("transition-colors", isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-white")}
                                    aria-label="Dismiss notification"
                                >
                                    <span className="font-mono text-xs">✕</span>
                                </button>
                            </div>
                            <div className={cn("font-mono text-xs sm:text-sm leading-relaxed pl-1", isLight ? "text-gray-600" : "text-gray-300")}>
                                <span className="text-neon-blue">{`[>_]`}</span> A{" "}
                                <span className={cn("font-semibold", isLight ? "text-gray-800" : "text-white")}>
                                    Capture The Flag (CTF)
                                </span>{" "}
                                simulation is active. Access the terminal to join the game.
                                <button
                                    onClick={() => { setTerminalOpen(true); setShowBanner(false); }}
                                    className={cn(
                                        "mt-3 w-full sm:w-auto px-4 py-2 rounded flex items-center justify-center gap-2 transition-all duration-300 group",
                                        isLight
                                            ? "bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 hover:border-[#06B6D4]/50"
                                            : "bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:border-neon-blue/50"
                                    )}
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
                        id="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                            "fixed inset-0 z-40 flex flex-col backdrop-blur-xl md:hidden",
                            isLight ? "bg-white/97" : "bg-dark-bg/95"
                        )}
                    >
                        <div className="flex flex-col items-center justify-center flex-1 gap-2 px-8">
                            {NAV_LINKS.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToHash(e, link.href)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                    className={cn(
                                        "font-mono text-2xl transition-colors py-3 w-full text-center tracking-wider",
                                        isActive(link.href)
                                            ? "text-neon-blue"
                                            : isLight
                                                ? "text-gray-600 hover:text-[#06B6D4] border-b border-[#E5E7EB]"
                                                : "text-gray-300 hover:text-neon-blue border-b border-white/5"
                                    )}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            {/* Mobile Hire CTA */}
                            <motion.a
                                href="#contact"
                                onClick={(e) => scrollToHash(e, "#contact")}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm font-semibold tracking-wider border border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
                            >
                                <FaBriefcase size={13} />
                                Hire Me
                            </motion.a>
                        </div>
                        <div className="py-8 text-center">
                            <p className={cn("font-mono text-xs tracking-widest", isLight ? "text-gray-400" : "text-gray-600")}>
                                aadityak22@outlook.com
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
