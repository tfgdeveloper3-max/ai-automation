import { useCallback, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSectionReveal } from './usesectionreveal';
import { submitLead } from './SubmitLead';
import ThankYouPopup from './ThankYou';

const SERVICES = [
    'Amazon Automation',
    'Shopify & TikTok',
    'Customer Support AI',
    'Order Fulfillment',
    'Something else',
];

const CARD_BG: CSSProperties = {
    backgroundImage: [
        'radial-gradient(40% 80% at 0% 0%, rgba(37, 99, 235, 0.35) 0%, transparent 70%)',
        'radial-gradient(45% 90% at 100% 100%, rgba(80, 64, 235, 0.55) 0%, transparent 70%)',
        'radial-gradient(30% 70% at 70% 0%, rgba(138, 196, 75, 0.18) 0%, transparent 70%)',
        'linear-gradient(90deg, #0a0a2e 0%, #0d0838 45%, #150c5c 100%)',
    ].join(', '),
};

const labelCls =
    "mb-2 block font-['Montserrat',sans-serif] text-xs font-medium text-white/65 transition-colors group-focus-within:text-[#8ac44b]";

const glassCls =
    "block h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] pl-10 pr-4 font-['Montserrat',sans-serif] text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_24px_rgba(5,3,30,0.25)] outline-none backdrop-blur-md transition placeholder:text-white/40 hover:border-white/25 hover:bg-white/[0.10] focus:border-[#8ac44b]/80 focus:bg-white/[0.12] focus:ring-4 focus:ring-[#8ac44b]/15";

const Icon = ({ children }: { children: ReactNode }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45 transition-colors group-focus-within:text-[#8ac44b]"
    >
        {children}
    </svg>
);

const GlassField = ({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) => (
    <label className="group block">
        <span className={labelCls}>{label}</span>
        <span className="relative block">
            <Icon>{icon}</Icon>
            {children}
        </span>
    </label>
);

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const QuickLeadSection = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [thanksName, setThanksName] = useState('');
    const sending = status === 'sending';
    const closeThanks = useCallback(() => setStatus('idle'), []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const get = (k: string) => String(fd.get(k) ?? '').trim();
        const name = get('name');

        setStatus('sending');
        try {
            await submitLead({
                name,
                email: get('email'),
                phone_number: get('phone'),
                message: `Service: ${get('service')}\nSource: Quick audit form (homepage)`,
            });
            setThanksName(name.split(' ')[0] ?? '');
            form.reset();
            setStatus('sent');
        } catch (err) {
            console.error('Quick lead form failed:', err);
            setStatus('error');
        }
    };

    return (
        <section ref={ref} id="quick-audit" className="bg-white px-5 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
            <div
                style={CARD_BG}
                className={`relative isolate mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl px-6 py-8 shadow-[0_20px_60px_rgba(20,12,60,0.22)] ring-1 ring-white/10 transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:px-9 lg:px-10 lg:py-10 xl:grid-cols-[240px_1fr] xl:gap-10 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
                {/* soft shapes behind the glass so the blur has something to catch */}
                <span aria-hidden="true" className="absolute -right-12 -top-16 -z-10 h-44 w-44 rounded-full bg-[#8ac44b]/20 blur-2xl" />
                <span aria-hidden="true" className="absolute -bottom-20 left-1/3 -z-10 h-40 w-40 rounded-full bg-[#5040eb]/40 blur-2xl" />
                <span aria-hidden="true" className="absolute -right-6 bottom-6 -z-10 h-28 w-28 rounded-full border border-white/10" />

                <div className="border-l-[3px] border-[#8ac44b] pl-4">
                    <h2 className="font-['Anybody',sans-serif] text-2xl font-bold leading-tight text-white sm:text-[28px]">
                        Free automation audit
                    </h2>
                    <p className="mt-1.5 font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/70">
                        Tell us where you sell. We&rsquo;ll show you what can run on autopilot.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end"
                >
                    <fieldset disabled={sending} className="contents">
                        <GlassField
                            label="Full name"
                            icon={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>}
                        >
                            <input name="name" autoComplete="name" placeholder="John Doe" required className={glassCls} />
                        </GlassField>

                        <GlassField
                            label="Email"
                            icon={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}
                        >
                            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={glassCls} />
                        </GlassField>

                        <GlassField
                            label="Phone"
                            icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />}
                        >
                            <input
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="(213) 555-0123"
                                pattern="[\d\s\+\-\(\)]{7,20}"
                                title="Please enter a valid phone number"
                                required
                                className={glassCls}
                            />
                        </GlassField>

                        <GlassField
                            label="Service"
                            icon={<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>}
                        >
                            <select name="service" defaultValue={SERVICES[0]} className={`${glassCls} cursor-pointer appearance-none pr-9`}>
                                {SERVICES.map((s) => (
                                    <option key={s} value={s} className="bg-white text-[#111111]">
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60">
                                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </GlassField>
                    </fieldset>

                    <button
                        type="submit"
                        disabled={sending}
                        className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#8ac44b] px-7 font-['Montserrat',sans-serif] text-sm font-semibold text-white shadow-[0_10px_28px_rgba(138,196,75,0.40),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(138,196,75,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:col-span-2 lg:col-span-1"
                    >
                        {sending ? 'Sending…' : 'Get my audit'}
                        {!sending && <ChevronsRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />}
                    </button>

                    <p aria-live="polite" className="font-['Montserrat',sans-serif] text-sm text-[#ffb4a8] empty:hidden sm:col-span-2 lg:col-span-5">
                        {status === 'error' &&
                            'Your request didn’t go through. Try again, or email support@amzautomationsolutions.com.'}
                    </p>
                </form>
            </div>

            <ThankYouPopup open={status === 'sent'} name={thanksName} onClose={closeThanks} />
        </section>
    );
};

export default QuickLeadSection;