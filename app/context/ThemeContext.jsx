"use client"

import { createContext, useEffect } from "react";
import { useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () =>{
    if (typeof window !== "undefined"){
        const value = localStorage.getItem("theme");
        return value || "light";
    }
};

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(()=>{
        return getFromLocalStorage();
    });

    const toogle = () => {
        setTheme(theme==="light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return <ThemeContext.Provider value={{theme, toogle}}>{children}</ThemeContext.Provider>;
};