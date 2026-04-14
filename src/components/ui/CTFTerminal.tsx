"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCTF, CHALLENGES } from "@/contexts/CTFContext";

interface Line {
    type: "command" | "output" | "error" | "success" | "info" | "flag" | "system" | "ascii";
    text: string;
}

const BANNER_LINES: Line[] = [
    { type: "ascii", text: "   ______  _______  ______" },
    { type: "ascii", text: "  / ____/ /_  __/  / ____/" },
    { type: "ascii", text: " / /       / /    / /_    " },
    { type: "ascii", text: "/ /___    / /    / __/    " },
    { type: "ascii", text: "\\____/   /_/    /_/       " },
    { type: "info", text: "" },
    { type: "system", text: " [ SYSTEM BOOT ] ... OK" },
    { type: "system", text: " [ MODULE CTF  ] ... ONLINE" },
    { type: "info", text: " ──────────────────────────────────────────────" },
    { type: "flag", text: "  Capture The Flag — Portfolio Edition" },
    { type: "info", text: " ──────────────────────────────────────────────" },
    { type: "info", text: "  COMMAND          DESCRIPTION" },
    { type: "info", text: "  help             Show available commands" },
    { type: "info", text: "  hint <1-5>       Get a challenge hint" },
    { type: "info", text: "  solve <1-5>      Reveal the solution" },
    { type: "info", text: " ──────────────────────────────────────────────" },
];

function rot13(str: string): string {
    return str.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function fromBase64(str: string): string {
    try {
        return atob(str);
    } catch {
        return "[ERROR] Invalid base64 string.";
    }
}

export const CTFTerminal = () => {
    const { capturedFlags, captureFlag, isCaptured, terminalOpen, setTerminalOpen, totalPoints } = useCTF();
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<Line[]>(BANNER_LINES);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const push = useCallback((line: Line) => {
        setLines(prev => [...prev, line]);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    useEffect(() => {
        if (terminalOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [terminalOpen]);

    // Global keyboard shortcut: backtick to toggle
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "`") {
                e.preventDefault();
                setTerminalOpen(!terminalOpen);
            }
            if (e.key === "Escape" && terminalOpen) {
                setTerminalOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [terminalOpen, setTerminalOpen]);

    const executeCommand = useCallback((raw: string) => {
        const cmd = raw.trim();
        if (!cmd) return;

        push({ type: "command", text: `> ${cmd}` });
        setHistory(prev => [cmd, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);

        const [verb, ...args] = cmd.toLowerCase().split(" ");
        const argStr = args.join(" ").trim();
        const originalArgs = raw.trim().split(" ").slice(1).join(" ").trim();

        switch (verb) {
            case "help":
                push({ type: "info", text: "" });
                push({ type: "info", text: " AVAILABLE COMMANDS" });
                push({ type: "info", text: "─────────────────────────────────────" });
                [
                    ["help", "Show this menu"],
                    ["whoami", "Display operator profile"],
                    ["ls flags", "List all flags (captured/pending)"],
                    ["progress", "Show score and completion"],
                    ["decode <b64>", "Decode a base64 string"],
                    ["rot13 <text>", "Apply ROT13 cipher"],
                    ["hint <1-5>", "Get a hint for challenge N"],
                    ["solve <1-5>", "░░ DIRECT SOLVE — bypass and reveal flag"],
                    ["submit <FLAG{}>", "Submit a captured flag"],
                    ["clear", "Clear terminal"],
                ].forEach(([c, d]) => {
                    push({ type: "info", text: `  ${c.padEnd(18)} ${d}` });
                });
                push({ type: "info", text: "" });
                break;

            case "whoami":
                push({ type: "info", text: "" });
                push({ type: "info", text: "  alias    : /unknown/" });
                push({ type: "info", text: "  role     : Intruder" });
                push({ type: "info", text: `  flags    : ${capturedFlags.length}/5` });
                push({ type: "info", text: `  score    : ${totalPoints} pts` });
                push({ type: "info", text: "  target   : aadityak22.dev" });
                push({ type: "info", text: "" });
                break;

            case "progress":
                push({ type: "info", text: "" });
                push({ type: "info", text: `  Score  : ${totalPoints} / 1000 pts` });
                push({ type: "info", text: `  Flags  : ${capturedFlags.length} / ${CHALLENGES.length}` });
                push({ type: "info", text: "" });
                CHALLENGES.forEach(c => {
                    const done = isCaptured(c.flag);
                    push({ type: done ? "success" : "info", text: `  [${done ? "✓" : " "}] ${c.id}. ${c.name} (${c.points}pts)` });
                });
                push({ type: "info", text: "" });
                if (capturedFlags.length === CHALLENGES.length) {
                    push({ type: "flag", text: "  🏴 SYSTEM FULLY COMPROMISED. Well played." });
                }
                break;

            case "ls":
                if (argStr === "flags") {
                    push({ type: "info", text: "" });
                    push({ type: "info", text: "  /flags:" });
                    CHALLENGES.forEach(c => {
                        const done = isCaptured(c.flag);
                        push({
                            type: done ? "success" : "info",
                            text: `  ${done ? "✓" : "○"} [${c.category}] ${c.name} — ${done ? c.flag : "???"}`
                        });
                    });
                    push({ type: "info", text: "" });
                } else {
                    push({ type: "error", text: `  Unknown path. Try: ls flags` });
                }
                break;

            case "decode":
                if (!originalArgs) {
                    push({ type: "error", text: "  Usage: decode <base64_string>" });
                } else {
                    const decoded = fromBase64(originalArgs);
                    push({ type: "success", text: `  ${decoded}` });
                }
                break;

            case "rot13":
                if (!originalArgs) {
                    push({ type: "error", text: "  Usage: rot13 <text>" });
                } else {
                    push({ type: "success", text: `  ${rot13(originalArgs)}` });
                }
                break;

            case "hint": {
                const idx = parseInt(args[0]) - 1;
                const challenge = CHALLENGES[idx];
                if (!challenge) {
                    push({ type: "error", text: "  Usage: hint <1-5>" });
                    break;
                }
                push({ type: "info", text: "" });
                push({ type: "info", text: `  [Challenge ${challenge.id}] ${challenge.name}` });
                push({ type: "info", text: `  Category: ${challenge.category} | ${challenge.points}pts` });
                push({ type: "info", text: `  ${challenge.description}` });
                push({ type: "info", text: "" });
                challenge.hints.forEach(h => push({ type: "info", text: `  ${h}` }));
                push({ type: "info", text: "" });
                break;
            }

            case "solve": {
                const idx = parseInt(args[0]) - 1;
                const challenge = CHALLENGES[idx];
                if (!challenge) {
                    push({ type: "error", text: "  Usage: solve <1-5>" });
                    break;
                }
                push({ type: "info", text: "" });
                push({ type: "flag", text: `  ░░ DIRECT SOLVE: ${challenge.name} ░░` });
                push({ type: "info", text: "" });
                challenge.solve.split("\n").forEach(line => {
                    push({ type: "info", text: `  ${line}` });
                });
                push({ type: "info", text: "" });
                // Auto-capture the flag on solve
                if (!isCaptured(challenge.flag)) {
                    captureFlag(challenge.flag);
                    push({ type: "flag", text: `  ✓ FLAG AUTO-CAPTURED: ${challenge.flag}` });
                } else {
                    push({ type: "success", text: `  [Already captured]` });
                }
                push({ type: "info", text: "" });
                break;
            }

            case "submit": {
                const flagArg = originalArgs.trim();
                const match = CHALLENGES.find(c => c.flag === flagArg);
                if (!match) {
                    push({ type: "error", text: `  [REJECTED] Unknown flag: ${flagArg}` });
                    push({ type: "error", text: "  Format must be: FLAG{...}" });
                    break;
                }
                if (isCaptured(flagArg)) {
                    push({ type: "success", text: `  [DUPLICATE] You already captured this flag.` });
                    break;
                }
                captureFlag(flagArg);
                push({ type: "flag", text: "" });
                push({ type: "flag", text: `  ████████████████████████████████████` });
                push({ type: "flag", text: `  ✓ FLAG ACCEPTED: ${flagArg}` });
                push({ type: "flag", text: `  Challenge: ${match.name}  [+${match.points}pts]` });
                push({ type: "flag", text: `  ████████████████████████████████████` });
                push({ type: "flag", text: "" });
                break;
            }

            case "clear":
                setLines([]);
                break;

            default:
                push({ type: "error", text: `  Command not found: ${verb}. Type 'help'.` });
        }
    }, [capturedFlags, captureFlag, isCaptured, push, totalPoints]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIdx = Math.min(historyIndex + 1, history.length - 1);
            setHistoryIndex(newIdx);
            setInput(history[newIdx] ?? "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIdx = Math.max(historyIndex - 1, -1);
            setHistoryIndex(newIdx);
            setInput(newIdx === -1 ? "" : (history[newIdx] ?? ""));
        }
    };

    const lineColors: Record<Line["type"], string> = {
        command: "text-neon-blue",
        output: "text-gray-300",
        error: "text-red-400",
        success: "text-green-400",
        info: "text-gray-400",
        flag: "text-neon-blue font-bold",
        system: "text-yellow-400/90",
        ascii: "text-neon-blue font-bold",
    };

    return (
        <>
            {/* Floating Terminal Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setTerminalOpen(!terminalOpen)}
                title="Toggle CTF Terminal (Backtick `)"
                className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-mono text-[10px] sm:text-xs border backdrop-blur-xl transition-all duration-300 group
                    ${terminalOpen
                        ? "bg-neon-blue/15 border-neon-blue/60 text-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                        : "bg-dark-bg/80 border-white/10 text-gray-400 hover:border-neon-blue/40 hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    }`}
            >
                <span className={`w-2 h-2 rounded-full ${terminalOpen ? "bg-neon-blue animate-pulse" : "bg-gray-600 group-hover:bg-neon-blue"} transition-colors`}></span>
                <span className="hidden xs:inline tracking-widest">{terminalOpen ? "CLOSE" : "CTF"}</span>
                <span className="font-mono text-gray-600 hidden sm:inline">[ ` ]</span>
            </motion.button>

            {/* Terminal Panel */}
            <AnimatePresence>
                {terminalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setTerminalOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Terminal Window */}
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 sm:pb-20 pointer-events-none">
                            <motion.div
                                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 30, opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="w-full max-w-4xl h-[70vh] sm:h-[75vh] bg-[#030305]/95 backdrop-blur-xl border border-neon-blue/30 rounded-xl shadow-[0_10px_70px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden pointer-events-auto"
                            >
                            {/* Title Bar */}
                            <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 border-b border-white/5 bg-white/[0.02] flex-shrink-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                                    </div>
                                    <span className="font-mono text-[10px] sm:text-xs text-gray-500 tracking-widest">
                                        ctf@portfolio:~
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <span className="font-mono text-[10px] sm:text-xs text-neon-blue tracking-wider">
                                        FLAGS: {capturedFlags.length}/{CHALLENGES.length}  [{totalPoints}pts]
                                    </span>
                                    <button onClick={() => setTerminalOpen(false)} className="text-gray-600 hover:text-white font-mono text-xs">
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Output */}
                            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-0 font-mono text-[10px] sm:text-[11.5px] scroll-smooth">
                                {lines.map((line, i) => (
                                    <div key={i} className={`leading-snug whitespace-pre sm:whitespace-pre-wrap ${lineColors[line.type]}`}>
                                        {line.text}
                                    </div>
                                ))}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input */}
                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-white/5 flex-shrink-0 bg-white/[0.01]">
                                <span className="text-neon-blue font-mono text-[10px] sm:text-xs flex-shrink-0">$</span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent text-white font-mono text-[10px] sm:text-xs outline-none placeholder:text-gray-700 caret-neon-blue"
                                    placeholder="type a command..."
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                />
                                <button
                                    onClick={() => { executeCommand(input); setInput(""); }}
                                    className="text-gray-600 hover:text-neon-blue font-mono text-[10px] sm:text-xs flex-shrink-0 transition-colors"
                                >
                                    [↵]
                                </button>
                            </div>
                        </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
