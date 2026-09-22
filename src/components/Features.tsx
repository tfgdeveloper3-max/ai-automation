import type { JSX } from 'react/jsx-runtime';
import { useSectionReveal } from './usesectionreveal';

interface FeatureCard {
    title: string;
    description: string;
    icon: JSX.Element;
    highlight?: boolean;
}

const AmazonIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <text
            x="4"
            y="26"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill="#111111"
        >
            a
        </text>
        <path
            d="M6 30c6 5 20 5 28-1"
            stroke="#F5A623"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
        />
        <path d="M29 27l5 1-1 5" stroke="#F5A623" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

const TikTokIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="1" y="1" width="38" height="38" rx="10" fill="#0A0A0A" />
        <path
            d="M24.5 9.5c.6 2.8 2.4 4.6 5.2 5v3.6c-1.9.1-3.6-.5-5.2-1.6v7.9c0 4.3-3.5 7.1-7.4 6.4-3.1-.6-5.3-3.4-5.1-6.6.2-3.2 3-5.7 6.2-5.5.3 0 .6.1.9.1v3.7a3 3 0 0 0-1.4-.2c-1.6.1-2.8 1.5-2.7 3.1.1 1.5 1.4 2.7 3 2.6 1.7-.1 2.9-1.4 2.9-3.2V9.5h3.6Z"
            fill="#25F4EE"
        />
        <path
            d="M23.3 9.5c.6 2.8 2.4 4.6 5.2 5v3.6c-1.9.1-3.6-.5-5.2-1.6v7.9c0 4.3-3.5 7.1-7.4 6.4-3.1-.6-5.3-3.4-5.1-6.6.2-3.2 3-5.7 6.2-5.5.3 0 .6.1.9.1v3.7a3 3 0 0 0-1.4-.2c-1.6.1-2.8 1.5-2.7 3.1.1 1.5 1.4 2.7 3 2.6 1.7-.1 2.9-1.4 2.9-3.2V9.5h3.6Z"
            fill="#FE2C55"
            opacity="0.75"
        />
        <path
            d="M23.9 9.5c.6 2.8 2.4 4.6 5.2 5v3.6c-1.9.1-3.6-.5-5.2-1.6v7.9c0 4.3-3.5 7.1-7.4 6.4-3.1-.6-5.3-3.4-5.1-6.6.2-3.2 3-5.7 6.2-5.5.3 0 .6.1.9.1v3.7a3 3 0 0 0-1.4-.2c-1.6.1-2.8 1.5-2.7 3.1.1 1.5 1.4 2.7 3 2.6 1.7-.1 2.9-1.4 2.9-3.2V9.5h3.6Z"
            fill="#FFFFFF"
        />
    </svg>
);

const ShopifyIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
            d="M27.5 8.7c0-.1-.1-.2-.3-.2-.1 0-2 0-2 0l-1.6-1.6c-.2-.2-.4-.1-.5-.1l-.9.3c-.5-1.5-1.4-2.9-3.1-2.9h-.2c-.4-.6-.9-.9-1.4-.9-3.4 0-5 4.3-5.6 6.4l-2.4.8c-.7.2-.8.3-.9.9L6.5 32.3l19.4 3.6L34 33.9 27.5 8.7Z"
            fill="#95BF47"
        />
        <path
            d="M27.2 8.5c-.1 0-2 0-2 0l-1.6-1.6c-.1-.1-.1-.1-.2-.1v29.1L34 33.9 27.5 8.7c0-.1-.2-.2-.3-.2Z"
            fill="#5E8E3E"
        />
        <path
            d="M19.4 13.5l-.9 3.4s-1-.4-2.2-.4c-1.8 0-1.9 1.1-1.9 1.4 0 1.5 4 2.1 4 5.7 0 2.8-1.8 4.6-4.2 4.6-2.9 0-4.4-1.8-4.4-1.8l.8-2.6s1.5 1.3 2.8 1.3c.8 0 1.2-.7 1.2-1.2 0-2-3.3-2.1-3.3-5.4 0-2.7 1.9-5.3 5.9-5.3 1.5 0 2.2.4 2.2.4Z"
            fill="#FFFFFF"
        />
    </svg>
);

const StoreIcon = () => (
    <span className="text-[34px] leading-none" role="img" aria-label="Store">
        🏬
    </span>
);

const ArrowRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Card 1 is highlighted/active by default; the other three only pick up
// the same look on :hover (see the CSS — hover and --highlight share styles).
const CARDS: FeatureCard[] = [
    {
        title: 'Amazon Wholesale Automation',
        description:
            'Discover how our Amazon Automation Service can work for you. Click here to learn more.',
        icon: <AmazonIcon />,
        highlight: true,
    },
    {
        title: 'TikTok Shop Automation',
        description: 'Explore our TikTok Shop Automation Service by clicking here.',
        icon: <TikTokIcon />,
    },
    {
        title: 'Shopify Automation',
        description:
            'Get the potential of Shopify Dropshipping with our Automation Service. Click here to find out more.',
        icon: <ShopifyIcon />,
    },
    {
        title: 'Established Stores',
        description:
            'Browse our selection of established eCommerce stores generating $2k+/month in profit. Click here to view available stores.',
        icon: <StoreIcon />,
    },
];

const Features = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    return (
        <section ref={ref} data-reveal="zoom" data-inview={inView} className="features">
            <div className="features__inner">
                <div className="features__intro">
                    <div className="features__intro-left">
                        <span className="features__badge">What We Can Do</span>
                        <h2 className="features__title">
                            <span className="features__title--bold">Lorem Ipsum</span> IS
                            <br />
                            Simply Dummy Text
                        </h2>
                    </div>

                    <p className="features__note">
                        Lorem Ipsum is simply dummy text of the printing and industry&rsquo;s standard dummy Bride Printing
                        Library in London,
                    </p>
                </div>

                <div className="features__grid">
                    {CARDS.map((card, i) => (
                        <div
                            key={i}
                            className={`feature-card${card.highlight ? ' feature-card--highlight' : ''}`}
                        >
                            <div className="feature-card__icon">{card.icon}</div>
                            <h3 className="feature-card__title">{card.title}</h3>
                            <a href="#" className="feature-card__cta">
                                Learn More
                                <ArrowRightIcon />
                            </a>
                            <p className="feature-card__desc">{card.description}</p>
                        </div>
                    ))}
                </div>

                <div className="features__cta">
                    <a href="#" className="features__view-all">
                        View All
                    </a>
                    <a href="#" className="features__view-all-arrow" aria-label="View all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 17L17 7M17 7H8M17 7V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Features;