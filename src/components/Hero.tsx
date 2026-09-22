import Ribbon from './Ribbon';
import Navbar from './Navbar';
import AuroraBackground from './Aurorabackground';

const Hero = () => {
    return (
        <div className="hero-shell">
            <section className="hero">
                <div className="hero__bg" aria-hidden="true">
                    <AuroraBackground />
                </div>

                <div className="hero__dots hero__dots--twinkle" aria-hidden="true" />

                <Navbar />

                <div className="hero__inner">
                    <h1 className="hero__title reveal reveal-up" style={{ '--delay': '0.15s' } as React.CSSProperties}>
                        <span className="hero__title--bold">Automate</span> Your Success
                    </h1>

                    <div className="hero__row">
                        <div className="hero__content">
                            <div
                                className="hero__subtitle reveal reveal-up"
                                style={{ '--delay': '0.6s' } as React.CSSProperties}
                            >
                                <span className="hero__subtitle-light">With Amazon,</span>
                                <span className="hero__subtitle-bold">Shopify,&nbsp;&amp; TikTok</span>
                            </div>

                            <p className="hero__text reveal reveal-up" style={{ '--delay': '1s' } as React.CSSProperties}>
                                Lorem Ipsum is simply dummy text of the printing and industry&rsquo;s standard dummy Bride Printing
                                Library in London,
                            </p>

                            <div
                                className="hero__actions reveal reveal-up"
                                style={{ '--delay': '1.35s' } as React.CSSProperties}
                            >
                                <a href="#get-started" className="hero__btn">
                                    Get Started
                                </a>
                                <a href="#get-started" className="hero__arrow" aria-label="Get started">
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

                        <div className="hero__media">
                            <div className="hero__image-wrap reveal reveal-pop" style={{ '--delay': '0.5s' } as React.CSSProperties}>
                                <img
                                    src="/images/Hero-Person.png"
                                    alt="Team member holding a tablet"
                                    className="hero__image"
                                />

                                <div
                                    className="hero__card hero__card--rating reveal reveal-left hero__card--float"
                                    style={{ '--delay': '1.9s' } as React.CSSProperties}
                                >
                                    <span className="hero__card-icon" aria-hidden="true">
                                        ★
                                    </span>
                                    <div>
                                        <p className="hero__card-title">5 Stars Rating</p>
                                        <p className="hero__card-sub">Read for Success Stories</p>
                                    </div>
                                </div>

                                <img
                                    src="/images/chart.png"
                                    alt="Insights chart, last 12 months"
                                    className="hero__insights-img reveal reveal-right hero__insights-img--float"
                                    style={{ '--delay': '2.1s' } as React.CSSProperties}
                                />
                            </div>

                            <div className="hero__side reveal reveal-up" style={{ '--delay': '1.6s' } as React.CSSProperties}>
                                <button className="hero__play" aria-label="Play video">
                                    <span className="hero__play-ring" aria-hidden="true" />
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>

                                <div className="hero__social-proof">
                                    <span className="hero__trust-star" aria-hidden="true">
                                        ★
                                    </span>
                                    <span className="hero__trust-label">Trustipilot</span>
                                    <div className="hero__avatars" aria-hidden="true">
                                        <span className="hero__avatar" style={{ '--delay': '2.6s' } as React.CSSProperties} />
                                        <span className="hero__avatar" style={{ '--delay': '2.8s' } as React.CSSProperties} />
                                        <span className="hero__avatar" style={{ '--delay': '3s' } as React.CSSProperties} />
                                    </div>
                                    <span className="hero__reviews">450+ Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Ribbon />
        </div>
    );
};

export default Hero;