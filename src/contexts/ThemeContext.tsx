"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // initialise from localStorage (set by the anti-flash inline script in layout.tsx)
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        // Read what the anti-flash script already applied so React state matches DOM
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved: Theme = stored ?? (prefersDark ? "dark" : "light");
        setTheme(resolved);
        applyTheme(resolved);
    }, []);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        if (t === "light") {
            root.classList.add("light");
        } else {
            root.classList.remove("light");
        }
    };

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next: Theme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("theme", next);
            applyTheme(next);
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLight: theme === "light" }}>
            {children}
        </ThemeContext.Provider>
    );
};
