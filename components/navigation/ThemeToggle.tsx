"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const root = document.documentElement;
        setIsDark(root.classList.contains("dark"));
    }, []);

    const toggle = () => {
        const root = document.documentElement;
        if (root.classList.contains("dark")) {
            root.classList.remove("dark");
            setIsDark(false);
        } else {
            root.classList.add("dark");
            setIsDark(true);
        }
    };

    return (
        <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="inline-flex items-center justify-center p-1 rounded focus:outline-none"
            title={isDark ? "Switch to light" : "Switch to dark"}
        >
            {/* Simple icons: black sun for light mode, white moon for dark mode */}
            {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#ffffff" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 8h2v-3h-2v3zm7.03-2.03l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 11v2h3v-2h-3zM11 1h2v3h-2V1zm7.07 3.93l1.41-1.41-1.79-1.79-1.41 1.41 1.79 1.79zM4.22 19.78l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="#000000" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
