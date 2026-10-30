import { useEffect, useState, type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type ResultVideo = {
    title: string;
    client: string;
    result: string;
    poster: string;
    /* Use ONE of these: a YouTube video id, or a direct .mp4 path */
    youtubeId?: string;
    src?: string;
};

/* Apne videos yahan add karo */
const VIDEOS: ResultVideo[] = [
    {
        title: 'From zero to first sales in 3 weeks',
        client: 'Amazon Automation client',
        result: '$12.4k in month one',
        poster: '/images/results/result-1.jpg',
        src: '/videos/result-1.mp4',
    },
    {
        title: 'AI product research that found a winner',
        client: 'Walmart Automation client',
        result: '38% profit margin',
        poster: '/images/results/result-2.jpg',
        src: '/videos/result-2.mp4',
    },
    {
        title: 'A TikTok Shop on full autopilot',
        client: 'TikTok Shop client',
        result: '1,200+ orders handled',
        poster: '/images/results/result-3.jpg',
        src: '/videos/result-3.mp4',
    },
];

const HIGHLIGHTS = [
    { value: '< 4 weeks', label: 'From onboarding to first sale' },
    { value: 'AI-driven', label: 'Product research & pricing' },
    { value: '24/7', label: 'Automated order handling' },
];

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
            d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
);

/* ---------- Background: animated circuit / neural traces ---------- */
const TRACES = [
    'M0 160 H260 L320 220 H560 L600 180 H760',
    'M1440 120 H1180 L1120 180 H900 L860 140 H700',
    'M0 620 H200 L260 560 H420 L470 610 H640',
    'M1440 700 H1240 L1180 640 H1000 L950 690 H820',
    'M120 900 V760 L180 700 V520',
    'M1320 0 V180 L1260 240 V400',
];

const CircuitBackground = () => (
    <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
    >
        <defs>
            <radialGradient id="lp-res-node" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c3f07f" />
                <stop offset="100%" stopColor="#8ac44b" stopOpacity="0" />
            </radialGradient>
        </defs>

        {TRACES.map((d, i) => (
            <path
                key={d}
                id={`lp-res-trace-${i}`}
                d={d}
                fill="none"
                stroke={i % 2 ? 'rgba(124,104,230,0.35)' : 'rgba(138,196,75,0.28)'}
                strokeWidth="1.5"
            />
        ))}

        {/* Static nodes at trace ends */}
        {[
            [760, 180], [700, 140], [640, 610], [820, 690], [180, 520], [1260, 400],
            [320, 220], [1120, 180], [260, 560], [1180, 640],
        ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="10" fill="rgba(138,196,75,0.12)" />
                <circle cx={cx} cy={cy} r="3.5" fill="#8ac44b" />
            </g>
        ))}

        {/* Data pulses travelling along the traces */}
        <g className="motion-reduce:hidden">
            {TRACES.map((_, i) => (
                <circle key={i} r="5" fill="url(#lp-res-node)">
                    <animateMotion dur={`${5 + i * 1.3}s`} begin={`${i * 0.8}s`} repeatCount="indefinite">
                        <mpath href={`#lp-res-trace-${i}`} />
                    </animateMotion>
                </circle>
            ))}
        </g>
    </svg>
);

const LpResults = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const total = VIDEOS.length;
    const video = VIDEOS[index];

    const go = (dir: number) => {
        setPlaying(false);
        setIndex((i) => (i + dir + total) % total);
    };

    /* Keyboard arrows jab section focus me ho */
    useEffect(() => {
        if (!inView || playing) return;
        const onKey = (e: KeyboardEvent) => {
            if (!(e.target instanceof HTMLElement) || !ref.current?.contains(e.target)) return;
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, playing]);

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`,
        style: { transitionDelay: `${i * 150}ms` } as CSSProperties,
    });

    const arrowClass =
        'z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#8ac44b]/40 bg-[#0e0531]/70 text-[#8ac44b] backdrop-blur-sm transition hover:scale-110 hover:border-[#8ac44b] hover:bg-[#8ac44b] hover:text-[#0e0531] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]';

    return (
        <section
            ref={ref}
            id="results"
            aria-roledescription="carousel"
            aria-label="Client results videos"
            className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#2a1d6b_0%,#0e0531_55%,#07021c_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        >
            <CircuitBackground />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[55%] h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.16)_0%,transparent_65%)]"
            />

            <div className="relative mx-auto w-full max-w-[1200px]">
                {/* ---------- Heading ---------- */}
                <header className={`mx-auto max-w-[820px] text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#8ac44b]/40 bg-[#8ac44b]/10 px-4 py-1.5 font-['Montserrat',sans-serif] text-xs font-semibold text-[#c3f07f]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ac44b] opacity-75 motion-reduce:hidden" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8ac44b]" />
                        </span>
                        Powered by AI automation
                    </span>
                    <h2 className="mt-5 font-['Anybody',sans-serif] text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[54px]">
                        Real Client Results, Built on AI Automation
                    </h2>
                    <p className="mx-auto mt-4 max-w-[640px] font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/70 sm:text-base">
                        Most new clients are launched, active and making sales in under 4 weeks, while AI
                        handles the research, pricing and daily operations.
                    </p>
                </header>

                {/* ---------- Laptop carousel ---------- */}
                <div className={`mt-12 lg:mt-14 ${reveal(1).className}`} style={reveal(1).style}>
                    <div className="mx-auto flex max-w-[960px] items-center gap-4 lg:gap-8">
                        <button type="button" onClick={() => go(-1)} aria-label="Previous video" className={`${arrowClass} hidden md:flex`}>
                            <Chevron dir="left" />
                        </button>

                        {/* Laptop */}
                        <div className="relative min-w-0 flex-1">
                            {/* Screen */}
                            <div className="relative rounded-t-[18px] rounded-b-md border-[8px] border-b-[14px] border-[#1c1a26] bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_80px_rgba(0,0,0,0.55)] sm:border-[12px] sm:border-b-[18px]">
                                <span aria-hidden="true" className="absolute left-1/2 top-[-6px] z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#33313d] sm:top-[-8px]" />

                                <div
                                    className="relative aspect-video overflow-hidden rounded-[6px] bg-[linear-gradient(140deg,#2f2169_0%,#0e0531_100%)]"
                                    aria-live="polite"
                                >
                                    {playing ? (
                                        video.youtubeId ? (
                                            <iframe
                                                key={video.youtubeId}
                                                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                                                title={video.title}
                                                allow="autoplay; encrypted-media; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 h-full w-full"
                                            />
                                        ) : (
                                            <video
                                                key={video.src}
                                                src={video.src}
                                                poster={video.poster}
                                                controls
                                                autoPlay
                                                playsInline
                                                className="absolute inset-0 h-full w-full bg-black object-contain"
                                            />
                                        )
                                    ) : (
                                        <div key={index} className="absolute inset-0 animate-[heroFadeUp_0.6s_ease-out] motion-reduce:animate-none">
                                            <img
                                                src={video.poster}
                                                alt=""
                                                className="absolute inset-0 h-full w-full object-cover"
                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                            />
                                            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,5,49,0.15)_0%,rgba(14,5,49,0.85)_100%)]" />
                                            {/* scan line */}
                                            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px)]" />

                                            <span className="absolute left-3 top-3 rounded-full bg-[#0e0531]/70 px-3 py-1 font-['Montserrat',sans-serif] text-[10px] font-semibold text-white/80 backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
                                                Case study {index + 1} / {total}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setPlaying(true)}
                                                aria-label={`Play video: ${video.title}`}
                                                className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#8ac44b] text-[#0e0531] shadow-[0_0_0_10px_rgba(138,196,75,0.2),0_0_40px_rgba(138,196,75,0.5)] transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-20 sm:w-20"
                                            >
                                                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#8ac44b]/40 motion-reduce:hidden" />
                                                <PlayIcon />
                                            </button>

                                            <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-end justify-between gap-2 sm:inset-x-6 sm:bottom-5">
                                                <div className="min-w-0">
                                                    <p className="font-['Montserrat',sans-serif] text-[10px] text-white/60 sm:text-xs">{video.client}</p>
                                                    <p className="font-['Anybody',sans-serif] text-sm font-bold text-white sm:text-xl">{video.title}</p>
                                                </div>
                                                <span className="hidden rounded-full bg-[#8ac44b] px-3 py-1 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531] sm:inline-flex">
                                                    {video.result}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Base */}
                            <div aria-hidden="true" className="relative -mx-[7%] h-3 rounded-b-[14px] bg-[linear-gradient(180deg,#bfc0c8_0%,#7d7e88_100%)] shadow-[0_18px_30px_rgba(0,0,0,0.5)] sm:h-4">
                                <span className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#5d5e68]" />
                            </div>
                            {/* Glowing platform */}
                            <span aria-hidden="true" className="mx-auto mt-3 block h-6 w-[85%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(138,196,75,0.45)_0%,transparent_70%)] blur-md" />
                        </div>

                        <button type="button" onClick={() => go(1)} aria-label="Next video" className={`${arrowClass} hidden md:flex`}>
                            <Chevron dir="right" />
                        </button>
                    </div>

                    {/* Mobile arrows + dots */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button type="button" onClick={() => go(-1)} aria-label="Previous video" className={`${arrowClass} h-10 w-10 md:hidden`}>
                            <Chevron dir="left" />
                        </button>
                        <div className="flex items-center gap-2">
                            {VIDEOS.map((v, i) => (
                                <button
                                    key={v.title}
                                    type="button"
                                    onClick={() => {
                                        setPlaying(false);
                                        setIndex(i);
                                    }}
                                    aria-label={`Show video ${i + 1}`}
                                    aria-current={i === index}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#8ac44b]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                        <button type="button" onClick={() => go(1)} aria-label="Next video" className={`${arrowClass} h-10 w-10 md:hidden`}>
                            <Chevron dir="right" />
                        </button>
                    </div>
                </div>

                {/* ---------- AI highlights ---------- */}
                <ul className="mx-auto mt-12 grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-3">
                    {HIGHLIGHTS.map((h, i) => {
                        const r = reveal(i + 2);
                        return (
                            <li
                                key={h.label}
                                className={`rounded-2xl border border-white/10 bg-[#160e45] px-5 py-4 text-center transition-colors duration-300 hover:border-[#8ac44b]/50 ${r.className}`}
                                style={r.style}
                            >
                                <p className="font-['Anybody',sans-serif] text-2xl font-bold text-[#8ac44b]">{h.value}</p>
                                <p className="mt-1 font-['Montserrat',sans-serif] text-xs text-white/65">{h.label}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default LpResults;