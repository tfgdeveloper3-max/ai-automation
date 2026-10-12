import type { CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

interface Post {
    href: string;
    image: string;
    imageAlt: string;
    date: string;
    dateTime: string;
    readTime: string;
    title: string;
    excerpt: string;
    tags: string[];
}

const EXCERPT = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ever since 1966,';

const POSTS: Post[] = [
    { image: '/images/Blog1.jpg', imageAlt: 'Pile of US dollar bills' },
    { image: '/images/Blog2.jpg', imageAlt: 'Two businessmen shaking hands in an office' },
    { image: '/images/Blog3.jpg', imageAlt: 'Person shopping online on a laptop with gift bags' },
    { image: '/images/Blog4.jpg', imageAlt: 'Two women looking at a laptop in a café' },
    { image: '/images/Blog5.jpg', imageAlt: 'Developers coding together on laptops' },
    { image: '/images/Blog6.jpg', imageAlt: 'Two colleagues talking in a meeting' },
].map((p) => ({
    ...p,
    href: '#',
    date: '02 Oct 2026',
    dateTime: '2026-10-02',
    readTime: '4 min',
    title: 'Place Your Blog Heading Here!',
    excerpt: EXCERPT,
    tags: ['Design', 'Product'],
}));

const BlogGrid = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.1 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`,
        style: { transitionDelay: `${i * 100}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} className="bg-white px-5 pb-16 pt-4 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
            <div className="mx-auto w-full max-w-[1200px]">
                <h2
                    className={`font-['Montserrat',sans-serif] text-lg font-light italic text-[#111111] sm:text-xl ${reveal(0).className}`}
                    style={reveal(0).style}
                >
                    Weekly Most Read <span aria-hidden="true" className="not-italic">🔥</span>
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                    {POSTS.map((post, i) => {
                        const r = reveal(i + 1);
                        return (
                            <article key={i} className={`group ${r.className}`} style={r.style}>
                                <a
                                    href={post.href}
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="block aspect-[9/8] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300"
                                >
                                    <img
                                        src={post.image}
                                        alt=""
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </a>

                                <p className="mt-4 flex items-center gap-2 font-['Montserrat',sans-serif] text-[13px] text-[#3a3a48]">
                                    <time dateTime={post.dateTime}>{post.date}</time>
                                    <span aria-hidden="true">&bull;</span>
                                    <span>{post.readTime}</span>
                                </p>

                                <h3 className="mt-3 font-['Montserrat',sans-serif] text-base font-medium text-[#111111] sm:text-[17px]">
                                    <a
                                        href={post.href}
                                        className="transition-colors hover:text-[#8ac44b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                    >
                                        {post.title}
                                    </a>
                                </h3>

                                <p className="mt-2 font-['Montserrat',sans-serif] text-[13px] font-light leading-[1.6] text-[#6b6b7a]">
                                    {post.excerpt}
                                </p>

                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <li key={tag}>
                                            <a
                                                href="#"
                                                className="inline-flex rounded-full border border-[#9a9aa8] px-3 py-0.5 font-['Montserrat',sans-serif] text-[11px] text-[#3a3a48] transition-colors hover:border-[#8ac44b] hover:bg-[#8ac44b] hover:text-white"
                                            >
                                                {tag}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;