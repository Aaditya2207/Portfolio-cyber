"use client";

import React, { useEffect, useRef } from "react";

export const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Matrix characters (mix of latin, kanji, numbers)
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
        const charArray = chars.split("");

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        // Initial y positions of each column
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start off-screen randomly
        }

        const draw = () => {
            // Semi-transparent black to create trailing effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Neon green with slight opacity variation for depth
                const depth = Math.random();
                ctx.fillStyle = depth > 0.8 ? "#ffffff" : `rgba(0, 240, 255, ${0.3 + depth * 0.4})`;

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly once it's off-screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
        />
    );
};
