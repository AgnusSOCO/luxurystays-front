import { HeroSection } from '../components/landing/HeroSection';
import { TrustStrip } from '../components/landing/TrustStrip';
import { ListingSection } from '../components/landing/ListingSection';
import { ThingsToDoSection } from '../components/landing/ThingsToDoSection';
import { AboutSection } from '../components/landing/AboutSection';
import { CommitmentSection } from '../components/landing/CommitmentSection';
import { CTASection } from '../components/landing/CTASection';
import { TestimonialSection } from '../components/landing/TestimonialSection';

export const Home = () => {
    return (
        <>
            <HeroSection />
            <TrustStrip />

            {/* Featured Properties */}
            <ListingSection />

            {/* Things to Do Near Our Properties */}
            <ThingsToDoSection />

            <AboutSection />

            <TestimonialSection />

            <CommitmentSection />

            <CTASection />
        </>
    );
};
