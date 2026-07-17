"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useCTF } from "@/contexts/CTFContext";

const INTERESTS = [
    "Penetration Testing",
    "CTFs & Bug Bounty",
    "Cloud Security",
    "VAPT",
    "Network Defense",
    "Threat Modeling",
    "OSINT",
    "Red Teaming",
];

const TIMELINE = [
    { year: "2023", event: "Started CS degree, first networking lab lit the spark" },
    { year: "2024", event: "Dove into CTFs, HackTheBox, TryHackMe — obsessed" },
    { year: "2025", event: "Top 40 nationally at EY DSCI hackathon, led team of 2" },
    { year: "2026", event: "9th place MythX CTF, building cloud security projects" },
];

export const About = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const showB64Hint = isHovered || isPinned;
    const { captureFlag, isCaptured } = useCTF();
    const flag2 = "FLAG{d1g_d33p3r}";
    const prefersReducedMotion = useReducedMotion();

    // 3D tilt effect on card
    const cardRef = useRef<HTMLDivElement>(null);
    const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        cardRef.current.style.transition = "transform 0.1s ease";
    }, [prefersReducedMotion]);

    const handleCardMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
        cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    }, []);

    return (
        <section id="about" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <SectionReveal variant="slideUp" className="mb-12 sm:mb-16 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                            A bit about me
                        </span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
                        Who{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            I Am
                        </span>
                    </h2>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">

                    {/* Left: Bio + Timeline */}
                    <SectionReveal variant="slideLeft" delay={0.1} className="lg:col-span-7 space-y-8">

                        {/* Bio paragraphs */}
                        <div className="space-y-5 text-gray-400 font-light leading-[1.85]"
                            style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}>
                            <p>
                                I&apos;m Aaditya, a Computer Science student specialising in cybersecurity. Fascinated by how systems work under the hood, I spend my time exploring network security, cloud security, CTFs, bug bounties, and the latest CVE disclosures.
                            </p>
                            <p>
                                Right now, I&apos;m focused on{" "}
                                <span className="text-neon-blue font-medium">Network Security</span> and Cloud
                                security, actively practising on HackTheBox and TryHackMe while building tools
                                that solve real problems. The best way to learn security is to actually try to
                                break stuff — ethically, of course.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-3">
                            <p className="font-mono text-[10px] sm:text-xs text-gray-600 tracking-widest uppercase mb-4">
                                Journey
                            </p>
                            <div className="relative pl-5 space-y-5">
                                <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-neon-blue/60 via-neon-indigo/40 to-transparent" />
                                {TIMELINE.map((item, idx) => (
                                    <motion.div
                                        key={item.year}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="absolute left-[-4px] w-2 h-2 rounded-full border border-neon-blue/60 bg-dark-bg group-hover:bg-neon-blue transition-colors duration-300 mt-1" />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pl-2">
                                            <span className="font-mono text-xs text-neon-blue/70 tracking-wider flex-shrink-0">
                                                {item.year}
                                            </span>
                                            <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                                {item.event}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Interest tags */}
                        <div>
                            <p className="font-mono text-[10px] sm:text-xs text-gray-600 tracking-widest uppercase mb-4">
                                Interests
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {INTERESTS.map((tag, idx) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono border border-white/10 bg-white/5 text-gray-300 hover:border-neon-blue/40 hover:text-neon-blue hover:bg-neon-blue/5 transition-all duration-300 cursor-default"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right: Profile Card with 3D tilt */}
                    <SectionReveal variant="slideRight" delay={0.25} className="lg:col-span-5">
                        <div
                            ref={cardRef}
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                            className="relative rounded-2xl sm:rounded-3xl glass p-6 sm:p-8 border border-white/5 overflow-visible group hover:border-neon-indigo/30 transition-colors duration-500 will-change-transform"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Glow blob */}
                            <div className="absolute -top-10 -right-10 w-36 h-36 bg-neon-blue/15 blur-[60px] rounded-full group-hover:bg-neon-indigo/25 transition-colors duration-700 pointer-events-none" />

                            {/* Card header */}
                            <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10 border-b border-white/5 pb-5 sm:pb-6">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {/* Avatar */}
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex-shrink-0">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-neon-blue/30 to-neon-indigo/30 blur-md animate-pulse" />
                                        <div className="relative w-full h-full rounded-2xl bg-dark-bg border border-neon-blue/25 flex items-center justify-center overflow-hidden">
                                            <span className="font-mono text-neon-blue font-bold text-xl sm:text-2xl">AK</span>
                                            {/* Shimmer overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                                            Aaditya K.
                                        </h3>
                                        <p className="text-neon-indigo font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">
                                            CS Student · Security Enthusiast
                                        </p>
                                    </div>
                                </div>

                                {/* FLAG-02 Hint button */}
                                <div
                                    className="relative flex-shrink-0"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <button
                                        onClick={() => setIsPinned((v) => !v)}
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

                            {/* Info rows */}
                            <ul className="space-y-4 sm:space-y-5 font-mono text-xs sm:text-sm relative z-10">
                                {[
                                    { label: "DEGREE", value: "B.E Computer Science" },
                                    { label: "LOCATION", value: "India" },
                                ].map(({ label, value }) => (
                                    <li key={label} className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 group/item">
                                        <span className="text-gray-600 tracking-wider text-[10px] uppercase">{label}</span>
                                        <span className="text-gray-300 group-hover/item:text-neon-blue transition-colors text-xs sm:text-sm break-words">
                                            {value}
                                        </span>
                                    </li>
                                ))}
                                <li className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                                    <span className="text-gray-600 tracking-wider text-[10px] uppercase">STATUS</span>
                                    <span className="text-neon-blue flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-60" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue" />
                                        </span>
                                        Open to internships
                                    </span>
                                </li>
                            </ul>

                            {/* Card shimmer bottom highlight */}
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent rounded-b-3xl" />
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
};
