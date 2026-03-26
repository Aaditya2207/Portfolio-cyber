"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    colorTheme?: "magenta" | "blue" | "amber";
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant = "primary", colorTheme = "magenta", icon, ...props }, ref) => {

        const baseClass = "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg relative overflow-hidden group";

        const colorMap = {
            primary: {
                magenta: "bg-neon-magenta text-dark-bg hover:bg-neon-magenta/90 hover:shadow-[0_0_15px_rgba(217,38,255,0.5)] focus:ring-neon-magenta",
                blue: "bg-neon-blue text-dark-bg hover:bg-neon-blue/90 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] focus:ring-neon-blue",
                amber: "bg-neon-amber text-dark-bg hover:bg-neon-amber/90 hover:shadow-[0_0_15px_rgba(255,170,0,0.5)] focus:ring-neon-amber",
            },
            secondary: {
                magenta: "bg-dark-surface text-neon-magenta border border-neon-magenta/30 hover:bg-neon-magenta/10 hover:border-neon-magenta hover:shadow-[0_0_15px_rgba(217,38,255,0.2)] focus:ring-neon-magenta",
                blue: "bg-dark-surface text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:ring-neon-blue",
                amber: "bg-dark-surface text-neon-amber border border-neon-amber/30 hover:bg-neon-amber/10 hover:border-neon-amber hover:shadow-[0_0_15px_rgba(255,170,0,0.2)] focus:ring-neon-amber",
            },
            outline: {
                magenta: "bg-transparent text-neon-magenta border border-neon-magenta hover:bg-neon-magenta hover:text-dark-bg focus:ring-neon-magenta",
                blue: "bg-transparent text-neon-blue border border-neon-blue hover:bg-neon-blue hover:text-dark-bg focus:ring-neon-blue",
                amber: "bg-transparent text-neon-amber border border-neon-amber hover:bg-neon-amber hover:text-dark-bg focus:ring-neon-amber",
            },
            ghost: {
                magenta: "bg-transparent text-neon-magenta hover:bg-neon-magenta/10 focus:ring-neon-magenta",
                blue: "bg-transparent text-neon-blue hover:bg-neon-blue/10 focus:ring-neon-blue",
                amber: "bg-transparent text-neon-amber hover:bg-neon-amber/10 focus:ring-neon-amber",
            }
        };

        const variantClass = colorMap[variant][colorTheme];

        return (
            <motion.button
                ref={ref}
                className={cn(baseClass, variantClass, className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {icon}
                    {children}
                </span>
            </motion.button>
        );
    }
);

Button.displayName = "Button";
