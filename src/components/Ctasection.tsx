import React from 'react';
import { useSectionReveal } from './usesectionreveal';

const HEADING_FONT = 'var(--font-heading)';

const CtaBanner: React.FC = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });

    return (
        <section ref={ref} data-reveal="zoom" data-inview={inView} className="bg-white px-5 py-14">
            <div className="relative mx-auto max-w-[912px] overflow-hidden rounded-3xl bg-[#191041] px-6 py-14 text-center shadow-[0_18px_50px_rgba(47,33,105,0.28)]">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 45% 75% at 50% 0%, rgba(150,130,255,0.24), transparent 70%)',
                    }}
                />

                <div className="relative">
                    <h2
                        className="text-[26px] font-normal leading-tight text-white sm:text-[32px]"
                        style={{ fontFamily: HEADING_FONT }}
                    >
                        Ready To Scale Your E-Commerce Store On{' '}
                        <span className="font-bold">Autopilot?</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-[450px] text-[15px] leading-5 text-white/60">
                        Let&apos;s turn your store operations into an automated,
                        revenue-driving machine. Reach out today for a custom automation
                        assessment tailored to your business.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                        <a
                            href="#contact"
                            className="inline-flex h-[34px] items-center rounded-full bg-[#8AC44B] px-8 text-xs font-bold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8AC44B]"
                            style={{ fontFamily: HEADING_FONT }}
                        >
                            Start Your Project →
                        </a>

                        <a
                            href="#contact"
                            className="text-xs font-bold text-[#8AC44B] underline underline-offset-4 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8AC44B]"
                            style={{ fontFamily: HEADING_FONT }}
                        >
                            Book a Free Consultation
                        </a>
                    </div>

                    <p className="mt-7 text-[11px] text-white/50">
                        Or email us directly at:{' '}
                        <a href="mailto:hello@amzautomation.com" className="font-bold text-white hover:underline">
                            hello@amzautomation.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;