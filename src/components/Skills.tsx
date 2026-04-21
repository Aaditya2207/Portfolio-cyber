"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCTF } from "@/contexts/CTFContext";
import {
    FaPython, FaRust, FaJs, FaNetworkWired, FaServer,
    FaLinux, FaAws, FaShieldAlt, FaTerminal, FaCodeBranch
} from "react-icons/fa";
import { SiKalilinux, SiWireshark, SiMetasploit, SiBurpsuite } from "react-icons/si";

const SKILL_CATEGORIES = [
    {
        title: "Offensive Security",
        icon: <FaShieldAlt className="text-neon-blue" />,
        colSpan: "md:col-span-2",
        skills: [
            { name: "Pen Testing", icon: <SiKalilinux /> },
            { name: "Web App Sec", icon: <SiBurpsuite /> },
            { name: "Exploitation", icon: <SiMetasploit /> },
            { name: "Social Engineering", icon: <FaTerminal /> },
        ],
    },
    {
        title: "Network & Systems",
        icon: <FaNetworkWired className="text-neon-indigo" />,
        colSpan: "md:col-span-1",
        skills: [
            { name: "Traffic Analysis", icon: <SiWireshark /> },
            { name: "Net Forensics", icon: <FaNetworkWired /> },
            { name: "Linux / Unix", icon: <FaLinux /> },
            { name: "Active Directory", icon: <FaServer /> },
        ],
    },
    {
        title: "Development & Cloud",
        icon: <FaCodeBranch className="text-white" />,
        colSpan: "md:col-span-3",
        skills: [
            { name: "Python Scripting", icon: <FaPython /> },
            { name: "JavaScript / Node", icon: <FaJs /> },
        ],
    },
];

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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-start"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-indigo/30 bg-neon-indigo/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-indigo font-mono text-[10px] sm:text-xs tracking-widest uppercase">Capabilities</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        What I <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Work With</span>
                    </h2>
                </motion.div>

                {/* Responsive Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.15 }}
                            className={`${category.colSpan} h-full`}
                        >
                            <div className="h-full rounded-2xl sm:rounded-3xl glass p-5 sm:p-6 md:p-8 group relative overflow-hidden transition-all duration-500 hover:border-neon-blue/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.05)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 via-transparent to-neon-indigo/0 group-hover:from-neon-blue/5 group-hover:to-neon-indigo/5 transition-colors duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                                            {category.icon}
                                        </div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-wide">
                                            {category.title}
                                        </h3>
                                    </div>

                                    <div className={`grid gap-3 sm:gap-4 ${category.colSpan.includes("col-span-3") ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-2"}`}>
                                        {category.skills.map((skill) => {
                                            const isPenTest = skill.name === "Pen Testing";
                                            const captured6 = isCaptured(flag6);
                                            return (
                                                <div
                                                    key={skill.name}
                                                    onClick={isPenTest ? handlePenTestClick : undefined}
                                                    className={`flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-dark-bg/40 border transition-all duration-300 group/item relative overflow-hidden
                                                        ${isPenTest
                                                            ? captured6
                                                                ? "border-neon-blue/50 bg-neon-blue/10 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                                                                : "border-white/5 hover:bg-white/5 hover:border-neon-blue/40 cursor-pointer"
                                                            : "border-white/5 hover:bg-white/5 hover:border-neon-blue/20 cursor-default"
                                                        }`}
                                                    title={isPenTest && !captured6 ? `Click ${5 - clickProgress} more time${5 - clickProgress !== 1 ? 's' : ''} to unlock...` : undefined}
                                                >
                                                    {isPenTest && !captured6 && clickProgress > 0 && (
                                                        <div className="absolute top-1 right-1 font-mono text-[8px] text-neon-blue/60 tracking-widest">
                                                            {clickProgress}/5
                                                        </div>
                                                    )}
                                                    {isPenTest && captured6 && (
                                                        <div className="absolute top-1 right-1 font-mono text-[8px] text-neon-blue tracking-widest">
                                                            ✓
                                                        </div>
                                                    )}
                                                    <div className={`text-2xl sm:text-3xl transition-colors duration-300 transform group-hover/item:scale-110 ${captured6 && isPenTest ? 'text-neon-blue' : 'text-gray-500 group-hover/item:text-neon-blue'}`}>
                                                        {skill.icon}
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs font-mono text-gray-400 group-hover/item:text-white text-center tracking-wider leading-tight">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
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
