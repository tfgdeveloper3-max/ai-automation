import { useState, type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type Service = {
    platform: string;
    title: string;
    desc: string;
    points: string[];
    image: string;
    href: string;
};

/* Images aur links yahin se change karo */
const SERVICES: Service[] = [
    {
        platform: 'Walmart',
        title: 'Walmart Automation',
        desc: 'From expert strategy to product selection, we deliver the team and tools for a powerful Walmart automation setup.',
        points: ['Store setup & approval', 'Product sourcing', 'Daily order handling'],
        image: '/images/services/walmart.png',
        href: '/service/walmart-automation',
    },
    {
        platform: 'TikTok',
        title: 'TikTok Automation',
        desc: 'Proven products, tailored strategies, and an expert team to drive your TikTok Shop automation journey.',
        points: ['TikTok Shop launch', 'Trending product research', 'Creator & content support'],
        image: '/images/services/tiktok.png',
        href: '/service/tiktok-automation',
    },
    {
        platform: 'Amazon',
        title: 'Amazon Automation',
        desc: 'Winning products, smart strategy, and the right team to help you succeed with an Amazon Wholesale FBA setup.',
        points: ['Wholesale FBA setup', 'Brand & supplier approvals', 'Listing optimization'],
        image: '/images/services/amazon.png',
        href: '/service/amazon-automation',
    },
];

const ArrowUpRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Image load na ho to platform ka pehla letter dikhe */
const ServiceImage = ({ src, platform }: { src: string; platform: string }) => {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return (
            <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 font-['Anybody',sans-serif] text-5xl font-bold text-[#8ac44b]">
                {platform[0]}
            </span>
        );
    }
    return (
        <img
            src={src}
            alt={`${platform} automation`}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className="h-40 w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-3 group-hover:scale-105 sm:h-44"
        />
    );
};

const LpServices = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`,
        style: { transitionDelay: `${i * 150}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} id="services" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                {/* ---------- Heading ---------- */}
                <header className={`mx-auto max-w-[760px] text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                        Our Services
                    </span>
                    <h2 className="mt-4 font-['Anybody',sans-serif] text-[32px] font-bold leading-[1.1] text-[#0e0531] sm:text-[44px] lg:text-[52px]">
                        Services That Create E-Com Magic
                    </h2>
                    <p className="mt-4 font-['Montserrat',sans-serif] text-base font-semibold text-[#2f2169] sm:text-lg">
                        Chasing e-commerce success on Amazon, Walmart, or TikTok?
                    </p>
                    <p className="mt-2 font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#6b6b7a] sm:text-[15px]">
                        Tell us what you need, and our automation team is ready to build your brand.
                    </p>
                </header>

                {/* ---------- Cards ---------- */}
                <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
                    {SERVICES.map((s, i) => {
                        const r = reveal(i + 1);
                        return (
                            <li key={s.platform} className={`h-full ${r.className}`} style={r.style}>
                                <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-[#0e0531] p-2 shadow-[0_18px_45px_rgba(14,5,49,0.18)] ring-1 ring-[#2f2169] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(14,5,49,0.35)] hover:ring-2 hover:ring-[#8ac44b]">
                                    {/* Media stage */}
                                    <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(160deg,#2f2169_0%,#1a1150_100%)]">
                                        {/* dotted grid */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]"
                                        />
                                        {/* glow behind image */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.45)_0%,transparent_70%)] transition-all duration-500 group-hover:h-60 group-hover:w-60"
                                        />
                                        {/* platform tag */}
                                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-['Montserrat',sans-serif] text-[11px] font-semibold text-white backdrop-blur-sm">
                                            {s.platform}
                                        </span>

                                        <div className="relative">
                                            <ServiceImage src={s.image} platform={s.platform} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col px-5 pb-5 pt-6 sm:px-6">
                                        <h3 className="font-['Anybody',sans-serif] text-2xl font-bold text-white">{s.title}</h3>
                                        <p className="mt-3 font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/70">{s.desc}</p>

                                        <ul className="mt-5 space-y-2.5">
                                            {s.points.map((p) => (
                                                <li key={p} className="flex items-center gap-3 font-['Montserrat',sans-serif] text-[13px] text-white/85">
                                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8ac44b]/20 text-[#8ac44b]">
                                                        <Check />
                                                    </span>
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto pt-7">
                                            <a
                                                href={s.href}
                                                aria-label={`Read more about ${s.title}`}
                                                className="flex items-center justify-between rounded-full border border-white/15 py-1.5 pl-5 pr-1.5 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition-colors duration-300 hover:border-[#8ac44b] group-hover:border-[#8ac44b]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                            >
                                                Read more
                                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8ac44b] text-[#0e0531] transition-transform duration-300 group-hover:rotate-45">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default LpServices;