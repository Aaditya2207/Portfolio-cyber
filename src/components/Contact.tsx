"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCTF } from "@/contexts/CTFContext";

const flag5 = "FLAG{s0c14l_3ng1n33r}";

// Terminal log lines shown during transmission
const terminalLines = [
    { text: "> INITIALIZING SECURE CHANNEL...", delay: 0 },
    { text: "> ENCRYPTING PAYLOAD [AES-256]...", delay: 0.6 },
    { text: "> COMPRESSING DATA PACKET...", delay: 1.2 },
    { text: "> ESTABLISHING TLS HANDSHAKE...", delay: 1.8 },
    { text: "> TRANSMITTING TO TARGET NODE...", delay: 2.4 },
];

// Binary rain column data (static, outside component to avoid re-render churn)
const binaryColumns = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    chars: "1\n0\n1\n1\n0\n1\n0\n0\n1\n0\n1\n0",
    delay: i * 0.15,
    left: `${8 + i * 8.5}%`,
}));

export const Contact = () => {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const { captureFlag, isCaptured } = useCTF();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        // FLAG-05: Social Engineering challenge — submit with ctf@solve.me
        if (email.toLowerCase().trim() === "ctf@solve.me" && !isCaptured(flag5)) {
            captureFlag(flag5);
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setFormStatus("success");
                setName("");
                setEmail("");
                setMessage("");
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 4000);
            }
        } catch {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <section id="contact" className="pt-20 sm:pt-24 pb-10 sm:pb-12 relative z-10 border-t border-white/5 bg-dark-bg/90">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 sm:mb-16 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Get In Touch</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6">
                        Say <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-indigo">Hello</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                        Whether you have a project in mind, want to talk security, or just want to say hi I&apos;m always happy to chat.
                    </p>
                    <p
                        className="mt-3 font-mono text-[9px] sm:text-[10px] text-gray-700 hover:text-gray-500 transition-colors cursor-default tracking-wider"
                        title="Challenge 5/5 — sometimes the right email changes everything."
                    >
                        know the right address? try challenge 5/5 ↓
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-neon-blue/20 transition-colors duration-500 overflow-hidden"
                >
                    {/* ─────────────── CYBER OVERLAY ─────────────── */}
                    {formStatus !== "idle" && (
                        <motion.div
                            key={formStatus}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-20 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center overflow-hidden"
                            style={{ background: "rgba(5,8,15,0.97)" }}
                        >

                            {/* ── SUBMITTING ── */}
                            {formStatus === "submitting" && (
                                <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">

                                    {/* Binary rain */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                                        {binaryColumns.map(col => (
                                            <motion.div
                                                key={col.id}
                                                className="absolute top-0 font-mono text-[10px] leading-5 text-neon-blue/20 whitespace-pre"
                                                style={{ left: col.left }}
                                                initial={{ y: -120, opacity: 0 }}
                                                animate={{ y: "110%", opacity: [0, 0.7, 0.7, 0] }}
                                                transition={{ duration: 2.8, delay: col.delay, repeat: Infinity, ease: "linear" }}
                                            >
                                                {col.chars}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Horizontal scan line */}
                                    <motion.div
                                        className="absolute left-0 right-0 h-px pointer-events-none"
                                        style={{ background: "linear-gradient(90deg, transparent, #00f0ff44, #00f0ff, #00f0ff44, transparent)" }}
                                        initial={{ top: "0%" }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Signal trace */}
                                    <div className="relative w-full max-w-xs mb-5">
                                        <svg viewBox="0 0 300 60" className="w-full" fill="none">
                                            <line x1="0" y1="30" x2="300" y2="30" stroke="#00f0ff18" strokeWidth="1" />
                                            <motion.polyline
                                                points="0,30 40,30 55,10 70,50 85,20 100,40 115,30 160,30 175,8 190,52 205,15 220,45 235,30 300,30"
                                                stroke="#00f0ff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
                                            />
                                            <motion.circle
                                                r={3} fill="#00f0ff"
                                                style={{ filter: "drop-shadow(0 0 6px #00f0ff)" }}
                                                animate={{ cx: [0, 300], cy: [30, 30] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </svg>
                                    </div>

                                    {/* Packet nodes */}
                                    <div className="flex items-center gap-2 sm:gap-3 mb-6">
                                        {["SRC", "ENC", "PKT", "NET", "DST"].map((label, i) => (
                                            <React.Fragment key={label}>
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.6 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.18 }}
                                                >
                                                    <motion.div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-mono text-neon-blue"
                                                        animate={{ boxShadow: ["0 0 0px #00f0ff30", "0 0 10px #00f0ff70", "0 0 0px #00f0ff30"] }}
                                                        transition={{ duration: 1, delay: i * 0.18, repeat: Infinity }}
                                                        style={{ background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.35)" }}
                                                    >
                                                        {label}
                                                    </motion.div>
                                                </motion.div>
                                                {i < 4 && (
                                                    <div className="flex gap-0.5">
                                                        {[0, 1, 2].map(d => (
                                                            <motion.div
                                                                key={d}
                                                                className="w-1 h-1 rounded-full bg-neon-blue"
                                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                                transition={{ duration: 0.6, delay: d * 0.2 + i * 0.18, repeat: Infinity }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {/* Terminal log */}
                                    <div className="w-full max-w-xs space-y-1.5 font-mono text-[10px] sm:text-xs">
                                        {terminalLines.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: line.delay, duration: 0.25 }}
                                            >
                                                <span className="text-neon-blue/80">{line.text}</span>
                                                <motion.span
                                                    className="text-green-400 shrink-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: line.delay + 0.45 }}
                                                >
                                                    OK
                                                </motion.span>
                                            </motion.div>
                                        ))}
                                        {/* Blinking cursor */}
                                        <motion.div
                                            className="flex items-center gap-1 text-neon-blue/50"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 3.2 }}
                                        >
                                            <span>&gt;&nbsp;</span>
                                            <motion.span
                                                className="inline-block w-2 h-[11px] bg-neon-blue/60"
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            )}

                            {/* ── SUCCESS ── */}
                            {formStatus === "success" && (
                                <motion.div
                                    className="flex flex-col items-center gap-5 px-6 text-center"
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Expanding pulse rings behind the icon */}
                                    {[0, 0.4, 0.8].map((delay, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute rounded-full border border-neon-blue/15"
                                            style={{ width: 80 + i * 50, height: 80 + i * 50 }}
                                            animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
                                            transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
                                        />
                                    ))}

                                    {/* Check icon with spinning ring */}
                                    <div className="relative w-20 h-20 flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                border: "2px solid transparent",
                                                borderTopColor: "#00f0ff",
                                                borderRightColor: "rgba(0,240,255,0.2)",
                                            }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                        <motion.div
                                            className="absolute inset-3 rounded-full"
                                            style={{ background: "radial-gradient(circle, rgba(0,240,255,0.14), transparent)" }}
                                            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.svg
                                            viewBox="0 0 24 24"
                                            className="w-9 h-9 relative z-10"
                                            fill="none"
                                            stroke="#00f0ff"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{ filter: "drop-shadow(0 0 10px #00f0ff)" }}
                                        >
                                            <motion.path
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                            />
                                        </motion.svg>
                                    </div>

                                    <div>
                                        <motion.p
                                            className="font-mono text-[10px] tracking-[0.3em] text-neon-blue/50 uppercase mb-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            Status: 200 OK
                                        </motion.p>
                                        <motion.h3
                                            className="font-mono text-lg sm:text-xl font-bold text-white tracking-widest"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            style={{ textShadow: "0 0 22px rgba(0,240,255,0.45)" }}
                                        >
                                            TRANSMISSION COMPLETE
                                        </motion.h3>
                                        <motion.p
                                            className="font-mono text-xs text-gray-500 mt-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.65 }}
                                        >
                                            Message securely delivered. I&apos;ll respond soon.
                                        </motion.p>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── ERROR ── */}
                            {formStatus === "error" && (
                                <motion.div
                                    className="flex flex-col items-center gap-4 px-6 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-red-500/40"
                                            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <motion.svg
                                            viewBox="0 0 24 24"
                                            className="w-9 h-9"
                                            fill="none"
                                            stroke="#ff4444"
                                            strokeWidth="2.5"
                                            style={{ filter: "drop-shadow(0 0 10px #ff4444)" }}
                                            animate={{ x: [-1, 1, -1, 0] }}
                                            transition={{ duration: 0.14, repeat: 6, repeatDelay: 1 }}
                                        >
                                            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                        </motion.svg>
                                    </div>

                                    <div>
                                        <motion.p
                                            className="font-mono text-[10px] tracking-[0.3em] text-red-500/55 uppercase mb-1"
                                            animate={{ opacity: [0.55, 1, 0.55] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        >
                                            Status: 500 ERR
                                        </motion.p>
                                        <motion.h3
                                            className="font-mono text-lg sm:text-xl font-bold text-red-400 tracking-widest"
                                            animate={{ x: [-2, 2, -1, 1, 0] }}
                                            transition={{ duration: 0.12, repeat: 8, repeatDelay: 0.5 }}
                                            style={{ textShadow: "0 0 20px rgba(255,68,68,0.55)" }}
                                        >
                                            CONNECTION FAILED
                                        </motion.h3>
                                        <motion.p
                                            className="font-mono text-xs text-gray-500 mt-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            Transmission interrupted. Retrying in 4s...
                                        </motion.p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                    {/* ─────────────────────────────────────────────── */}

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label htmlFor="name" className="text-gray-400 font-mono text-xs sm:text-sm block">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    suppressHydrationWarning
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-dark-bg/80 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-blue/60 focus:ring-1 focus:ring-neon-blue/30 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label htmlFor="email" className="text-gray-400 font-mono text-xs sm:text-sm block flex items-center gap-2">
                                    Email
                                    {isCaptured(flag5) && (
                                        <span className="text-neon-blue text-[9px] tracking-widest">[✓ COMPROMISED]</span>
                                    )}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    suppressHydrationWarning
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={`w-full bg-dark-bg/80 border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors ${isCaptured(flag5)
                                            ? "border-neon-blue/50 focus:border-neon-blue focus:ring-neon-blue/30 shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                                            : "border-white/10 focus:border-neon-blue/60 focus:ring-neon-blue/30"
                                        }`}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <label htmlFor="message" className="text-gray-400 font-mono text-xs sm:text-sm block">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                suppressHydrationWarning
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full bg-dark-bg/80 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-blue/60 focus:ring-1 focus:ring-neon-blue/30 transition-colors resize-none"
                                placeholder="What's on your mind?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus !== "idle"}
                            className="w-full py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl font-mono text-sm sm:text-base tracking-wider text-white bg-gradient-to-r from-neon-blue to-neon-indigo hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                        >
                            {formStatus === "idle" && "Send Message"}
                            {formStatus === "submitting" && "Transmitting..."}
                            {formStatus === "success" && "Message Sent! ✓"}
                            {formStatus === "error" && "Failed — Try Again"}
                        </button>
                    </form>
                </motion.div>

                {/* Footer */}
                <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                    <button
                        onClick={scrollToTop}
                        className="text-gray-500 hover:text-neon-blue transition-colors font-mono text-xs sm:text-sm flex flex-col items-center gap-2 group"
                    >
                        <span className="text-lg animate-bounce group-hover:text-neon-blue">↑</span>
                        Back to top
                    </button>
                    <p className="font-mono text-[10px] sm:text-xs text-gray-600 text-center leading-relaxed">
                        Designed &amp; built by Aaditya &nbsp;·&nbsp; Next.js, Tailwind, Framer Motion<br />
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>
            </div>
        </section>
    );
};
