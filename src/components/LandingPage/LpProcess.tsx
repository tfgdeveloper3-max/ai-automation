import type { CSSProperties, ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type Step = {
    title: string;
    desc: string;
    icon: ReactNode;
};

const iconProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-6 w-6',
    'aria-hidden': true,
};

const STEPS: Step[] = [
    {
        title: 'Strategy',
        desc: 'Our seasoned experts formulate a custom blueprint tailored to align with your unique financial objectives.',
        icon: (
            <svg {...iconProps}>
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 12l7-7M16 5h3v3" />
            </svg>
        ),
    },
    {
        title: 'Discovery',
        desc: 'We analyze high-demand market gaps, profitable niches, and top-tier consumer trends to position your inventory for success.',
        icon: (
            <svg {...iconProps}>
                <circle cx="10.5" cy="10.5" r="6" />
                <path d="M15 15l5 5M8 10.5h5M10.5 8v5" />
            </svg>
        ),
    },
    {
        title: 'Refinement',
        desc: 'Your storefront assets undergo continuous fine-tuning to elevate buyer engagement, rank higher, and drive steady conversions.',
        icon: (
            <svg {...iconProps}>
                <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
                <circle cx="16" cy="6" r="2" />
                <circle cx="10" cy="12" r="2" />
                <circle cx="18" cy="18" r="2" />
            </svg>
        ),
    },
    {
        title: 'Expansion',
        desc: 'We scale your automated operations to generate predictable revenue streams and long-term digital growth.',
        icon: (
            <svg {...iconProps}>
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                <path d="M14 7l3-3 3 3M17 4v6" />
            </svg>
        ),
    },
];

const LpProcess = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`,
        style: { transitionDelay: `${i * 140}ms` } as CSSProperties,
    });

    return (
        <section
            ref={ref}
            id="process"
            className="relative overflow-hidden bg-[#f7f7fb] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.16)_0%,transparent_70%)] blur-2xl"
            />

            <div className="relative mx-auto w-full max-w-[1200px]">
                <header className={`mx-auto max-w-[620px] text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                        How It Works
                    </span>
                    <h2 className="mt-4 font-['Anybody',sans-serif] text-[36px] font-bold leading-[1.1] text-[#0e0531] sm:text-[48px] lg:text-[56px]">
                        Streamlined Workflow
                    </h2>
                    <p className="mt-4 font-['Montserrat',sans-serif] text-[17px] leading-relaxed text-[#6b6b7a] sm:text-[17px]">
                        A frictionless journey designed to take your online venture from setup
                        to automated expansion with AMZ Automation.
                    </p>
                </header>

                <ol className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
                    <span
                        aria-hidden="true"
                        className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-[#2f2169]/15 lg:block"
                    >
                        <span
                            className={`absolute inset-0 origin-left bg-[#8ac44b] transition-transform duration-[1600ms] ease-out delay-300 motion-reduce:transition-none ${inView ? 'scale-x-100' : 'scale-x-0'
                                }`}
                        />
                    </span>

                    {STEPS.map((step, i) => {
                        const r = reveal(i + 1);
                        return (
                            <li key={step.title} className={`group relative ${r.className}`} style={r.style}>
                                {/* Step number */}
                                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2f2169] bg-white font-['Anybody',sans-serif] text-lg font-bold text-[#2f2169] shadow-[0_8px_20px_rgba(15,5,49,0.10)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#8ac44b] group-hover:bg-[#8ac44b] group-hover:text-[#0e0531] group-hover:shadow-[0_0_0_8px_rgba(138,196,75,0.18)]">
                                    {String(i + 1).padStart(2, '0')}
                                </div>

                                {/* Card */}
                                <div className="relative mt-6 h-[calc(100%-5rem)] overflow-hidden rounded-[22px] border-2 border-[#2f2169] bg-white px-6 pb-8 pt-9 text-center shadow-[0_10px_30px_rgba(15,5,49,0.06)] transition-[transform,box-shadow,border-color] duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#2f2169] group-hover:shadow-[0_26px_55px_rgba(24,12,74,0.35)]">
                                    {/* Hover gradient fill */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-[linear-gradient(160deg,#2f2169_0%,#0e0531_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    {/* Hover corner glow */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.45)_0%,transparent_70%)] opacity-0 transition-all duration-700 group-hover:-right-8 group-hover:-top-8 group-hover:opacity-100"
                                    />

                                    <div className="relative">
                                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#8ac44b]/15 text-[#2f2169] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#8ac44b] group-hover:text-[#0e0531]">
                                            {step.icon}
                                        </span>

                                        <h3 className="mt-5 font-['Anybody',sans-serif] text-2xl font-bold text-[#0e0531] transition-colors duration-500 group-hover:text-white sm:text-[28px]">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 font-['Montserrat',sans-serif] text-[16px] leading-relaxed text-[#4a4a5a] transition-colors duration-500 group-hover:text-white/75">
                                            {step.desc}
                                        </p>

                                        <span
                                            aria-hidden="true"
                                            className="mx-auto mt-6 block h-1 w-10 rounded-full bg-[#8ac44b] transition-all duration-500 group-hover:w-24"
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};

export default LpProcess;