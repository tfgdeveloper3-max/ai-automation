import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { scoreColor } from './Stars';
import { SERVICES } from '../ServicesNav';


const LABELS = ['', 'Bad', 'Poor', 'Average', 'Great', 'Excellent'];
const STAR_PATH = 'M12 3.5l2.5 5.6 6.1.6-4.6 4.1 1.3 6-5.3-3.1-5.3 3.1 1.3-6-4.6-4.1 6.1-.6z';

interface Props {
    open: boolean;
    onClose: () => void;
}

const inputCls =
    "mt-1.5 block w-full rounded-lg border border-[#d4d4dc] bg-white px-3.5 py-2.5 font-['Montserrat',sans-serif] text-sm text-[#111111] outline-none transition placeholder:text-[#a0a0ac] focus:border-[#1d1650] focus:ring-2 focus:ring-[#1d1650]/10";
const labelCls = "block font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#1d1650]";

const WriteReviewModal = ({ open, onClose }: Props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const firstRef = useRef<HTMLButtonElement | null>(null);

    /* Lock scroll, close on Escape, focus the first star */
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        firstRef.current?.focus();
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    /* Reset the form after closing */
    useEffect(() => {
        if (open) return;
        const t = window.setTimeout(() => {
            setRating(0);
            setHover(0);
            setSent(false);
            setError('');
        }, 200);
        return () => window.clearTimeout(t);
    }, [open]);

    if (!open) return null;

    const shown = hover || rating;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!rating) {
            setError('Please choose a star rating.');
            return;
        }
        const data: Record<string, string> = { rating: String(rating) };
        new FormData(e.currentTarget).forEach((v, k) => {
            data[k] = String(v);
        });
        console.log('New review:', data); // TODO: send to your API / review provider
        setSent(true);
    };

    return createPortal(
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <div aria-hidden="true" className="absolute inset-0 bg-[#0e0531]/70 backdrop-blur-sm" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="write-review-title"
                className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6b6b7a] transition hover:bg-[#f2f2f6] hover:text-[#111111]"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                {sent ? (
                    <div className="py-6 text-center">
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8ac44b]/15 text-[#5f9a24]">
                            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                        </span>
                        <h2 id="write-review-title" className="mt-5 font-['Anybody',sans-serif] text-2xl font-bold text-[#1d1650]">
                            Thank you!
                        </h2>
                        <p className="mx-auto mt-2 max-w-[360px] font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#6b6b7a]">
                            Your review has been submitted. It will appear on this page once our team has verified it.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-9 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:brightness-110"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate={false}>
                        <h2 id="write-review-title" className="font-['Anybody',sans-serif] text-2xl font-bold text-[#1d1650] sm:text-[26px]">
                            Write a Review
                        </h2>
                        <p className="mt-1 font-['Montserrat',sans-serif] text-sm text-[#6b6b7a]">Tell other sellers about your experience.</p>

                        {/* Star picker */}
                        <fieldset className="mt-6">
                            <legend className={labelCls}>Your rating</legend>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            ref={n === 1 ? firstRef : undefined}
                                            type="button"
                                            onClick={() => {
                                                setRating(n);
                                                setError('');
                                            }}
                                            onMouseEnter={() => setHover(n)}
                                            aria-label={`${n} star${n > 1 ? 's' : ''} – ${LABELS[n]}`}
                                            aria-pressed={rating === n}
                                            className="h-10 w-10 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                                            style={{ backgroundColor: n <= shown ? scoreColor(shown) : '#dcdce6' }}
                                        >
                                            <svg viewBox="0 0 24 24" className="h-full w-full p-[14%]" fill="#fff" aria-hidden="true">
                                                <path d={STAR_PATH} />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <span className="font-['Montserrat',sans-serif] text-sm font-semibold text-[#1d1650]">{LABELS[shown]}</span>
                            </div>
                            {error && (
                                <p role="alert" className="mt-2 font-['Montserrat',sans-serif] text-xs text-[#d33]">
                                    {error}
                                </p>
                            )}
                        </fieldset>

                        <label className="mt-5 block">
                            <span className={labelCls}>Service used</span>
                            <select name="service" required className={inputCls} defaultValue="">
                                <option value="" disabled>
                                    Select a service
                                </option>
                                {SERVICES.map((s) => (
                                    <option key={s.to} value={s.label}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="mt-5 block">
                            <span className={labelCls}>Review title</span>
                            <input name="title" required maxLength={100} placeholder="Sum up your experience" className={inputCls} />
                        </label>

                        <label className="mt-5 block">
                            <span className={labelCls}>Your review</span>
                            <textarea
                                name="body"
                                required
                                minLength={30}
                                rows={4}
                                placeholder="What did you like? How did the automation help your store?"
                                className={`${inputCls} resize-y`}
                            />
                        </label>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className={labelCls}>Name</span>
                                <input name="name" required autoComplete="name" placeholder="Your name" className={inputCls} />
                            </label>
                            <label className="block">
                                <span className={labelCls}>Email</span>
                                <input name="email" type="email" required autoComplete="email" placeholder="Not shown publicly" className={inputCls} />
                            </label>
                        </div>

                        <label className="mt-5 flex items-start gap-2.5 font-['Montserrat',sans-serif] text-xs leading-relaxed text-[#6b6b7a]">
                            <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#8ac44b]" />
                            I confirm this review is based on my own genuine experience with {`AMZ Automation Solutions`}.
                        </label>

                        <button
                            type="submit"
                            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#8ac44b] font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                        >
                            Submit Review
                        </button>
                    </form>
                )}
            </div>
        </div>,
        document.body
    );
};

export default WriteReviewModal;