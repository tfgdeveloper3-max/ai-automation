import type { CSSProperties } from 'react';
import Navbar from './Navbar';
import Ribbon from './Ribbon';

/* Background: deep navy with blue / violet glows (left + right), like the screenshot */
const HERO_BG: CSSProperties = {
    backgroundImage: [
        'radial-gradient(55% 60% at 0% 45%, rgba(37, 99, 235, 0.35) 0%, transparent 70%)',
        'radial-gradient(55% 65% at 100% 0%, rgba(80, 64, 235, 0.55) 0%, transparent 70%)',
        'radial-gradient(45% 55% at 100% 75%, rgba(60, 46, 205, 0.45) 0%, transparent 70%)',
        'linear-gradient(90deg, #0a0a2e 0%, #0d0838 45%, #150c5c 100%)',
    ].join(', '),
};

/* Page-load reveal (keyframes live in hero.css) */
const reveal =
    'opacity-0 animate-[heroFadeUp_1.1s_cubic-bezier(0.19,1,0.22,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100';
const delay = (s: string): CSSProperties => ({ animationDelay: s });

const AVATARS = ['/images/avatar-1.png', '/images/avatar-2.png', '/images/avatar-3.png', '/images/avatar-4.png'];

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => {
    return (
        <section className="relative isolate overflow-hidden font-['DM_Sans',sans-serif]">
            {/* Dark background stops at the middle of the ribbon, so the ribbons
                cross the edge without any negative margin */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 bottom-12 z-0 sm:bottom-16 lg:bottom-[72px]"
                style={HERO_BG}
            />

            <div className="relative z-10">
                <Navbar />

                <div className="mx-auto w-full max-w-[1280px] px-5 pb-4 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pt-10 xl:pt-14">
                    <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-0">
                        {/* ---------- Left: copy ---------- */}
                        <div className="relative z-10 text-center md:text-left lg:col-start-1 lg:col-end-7 lg:row-start-1">
                            <p
                                className={`text-base font-normal text-white/90 sm:text-lg xl:text-xl ${reveal}`}
                                style={delay('0.1s')}
                            >
                                Automate Your Success
                            </p>

                            <h1
                                className={`mt-2 text-[34px] font-medium leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl lg:text-[50px] xl:text-[58px] ${reveal}`}
                                style={delay('0.25s')}
                            >
                                <span className="text-[0.72em] font-normal">With</span> Amazon,
                                <br />
                                Shopify, <span className="text-[0.72em] font-normal">&amp;</span> Tiktok
                            </h1>

                            <p
                                className={`mx-auto mt-3 max-w-[420px] text-sm leading-relaxed text-white/80 sm:text-[15px] md:mx-0 ${reveal}`}
                                style={delay('0.45s')}
                            >
                                Lorem Ipsum is simply dummy text of the printing and industry&rsquo;s standard dummy Bride
                                Printing Library in London,
                            </p>

                            <div
                                className={`mt-6 flex items-center justify-center gap-3 md:justify-start ${reveal}`}
                                style={delay('0.6s')}
                            >
                                <a
                                    href="#get-started"
                                    className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-8 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(138,196,75,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="#get-started"
                                    aria-label="Get started"
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <ChevronsRight className="h-5 w-5" />
                                </a>
                            </div>

                            {/* Trustpilot + reviews */}
                            <div className={`mt-8 sm:mt-10 ${reveal}`} style={delay('0.75s')}>
                                <div className="flex items-center justify-center gap-1.5 md:justify-start">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#22c55e]" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.5 5.8 21.2l1.6-7L2 9.5l7.1-.6z" />
                                    </svg>
                                    <span className="text-lg font-semibold text-white">Trustipilot</span>
                                </div>

                                <div className="mt-3 flex items-center justify-center gap-4 md:justify-start">
                                    {/* Overlap via narrow grid columns (no negative margins) */}
                                    <div className="grid grid-cols-[repeat(3,26px)_38px] sm:grid-cols-[repeat(3,30px)_42px]">
                                        {AVATARS.map((src, i) => (
                                            <img
                                                key={src}
                                                src={src}
                                                alt=""
                                                style={{ zIndex: i + 1 }}
                                                className="relative h-[38px] w-[38px] rounded-full border-2 border-white bg-gradient-to-br from-slate-300 to-slate-500 object-cover sm:h-[42px] sm:w-[42px]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-white sm:text-[15px]">450+ Reviews</span>
                                </div>
                            </div>
                        </div>

                        {/* ---------- Right: illustration ---------- */}
                        <div
                            className={`relative lg:col-start-3 lg:col-end-13 lg:row-start-1 lg:self-end ${reveal}`}
                            style={delay('0.4s')}
                        >
                            <img
                                src="/images/hero-banner.png"
                                alt="AI assistant answering order, refund and return questions across Shopify, Amazon and TikTok"
                                className="mx-auto block h-auto w-full max-w-[720px] select-none lg:max-w-none"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>

                <Ribbon />
            </div>
        </section>
    );
};

export default Hero;