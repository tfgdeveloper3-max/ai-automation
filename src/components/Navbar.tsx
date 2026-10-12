import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';

type NavItem = { label: string; to: string; route?: boolean };

const LINKS: NavItem[] = [
    { label: 'Home', to: '/', route: true },
    { label: 'About', to: '/about', route: true },
    { label: 'Services', to: '/service', route: true },
    { label: 'Blog', to: '/blog', route: true },
    { label: 'Affiliate', to: '/affiliate', route: true },
    { label: 'Contact', to: '/contact', route: true },
];

/* Height of the navbar at the very top of the page.
   The spacer uses the same classes so the hero content never jumps. */
const TOP_HEIGHT = 'h-20 sm:h-24 lg:h-[104px] xl:h-28';

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const desktopClass = (active: boolean) =>
    `text-sm transition-colors hover:text-white ${active ? 'font-semibold text-white' : 'font-normal text-white/85'}`;

const mobileClass = (active: boolean) =>
    `block rounded-lg px-3 py-2.5 text-[15px] hover:bg-white/5 ${active ? 'font-semibold text-white' : 'text-white/85'}`;

const NavItemLink = ({ item, mobile, onClick }: { item: NavItem; mobile?: boolean; onClick?: () => void }) => {
    const cls = mobile ? mobileClass : desktopClass;

    if (item.route) {
        return (
            <NavLink to={item.to} end={item.to === '/'} onClick={onClick} className={({ isActive }) => cls(isActive)}>
                {item.label}
            </NavLink>
        );
    }
    return (
        <a href={item.to} onClick={onClick} className={cls(false)}>
            {item.label}
        </a>
    );
};

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const close = () => setOpen(false);

    /* Solid background once the page is scrolled */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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

                <ul className="ml-auto mr-10 hidden items-center gap-7 lg:flex xl:mr-14 xl:gap-10">
                    {LINKS.map((item) => (
                        <li key={item.label}>
                            <NavItemLink item={item} />
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
                <div id="mobile-menu" className="absolute inset-x-0 top-full px-5 pt-2 sm:px-8 lg:hidden">
                    <div className="rounded-2xl border border-white/10 bg-[#140f45]/95 p-4 shadow-2xl backdrop-blur-md">
                        <ul className="flex flex-col">
                            {LINKS.map((item) => (
                                <li key={item.label}>
                                    <NavItemLink item={item} mobile onClick={close} />
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#get-started"
                            onClick={close}
                            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-[#8ac44b] text-sm font-semibold text-white"
                        >
                            Get Started <ChevronsRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );

    return (
        <>
            {/* Spacer keeps the hero layout exactly as before */}
            <div aria-hidden="true" className={TOP_HEIGHT} />
            {/* Rendered into <body> so no section can ever paint over it */}
            {typeof document !== 'undefined' ? createPortal(header, document.body) : header}
        </>
    );
};

export default Navbar;