import { useEffect, useState, type CSSProperties } from 'react';
import Navbar from '../Navbar';

/* ------------------------------------------------------------------
   Shared layout for Terms, Privacy and Refund pages.
   Each page only passes data, so content is easy to replace.
------------------------------------------------------------------- */

export interface LegalSection {
    id: string; // used for the #anchor link, keep it unique per page
    heading: string;
    paragraphs?: string[];
    list?: string[];
}

export interface LegalPageProps {
    title: string;
    updated: string;
    intro: string;
    sections: LegalSection[];
}

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

const LegalPage = ({ title, intro, sections }: LegalPageProps) => {
    const [active, setActive] = useState(sections[0]?.id ?? '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length) setActive(visible[0].target.id);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    return (
        <main className="bg-white font-['Montserrat',sans-serif]">
            {/* ---------- Header ---------- */}
            <header className="relative isolate overflow-hidden" style={HEADER_BG}>
                <span aria-hidden="true" className="absolute -right-16 bottom-[-80px] -z-10 h-64 w-64 rounded-full bg-white/[0.06]" />
                <span aria-hidden="true" className="absolute right-40 bottom-[-60px] -z-10 h-40 w-40 rounded-full bg-[#8ac44b]/15 blur-2xl" />

                <Navbar />

                <div className="mx-auto w-full max-w-[1200px] px-5 pb-14 pt-10 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-14">
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-6 py-1 text-[11px] font-medium text-white sm:text-xs">
                        Legal
                    </span>
                    <h1 className="mt-3 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[54px]">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[640px] border-l-[3px] border-[#8ac44b] pl-4 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                        {intro}
                    </p>
                </div>
            </header>

            {/* ---------- Body ---------- */}
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[250px_1fr] lg:gap-16 lg:px-10 lg:py-20">
                {/* Sidebar */}
                <aside className="lg:sticky lg:top-8 lg:self-start">
                    <nav aria-label="On this page" className="rounded-2xl bg-[#f6f6fa] p-5">
                        <p className="text-sm font-semibold text-[#111111]">On this page</p>
                        <ol className="mt-3 space-y-1">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className={`block border-l-2 py-1.5 pl-3 text-[13px] leading-snug transition-colors ${active === s.id
                                                ? 'border-[#8ac44b] font-medium text-[#1f1650]'
                                                : 'border-transparent text-[#6b6b7a] hover:text-[#1f1650]'
                                            }`}
                                    >
                                        {s.heading}
                                    </a>
                                </li>
                            ))}
                        </ol>
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
                <article className="max-w-[760px]">
                    {sections.map((s, i) => (
                        <section key={s.id} id={s.id} className={`scroll-mt-8 ${i > 0 ? 'mt-12' : ''}`}>
                            <h2 className="font-['Anybody',sans-serif] text-xl font-bold text-[#111111] sm:text-2xl">
                                {s.heading}
                            </h2>
                            {s.paragraphs?.map((p, j) => (
                                <p key={j} className="mt-4 text-[15px] leading-[1.8] text-[#55556a]">
                                    {p}
                                </p>
                            ))}
                            {s.list && (
                                <ul className="mt-4 space-y-2.5">
                                    {s.list.map((item, j) => (
                                        <li key={j} className="flex gap-3 text-[15px] leading-[1.7] text-[#55556a]">
                                            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8ac44b]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                    <div className="relative isolate mt-16 overflow-hidden rounded-2xl bg-[#1f1650] px-6 py-8 text-white sm:px-9">
                        <span aria-hidden="true" className="absolute -bottom-10 -right-6 -z-10 h-32 w-32 rounded-full bg-white/10" />
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
        </main>
    );
};

export default LegalPage;