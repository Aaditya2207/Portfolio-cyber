"use client";

import React from "react";
import { motion } from "framer-motion";

const EXPERIENCES = [
    {
        title: "MythX",
        organization: "KIET Group of Institutions",
        date: "April 2026",
        description: "Achieved an outstanding 9th position in the offline final round of a national-level 24-hour Capture The Flag (CTF) competition, held at KIET College campus, demonstrating advanced technical skills and teamwork under high-pressure conditions.",
        cipherHint: null,
    },
    {
        title: "CREST CTF 2026",
        organization: "CREST Cyber Club - Pimpri Chinchwad University",
        date: "March 2026",
        description: "Participated in an 8-hour team-based CTF organized by CREST Cyber Club (March 2026), collaborating in a team of four to solve challenges across cryptography, web security, forensics, and reverse engineering.",
        cipherHint: null,
    },
    {
        title: "EY DSCI National CTF Hackathon - Top 40 out of 150+ teams",
        organization: "EY DSCI",
        date: "December 2025",
        description: "Led a 2-person team through 8 straight hours of AD exploitation, binary reversing, and some genuinely evil forensics challenges.",
        // FLAG-03 clue: ROT13 encoded flag hidden as a faint cipher beside the date
        cipherHint: "SYNT{e0g_gu3_j0eyq}",
    }

];

export const Experience = () => {
    return (
        <section id="experience" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center mt-8 sm:mt-12"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">CTF Competitions</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Competitions I&apos;ve <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Competed In</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-[1px] sm:w-[2px] bg-gradient-to-b from-neon-blue/0 via-neon-indigo/40 to-neon-blue/0 md:-translate-x-1/2 rounded-full"></div>

                    <div className="space-y-10 sm:space-y-12 md:space-y-16">
                        {EXPERIENCES.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7, delay: idx * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="absolute left-[14px] sm:left-[18px] md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-dark-bg border-2 sm:border-[3px] border-neon-indigo md:-translate-x-1/2 z-10 shadow-[0_0_12px_rgba(168,85,247,0.5)] group-hover:bg-neon-blue group-hover:border-white transition-all duration-300 group-hover:scale-125 mt-5 sm:mt-6 md:mt-0"></div>

                                <div className={`w-full ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-14 lg:pl-16' : 'md:pr-14 lg:pr-16'}`}>
                                    <div className="glass p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/5 group-hover:border-neon-indigo/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(129,140,248,0.08)] relative overflow-hidden">
                                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-neon-indigo/10 blur-[35px] rounded-full group-hover:bg-neon-blue/20 transition-colors duration-500"></div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                            <span className="font-mono text-neon-blue text-xs sm:text-sm tracking-wider">{exp.date}</span>
                                            {/* FLAG-03: Faint ROT13 encoded cipher hint on first card */}
                                            {exp.cipherHint && (
                                                <span
                                                    title="Something looks encoded... try: rot13 <this_text> in the terminal"
                                                    className="font-mono text-[8px] sm:text-[9px] text-gray-700 hover:text-gray-500 transition-colors cursor-help tracking-wider select-all"
                                                >
                                                    {exp.cipherHint}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 group-hover:text-neon-blue transition-colors duration-300 leading-tight">{exp.title}</h3>
                                        <h4 className="text-gray-400 font-mono text-[10px] sm:text-[13px] mb-3 sm:mb-4 tracking-widest uppercase">@ {exp.organization}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed relative z-10">{exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
