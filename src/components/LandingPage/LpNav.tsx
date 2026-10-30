import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const CONTACT = {
    phoneLabel: '(213) 863-9445',
    phoneHref: 'tel:+12138639445',
    email: 'support@amzautomationsolutions.com',
};

const PhoneIcon = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
);

const MailIcon = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LpNavbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const header = (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled
                    ? 'bg-[#160f4a]/90 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md'
                    : 'bg-transparent'
                }`}
        >
            <nav
                className={`mx-auto flex w-full max-w-[1280px] items-center gap-3 px-5 transition-[height] duration-300 sm:px-8 lg:px-10 ${scrolled ? 'h-16 sm:h-[72px] lg:h-20' : 'h-20 sm:h-24 lg:h-[104px] xl:h-28'
                    }`}
            >
                <img
                    src="/images/logo.png"
                    alt="AMZ Automation Solutions"
                    draggable={false}
                    className={`w-auto shrink-0 transition-[height] duration-300 ${scrolled ? 'h-12 sm:h-16 lg:h-[72px]' : 'h-14 sm:h-20 lg:h-[88px] xl:h-24'
                        }`}
                />

                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <a
                        href={CONTACT.phoneHref}
                        aria-label={`Call ${CONTACT.phoneLabel}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8ac44b] px-3 text-sm font-semibold text-[#0e0531] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:px-5"
                    >
                        <PhoneIcon className="h-4 w-4 shrink-0" />
                        <span className="hidden sm:inline">{CONTACT.phoneLabel}</span>
                    </a>

                    <a
                        href={`mailto:${CONTACT.email}`}
                        aria-label={`Email ${CONTACT.email}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 text-sm font-medium text-white backdrop-blur-sm transition hover:border-[#8ac44b] hover:text-[#8ac44b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:px-5"
                    >
                        <MailIcon className="h-4 w-4 shrink-0" />
                        <span className="hidden lg:inline">{CONTACT.email}</span>
                    </a>
                </div>
            </nav>
        </header>
    );

    return typeof document !== 'undefined' ? createPortal(header, document.body) : header;
};

export default LpNavbar;