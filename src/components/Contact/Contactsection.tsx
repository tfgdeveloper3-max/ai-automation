import { useState, type CSSProperties, type FormEvent } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const SUBJECTS = [
    { id: 'general-inquiry', label: 'General Inquiry' },
    { id: 'amazon-automation', label: 'Amazon Automation' },
    { id: 'shopify-tiktok', label: 'Shopify & TikTok' },
    { id: 'affiliate-partnership', label: 'Affiliate Partnership' },
];

const SOCIALS = [
    { name: 'Twitter', href: '#', icon: '/images/social/twitter.svg', tone: 'green' },
    { name: 'Instagram', href: '#', icon: '/images/social/instagram.svg', tone: 'white' },
    { name: 'Discord', href: '#', icon: '/images/social/discord.svg', tone: 'green' },
] as const;

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />
        <path d="M15 3a6 6 0 0 1 6 6M15 6.5A2.5 2.5 0 0 1 17.5 9" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.3 7 12 11.4 18.7 7H5.3Z" />
    </svg>
);

const PinIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
);

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SocialIcon = ({ name, icon }: { name: string; icon: string }) => {
    const [failed, setFailed] = useState(false);
    if (failed) return <span className="text-xs font-bold">{name[0]}</span>;
    return <img src={icon} alt="" onError={() => setFailed(true)} className="h-4 w-4 object-contain" />;
};

const Field = ({
    label,
    name,
    type = 'text',
    placeholder,
    autoComplete,
    required,
}: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
}) => (
    <label className="group block">
        <span className="block font-['Montserrat',sans-serif] text-xs font-medium text-[#8d8d99] transition-colors group-focus-within:text-[#111111]">
            {label}
        </span>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            className="mt-1.5 block w-full border-0 border-b border-[#8d8d99] bg-transparent px-0 pb-2 pt-1 font-['Montserrat',sans-serif] text-sm text-[#111111] outline-none transition-colors placeholder:text-[#b0b0ba] focus:border-[#111111] focus:ring-0"
        />
    </label>
);

const ContactSection = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });
    const [subject, setSubject] = useState(SUBJECTS[0].id);
    const [sent, setSent] = useState(false);

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
        style: { transitionDelay: `${i * 130}ms` } as CSSProperties,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Record<string, string> = {};
        new FormData(e.currentTarget).forEach((value, key) => {
            data[key] = String(value);
        });
        console.log('Contact form:', { ...data, subject: SUBJECTS.find((x) => x.id === subject)?.label });
        setSent(true);
        e.currentTarget.reset();
        setSubject(SUBJECTS[0].id);
    };

    return (
        <section ref={ref} id="contact" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                {/* ---------- Intro ---------- */}
                <div className={`flex flex-col gap-6 md:flex-row md:items-start md:justify-between ${reveal(0).className}`} style={reveal(0).style}>
                    <div>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-6 py-1 font-['Montserrat',sans-serif] text-[11px] font-medium text-white sm:text-xs">
                            Contact Us
                        </span>
                        <h2 className="mt-2 font-['Anybody',sans-serif] text-[32px] font-light leading-[1.15] text-[#111111] sm:text-[40px] lg:text-[48px]">
                            <span className="font-bold">Let&rsquo;s Connect</span>
                            <br />
                            &amp; Scale Your Business
                        </h2>
                    </div>

                    <p className="max-w-[380px] border-l-[3px] border-[#8ac44b] pl-4 font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#6b6b7a] sm:text-[15px] md:mt-6">
                        Ready to automate your Amazon, Shopify, or TikTok operations? Send us
                        a message and our automation specialists will get back to you shortly.
                    </p>
                </div>

                <div
                    className={`mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-white p-2.5 shadow-[0_10px_50px_rgba(20,12,60,0.10)] lg:mt-12 lg:grid-cols-[2fr_3fr] lg:gap-10 ${reveal(1).className}`}
                    style={reveal(1).style}
                >
                    <aside className="relative isolate flex flex-col overflow-hidden rounded-xl bg-[#1f1650] px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-[520px]">
                        <span aria-hidden="true" className="absolute bottom-16 right-6 z-0 h-32 w-32 rounded-full bg-white/15 sm:h-36 sm:w-36" />
                        <span aria-hidden="true" className="absolute bottom-6 right-16 z-0 h-28 w-28 rounded-full bg-white/10 sm:right-20 sm:h-32 sm:w-32" />

                        <div className="relative z-10">
                            <h3 className="font-['Montserrat',sans-serif] text-xl font-semibold sm:text-2xl">Contact Information</h3>
                            <p className="mt-2 font-['Montserrat',sans-serif] text-sm text-white/75">
                                Reach out directly or send us a message to get started!
                            </p>
                        </div>

                        <ul className="relative z-10 mt-10 space-y-7 font-['Montserrat',sans-serif] text-sm sm:mt-14">
                            <li>
                                <a href="tel:+18001234567" className="flex items-center gap-5 hover:text-[#8ac44b]">
                                    <PhoneIcon /> +1 (800) 123-4567
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@amzautomation.com" className="flex items-center gap-5 hover:text-[#8ac44b]">
                                    <MailIcon /> hello@amzautomation.com
                                </a>
                            </li>
                            <li className="flex items-start gap-5">
                                <PinIcon />
                                <address className="not-italic leading-relaxed">
                                    123 Innovation Way, Suite 400,
                                    <br />
                                    New York, NY 10001
                                </address>
                            </li>
                        </ul>

                        <ul className="relative z-10 mt-12 flex gap-3 lg:mt-auto lg:pt-12">
                            {SOCIALS.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.href}
                                        aria-label={s.name}
                                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 ${s.tone === 'green' ? 'bg-[#8ac44b] text-white' : 'bg-white text-[#1f1650]'}`}
                                    >
                                        <SocialIcon name={s.name} icon={s.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <form onSubmit={handleSubmit} className="px-3 pb-6 pt-2 sm:px-6 lg:py-10 lg:pl-0 lg:pr-10">
                        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                            <Field label="First Name" name="firstName" autoComplete="given-name" placeholder="John" required />
                            <Field label="Last Name" name="lastName" autoComplete="family-name" placeholder="Doe" required />
                            <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                            <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" placeholder="+1 012 3456 789" />
                        </div>

                        <fieldset className="mt-9">
                            <legend className="font-['Montserrat',sans-serif] text-sm font-semibold text-[#111111]">Select Subject?</legend>
                            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                                {SUBJECTS.map((s) => (
                                    <label key={s.id} className="inline-flex cursor-pointer items-center gap-2 font-['Montserrat',sans-serif] text-xs text-[#3a3a48]">
                                        <input
                                            type="radio"
                                            name="subject"
                                            value={s.id}
                                            checked={subject === s.id}
                                            onChange={() => setSubject(s.id)}
                                            className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-full border border-[#d4d4dc] bg-[#e5e5ea] transition checked:border-[#111111] checked:bg-[#111111] checked:shadow-[inset_0_0_0_2px_#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                        />
                                        {s.label}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <label className="group mt-9 block">
                            <span className="block font-['Montserrat',sans-serif] text-xs font-medium text-[#8d8d99] transition-colors group-focus-within:text-[#111111]">
                                Message
                            </span>
                            <textarea
                                name="message"
                                rows={2}
                                required
                                placeholder="Tell us about your store and automation goals..."
                                className="mt-1.5 block w-full resize-none border-0 border-b border-[#8d8d99] bg-transparent px-0 pb-2 pt-1 font-['Montserrat',sans-serif] text-sm text-[#111111] outline-none transition-colors placeholder:text-[#8d8d99] focus:border-[#111111] focus:ring-0"
                            />
                        </label>

                        <div className="mt-8 flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    type="submit"
                                    className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-10 font-['Montserrat',sans-serif] text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1650]"
                                >
                                    Submit Now
                                </button>
                                <button
                                    type="submit"
                                    aria-label="Submit"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1650]"
                                >
                                    <ChevronsRight className="h-5 w-5" />
                                </button>
                            </div>
                            <p aria-live="polite" className="font-['Montserrat',sans-serif] text-sm text-[#5f9a24]">
                                {sent ? 'Thanks! Your message has been sent.' : ''}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;