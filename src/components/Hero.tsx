"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from "react-icons/fa";
import { SiKalilinux, SiWireshark } from "react-icons/si";
import { FaShieldAlt, FaCloud, FaLock } from "react-icons/fa";

const WORDS = [
    "Network Security Learner",
    "Cloud Security Enthusiast",
    "Aspiring Network Security Engineer",
    "Penetration Tester",
];

const STATS = [
    { value: 3, suffix: "", label: "CTF Podiums" },
    { value: 5, suffix: "+", label: "Projects Built" },
    { value: 24, suffix: "h", label: "Longest Hackathon" },
    { value: 150, suffix: "+", label: "Teams Competed" },
];

// Orbital badge data — floats around the central sphere
const ORBITAL_BADGES = [
    { Icon: SiKalilinux, label: "Kali", color: "#00f0ff", angle: 0, radius: 155, duration: 20 },
    { Icon: FaShieldAlt, label: "Pentest", color: "#818cf8", angle: 72, radius: 155, duration: 20 },
    { Icon: FaCloud, label: "Cloud", color: "#a855f7", angle: 144, radius: 155, duration: 20 },
    { Icon: SiWireshark, label: "Wireshark", color: "#00f0ff", angle: 216, radius: 155, duration: 20 },
    { Icon: FaLock, label: "Security", color: "#818cf8", angle: 288, radius: 155, duration: 20 },
];

// Animated counter hook
const useCounter = (target: number, duration: number = 1800, startSignal: boolean = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!startSignal) return;
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, startSignal]);
    return count;
};

// Magnetic button wrapper
const MagneticWrapper = ({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (prefersReducedMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }, [strength, prefersReducedMotion]);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        ref.current.style.transform = "translate(0px, 0px)";
        ref.current.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.15s ease", display: "inline-block" }}
        >
            {children}
        </div>
    );
};

export const Hero = () => {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const fullText = WORDS[wordIndex];

    // Typewriter effect
    useEffect(() => {
        let currentIndex = 0;
        setText("");
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setWordIndex((prev) => (prev + 1) % WORDS.length);
                }, 2200);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [wordIndex, fullText]);

    // Trigger stat counters when visible
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    const c0 = useCounter(STATS[0].value, 1500, statsVisible);
    const c1 = useCounter(STATS[1].value, 1600, statsVisible);
    const c2 = useCounter(STATS[2].value, 1700, statsVisible);
    const c3 = useCounter(STATS[3].value, 1800, statsVisible);
    const counts = [c0, c1, c2, c3];

    return (
        <>
            {/* FLAG{h3r0_0nl1n3} — ACCESS_GRANTED: if you can read source, you're already hacking. */}
            <section
                id="hero"
                className="relative min-h-[100svh] flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 overflow-hidden px-4 sm:px-6 lg:px-8"
            >
                {/* Hero-specific gradient mesh */}
                <div
                    className="absolute inset-0 pointer-events-none -z-10"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,240,255,0.08) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center py-10 sm:py-14">

                    {/* ── Left Content ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start text-left space-y-6 sm:space-y-8"
                    >
                        {/* Status badge */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue" />
                                </span>
                                <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                                    Available for Internships
                                </span>
                            </span>
                        </motion.div>

                        {/* Main headline */}
                        <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3 w-full">
                            <h1
                                className="font-bold tracking-tight text-white leading-[1.05]"
                                style={{
                                    fontSize: "clamp(46px, 7vw, 88px)",
                                    letterSpacing: "-0.035em",
                                }}
                            >
                                Hi, I&apos;m{" "}
                                <span className="text-shimmer">Aaditya.</span>
                            </h1>

                            {/* Typewriter subtitle */}
                            <div className="flex items-center h-7 sm:h-9 mt-2">
                                <span
                                    className="opacity-30 font-mono mr-2 sm:mr-3 select-none"
                                    style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
                                >
                                    //
                                </span>
                                <span
                                    className="text-white/80 font-mono tracking-wide"
                                    style={{ fontSize: "clamp(13px, 1.8vw, 18px)" }}
                                >
                                    {text}
                                </span>
                                <motion.span
                                    animate={{ opacity: prefersReducedMotion ? 1 : [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="inline-block w-[2px] sm:w-[3px] h-4 sm:h-5 ml-1 bg-neon-blue align-middle rounded-sm"
                                />
                            </div>
                        </motion.div>

                        {/* Bio paragraph */}
                        <motion.p
                            variants={itemVariants}
                            className="max-w-lg text-gray-400 font-light leading-[1.85]"
                            style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
                        >
                            A Computer Science student fascinated by how networks breathe and how clouds are secured. I dissect network protocols, harden cloud infrastructure, and explore how defenders think because understanding the attack surface is the first step to locking it down.

                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 sm:gap-5 pt-2 w-full"
                        >
                            <div className="flex flex-row gap-3 sm:gap-4">
                                <MagneticWrapper>
                                    <Button
                                        variant="primary"
                                        colorTheme="blue"
                                        className="px-5 py-2.5 sm:px-7 sm:py-3.5 text-dark-bg font-semibold"
                                        onClick={() =>
                                            document
                                                .querySelector("#projects")
                                                ?.scrollIntoView({ behavior: "smooth" })
                                        }
                                    >
                                        <span className="font-mono tracking-wider text-xs sm:text-sm flex items-center gap-2">
                                            See My Work
                                            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </MagneticWrapper>

                                <MagneticWrapper>
                                    <Button
                                        variant="outline"
                                        colorTheme="blue"
                                        className="px-5 py-2.5 sm:px-7 sm:py-3.5 font-semibold"
                                        onClick={() => window.open("/AADITYA_ResumeMain.pdf", "_blank")}
                                    >
                                        <span className="font-mono tracking-wider text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap">
                                            <FaDownload size={11} />
                                            Download CV
                                        </span>
                                    </Button>
                                </MagneticWrapper>
                            </div>

                            {/* Social links */}
                            <div className="flex items-center gap-5 sm:gap-6 pt-1 xs:pt-0">
                                <a
                                    href="https://github.com/Aaditya2207"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    className="text-gray-500 hover:text-neon-blue transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                                >
                                    <FaGithub size={22} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aaditya-kaushik2207/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-gray-500 hover:text-neon-blue transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                                >
                                    <FaLinkedin size={22} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            ref={statsRef}
                            variants={itemVariants}
                            className="grid grid-cols-4 gap-3 sm:gap-6 pt-4 w-full border-t border-white/5"
                        >
                            {STATS.map((stat, i) => (
                                <div key={stat.label} className="flex flex-col gap-0.5">
                                    <span className="font-mono font-bold text-white stat-counter" style={{ fontSize: "clamp(20px, 3vw, 32px)" }}>
                                        {counts[i]}{stat.suffix}
                                    </span>
                                    <span className="text-gray-500 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase leading-tight">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Right: 3D Orbital Graphic ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="hidden lg:flex justify-center items-center relative"
                        aria-hidden="true"
                    >
                        <div
                            className="relative flex items-center justify-center"
                            style={{ width: 420, height: 420 }}
                        >
                            {/* Outer ambient glow */}
                            <div
                                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(129,140,248,0.3) 40%, rgba(168,85,247,0.15) 70%, transparent 100%)",
                                }}
                            />

                            {/* Orbital ring 1 — tilted CW */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-neon-blue/25 border-t-neon-blue/70"
                                style={{ transform: "rotateX(70deg) rotateZ(0deg)" }}
                            />

                            {/* Orbital ring 2 — tilted CCW */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-10 rounded-full border border-neon-indigo/25 border-b-neon-indigo/70"
                                style={{ transform: "rotateX(50deg) rotateZ(30deg)" }}
                            />

                            {/* Orbital ring 3 — horizontal slow */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[60px] rounded-full border border-dashed border-white/10"
                                style={{ transform: "rotateX(20deg)" }}
                            />

                            {/* Core sphere */}
                            <div className="absolute w-32 h-32 rounded-full flex items-center justify-center"
                                style={{
                                    background: "radial-gradient(circle at 35% 35%, rgba(0,240,255,0.25), rgba(129,140,248,0.15) 50%, rgba(168,85,247,0.08) 80%, transparent)",
                                    boxShadow: "0 0 40px rgba(0,240,255,0.2), 0 0 80px rgba(129,140,248,0.1), inset 0 0 30px rgba(0,240,255,0.05)",
                                    border: "1px solid rgba(0,240,255,0.2)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                {/* Inner rotating diamond */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="w-10 h-10 border border-neon-blue/50 rotate-45 absolute"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border border-neon-indigo/60 rotate-45 absolute"
                                />
                                {/* Core dot */}
                                <div className="w-3 h-3 rounded-full bg-neon-blue pulse-glow-cyan" />
                            </div>

                            {/* Orbiting badges */}
                            {ORBITAL_BADGES.map((badge, idx) => (
                                <OrbitalBadge key={idx} {...badge} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-6 sm:bottom-10 left-8 sm:left-14 hidden md:flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: prefersReducedMotion ? 0 : [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-20 sm:h-28 bg-gradient-to-b from-neon-blue/60 to-transparent"
                    />
                    <span
                        title="Psst — real hackers read the source. Challenge 1 of 5."
                        className="font-mono text-[8px] text-neon-blue/30 tracking-[0.3em] hover:text-neon-blue/70 transition-colors cursor-default select-none"
                    >
                        [~]
                    </span>
                </motion.div>
            </section>
        </>
    );
};

// OrbitalBadge: positions itself at angle+radius from center, animates over the orbit
interface OrbitalBadgeProps {
    Icon: React.ElementType;
    label: string;
    color: string;
    angle: number;
    radius: number;
    duration: number;
    index: number;
}

const OrbitalBadge = ({ Icon, label, color, angle, radius, duration, index }: OrbitalBadgeProps) => {
    const prefersReducedMotion = useReducedMotion();
    const floatDelay = index * 1.2;

    const rad = (angle * Math.PI) / 180;
    const x = parseFloat((radius * Math.cos(rad)).toFixed(3));
    const y = parseFloat((radius * Math.sin(rad)).toFixed(3));

    return (
        <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
        >
            <motion.div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: -20,
                    marginTop: -20,
                    transform: `translate(${x}px, ${y}px)`,
                }}
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
                <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                    className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 backdrop-blur-md border text-[18px] transition-all duration-300 hover:scale-110 pointer-events-auto"
                    style={{
                        background: "rgba(10,10,12,0.75)",
                        borderColor: `${color}30`,
                        boxShadow: `0 0 16px ${color}20, 0 4px 12px rgba(0,0,0,0.4)`,
                        color,
                    }}
                    title={label}
                >
                    <Icon />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
