import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ViralClip - AI YouTube to TikTok/Shorts Clip Generator</title>
        <meta 
          name="description" 
          content="Transform YouTube videos into viral TikTok and Shorts clips automatically. AI-powered viral moment detection, auto-reframe, and dynamic subtitles." 
        />
      </Helmet>

      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
        </main>
        <MobileNav />
      </div>
    </>
  );
};

export default Index;