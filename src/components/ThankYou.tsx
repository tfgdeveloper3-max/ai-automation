import { useEffect, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import "./ThankYou.css";

interface ThankYouPopupProps {
    open: boolean;
    onClose: () => void;
    name?: string;
    lockScroll?: boolean;
}

const SUPPORT_EMAIL = 'support@amzautomationsolutions.com';
const font = "font-['Montserrat',sans-serif]";

const HEADER_BG: CSSProperties = {
    backgroundImage: [
        'radial-gradient(70% 90% at 50% 0%, rgba(138, 196, 75, 0.25) 0%, transparent 60%)',
        'radial-gradient(60% 80% at 0% 100%, rgba(80, 60, 190, 0.45) 0%, transparent 70%)',
        'linear-gradient(180deg, #221663 0%, #1b1150 100%)',
    ].join(', '),
};

const DOTS: CSSProperties = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.22) 1.2px, transparent 1.7px)',
    backgroundSize: '10px 10px',
    WebkitMaskImage: 'radial-gradient(ellipse at 100% 0%, #000 0%, transparent 65%)',
    maskImage: 'radial-gradient(ellipse at 100% 0%, #000 0%, transparent 65%)',
};

/* Confetti: fixed "random" values so every piece is different but stable */
const COLORS = ['#8ac44b', '#4f8cff', '#ffce00', '#ff6b8b', '#ffffff', '#b9a8ff'];
const CONFETTI = Array.from({ length: 34 }, (_, i) => {
    const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280;
    return {
        left: `${Math.round(r(1) * 100)}%`,
        color: COLORS[i % COLORS.length],
        w: 6 + Math.round(r(2) * 5),
        h: 8 + Math.round(r(3) * 8),
        round: i % 4 === 0,
        style: {
            '--ty-delay': `${(r(4) * 0.7).toFixed(2)}s`,
            '--ty-dur': `${(2.2 + r(5) * 1.4).toFixed(2)}s`,
            '--ty-drift': `${Math.round((r(6) - 0.5) * 140)}px`,
            '--ty-spin': `${Math.round(360 + r(7) * 540) * (i % 2 ? 1 : -1)}deg`,
        } as CSSProperties,
    };
});

const SPARKLES = [
    { top: '18%', left: '14%', size: 10, delay: '0s' },
    { top: '30%', left: '84%', size: 14, delay: '0.6s' },
    { top: '62%', left: '22%', size: 8, delay: '1.1s' },
    { top: '58%', left: '76%', size: 10, delay: '0.3s' },
];

const STEPS = [
    {
        title: 'Request received',
        text: 'Your details are safely with our team.',
        icon: (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        ),
    },
    {
        title: 'We review your store',
        text: 'A specialist looks at your platforms and goals.',
        icon: (
            <>
                <circle cx="11" cy="11" r="6.5" />
                <path d="m20 20-4.2-4.2" />
            </>
        ),
    },
    {
        title: 'You get a free plan',
        text: 'We reach out with your custom automation plan.',
        icon: (
            <>
                <path d="M4 7h16v12H4z" />
                <path d="m4 8 8 6 8-6" />
            </>
        ),
    },
];

const ThankYouPopup = ({ open, onClose, name, lockScroll = true }: ThankYouPopupProps) => {
    const doneRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        if (lockScroll) document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        const t = window.setTimeout(() => doneRef.current?.focus(), 50);
        return () => {
            if (lockScroll) document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
            window.clearTimeout(t);
        };
    }, [open, onClose, lockScroll]);

    if (!open) return null;

    const firstName = name?.trim().split(/\s+/)[0];

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <div aria-hidden="true" className="ty-backdrop absolute inset-0 bg-[#0e0531]/75 backdrop-blur-sm" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="thank-you-title"
                aria-describedby="thank-you-text"
                className="ty-card relative max-h-[92vh] w-full max-w-[480px] overflow-y-auto overflow-x-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(14,5,49,0.45)]"
            >
                {/* Confetti (falls once over the whole card) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                    {CONFETTI.map((c, i) => (
                        <span
                            key={i}
                            className={`ty-confetti absolute top-0 ${c.round ? 'rounded-full' : 'rounded-[2px]'}`}
                            style={{ left: c.left, width: c.w, height: c.round ? c.w : c.h, backgroundColor: c.color, ...c.style }}
                        />
                    ))}
                </div>

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                {/* ---------- Header with animated badge ---------- */}
                <div className="relative overflow-hidden px-6 pb-16 pt-10 text-center" style={HEADER_BG}>
                    <div aria-hidden="true" className="absolute inset-0" style={DOTS} />
                    {SPARKLES.map((s, i) => (
                        <svg
                            key={i}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="ty-sparkle absolute text-[#8ac44b]"
                            style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--ty-delay': s.delay } as CSSProperties}
                            fill="currentColor"
                        >
                            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                        </svg>
                    ))}

                    <div className="ty-badge relative mx-auto flex h-24 w-24 items-center justify-center">
                        <span aria-hidden="true" className="ty-ring absolute inset-0 rounded-full border-2 border-[#8ac44b]" />
                        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#8ac44b]/20" />
                        <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#8ac44b] shadow-[0_0_40px_rgba(138,196,75,0.6)]">
                            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path className="ty-check" pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                        </span>
                    </div>

                    {/* Wave into the white body (sits inside the header — no negative margin) */}
                    <svg aria-hidden="true" viewBox="0 0 480 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-8 w-full">
                        <path d="M0 40V18C80 0 160 0 240 16S400 34 480 14V40Z" fill="#ffffff" />
                    </svg>
                </div>

                {/* ---------- Body ---------- */}
                <div className="relative z-10 px-6 pb-8 text-center sm:px-9">
                    <h2
                        id="thank-you-title"
                        className="ty-fade font-['Anybody',sans-serif] text-[28px] font-light leading-tight text-[#111111] sm:text-[32px]"
                        style={{ '--ty-delay': '0.45s' } as CSSProperties}
                    >
                        <span className="font-bold">Thank You{firstName ? `, ${firstName}` : ''}!</span>
                    </h2>
                    <p
                        id="thank-you-text"
                        className={`ty-fade mx-auto mt-2 max-w-[340px] text-sm leading-relaxed text-[#6b6b7a] ${font}`}
                        style={{ '--ty-delay': '0.55s' } as CSSProperties}
                    >
                        Your request has been sent successfully. Our automation specialists will get back to you shortly.
                    </p>

                    {/* What happens next */}
                    <ol className="mt-6 space-y-3 text-left">
                        {STEPS.map((step, i) => (
                            <li
                                key={step.title}
                                className="ty-fade flex items-start gap-3 rounded-2xl border border-[#ececf2] bg-[#fafaff] p-3.5"
                                style={{ '--ty-delay': `${0.7 + i * 0.12}s` } as CSSProperties}
                            >
                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${i === 0 ? 'bg-[#8ac44b] text-white' : 'bg-[#1d1650] text-white'
                                        }`}
                                >
                                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        {step.icon}
                                    </svg>
                                </span>
                                <span>
                                    <span className={`block text-sm font-semibold text-[#1d1650] ${font}`}>{step.title}</span>
                                    <span className={`mt-0.5 block text-xs text-[#6b6b7a] ${font}`}>{step.text}</span>
                                </span>
                            </li>
                        ))}
                    </ol>

                    {/* Actions */}
                    <div
                        className="ty-fade mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
                        style={{ '--ty-delay': '1.1s' } as CSSProperties}
                    >
                        <button
                            ref={doneRef}
                            type="button"
                            onClick={onClose}
                            className={`inline-flex h-11 items-center justify-center rounded-full bg-[#8ac44b] px-9 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650] ${font}`}
                        >
                            Awesome, thanks!
                        </button>
                        <Link
                            to="/service"
                            onClick={onClose}
                            className={`inline-flex h-11 items-center justify-center rounded-full border border-[#1d1650]/15 px-7 text-sm font-semibold text-[#1d1650] transition hover:border-[#1d1650] ${font}`}
                        >
                            Explore Services
                        </Link>
                    </div>

                    <p className={`ty-fade mt-5 text-xs text-[#8d8d99] ${font}`} style={{ '--ty-delay': '1.2s' } as CSSProperties}>
                        Questions in the meantime?{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`} className="break-all font-semibold text-[#1d1650] hover:underline">
                            {SUPPORT_EMAIL}
                        </a>
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ThankYouPopup;