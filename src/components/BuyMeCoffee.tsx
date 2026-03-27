"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck } from "react-icons/fa";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Tiny glitch-text hook — cycles through char
   noise for 400 ms then settles on the real text
───────────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@~";

function useGlitchText(text: string, trigger: boolean) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        if (!trigger) {
            setDisplay(text);
            return;
        }
        let frame = 0;
        const totalFrames = 14;
        const id = setInterval(() => {
            frame++;
            if (frame >= totalFrames) {
                setDisplay(text);
                clearInterval(id);
                return;
            }
            setDisplay(
                text
                    .split("")
                    .map((char, i) =>
                        Math.random() < 0.35 && i < frame * 1.5
                            ? char
                            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                    )
                    .join("")
            );
        }, 28);
        return () => clearInterval(id);
    }, [trigger, text]);

    return display;
}

/* ─────────────────────────────────────────────
   Animated coffee icon — steam puffs via keyframe
   Integrated with a tiny UPI signal at bottom
───────────────────────────────────────────── */
const CoffeeSVG = ({ active }: { active: boolean }) => (
    <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
        aria-hidden="true"
    >
        {/* Steam wisps */}
        {[0, 1, 2].map((i) => (
            <motion.path
                key={i}
                d={`M${12 + i * 6} 8 Q${14 + i * 6} 4 ${12 + i * 6} 1`}
                stroke="#ffb800"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                    active
                        ? {
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.7, 0],
                            y: [0, -3, -6],
                        }
                        : { pathLength: 0, opacity: 0 }
                }
                transition={{
                    delay: i * 0.18,
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: "easeInOut",
                }}
            />
        ))}
        {/* Cup body outline */}
        <motion.path
            d="M8 14h24l-3 14H11L8 14z"
            fill="rgba(255,184,0,0.12)"
            stroke="#ffb800"
            strokeWidth="1.4"
            strokeLinejoin="round"
            animate={active ? { filter: ["drop-shadow(0 0 0px #ffb800)", "drop-shadow(0 0 6px #ffb80088)", "drop-shadow(0 0 0px #ffb800)"] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Handle */}
        <path
            d="M32 18 Q38 18 38 23 Q38 28 32 28"
            stroke="#ffb800"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
        />
        {/* Coffee liquid fill */}
        <motion.rect
            x="11"
            y="19"
            width="18"
            height="7"
            rx="1"
            fill="rgba(255,184,0,0.18)"
            animate={active ? { opacity: [0.18, 0.35, 0.18] } : { opacity: 0.18 }}
            transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Subtle Rupee Sign */}
        <text x="17" y="24" fill="#ffb800" opacity="0.6" fontSize="7" fontWeight="bold" fontFamily="sans-serif">₹</text>
    </svg>
);

/* ─────────────────────────────────────────────
   Scanning beam — top-to-bottom loop inside card
───────────────────────────────────────────── */
const ScanBeam = () => (
    <motion.div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-amber/50 to-transparent pointer-events-none z-20"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
    />
);

/* ─────────────────────────────────────────────
   Corner accent marks — four decorative brackets
───────────────────────────────────────────── */
const CornerAccents = () => (
    <>
        {[
            "top-0 left-0 border-t-2 border-l-2",
            "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
            <span
                key={i}
                className={`absolute w-3 h-3 border-neon-amber/50 ${cls}`}
                aria-hidden="true"
            />
        ))}
    </>
);

/* ─────────────────────────────────────────────
   Dummy QR SVG Generator (Placeholder aesthetic)
───────────────────────────────────────────── */
const DummyCyberQR = () => (
    <svg viewBox="0 0 33 33" shapeRendering="crispEdges" className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] opacity-90 drop-shadow-sm">
        {/* Top Left Eye */}
        <path fill="black" d="M3 3h7v7H3zM4 4v5h5V4zM5 5h3v3H5z" />
        {/* Top Right Eye */}
        <path fill="black" d="M23 3h7v7h-7zM24 4v5h5V4zM25 5h3v3h-3z" />
        {/* Bottom Left Eye */}
        <path fill="black" d="M3 23h7v7H3zM4 24v5h5v-5zM5 25h3v3H5z" />
        {/* Random dots to simulate QR grid pattern */}
        <path fill="black" d="M12 3h2v2h-2z M15 3h1v1h-1z M17 4h3v1h-3z M21 6h1v2h-1z M13 8h4v1h-4z M19 9h3v2h-3z M3 12h2v4H3z M6 13h1v1H6z M8 12h2v3H8z M12 11h9v9h-9z M13 12v7h7v-7z M14 13h5v5h-5z M23 12h2v2h-2z M27 13h4v1h-4z M25 15h3v3h-3z M29 17h1v4h-1z M8 17h3v2H8z M4 19h2v2H4z M12 21h3v2h-3z M16 22h1v1h-1z M18 21h4v2h-4z M23 21h2v3h-2z M27 20h3v1h-3z M26 23h4v2h-4z M25 27h2v2h-2z M28 26h2v4h-2z M12 25h2v3h-2z M15 24h3v4h-3z M19 25h1v1h-1z M20 27h3v2h-3z M15 18h2v2h-2z M19 16h2v3h-2z" />
    </svg>
);

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export const BuyMeCoffee = () => {
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    // Glich text for the Mobile Deep Link Button
    const mobileBtnLabel = useGlitchText("PAY_VIA_UPI", hovered);

    const upiId = "9467854399@ptsbi"; // Replace closely with real UPI

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="support"
            className="py-16 sm:py-20 relative z-10 w-full"
            aria-label="Support my work via UPI"
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {/* Divider line */}
                    <div className="flex items-center gap-4 mb-10 sm:mb-12">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                        <span className="font-mono text-[9px] tracking-[0.35em] text-gray-600 uppercase select-none">
                            support
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                    </div>

                    {/* Card Container */}
                    <motion.div
                        className="relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-neon-amber/20 transition-colors duration-500 p-6 sm:p-8 flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start"
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                    >
                        {/* Ambient glow centered near the left content */}
                        <motion.div
                            className="absolute -bottom-10 left-1/4 -translate-x-1/2 w-64 h-32 rounded-full bg-neon-amber/10 blur-[60px] pointer-events-none"
                            animate={hovered ? { opacity: 1, scale: 1.2 } : { opacity: 0.5, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            aria-hidden="true"
                        />

                        {/* Content (Left side text & copy) */}
                        <div className="relative z-10 flex flex-col items-center sm:items-start flex-1 w-full text-center sm:text-left">

                            {/* Icon & Heading */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 w-full">
                                <motion.div
                                    className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-xl border border-neon-amber/20 bg-dark-bg flex items-center justify-center flex-shrink-0"
                                    animate={hovered ? { borderColor: "rgba(255,184,0,0.45)" } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <AnimatePresence>
                                        {hovered && (
                                            <motion.span
                                                key="ping"
                                                className="absolute inset-0 rounded-xl border border-neon-amber/30"
                                                initial={{ scale: 1, opacity: 0.6 }}
                                                animate={{ scale: 1.5, opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </AnimatePresence>
                                    <CoffeeSVG active={hovered} />
                                </motion.div>

                                <div className="flex-1">
                                    <p className="font-mono text-[10px] tracking-[0.3em] text-neon-amber/60 uppercase mb-1.5 mt-1 sm:mt-0">
                                        fuel the grind
                                    </p>
                                    <h2 className="text-white text-base sm:text-lg font-light leading-snug mb-2">
                                        If my work helped you, or you just{" "}
                                        <span className="text-neon-amber font-medium">vibe with the hustle</span>
                                        {" "}— drop a coffee via UPI.
                                    </h2>
                                    <p className="text-gray-600 font-mono text-[11px] leading-relaxed hidden sm:block">
                                        // late nights, CVE rabbitholes, CTF write-ups — all caffeinated
                                    </p>
                                </div>
                            </div>

                            {/* Actions (UPI ID Copy & Mobile App CTA) */}
                            <div className="mt-6 sm:mt-8 w-full flex flex-col gap-4">

                                {/* Desktop/Mobile UPI Copy Box */}
                                <div
                                    onClick={handleCopy}
                                    className="flex items-center justify-between sm:justify-start gap-4 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-neon-amber/40 hover:bg-neon-amber/[0.02] transition-colors cursor-pointer group"
                                    title="Click to copy UPI ID"
                                >
                                    <div className="font-mono flex flex-col text-left">
                                        <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 sm:mb-0.5">UPI ID</span>
                                        <span className="text-white text-sm tracking-wider">{upiId}</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10 mx-2 hidden sm:block"></div>
                                    <div className="flex items-center justify-center w-8 h-8 rounded border border-white/5 group-hover:bg-neon-amber/10 transition-colors">
                                        <AnimatePresence mode="popLayout">
                                            {copied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.5, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <FaCheck size={14} className="text-neon-amber" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.5, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <FaCopy size={14} className="text-gray-400 group-hover:text-neon-amber transition-colors" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Mobile CTA Deep Link (Hidden on sm and larger) */}
                                <motion.a
                                    href={`upi://pay?pa=${upiId}&pn=Aaditya&cu=INR`}
                                    className="sm:hidden group relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg font-mono text-xs uppercase tracking-[0.18em] w-full mt-1 focus:outline-none focus:ring-2 focus:ring-neon-amber/50 focus:ring-offset-2 focus:ring-offset-dark-bg"
                                    whileTap={{ scale: 0.97 }}
                                    onHoverStart={() => setHovered(true)}
                                    onHoverEnd={() => setHovered(false)}
                                >
                                    {/* Outline */}
                                    <span className="absolute inset-0 border border-neon-amber/30 rounded-lg transition-colors duration-300 group-hover:border-neon-amber/60" />
                                    {/* Hover fill */}
                                    <motion.span
                                        className="absolute inset-0 rounded-lg bg-neon-amber/5"
                                        animate={hovered ? { backgroundColor: "rgba(255,184,0,0.1)" } : {}}
                                    />
                                    {/* Text */}
                                    <span className="relative text-neon-amber/90 font-semibold group-hover:text-neon-amber transition-colors">
                                        {mobileBtnLabel}
                                    </span>
                                </motion.a>
                            </div>
                        </div>

                        {/* Right side: QR Code Scanner frame */}
                        <div className="relative z-10 flex-shrink-0 w-full sm:w-auto flex flex-col items-center mt-2 sm:mt-0">
                            <div className="relative p-1 bg-dark-bg border border-white/10 rounded-xl hover:border-neon-amber/30 transition-colors duration-500 overflow-hidden group shadow-lg shadow-black/50">

                                <CornerAccents />
                                <ScanBeam />

                                {/* White container for QR Code */}
                                <div className="p-2 sm:p-3 bg-white relative z-0 m-1 rounded-lg">

                                    {/* Placeholder SVG */}
                                    <DummyCyberQR />

                                    {/* NOTE: You can un-comment and map this directly to an image of your QR Code
                                            Just drop `upi-qr.png` in the `public` folder of your repo. 
                                            
                                        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] relative">
                                            <Image 
                                                src="/upi-qr.png" 
                                                alt="UPI QR Code" 
                                                fill 
                                                className="object-cover"
                                                sizes="(max-width: 640px) 120px, 140px"
                                            />
                                        </div>
                                    */}
                                </div>
                            </div>

                            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-4 flex items-center justify-center gap-1.5 opacity-80">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-amber animate-pulse"></span>
                                Scan to Support
                            </p>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
