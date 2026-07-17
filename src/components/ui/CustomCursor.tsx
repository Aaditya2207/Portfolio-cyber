"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    useEffect(() => {
        // Only enable on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.body.classList.add("custom-cursor-active");

        const handleMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const animateRing = () => {
            // Ring lags behind for smooth trailing effect
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
            }
            rafId.current = requestAnimationFrame(animateRing);
        };
        rafId.current = requestAnimationFrame(animateRing);

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Detect hover over interactive elements
        const interactiveSelectors = "a, button, input, textarea, select, [role='button'], label, [tabindex]:not([tabindex='-1'])";

        const handleHoverIn = (e: Event) => {
            if ((e.target as Element)?.closest(interactiveSelectors)) {
                setIsHovering(true);
            }
        };
        const handleHoverOut = (e: Event) => {
            if ((e.target as Element)?.closest(interactiveSelectors)) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleHoverIn);
        document.addEventListener("mouseout", handleHoverOut);

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleHoverIn);
            document.removeEventListener("mouseout", handleHoverOut);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    // Don't render on server
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Dot — follows exactly */}
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : isHovering ? 0 : 1})`,
                }}
                aria-hidden="true"
            />
            {/* Ring — trails smoothly */}
            <div
                ref={ringRef}
                className={`cursor-ring ${isHovering ? "cursor-hover" : ""} ${isClicking ? "cursor-click" : ""}`}
                style={{ opacity: isVisible ? 1 : 0 }}
                aria-hidden="true"
            />
        </>
    );
};
