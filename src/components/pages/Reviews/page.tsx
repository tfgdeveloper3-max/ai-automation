import { useCallback, useState } from 'react';

import FooterSection from '../../FooterSection';
import ReviewsHero from '@/components/Reviews/ReviewsHero';
import ReviewsSection from '@/components/Reviews/ReviewsSection';
import WriteReviewModal from '@/components/Reviews/WriteReviewModal';

const ReviewsPage = () => {
    const [writing, setWriting] = useState(false);
    const openForm = useCallback(() => setWriting(true), []);
    const closeForm = useCallback(() => setWriting(false), []);

    return (
        <>
            <ReviewsHero onWriteReview={openForm} />
            <main>
                <ReviewsSection onWriteReview={openForm} />
                <FooterSection />
            </main>
            <WriteReviewModal open={writing} onClose={closeForm} />
        </>
    );
};

export default ReviewsPage;