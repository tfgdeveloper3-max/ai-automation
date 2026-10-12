import type { CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

interface Post {
    href: string;
    image: string;
    imageAlt: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    tags: string[];
}

const FEATURED: Post = {
    href: '#',
    image: '/images/Blog.jpg',
    imageAlt: 'Designer working on a laptop and tablet at a desk with sketches and flowers',
    date: '02 Oct 2026',
    readTime: '4 min read',
    title: 'How AI Automation Can Double Your E-Commerce Customer Retention Rate',
    excerpt:
        'Discover how automating post-purchase messaging, review requests, and personalized cross-selling can turn one-time shoppers into loyal brand advocates without increasing your team\u2019s workload.',
    tags: ['Automation', 'E-Commerce', 'Growth'],
};

const TOTAL_POSTS = 8;

const BlogFeatured = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    const post = FEATURED;

    return (
        <section ref={ref} className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                <div
                    className={`flex flex-col gap-6 md:flex-row md:items-start md:justify-between ${reveal(0).className}`}
                    style={reveal(0).style}
                >
                    <div>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1 font-['Montserrat',sans-serif] text-[11px] font-medium text-white sm:text-xs">
                            Blogs
                        </span>
                        <h2 className="mt-2 font-['Anybody',sans-serif] text-[32px] font-light leading-[1.15] text-[#111111] sm:text-[40px] lg:text-[48px]">
                            <span className="font-bold">Latest E-Commerce</span>
                            <br />
                            Automation Insights
                        </h2>
                    </div>

                    <p className="max-w-[380px] border-l-[3px] border-[#8ac44b] pl-4 font-['Montserrat',sans-serif] text-[16px] leading-relaxed text-[#6b6b7a] sm:text-[16px] md:mt-6">
                        Expert advice, guides, and practical growth strategies to help you
                        automate customer operations, boost store efficiency, and maximize
                        profit margins.
                    </p>
                </div>

                <p
                    className={`mt-8 font-['Montserrat',sans-serif] text-lg font-light italic text-[#111111] sm:mt-10 sm:text-xl ${reveal(1).className}`}
                    style={reveal(1).style}
                >
                    Recent Posts ({String(TOTAL_POSTS).padStart(2, '0')})
                </p>

                <article className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:gap-6">
                    <a
                        href={post.href}
                        className={`group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 md:aspect-auto md:min-h-[320px] ${reveal(2, 'translate-y-8 md:translate-y-0 md:translate-x-[-2rem]').className
                            }`}
                        style={reveal(2).style}
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <img
                            src={post.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </a>

                    <div
                        className={`pb-[6px] pr-[6px] ${reveal(3, 'translate-y-8 md:translate-y-0 md:translate-x-8').className}`}
                        style={reveal(3).style}
                    >
                        <div className="flex h-full flex-col rounded-2xl bg-[#2c1e6b] px-6 py-6 text-white shadow-[6px_6px_0_#8ac44b] transition-shadow duration-300 hover:shadow-[8px_8px_0_#8ac44b] sm:px-7 sm:py-7 lg:px-8">
                            <p className="flex items-center gap-2 font-['Montserrat',sans-serif] text-sm text-white/90">
                                <time dateTime="2026-10-02">{post.date}</time>
                                <span aria-hidden="true">&bull;</span>
                                <span>{post.readTime}</span>
                            </p>

                            <h3 className="mt-3 font-['Anybody',sans-serif] text-xl font-bold leading-snug sm:text-2xl lg:text-[28px] lg:leading-[1.25]">
                                <a
                                    href={post.href}
                                    className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                >
                                    {post.title}
                                </a>
                            </h3>

                            <p className="mt-4 font-['Montserrat',sans-serif] text-[15px] leading-[1.75] text-white/75 sm:text-sm">
                                {post.excerpt}
                            </p>

                            <ul className="mt-5 flex flex-wrap gap-2 pt-0 md:mt-auto md:pt-5">
                                {post.tags.map((tag) => (
                                    <li key={tag}>
                                        <a
                                            href="#"
                                            className="inline-flex rounded-md bg-[#8ac44b] px-4 py-1.5 font-['Montserrat',sans-serif] text-xs font-medium text-white transition hover:brightness-110"
                                        >
                                            {tag}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>

                <hr className="mt-12 border-0 border-t border-[#2b2b3a]/60 lg:mt-14" />
            </div>
        </section>
    );
};

export default BlogFeatured;