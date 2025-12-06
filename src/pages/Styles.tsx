import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StyleCard from "@/components/styles/StyleCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const captionStyles = [
  {
    id: "tiktok-bold",
    name: "TikTok Bold",
    preview: "This is INSANE!",
    font: "Inter, sans-serif",
    color: "#FFFFFF",
    bgColor: "#1a1a2e",
  },
  {
    id: "mrbeast",
    name: "MrBeast Style",
    preview: "NO WAY!!!",
    font: "Impact, sans-serif",
    color: "#FFFF00",
    bgColor: "#0f0f23",
  },
  {
    id: "podcast",
    name: "Clean Podcast",
    preview: "Let me explain...",
    font: "Georgia, serif",
    color: "#E0E0E0",
    bgColor: "#1e1e2f",
  },
  {
    id: "meme-pop",
    name: "Meme Pop",
    preview: "Wait what?!",
    font: "Comic Sans MS, cursive",
    color: "#FF6B6B",
    bgColor: "#16213e",
  },
  {
    id: "cinematic",
    name: "Cinematic Neon",
    preview: "Incredible...",
    font: "Helvetica, sans-serif",
    color: "#00F5FF",
    bgColor: "#0a0a1a",
  },
  {
    id: "motivational",
    name: "Motivational Gold",
    preview: "You CAN do it!",
    font: "Times New Roman, serif",
    color: "#FFD700",
    bgColor: "#1a1a1a",
  },
];

const Styles = () => {
  const [selectedStyle, setSelectedStyle] = useState("tiktok-bold");
  const { toast } = useToast();

  const handleApplyStyle = () => {
    toast({
      title: "Style Applied!",
      description: `${captionStyles.find(s => s.id === selectedStyle)?.name} is now your default style.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Caption Styles - ViralClip</title>
        <meta name="description" content="Choose from various caption styles for your viral clips." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Caption Templates</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Choose Your <span className="gradient-text">Style</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Select a caption style that matches your content's vibe
              </p>
            </motion.div>

            {/* Styles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {captionStyles.map((style, index) => (
                <StyleCard
                  key={style.id}
                  style={style}
                  isSelected={selectedStyle === style.id}
                  onSelect={() => setSelectedStyle(style.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Apply Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Button variant="gradient" size="xl" onClick={handleApplyStyle} className="gap-2">
                <Check className="w-5 h-5" />
                Apply Selected Style
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Styles;