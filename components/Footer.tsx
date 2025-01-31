"use client";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS, FOOTER_CONTACT_INFO_EN, FOOTER_LINKS_EN, SOCIALS_EN } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [footerContent, setFooterContent] = useState({
        footerLinks: FOOTER_LINKS,
        socials: SOCIALS,
        contactInfo: FOOTER_CONTACT_INFO,
    });

    useEffect(() => {
        const currentPath = window.location.pathname;
         if (currentPath.includes('/en')) {
            setFooterContent({
                footerLinks: FOOTER_LINKS_EN,
                socials: SOCIALS_EN,
                contactInfo: FOOTER_CONTACT_INFO_EN,
            });
        }
    }, []); 

    const { footerLinks, socials, contactInfo } = footerContent;

    return (
        <footer id="contacts" className='font-manrope flexCenter bg-gray-100 pt-10 pb-10'>
            <div className='padding-container max-container flex w-full flex-col gap-14'>
                <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row'>
                    <div className='mb-10'>
                        <Link href="/">
                            <Image alt="logo" width={50} height={50} src="/logo2.png" />
                        </Link>
                    </div>

                    <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
                        {footerLinks.map((column) => (
                            <FooterColumn key={column.title} title={column.title}>
                                <ul className='regular-14 flex flex-col gap-4 text-gray-30'>
                                    {column.links.map((link, index) => (
                                        <li key={link}>
                                            <Link href={column.hrefs[index]} className='hover:underline'>
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}

                        <div className='flex flex-col gap-5'>
                            <FooterColumn title={contactInfo.title}>
                                {contactInfo.links.map((link) => (
                                    <div key={link.label} className='flex gap-4 md:flex-col lg:flex-row'>
                                        <p className='whitespace-nowrap regular-14 text-gray-30'>
                                            {link.label}:
                                        </p>
                                        <p className='regular-14 text-gray-30 whitespace-nowrap'>
                                            {link.value}
                                        </p>
                                    </div>
                                ))}
                            </FooterColumn>
                        </div>

                        <div className='flex flex-col gap-5'>
                            <FooterColumn title={socials.title}>
                                <ul className='regular-14 flex gap-4 text-gray-30'>
                                    {socials.links.map((link, index) => (
                                        <li key={link}>
                                            <Link href={socials.social_link[index]} target="_blank" aria-label={`Link to ${link}`}>
                                                <div className="relative group w-6 h-6 p">
                                                    <Image
                                                        src={link}
                                                        alt="social logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </FooterColumn>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

type FooterColumnProps = {
    title: string;
    children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
    return (
        <div className="flex flex-col">
        <div className='font-sans flex flex-col gap-5'>
            <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
            {children}
        </div>
        </div>
    );
};

export default Footer;
