"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const EDUCATION = [
    {
        degree: "B.E in Computer Science",
        school: "Chitkara University",
        year: "2023 – 2027",
        gpa: "In Progress",
        details: "Relevant Coursework: Network Security, Cryptography, Operating Systems, Object-Oriented Programming, Data Structures & Algorithms",
        highlights: ["Network Security", "Cryptography", "OS", "OOP"],
    },
];

export const Education = () => {
    return (
        <section id="education" className="py-20 sm:py-24 md:py-28 relative z-10 w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionReveal variant="slideUp" className="mb-12 sm:mb-16 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Academic</span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                        Where I&apos;m{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            Studying
                        </span>
                    </h2>
                </SectionReveal>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {EDUCATION.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            {/* Gradient border glow */}
                            <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-sm"
                                style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.3), rgba(129,140,248,0.2), rgba(168,85,247,0.15))" }}
                            />

                            <div
                                className="relative p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-white/5 group-hover:border-neon-blue/20 transition-colors duration-500 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
                                style={{
                                    background: "rgba(10,10,12,0.6)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                }}
                            >
                                {/* Animated icon */}
                                <div className="hidden sm:flex flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full items-center justify-center relative"
                                    style={{
                                        border: "1px solid rgba(0,240,255,0.4)",
                                        background: "rgba(0,240,255,0.05)",
                                        boxShadow: "0 0 30px rgba(0,240,255,0.1)",
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border border-dashed border-neon-indigo/40"
                                    />
                                    <span className="font-mono text-neon-blue font-bold text-lg md:text-2xl">{"{ }"}</span>
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue font-mono text-[10px] sm:text-xs tracking-wider mb-3 sm:mb-4">
                                        {edu.year}
                                    </span>
                                    <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{edu.degree}</h4>
                                    <p className="text-neon-indigo font-mono text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
                                        @ {edu.school}
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
                                        {edu.details}
                                    </p>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                        {edu.highlights.map((h) => (
                                            <span key={h} className="px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs border border-neon-blue/15 bg-neon-blue/5 text-neon-blue/80 tracking-wider">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
