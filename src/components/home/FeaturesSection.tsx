import { motion } from "framer-motion";
import { 
  Brain, 
  Scissors, 
  Smartphone, 
  Type, 
  Download, 
  Sparkles 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Viral Detection",
      description: "Smart detection of emotional peaks, punchlines, and engaging moments",
    },
    {
      icon: Scissors,
      title: "Auto Clip Generation",
      description: "Generate 30-60 second clips from viral moments automatically",
    },
    {
      icon: Smartphone,
      title: "9:16 Auto Reframe",
      description: "Face tracking and smart cropping for perfect vertical videos",
    },
    {
      icon: Type,
      title: "Dynamic Subtitles",
      description: "Word-by-word animated captions with keyword highlights",
    },
    {
      icon: Download,
      title: "1080p Export",
      description: "High-quality MP4 export with hardcoded subtitles",
    },
    {
      icon: Sparkles,
      title: "Style Templates",
      description: "TikTok Bold, MrBeast, Podcast styles and more",
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to Go <span className="gradient-text">Viral</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI tools that transform long-form content into viral shorts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;