import { HeroSection } from '../components/landing/HeroSection';
import { TrustStrip } from '../components/landing/TrustStrip';
import { ListingSection } from '../components/landing/ListingSection';
import { ServicesOverview } from '../components/landing/ServicesOverview';
import { AboutSection } from '../components/landing/AboutSection';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { CommitmentSection } from '../components/landing/CommitmentSection';
import { CTASection } from '../components/landing/CTASection';
import { ComparisonGrid } from '../components/landing/ComparisonGrid';
import { TestimonialSection } from '../components/landing/TestimonialSection';

export const Home = () => {
    return (
        <>
            <HeroSection />
            <TrustStrip />

            {/* Booking Section - Moved up for better conversion */}
            <ListingSection />

            <ServicesOverview />

            <ComparisonGrid />

            <AboutSection />
            <WhyChooseUs />

            <TestimonialSection />

            <CommitmentSection />

            <CTASection />
        </>
    );
};
