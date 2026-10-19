import { useSectionReveal } from '@/components/usesectionreveal';
import React, { useEffect, useRef, useState } from 'react';


const HEADING_FONT = 'var(--font-heading)';

interface Faq {
    q: string;
    a: string;
}

const FAQS: Faq[] = [
    {
        q: 'How quickly can AI Customer Support be integrated into my store?',
        a: 'Setup typically takes 24 to 48 hours. Our team configures and connects the AI agents directly with your Amazon, Shopify, or TikTok account, training it on your specific store FAQs and catalog data.',
    },
    {
        q: 'Does AMZ Automation work across Amazon, Shopify, and TikTok simultaneously?',
        a: 'Yes! Our systems are built for multi-channel management, allowing you to synchronize inventory, order workflows, and customer support across Amazon, Shopify, and TikTok Shop from one central pipeline.',
    },
    {
        q: 'Can the AI chatbot handle complex customer inquiries or refunds?',
        a: 'The AI instantly handles 80%+ of routine inquiries like order status, shipping updates, and general FAQs. For complex cases or specific refund approvals, the bot smoothly hands off the ticket to your human team with full context.',
    },
    {
        q: 'Will using automated tools affect my Amazon Seller Central compliance?',
        a: 'Not at all. All our automation workflows strictly adhere to Amazon, Shopify, and TikTok terms of service, keeping your account safe while improving operational efficiency.',
    },
    {
        q: 'What level of technical setup or maintenance is required from my side?',
        a: 'Zero technical expertise is required. We handle 100% of the initial setup, API integrations, and continuous performance tuning so your store can run seamlessly on autopilot.',
    },
    {
        q: 'How do I get started with AMZ Automation services?',
        a: 'Simply click the "Get Started" button or reach out via our contact form. Our team will schedule a strategy call to evaluate your store and build a custom automation plan.',
    },
];

const useInView = <T extends HTMLElement>(threshold = 0.15) => {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
};

interface FaqItemProps {
    faq: Faq;
    index: number;
    open: boolean;
    visible: boolean;
    onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, index, open, visible, onToggle }) => {
    const buttonId = `faq-button-${index}`;
    const panelId = `faq-panel-${index}`;

    return (
        <div
            className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
        >
            <div className="rounded-xl border border-neutral-100 bg-white shadow-[0_5px_8px_-2px_rgba(0,0,0,0.28)]">
                <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={onToggle}
                    className="flex w-full items-center justify-between gap-4 rounded-xl py-2.5 pl-6 pr-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8AC44B]"
                >
                    <span className="text-base leading-6 text-neutral-600" style={{ fontFamily: HEADING_FONT }}>
                        {faq.q}
                    </span>

                    <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 motion-reduce:transition-none ${open ? 'bg-[#8AC44B]' : 'bg-[#191041]'}`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="#fff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>

                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <p className="px-6 pb-5 pt-1 text-[15px] leading-6 text-neutral-500">{faq.a}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AiFaqs: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { ref, inView } = useInView<HTMLDivElement>();
    const { ref: sectionRef, inView: sectionInView } = useSectionReveal<HTMLElement>({ threshold: 0.1 });

    return (
        <section
            ref={sectionRef}
            data-reveal="fade"
            data-inview={sectionInView}
            className="bg-white px-5 pb-20 pt-20"
        >
            <div className="mx-auto max-w-[912px]">
                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex h-6 w-40 items-center justify-center rounded-full bg-[#8AC44B] text-xs font-medium text-white">
                        FAQS
                    </span>

                    <h2
                        className="mt-3 text-[32px] font-normal leading-tight text-black sm:text-[40px]"
                        style={{ fontFamily: HEADING_FONT }}
                    >
                        Frequently Asked <span className="font-bold">Questions</span>
                    </h2>

                    <p className="mt-3 max-w-[520px] text-[15px] leading-5 text-neutral-500">
                        Have questions about how our e-commerce automation services work?
                        Find clear answers below regarding setup, multi-channel integration,
                        and AI support systems.
                    </p>
                </div>

                {/* List */}
                <div ref={ref} className="mt-8 grid grid-cols-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-11 md:gap-y-10">
                    {FAQS.map((faq, i) => (
                        <FaqItem
                            key={faq.q}
                            faq={faq}
                            index={i}
                            open={openIndex === i}
                            visible={inView}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiFaqs;
