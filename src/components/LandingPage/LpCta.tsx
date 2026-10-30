import { useCallback, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import { useSectionReveal } from '../usesectionreveal';
import { submitLead } from '../SubmitLead';
import ThankYouPopup from '../ThankYou';

const CONTACT = {
    phoneLabel: '(213) 863-9445',
    phoneHref: 'tel:+12138639445',
    email: 'support@amzautomationsolutions.com',
};

const NEXT_STEPS = [
    { title: 'Send your idea', desc: 'Share a few details about your goals.' },
    { title: 'Free strategy call', desc: 'An expert reviews your options with you.' },
    { title: 'Launch on autopilot', desc: 'We build and run your AI-powered store.' },
];

type LeadForm = { name: string; email: string; phone: string; message: string };
type Status = 'idle' | 'loading' | 'sent' | 'error';
const EMPTY_FORM: LeadForm = { name: '', email: '', phone: '', message: '' };

/* ---------- Floating-label field ---------- */
const FloatField = ({
    id,
    label,
    as = 'input',
    ...props
}: {
    id: string;
    label: string;
    as?: 'input' | 'textarea';
    name: string;
    value: string;
    type?: string;
    autoComplete?: string;
    pattern?: string;
    title?: string;
    required?: boolean;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => {
    const base =
        "peer block w-full rounded-2xl border border-[#2f2169]/15 bg-[#f6f5fb] px-4 pb-2.5 pt-6 font-['Montserrat',sans-serif] text-sm text-[#0e0531] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-[#2f2169]/35 focus:border-[#8ac44b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(138,196,75,0.18)] disabled:opacity-60";
    return (
        <div className="relative">
            {as === 'textarea' ? (
                <textarea id={id} placeholder=" " rows={4} className={`${base} min-h-[130px] resize-y`} {...props} />
            ) : (
                <input id={id} placeholder=" " className={base} {...props} />
            )}
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-4 top-2 font-['Montserrat',sans-serif] text-[11px] font-semibold text-[#2f2169] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#6b6b7a] peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#5f9a24]"
            >
                {label}
            </label>
        </div>
    );
};

const ArrowRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LpCta = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });
    const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
    const [status, setStatus] = useState<Status>('idle');
    const [thanksName, setThanksName] = useState('');
    const closeThanks = useCallback(() => setStatus('idle'), []);
    const isLoading = status === 'loading';

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        setStatus('loading');
        try {
            const name = form.name.trim();
            await submitLead({
                name,
                email: form.email.trim(),
                phone_number: form.phone.trim(),
                message: form.message.trim(),
            });
            setThanksName(name.split(/\s+/)[0] ?? '');
            setForm(EMPTY_FORM);
            setStatus('sent');
        } catch (err) {
            console.error('CTA form failed:', err);
            setStatus('error');
        }
    };

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    return (
        <section
            ref={ref}
            id="get-started"
            className="relative overflow-hidden bg-[#0e0531] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28"
        >
            {/* ---------- Background: rotating conic halo + rings ---------- */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute right-[-10%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(138,196,75,0.22)_60deg,transparent_140deg,rgba(75,58,160,0.55)_220deg,transparent_300deg)] blur-3xl animate-[spin_40s_linear_infinite] motion-reduce:animate-none" />
                {[360, 560, 760].map((s) => (
                    <span
                        key={s}
                        style={{ width: s, height: s }}
                        className="absolute right-[8%] top-1/2 -translate-y-1/2 translate-x-1/3 rounded-full border border-white/[0.06]"
                    />
                ))}
                <span className="absolute -left-40 bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,33,105,0.9)_0%,transparent_70%)]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                {/* ---------- Left: copy ---------- */}
                <div>
                    <div className={reveal(0, '-translate-x-8').className} style={reveal(0).style}>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                            Let&rsquo;s Dive In
                        </span>
                        <h2 className="mt-5 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.08] text-white sm:text-[46px] lg:text-[56px]">
                            Reach Out Now To Share Your Idea
                        </h2>
                        <p className="mt-5 max-w-[500px] font-['Montserrat',sans-serif] text-sm leading-[1.8] text-white/70 sm:text-[15px]">
                            You&rsquo;re one message away from a profitable, AI-powered e-commerce business with
                            strong returns and smooth integration into today&rsquo;s top marketplaces.
                        </p>
                    </div>

                    {/* What happens next */}
                    <ol className="relative mt-10 space-y-6 border-l border-dashed border-white/15 pl-8">
                        {NEXT_STEPS.map((s, i) => {
                            const r = reveal(i + 1, '-translate-x-8');
                            return (
                                <li key={s.title} className={`group relative ${r.className}`} style={r.style}>
                                    <span className="absolute -left-[46px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#8ac44b]/50 bg-[#0e0531] font-['Anybody',sans-serif] text-xs font-bold text-[#8ac44b] transition-colors duration-300 group-hover:bg-[#8ac44b] group-hover:text-[#0e0531]">
                                        {i + 1}
                                    </span>
                                    <p className="font-['Anybody',sans-serif] text-lg font-bold text-white">{s.title}</p>
                                    <p className="font-['Montserrat',sans-serif] text-sm text-white/60">{s.desc}</p>
                                </li>
                            );
                        })}
                    </ol>

                    <div
                        className={`mt-10 flex flex-wrap gap-x-8 gap-y-3 font-['Montserrat',sans-serif] text-sm ${reveal(4, '-translate-x-8').className}`}
                        style={reveal(4).style}
                    >
                        <a href={CONTACT.phoneHref} className="text-white/80 underline-offset-4 transition hover:text-[#8ac44b] hover:underline">
                            {CONTACT.phoneLabel}
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="break-all text-white/80 underline-offset-4 transition hover:text-[#8ac44b] hover:underline">
                            {CONTACT.email}
                        </a>
                    </div>
                </div>

                {/* ---------- Right: form card ---------- */}
                <div className={reveal(1, 'translate-y-12').className} style={reveal(1).style}>
                    <div className="relative">
                        {/* offset accent block behind the card */}
                        <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[30px] bg-[#8ac44b]" />

                        <div className="relative rounded-[30px] bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:p-9">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-['Anybody',sans-serif] text-2xl font-bold text-[#0e0531] sm:text-[28px]">
                                        Tell us about your idea
                                    </h3>
                                    <p className="mt-1 font-['Montserrat',sans-serif] text-sm text-[#6b6b7a]">
                                        We usually reply within one business day.
                                    </p>
                                </div>
                                <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#8ac44b]/15 px-3 py-1 font-['Montserrat',sans-serif] text-[11px] font-semibold text-[#4f7a20] sm:inline-flex">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8ac44b]" /> Free consultation
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                                <FloatField
                                    id="cta-name"
                                    label="Your name"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FloatField
                                        id="cta-email"
                                        label="Your email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                    <FloatField
                                        id="cta-phone"
                                        label="Contact number"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        pattern="[\d\s\+\-\(\)]{7,20}"
                                        title="Please enter a valid phone number"
                                        required
                                        value={form.phone}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <FloatField
                                    id="cta-message"
                                    label="Message"
                                    as="textarea"
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative mt-2 flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-[#0e0531] pl-7 pr-2 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b] disabled:cursor-wait disabled:opacity-80"
                                >
                                    {/* green fill sweeps in on hover */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 origin-left scale-x-0 bg-[#8ac44b] transition-transform duration-500 ease-out group-hover:scale-x-100 group-disabled:scale-x-0 motion-reduce:transition-none"
                                    />
                                    <span className="relative transition-colors duration-500 group-hover:text-[#0e0531] group-disabled:text-white">
                                        {isLoading ? 'Sending…' : 'Submit your idea'}
                                    </span>
                                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#8ac44b] text-[#0e0531] transition-all duration-500 group-hover:bg-[#0e0531] group-hover:text-[#8ac44b]">
                                        {isLoading ? (
                                            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : (
                                            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                                        )}
                                    </span>
                                </button>

                                <p role="status" aria-live="polite" className="min-h-5 text-center font-['Montserrat',sans-serif] text-sm text-[#b42318]">
                                    {status === 'error' &&
                                        `Sorry, your message could not be sent. Please try again or email ${CONTACT.email}.`}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ThankYouPopup open={status === 'sent'} name={thanksName} onClose={closeThanks} />
        </section>
    );
};

export default LpCta;