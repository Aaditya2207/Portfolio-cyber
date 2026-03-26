"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCTF } from "@/contexts/CTFContext";

export const CTFFlagToast = () => {
    const { toastFlag, clearToast } = useCTF();

    useEffect(() => {
        if (!toastFlag) return;
        const t = setTimeout(clearToast, 4000);
        return () => clearTimeout(t);
    }, [toastFlag, clearToast]);

    return (
        <AnimatePresence>
            {toastFlag && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 right-0 z-[200] flex justify-center pointer-events-none px-4"
                >
                    <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-dark-bg border border-neon-blue/60 shadow-[0_0_40px_rgba(0,240,255,0.3)] backdrop-blur-xl max-w-xl w-full pointer-events-auto">
                        {/* Animated glow dot */}
                        <div className="relative flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-neon-blue animate-ping absolute"></div>
                            <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-mono text-[10px] sm:text-xs text-neon-blue tracking-[0.2em] uppercase mb-0.5">
                                ✓ Flag Captured
                            </p>
                            <p className="font-mono text-white text-xs sm:text-sm font-bold truncate">
                                {toastFlag.flag}
                            </p>
                            <p className="font-mono text-gray-400 text-[10px] sm:text-xs truncate">
                                {toastFlag.name}
                            </p>
                        </div>
                        <button onClick={clearToast} className="text-gray-600 hover:text-white font-mono text-xs flex-shrink-0">
                            [x]
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
