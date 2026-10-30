import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { submitLead } from '../SubmitLead';
import ThankYouPopup from '../ThankYou';

type LeadForm = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

type Status = 'idle' | 'loading' | 'sent' | 'error';

const EMPTY_FORM: LeadForm = { name: '', email: '', phone: '', message: '' };

const fadeUp =
    'opacity-0 animate-[heroFadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100';

const inputClass =
    'block w-full rounded-none border-0 border-b border-white/45 bg-transparent px-2 py-3 font-[Montserrat,sans-serif] text-base text-white outline-none transition-colors placeholder:text-white/75 focus:border-[#8ac44b] focus:bg-white/[0.04] disabled:opacity-60 sm:px-5 sm:py-3.5';

const blobBase =
    'absolute -top-[15%] h-[130%] w-[55%] rounded-full blur-[70px] will-change-transform motion-reduce:animate-none';

const LpHero = () => {
    const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
    const [status, setStatus] = useState<Status>('idle');
    const [thanksName, setThanksName] = useState('');
    const closeThanks = useCallback(() => setStatus('idle'), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'loading') return;

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
            console.error('Hero form failed:', err);
            setStatus('error');
        }
    };

    const isLoading = status === 'loading';

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#0e0531_0%,#2f2169_100%)] px-5 pb-[110px] pt-[120px] sm:px-8 sm:pb-[130px] sm:pt-[150px]"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,rgba(75,58,160,0.55)_0%,transparent_60%)]" />
                <span
                    className={`${blobBase} -left-[12%] bg-[radial-gradient(circle,#2f2169_0%,transparent_70%)] opacity-55 animate-[aurora-drift_24s_ease-in-out_infinite]`}
                />
                <span
                    className={`${blobBase} left-[26%] bg-[radial-gradient(circle,#8ac44b_0%,transparent_70%)] opacity-20 animate-[aurora-drift_28s_ease-in-out_-8s_infinite]`}
                />
                <span
                    className={`${blobBase} left-[55%] bg-[radial-gradient(circle,#4b3aa0_0%,transparent_70%)] opacity-55 animate-[aurora-drift_32s_ease-in-out_-16s_infinite]`}
                />
                <span
                    className="absolute -inset-[10%] opacity-50 mix-blend-screen"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 90px)',
                    }}
                />
            </div>

            <div className="relative z-[1] mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                <div>
                    <p
                        className={`${fadeUp} mb-3.5 font-[Montserrat,sans-serif] text-[clamp(14px,1.8vw,22px)] font-medium text-white/90 [animation-delay:50ms]`}
                    >
                        Scale Your Online Retail Business With
                    </p>

                    <h1 className={`${fadeUp} m-0 font-[Anybody,sans-serif] uppercase leading-none [animation-delay:150ms]`}>
                        <span className="block bg-gradient-to-b from-[#c3f07f] to-[#8ac44b] bg-clip-text text-[clamp(36px,6.2vw,84px)] font-extrabold tracking-[-0.01em] text-transparent">
                            Top Tier Systems
                        </span>
                        <span className="mt-5 block text-[clamp(26px,3.6vw,52px)] font-bold text-white">
                            Proven Amazon Expertise
                        </span>
                    </h1>

                    <span
                        aria-hidden="true"
                        className={`${fadeUp} my-6 block h-0.5 w-60 max-w-[50%] bg-[#8ac44b] [animation-delay:300ms]`}
                    />

                    <p
                        className={`${fadeUp} m-0 font-[Montserrat,sans-serif] text-[clamp(16px,1.8vw,24px)] font-medium text-white [animation-delay:400ms]`}
                    >
                        Hands-off, fully managed e-commerce portfolios engineered by AMZ Automation.
                    </p>
                </div>

                <div
                    className={`${fadeUp} max-w-[640px] rounded-[20px] border border-white/12 bg-[linear-gradient(160deg,rgba(47,33,105,0.72),rgba(14,5,49,0.82))] px-5 py-7 shadow-[0_30px_70px_rgba(5,2,25,0.5)] backdrop-blur-md [animation-delay:250ms] sm:px-12 sm:pb-10 sm:pt-11 lg:max-w-none`}
                >
                    <h2 className="mb-6 font-[Anybody,sans-serif] text-[clamp(22px,2.3vw,34px)] font-extrabold uppercase leading-[1.12] text-white">
                        Ready to Start Scaling Your
                        <span className="block text-[#8ac44b]">Revenue Today?</span>
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
                        <div>
                            <label htmlFor="lp-name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="lp-name"
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                autoComplete="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={inputClass}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 sm:gap-6">
                            <div>
                                <label htmlFor="lp-email" className="sr-only">
                                    Email Address
                                </label>
                                <input
                                    id="lp-email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="lp-phone" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    id="lp-phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone Number"
                                    autoComplete="tel"
                                    pattern="[\d\s\+\-\(\)]{7,20}"
                                    title="Please enter a valid phone number"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lp-message" className="sr-only">
                                Share your investment goals
                            </label>
                            <textarea
                                id="lp-message"
                                name="message"
                                placeholder="Share your investment goals*"
                                rows={4}
                                required
                                value={form.message}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`${inputClass} min-h-[120px] resize-y`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-[#8ac44b] px-6 py-5 font-[Montserrat,sans-serif] text-base font-bold uppercase text-[#0e0531] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(138,196,75,0.35)] focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-white disabled:cursor-wait disabled:saturate-[0.6] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        aria-hidden="true"
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-[#0e0531]/30 border-t-[#0e0531]"
                                    />
                                    Sending…
                                </>
                            ) : (
                                'Claim Your Strategy Session'
                            )}
                        </button>

                        <p
                            role="status"
                            aria-live="polite"
                            className="m-0 min-h-5 text-center font-[Montserrat,sans-serif] text-sm text-[#ff8a8a]"
                        >
                            {status === 'error' &&
                                'Sorry, your request could not be sent. Please try again or email support@amzautomationsolutions.com.'}
                        </p>
                    </form>
                </div>
            </div>

            <ThankYouPopup open={status === 'sent'} name={thanksName} onClose={closeThanks} />
        </section>
    );
};

export default LpHero;