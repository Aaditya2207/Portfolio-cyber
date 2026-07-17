"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    return (
        <>
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
                style={{
                    scaleX,
                    background: "linear-gradient(90deg, #00f0ff, #818cf8, #a855f7, #00f0ff)",
                    backgroundSize: "200% 100%",
                    animation: "gradient-rotate 3s linear infinite",
                }}
            />
            {/* Glow tip */}
            <motion.div
                className="fixed top-0 h-[2px] w-10 z-[101] rounded-full"
                style={{
                    left: scaleX,
                    background: "rgba(0,240,255,0.9)",
                    boxShadow: "0 0 12px rgba(0,240,255,0.8), 0 0 24px rgba(0,240,255,0.4)",
                    transformOrigin: "left",
                    scaleX,
                    x: "-100%",
                }}
            />
        </>
    );
};
