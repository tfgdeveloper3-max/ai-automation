import { Fragment, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import Navbar from '../Navbar';

/* ------------------------------------------------------------------
   Shared layout for Terms, Privacy and Refund pages.
   Each page only passes data, so content is easy to replace.
------------------------------------------------------------------- */

export type LegalBlock =
    | { type: 'p'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'details'; items: string[] }; // "Label: value" rows, e.g. contact info

export interface LegalSection {
    id: string; // used for the #anchor link, keep it unique per page
    heading: string;
    blocks: LegalBlock[];
}

export interface LegalPageProps {
    title: string;
    updated: string;
    intro: string;
    sections: LegalSection[];
}

/* Small helpers so the page files stay readable */
export const p = (text: string): LegalBlock => ({ type: 'p', text });
export const h3 = (text: string): LegalBlock => ({ type: 'h3', text });
export const ul = (items: string[]): LegalBlock => ({ type: 'ul', items });
export const ol = (items: string[]): LegalBlock => ({ type: 'ol', items });
export const details = (items: string[]): LegalBlock => ({ type: 'details', items });

const CONTACT = {
    phoneLabel: '(213) 863-9445',
    phoneHref: 'tel:+12138639445',
    email: 'support@amzautomationsolutions.com',
};

const LEGAL_LINKS = [
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
];

const HEADER_BG: CSSProperties = {
    backgroundImage: [
        'radial-gradient(55% 60% at 0% 45%, rgba(37, 99, 235, 0.35) 0%, transparent 70%)',
        'radial-gradient(55% 65% at 100% 0%, rgba(80, 64, 235, 0.55) 0%, transparent 70%)',
        'linear-gradient(90deg, #0a0a2e 0%, #0d0838 45%, #150c5c 100%)',
    ].join(', '),
};

const pad = (n: number) => String(n).padStart(2, '0');

/* Turns emails and https links inside text into real links */
const linkify = (text: string): ReactNode[] =>
    text.split(/(https?:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
        if (/^https?:\/\//.test(part)) {
            return (
                <a key={i} href={part} className="font-medium text-[#5f9a24] underline-offset-2 hover:underline">
                    {part.replace(/^https?:\/\//, '')}
                </a>
            );
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
            return (
                <a key={i} href={`mailto:${part}`} className="break-all font-medium text-[#5f9a24] underline-offset-2 hover:underline">
                    {part}
                </a>
            );
        }
        return <Fragment key={i}>{part}</Fragment>;
    });

const Block = ({ block }: { block: LegalBlock }) => {
    switch (block.type) {
        case 'p':
            return <p className="mt-4 text-[15px] leading-[1.85] text-[#55556a]">{linkify(block.text)}</p>;
        case 'h3':
            return <h3 className="mt-8 font-['Anybody',sans-serif] text-[17px] font-bold text-[#1f1650]">{block.text}</h3>;
        case 'ul':
            return (
                <ul className="mt-4 space-y-2.5">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[#55556a]">
                            <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8ac44b]" />
                            <span>{linkify(item)}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol className="mt-4 space-y-3">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[#55556a]">
                            <span className="mt-[0.15em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f1650]/[0.07] text-[11px] font-bold text-[#1f1650]">
                                {i + 1}
                            </span>
                            <span>{linkify(item)}</span>
                        </li>
                    ))}
                </ol>
            );
        case 'details':
            return (
                <dl className="mt-5 divide-y divide-[#ececf2] overflow-hidden rounded-xl border border-[#ececf2]">
                    {block.items.map((item, i) => {
                        const idx = item.indexOf(':');
                        const label = idx > -1 ? item.slice(0, idx) : '';
                        const value = idx > -1 ? item.slice(idx + 1).trim() : item;
                        return (
                            <div key={i} className="flex flex-col gap-1 bg-[#fafafd] px-4 py-3 text-[14px] sm:flex-row sm:gap-4">
                                <dt className="w-32 shrink-0 font-semibold text-[#1f1650]">{label}</dt>
                                <dd className="min-w-0 text-[#55556a]">{linkify(value)}</dd>
                            </div>
                        );
                    })}
                </dl>
            );
    }
};

const TocList = ({ sections, active, onPick }: { sections: LegalSection[]; active: string; onPick?: () => void }) => (
    <ol className="mt-3 space-y-0.5">
        {sections.map((s, i) => (
            <li key={s.id}>
                <a
                    href={`#${s.id}`}
                    onClick={onPick}
                    className={`flex gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors ${active === s.id
                            ? 'bg-white font-semibold text-[#1f1650] shadow-[0_2px_8px_rgba(31,22,80,0.08)]'
                            : 'text-[#6b6b7a] hover:bg-white/70 hover:text-[#1f1650]'
                        }`}
                >
                    <span className={`shrink-0 tabular-nums ${active === s.id ? 'text-[#5f9a24]' : 'text-[#a3a3b2]'}`}>{pad(i + 1)}</span>
                    <span>{s.heading}</span>
                </a>
            </li>
        ))}
    </ol>
);

const LegalPage = ({ title, updated, intro, sections }: LegalPageProps) => {
    const [active, setActive] = useState(sections[0]?.id ?? '');
    const [progress, setProgress] = useState(0);
    const [showTop, setShowTop] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    /* Rough reading time */
    const minutes = useMemo(() => {
        const words = sections
            .flatMap((s) => s.blocks)
            .map((b) => ('text' in b ? b.text : b.items.join(' ')))
            .join(' ')
            .split(/\s+/).length;
        return Math.max(1, Math.round(words / 220));
    }, [sections]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* Reading progress + back-to-top button */
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
                setShowTop(window.scrollY > 700);
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    /* Highlight the section currently on screen */
    useEffect(() => {
        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length) setActive(visible[0].target.id);
            },
            { rootMargin: '-25% 0px -65% 0px' },
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    return (
        <main className="bg-white font-['Montserrat',sans-serif]">
            {/* Reading progress bar */}
            <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
                <div className="h-full origin-left bg-[#8ac44b]" style={{ transform: `scaleX(${progress})` }} />
            </div>

            {/* ---------- Header ---------- */}
            <header className="relative isolate overflow-hidden" style={HEADER_BG}>
                <span aria-hidden="true" className="absolute -right-16 bottom-[-80px] -z-10 h-64 w-64 rounded-full bg-white/[0.06]" />
                <span aria-hidden="true" className="absolute right-40 bottom-[-60px] -z-10 h-40 w-40 rounded-full bg-[#8ac44b]/15 blur-2xl" />
                <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(180deg,#000,transparent)]"
                />

                <Navbar />

                <div className="mx-auto w-full max-w-[1200px] px-5 pb-14 pt-10 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-14">
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-6 py-1 text-[11px] font-medium text-white sm:text-xs">Legal</span>
                    <h1 className="mt-3 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[54px]">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[640px] border-l-[3px] border-[#8ac44b] pl-4 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                        {intro}
                    </p>

                    <ul className="mt-8 flex flex-wrap gap-2.5 text-xs text-white/85">
                        <li className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-[#8ac44b]" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                            </svg>
                            Last updated {updated}
                        </li>
                        <li className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5">
                            {sections.length} sections
                        </li>
                        <li className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5">
                            {minutes} min read
                        </li>
                    </ul>
                </div>
            </header>

            {/* ---------- Body ---------- */}
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[270px_1fr] lg:gap-16 lg:px-10 lg:py-20">
                {/* Sidebar */}
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    {/* Mobile / tablet: collapsible */}
                    <div className="rounded-2xl bg-[#f6f6fa] p-4 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setTocOpen((v) => !v)}
                            aria-expanded={tocOpen}
                            aria-controls="legal-toc-mobile"
                            className="flex w-full items-center justify-between text-sm font-semibold text-[#111111]"
                        >
                            On this page ({sections.length})
                            <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {tocOpen && (
                            <nav id="legal-toc-mobile" aria-label="On this page">
                                <TocList sections={sections} active={active} onPick={() => setTocOpen(false)} />
                            </nav>
                        )}
                    </div>

                    {/* Desktop */}
                    <nav aria-label="On this page" className="hidden rounded-2xl bg-[#f6f6fa] p-4 lg:block">
                        <p className="px-2.5 text-sm font-semibold text-[#111111]">On this page</p>
                        <div className="mt-1 max-h-[calc(100vh-340px)] overflow-y-auto pr-1">
                            <TocList sections={sections} active={active} />
                        </div>
                    </nav>

                    <nav aria-label="Other policies" className="mt-4 hidden rounded-2xl border border-[#ececf2] p-5 lg:block">
                        <p className="text-sm font-semibold text-[#111111]">Other policies</p>
                        <ul className="mt-3 space-y-2">
                            {LEGAL_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        aria-current={currentPath === l.href ? 'page' : undefined}
                                        className="text-[13px] text-[#6b6b7a] transition-colors hover:text-[#5f9a24] aria-[current=page]:font-medium aria-[current=page]:text-[#5f9a24]"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Content */}
                <article className="min-w-0 max-w-[780px]">
                    {sections.map((s, i) => (
                        <section
                            key={s.id}
                            id={s.id}
                            className={`scroll-mt-28 ${i > 0 ? 'mt-12 border-t border-[#ececf2] pt-12' : ''}`}
                        >
                            <div className="flex items-start gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f1650] font-['Anybody',sans-serif] text-sm font-bold text-[#8ac44b]">
                                    {pad(i + 1)}
                                </span>
                                <h2 className="pt-1 font-['Anybody',sans-serif] text-xl font-bold leading-snug text-[#111111] sm:text-2xl">
                                    {s.heading}
                                </h2>
                            </div>
                            <div className="sm:pl-14">
                                {s.blocks.map((b, j) => (
                                    <Block key={j} block={b} />
                                ))}
                            </div>
                        </section>
                    ))}

                    <div className="relative isolate mt-16 overflow-hidden rounded-2xl bg-[#1f1650] px-6 py-8 text-white sm:px-9">
                        <span aria-hidden="true" className="absolute -bottom-10 -right-6 -z-10 h-32 w-32 rounded-full bg-white/10" />
                        <span aria-hidden="true" className="absolute -top-12 right-24 -z-10 h-28 w-28 rounded-full bg-[#8ac44b]/20 blur-2xl" />
                        <h2 className="font-['Anybody',sans-serif] text-xl font-bold sm:text-2xl">Questions about this policy?</h2>
                        <p className="mt-2 text-sm text-white/75">Our team will get back to you within one business day.</p>
                        <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
                            <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-[#8ac44b]">
                                {CONTACT.email}
                            </a>
                            <a href={CONTACT.phoneHref} className="transition-colors hover:text-[#8ac44b]">
                                {CONTACT.phoneLabel}
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            {/* Back to top */}
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1650] text-[#8ac44b] shadow-[0_12px_30px_rgba(31,22,80,0.35)] transition-[opacity,transform] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b] ${showTop ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                    }`}
            >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </main>
    );
};

export default LegalPage;