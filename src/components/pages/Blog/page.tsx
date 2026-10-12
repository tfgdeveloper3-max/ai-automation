import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import BlogHero from '@/components/Blog/BlogHero';
import BlogFeatured from '@/components/Blog/BlogFeatured';
import BlogGrid from '@/components/Blog/BlogGrid';

const BlogPage = () => {
    return (
        <>
            <BlogHero />
            <main>
                <BlogFeatured />
                <BlogGrid />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default BlogPage;