import { type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type Feature = {
    title: string;
    desc: string;
    icon: ReactNode;
};

const GREEN = '#8ac44b';

/* Shared SVG props: white lines, green accents */
const svgProps = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-full w-full',
    'aria-hidden': true,
};

/* Item Research & Sourcing: box with a search lens */
const ResearchIcon = () => (
    <svg {...svgProps}>
        <path d="M6 16l14-7 14 7v16l-14 7-14-7V16Z" />
        <path d="M6 16l14 7 14-7M20 23v16" />
        <path d="M13 12.5l14 7" />
        <g stroke={GREEN}>
            <circle cx="35" cy="33" r="6.5" />
            <path d="m39.8 37.8 5 5" />
            <path d="M32.5 33h5M35 30.5v5" />
        </g>
    </svg>
);

/* Stock Control & Warehousing: warehouse with stacked boxes */
const WarehouseIcon = () => (
    <svg {...svgProps}>
        <path d="M4 18 24 7l20 11v24H4V18Z" />
        <path d="M10 42V24h28v18" />
        <g stroke={GREEN}>
            <rect x="14" y="33" width="9" height="9" />
            <rect x="25" y="33" width="9" height="9" />
            <rect x="19.5" y="24" width="9" height="9" />
            <path d="M18.5 33v3M29.5 33v3M24 24v3" />
        </g>
    </svg>
);

/* Buyer Support & Relations: headset with a chat bubble */
const SupportIcon = () => (
    <svg {...svgProps}>
        <path d="M8 26v-4a16 16 0 0 1 32 0v4" />
        <rect x="5" y="25" width="7" height="12" rx="3" />
        <rect x="36" y="25" width="7" height="12" rx="3" />
        <path d="M39.5 37v1a6 6 0 0 1-6 6H27" />
        <g stroke={GREEN}>
            <path d="M17 18h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3.5V29h-2a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
            <path d="M20 23.5h.01M24 23.5h.01M28 23.5h.01" strokeWidth="2.6" />
        </g>
    </svg>
);

/* Analytics, Tracking & Growth: bar chart with rising arrow */
const GrowthIcon = () => (
    <svg {...svgProps}>
        <path d="M4 43h40" />
        <rect x="8" y="30" width="7" height="13" rx="1.5" />
        <rect x="20.5" y="22" width="7" height="21" rx="1.5" />
        <rect x="33" y="14" width="7" height="29" rx="1.5" />
        <g stroke={GREEN}>
            <path d="M7 22 18 12l7 6L38 5" />
            <path d="M31 5h7v7" />
        </g>
    </svg>
);

/* Fulfillment & Logistics: delivery truck */
const TruckIcon = () => (
    <svg {...svgProps}>
        <path d="M3 11h26v24H3z" />
        <path d="M29 19h8l7 8v8H29" />
        <circle cx="12" cy="37" r="4" />
        <circle cx="36" cy="37" r="4" />
        <g stroke={GREEN}>
            <path d="M9 23l4 4 8-8" />
            <path d="M33 23v4h7" />
        </g>
    </svg>
);

/* Catalog Optimization: product listing with a sparkle */
const ListingIcon = () => (
    <svg {...svgProps}>
        <rect x="5" y="6" width="30" height="36" rx="3" />
        <rect x="10" y="11" width="20" height="13" rx="2" />
        <path d="M10 30h20M10 35h13" />
        <g stroke={GREEN}>
            <path d="m14 21 4-4 3 3 4-5 4 6" />
            <path d="M40 22v8M36 26h8" />
            <path d="M40 8v4M38 10h4" />
        </g>
    </svg>
);

/* Edit titles, lines and icons here. */
const FEATURES: Feature[] = [
    {
        title: 'Item Research & Sourcing',
        desc: 'Uncovering high-margin, trending commodities to position your store ahead of the market competition.',
        icon: <ResearchIcon />,
    },
    {
        title: 'Stock Control & Warehousing',
        desc: 'Maintaining optimal inventory levels to eliminate stockouts and ensure seamless supply chain flows.',
        icon: <WarehouseIcon />,
    },
    {
        title: 'Buyer Support & Relations',
        desc: 'Delivering 24/7 professional customer service to maintain high ratings and buyer satisfaction.',
        icon: <SupportIcon />,
    },
    {
        title: 'Analytics, Tracking & Growth',
        desc: 'Continuous performance monitoring and data-driven adjustments to scale your revenue streams safely.',
        icon: <GrowthIcon />,
    },
    {
        title: 'Fulfillment & Logistics',
        desc: 'End-to-end management of customer purchases from initial checkout to safe delivery.',
        icon: <TruckIcon />,
    },
    {
        title: 'Catalog Optimization',
        desc: 'Crafting keyword-rich, high-converting product listings designed to maximize visibility and clicks.',
        icon: <ListingIcon />,
    },
];

/* Icon tile */
const FeatureIcon = ({ children }: { children: ReactNode }) => (
    <span className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.07] text-white transition-[transform,background-color,border-color] duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#8ac44b]/40 group-hover:bg-[#8ac44b]/10 sm:h-28 sm:w-28">
        <span className="h-12 w-12 sm:h-14 sm:w-14">{children}</span>
    </span>
);

const LpFeatures = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'
            }`,
        style: { transitionDelay: `${i * 110}ms` } as CSSProperties,
    });

    /* Spotlight follows the cursor */
    const trackMouse = (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    return (
        <section
            ref={ref}
            id="features"
            className="relative overflow-hidden bg-[linear-gradient(180deg,#0e0531_0%,#1a1150_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        >
            {/* Background */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(75,58,160,0.55)_0%,transparent_70%)] blur-2xl" />
                <span className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.18)_0%,transparent_70%)] blur-2xl" />
                <span className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
            </div>

            <div className="relative mx-auto w-full max-w-[1200px]">
                {/* ---------- Heading ---------- */}
                <header className={`mx-auto max-w-[720px] text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                        Everything Included
                    </span>
                    <h2 className="mt-4 font-['Anybody',sans-serif] text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[52px]">
                        Unlock the Full Potential of Digital Retail
                    </h2>
                    <p className="mt-4 font-['Montserrat',sans-serif] text-base font-semibold text-[#8ac44b] sm:text-lg">
                        Ready to begin your journey toward e-commerce excellence?
                    </p>
                    <p className="mt-2 font-['Montserrat',sans-serif] text-[17px] leading-relaxed text-white/65 sm:text-[17px]">
                        You have arrived at the right destination. AMZ Automation manages every
                        detail so you can experience the absolute pinnacle of online selling.
                    </p>
                </header>

                {/* ---------- Grid ---------- */}
                <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {FEATURES.map((f, i) => {
                        const r = reveal(i + 1);
                        return (
                            <li key={f.title} className={r.className} style={r.style}>
                                <article
                                    onMouseMove={trackMouse}
                                    className="group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#1a1250] p-6 transform-gpu transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-[#8ac44b]/50 hover:shadow-[0_28px_60px_rgba(0,0,0,0.4)] sm:p-7"
                                >
                                    {/* Cursor spotlight */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_circle_at_var(--x,50%)_var(--y,50%),rgba(138,196,75,0.12),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    />
                                    {/* Top shine line */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-8 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#8ac44b] to-transparent transition-transform duration-700 group-hover:scale-x-100"
                                    />

                                    <div className="relative flex flex-1 flex-col">
                                        <div className="mb-6 flex justify-end">
                                            <FeatureIcon>{f.icon}</FeatureIcon>
                                        </div>

                                        <div className="mt-auto">
                                            <span
                                                aria-hidden="true"
                                                className="mb-4 block h-1 w-8 rounded-full bg-[#8ac44b] transition-all duration-500 group-hover:w-16"
                                            />
                                            <h3 className="font-['Anybody',sans-serif] text-xl font-bold leading-tight text-white sm:text-2xl">
                                                {f.title}
                                            </h3>

                                            <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                                                <p className="overflow-hidden font-['Montserrat',sans-serif] text-[17px] leading-relaxed text-white/70">
                                                    <span className="block pt-3">{f.desc}</span>
                                                </p>
                                            </div>
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

export default LpFeatures;