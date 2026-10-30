import { useState, type CSSProperties, type ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const BRAND = {
    name: 'AMZ Automation Solutions',
    logo: '/images/logo.png',
    about:
        'AMZ Automation is a premier digital agency specializing in intelligent, AI-driven e-commerce automation. We design, build, and manage scalable retail stores that maximize profitability across the globe\u2019s leading online marketplaces.',
};

const CONTACT = {
    phoneLabel: '(213) 883-9445',
    phoneHref: 'tel:+12138839445',
    email: 'support@amzautomationsolutions.com',
};

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#get-started' },
];

const SERVICE_LINKS = [
    { label: 'Shopify Automation', href: '/service/shopify-automation' },
    { label: 'Walmart Automation', href: '/service/walmart-automation' },
    { label: 'TikTok Shop Automation', href: '/service/tiktok-shop-automation' },
    { label: 'eBay Automation', href: '/service/ebay-automation' },
    { label: 'Etsy Automation', href: '/service/etsy-automation' },
];

const POLICY_LINKS = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
];

const SOCIALS = [
    { name: 'Facebook', href: '#', icon: '/images/social/facebook.svg' },
    { name: 'Instagram', href: '#', icon: '/images/social/instagram.svg' },
    { name: 'X', href: '#', icon: '/images/social/twitter.svg' },
    { name: 'Discord', href: '#', icon: '/images/social/discord.svg' },
];

const BADGES = [
    { name: 'Clutch', image: '/images/badges/clutch.png', href: '#' },
    { name: 'Trustpilot', image: '/images/badges/trustpilot.png', href: '#' },
    { name: 'Google Reviews', image: '/images/badges/google-reviews.png', href: '#' },
    { name: 'BBB', image: '/images/badges/bbb.png', href: '#' },
    { name: 'UpCity', image: '/images/badges/upcity.png', href: '#' },
    { name: 'G2', image: '/images/badges/g2.png', href: '#' },
];

const PAYMENTS = [
    { name: 'PayPal', image: '/images/payments/paypal.png' },
    { name: 'Payoneer', image: '/images/payments/payoneer.png' },
    { name: 'Skrill', image: '/images/payments/skrill.png' },
    { name: 'Visa', image: '/images/payments/Visa.png' },
    { name: 'Mastercard', image: '/images/payments/Mastercard.png' },
    { name: 'Amazon Pay', image: '/images/payments/Amazonpay.png' },
    { name: 'G Pay', image: '/images/payments/GPay.png' },
];

const ImageOr = ({ src, alt, className, fallbackClass }: { src: string; alt: string; className: string; fallbackClass: string }) => {
    const [failed, setFailed] = useState(false);
    if (failed) return <span className={fallbackClass}>{alt}</span>;
    return <img src={src} alt={alt} loading="lazy" draggable={false} onError={() => setFailed(true)} className={className} />;
};

const ArrowRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Icon = ({ d }: { d: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z',
    mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 1 8 6 8-6',
    shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3Zm-3 9 2 2 4-4',
};

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <li>
        <a
            href={href}
            className="group inline-flex items-center gap-2 font-['Montserrat',sans-serif] text-sm text-white/70 transition-colors duration-300 hover:text-[#8ac44b] focus-visible:text-[#8ac44b] focus-visible:outline-none"
        >
            <span className="h-px w-0 bg-[#8ac44b] transition-all duration-300 group-hover:w-3 group-focus-visible:w-3" />
            {children}
        </a>
    </li>
);

const Column = ({ title, children, className = '', style }: { title: string; children: ReactNode; className?: string; style?: CSSProperties }) => (
    <div className={className} style={style}>
        <h3 className="font-['Anybody',sans-serif] text-lg font-bold text-white">{title}</h3>
        <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-[#8ac44b]" />
        <ul className="mt-5 space-y-3">{children}</ul>
    </div>
);

const LpFooter = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.1 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`,
        style: { transitionDelay: `${i * 100}ms` } as CSSProperties,
    });

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer ref={ref} className="relative overflow-hidden bg-[#0b0428] px-5 pt-16 text-white sm:px-8 lg:px-10 lg:pt-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#8ac44b,transparent)]" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.07]">
                    <defs>
                        <pattern id="lp-footer-hex" width="56" height="48.5" patternUnits="userSpaceOnUse" patternTransform="scale(1.1)">
                            <path d="M14 0h28l14 24.25L42 48.5H14L0 24.25Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="lp-footer-fade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                        <mask id="lp-footer-mask">
                            <rect width="100%" height="100%" fill="url(#lp-footer-fade)" />
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lp-footer-hex)" mask="url(#lp-footer-mask)" />
                </svg>
                <span className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,33,105,0.9)_0%,transparent_70%)]" />
                <span className="absolute -right-32 top-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.12)_0%,transparent_70%)]" />
                <span
                    className="absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 whitespace-nowrap font-['Anybody',sans-serif] text-[22vw] font-black leading-none text-transparent opacity-[0.06] lg:text-[16vw]"
                    style={{ WebkitTextStroke: '2px #ffffff' }}
                >
                    AUTOMATE
                </span>
            </div>

            <div className="relative mx-auto w-full max-w-[1200px]">
                <div className={`grid grid-cols-1 gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-center ${reveal(0).className}`} style={reveal(0).style}>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                        <img src={BRAND.logo} alt={BRAND.name} draggable={false} className="h-16 w-auto shrink-0 self-start sm:h-20" />
                        <p className="max-w-[460px] font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/65">{BRAND.about}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        {BADGES.map((b) => (
                            <a
                                key={b.name}
                                href={b.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={b.name}
                                className="flex h-11 items-center rounded-lg border border-white/10 bg-white/[0.04] px-3 transition hover:-translate-y-0.5 hover:border-[#8ac44b]/60"
                            >
                                <ImageOr
                                    src={b.image}
                                    alt={b.name}
                                    className="max-h-6 w-auto"
                                    fallbackClass="font-['Montserrat',sans-serif] text-[11px] font-bold text-white"
                                />
                            </a>
                        ))}
                        <ul className="flex gap-2">
                            {SOCIALS.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.href}
                                        aria-label={s.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition duration-300 hover:-translate-y-1 hover:border-[#8ac44b] hover:bg-[#8ac44b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                    >
                                        <ImageOr
                                            src={s.icon}
                                            alt=""
                                            className="h-4 w-4 object-contain"
                                            fallbackClass="text-xs font-bold text-white"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
                    <Column title="Navigation" className={reveal(1).className} style={reveal(1).style}>
                        {NAV_LINKS.map((l) => (
                            <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
                        ))}
                    </Column>
                    <Column title="Services" className={reveal(2).className} style={reveal(2).style}>
                        {SERVICE_LINKS.map((l) => (
                            <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
                        ))}
                    </Column>
                    <Column title="Policies" className={reveal(3).className} style={reveal(3).style}>
                        {POLICY_LINKS.map((l) => (
                            <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
                        ))}
                    </Column>
                    <Column title="Contact Us" className={`col-span-2 md:col-span-1 ${reveal(4).className}`} style={reveal(4).style}>
                        <li>
                            <a href={CONTACT.phoneHref} className="group flex items-center gap-3 font-['Montserrat',sans-serif] text-sm text-white/70 transition hover:text-[#8ac44b]">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#8ac44b] transition group-hover:bg-[#8ac44b] group-hover:text-[#0e0531]">
                                    <Icon d={ICONS.phone} />
                                </span>
                                {CONTACT.phoneLabel}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 font-['Montserrat',sans-serif] text-sm text-white/70 transition hover:text-[#8ac44b]">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#8ac44b] transition group-hover:bg-[#8ac44b] group-hover:text-[#0e0531]">
                                    <Icon d={ICONS.mail} />
                                </span>
                                <span className="min-w-0 break-all">{CONTACT.email}</span>
                            </a>
                        </li>
                    </Column>
                </div>

                <div
                    className={`flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[linear-gradient(120deg,rgba(47,33,105,0.6),rgba(14,5,49,0.4))] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${reveal(5).className}`}
                    style={reveal(5).style}
                >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8ac44b] text-[#0e0531]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                            <path d={ICONS.shield} />
                        </svg>
                    </span>
                    <p className="font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/70">
                        <span className="font-semibold text-white">Client privacy notice. </span>
                        Your confidentiality and data security are our top priorities. All information shared with
                        AMZ Automation is encrypted, handled securely, and utilized strictly to deliver and enhance
                        our management services. By browsing this website, you consent to our{' '}
                        <a href="/privacy-policy" className="font-semibold text-[#8ac44b] underline-offset-4 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 py-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="font-['Montserrat',sans-serif] text-sm text-white/80">
                            &copy; 2026 {BRAND.name}. All rights reserved.
                        </p>
                        <p className="mt-2 max-w-[560px] font-['Montserrat',sans-serif] text-xs leading-relaxed text-white/45">
                            All content, trademarks, brand logos, and digital materials are legally protected and
                            cannot be reproduced without explicit written consent. External marketplace names and
                            logos remain the property of their respective owners.
                        </p>
                    </div>

                    <div>
                        <p className="mb-3 font-['Montserrat',sans-serif] text-xs font-semibold uppercase tracking-wider text-[#8ac44b]">
                            Accepted
                        </p>
                        <ul className="flex flex-wrap gap-2">
                            {PAYMENTS.map((p) => (
                                <li
                                    key={p.name}
                                    className="flex h-9 w-[64px] items-center justify-center rounded-lg bg-white px-2 shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1"
                                >
                                    <ImageOr
                                        src={p.image}
                                        alt={p.name}
                                        className="max-h-5 max-w-full object-contain"
                                        fallbackClass="font-['Montserrat',sans-serif] text-[10px] font-bold text-[#0e0531]"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={scrollTop}
                aria-label="Back to top"
                className="group absolute right-5 top-16 flex h-12 w-12 items-center justify-center rounded-full bg-[#8ac44b] text-[#0e0531] shadow-[0_10px_30px_rgba(138,196,75,0.35)] transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 lg:hidden"
            >
                <ArrowRight className="h-5 w-5 -rotate-90" />
            </button>
        </footer>
    );
};

export default LpFooter;