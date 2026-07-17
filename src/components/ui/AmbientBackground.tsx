"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const AmbientBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isLight } = useTheme();
    const isLightRef = useRef(isLight);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        isLightRef.current = isLight;
    }, [isLight]);

    // Mouse-reactive spotlight
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (spotlightRef.current) {
                spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${
                    isLightRef.current
                        ? "rgba(6,182,212,0.04)"
                        : "rgba(0,240,255,0.04)"
                }, transparent 50%)`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const particleCount = 65;
        const connectionDistance = 130;
        const mouseConnectionDistance = 200;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            layer: number; // 0=bg slow, 1=mid, 2=fg fast

            constructor() {
                this.layer = Math.floor(Math.random() * 3);
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                const speed = 0.15 + this.layer * 0.15;
                this.size = 0.4 + this.layer * 0.6;
                this.speedX = (Math.random() - 0.5) * speed;
                this.speedY = (Math.random() - 0.5) * speed;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas!.width) this.x = 0;
                else if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                else if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                const layerOpacity = [0.07, 0.14, 0.25][this.layer];
                if (isLightRef.current) {
                    const colors = [
                        `rgba(6, 182, 212, ${layerOpacity * 0.7})`,
                        `rgba(59, 130, 246, ${layerOpacity * 0.6})`,
                        `rgba(124, 58, 237, ${layerOpacity * 0.5})`,
                    ];
                    ctx.fillStyle = colors[this.layer];
                } else {
                    const colors = [
                        `rgba(0, 240, 255, ${layerOpacity})`,
                        `rgba(129, 140, 248, ${layerOpacity * 0.8})`,
                        `rgba(168, 85, 247, ${layerOpacity * 0.6})`,
                    ];
                    ctx.fillStyle = colors[this.layer];
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance);
                        if (isLightRef.current) {
                            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.06})`;
                        } else {
                            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.10})`;
                        }
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Mouse connections
                const dxM = particles[a].x - mouseRef.current.x;
                const dyM = particles[a].y - mouseRef.current.y;
                const distM = Math.sqrt(dxM * dxM + dyM * dyM);

                if (distM < mouseConnectionDistance) {
                    const opacity = 1 - distM / mouseConnectionDistance;
                    if (isLightRef.current) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.15})`;
                    } else {
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.22})`;
                    }
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.stroke();
                }
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        setTimeout(() => { resize(); animate(); }, 100);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="ambient-bg-wrapper fixed inset-0 overflow-hidden pointer-events-none -z-20"
            style={{
                backgroundColor: isLight ? "#F5F7FB" : "#030305",
                transition: "background-color 500ms ease",
            }}
        >
            {/* Gradient base overlay */}
            <div
                className="absolute inset-0 opacity-90"
                style={{
                    background: isLight
                        ? "linear-gradient(to bottom, #F5F7FB, rgba(238,243,250,0.95), #EEF3FA)"
                        : "linear-gradient(to bottom, #030305, rgba(3,3,5,0.95), #0a0a0c)",
                    transition: "background 500ms ease",
                }}
            />

            {/* Aurora Blob 1 — Cyan */}
            <div
                className="aurora-blob aurora-blob-1"
                style={{
                    width: "60vw",
                    height: "60vh",
                    top: "-15%",
                    left: "-10%",
                    background: isLight
                        ? "radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(0,240,255,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Aurora Blob 2 — Indigo */}
            <div
                className="aurora-blob aurora-blob-2"
                style={{
                    width: "50vw",
                    height: "50vh",
                    top: "20%",
                    right: "-15%",
                    background: isLight
                        ? "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(129,140,248,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Aurora Blob 3 — Purple */}
            <div
                className="aurora-blob aurora-blob-3"
                style={{
                    width: "45vw",
                    height: "45vh",
                    bottom: "10%",
                    left: "25%",
                    background: isLight
                        ? "radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 70%)",
                }}
            />

            {/* Mouse-reactive spotlight */}
            <div
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none"
                style={{ transition: "background 0.1s ease" }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: isLight
                        ? "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)"
                        : "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage: isLight
                        ? "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)"
                        : "radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%)",
                    WebkitMaskImage: isLight
                        ? "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)"
                        : "radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%)",
                    opacity: isLight ? 0.5 : 0.3,
                    transition: "opacity 500ms ease",
                }}
            />

            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    opacity: isLight ? 0.6 : 0.9,
                    mixBlendMode: isLight ? "multiply" : "screen",
                    transition: "opacity 500ms ease",
                }}
            />

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyNSIvPjwvc3ZnPg==')",
                }}
            />
        </div>
    );
};
