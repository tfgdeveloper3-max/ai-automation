import { useSectionReveal } from '@/components/usesectionreveal';
import React, { useEffect, useRef, useState } from 'react';


const HEADING_FONT = 'var(--font-heading)';

interface Faq {
    q: string;
    a: string;
}

const FAQS: Faq[] = [
    {
        q: 'How does Shopify Automation work with AMZ Automation?',
        a: 'We build and manage your custom Shopify storefront from start to finish. Our team handles everything from custom theme design and winning product integration to automated fulfillment and customer support workflows.',
    },
    {
        q: 'Do I need an existing Shopify account to get started?',
        a: 'No prior account or technical setup is needed. We configure your Shopify store from the ground up, set up domain settings, and connect secure payment gateways directly to your business account.',
    },
    {
        q: 'Who handles order fulfillment and inventory tracking?',
        a: 'Our automated supply chain network manages all order processing, tracking updates, and stock inventory automatically, ensuring fast shipping times and high customer satisfaction without manual effort.',
    },
    {
        q: 'How do you drive targeted traffic to my Shopify store?',
        a: 'We implement high-converting sales funnels, search engine optimization, targeted digital advertising campaigns, and automated email/SMS marketing to continuously attract intent-driven shoppers.',
    },
    {
        q: 'How much control do I have over my brand identity and store design?',
        a: 'You retain 100% ownership of your Shopify asset. While our team optimizes design and functionality for maximum conversions, we align all store branding and product selections with your vision.',
    },
    {
        q: 'How can I monitor my store\u2019s daily revenue and profits?',
        a: 'You get direct dashboard access to track daily sales, profit margins, active orders, and traffic metrics in real time whenever you want to check in.',
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
                        Everything you need to know about setting up, scaling, and managing
                        your store with Shopify Automation.
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
