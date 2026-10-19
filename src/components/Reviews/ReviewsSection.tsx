import { useMemo, useRef, useState } from 'react';
import { COMPANY_NAME, REVIEWS, type Review } from './ReviewsData';
import Stars from './Stars';
import { SERVICES } from '../ServicesNav';


/* ---------------- Helpers ---------------- */

const PAGE_SIZE = 5;
const CLAMP_AT = 240; // characters before "See more"

type Sort = 'recent' | 'highest' | 'lowest';

const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso));

const scoreLabel = (v: number) => (v >= 4.3 ? 'Excellent' : v >= 3.8 ? 'Great' : v >= 3 ? 'Average' : v >= 2 ? 'Poor' : 'Bad');

const initials = (name: string) =>
    name
        .split(/\s+/)
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const AVATAR_COLORS = ['#1d1650', '#8ac44b', '#4f8cff', '#e8833a', '#9b5de5', '#00a6a6'];
const avatarColor = (id: string) => AVATAR_COLORS[[...id].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLORS.length];

const font = "font-['Montserrat',sans-serif]";

/* ---------------- Icons ---------------- */

const VerifiedIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2Zm-1.2 13.4 5.6-5.6-1.4-1.4-4.2 4.2-2-2-1.4 1.4Z" />
    </svg>
);

const ThumbIcon = ({ filled }: { filled: boolean }) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 10v11H3V10h4Zm0 0 4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.3 8a2 2 0 0 1-2 1.7H7" />
    </svg>
);

const ShareIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

/* ---------------- Review card ---------------- */

const ReviewCard = ({ review }: { review: Review }) => {
    const [expanded, setExpanded] = useState(false);
    const [useful, setUseful] = useState(false);
    const [copied, setCopied] = useState(false);
    const long = review.body.length > CLAMP_AT;
    const body = long && !expanded ? `${review.body.slice(0, CLAMP_AT).trimEnd()}…` : review.body;

    const share = async () => {
        const url = `${window.location.origin}${window.location.pathname}#review-${review.id}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard not available — ignore */
        }
    };

    return (
        <article id={`review-${review.id}`} className="scroll-mt-28 rounded-2xl border border-[#ececf2] bg-white p-5 shadow-[0_4px_14px_rgba(20,12,60,0.04)] sm:p-6">
            {/* Reviewer */}
            <header className="flex items-center gap-3 border-b border-[#f0f0f5] pb-4">
                <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${font}`}
                    style={{ backgroundColor: avatarColor(review.id) }}
                >
                    {initials(review.name)}
                </span>
                <div className="min-w-0">
                    <p className={`truncate text-[15px] font-semibold text-[#111111] ${font}`}>{review.name}</p>
                    <p className={`text-xs text-[#6b6b7a] ${font}`}>
                        {review.country} · {review.reviewsCount} review{review.reviewsCount > 1 ? 's' : ''}
                    </p>
                </div>
            </header>

            {/* Rating row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-3">
                    <Stars value={review.rating} size="sm" label={`Rated ${review.rating} out of 5`} />
                    {review.verified && (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium text-[#5f9a24] ${font}`}>
                            <VerifiedIcon /> Verified
                        </span>
                    )}
                </div>
                <time dateTime={review.date} className={`text-xs text-[#6b6b7a] ${font}`}>
                    {fmtDate(review.date)}
                </time>
            </div>

            <h3 className="mt-3 font-['Anybody',sans-serif] text-lg font-bold leading-snug text-[#1d1650]">{review.title}</h3>
            <p className={`mt-2 text-sm leading-[1.75] text-[#3a3a48] ${font}`}>
                {body}{' '}
                {long && (
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="font-semibold text-[#1d1650] underline-offset-2 hover:underline"
                    >
                        {expanded ? 'See less' : 'See more'}
                    </button>
                )}
            </p>

            <p className={`mt-3 text-xs text-[#6b6b7a] ${font}`}>
                <strong className="font-semibold text-[#3a3a48]">Date of experience:</strong> {fmtDate(review.experienceDate)}
                <span className="mx-2 text-[#c4c4d0]">|</span>
                <span className="rounded-full bg-[#f2f1fa] px-2.5 py-0.5 font-medium text-[#1d1650]">{review.service}</span>
            </p>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-1 border-t border-[#f0f0f5] pt-3">
                <button
                    type="button"
                    onClick={() => setUseful((v) => !v)}
                    aria-pressed={useful}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition hover:bg-[#f2f2f6] ${font} ${useful ? 'text-[#5f9a24]' : 'text-[#6b6b7a]'
                        }`}
                >
                    <ThumbIcon filled={useful} /> Useful
                </button>
                <button
                    type="button"
                    onClick={share}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#6b6b7a] transition hover:bg-[#f2f2f6] ${font}`}
                >
                    <ShareIcon /> {copied ? 'Link copied!' : 'Share'}
                </button>
            </div>

            {/* Company reply */}
            {review.reply && (
                <div className="mt-4 rounded-xl border-l-[3px] border-[#8ac44b] bg-[#f7f9f3] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className={`text-sm font-semibold text-[#1d1650] ${font}`}>Reply from {COMPANY_NAME}</p>
                        <time dateTime={review.reply.date} className={`text-xs text-[#6b6b7a] ${font}`}>
                            {fmtDate(review.reply.date)}
                        </time>
                    </div>
                    <p className={`mt-1.5 text-sm leading-relaxed text-[#3a3a48] ${font}`}>{review.reply.body}</p>
                </div>
            )}
        </article>
    );
};

/* ---------------- Section ---------------- */

const ReviewsSection = ({ onWriteReview }: { onWriteReview?: () => void }) => {
    const [starFilter, setStarFilter] = useState<number[]>([]);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<Sort>('recent');
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [page, setPage] = useState(1);
    const listTop = useRef<HTMLDivElement | null>(null);

    /* Summary numbers — always from the full list */
    const total = REVIEWS.length;
    const average = total ? REVIEWS.reduce((s, r) => s + r.rating, 0) / total : 0;
    const avg = Math.round(average * 10) / 10;
    const counts = [5, 4, 3, 2, 1].map((n) => ({ n, count: REVIEWS.filter((r) => r.rating === n).length }));
    const negative = REVIEWS.filter((r) => r.rating <= 2);
    const replyRate = negative.length ? Math.round((negative.filter((r) => r.reply).length / negative.length) * 100) : 100;
    const verifiedRate = total ? Math.round((REVIEWS.filter((r) => r.verified).length / total) * 100) : 0;

    /* Filtered + sorted list */
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = REVIEWS.filter(
            (r) =>
                (!starFilter.length || starFilter.includes(r.rating)) &&
                (!verifiedOnly || r.verified) &&
                (!q || `${r.title} ${r.body} ${r.name} ${r.service}`.toLowerCase().includes(q))
        );
        return [...list].sort((a, b) => {
            if (sort === 'highest') return b.rating - a.rating || b.date.localeCompare(a.date);
            if (sort === 'lowest') return a.rating - b.rating || b.date.localeCompare(a.date);
            return b.date.localeCompare(a.date);
        });
    }, [starFilter, query, sort, verifiedOnly]);

    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const current = Math.min(page, pages);
    const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
    const hasFilters = starFilter.length > 0 || query !== '' || verifiedOnly;

    const toggleStar = (n: number) => {
        setStarFilter((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
        setPage(1);
    };

    const clearAll = () => {
        setStarFilter([]);
        setQuery('');
        setVerifiedOnly(false);
        setPage(1);
    };

    const goTo = (p: number) => {
        setPage(p);
        listTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="all-reviews" className="scroll-mt-24 bg-[#f6f6fa] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
                {/* ================= Main column ================= */}
                <div className="min-w-0">
                    {/* ---------- Summary ---------- */}
                    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[#ececf2] bg-white p-6 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
                        <div>
                            <h2 className="font-['Anybody',sans-serif] text-2xl font-bold text-[#1d1650]">
                                Reviews <span className="font-light text-[#6b6b7a]">{total}</span>
                            </h2>
                            <p className="mt-3 flex items-baseline gap-2">
                                <span className="font-['Anybody',sans-serif] text-5xl font-bold text-[#111111]">{avg.toFixed(1)}</span>
                                <span className={`text-sm font-semibold text-[#1d1650] ${font}`}>{scoreLabel(average)}</span>
                            </p>
                            <div className="mt-3">
                                <Stars value={average} size="md" label={`Average rating ${avg} out of 5`} />
                            </div>
                            <button
                                type="button"
                                onClick={onWriteReview}
                                className={`mt-5 inline-flex h-10 items-center rounded-full bg-[#1d1650] px-6 text-sm font-semibold text-white transition hover:bg-[#2c2270] ${font}`}
                            >
                                Write a Review
                            </button>
                        </div>

                        {/* Distribution bars = filters */}
                        <ul className="flex flex-col justify-center gap-2.5" aria-label="Filter by rating">
                            {counts.map(({ n, count }) => {
                                const pct = total ? Math.round((count / total) * 100) : 0;
                                const on = starFilter.includes(n);
                                return (
                                    <li key={n}>
                                        <button
                                            type="button"
                                            onClick={() => toggleStar(n)}
                                            aria-pressed={on}
                                            disabled={count === 0}
                                            className={`grid w-full grid-cols-[22px_56px_minmax(0,1fr)_42px] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-[#f6f6fa] disabled:cursor-not-allowed disabled:opacity-50 ${font}`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`flex h-[18px] w-[18px] items-center justify-center rounded border ${on ? 'border-[#1d1650] bg-[#1d1650] text-white' : 'border-[#c4c4d0] bg-white'
                                                    }`}
                                            >
                                                {on && (
                                                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden="true">
                                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                                    </svg>
                                                )}
                                            </span>
                                            <span className="text-sm text-[#3a3a48]">{n}-star</span>
                                            <span className="h-2.5 overflow-hidden rounded-full bg-[#e8e8ef]">
                                                <span className="block h-full rounded-full bg-[#8ac44b]" style={{ width: `${pct}%` }} />
                                            </span>
                                            <span className="text-right text-sm text-[#6b6b7a]">{pct}%</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* ---------- Toolbar ---------- */}
                    <div ref={listTop} className="mt-6 scroll-mt-28 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <label className="relative flex-1">
                            <span className="sr-only">Search reviews</span>
                            <span className="pointer-events-none absolute left-3.5 top-1/2 translate-y-[-50%] text-[#8d8d99]">
                                <SearchIcon />
                            </span>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search reviews"
                                className={`h-11 w-full rounded-full border border-[#dcdce6] bg-white pl-10 pr-4 text-sm text-[#111111] outline-none transition placeholder:text-[#a0a0ac] focus:border-[#1d1650] ${font}`}
                            />
                        </label>

                        <div className="flex items-center gap-3">
                            <label className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#dcdce6] bg-white px-4 text-sm text-[#3a3a48] ${font}`}>
                                <input
                                    type="checkbox"
                                    checked={verifiedOnly}
                                    onChange={(e) => {
                                        setVerifiedOnly(e.target.checked);
                                        setPage(1);
                                    }}
                                    className="h-4 w-4 accent-[#8ac44b]"
                                />
                                Verified
                            </label>

                            <label className="relative">
                                <span className="sr-only">Sort reviews</span>
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value as Sort);
                                        setPage(1);
                                    }}
                                    className={`h-11 appearance-none rounded-full border border-[#dcdce6] bg-white pl-4 pr-9 text-sm text-[#3a3a48] outline-none focus:border-[#1d1650] ${font}`}
                                >
                                    <option value="recent">Most recent</option>
                                    <option value="highest">Highest rated</option>
                                    <option value="lowest">Lowest rated</option>
                                </select>
                                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 translate-y-[-50%] text-[#6b6b7a]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </label>
                        </div>
                    </div>

                    <div className={`mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-[#6b6b7a] ${font}`}>
                        <p aria-live="polite">
                            Showing <strong className="text-[#1d1650]">{filtered.length}</strong> of {total} reviews
                        </p>
                        {hasFilters && (
                            <button type="button" onClick={clearAll} className="font-semibold text-[#1d1650] hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* ---------- List ---------- */}
                    <div className="mt-4 space-y-4">
                        {visible.length ? (
                            visible.map((r) => <ReviewCard key={r.id} review={r} />)
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#d4d4dc] bg-white px-6 py-12 text-center">
                                <p className="font-['Anybody',sans-serif] text-lg font-bold text-[#1d1650]">No reviews match your filters</p>
                                <button type="button" onClick={clearAll} className={`mt-3 text-sm font-semibold text-[#5f9a24] hover:underline ${font}`}>
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ---------- Pagination ---------- */}
                    {pages > 1 && (
                        <nav aria-label="Reviews pages" className={`mt-8 flex items-center justify-center gap-2 ${font}`}>
                            <button
                                type="button"
                                onClick={() => goTo(current - 1)}
                                disabled={current === 1}
                                className="h-10 rounded-full border border-[#dcdce6] bg-white px-4 text-sm font-medium text-[#1d1650] transition hover:border-[#1d1650] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>
                            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => goTo(p)}
                                    aria-current={p === current ? 'page' : undefined}
                                    className={`h-10 w-10 rounded-full text-sm font-semibold transition ${p === current ? 'bg-[#1d1650] text-white' : 'border border-[#dcdce6] bg-white text-[#1d1650] hover:border-[#1d1650]'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => goTo(current + 1)}
                                disabled={current === pages}
                                className="h-10 rounded-full border border-[#dcdce6] bg-white px-4 text-sm font-medium text-[#1d1650] transition hover:border-[#1d1650] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </div>

                {/* ================= Sidebar ================= */}
                <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-2xl bg-[#1d1650] p-6 text-white">
                        <p className="font-['Anybody',sans-serif] text-lg font-bold">About {COMPANY_NAME}</p>
                        <p className={`mt-2 text-sm leading-relaxed text-white/75 ${font}`}>
                            AI-powered automation for Amazon, Shopify and TikTok Shop sellers — support, orders, inventory and upselling on
                            autopilot.
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {SERVICES.map((s) => (
                                <li key={s.to} className={`rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 ${font}`}>
                                    {s.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-[#ececf2] bg-white p-5">
                            <p className="font-['Anybody',sans-serif] text-3xl font-bold text-[#1d1650]">{replyRate}%</p>
                            <p className={`mt-1 text-xs leading-snug text-[#6b6b7a] ${font}`}>of negative reviews replied to</p>
                        </div>
                        <div className="rounded-2xl border border-[#ececf2] bg-white p-5">
                            <p className="font-['Anybody',sans-serif] text-3xl font-bold text-[#1d1650]">{verifiedRate}%</p>
                            <p className={`mt-1 text-xs leading-snug text-[#6b6b7a] ${font}`}>verified customer reviews</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#ececf2] bg-white p-6">
                        <p className="font-['Anybody',sans-serif] text-base font-bold text-[#1d1650]">How reviews work</p>
                        <p className={`mt-2 text-sm leading-relaxed text-[#6b6b7a] ${font}`}>
                            Reviews marked <span className="font-semibold text-[#5f9a24]">Verified</span> come from customers we have
                            confirmed worked with us. We publish positive and negative reviews alike, and we never pay for or edit reviews.
                        </p>
                        <button
                            type="button"
                            onClick={onWriteReview}
                            className={`mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#8ac44b] text-sm font-semibold text-white transition hover:brightness-110 ${font}`}
                        >
                            Share your experience
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default ReviewsSection;