"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const words = ["Cybersecurity Analyst", "Penetration Tester", "CTF Player"];

export const Hero = () => {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const fullText = words[wordIndex];

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
                    setWordIndex(prev => (prev + 1) % words.length);
                }, 2000);
            }
        }, 120);
        return () => clearInterval(interval);
    }, [wordIndex]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <>
            {/* FLAG{h3r0_0nl1n3} — ACCESS_GRANTED: if you can read source, you're already hacking. */}
            <section id="hero" className="relative min-h-[100svh] flex items-center pt-16 sm:pt-20 md:pt-24 overflow-hidden px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-8 sm:py-12">

                    {/* Left Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start text-left space-y-5 sm:space-y-7"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse flex-shrink-0"></span>
                            <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Available for Internships</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 w-full">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
                                Hi, I&apos;m{" "}<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Aaditya.</span>
                            </h1>
                            <h2 className="text-base sm:text-xl md:text-2xl text-gray-400 font-mono h-7 sm:h-8 flex items-center">
                                <span className="opacity-40 tracking-wider mr-2 sm:mr-3 text-sm sm:text-base">//</span>
                                <span className="text-white tracking-wide text-sm sm:text-base md:text-xl">{text}</span>
                                <span className="animate-pulse inline-block w-2 sm:w-3 h-4 sm:h-5 ml-1 bg-neon-blue align-middle"></span>
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants} className="max-w-xl text-gray-400 text-base sm:text-lg font-light leading-relaxed">
                            I&apos;m a 3rd-year CS student who genuinely loves breaking things apart to understand how they work — and then figuring out how to make them harder to break. Currently diving deep into pen testing, CTFs, and anything security-related.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 sm:gap-6 pt-2 sm:pt-4 w-full">
                            <div className="flex flex-row gap-3 sm:gap-4">
                                <Button
                                    variant="primary"
                                    colorTheme="blue"
                                    className="px-4 py-2.5 sm:px-6 sm:py-3"
                                    onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <span className="font-mono tracking-wider text-xs sm:text-sm">See My Work</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    colorTheme="blue"
                                    className="px-4 py-2.5 sm:px-6 sm:py-3"
                                    onClick={() => window.open('/Cyber Resume main.pdf', '_blank')}
                                >
                                    <span className="font-mono tracking-wider text-xs sm:text-sm whitespace-nowrap">Download CV</span>
                                </Button>
                            </div>
                            <div className="flex items-center gap-5 sm:gap-6 pt-2 xs:pt-0">
                                <a href="https://github.com/Aaditya2207" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-neon-blue transition-colors duration-300">
                                    <FaGithub size={22} />
                                </a>
                                <a href="https://www.linkedin.com/in/aaditya-kaushik2207/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-neon-blue transition-colors duration-300">
                                    <FaLinkedin size={22} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Abstract Cyber Graphic — hidden on small screens */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="hidden lg:flex justify-center relative"
                        aria-hidden="true"
                    >
                        <div className="relative w-[350px] h-[350px] xl:w-[450px] xl:h-[450px] flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-neon-blue/20 border-t-neon-blue/60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 rounded-full border border-neon-indigo/20 border-b-neon-indigo/60"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 rounded-full border-[0.5px] border-dashed border-white/10"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[80px] xl:inset-[100px] rounded-full border border-neon-blue/10 border-r-neon-blue/40"
                            />
                            <div className="absolute w-28 h-28 rounded-full bg-dark-surface/50 backdrop-blur-xl border border-white/5 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-neon-blue to-neon-indigo opacity-30 blur-xl"></div>
                                <div className="absolute w-8 h-8 border border-neon-blue/40 rotate-45"></div>
                                <div className="absolute w-8 h-8 border border-neon-indigo/40 rotate-[25deg]"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-8 sm:left-12 hidden md:flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-neon-blue/50 to-transparent"></div>
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
