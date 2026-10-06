"use client"

import { useState } from "react";
import { useTranslations, useLocale }  from "next-intl"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwithcer";


export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        {href: `/${locale}`, label: t("home")},
        {href: `/${locale}#about`, label: t("about")},
        {href: `/${locale}#services`, label: t("Products")},
         {href: `/${locale}/genetics`, label: t('genetics')},
        {href: `/${locale}/register`, label: t('register')},
       
    ];

    return(
        <header className = "bg-green-700 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

            
                {/* Logo shrinks on small screen so it never wraps awkwardly */}
                <Link href={`/${locale}`} className="flex items-center gap-2 sm:gap-3 max-w-[70%] sm:max-w-none shrink-0">
                    <img
                        src="/logo.svg"
                        alt="Khusaal FPO logo"
                        className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain rounded-xl bg-white/10 p-1 shadow-sm"
                    />
                    <span className="text-base sm:text-lg md:text-2xl font-bold tracking-wide leading-tight whitespace-nowrap">
                        {t("brand")}
                    </span>
                </Link>

                {/* Desktop nav — hidden on mobile */}
                <nav className="hidden md:flex gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                    className="hover:text-green-200 transition"
                    >
                    {link.label}
                    </Link>
                    ))}
                </nav>
                {/* Desktop right side — hidden on mobile */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                </div>
                
                {/* Mobile right side — language switcher stays visible + hamburger toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageSwitcher />
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="flex flex-col justify-center items-center w-9 h-9 shrink-0"
                        >
                            <span
                            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                            menuOpen ? "translate-y-1.5 rotate-45" : ""
                            }`}
                            />
                            <span
                            className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-200 ${
                            menuOpen ? "opacity-0" : "opacity-100"
                            }`}
                            />
                            <span
                            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                            menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                            }`}
                            />
                        </button>
                </div>
                </div>

                {/* Mobile dropdown menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    <nav className="flex flex-col px-4 pb-4 gap-1 bg-green-700 border-t border-green-700">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-2.5 text-sm font-medium hover:text-green-200 transition border-b border-green-700/50 last:border-b-0"
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                </div>
        </header>
    )
}