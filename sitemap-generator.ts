import { SitemapStream, streamToPromise, EnumChangefreq } from "sitemap";
import type { SitemapItemLoose } from "sitemap";
import fs from "fs";
import path from "path";

const HOSTNAME = "https://amzautomationsolutions.com";

interface SitemapRoute extends SitemapItemLoose {
    url: string;
    changefreq: EnumChangefreq;
    priority: number;
    lastmod?: string;
}

const routes: SitemapRoute[] = [
    { url: "/", changefreq: EnumChangefreq.WEEKLY, priority: 1.0 },
    { url: "/service", changefreq: EnumChangefreq.MONTHLY, priority: 0.9 },

    { url: "/service/shopify-automation", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/service/tiktok-automation", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/service/walmart-automation", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/service/ebay-automation", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/service/etsy-automation", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },

    { url: "/about", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/reviews", changefreq: EnumChangefreq.WEEKLY, priority: 0.8 },
    { url: "/affiliate", changefreq: EnumChangefreq.MONTHLY, priority: 0.7 },
    { url: "/contact", changefreq: EnumChangefreq.MONTHLY, priority: 0.7 },

    { url: "/automation-services", changefreq: EnumChangefreq.MONTHLY, priority: 0.7 },

    { url: "/terms-and-conditions", changefreq: EnumChangefreq.YEARLY, priority: 0.3 },
    { url: "/privacy-policy", changefreq: EnumChangefreq.YEARLY, priority: 0.3 },
    { url: "/refund-policy", changefreq: EnumChangefreq.YEARLY, priority: 0.3 },
];

async function generateSitemap(): Promise<void> {
    const outputDir = path.resolve("./public");
    const sitemapPath = path.join(outputDir, "sitemap.xml");

    const seen = new Set<string>();
    for (const route of routes) {
        if (seen.has(route.url)) {
            throw new Error(`Duplicate URL in sitemap routes: ${route.url}`);
        }
        seen.add(route.url);
    }

    const sitemapStream = new SitemapStream({ hostname: HOSTNAME });
    routes.forEach((route) => sitemapStream.write(route));
    sitemapStream.end();

    const xml: Buffer = await streamToPromise(sitemapStream);

    await fs.promises.mkdir(outputDir, { recursive: true });
    await fs.promises.writeFile(sitemapPath, xml.toString());

    console.log(`Sitemap generated with ${routes.length} URLs at: ${sitemapPath}`);
}

generateSitemap().catch((err: unknown) => {
    console.error("Sitemap generation failed:", err);
    process.exit(1);
});