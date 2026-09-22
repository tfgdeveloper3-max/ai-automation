import { useEffect, useRef, useState } from 'react';

interface UseSectionRevealOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

export function useSectionReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseSectionRevealOptions = {}
) {
    const { threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = false } = options;
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, inView };
}