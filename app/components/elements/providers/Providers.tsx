"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <>
            <ThemeProvider defaultTheme="system" enableSystem >
                {children}
            </ThemeProvider>
        </>
    );
}

export default Providers;
