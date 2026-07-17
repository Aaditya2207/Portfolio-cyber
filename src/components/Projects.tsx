"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useCTF } from "@/contexts/CTFContext";

type Tag = "All" | "Security" | "ML" | "Network" | "Cloud";

const PROJECTS = [
    {
        title: "PackageGuard Scanner",
        description:
            "A full-stack security application that analyses GitHub repositories and packages for vulnerabilities, with a modern React dashboard and a Node.js backend for deep dependency analysis.",
        tags: ["TypeScript", "React", "Node.js", "Security"],
        category: ["Security"] as Tag[],
        links: { github: "" },
        accent: "#00f0ff",
        iconText: "PG",
        status: "In Development",
        hasChallenge: false,
    },
    {
        title: "Zero Trust Network Access Simulator",
        description:
            "Built to understand how ZTNA policy decisions work — device posture checks, identity context, behavioural analytics. A practical learning tool that turned into a proper project.",
        tags: ["Python", "Flask", "Cryptography", "Network Auth"],
        category: ["Security", "Network"] as Tag[],
        links: { github: "", live: "" },
        accent: "#818cf8",
        iconText: "ZTNA",
        status: "In Development",
        hasChallenge: true,
    },
    {
        title: "Automated Nmap Report Tool",
        description:
            "Nmap output is painful to read. This tool chains scans intelligently and outputs a clean, modern HTML report, using AI to adapt the scanning strategy to discovered hosts.",
        tags: ["Python", "Nmap", "HTML/CSS", "AI Integration"],
        category: ["Security", "Network"] as Tag[],
        links: { github: "" },
        accent: "#00f0ff",
        iconText: "NMAP",
        status: "Complete",
        hasChallenge: false,
    },
    {
        title: "AI Phishing Detection System",
        description:
            "Detects and flags phishing attempts using ML — analysing email content, URLs, and sender patterns to identify malicious intent. Built as a security experiment, evolved into a robust real-time threat detection tool.",
        tags: ["Python", "NLP", "Cybersecurity", "Machine Learning"],
        category: ["Security", "ML"] as Tag[],
        links: { github: "", live: "" },
        accent: "#a855f7",
        iconText: "ADS",
        status: "Complete",
        hasChallenge: false,
    },
    {
        title: "Network Baseline Monitor",
        description:
            "Monitors network traffic baselines and flags anomalies — beaconing patterns, lateral movement, unexpected spikes. Started as a uni project, grew into something genuinely useful.",
        tags: ["Python", "libpcap", "Traffic Analysis", "Machine Learning"],
        category: ["Network", "ML"] as Tag[],
        links: { github: "", live: "" },
        accent: "#818cf8",
        iconText: "NBM",
        status: "In Development",
        hasChallenge: false,
    },
];

const FILTERS: Tag[] = ["All", "Security", "ML", "Network"];

const flag4 = "FLAG{cl1ck_h4ck_r3p34t}";

// Spotlight card — tracks mouse within each card
const SpotlightCard = ({
    children,
    accent,
    hasChallenge,
    isChallengeActive,
    onChallengeClick,
    challengeClicks,
    className = "",
}: {
    children: React.ReactNode;
    accent: string;
    hasChallenge: boolean;
    isChallengeActive: boolean;
    onChallengeClick?: () => void;
    challengeClicks: number;
    className?: string;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: `${e.clientX - rect.left}px`,
            y: `${e.clientY - rect.top}px`,
        });
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 ${className}`}
            style={{
                background: "rgba(10,10,12,0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: isHovered
                    ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accent}10`
                    : "0 4px 30px rgba(0,0,0,0.3)",
                borderColor: isHovered ? `${accent}30` : undefined,
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            }}
        >
            {/* Spotlight overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x} ${mousePos.y}, ${accent}08, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                }}
            />

            {/* Top banner */}
            <div
                className="relative h-40 sm:h-44 w-full overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${accent}18, rgba(10,10,12,0.8))` }}
            >
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                    }}
                />
                {/* Scan line on hover */}
                {isHovered && (
                    <motion.div
                        initial={{ top: "-5%" }}
                        animate={{ top: "105%" }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-[1.5px] z-20 pointer-events-none"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
                            boxShadow: `0 0 8px ${accent}60`,
                        }}
                    />
                )}
                {/* Challenge badge */}
                {hasChallenge && (
                    <div
                        onClick={onChallengeClick}
                        title={
                            isChallengeActive
                                ? "✓ Captured"
                                : `Click ${3 - challengeClicks} more time${3 - challengeClicks !== 1 ? "s" : ""}…`
                        }
                        className={`relative z-30 text-4xl sm:text-5xl font-bold font-mono tracking-widest select-none
                            ${hasChallenge ? "cursor-pointer" : ""}
                            ${isChallengeActive
                                ? "text-transparent bg-clip-text"
                                : "text-white/30 group-hover:text-white/70 hover:text-white/90 active:scale-95"
                            }`}
                        style={
                            isChallengeActive
                                ? { WebkitTextFillColor: accent, filter: `drop-shadow(0 0 16px ${accent})` }
                                : {}
                        }
                    >
                        {PROJECTS.find(p => p.hasChallenge)?.iconText ?? ""}
                        {hasChallenge && !isChallengeActive && challengeClicks > 0 && (
                            <span className="absolute -top-3 -right-3 text-[9px] font-bold" style={{ color: accent }}>
                                {challengeClicks}/3
                            </span>
                        )}
                    </div>
                )}
                {!hasChallenge && (
                    <span className="relative z-10 text-4xl sm:text-5xl font-bold font-mono tracking-widest text-white/25 group-hover:text-white/60 transition-colors duration-500">
                        {PROJECTS.find(p => p === children) ? "" : ""}
                    </span>
                )}
            </div>

            {children}
        </div>
    );
};

export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState<Tag>("All");
    const [ztnaClicks, setZtnaClicks] = useState(0);
    const { captureFlag, isCaptured } = useCTF();

    const handleZtnaClick = () => {
        if (isCaptured(flag4)) return;
        const newCount = ztnaClicks + 1;
        setZtnaClicks(newCount);
        if (newCount >= 3) { captureFlag(flag4); setZtnaClicks(0); }
    };

    const filtered = PROJECTS.filter(
        (p) => activeFilter === "All" || p.category.includes(activeFilter)
    );

    return (
        <section id="projects" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <SectionReveal variant="slideUp" className="mb-10 sm:mb-14 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                            Operations
                        </span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
                        Things I&apos;ve{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            Built
                        </span>
                    </h2>
                </SectionReveal>

                {/* Filter tabs */}
                <SectionReveal variant="fadeIn" delay={0.1} className="mb-8 sm:mb-10">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {FILTERS.map((filter) => (
                            <motion.button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-4 py-1.5 rounded-full font-mono text-xs sm:text-sm tracking-wider border transition-all duration-300 ${
                                    activeFilter === filter
                                        ? "border-neon-blue/60 bg-neon-blue/10 text-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                                        : "border-white/10 bg-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                                }`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Projects grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full"
                            >
                                <div
                                    className="h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 group relative"
                                    style={{
                                        background: "rgba(10,10,12,0.5)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                    }}
                                    onMouseMove={(e) => {
                                        const el = e.currentTarget;
                                        const rect = el.getBoundingClientRect();
                                        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                                        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                                    }}
                                >
                                    {/* Spotlight layer */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accent}08, transparent 60%)`,
                                        }}
                                    />

                                    {/* Top banner */}
                                    <div
                                        className="relative h-40 sm:h-44 overflow-hidden flex items-center justify-center cursor-pointer"
                                        style={{
                                            background: `linear-gradient(135deg, ${project.accent}20, rgba(10,10,12,0.9))`,
                                        }}
                                        onClick={project.hasChallenge ? handleZtnaClick : undefined}
                                        title={project.hasChallenge ? (isCaptured(flag4) ? "✓ Captured" : `Click ${3 - ztnaClicks} more time${3 - ztnaClicks !== 1 ? "s" : ""}…`) : undefined}
                                    >
                                        {/* Dot grid */}
                                        <div
                                            className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                                            style={{
                                                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                                                backgroundSize: "22px 22px",
                                            }}
                                        />
                                        {/* Scan line */}
                                        <motion.div
                                            className="absolute left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 pointer-events-none"
                                            initial={false}
                                            animate={{ top: ["0%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)` }}
                                        />
                                        {/* Icon text */}
                                        <span
                                            className={`relative z-10 text-3xl sm:text-4xl font-bold font-mono tracking-widest transition-all duration-500
                                                ${project.hasChallenge
                                                    ? isCaptured(flag4)
                                                        ? "text-transparent"
                                                        : "text-white/30 group-hover:text-white/70"
                                                    : "text-white/30 group-hover:text-white/70"
                                                }`}
                                            style={project.hasChallenge && isCaptured(flag4)
                                                ? { WebkitTextFillColor: project.accent, filter: `drop-shadow(0 0 20px ${project.accent})` }
                                                : {}
                                            }
                                        >
                                            {project.iconText}
                                            {project.hasChallenge && !isCaptured(flag4) && ztnaClicks > 0 && (
                                                <span className="absolute -top-3 -right-3 text-[9px] font-bold" style={{ color: project.accent }}>
                                                    {ztnaClicks}/3
                                                </span>
                                            )}
                                        </span>

                                        {/* Status badge */}
                                        <div
                                            className="absolute top-3 left-3 px-2 py-1 rounded-full font-mono text-[9px] sm:text-[10px] border tracking-wider"
                                            style={{
                                                borderColor: `${project.accent}30`,
                                                background: `${project.accent}10`,
                                                color: project.accent,
                                            }}
                                        >
                                            {project.status}
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                                            <h3
                                                className="text-base sm:text-lg md:text-xl font-semibold text-white transition-colors duration-300 leading-tight group-hover:text-opacity-90"
                                                style={{ "--tw-text-opacity": "1" } as React.CSSProperties}
                                            >
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-3 sm:gap-4 pt-0.5 flex-shrink-0">
                                                {project.links.github !== "" && (
                                                    <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                                                        className="text-gray-600 hover:text-white transition-colors hover:scale-110 duration-200">
                                                        <FaGithub size={17} />
                                                    </a>
                                                )}
                                                {project.links.live && project.links.live !== "" && (
                                                    <a href={project.links.live} target="_blank" rel="noreferrer" aria-label="Live Demo"
                                                        className="text-gray-600 hover:text-white transition-colors hover:scale-110 duration-200">
                                                        <FaExternalLinkAlt size={15} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 sm:mb-6">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono rounded-full border border-white/8 bg-white/5 text-gray-400 tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom gradient line on hover */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
