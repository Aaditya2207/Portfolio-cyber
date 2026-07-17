"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

type RevealVariant = "slideUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn";

interface SectionRevealProps {
    children: React.ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

const variants: Record<RevealVariant, Variants> = {
    slideUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
    },
};

export const SectionReveal = ({
    children,
    variant = "slideUp",
    delay = 0,
    duration = 0.7,
    className = "",
    once = true,
    amount = 0.15,
}: SectionRevealProps) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={prefersReducedMotion ? {} : variants[variant]}
            transition={{
                duration: prefersReducedMotion ? 0 : duration,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/** Stagger container — wraps children that reveal one-by-one */
interface StaggerRevealProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
}

export const StaggerReveal = ({
    children,
    className = "",
    stagger = 0.1,
    delay = 0,
}: StaggerRevealProps) => {
    const prefersReducedMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : stagger,
                delayChildren: prefersReducedMotion ? 0 : delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={className}
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants}>{child}</motion.div>
            ))}
        </motion.div>
    );
};
