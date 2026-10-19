import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import ThankYouPopup from './ThankYou';
import { submitLead } from './SubmitLead';


interface LeadFormModalProps {
    open: boolean;
    onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

const font = "font-['Montserrat',sans-serif]";
const labelCls = `block ${font} text-[13px] font-semibold text-[#1d1650]`;
const inputCls = `mt-1.5 block w-full rounded-lg border border-[#d4d4dc] bg-white px-3.5 py-2.5 ${font} text-sm text-[#111111] outline-none transition placeholder:text-[#a0a0ac] focus:border-[#1d1650] focus:ring-2 focus:ring-[#1d1650]/10 disabled:opacity-60`;

const Spinner = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const LeadFormModal = ({ open, onClose }: LeadFormModalProps) => {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');
    const [sentName, setSentName] = useState('');
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    const openerRef = useRef<HTMLElement | null>(null);
    const sending = status === 'sending';
    const sendingRef = useRef(false);
    sendingRef.current = sending;

    /* Lock scroll, Escape to close, focus first field, return focus to the button that opened it */
    useEffect(() => {
        if (!open) return;
        openerRef.current = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !sendingRef.current) onClose();
        };
        window.addEventListener('keydown', onKey);
        const t = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
            window.clearTimeout(t);
            openerRef.current?.focus?.();
        };
    }, [open, onClose]);

    /* Reset after closing */
    useEffect(() => {
        if (open) return;
        const t = window.setTimeout(() => {
            setStatus('idle');
            setError('');
            setSentName('');
        }, 200);
        return () => window.clearTimeout(t);
    }, [open]);

    if (!open) return null;

    if (status === 'sent') {
        return <ThankYouPopup open name={sentName} onClose={onClose} lockScroll={false} />;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        setStatus('sending');
        setError('');
        try {
            await submitLead({
                name: String(fd.get('name') ?? ''),
                email: String(fd.get('email') ?? ''),
                phone_number: String(fd.get('phone_number') ?? ''),
                message: String(fd.get('message') ?? ''),
            });
            setSentName(String(fd.get('name') ?? ''));
            form.reset();
            setStatus('sent');
        } catch (err) {
            console.error('Lead submit failed:', err);
            setError(
                'Something went wrong while sending your request. Please try again, or email us at support@amzautomationsolutions.com.',
            );
            setStatus('error');
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
            <div aria-hidden="true" className="absolute inset-0 bg-[#0e0531]/70 backdrop-blur-sm" onClick={() => !sending && onClose()} />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="lead-modal-title"
                className="relative max-h-[92vh] w-full max-w-[540px] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    disabled={sending}
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6b6b7a] transition hover:bg-[#f2f2f6] hover:text-[#111111] disabled:opacity-40"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <form onSubmit={handleSubmit}>
                    <span className={`inline-flex rounded-full bg-[#8ac44b] px-5 py-1 text-[11px] font-medium text-white ${font}`}>
                        Get Started
                    </span>
                    <h2
                        id="lead-modal-title"
                        className="mt-3 font-['Anybody',sans-serif] text-2xl font-light leading-tight text-[#111111] sm:text-[28px]"
                    >
                        Let&rsquo;s <span className="font-bold">Automate</span> Your Store
                    </h2>
                    <p className={`mt-2 text-sm text-[#6b6b7a] ${font}`}>
                        Tell us a little about your business and we&rsquo;ll prepare a free automation plan for you.
                    </p>

                    <fieldset disabled={sending} className="mt-6 space-y-5">
                        <label className="block">
                            <span className={labelCls}>Full Name</span>
                            <input
                                ref={firstFieldRef}
                                name="name"
                                required
                                autoComplete="name"
                                placeholder="John Doe"
                                className={inputCls}
                            />
                        </label>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className={labelCls}>Email</span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className={inputCls}
                                />
                            </label>
                            <label className="block">
                                <span className={labelCls}>Phone Number</span>
                                <input
                                    name="phone_number"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    inputMode="tel"
                                    pattern="[\d\s\+\-\(\)]{7,20}"
                                    title="Please enter a valid phone number"
                                    placeholder="(213) 555-0123"
                                    className={inputCls}
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className={labelCls}>Message</span>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                placeholder="Which platforms do you sell on, and what would you like to automate?"
                                className={`${inputCls} resize-y`}
                            />
                        </label>
                    </fieldset>

                    {status === 'error' && (
                        <p role="alert" className={`mt-4 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-sm text-[#b42318] ${font}`}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={sending}
                        className={`mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8ac44b] text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650] ${font}`}
                    >
                        {sending ? (
                            <>
                                <Spinner /> Sending…
                            </>
                        ) : (
                            'Submit Now'
                        )}
                    </button>
                </form>
            </div>
        </div>,
        document.body,
    );
};

export default LeadFormModal;