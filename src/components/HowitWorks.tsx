import React from 'react';
import { useSectionReveal } from './usesectionreveal';

const GREEN = '#8AC44B';
const HEADING_FONT = 'var(--font-heading)';

type IconProps = React.SVGProps<SVGSVGElement>;

const Icon4K = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <rect x="2" y="4" width="28" height="24" rx="3" stroke="#fff" strokeWidth="2" />
        <text
            x="16"
            y="18.5"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#fff"
            fontFamily="Arial, Helvetica, sans-serif"
        >
            4K
        </text>
        <rect x="5" y="21" width="22" height="4.2" rx="0.6" fill="#fff" />
        <text
            x="16"
            y="24.3"
            textAnchor="middle"
            fontSize="3.4"
            fontWeight="700"
            fill={GREEN}
            fontFamily="Arial, Helvetica, sans-serif"
        >
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
        <path
            d="M16 16c3-6 11-6 11 0s-8 6-11 0c-3-6-11-6-11 0s8 6 11 0z"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinejoin="round"
        />
        <path d="M8.6 13.4v5.2L13 16z" fill="#fff" />
    </svg>
);

const IconDollarDown = (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
        <circle cx="15" cy="15" r="11" stroke="#fff" strokeWidth="2" />
        <text
            x="15"
            y="20.5"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill="#fff"
            fontFamily="Arial, Helvetica, sans-serif"
        >
            $
        </text>
        <path
            d="M24 19v8m-4-4 4 4 4-4"
            stroke={GREEN}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M24 19v8m-4-4 4 4 4-4"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

type Frame = 'none' | 'top-right' | 'bottom-left';

interface Step {
    title: string;
    text: string;
    Icon: React.FC<IconProps>;
    frame: Frame;
}

const STEPS: Step[] = [
    {
        title: 'Place Your Heading Here',
        text: 'Lorem Ipsum is simply dummy text of the Bride Printing Library in London,',
        Icon: Icon4K,
        frame: 'none',
    },
    {
        title: 'Place Your Heading Here',
        text: 'Lorem Ipsum is simply dummy text of the Bride Printing Library in London,',
        Icon: IconDevices,
        frame: 'top-right',
    },
    {
        title: 'Place Your Heading Here',
        text: 'Lorem Ipsum is simply dummy text of the Bride Printing Library in London,',
        Icon: IconLoopPlay,
        frame: 'bottom-left',
    },
    {
        title: 'Place Your Heading Here',
        text: 'Lorem Ipsum is simply dummy text of the Bride Printing Library in London,',
        Icon: IconDollarDown,
        frame: 'none',
    },
];

const FRAME_MASK: Record<Exclude<Frame, 'none'>, string> = {
    'top-right': 'linear-gradient(to top, #000 55%, transparent)',
    'bottom-left': 'linear-gradient(to bottom, #000 55%, transparent)',
};

const dotStyle = (mask: string): React.CSSProperties => ({
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.3px, transparent 1.8px)',
    backgroundSize: '10px 10px',
    WebkitMaskImage: mask,
    maskImage: mask,
});

const HowItWorks: React.FC = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    return (
        <section
            ref={ref}
            data-reveal="zoom"
            data-inview={inView}
            className="relative overflow-hidden bg-[#191041] px-5 pb-20 pt-20 text-white"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.035) 16%, transparent 30%, rgba(255,255,255,0.025) 52%, transparent 68%, rgba(255,255,255,0.02) 84%, transparent 100%)',
                    }}
                />

                <div
                    className="absolute left-0 top-0 h-[380px] w-[520px]"
                    style={dotStyle('radial-gradient(ellipse at top left, #000 0%, transparent 70%)')}
                />

                <div
                    className="absolute bottom-24 right-0 h-[330px] w-[300px]"
                    style={dotStyle('radial-gradient(ellipse at 100% 50%, #000 0%, transparent 70%)')}
                />

                <img
                    src="/images/left-bottom.png"
                    alt=""
                    className="absolute bottom-8 left-0 hidden w-[158px] -scale-x-100 sm:block"
                />

                <img
                    src="/images/Right-top.png"
                    alt=""
                    className="absolute right-4 top-4 w-14 sm:right-12 sm:top-8 sm:w-34"
                />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
                    <span className="inline-flex h-6 w-44 items-center justify-center rounded-full bg-[#8AC44B] text-xs font-medium text-white">
                        Process
                    </span>

                    <h2
                        className="mt-3 text-4xl font-normal leading-tight sm:text-5xl"
                        style={{ fontFamily: HEADING_FONT }}
                    >
                        How It <span className="font-bold">Works</span>
                    </h2>

                    <p className="mt-4 text-[13px] leading-5 text-white/80">
                        Lorem Ipsum is simply dummy text of the printing and industry&apos;s standard dummy Bride
                        Printing Library in London,
                    </p>
                </div>

                {/* 2 x 2 grid */}
                <div className="mx-auto mt-6 grid max-w-[960px] grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-1">
                    {STEPS.map(({ title, text, Icon, frame }, i) => (
                        <div key={i} className="relative flex flex-col items-center px-8 py-10 text-center">
                            {frame !== 'none' && (
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 hidden rounded-2xl border border-white/25 sm:block"
                                    style={{
                                        WebkitMaskImage: FRAME_MASK[frame],
                                        maskImage: FRAME_MASK[frame],
                                    }}
                                />
                            )}

                            {/* Icon tile */}
                            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-[#8AC44B] shadow-[0_0_28px_rgba(138,196,75,0.45)]">
                                <Icon className="h-11 w-11" />
                            </div>

                            <h3
                                className="mt-6 text-xl font-bold leading-6 tracking-wide"
                                style={{ fontFamily: HEADING_FONT }}
                            >
                                {title}
                            </h3>

                            <p className="mt-4 max-w-[320px] text-[15px] font-light leading-[21px] text-white/80">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;