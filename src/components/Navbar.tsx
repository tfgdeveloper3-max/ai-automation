'use client';

import { useState } from 'react';

const LINKS = [
    { label: 'Home', href: '#', active: true },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Blog', href: '#blog' },
    { label: 'Affiliate', href: '#affiliate' },
    { label: 'Contact', href: '#contact' },
];

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="relative z-30">
            <nav className="mx-auto flex w-full max-w-[1280px] items-center px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
                <a href="#" className="text-2xl font-medium tracking-tight text-white sm:text-[28px]">
                    Logo Here
                </a>

                {/* Desktop / laptop links */}
                <ul className="ml-auto mr-10 hidden items-center gap-7 lg:flex xl:mr-14 xl:gap-10">
                    {LINKS.map((l) => (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                className={`text-sm transition-colors hover:text-white ${l.active ? 'font-semibold text-white' : 'font-normal text-white/85'
                                    }`}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-2 lg:flex">
                    <a
                        href="#get-started"
                        className="inline-flex h-9 items-center rounded-full bg-[#8ac44b] px-6 text-xs font-semibold text-white transition hover:brightness-110"
                    >
                        Get Started
                    </a>
                    <a
                        href="#get-started"
                        aria-label="Get started"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Mobile / tablet toggle */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="absolute inset-x-0 top-full px-5 sm:px-8 lg:hidden">
                    <div className="rounded-2xl border border-white/10 bg-[#140f45]/95 p-4 shadow-2xl backdrop-blur-md">
                        <ul className="flex flex-col">
                            {LINKS.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-lg px-3 py-2.5 text-[15px] hover:bg-white/5 ${l.active ? 'font-semibold text-white' : 'text-white/85'
                                            }`}
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#get-started"
                            onClick={() => setOpen(false)}
                            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-[#8ac44b] text-sm font-semibold text-white"
                        >
                            Get Started <ChevronsRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;