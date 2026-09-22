import { useSectionReveal } from './usesectionreveal';

const SkillsSection = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    return (
        <section ref={ref} data-reveal="zoom-out" data-inview={inView} className="skills">
            <div className="skills__inner">
                <div className="skills__media">
                    <img
                        src="/images/Skill.png"
                        alt="Analyst with a laptop and a rising bar chart"
                        className="skills__illustration"
                    />
                </div>

                <div className="skills__content">
                    <span className="skills__badge">About Company</span>

                    <h2 className="skills__title">
                        Skills To <span className="skills__title--bold">Improve</span> Your{' '}
                        <span className="skills__title--bold">Company</span> Brand
                    </h2>

                    <p className="skills__text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry&rsquo;s standard dummy text ever since 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                        into electronic typesetting, remaining essentially unchanged.
                    </p>

                    <div className="skills__stats">
                        <div className="skills__stat">
                            <span className="skills__stat-value">65%</span>
                            <span className="skills__stat-label">
                                Paid Serach
                                <br />
                                Marketing
                            </span>
                        </div>
                        <div className="skills__stat">
                            <span className="skills__stat-value">65%</span>
                            <span className="skills__stat-label">
                                Paid Serach
                                <br />
                                Marketing
                            </span>
                        </div>
                    </div>

                    <a href="#" className="skills__btn">
                        Explore More
                        <span className="skills__btn-arrow" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 17L17 7M17 7H8M17 7V16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;