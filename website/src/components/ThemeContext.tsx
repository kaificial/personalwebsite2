"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if user has a saved preference
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            // User chose n a theme before- use that
            const prefersDark = savedTheme === "dark";
            setIsDark(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
        } else {
            // check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDark(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
            // Save the preference
            localStorage.setItem("theme", prefersDark ? "dark" : "light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        // Update the DOM
        document.documentElement.classList.toggle("dark", newTheme);

        //localStorage
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
