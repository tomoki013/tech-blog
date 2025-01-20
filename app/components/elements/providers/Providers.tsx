"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { WithChildren } from "../types";

const Providers = ({
    children
} : WithChildren
) => {
    return (
        <>
            <ThemeProvider defaultTheme="light" enableSystem >
                {children}
            </ThemeProvider>
        </>
    );
}

export default Providers;
