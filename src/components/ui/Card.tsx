"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    glowColor?: "magenta" | "blue" | "amber" | "none";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, glowColor = "none", ...props }, ref) => {
        // Map glow colors to tailwind arbitrary values for hover shadow
        const glowClasses = {
            magenta: "hover:shadow-[0_0_20px_rgba(217,38,255,0.3)] hover:border-neon-magenta/50",
            blue: "hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:border-neon-blue/50",
            amber: "hover:shadow-[0_0_20px_rgba(255,170,0,0.3)] hover:border-neon-amber/50",
            none: "",
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "glass rounded-xl p-6 transition-all duration-300",
                    glowClasses[glowColor],
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
