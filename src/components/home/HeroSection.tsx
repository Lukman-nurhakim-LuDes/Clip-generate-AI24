import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles, ArrowRight, Zap, Clock, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (youtubeUrl.trim()) {
      navigate(`/analyzer?url=${encodeURIComponent(youtubeUrl)}`);
    }
  };

  const features = [
    { icon: Zap, label: "AI-Powered" },
    { icon: Clock, label: "30-60s Clips" },
    { icon: Wand2, label: "Auto Reframe" },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">AI-Powered Video Clipping</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Paste YouTube Link
          <br />
          <span className="gradient-text">Generate Viral Clips</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Transform any YouTube video into scroll-stopping TikTok & Shorts clips.
          AI detects viral moments, adds captions, and reframes automatically.
        </motion.p>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="glass-card p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Play className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Paste YouTube URL here..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="pl-12 h-14 bg-muted/50 border-0 text-base rounded-xl"
              />
            </div>
            <Button
              variant="gradient"
              size="lg"
              onClick={handleAnalyze}
              className="gap-2 min-w-[160px]"
            >
              Analyze
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16"
        >
          <div className="glass-card p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-muted to-background overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="w-24 sm:w-32 aspect-[9/16] rounded-xl bg-gradient-to-b from-primary/20 to-secondary/20 border border-border/50 flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-primary/50" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;