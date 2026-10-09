import React from 'react';
import { useSectionReveal } from './usesectionreveal';

const GREEN = '#8AC44B';

type IconProps = React.SVGProps<SVGSVGElement>;

/* ---------------- Icons ---------------- */

const Icon4K = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <rect x="2" y="4" width="28" height="24" rx="3" stroke="#fff" strokeWidth="2" />
        <text x="16" y="18.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">
            4K
        </text>
        <rect x="5" y="21" width="22" height="4.2" rx="0.6" fill="#fff" />
        <text x="16" y="24.3" textAnchor="middle" fontSize="3.4" fontWeight="700" fill={GREEN} fontFamily="Arial, Helvetica, sans-serif">
            ULTRA HD
        </text>
    </svg>
);

const IconDevices = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <rect x="3" y="5" width="22" height="15" rx="2" stroke="#fff" strokeWidth="2" />
        <path d="M10 26h8M14 20v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <rect x="19.5" y="14.5" width="9.5" height="13" rx="2" fill={GREEN} stroke="#fff" strokeWidth="2" />
    </svg>
);

const IconLoopPlay = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <path d="M16 16c3-6 11-6 11 0s-8 6-11 0c-3-6-11-6-11 0s8 6 11 0z" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M8.6 13.4v5.2L13 16z" fill="#fff" />
    </svg>
);

const IconDollarDown = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <circle cx="15" cy="15" r="11" stroke="#fff" strokeWidth="2" />
        <text x="15" y="20.5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">
            $
        </text>
        <path d="M24 19v8m-4-4 4 4 4-4" stroke={GREEN} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 19v8m-4-4 4 4 4-4" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ---------------- Data ---------------- */

type Frame = 'none' | 'top-right' | 'bottom-left';

interface Step {
    title: string;
    text: string;
    Icon: React.FC<IconProps>;
    frame: Frame;
}

const TEXT = 'Lorem Ipsum is simply dummy text of the Bride Printing Library in London,';

const STEPS: Step[] = [
    { title: 'Place Your Heading Here', text: TEXT, Icon: Icon4K, frame: 'none' },
    { title: 'Place Your Heading Here', text: TEXT, Icon: IconDevices, frame: 'top-right' },
    { title: 'Place Your Heading Here', text: TEXT, Icon: IconLoopPlay, frame: 'bottom-left' },
    { title: 'Place Your Heading Here', text: TEXT, Icon: IconDollarDown, frame: 'none' },
];

/* Thin rounded frames that fade out: top-right card fades upward, bottom-left card fades downward */
const FRAME_MASK: Record<Exclude<Frame, 'none'>, string> = {
    'top-right': 'linear-gradient(to top, #000 45%, transparent 100%)',
    'bottom-left': 'linear-gradient(to bottom, #000 45%, transparent 100%)',
};

/* ---------------- Background ---------------- */

const SECTION_BG: React.CSSProperties = {
    backgroundImage: [
        'radial-gradient(60% 70% at 100% 0%, rgba(70, 40, 200, 0.55) 0%, transparent 70%)',
        'radial-gradient(50% 60% at 100% 100%, rgba(50, 30, 170, 0.35) 0%, transparent 70%)',
        'linear-gradient(180deg, #140a45 0%, #120a3c 100%)',
    ].join(', '),
};

const STRIPES: React.CSSProperties = {
    background:
        'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.035) 16%, transparent 30%, rgba(255,255,255,0.025) 52%, transparent 68%, rgba(255,255,255,0.02) 84%, transparent 100%)',
};

const DOTS: React.CSSProperties = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1.3px, transparent 1.8px)',
    backgroundSize: '10px 10px',
    WebkitMaskImage: 'radial-gradient(ellipse at top left, #000 0%, transparent 70%)',
    maskImage: 'radial-gradient(ellipse at top left, #000 0%, transparent 70%)',
};

/* ---------------- Section ---------------- */

const HowItWorks: React.FC = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`,
        style: { transitionDelay: `${i * 120}ms` } as React.CSSProperties,
    });

    return (
        <section
            ref={ref}
            className="relative isolate overflow-hidden px-5 py-16 text-white sm:px-8 sm:py-20 lg:py-24"
            style={SECTION_BG}
        >
            {/* ---------- Decorations ---------- */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0" style={STRIPES} />
                <div className="absolute left-0 top-0 h-[260px] w-[320px] sm:h-[340px] sm:w-[460px]" style={DOTS} />

                {/* Rocket, top-right */}
                <img
                    src="/images/Right-top.png"
                    alt=""
                    className="absolute right-4 top-4 w-12 sm:right-10 sm:top-8 sm:w-16 lg:right-14 lg:w-24"
                />

                {/* Robot, bottom-left (only where there is room beside the grid) */}
                <img
                    src="/images/Left.png"
                    alt=""
                    className="absolute bottom-6 left-4 hidden w-[130px] xl:block 2xl:left-8 2xl:w-[170px]"
                />
            </div>

            <div className="relative z-10">
                {/* ---------- Header ---------- */}
                <div className={`mx-auto flex max-w-[620px] flex-col items-center text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex h-6 w-44 items-center justify-center rounded-full bg-[#8AC44B] font-['Montserrat',sans-serif] text-xs font-medium text-white">
                        Process
                    </span>

                    <h2 className="mt-3 font-['DM_Sans',sans-serif] text-[34px] font-normal leading-tight sm:text-5xl lg:text-[52px]">
                        How It <span className="font-semibold">Works</span>
                    </h2>

                    <p className="mt-3 font-['Montserrat',sans-serif] text-[13px] leading-5 text-white/80">
                        Lorem Ipsum is simply dummy text of the printing and industry&apos;s standard dummy Bride Printing
                        Library in London,
                    </p>
                </div>

                {/* ---------- 2 x 2 grid ---------- */}
                <div className="mx-auto mt-8 grid max-w-[960px] grid-cols-1 gap-y-4 sm:mt-6 sm:grid-cols-2 sm:gap-0">
                    {STEPS.map(({ title, text, Icon, frame }, i) => {
                        const r = reveal(i + 1);
                        return (
                            <div
                                key={i}
                                className={`relative flex flex-col items-center px-6 py-10 text-center sm:px-8 lg:py-12 ${r.className}`}
                                style={r.style}
                            >
                                {frame !== 'none' && (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 hidden rounded-2xl border border-white/25 sm:block"
                                        style={{ WebkitMaskImage: FRAME_MASK[frame], maskImage: FRAME_MASK[frame] }}
                                    />
                                )}

                                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-[#8AC44B] shadow-[0_0_28px_rgba(138,196,75,0.45)]">
                                    <Icon className="h-11 w-11" />
                                </div>

                                <h3 className="mt-6 font-['Anybody',sans-serif] text-lg font-bold leading-6 tracking-wide lg:text-xl">
                                    {title}
                                </h3>

                                <p className="mt-4 max-w-[320px] font-['Montserrat',sans-serif] text-sm font-light leading-[21px] text-white/80 lg:text-[15px]">
                                    {text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;