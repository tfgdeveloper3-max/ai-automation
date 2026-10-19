import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useLeadModal } from './leadModalContext';
import { SERVICES } from './ServicesNav';

type SubItem = { label: string; to: string; description?: string };
type NavItem = { label: string; to: string; children?: SubItem[] };

const LINKS: NavItem[] = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/service', children: SERVICES },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Affiliate', to: '/affiliate' },
    { label: 'Contact', to: '/contact' },
];

const TOP_HEIGHT = 'h-20 sm:h-24 lg:h-[104px] xl:h-28';

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDown = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const desktopClass = (active: boolean) =>
    `text-sm transition-colors hover:text-white ${active ? 'font-semibold text-white' : 'font-normal text-white/85'}`;

const mobileClass = (active: boolean) =>
    `block rounded-lg px-3 py-2.5 text-[15px] hover:bg-white/5 ${active ? 'font-semibold text-white' : 'text-white/85'}`;

/* ---------------- Desktop dropdown ---------------- */

const DesktopDropdown = ({ item }: { item: NavItem }) => {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLLIElement | null>(null);
    const closeTimer = useRef<number | null>(null);
    const panelId = `menu-${item.label.toLowerCase()}`;

    const show = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        setOpen(true);
    };
    /* small delay so moving the mouse from the link to the panel doesn't close it */
    const hideSoon = () => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
    };

    /* close on outside click and Escape */
    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('pointerdown', onDown);
        window.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onDown);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    useEffect(() => () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
    }, []);

    return (
        <li
            ref={wrapRef}
            className="relative"
            onMouseEnter={show}
            onMouseLeave={hideSoon}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
            }}
        >
            <div className="flex items-center gap-1">
                {/* no `end`, so "Services" stays highlighted on /service/... pages too */}
                <NavLink to={item.to} className={({ isActive }) => desktopClass(isActive)}>
                    {item.label}
                </NavLink>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={`${open ? 'Hide' : 'Show'} ${item.label} menu`}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/85 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8ac44b]"
                >
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* pt-4 = invisible "bridge" between the link and the panel */}
            <div
                id={panelId}
                className={`absolute left-1/2 top-full z-10 w-[320px] translate-x-[-50%] pt-4 transition-[opacity,transform,visibility] duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                    }`}
            >
                <ul className="rounded-2xl border border-white/10 bg-[#140f45]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md">
                    {item.children?.map((child) => (
                        <li key={child.to}>
                            <NavLink
                                to={child.to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.06] ${isActive ? 'bg-white/[0.08]' : ''
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors ${isActive ? 'bg-[#8ac44b]' : 'bg-white/30 group-hover:bg-[#8ac44b]'
                                                }`}
                                        />
                                        <span>
                                            <span className={`block text-sm text-white ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                                {child.label}
                                            </span>
                                            {child.description && (
                                                <span className="mt-0.5 block text-xs text-white/60">{child.description}</span>
                                            )}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                    <li className="mt-1 border-t border-white/10 pt-1">
                        <Link
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-[#8ac44b] transition-colors hover:bg-white/[0.06]"
                        >
                            View all services <ChevronsRight className="h-4 w-4" />
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
    );
};

/* ---------------- Navbar ---------------- */

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const { openLeadForm } = useLeadModal();
    const close = () => setOpen(false);

    const openLead = () => {
        setOpen(false);
        openLeadForm();
    };

    /* Solid background once the page is scrolled */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Close menus whenever the page changes */
    useEffect(() => {
        setOpen(false);
        setMobileSub(null);
    }, [pathname]);

    /* Close the mobile menu with Escape */
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const solid = scrolled || open;

    const header = (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${solid ? 'bg-[#160f4a]/90 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md' : 'bg-transparent'
                }`}
        >
            <nav
                className={`mx-auto flex w-full max-w-[1280px] items-center px-5 transition-[height] duration-300 sm:px-8 lg:px-10 ${scrolled ? 'h-16 sm:h-[72px] lg:h-20' : TOP_HEIGHT
                    }`}
            >
                <Link to="/" aria-label="AMZ Automation Solutions — Home" className="shrink-0" onClick={close}>
                    <img
                        src="/images/logo.png"
                        alt="AMZ Automation Solutions"
                        draggable={false}
                        className={`w-auto transition-[height] duration-300 ${scrolled ? 'h-14 sm:h-16 lg:h-[72px]' : 'h-16 sm:h-20 lg:h-[88px] xl:h-24'
                            }`}
                    />
                </Link>

                {/* Desktop links */}
                <ul className="ml-auto mr-10 hidden items-center gap-7 lg:flex xl:mr-14 xl:gap-10">
                    {LINKS.map((item) =>
                        item.children ? (
                            <DesktopDropdown key={item.label} item={item} />
                        ) : (
                            <li key={item.label}>
                                <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => desktopClass(isActive)}>
                                    {item.label}
                                </NavLink>
                            </li>
                        )
                    )}
                </ul>

                <div className="hidden items-center gap-2 lg:flex">
                    <button
                        type="button"
                        onClick={openLead}
                        aria-haspopup="dialog"
                        className="inline-flex h-9 items-center rounded-full bg-[#8ac44b] px-6 text-xs font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Get Started
                    </button>
                    <button
                        type="button"
                        onClick={openLead}
                        aria-haspopup="dialog"
                        aria-label="Get started"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </button>
                </div>

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

            {/* Mobile / tablet menu */}
            {open && (
                <div id="mobile-menu" className="absolute inset-x-0 top-full px-5 pt-2 sm:px-8 lg:hidden">
                    <div className="max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#140f45]/95 p-4 shadow-2xl backdrop-blur-md">
                        <ul className="flex flex-col">
                            {LINKS.map((item) => {
                                if (!item.children) {
                                    return (
                                        <li key={item.label}>
                                            <NavLink
                                                to={item.to}
                                                end={item.to === '/'}
                                                onClick={close}
                                                className={({ isActive }) => mobileClass(isActive)}
                                            >
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    );
                                }

                                const subOpen = mobileSub === item.label;
                                const subId = `mobile-sub-${item.label.toLowerCase()}`;
                                return (
                                    <li key={item.label}>
                                        <div className="flex items-center">
                                            <NavLink
                                                to={item.to}
                                                onClick={close}
                                                className={({ isActive }) => `flex-1 ${mobileClass(isActive)}`}
                                            >
                                                {item.label}
                                            </NavLink>
                                            <button
                                                type="button"
                                                onClick={() => setMobileSub(subOpen ? null : item.label)}
                                                aria-expanded={subOpen}
                                                aria-controls={subId}
                                                aria-label={`${subOpen ? 'Hide' : 'Show'} ${item.label} menu`}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/85 hover:bg-white/5"
                                            >
                                                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${subOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>

                                        {subOpen && (
                                            <ul id={subId} className="mb-1 ml-3 border-l border-white/10 pl-2">
                                                {item.children.map((child) => (
                                                    <li key={child.to}>
                                                        <NavLink
                                                            to={child.to}
                                                            onClick={close}
                                                            className={({ isActive }) =>
                                                                `block rounded-lg px-3 py-2 text-sm hover:bg-white/5 ${isActive ? 'font-semibold text-[#8ac44b]' : 'text-white/75'
                                                                }`
                                                            }
                                                        >
                                                            {child.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            type="button"
                            onClick={openLead}
                            aria-haspopup="dialog"
                            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#8ac44b] text-sm font-semibold text-white"
                        >
                            Get Started <ChevronsRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );

    return (
        <>
            <div aria-hidden="true" className={TOP_HEIGHT} />
            {typeof document !== 'undefined' ? createPortal(header, document.body) : header}
        </>
    );
};

export default Navbar;