import type { CSSProperties } from 'react';
import Ribbon from '../Ribbon';
import Navbar from '../Navbar';
import { useLeadModal } from '../leadModalContext';

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

const AVATARS = ['/images/Oliver-Smith.png', '/images/Priya-Nair.png', '/images/Sana-Malik.png', '/images/Sarah-Jenkins.png'];

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AfiliateHero = () => {
    const { openLeadForm } = useLeadModal();
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
                        <span className="font-bold">Affiliate</span>{' '}
                        <span className="font-light">Program</span>
                    </h1>

                    <p
                        className={`mt-4 max-w-[580px] font-['Montserrat',sans-serif] text-[16px] leading-relaxed text-white/85 sm:text-[16px] ${reveal}`}
                        style={delay('0.3s')}
                    >
                        Partner with AMZ Automation and earn recurring commissions by
                        introducing e-commerce store owners to our AI-powered Amazon,
                        Shopify, and TikTok automation solutions.
                    </p>

                    <div className={`mt-6 flex items-center gap-2 ${reveal}`} style={delay('0.45s')}>
                        <button
                            type='button'
                            onClick={openLeadForm}
                            className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-9 font-['Montserrat',sans-serif] text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get Started
                        </button>
                        <button
                            type='button'
                            onClick={openLeadForm}
                            aria-label="Get started"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            <ChevronsRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className={`mt-6 flex items-center gap-4 ${reveal}`} style={delay('0.6s')}>
                        <div className="grid grid-cols-[repeat(3,30px)_44px] sm:grid-cols-[repeat(3,34px)_48px]">
                            {AVATARS.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt=""
                                    style={{ zIndex: i + 1 }}
                                    className="relative h-11 w-11 rounded-full border-2 border-white bg-gradient-to-br from-slate-300 to-slate-500 object-cover sm:h-12 sm:w-12"
                                />
                            ))}
                        </div>
                        <span className="font-['Montserrat',sans-serif] text-sm font-medium text-white sm:text-[15px]">
                            4.9/5 Rating
                        </span>
                    </div>
                </div>

                <Ribbon />
            </div>
        </section>
    );
};

export default AfiliateHero;