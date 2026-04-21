"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCTF } from "@/contexts/CTFContext";

const STEPS = [
    {
        phase: "Reconnaissance",
        id: "01",
        description: "Before touching anything, I map out what I'm dealing with. Passive enumeration, OSINT, subdomain discovery — building a complete picture before the target even knows I'm looking.",
    },
    {
        phase: "Vulnerability Analysis",
        id: "02",
        description: "Automated scanners catch the obvious stuff. I go deeper — hunting logical flaws, auth bypasses, and misconfigs that tools consistently overlook.",
    },
    {
        phase: "Exploitation",
        id: "03",
        description: "This is where it gets interesting. Crafting exploits, chaining vulnerabilities, bypassing filters — and keeping meticulous notes of every step along the way.",
    },
    {
        phase: "Post Exploitation",
        id: "04",
        description: "Once in, the goal is showing real impact. Privilege escalation, pivoting through the network, and demonstrating what an attacker could actually get away with.",
    },
    {
        phase: "Reporting",
        id: "05",
        description: "A clear, developer-friendly report: technical details, working PoCs, risk ratings, and specific steps to fix things. No jargon for its own sake.",
    }
];

export const Methodology = () => {
    const { captureFlag, isCaptured } = useCTF();
    const flag8 = "FLAG{m3th0d_m4st3r}";
    const hoveredSequence = useRef<number[]>([]);
    const [seqProgress, setSeqProgress] = useState(0);
    const seqTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            // Wrong order — reset
            hoveredSequence.current = [];
            setSeqProgress(0);
        }
    };

    return (
        <section className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-indigo/30 bg-neon-indigo/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-indigo font-mono text-[10px] sm:text-xs tracking-widest uppercase">Process</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        How I <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Approach Work</span>
                    </h2>
                </motion.div>

                {/* Responsive grid: 1 col mobile, 2 col tablet, 5 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 relative z-10">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="h-full"
                        >
                            <div
                                onMouseEnter={() => handleStepHover(idx)}
                                className={`h-full glass rounded-2xl p-5 sm:p-6 border flex flex-col group transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,240,255,0.08)] relative overflow-hidden
                                    ${isCaptured(flag8) ? 'border-neon-blue/30' : idx < seqProgress ? 'border-neon-blue/20' : 'border-white/5 hover:border-neon-blue/40'}
                                `}>
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-indigo/0 group-hover:from-neon-blue/5 group-hover:to-neon-indigo/10 transition-colors duration-500 blur-xl z-0"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                                        <span className="font-mono text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-neon-blue group-hover:to-neon-indigo transition-all duration-500">
                                            {step.id}
                                        </span>
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-blue/50 group-hover:bg-neon-blue/10 transition-colors duration-500">
                                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-500 group-hover:shadow-[0_0_8px_rgba(0,240,255,0.8)] ${idx < seqProgress || isCaptured(flag8) ? 'bg-neon-blue shadow-[0_0_6px_rgba(0,240,255,0.6)]' : 'bg-gray-600 group-hover:bg-neon-blue'}`}></div>
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-semibold text-white text-base sm:text-lg tracking-wide mb-2 sm:mb-3 group-hover:text-neon-blue transition-colors duration-300">
                                        {step.phase}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                                        {step.description}
                                    </p>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-neon-blue to-neon-indigo group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
