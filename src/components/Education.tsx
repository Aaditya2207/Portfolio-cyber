"use client";

import React from "react";
import { motion } from "framer-motion";

const EDUCATION = [
    {
        degree: "B.E in Computer Science",
        school: "Chitkara University",
        year: "2023 – 2027",
        details: "Relevant Coursework: Network Security, Cryptography,Operating Systems, OOP"
    }
];

export const Education = () => {
    return (
        <section id="education" className="py-20 sm:py-24 md:py-28 relative z-10 w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Academic</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                        Where I&apos;m <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Studying</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {EDUCATION.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-neon-blue/20 via-neon-indigo/20 to-neon-purple/20 opacity-60 blur-sm"></div>

                            <div className="relative glass p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 hover:border-neon-blue/30 transition-colors duration-500">

                                {/* Icon — hidden on smallest screens */}
                                <div className="hidden sm:flex flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-dark-bg border border-neon-blue/50 items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.12)] relative">
                                    <div className="absolute inset-0 rounded-full border border-dashed border-neon-indigo animate-[spin_10s_linear_infinite]"></div>
                                    <span className="font-mono text-neon-blue font-bold text-lg md:text-2xl">{"{}"}</span>
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-blue font-mono text-[10px] sm:text-xs tracking-wider mb-3 sm:mb-4">
                                        {edu.year}
                                    </span>
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{edu.degree}</h4>
                                    <p className="text-neon-indigo font-mono text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">{`@ ${edu.school}`}</p>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                                        {edu.details}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
