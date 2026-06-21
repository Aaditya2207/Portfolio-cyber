"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCTF } from "@/contexts/CTFContext";

export const About = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const showB64Hint = isHovered || isPinned;
    const { captureFlag, isCaptured } = useCTF();
    const flag2 = "FLAG{d1g_d33p3r}";

    return (
        <section id="about" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 flex flex-col items-start"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">A bit about me</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Who <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">I Am</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="lg:col-span-7 space-y-5 sm:space-y-6 md:space-y-8 text-gray-400 text-base sm:text-lg leading-[1.8] font-light"
                    >
                        <p>
                            I&apos;m Aaditya, a 4th-year Computer Science student at Chitkara University specializing in cybersecurity. It started with basic networking labs in first year and quickly turned into CTFs, bug bounties, and spending way too many late nights reading CVE disclosures.
                        </p>
                        <p>
                            Right now, I&apos;m focused on <span className="text-neon-blue font-medium">Cloud Security</span> and network security, actively practising on platforms like HackTheBox and TryHackMe while working on tools that solve real problems. I believe the best way to learn security is to actually try to break stuff — ethically, of course.
                        </p>
                        <p>
                            Outside of that, I write about things I&apos;ve learned, contribute to open source projects, and I&apos;m actively looking for internship opportunities where I can apply what I know and grow alongside people who really know their stuff.
                        </p>
                    </motion.div>

                    {/* Right: Profile Card with FLAG-02 hint */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-5"
                    >
                        <div className="relative rounded-2xl sm:rounded-3xl glass p-6 sm:p-8 border border-white/5 overflow-visible group hover:border-neon-indigo/30 transition-all duration-500">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-blue/20 blur-[50px] rounded-full group-hover:bg-neon-indigo/30 transition-colors duration-700"></div>

                            <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10 border-b border-white/5 pb-5 sm:pb-6">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-dark-bg border border-neon-blue/30 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                        <div className="absolute inset-0 bg-neon-blue/10 animate-pulse"></div>
                                        <span className="font-mono text-neon-blue font-bold text-lg sm:text-xl">AD</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">Aaditya</h3>
                                        <p className="text-neon-indigo font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-0.5 sm:mt-1">CS Student / Security Enthusiast</p>
                                    </div>
                                </div>

                                {/* FLAG-02 Hint: [?] button with base64 tooltip */}
                                <div
                                    className="relative flex-shrink-0"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <button
                                        onClick={() => setIsPinned(v => !v)}
                                        className={`w-6 h-6 rounded-full border font-mono text-[10px] flex items-center justify-center transition-all duration-300 cursor-pointer
                                            ${isCaptured(flag2)
                                                ? "border-neon-blue/60 bg-neon-blue/10 text-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                                                : "border-gray-700 text-gray-600 hover:border-neon-blue/50 hover:text-neon-blue"
                                            }`}
                                        aria-label="Challenge hint"
                                    >
                                        {isCaptured(flag2) ? "✓" : "?"}
                                    </button>

                                    <AnimatePresence>
                                        {showB64Hint && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-8 z-50 w-64 sm:w-72 p-3 rounded-xl bg-dark-bg border border-neon-blue/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] font-mono text-[9px] sm:text-[10px]"
                                            >
                                                <p className="text-neon-blue tracking-widest uppercase mb-1.5">[OSINT CHALLENGE 2/5]</p>
                                                <p className="text-gray-400 mb-2 leading-relaxed">Something is encoded below. Decode it in the terminal:</p>
                                                <p className="text-neon-blue/80 break-all select-all bg-white/5 p-2 rounded-lg tracking-wider">
                                                    ZkxBR3tkMWdfZDMzcDNyfQ==
                                                </p>
                                                <p className="text-gray-600 mt-2">run: decode ZkxBR3tkMWdfZDMzcDNyfQ==</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <ul className="space-y-4 sm:space-y-5 font-mono text-xs sm:text-sm relative z-10">
                                {[
                                    { label: "DEGREE", value: "B.E Computer Science" },
                                    { label: "YEAR", value: "3rd Year (2023–2027)" },
                                    { label: "LOCATION", value: "India" },
                                ].map(({ label, value }) => (
                                    <li key={label} className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 group/item">
                                        <span className="text-gray-500 tracking-wider text-xs">{label}</span>
                                        <span className="text-white group-hover/item:text-neon-blue transition-colors text-xs sm:text-sm break-words">{value}</span>
                                    </li>
                                ))}
                                <li className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                                    <span className="text-gray-500 tracking-wider text-xs">STATUS</span>
                                    <span className="text-neon-blue flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse flex-shrink-0"></span>
                                        Open to internships
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 pt-3 sm:pt-4 border-t border-white/5">
                                    <span className="text-gray-500 tracking-wider mb-1 text-xs">INTERESTS</span>
                                    <span className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                                        Pen Testing, CTFs, Bug Bounty, Cloud Security, VAPT
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
