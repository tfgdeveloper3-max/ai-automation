import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

const HOSTNAME = "https://amzautomationsolutions.com";

const routes = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/service", changefreq: "monthly", priority: 0.9 },

    { url: "/service/ai-customer-support", changefreq: "monthly", priority: 0.8 },
    { url: "/service/multi-channel-order-sync", changefreq: "monthly", priority: 0.8 },
    { url: "/service/smart-inventory-management", changefreq: "monthly", priority: 0.8 },
    { url: "/service/automated-cross-selling", changefreq: "monthly", priority: 0.8 },

    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/reviews", changefreq: "weekly", priority: 0.8 },
    { url: "/affiliate", changefreq: "monthly", priority: 0.7 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
];

async function generateSitemap() {
    const sitemapPath = path.resolve("./public/sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);
    const sitemapStream = new SitemapStream({ hostname: HOSTNAME });

    sitemapStream.pipe(writeStream);

    const lastmod = new Date().toISOString();
    routes.forEach((route) => {
        sitemapStream.write({ ...route, lastmod });
    });

    sitemapStream.end();
    await streamToPromise(sitemapStream);

    console.log("Sitemap generated successfully at:", sitemapPath);
}

generateSitemap().catch(console.error);