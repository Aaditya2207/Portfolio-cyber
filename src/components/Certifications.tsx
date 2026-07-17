"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCertificate, FaCheckCircle } from "react-icons/fa";
import { SectionReveal } from "@/components/ui/SectionReveal";

const CERTIFICATIONS = [
    {
        name: "Identity Security Leader",
        issuer: "SailPoint Technologies",
        date: "Nov 2025",
        accent: "#00f0ff",
        // data-secret preserved for CTF: 464c41477b316e7370336374307235f67346467337437d
        dataSecret: "464c41477b316e7370336374307235f67346467337437d",
        icon: "🔐",
    },
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "Oct 2025",
        accent: "#818cf8",
        dataSecret: undefined,
        icon: "🌐",
    },
];

export const Certifications = () => {
    return (
        <section id="certifications" className="py-20 sm:py-24 md:py-28 relative z-10 w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionReveal variant="slideUp" className="mb-10 sm:mb-14 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Credentials</span>
                    </div>
                    <h2 className="font-light text-white tracking-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
                        Certifications
                    </h2>
                </SectionReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {CERTIFICATIONS.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div
                                className="h-full relative rounded-xl sm:rounded-2xl border border-white/5 p-5 sm:p-6 flex items-start gap-4 group transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                style={{
                                    background: "rgba(10,10,12,0.5)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${cert.accent}25`;
                                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${cert.accent}0a`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.boxShadow = "";
                                }}
                                {...(cert.dataSecret ? { "data-secret": cert.dataSecret } : {})}
                            >
                                {/* Glow */}
                                <div
                                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle, ${cert.accent}20, transparent)` }}
                                />

                                {/* Icon badge */}
                                <div
                                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg border transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `${cert.accent}10`,
                                        borderColor: `${cert.accent}25`,
                                        boxShadow: `0 0 16px ${cert.accent}10`,
                                    }}
                                >
                                    {cert.icon}
                                </div>

                                <div className="flex-1 min-w-0 relative z-10">
                                    <h4
                                        className="text-sm sm:text-base font-semibold text-white mb-1.5 leading-tight group-hover:transition-colors duration-300"
                                        style={{ "--hover-c": cert.accent } as React.CSSProperties}
                                    >
                                        {cert.name}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[10px] sm:text-xs">
                                            <FaCertificate size={10} />
                                            {cert.issuer}
                                        </div>
                                        <div
                                            className="flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] sm:text-[10px] border tracking-wider"
                                            style={{ borderColor: `${cert.accent}30`, background: `${cert.accent}08`, color: cert.accent }}
                                        >
                                            <FaCheckCircle size={8} />
                                            {cert.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}40, transparent)` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
