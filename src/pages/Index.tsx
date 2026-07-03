import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HeroIntro from "@/components/HeroIntro";
import ServicesMarquee from "@/components/ServicesMarquee";
import AboutPreview from "@/components/AboutPreview";
import MeetOurStaff from "@/components/MeetOurStaff";
import TestimonialsSection from "@/components/TestimonialsSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import VideoSection from "@/components/VideoSection";
import FeaturedBlog from "@/components/FeaturedBlog";
import CTASection from "@/components/CTASection";
import ParallaxSection from "@/components/ParallaxSection";
import parallaxForest from "@/assets/parallax-forest.png";
import parallaxHands from "@/assets/parallax-hands.png";
import videoPoster from "@/assets/video-poster-clinical.png";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Pure Botanical Healing & Natural Remedies",
    description: "Welcome to MAINGRACE TRADOMEDICAL SERVICE. Discover natural wellness and professional herbal consultation based on custom diagnosis checks.",
    keywords: "traditional medicine, herbal clinic, natural remedies nigeria, detox massage, blood pressure check"
  });

  return (
    <Layout>
      <HeroSection />
      <MarqueeBanner />
      <HeroIntro />
      <AboutPreview />
      
      {/* Immersive Parallax 1 - Pure Visual */}
      <ParallaxSection image={parallaxForest} />

      <MeetOurStaff />

      <VideoSection 
        subtitle="Heritage & Healing"
        title="Ancestral Roots of Modern Wellness"
        videoUrl="/videos/detoxification-3.mp4"
        posterImage={videoPoster}
        description="Witness the profound intersection of ancient botanical wisdom and contemporary clinical care. Our story is one of restoration, guided by the purest gifts of nature."
      />

      <TestimonialsSection />
      
      {/* Immersive Parallax 2 - Pure Visual */}
      <ParallaxSection image={parallaxHands} height="h-[300px] md:h-[500px]" />

      <FeaturedBlog />
      <CTASection />
    </Layout>
  );
};

export default Index;
