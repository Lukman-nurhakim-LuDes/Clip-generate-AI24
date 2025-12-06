import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
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

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
        </main>
      </div>
    </>
  );
};

export default Index;