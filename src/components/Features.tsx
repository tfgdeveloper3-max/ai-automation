import type { CSSProperties, JSX } from 'react';
import { useSectionReveal } from './usesectionreveal';

interface FeatureCard {
    title: string;
    description: string;
    icon: JSX.Element;
    highlight?: boolean;
}

/* ---------------- Icons (outline = currentColor, accent = green) ---------------- */

const GREEN = '#8ac44b';

const RobotIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="24" cy="3.8" r="1.6" />
        <path d="M24 5.5V8" />
        <rect x="12" y="8" width="24" height="16" rx="4" />
        <circle cx="19" cy="15" r="2.8" />
        <circle cx="29" cy="15" r="2.8" />
        <circle cx="19" cy="15" r="0.9" fill={GREEN} stroke={GREEN} />
        <circle cx="29" cy="15" r="0.9" fill={GREEN} stroke={GREEN} />
        <path d="M20 20.5h8" />
        <path d="M9 13v6M39 13v6M9 16h3M36 16h3" />
        <rect x="15" y="27" width="18" height="13" rx="3" />
        <path d="M20 31.5h8M20 35.5h8" />
        <path d="M15 31h-4v6M33 31h4v6" />
        <path d="M19.5 40v4M28.5 40v4" />
    </svg>
);

const ChipIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="3" y="6" width="42" height="36" rx="3" />
        <path d="M3 13h42" />
        <circle cx="8" cy="9.5" r="0.8" fill="currentColor" />
        <circle cx="11.5" cy="9.5" r="0.8" fill="currentColor" />
        <circle cx="15" cy="9.5" r="0.8" fill="currentColor" />
        <g stroke={GREEN}>
            <rect x="19" y="20" width="10" height="10" rx="1.5" />
            <rect x="22" y="23" width="4" height="4" rx="0.5" />
            <path d="M22 20v-3M26 20v-3M22 30v3M26 30v3" />
            <path d="M19 23h-5l-2-2M19 27h-5l-2 2M29 23h5l2-2M29 27h5l2 2" />
            <circle cx="10.8" cy="19.8" r="1.2" />
            <circle cx="10.8" cy="30.2" r="1.2" />
            <circle cx="37.2" cy="19.8" r="1.2" />
            <circle cx="37.2" cy="30.2" r="1.2" />
        </g>
    </svg>
);

const BrainGearIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        {/* brain (left half) */}
        <path d="M24 8C21 5 16 6 15 9c-4 0-6 4-5 7-3 2-3 7-1 9-2 3-1 8 3 9 1 4 6 6 9 4 1 2 3 2 3 2V8Z" />
        <path d="M15 9c0 3 2 4 4 4M10 16c2 1 4 1 5 0M9 25c3 0 5-1 6-3M12 34c1-2 3-3 5-3" />
        <g stroke={GREEN}>
            <path d="M17.5 21H24M19.5 27H24" />
            <circle cx="16" cy="21" r="1.3" />
            <circle cx="18" cy="27" r="1.3" />
        </g>
        {/* gear (right half) */}
        <path d="M24 14a10 10 0 0 1 0 20" />
        <path d="M24 20a4 4 0 0 1 0 8" />
        <path
            d="M27.1 14.5l.9-2.9M32.1 18.1l2.4-1.8M34 24h3M32.1 29.9l2.4 1.8M27.1 33.5l.9 2.9"
            strokeWidth="3.4"
            strokeLinecap="butt"
        />
    </svg>
);

/* ---------------- Data ---------------- */

const LOREM =
    'Lorem Ipsum is simply dummy text of the printing and industry\u2019s standard dummy Bride Printing Library in London,';

const CARDS: FeatureCard[] = [
    { title: 'Place Your Heading', description: LOREM, icon: <RobotIcon /> },
    { title: 'Place Your Heading', description: LOREM, icon: <ChipIcon />, highlight: true },
    { title: 'Place Your Heading', description: LOREM, icon: <BrainGearIcon /> },
    { title: 'Place Your Heading', description: LOREM, icon: <BrainGearIcon /> },
];

/* Staircase on laptop/desktop: each card sits higher than the one before (positive margins only) */
const STEP_OFFSETS = ['lg:mt-[150px]', 'lg:mt-[86px]', 'lg:mt-[36px]', 'lg:mt-0'];

/* Halftone dots fading in from the bottom-right corner (dark card) */
const HALFTONE: CSSProperties = {
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1.3px)',
    backgroundSize: '6px 6px',
    WebkitMaskImage: 'radial-gradient(120% 90% at 100% 100%, #000 0%, transparent 65%)',
    maskImage: 'radial-gradient(120% 90% at 100% 100%, #000 0%, transparent 65%)',
};

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ---------------- Section ---------------- */

const Features = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                {/* ---------- Intro ---------- */}
                <div
                    className={`flex flex-col gap-6 md:flex-row md:items-start md:justify-between ${reveal(0).className}`}
                    style={reveal(0).style}
                >
                    <div>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-8 py-1.5 font-['Montserrat',sans-serif] text-xs font-medium text-white sm:text-[13px]">
                            What We Can Do
                        </span>
                        <h2 className="mt-3 font-['DM_Sans',sans-serif] text-[32px] font-normal leading-[1.2] text-[#111111] sm:text-[40px] lg:text-[48px]">
                            <span className="font-semibold">Lorem Ipsum</span> Is
                            <br />
                            Simply Dummy Text
                        </h2>
                    </div>

                    <p className="max-w-[380px] border-l-[3px] border-[#8ac44b] pl-4 font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#6b6b7a] sm:text-[15px] md:mt-9">
                        {LOREM}
                    </p>
                </div>

                {/* ---------- Cards ---------- */}
                <div className="mt-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 xl:gap-7">
                    {CARDS.map((card, i) => {
                        const r = reveal(i + 1);
                        const hl = !!card.highlight;

                        return (
                            <div key={i} className={`${STEP_OFFSETS[i]} ${r.className}`} style={r.style}>
                                <article
                                    className={`group relative isolate h-full overflow-hidden border px-8 pb-9 pt-9 transition-all duration-500 ${hl
                                            ? 'rounded-md border-transparent bg-[#1d1650] shadow-[0_20px_40px_rgba(29,22,80,0.25)]'
                                            : 'rounded-xl border-gray-100 bg-white shadow-[0_6px_10px_-2px_rgba(15,10,50,0.16)] hover:border-transparent hover:bg-[#1d1650] hover:shadow-[0_20px_40px_rgba(29,22,80,0.25)]'
                                        }`}
                                >
                                    <div
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${hl ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                            }`}
                                        style={HALFTONE}
                                    />

                                    <div className="relative z-10">
                                        <div
                                            className={`h-14 w-14 transition-colors duration-500 ${hl ? 'text-[#4f8cff]' : 'text-[#2b2b3a] group-hover:text-[#4f8cff]'
                                                }`}
                                        >
                                            {card.icon}
                                        </div>

                                        <h3
                                            className={`mt-6 font-['Anybody',sans-serif] text-base font-bold transition-colors duration-500 ${hl ? 'text-white' : 'text-[#1d1650] group-hover:text-white'
                                                }`}
                                        >
                                            {card.title}
                                        </h3>

                                        <p
                                            className={`mt-3 font-['Montserrat',sans-serif] text-[13px] leading-[1.65] transition-colors duration-500 ${hl ? 'text-white/70' : 'text-[#7b7b8a] group-hover:text-white/70'
                                                }`}
                                        >
                                            {card.description}
                                        </p>

                                        <a
                                            href="#"
                                            className="mt-5 inline-flex items-center gap-1.5 font-['Montserrat',sans-serif] text-[13px] font-medium text-[#8ac44b] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                        >
                                            Read More
                                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M9 6l6 6-6 6" />
                                            </svg>
                                        </a>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>

                {/* ---------- View All ---------- */}
                <div className={`mt-12 flex items-center justify-center gap-2 lg:mt-14 ${reveal(5).className}`} style={reveal(5).style}>
                    <a
                        href="#"
                        className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-9 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                    >
                        View All
                    </a>
                    <a
                        href="#"
                        aria-label="View all"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110"
                    >
                        <ChevronsRight className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Features;