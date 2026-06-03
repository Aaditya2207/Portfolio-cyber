"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useCTF } from "@/contexts/CTFContext";

const PROJECTS = [
    {
        title: "PackageGuard Scanner",
        description: "A full-stack security application that analyzes GitHub repositories and packages for vulnerabilities. It features a modern React-based dashboard and a Node.js backend for deep dependency analysis.",
        tags: ["TypeScript", "React", "Node.js", "Security"],
        links: { github: "" },
        gradient: "from-neon-cyan/20 to-neon-blue/20",
        borderGlow: "group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]",
        iconText: "GUARD",
        hasChallenge: false,
    },
    {
        title: "Zero Trust Network Access Simulator",
        description: "Built this to actually understand how ZTNA policy decisions work — device posture checks, identity context, behavioral analytics. It's a practical learning tool that turned into a proper project.",
        tags: ["Python", "Flask", "Cryptography", "Network Auth"],
        links: { github: "", live: "" },
        gradient: "from-neon-blue/20 to-neon-indigo/20",
        borderGlow: "group-hover:border-neon-blue/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]",
        iconText: "ZTNA",
        hasChallenge: true, // FLAG-04 hidden here
    },
    {
        title: "Automated Nmap Report Tool",
        description: "Nmap output is painful to read. So I built a tool that chains scans intelligently and spits out a clean, modern HTML report. Uses a bit of AI to adapt the scanning strategy.",
        tags: ["Python", "Nmap", "HTML/CSS", "AI Integration"],
        links: { github: "" },
        gradient: "from-neon-indigo/20 to-neon-purple/20",
        borderGlow: "group-hover:border-neon-indigo/50 group-hover:shadow-[0_0_30px_rgba(129,140,248,0.12)]",
        iconText: "NMAP",
        hasChallenge: false,
    },
    {
        title: "AI Phishing Detection System",
        description: "Detects and flags phishing attempts using machine learning — analyzing email content, URLs, and sender patterns to identify malicious intent. Built initially as a security experiment, it evolved into a robust tool for real-time threat detection.",
        tags: ["Python", "NLP", "Cybersecurity", "Machine Learning"],
        links: { github: "", live: "" },
        gradient: "from-neon-purple/20 to-neon-blue/20",
        borderGlow: "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
        iconText: "ADS",
        hasChallenge: false,
    },
    {
        title: "Network Baseline Monitor",
        description: "Monitors network traffic baselines and flags anomalies — beaconing patterns, lateral movement, unexpected spikes. Started as a uni project, grew into something I'm genuinely proud of.",
        tags: ["Python", "libpcap", "Traffic Analysis", "Machine Learning"],
        links: { github: "", live: "" },
        gradient: "from-neon-purple/20 to-neon-blue/20",
        borderGlow: "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
        iconText: "NBM",
        hasChallenge: false,
    }
];

const flag4 = "FLAG{cl1ck_h4ck_r3p34t}";

export const Projects = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [ztnaClicks, setZtnaClicks] = useState(0);
    const { captureFlag, isCaptured } = useCTF();

    const handleZtnaClick = () => {
        if (isCaptured(flag4)) return;
        const newCount = ztnaClicks + 1;
        setZtnaClicks(newCount);
        if (newCount >= 3) {
            captureFlag(flag4);
            setZtnaClicks(0);
        }
    };

    return (
        <section id="projects" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-start"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Operations</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Things I&apos;ve <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Built</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                    {PROJECTS.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.15 }}
                            onHoverStart={() => setHoveredIndex(idx)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative h-full"
                        >
                            <div className={`h-full flex flex-col rounded-2xl sm:rounded-3xl glass p-1 transition-all duration-500 group border border-white/5 ${project.borderGlow}`}>

                                {/* Top graphic */}
                                <div className={`relative h-36 sm:h-40 md:h-48 rounded-t-[14px] sm:rounded-t-[22px] w-full overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                                    <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-[2px]"></div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 group-hover:scale-110 transition-transform duration-700"></div>

                                    {/* FLAG-04: ZTNA click target */}
                                    <div
                                        onClick={project.hasChallenge ? handleZtnaClick : undefined}
                                        title={project.hasChallenge ? `${isCaptured(flag4) ? "✓ Captured" : `Click ${3 - ztnaClicks} more time${3 - ztnaClicks !== 1 ? "s" : ""}…`}` : undefined}
                                        className={`relative z-10 text-3xl sm:text-4xl font-bold font-mono tracking-widest transition-all duration-500
                                            ${project.hasChallenge
                                                ? `cursor-pointer select-none ${isCaptured(flag4) ? "text-neon-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" : "text-white/40 group-hover:text-white/80 hover:text-neon-blue/60 active:scale-90"}`
                                                : "text-white/40 group-hover:text-white/80"
                                            }`}
                                    >
                                        {project.iconText}
                                        {/* Click counter hint */}
                                        {project.hasChallenge && !isCaptured(flag4) && ztnaClicks > 0 && (
                                            <span className="absolute -top-3 -right-3 text-[9px] text-neon-blue font-bold">
                                                {ztnaClicks}/3
                                            </span>
                                        )}
                                    </div>

                                    {hoveredIndex === idx && (
                                        <motion.div
                                            initial={{ top: "-10%" }}
                                            animate={{ top: "110%" }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 w-full h-[2px] bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 bg-dark-bg/40 rounded-b-[14px] sm:rounded-b-[22px]">
                                    <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 leading-tight">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3 sm:gap-4 pt-1 flex-shrink-0">
                                            {project.links.github && (
                                                <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-white transition-colors">
                                                    <FaGithub size={18} />
                                                </a>
                                            )}
                                            {project.links.live && (
                                                <a href={project.links.live} target="_blank" rel="noreferrer" aria-label="Live Demo" className="text-gray-500 hover:text-white transition-colors">
                                                    <FaExternalLinkAlt size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 mb-5 sm:mb-8 text-sm leading-relaxed flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-mono rounded bg-white/5 border border-white/5 text-gray-300">
                                                {tag}
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
