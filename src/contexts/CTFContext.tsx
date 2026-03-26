"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface CTFChallenge {
    id: number;
    name: string;
    category: string;
    description: string;
    flag: string;
    points: number;
    hints: string[];
    solve: string; // walkthrough for `solve <n>` command
}

export const CHALLENGES: CTFChallenge[] = [
    {
        id: 1,
        name: "Recon: Hello World",
        category: "Reconnaissance",
        description: "Every good hacker starts with recon. The answer is hiding in plain sight — check the page source.",
        flag: "FLAG{h3r0_0nl1n3}",
        points: 100,
        hints: [
            "Hint 1/3: Real hackers always read the source.",
            "Hint 2/3: Try Ctrl+U or right-click → View Page Source on the hero section.",
            "Hint 3/3: Look for an HTML comment starting with <!--  near the top of <main>."
        ],
        solve: "Open Page Source (Ctrl+U). Find the HTML comment in the hero section:\n<!-- ACCESS_GRANTED: FLAG{h3r0_0nl1n3} -->\nThen run: submit FLAG{h3r0_0nl1n3}"
    },
    {
        id: 2,
        name: "OSINT: Decode Me",
        category: "OSINT",
        description: "The About section has a profile card. One of the fields encodes more than it shows.",
        flag: "FLAG{d1g_d33p3r}",
        points: 150,
        hints: [
            "Hint 1/3: Hover over the [?] button on the About profile card.",
            "Hint 2/3: The string you see is base64 encoded. Run: decode <string>",
            "Hint 3/3: Decode: ZkxBR3tkMWdfZDMzcDNyfQ== using the decode command."
        ],
        solve: "1. Go to the About section and hover the [?] badge on the profile card.\n2. Copy the base64 string: ZkxBR3tkMWdfZDMzcDNyfQ==\n3. Run: decode ZkxBR3tkMWdfZDMzcDNyfQ==\n4. Then: submit FLAG{d1g_d33p3r}"
    },
    {
        id: 3,
        name: "Crypto: Rotation",
        category: "Cryptography",
        description: "Something in the Experience timeline doesn't add up. The clue is encrypted with a classic cipher.",
        flag: "FLAG{r0t_th3_w0rld}",
        points: 200,
        hints: [
            "Hint 1/3: Look at the Experience section — each timeline card has a faint cipher text near the date.",
            "Hint 2/3: The cipher is Julius Caesar's favourite — ROT13.",
            "Hint 3/3: Run: rot13 SYNT{e0g_gu3_j0eyq}"
        ],
        solve: "1. Find the faint text 'SYNT{e0g_gu3_j0eyq}' near the top experience card date.\n2. Run: rot13 SYNT{e0g_gu3_j0eyq}\n3. Then: submit FLAG{r0t_th3_w0rld}"
    },
    {
        id: 4,
        name: "Web: Triple Click",
        category: "Web Exploitation",
        description: "The ZTNA project card is hiding a secret interaction. Persistence is a hacker's best tool.",
        flag: "FLAG{cl1ck_h4ck_r3p34t}",
        points: 250,
        hints: [
            "Hint 1/3: Focus on the ZTNA card in the Projects section.",
            "Hint 2/3: The icon text ['ZTNA'] can be interacted with.",
            "Hint 3/3: Click the 'ZTNA' text exactly 3 times rapidly to trigger the challenge."
        ],
        solve: "1. Scroll to the Projects section.\n2. Find the ZTNA card.\n3. Click the large 'ZTNA' text in the card graphic 3 times.\n4. The flag will be captured automatically."
    },
    {
        id: 5,
        name: "Social Eng: The Insider",
        category: "Social Engineering",
        description: "Sometimes the attack vector is through the front door. Know the right address.",
        flag: "FLAG{s0c14l_3ng1n33r}",
        points: 300,
        hints: [
            "Hint 1/3: Go to the Contact section and fill in the form.",
            "Hint 2/3: The email field is the key. Not any email will do.",
            "Hint 3/3: Submit the form with email: ctf@solve.me"
        ],
        solve: "1. Go to the Contact section.\n2. Fill in any name and message.\n3. Use exactly this email: ctf@solve.me\n4. Click Send Message — the flag is captured automatically."
    }
];

interface CTFContextType {
    capturedFlags: string[];
    captureFlag: (flag: string) => void;
    isCaptured: (flag: string) => boolean;
    terminalOpen: boolean;
    setTerminalOpen: (v: boolean) => void;
    toastFlag: { flag: string; name: string } | null;
    clearToast: () => void;
    totalPoints: number;
}

const CTFContext = createContext<CTFContextType | null>(null);

export const CTFProvider = ({ children }: { children: React.ReactNode }) => {
    const [capturedFlags, setCapturedFlags] = useState<string[]>([]);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [toastFlag, setToastFlag] = useState<{ flag: string; name: string } | null>(null);

    const captureFlag = useCallback((flag: string) => {
        if (capturedFlags.includes(flag)) return;
        const challenge = CHALLENGES.find(c => c.flag === flag);
        if (!challenge) return;
        setCapturedFlags(prev => [...prev, flag]);
        setToastFlag({ flag, name: challenge.name });
    }, [capturedFlags]);

    const isCaptured = useCallback((flag: string) => capturedFlags.includes(flag), [capturedFlags]);

    const clearToast = useCallback(() => setToastFlag(null), []);

    const totalPoints = capturedFlags.reduce((sum, f) => {
        const c = CHALLENGES.find(ch => ch.flag === f);
        return sum + (c?.points ?? 0);
    }, 0);

    return (
        <CTFContext.Provider value={{
            capturedFlags, captureFlag, isCaptured,
            terminalOpen, setTerminalOpen,
            toastFlag, clearToast,
            totalPoints
        }}>
            {children}
        </CTFContext.Provider>
    );
};

export const useCTF = () => {
    const ctx = useContext(CTFContext);
    if (!ctx) throw new Error("useCTF must be used within CTFProvider");
    return ctx;
};
