import React, { useEffect, useRef, useState } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const HEADING_FONT = 'var(--font-heading)';

interface Faq {
    q: string;
    a: string;
}

const FAQS: Faq[] = [
    {
        q: 'How do all four AMZ Automation services work together for my store?',
        a: 'Our services form a unified automation ecosystem. AI Customer Support resolves buyer inquiries, Automated Order & Returns handles post-purchase routing, Inventory & Data Pipelines keep stock synced in real time, and Revenue & Upsell Automation maximizes order values\u2014working together hands-free across Amazon, Shopify, and TikTok Shop.',
    },
    {
        q: 'Can I start with one automation service and add others as my store grows?',
        a: 'Absolutely! You can start with a single module\u2014such as 24/7 AI Customer Support or Inventory Synchronization\u2014and seamlessly activate additional automated workflows as your multi-channel operations expand.',
    },
    {
        q: 'How long does total platform onboarding and integration take?',
        a: 'Most full-suite integrations are live within 24 to 48 hours. Our technical team handles all API connections, catalog indexing, and workflow setup without causing any downtime for your store.',
    },
    {
        q: 'Are these automation systems compatible with existing 3PLs, ERPs, and store apps?',
        a: 'Yes. Our custom data pipelines and API integrations bridge your storefronts with major 3PL fulfillment centers, warehouse management systems, and existing software stacks effortlessly.',
    },
    {
        q: 'Will automating operations compromise account health on Amazon or TikTok Shop?',
        a: 'No. Every automation protocol built by AMZ Automation complies 100% with seller policies and API guidelines across Amazon, Shopify, and TikTok Shop, actively protecting your account health metrics.',
    },
    {
        q: 'What kind of ongoing support and maintenance does AMZ Automation provide?',
        a: 'We provide continuous monitoring, performance tuning, and technical maintenance. Our dedicated support team ensures your automated pipelines run smoothly 24/7 as platform algorithms and store demands update.',
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
            className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
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
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 motion-reduce:transition-none ${open ? 'bg-[#8AC44B]' : 'bg-[#191041]'
                            }`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-90' : ''
                                }`}
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
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                >
                    <div className="overflow-hidden">
                        <p className="px-6 pb-5 pt-1 text-[15px] leading-6 text-neutral-500">{faq.a}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServiceFaqs: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { ref, inView } = useInView<HTMLDivElement>();
    const { ref: sectionRef, inView: sectionInView } = useSectionReveal<HTMLElement>({ threshold: 0.1 });

    return (
        <section
            ref={sectionRef}
            data-reveal="fade"
            data-inview={sectionInView}
            className="bg-white px-5 pb-20 pt-4"
        >
            <div className="mx-auto max-w-[912px]">
                {/* Header */}
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

                    <p className="mt-3 max-w-[520px] text-[13px] leading-5 text-neutral-500">
                        Have questions about our end-to-end e-commerce automation services?
                        Learn how our platform unifies customer support, order processing,
                        inventory sync, and revenue growth across Amazon, Shopify, and TikTok.
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

export default ServiceFaqs;