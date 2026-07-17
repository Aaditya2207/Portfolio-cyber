"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useCTF } from "@/contexts/CTFContext";
import {
    FaPython, FaNetworkWired, FaServer,
    FaLinux, FaAws, FaShieldAlt, FaTerminal,
    FaDocker, FaCloud, FaLock
} from "react-icons/fa";
import { SiKalilinux, SiWireshark, SiMetasploit, SiBurpsuite, SiCisco } from "react-icons/si";

interface Skill {
    name: string;
    icon: React.ReactNode;
    level?: number; // 0-100
}

interface SkillCategory {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    colClass: string;
    skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: "Offensive Security",
        subtitle: "Attack surface mapping & exploitation",
        icon: <FaShieldAlt />,
        color: "#00f0ff",
        colClass: "md:col-span-2",
        skills: [
            { name: "Pen Testing", icon: <SiKalilinux />, level: 75 },
            { name: "Web App Sec", icon: <SiBurpsuite />, level: 70 },
            { name: "Exploitation", icon: <SiMetasploit />, level: 65 },
            { name: "Social Engineering", icon: <FaTerminal />, level: 60 },
        ],
    },
    {
        title: "Network Security",
        subtitle: "Defense through deep packet understanding",
        icon: <FaNetworkWired />,
        color: "#818cf8",
        colClass: "md:col-span-1",
        skills: [
            { name: "Traffic Analysis", icon: <SiWireshark />, level: 80 },
            { name: "Cisco Networking", icon: <SiCisco />, level: 70 },
            { name: "Firewall / IDS", icon: <FaShieldAlt />, level: 65 },
            { name: "Linux / Unix", icon: <FaLinux />, level: 85 },
            { name: "VPN & Tunneling", icon: <FaLock />, level: 60 },
            { name: "Active Directory", icon: <FaServer />, level: 55 },
        ],
    },
    {
        title: "Cloud Fundamentals",
        subtitle: "Securing infrastructure at scale",
        icon: <FaCloud />,
        color: "#a855f7",
        colClass: "md:col-span-3",
        skills: [
            { name: "AWS IAM", icon: <FaAws />, level: 70 },
            { name: "S3 Security", icon: <FaLock />, level: 65 },
            { name: "VPC & Sec Groups", icon: <FaNetworkWired />, level: 68 },
            { name: "Shared Resp. Model", icon: <FaShieldAlt />, level: 75 },
            { name: "Docker Basics", icon: <FaDocker />, level: 60 },
            { name: "Python Scripting", icon: <FaPython />, level: 82 },
        ],
    },
];

// Skill card with animated bar
const SkillCard = ({
    skill,
    isPenTest,
    captured,
    onClick,
    clickProgress,
    color,
}: {
    skill: Skill;
    isPenTest: boolean;
    captured: boolean;
    onClick?: () => void;
    clickProgress: number;
    color: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div
            ref={ref}
            onClick={onClick}
            title={isPenTest && !captured ? `Click ${5 - clickProgress} more time${5 - clickProgress !== 1 ? "s" : ""} to unlock...` : undefined}
            className={`relative flex flex-col gap-3 p-3 sm:p-4 rounded-2xl border transition-all duration-300 group/skill overflow-hidden
                ${isPenTest
                    ? captured
                        ? "border-neon-blue/50 bg-neon-blue/10 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                        : "border-white/8 hover:border-neon-blue/40 cursor-pointer bg-dark-bg/30"
                    : "border-white/8 hover:border-white/20 cursor-default bg-dark-bg/30"
                } hover:bg-white/5`}
        >
            {/* Glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${color}08, transparent 70%)` }}
            />

            {/* Click counter */}
            {isPenTest && !captured && clickProgress > 0 && (
                <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-neon-blue/70 tracking-widest">
                    {clickProgress}/5
                </div>
            )}
            {isPenTest && captured && (
                <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-neon-blue tracking-widest">✓</div>
            )}

            {/* Icon */}
            <div
                className="text-2xl sm:text-3xl transition-all duration-300 group-hover/skill:scale-110 group-hover/skill:-translate-y-0.5 relative z-10"
                style={{ color: (captured && isPenTest) ? color : undefined }}
            >
                <span className={`${captured && isPenTest ? "" : "text-gray-500 group-hover/skill:text-gray-300"} transition-colors duration-300`}>
                    {skill.icon}
                </span>
            </div>

            {/* Label */}
            <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 group-hover/skill:text-gray-200 transition-colors text-center leading-tight relative z-10 tracking-wider">
                {skill.name}
            </span>

            {/* Skill bar */}
            {skill.level !== undefined && (
                <div className="skill-bar-track relative z-10">
                    <motion.div
                        className="skill-bar-fill"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: inView ? skill.level / 100 : 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            background: `linear-gradient(90deg, ${color}cc, ${color}66)`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export const Skills = () => {
    const { captureFlag, isCaptured } = useCTF();
    const flag6 = "FLAG{sk1lls_4_d4yz}";
    const clickCount = useRef(0);
    const [clickProgress, setClickProgress] = useState(0);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handlePenTestClick = () => {
        if (isCaptured(flag6)) return;
        clickCount.current += 1;
        setClickProgress(clickCount.current);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        if (clickCount.current >= 5) {
            captureFlag(flag6);
            clickCount.current = 0;
            setClickProgress(0);
        } else {
            resetTimer.current = setTimeout(() => {
                clickCount.current = 0;
                setClickProgress(0);
            }, 3000);
        }
    };

    return (
        <section id="tools" className="py-20 sm:py-24 md:py-32 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <SectionReveal variant="slideUp" className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-indigo/30 bg-neon-indigo/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-indigo font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                            Capabilities
                        </span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
                        What I{" "}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">
                            Work With
                        </span>
                    </h2>
                </SectionReveal>

                {/* Premium Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={`${category.colClass} h-full`}
                        >
                            <div
                                className="h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 group relative overflow-hidden transition-all duration-500 border border-white/5 hover:border-white/10"
                                style={{
                                    background: "rgba(10,10,12,0.5)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                }}
                            >
                                {/* Background glow */}
                                <div
                                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(circle, ${category.color}15, transparent 70%)` }}
                                />
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${category.color}06, transparent)`,
                                    }}
                                />

                                {/* Category header */}
                                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-10">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border border-white/10 group-hover:border-white/20 transition-colors duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)`,
                                            color: category.color,
                                            boxShadow: `0 0 20px ${category.color}10`,
                                        }}
                                    >
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide leading-tight">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 text-[10px] sm:text-xs font-mono mt-0.5 leading-relaxed">
                                            {category.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Skills grid */}
                                <div
                                    className={`grid gap-2.5 sm:gap-3 ${
                                        category.colClass.includes("col-span-3")
                                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                            : "grid-cols-2"
                                    }`}
                                >
                                    {category.skills.map((skill) => {
                                        const isPenTest = skill.name === "Pen Testing";
                                        const captured6 = isCaptured(flag6);
                                        return (
                                            <SkillCard
                                                key={skill.name}
                                                skill={skill}
                                                isPenTest={isPenTest}
                                                captured={captured6}
                                                onClick={isPenTest ? handlePenTestClick : undefined}
                                                clickProgress={clickProgress}
                                                color={category.color}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Bottom gradient line */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
