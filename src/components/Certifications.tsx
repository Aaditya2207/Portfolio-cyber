"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const CERTIFICATIONS = [
    {
        name: "Identity Security Leader - Sailpoint",
        issuer: "Sailpoint Technologies",
        date: "Nov.2025",
        color: "text-neon-blue border-neon-blue/30"
    },
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "Oct.2025",
        color: "text-neon-indigo border-neon-indigo/30"
    }
];

export const Certifications = () => {
    return (
        <section id="certifications" className="py-20 sm:py-24 md:py-28 relative z-10 w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 sm:mb-14 flex flex-col items-start"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                        <span className="text-neon-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase">Credentials</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Certifications
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {CERTIFICATIONS.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <div
                                className={`glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-white/5 hover:border-neon-blue/20 flex items-start gap-3 sm:gap-4 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
                                {...(idx === 0 ? { 'data-secret': '464c41477b316e7370336374307235f67346467337437d' } : {})}
                            >
                                <div className={`mt-0.5 sm:mt-1 flex-shrink-0 text-neon-blue`}>
                                    <FaCertificate size={16} className="sm:text-[18px]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 group-hover:text-neon-blue transition-colors leading-tight">
                                        {cert.name}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <p className="text-gray-400 font-mono text-[10px] sm:text-xs">{cert.issuer}</p>
                                        <span className={`text-[10px] sm:text-xs font-mono border ${cert.color} px-2 py-0.5 rounded`}>
                                            {cert.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
