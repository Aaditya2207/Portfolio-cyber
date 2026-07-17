"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useCTF } from "@/contexts/CTFContext";

const STEPS = [
    {
        phase: "Reconnaissance",
        id: "01",
        icon: "🔍",
        description:
            "Before touching anything, I map out what I'm dealing with. Passive enumeration, OSINT, subdomain discovery — building a complete picture before the target even knows I'm looking.",
    },
    {
        phase: "Vulnerability Analysis",
        id: "02",
        icon: "🔬",
        description:
            "Automated scanners catch the obvious stuff. I go deeper — hunting logical flaws, auth bypasses, and misconfigs that tools consistently overlook.",
    },
    {
        phase: "Exploitation",
        id: "03",
        icon: "⚡",
        description:
            "This is where it gets interesting. Crafting exploits, chaining vulnerabilities, bypassing filters — and keeping meticulous notes of every step along the way.",
    },
    {
        phase: "Post Exploitation",
        id: "04",
        icon: "🌐",
        description:
            "Once in, the goal is showing real impact. Privilege escalation, pivoting through the network, and demonstrating what an attacker could actually get away with.",
    },
    {
        phase: "Reporting",
        id: "05",
        icon: "📋",
        description:
            "A clear, developer-friendly report: technical details, working PoCs, risk ratings, and specific steps to fix things. No jargon for its own sake.",
    },
];

export const Methodology = () => {
    const { captureFlag, isCaptured } = useCTF();
    const flag8 = "FLAG{m3th0d_m4st3r}";
    const hoveredSequence = useRef<number[]>([]);
    const [seqProgress, setSeqProgress] = useState(0);
    const seqTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const handleStepHover = (stepIndex: number) => {
        if (isCaptured(flag8)) return;
        const expected = hoveredSequence.current.length;
        if (stepIndex === expected) {
            hoveredSequence.current.push(stepIndex);
            setSeqProgress(hoveredSequence.current.length);
            if (seqTimer.current) clearTimeout(seqTimer.current);
            if (hoveredSequence.current.length === STEPS.length) {
                captureFlag(flag8);
                hoveredSequence.current = [];
                setSeqProgress(0);
            } else {
                seqTimer.current = setTimeout(() => {
                    hoveredSequence.current = [];
                    setSeqProgress(0);
                }, 4000);
            }
        } else if (stepIndex !== expected - 1) {
            hoveredSequence.current = [];
            setSeqProgress(0);
        }
    };

    const captured = isCaptured(flag8);

    return (
        <section className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionReveal variant="slideUp" className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-indigo/30 bg-neon-indigo/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-indigo font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                            Process
                        </span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
                        How I{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            Approach Work
                        </span>
                    </h2>
                    {!captured && (
                        <p className="mt-3 text-gray-600 font-mono text-[10px] sm:text-xs tracking-wider">
                            [Hover each step in order to unlock a secret…]
                        </p>
                    )}
                </SectionReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 relative z-10">
                    {STEPS.map((step, idx) => {
                        const isCompleted = captured || idx < seqProgress;
                        const isNext = !captured && idx === seqProgress;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => handleStepHover(idx)}
                            >
                                <div
                                    className={`h-full relative rounded-2xl p-5 sm:p-6 flex flex-col group transition-all duration-500 overflow-hidden border
                                        ${captured
                                            ? "border-neon-blue/30 shadow-[0_0_30px_rgba(0,240,255,0.08)]"
                                            : isCompleted
                                                ? "border-neon-blue/20"
                                                : isNext
                                                    ? "border-neon-blue/15 hover:border-neon-blue/50"
                                                    : "border-white/5 hover:border-white/15"
                                        }
                                    `}
                                    style={{
                                        background: "rgba(10,10,12,0.5)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                    }}
                                >
                                    {/* BG glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-indigo/0 group-hover:from-neon-blue/4 group-hover:to-neon-indigo/6 transition-colors duration-500" />

                                    {/* Number + status dot */}
                                    <div className="flex items-center justify-between mb-5 sm:mb-6 relative z-10">
                                        <span
                                            className="font-mono text-3xl sm:text-4xl font-bold transition-all duration-500"
                                            style={{
                                                color: isCompleted
                                                    ? "transparent"
                                                    : "rgba(100,100,120,0.6)",
                                                WebkitTextFillColor: isCompleted ? "#00f0ff" : undefined,
                                            }}
                                        >
                                            {step.id}
                                        </span>
                                        <div
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-500 text-sm
                                                ${isCompleted
                                                    ? "border-neon-blue/60 bg-neon-blue/15 text-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                                                    : "border-white/10 group-hover:border-neon-blue/40"
                                                }`}
                                        >
                                            {isCompleted ? "✓" : step.icon}
                                        </div>
                                    </div>

                                    <h3 className={`font-semibold text-sm sm:text-base tracking-wide mb-2 sm:mb-3 transition-colors duration-300 relative z-10 ${isCompleted ? "text-neon-blue" : "text-white group-hover:text-neon-blue"}`}>
                                        {step.phase}
                                    </h3>

                                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light relative z-10 group-hover:text-gray-400 transition-colors duration-300">
                                        {step.description}
                                    </p>

                                    {/* Bottom progress bar */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: isCompleted ? "100%" : "0%" }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ background: "linear-gradient(90deg, #00f0ff, #818cf8)" }}
                                    />

                                    {/* "Next" pulse indicator */}
                                    {isNext && !prefersReducedMotion && (
                                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
