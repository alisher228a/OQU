"use client"

import { ThemeContext } from '@/app/context/ThemeContext';
import Image from 'next/image';
import { useContext } from 'react';

const ThemeToggle = () => {

    const {toogle, theme} = useContext(ThemeContext);

    return (
        <section>
            <div className='w-[50px] h-[25px] rounded-[40%] cursor-pointer flex items-center justify-between relative' onClick={toogle} style={theme === "dark" ? {backgroundColor: "white"} : {backgroundColor: "#0f172a"}}>
                <Image src="/moon.png" width={14} height={14} alt="image of moon"/>
                <div className='w-[15px] h-[15px] rounded-[50%] absolute' style={theme==="dark" ? {left:1,background:"#0f172a"} : {right:1, background:"white"}}></div>
                <Image src="/sun.png" width={14} height={14} alt="image of sun"/>
            </div>
        </section>
    )
};

export default ThemeToggle;