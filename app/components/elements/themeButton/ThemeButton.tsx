"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <ul className={` fixed top-2 left-2 p-1 rounded-sm flex gap-2 ${theme === 'dark' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'} `}>
            <li
                onClick={() => setTheme('light')}
                className={` p-2 cursor-pointer rounded-md ${theme === 'light' ? 'bg-gray-200 text-black' : ''} `}
            >
                Light
            </li>
            <li
                onClick={() => setTheme('dark')}
                className={` p-2 cursor-pointer rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : ''} `}
            >
                Dark
            </li>
        </ul>
    );
}

export default ThemeButton;
