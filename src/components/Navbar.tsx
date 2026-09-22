import { useState } from 'react';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Services', href: '#services' },
    { label: 'Blog', href: '#blog' },
    { label: 'Affiliate', href: '#affiliate' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [active, setActive] = useState('Home');
    const [open, setOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <a href="#home" className="navbar__logo">
                    Logo Here
                </a>

                <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`navbar__link ${active === link.label ? 'navbar__link--active' : ''}`}
                            onClick={() => {
                                setActive(link.label);
                                setOpen(false);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="navbar__cta">
                    <a href="#get-started" className="navbar__btn">
                        Get Started
                    </a>
                    <a href="#get-started" className="navbar__arrow" aria-label="Get started">
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

                <button
                    className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
};

export default Navbar;