"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Dimensions (single source of truth) ──────────────────────────────────────
const PILL_W   = 58;   // px — pill width
const PILL_H   = 28;   // px — pill height
const KNOB_SZ  = 22;   // px — knob diameter
const KNOB_PAD = 3;    // px — gap from pill edge to knob edge

const KNOB_LEFT_DARK  = KNOB_PAD;                      // 3 px
const KNOB_LEFT_LIGHT = PILL_W - KNOB_SZ - KNOB_PAD;  // 33 px
const KNOB_TOP        = (PILL_H - KNOB_SZ) / 2;       // 3 px  (exact vertical center)

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2"  x2="12" y2="4"  />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="2"  y1="12" x2="4"  y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
        <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export const ThemeToggle = () => {
    const { toggleTheme, isLight } = useTheme();

    return (
        <button
            id="theme-toggle"
            role="switch"
            aria-checked={isLight}
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            style={{
                /* All structure via inline styles — no CSS-class conflicts */
                position:     "relative",
                display:      "inline-flex",
                alignItems:   "center",
                justifyContent: "space-between",
                width:        `${PILL_W}px`,
                height:       `${PILL_H}px`,
                padding:      `0 ${KNOB_PAD + KNOB_SZ / 2 - 2}px`,
                borderRadius: "999px",
                flexShrink:   0,
                cursor:       "pointer",
                outline:      "none",
                border:       isLight
                    ? "1px solid rgba(6,182,212,0.5)"
                    : "1px solid rgba(0,240,255,0.28)",
                background:   isLight
                    ? "rgba(238,243,250,1)"
                    : "rgba(18,18,24,0.95)",
                boxShadow:    isLight
                    ? "0 2px 8px rgba(15,23,42,0.12)"
                    : "0 0 10px rgba(0,240,255,0.15)",
                transition:   "background 350ms ease, border-color 350ms ease, box-shadow 350ms ease",
                /* kill the global * transition so it can't interfere */
                transitionProperty: "background-color, border-color, box-shadow",
            }}
        >
            {/* Moon — left background icon */}
            <span
                aria-hidden="true"
                style={{
                    display:    "flex",
                    alignItems: "center",
                    color:      isLight ? "rgba(100,116,139,0.4)" : "rgba(0,240,255,0.9)",
                    transition: "color 300ms ease, opacity 300ms ease",
                    pointerEvents: "none",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                <MoonIcon />
            </span>

            {/* Sliding knob — animates left, no transform conflicts */}
            <motion.span
                aria-hidden="true"
                animate={{ left: isLight ? KNOB_LEFT_LIGHT : KNOB_LEFT_DARK }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                style={{
                    position:     "absolute",
                    top:          `${KNOB_TOP}px`,
                    width:        `${KNOB_SZ}px`,
                    height:       `${KNOB_SZ}px`,
                    borderRadius: "50%",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    background:   isLight ? "#ffffff" : "rgba(0,240,255,0.10)",
                    border:       isLight
                        ? "1px solid rgba(6,182,212,0.6)"
                        : "1px solid rgba(0,240,255,0.55)",
                    boxShadow:    isLight
                        ? "0 2px 8px rgba(15,23,42,0.15), 0 1px 3px rgba(0,0,0,0.10)"
                        : "0 0 8px rgba(0,240,255,0.25), 0 2px 4px rgba(0,0,0,0.4)",
                    zIndex: 2,
                    /* No transition here — Framer Motion controls movement */
                }}
            >
                {/* Cross-fading icon inside knob */}
                <AnimatePresence mode="wait" initial={false}>
                    {isLight ? (
                        <motion.span
                            key="sun"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                            exit={{    opacity: 0, rotate: 90,  scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", alignItems: "center", color: "#F59E0B", position: "absolute" }}
                        >
                            <SunIcon />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="moon"
                            initial={{ opacity: 0, rotate: 90,  scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                            exit={{    opacity: 0, rotate: -90, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", alignItems: "center", color: "#00f0ff", position: "absolute" }}
                        >
                            <MoonIcon />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.span>

            {/* Sun — right background icon */}
            <span
                aria-hidden="true"
                style={{
                    display:    "flex",
                    alignItems: "center",
                    color:      isLight ? "#F59E0B" : "rgba(156,163,175,0.35)",
                    transition: "color 300ms ease",
                    pointerEvents: "none",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                <SunIcon />
            </span>
        </button>
    );
};
