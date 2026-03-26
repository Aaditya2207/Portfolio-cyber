"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";

const BLOGS = [
    {
        title: "Bypassing Modern EDRs using Direct Syscalls",
        date: "Dec 12, 2025",
        readTime: "8 min read",
        snippet: "An in-depth guide on utilizing direct system calls in C++ to evade user-land hooking deployed by mainstream Endpoint Detection and Response tools.",
        category: "Malware Dev",
        link: "#"
    },
    {
        title: "CTF Writeup: HackTheBox Enterprise",
        date: "Nov 03, 2025",
        readTime: "12 min read",
        snippet: "A complete walkthrough of the Enterprise machine, involving a Gitlab CE exploit chain and an insidious Docker breakout for privilege escalation.",
        category: "CTF",
        link: "#"
    },
    {
        title: "Building an Automated Cloud Security Scanner",
        date: "Sep 28, 2025",
        readTime: "6 min read",
        snippet: "How I leveraged Python, Boto3, and AWS Lambda to create an automated, cost-effective CSPM (Cloud Security Posture Management) tool.",
        category: "Cloud Sec",
        link: "#"
    }
];

export const Blog = () => {
    return (
        <section id="blog" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 flex flex-col items-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
                        <span className="text-neon-blue">07.</span>Intel_&_Writeups
                    </h2>
                    <div className="h-[2px] w-32 bg-neon-blue"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOGS.map((blog, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <a href={blog.link} className="block h-full group">
                                <Card glowColor="blue" className="h-full flex flex-col justify-between group-hover:-translate-y-2 transition-transform duration-300">
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-mono text-neon-blue border border-neon-blue/20 px-2 py-1 rounded">
                                                {blog.category}
                                            </span>
                                            <span className="text-xs font-mono text-gray-500">
                                                {blog.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-magenta transition-colors">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                            {blog.snippet}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                                        <span className="text-gray-500 font-mono text-xs">{blog.date}</span>
                                        <span className="text-neon-blue font-mono text-sm group-hover:underline">Read More {">"}</span>
                                    </div>
                                </Card>
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <motion.a
                        href="#"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 hover:text-neon-magenta font-mono text-sm border-b border-transparent hover:border-neon-magenta transition-colors pb-1"
                    >
                        [ View_All_Logs ]
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
