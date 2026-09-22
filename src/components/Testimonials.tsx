import React, { useState } from 'react';
import { useSectionReveal } from './usesectionreveal';

const GREEN = '#8AC44B';
const HEADING_FONT = 'var(--font-heading)';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    text: string;
}

const DUMMY_TEXT =
    "Lorem Ipsum is simply dummy text of the printing and industry's standard dummy Bride Printing Library in London,";

const TESTIMONIALS: Testimonial[] = [
    { id: 1, name: 'Perin Rames', role: 'Head of Management at ZE', avatar: '/images/avatar.png', text: DUMMY_TEXT },
    { id: 2, name: 'Aiden Cole', role: 'Product Lead at Nexa', avatar: '/images/avatar.png', text: DUMMY_TEXT },
    { id: 3, name: 'Sara Malik', role: 'Marketing Director at Orbit', avatar: '/images/avatar.png', text: DUMMY_TEXT },
    { id: 4, name: 'Omar Hassan', role: 'Operations Head at Vertex', avatar: '/images/avatar.png', text: DUMMY_TEXT },
];

const QuoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        viewBox="0 0 36 22"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        {...props}
    >
        <circle cx="6.5" cy="15" r="5.2" />
        <path d="M1.3 15C1.3 8 4.5 3 10.5 1.2" />
        <circle cx="24.5" cy="15" r="5.2" />
        <path d="M19.3 15C19.3 8 22.5 3 28.5 1.2" />
    </svg>
);

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {direction === 'right' ? (
            <path d="M4 12h16M14 6l6 6-6 6" />
        ) : (
            <path d="M20 12H4M10 6l-6 6 6 6" />
        )}
    </svg>
);

const Author: React.FC<{ item: Testimonial; size: 'lg' | 'md' }> = ({ item, size }) => (
    <div className="flex items-center gap-3">
        <img
            src={item.avatar}
            alt={item.name}
            className={`shrink-0 rounded-full bg-neutral-300 object-cover ${size === 'lg' ? 'h-16 w-16' : 'h-[52px] w-[52px]'
                }`}
        />
        <div>
            <p className="text-sm font-bold leading-5 text-black">{item.name}</p>
            <p className="text-[10px] leading-4 text-neutral-500">{item.role}</p>
        </div>
    </div>
);

const Card: React.FC<{ item: Testimonial; className?: string }> = ({ item, className = '' }) => (
    <article
        className={`rounded-[20px] bg-white px-7 py-5 shadow-[0_6px_14px_rgba(0,0,0,0.14)] ${className}`}
    >
        <div className="flex items-center justify-between">
            <Author item={item} size="md" />
            <QuoteIcon className="w-11" />
        </div>
        <p className="mt-6 text-[15px] leading-6 text-neutral-500">{item.text}</p>
    </article>
);

const Testimonials: React.FC = () => {
    const total = TESTIMONIALS.length;
    const [start, setStart] = useState(0);
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const prev = () => setStart((s) => (s - 1 + total) % total);
    const next = () => setStart((s) => (s + 1) % total);

    const first = TESTIMONIALS[start];
    const second = TESTIMONIALS[(start + 1) % total];

    return (
        <section
            ref={ref}
            data-reveal="fade-up"
            data-inview={inView}
            className="bg-white px-5 py-16 sm:py-20"
        >
            <div className="mx-auto max-w-[1040px]">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <span className="inline-flex h-6 w-40 items-center justify-center rounded-full bg-[#8AC44B] text-xs font-medium text-white">
                            Testimonials
                        </span>
                        <h2
                            className="mt-3 text-[32px] font-normal leading-[1.15] text-black sm:text-[42px]"
                            style={{ fontFamily: HEADING_FONT }}
                        >
                            What Our Awesome <br className="hidden sm:block" />
                            <span className="font-bold">Customers</span> Says
                        </h2>
                    </div>

                    <p className="max-w-[370px] border-l-[3px] border-[#8AC44B] pl-4 text-[15px] leading-6 text-neutral-500">
                        Lorem Ipsum is simply dummy text of the printing and industry&apos;s standard dummy Bride
                        Printing Library in London,
                    </p>
                </div>

                <div className="mt-10 flex flex-col gap-7 lg:flex-row lg:items-center">
                    <div className="lg:w-[225px] lg:shrink-0">
                        <Author item={first} size="lg" />

                        <div className="mt-4 flex items-center gap-6">
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous testimonial"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#8AC44B] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8AC44B]"
                            >
                                <ArrowIcon direction="left" />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next testimonial"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8AC44B] text-white shadow-[0_6px_14px_rgba(138,196,75,0.55)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8AC44B]"
                            >
                                <ArrowIcon direction="right" />
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid flex-1 grid-cols-1 gap-7 md:grid-cols-2" aria-live="polite">
                        <Card item={first} />
                        <Card item={second} className="hidden md:block" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;