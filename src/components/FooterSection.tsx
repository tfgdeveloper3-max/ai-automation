import { Phone, Mail, MapPin, Send } from "lucide-react";

const GREEN = "#7EC242";

const USEFUL_LINKS = ["Home", "About", "Services", "Projects", "Contact us"];

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

function FacebookIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
            <path d="M13.5 9H15V6.5h-1.5C11.6 6.5 10.5 7.6 10.5 9.5V11H9v2.5h1.5V21h2.5v-7.5H15l.5-2.5h-2v-1c0-.55.45-1 1-1Z" />
        </svg>
    );
}

function TwitterIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
            <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
        </svg>
    );
}

function LinkedinIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
            <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 4a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 4ZM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.97V20H9.68V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.21-1.77 3.44 0 4.26 2.26 4.26 5.2V20Z" />
        </svg>
    );
}

const SOCIALS = [
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

/** Fixed constellation points for the top-right network pattern. */
const NODES = [
    { x: 760, y: 10 },
    { x: 830, y: 40 },
    { x: 900, y: 15 },
    { x: 880, y: 90 },
    { x: 950, y: 70 },
    { x: 820, y: 110 },
    { x: 760, y: 80 },
    { x: 900, y: 150 },
    { x: 700, y: 130 },
    { x: 840, y: 170 },
];

const LINKS = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [3, 5],
    [0, 6],
    [5, 6],
    [3, 7],
    [5, 8],
    [5, 9],
    [7, 9],
];

function NetworkPattern() {
    return (
        <svg
            viewBox="0 0 960 220"
            className="pointer-events-none absolute right-0 top-0 h-[220px] w-[960px] max-w-full opacity-60"
            preserveAspectRatio="xMaxYMin meet"
        >
            {LINKS.map(([a, b], i) => (
                <line
                    key={i}
                    x1={NODES[a].x}
                    y1={NODES[a].y}
                    x2={NODES[b].x}
                    y2={NODES[b].y}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth={1}
                />
            ))}
            {NODES.map((n, i) => (
                <circle key={i} cx={n.x} cy={n.y} r={2.5} fill="rgba(255,255,255,0.55)" />
            ))}
        </svg>
    );
}

export default function FooterSection() {
    return (
        <footer
            className="relative w-full overflow-hidden pb-8 pt-16 text-neutral-300"
            style={{
                backgroundColor: "#0a0a0a",
                backgroundImage:
                    "repeating-linear-gradient(115deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 90px)",
            }}
        >
            <NetworkPattern />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* About + socials */}
                    <div>
                        <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit aut elit
                            tellus luctus nec ulla corper mattis aulvinar daibus leo.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-900 transition-transform duration-200 hover:-translate-y-0.5"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    <s.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful links */}
                    <div>
                        <h4 className="mb-5 text-lg font-semibold text-white">Useful Links</h4>
                        <ul className="flex flex-col gap-3">
                            {USEFUL_LINKS.map((link) => (
                                <li key={link} className="flex items-center gap-2">
                                    <span
                                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: GREEN }}
                                    />
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-300 transition-colors hover:text-white"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-5 text-lg font-semibold text-white">Contact Us</h4>
                        <ul className="flex flex-col gap-4 text-sm text-neutral-300">
                            <li className="flex items-center gap-3">
                                <Phone size={15} style={{ color: GREEN }} />
                                <a href="tel:+10012345789" className="hover:text-white">
                                    +00 1 2345 789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={15} style={{ color: GREEN }} />
                                <a href="mailto:info@lonam.com" className="hover:text-white">
                                    info@lonam.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: GREEN }} />
                                <span>
                                    adipiscing elit aut elit tellus
                                    <br />
                                    luctus nec ulla
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-5 text-lg font-semibold text-white">Newsletter</h4>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-stretch overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10"
                        >
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="flex w-12 shrink-0 items-center justify-center text-neutral-900 transition-colors hover:brightness-110"
                                style={{ backgroundColor: GREEN }}
                            >
                                <Send size={16} />
                            </button>
                        </form>

                        <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
                            <input
                                type="checkbox"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#7EC242]"
                            />
                            quis autem vel eum iure reprehenderit rui in ea voluptate esse.
                        </label>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-neutral-500">
                    Copyright © 2026 | All rights reserved.
                </div>
            </div>
        </footer>
    );
}