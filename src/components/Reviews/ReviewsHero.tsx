import type { CSSProperties } from 'react';
import Navbar from '../Navbar';
import Ribbon from '../Ribbon';
import { REVIEWS } from './ReviewsData';
import Stars from './Stars';


const BG: CSSProperties = {
    backgroundImage: [
        'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.04) 18%, transparent 30%, rgba(255,255,255,0.035) 48%, transparent 60%, rgba(255,255,255,0.03) 78%, transparent 92%)',
        'radial-gradient(60% 70% at 0% 0%, rgba(80, 60, 190, 0.35) 0%, transparent 70%)',
        'linear-gradient(180deg, #221663 0%, #1b1150 100%)',
    ].join(', '),
};

const dots = (mask: string): CSSProperties => ({
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.28) 1.3px, transparent 1.8px)',
    backgroundSize: '9px 9px',
    WebkitMaskImage: mask,
    maskImage: mask,
});

const reveal =
    'opacity-0 animate-[heroFadeUp_1.1s_cubic-bezier(0.19,1,0.22,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100';
const delay = (s: string): CSSProperties => ({ animationDelay: s });

const ReviewsHero = ({ onWriteReview }: { onWriteReview?: () => void }) => {
    const total = REVIEWS.length;
    const average = total ? REVIEWS.reduce((s, r) => s + r.rating, 0) / total : 0;
    const avg = Math.round(average * 10) / 10;

    return (
        <section className="relative isolate overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 bottom-12 z-0 overflow-hidden sm:bottom-16 lg:bottom-[72px]"
                style={BG}
            >
                <div
                    className="absolute left-0 top-0 h-[260px] w-[260px] sm:h-[360px] sm:w-[340px]"
                    style={dots('radial-gradient(ellipse at top left, #000 10%, transparent 70%)')}
                />
                <div
                    className="absolute right-0 top-[35%] hidden h-[260px] w-[300px] md:block"
                    style={dots('radial-gradient(ellipse at 100% 60%, #000 10%, transparent 70%)')}
                />
            </div>

            <div className="relative z-10">
                <Navbar />

                <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
                    <h1
                        className={`font-['Anybody',sans-serif] text-[44px] leading-[1.1] text-white sm:text-[56px] lg:text-[68px] ${reveal}`}
                        style={delay('0.1s')}
                    >
                        <span className="font-light">Customer</span> <span className="font-bold">Reviews</span>
                    </h1>

                    <p
                        className={`mt-4 max-w-[600px] font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/85 sm:text-[15px] ${reveal}`}
                        style={delay('0.3s')}
                    >
                        Real feedback from Amazon, Shopify and TikTok Shop sellers who automated their stores with us.
                    </p>

                    {/* Score badge */}
                    <div
                        className={`mt-7 flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 backdrop-blur-sm sm:flex-row sm:gap-5 ${reveal}`}
                        style={delay('0.45s')}
                    >
                        <span className="font-['Anybody',sans-serif] text-4xl font-bold text-white">{avg.toFixed(1)}</span>
                        <div className="flex flex-col items-center gap-1.5 sm:items-start">
                            <Stars value={average} size="md" label={`Average rating ${avg} out of 5`} />
                            <span className="font-['Montserrat',sans-serif] text-xs text-white/75">
                                Based on <strong className="font-semibold text-white">{total}</strong> reviews
                            </span>
                        </div>
                    </div>

                    <div className={`mt-6 flex items-center gap-2 ${reveal}`} style={delay('0.6s')}>
                        <button
                            type="button"
                            onClick={onWriteReview}
                            className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-9 font-['Montserrat',sans-serif] text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Write a Review
                        </button>
                        <a
                            href="#all-reviews"
                            aria-label="Jump to all reviews"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                                <path d="M7 6l5 5 5-5M7 13l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                <Ribbon />
            </div>
        </section>
    );
};

export default ReviewsHero;