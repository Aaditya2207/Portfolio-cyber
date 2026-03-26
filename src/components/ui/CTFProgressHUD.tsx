"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCTF, CHALLENGES } from "@/contexts/CTFContext";

export const CTFProgressHUD = () => {
    const { capturedFlags, totalPoints, setTerminalOpen } = useCTF();
    const total = CHALLENGES.length;
    const captured = capturedFlags.length;
    const allSolved = captured === total;

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-50"
        >
            <button
                onClick={() => setTerminalOpen(true)}
                title="Open CTF Terminal"
                className={`group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-mono text-xs border backdrop-blur-xl transition-all duration-300
                    ${allSolved
                        ? "bg-neon-blue/10 border-neon-blue/60 text-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-pulse"
                        : "bg-dark-bg/80 border-white/10 text-gray-400 hover:border-neon-blue/40 hover:text-neon-blue"
                    }`}
            >
                <div className="flex gap-1">
                    {CHALLENGES.map((c) => (
                        <div
                            key={c.id}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${capturedFlags.includes(c.flag) ? "bg-neon-blue shadow-[0_0_6px_rgba(0,240,255,0.8)]" : "bg-gray-700"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-[10px] sm:text-xs tracking-wider hidden xs:inline">
                    {allSolved ? "PWNED" : `${captured}/${total}`}
                </span>
                <span className="hidden sm:inline text-gray-600 group-hover:text-neon-blue/50 transition-colors">
                    [{totalPoints}pts]
                </span>
            </button>
        </motion.div>
    );
};
