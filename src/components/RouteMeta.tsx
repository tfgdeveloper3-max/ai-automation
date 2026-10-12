import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'AMZ Automation Solutions';

interface PageMeta {
    title: string;
    description: string;
}

const META: Record<string, PageMeta> = {
    '/': {
        title: `${SITE_NAME} | Amazon, Shopify & TikTok Automation`,
        description:
            'Grow your eCommerce business on autopilot. AMZ Automation Solutions automates Amazon, Shopify and TikTok Shop stores so you can scale with less effort.',
    },
    '/about': {
        title: `About Us | ${SITE_NAME}`,
        description:
            'Meet the team behind AMZ Automation Solutions. Learn how we help 1k+ brands automate and grow their Amazon, Shopify and TikTok Shop businesses.',
    },
    '/service': {
        title: `Automation Services | ${SITE_NAME}`,
        description:
            'Explore our Amazon wholesale, Shopify and TikTok Shop automation services. Done-for-you store management built to increase sales and save time.',
    },
    '/blog': {
        title: `Blog – eCommerce Automation Tips | ${SITE_NAME}`,
        description:
            'Read the latest guides, tips and insights on Amazon, Shopify and TikTok Shop automation from the AMZ Automation Solutions team.',
    },
    '/affiliate': {
        title: `Affiliate Program | ${SITE_NAME}`,
        description:
            'Join the AMZ Automation Solutions affiliate program. Refer clients from anywhere in the world and earn rewards for every successful partnership.',
    },
    '/contact': {
        title: `Contact Us | ${SITE_NAME}`,
        description:
            'Get in touch with AMZ Automation Solutions. Call, email or send us a message and our team will help you start automating your store.',
    },
};

const NOT_FOUND: PageMeta = {
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you are looking for does not exist. Go back to AMZ Automation Solutions home page.',
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

const RouteMeta = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
        const meta = META[path] ?? NOT_FOUND;

        document.title = meta.title;
        setMeta('name', 'description', meta.description);
        setMeta('property', 'og:title', meta.title);
        setMeta('property', 'og:description', meta.description);
        setMeta('property', 'og:site_name', SITE_NAME);
        setMeta('name', 'twitter:title', meta.title);
        setMeta('name', 'twitter:description', meta.description);
    }, [pathname]);

    return null;
};

export default RouteMeta;