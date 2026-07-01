"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const AmbientBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isLight } = useTheme();
    // Use a ref so the animation loop always reads the latest value without restart
    const isLightRef = useRef(isLight);

    useEffect(() => {
        isLightRef.current = isLight;
    }, [isLight]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        // Minimalist configuration
        const particleCount = 70; 
        const connectionDistance = 140;
        const mouseConnectionDistance = 220;

        const mouse = {
            x: -1000,
            y: -1000,
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener("resize", resize);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
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
                // Adapt color based on current theme
                if (isLightRef.current) {
                    // Light mode: soft cyan/blue particles at 15% opacity
                    const colors = [
                        'rgba(6, 182, 212, 0.12)',
                        'rgba(59, 130, 246, 0.09)',
                        'rgba(6, 182, 212, 0.08)',
                    ];
                    ctx.fillStyle = colors[Math.floor(this.x * 3 / canvas!.width)];
                } else {
                    // Dark mode: original colors
                    const colors = ['rgba(5, 217, 232, 0.5)', 'rgba(5, 217, 232, 0.2)', 'rgba(238, 242, 255, 0.4)'];
                    ctx.fillStyle = colors[Math.floor(this.x * 3 / canvas!.width)];
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
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        if (isLightRef.current) {
                            // Light mode: soft cyan connections at very low opacity
                            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.07})`;
                        } else {
                            // Dark mode: original very faint cyan connections
                            ctx.strokeStyle = `rgba(5, 217, 232, ${opacity * 0.12})`;
                        }
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Mouse connections
                if (mouse.x > 0 && mouse.y > 0) {
                    const dxMouse = particles[a].x - mouse.x;
                    const dyMouse = particles[a].y - mouse.y;
                    const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distanceMouse < mouseConnectionDistance) {
                        const opacity = 1 - distanceMouse / mouseConnectionDistance;
                        if (isLightRef.current) {
                            // Light mode: soft blue mouse connections
                            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.18})`;
                        } else {
                            // Dark mode: original magenta connection
                            ctx.strokeStyle = `rgba(255, 42, 109, ${opacity * 0.25})`;
                        }
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
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

        // Delay initialization slightly to ensure canvas is ready and sized right
        setTimeout(() => {
            resize();
            animate();
        }, 100);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="ambient-bg-wrapper fixed inset-0 overflow-hidden pointer-events-none -z-20"
            style={{
                backgroundColor: isLight ? '#F5F7FB' : '#030305',
                transition: 'background-color 500ms ease',
            }}
        >
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 opacity-90"
                style={{
                    background: isLight
                        ? 'linear-gradient(to bottom, #F5F7FB, rgba(238,243,250,0.95), #EEF3FA)'
                        : 'linear-gradient(to bottom, #030305, rgba(3,3,5,0.95), #0a0a0c)',
                    transition: 'background 500ms ease',
                }}
            />
            
            {/* Grid Pattern — light or dark */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: isLight
                        ? 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)'
                        : 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: isLight
                        ? 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
                        : 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%)',
                    WebkitMaskImage: isLight
                        ? 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
                        : 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%)',
                    opacity: isLight ? 0.5 : 0.3,
                    transition: 'opacity 500ms ease, background-image 500ms ease',
                }}
            />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full mix-blend-normal"
                style={{
                    opacity: isLight ? 0.6 : 0.90,
                    mixBlendMode: isLight ? 'multiply' : 'screen',
                    transition: 'opacity 500ms ease',
                }}
            />
            
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyNSIvPjwvc3ZnPg==')] opacity-[0.1] pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};
