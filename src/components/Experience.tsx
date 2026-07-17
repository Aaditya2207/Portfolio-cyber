"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const EXPERIENCES = [
    {
        title: "MythX",
        organization: "KIET Group of Institutions",
        date: "April 2026",
        rank: "9th / 200+",
        rankLabel: "National",
        duration: "24h",
        teamSize: "Solo",
        description:
            "Achieved an outstanding 9th position in the offline final round of a national-level 24-hour Capture The Flag competition at KIET College campus, demonstrating advanced technical skills under high-pressure conditions.",
        cipherHint: null,
        accentColor: "#00f0ff",
        trophy: "🥈",
        tags: ["Offensive Sec", "Forensics", "Crypto"],
    },
    {
        title: "CREST CTF 2026",
        organization: "CREST Cyber Club — Pimpri Chinchwad University",
        date: "March 2026",
        rank: "Top 15%",
        rankLabel: "Team",
        duration: "8h",
        teamSize: "4 members",
        description:
            "Participated in an 8-hour team-based CTF organised by CREST Cyber Club, collaborating to solve challenges across cryptography, web security, forensics, and reverse engineering.",
        cipherHint: null,
        accentColor: "#818cf8",
        trophy: "🏅",
        tags: ["Crypto", "Web Sec", "Rev Eng"],
    },
    {
        title: "EY DSCI National CTF Hackathon",
        organization: "EY DSCI",
        date: "December 2025",
        rank: "Top 40 / 150+",
        rankLabel: "National",
        duration: "8h",
        teamSize: "2 members",
        description:
            "Led a 2-person team through 8 straight hours of AD exploitation, binary reversing, and some genuinely evil forensics challenges. Finished in the top 40 nationally.",
        cipherHint: "SYNT{e0g_gu3_j0eyq}",
        accentColor: "#a855f7",
        trophy: "🏆",
        tags: ["AD Exploitation", "Binary Rev", "Forensics"],
    },
];

const TimelineCard = ({
    exp,
    idx,
    isRight,
}: {
    exp: typeof EXPERIENCES[0];
    idx: number;
    isRight: boolean;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row items-start md:items-center group ${isRight ? "md:flex-row-reverse" : ""}`}
        >
            {/* Timeline dot */}
            <div
                className="absolute left-[14px] sm:left-[18px] md:left-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-dark-bg z-10 mt-5 sm:mt-6 md:mt-0 md:-translate-x-1/2 transition-all duration-300 group-hover:scale-125 shadow-lg"
                style={{
                    background: exp.accentColor,
                    boxShadow: `0 0 16px ${exp.accentColor}70`,
                    borderColor: "var(--th-bg)",
                }}
            />

            {/* Card */}
            <div className={`w-full ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${isRight ? "md:pl-14 lg:pl-20" : "md:pr-14 lg:pr-20"}`}>
                <div
                    className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/5 group-hover:border-white/10 transition-all duration-500 overflow-hidden"
                    style={{
                        background: "rgba(10,10,12,0.55)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.5), 0 0 40px ${exp.accentColor}10`;
                        e.currentTarget.style.borderColor = `${exp.accentColor}25`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                >
                    {/* Top glow */}
                    <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${exp.accentColor}20, transparent)` }}
                    />

                    {/* Trophy + date row */}
                    <div className="flex items-start justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-2xl sm:text-3xl" role="img" aria-label="Trophy">
                                {exp.trophy}
                            </span>
                            <div>
                                <span
                                    className="font-mono text-xs sm:text-sm tracking-wider"
                                    style={{ color: exp.accentColor }}
                                >
                                    {exp.date}
                                </span>
                                {/* FLAG-03: ROT13 encoded cipher hint */}
                                {exp.cipherHint && (
                                    <span
                                        title="Something looks encoded... try: rot13 <this_text> in the terminal"
                                        className="ml-2 font-mono text-[8px] sm:text-[9px] text-gray-700 hover:text-gray-500 transition-colors cursor-help tracking-wider select-all"
                                    >
                                        {exp.cipherHint}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Rank badge */}
                        <div
                            className="flex-shrink-0 px-3 py-1.5 rounded-xl font-mono text-[9px] sm:text-[10px] tracking-widest border font-semibold"
                            style={{
                                borderColor: `${exp.accentColor}40`,
                                background: `${exp.accentColor}10`,
                                color: exp.accentColor,
                            }}
                        >
                            {exp.rank}
                        </div>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 leading-tight transition-colors duration-300"
                        style={{ "--hover-color": exp.accentColor } as React.CSSProperties}
                    >
                        {exp.title}
                    </h3>
                    <h4 className="text-gray-500 font-mono text-[9px] sm:text-[11px] mb-4 tracking-widest uppercase">
                        @ {exp.organization}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {exp.description}
                    </p>

                    {/* Stat chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            { label: "Duration", value: exp.duration },
                            { label: "Team", value: exp.teamSize },
                            { label: "Level", value: exp.rankLabel },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col px-3 py-1.5 rounded-xl border border-white/8 bg-white/5"
                            >
                                <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                                <span className="font-mono text-xs text-white font-semibold">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full font-mono text-[9px] sm:text-[10px] border tracking-wider"
                                style={{
                                    borderColor: `${exp.accentColor}25`,
                                    background: `${exp.accentColor}08`,
                                    color: exp.accentColor,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Bottom gradient bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] rounded-full"
                        initial={{ width: "0%" }}
                        animate={inView ? { width: "100%" } : {}}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: `linear-gradient(90deg, ${exp.accentColor}, transparent)` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export const Experience = () => {
    const lineRef = React.useRef<HTMLDivElement>(null);
    const lineInView = useInView(lineRef, { once: true });

    return (
        <section id="experience" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <SectionReveal variant="slideUp" className="mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center mt-8 sm:mt-12">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                            CTF Competitions
                        </span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
                        Competitions I&apos;ve{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            Competed In
                        </span>
                    </h2>
                </SectionReveal>

                {/* Timeline */}
                <div className="relative" ref={lineRef}>
                    {/* Animated vertical line */}
                    <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-[1px] sm:w-[2px] overflow-hidden md:-translate-x-1/2 rounded-full">
                        <motion.div
                            className="w-full bg-gradient-to-b from-neon-blue/60 via-neon-indigo/40 to-neon-purple/20 rounded-full"
                            initial={{ height: "0%" }}
                            animate={lineInView ? { height: "100%" } : {}}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        />
                    </div>

                    <div className="space-y-10 sm:space-y-12 md:space-y-16">
                        {EXPERIENCES.map((exp, idx) => (
                            <TimelineCard
                                key={idx}
                                exp={exp}
                                idx={idx}
                                isRight={idx % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
