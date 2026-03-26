"use client";

import React, { useEffect, useRef } from "react";

export const AmbientBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 1.5 + 0.5; // Very subtle dots
                this.speedX = (Math.random() - 0.5) * 0.4; // Extremely slow, graceful movement
                this.speedY = (Math.random() - 0.5) * 0.4;
                
                // Cyan and subtle white/grey tones to keep it clean
                const colors = ['rgba(5, 217, 232, 0.5)', 'rgba(5, 217, 232, 0.2)', 'rgba(238, 242, 255, 0.4)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
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
                ctx.fillStyle = this.color;
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
                        ctx.strokeStyle = `rgba(5, 217, 232, ${opacity * 0.12})`; // Very faint cyan connections
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
                        // Elegant vibrant magenta connection to the cursor
                        ctx.strokeStyle = `rgba(255, 42, 109, ${opacity * 0.25})`; 
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
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-dark-bg">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-surface opacity-90" />
            
            {/* Very faint Grid Pattern for tech feel without clutter */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-30"></div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
            />
            
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyNSIvPjwvc3ZnPg==')] opacity-[0.1] pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};
