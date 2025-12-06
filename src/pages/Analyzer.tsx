import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link2, Video, Brain, Scissors, Type, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProgressSteps from "@/components/analyzer/ProgressSteps";
import ClipCard from "@/components/analyzer/ClipCard";
import { VideoPlayerModal } from "@/components/analyzer/VideoPlayerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const analysisSteps = [
  { id: "fetch", label: "Fetching Video", description: "Downloading video and extracting metadata" },
  { id: "speech", label: "Speech Recognition", description: "Transcribing audio with timestamps" },
  { id: "emotion", label: "Emotional Analysis", description: "Detecting viral moments and peaks" },
  { id: "scene", label: "Scene Detection", description: "Identifying natural cut points" },
  { id: "clips", label: "Generating Clips", description: "Creating optimized 30-60s clips" },
];

interface Clip {
  id: string;
  thumbnail: string;
  duration: string;
  score: number;
  subtitle: string;
  startTime: string;
  endTime: string;
}

const mockClips: Clip[] = [
  { id: "1", thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=600&fit=crop", duration: "45s", score: 94, subtitle: '"This is absolutely INSANE!"', startTime: "2:34", endTime: "3:19" },
  { id: "2", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=600&fit=crop", duration: "38s", score: 89, subtitle: '"No way, that actually worked?"', startTime: "5:12", endTime: "5:50" },
  { id: "3", thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f7b9e?w=400&h=600&fit=crop", duration: "52s", score: 87, subtitle: '"Let me show you something crazy..."', startTime: "8:45", endTime: "9:37" },
  { id: "4", thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=600&fit=crop", duration: "41s", score: 82, subtitle: '"Wait, wait, wait..."', startTime: "12:20", endTime: "13:01" },
];

const Analyzer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlFromQuery = searchParams.get("url") || "";
  const [videoUrl, setVideoUrl] = useState(urlFromQuery);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (urlFromQuery) {
      startAnalysis();
    }
  }, []);

  const startAnalysis = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setClips([]);
    setCompletedSteps([]);

    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));
      setCompletedSteps((prev) => [...prev, analysisSteps[i].id]);
    }

    setCurrentStep(-1);
    setClips(mockClips);
    setIsAnalyzing(false);
    
    toast({
      title: "✅ Analysis Complete!",
      description: `Generated ${mockClips.length} viral clips`,
    });
  };

  const handleDownload = (clip: Clip) => {
    toast({ 
      title: "⏳ Memproses Download...", 
      description: `Clip ${clip.startTime} - ${clip.endTime} sedang disiapkan` 
    });
    setTimeout(() => {
      const dummyContent = `ViralClip Export\n\nClip: ${clip.id}\nDuration: ${clip.duration}\nTimestamp: ${clip.startTime} - ${clip.endTime}\nSubtitle: ${clip.subtitle}\nViral Score: ${clip.score}%\n\n---\nCatatan: Ini adalah file placeholder.\nUntuk menghasilkan video clip sesungguhnya, diperlukan koneksi ke Lovable Cloud backend.`;
      
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `viralclip-${clip.id}-${clip.startTime.replace(':', '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({ 
        title: "✅ Download Berhasil!", 
        description: "File placeholder telah diunduh. Hubungkan ke Cloud untuk video asli." 
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Video Analyzer - ViralClip</title>
        <meta name="description" content="Analyze your YouTube video and generate viral clips automatically." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-28 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Video <span className="gradient-text">Analyzer</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Paste your YouTube link and let AI detect the most viral moments
              </p>
            </motion.div>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pl-12 h-12 bg-muted/50 border-0 rounded-xl"
                    disabled={isAnalyzing}
                  />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="min-w-[140px]"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </motion.div>

            {/* Analysis Progress */}
            {(isAnalyzing || completedSteps.length > 0) && clips.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 max-w-xl mx-auto mb-8"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Analysis Progress
                </h3>
                <ProgressSteps
                  steps={analysisSteps}
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                />
              </motion.div>
            )}

            {/* Clips Grid */}
            {clips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Generated Clips ({clips.length})
                  </h2>
                  <Button variant="glass" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export All
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {clips.map((clip, index) => (
                    <ClipCard
                      key={clip.id}
                      clip={clip}
                      index={index}
                      onPlay={() => {
                        setSelectedClip(clip);
                        setIsModalOpen(true);
                      }}
                      onDownload={() => handleDownload(clip)}
                      onRegenerate={() => toast({ title: "Regenerating clip...", description: "Fitur ini memerlukan Lovable Cloud" })}
                      onChangeStyle={() => navigate("/styles")}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* Video Player Modal */}
        <VideoPlayerModal
          clip={selectedClip}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDownload={() => {
            if (selectedClip) handleDownload(selectedClip);
          }}
          onRegenerate={() => toast({ title: "Regenerating clip...", description: "Fitur ini memerlukan Lovable Cloud" })}
          onChangeStyle={() => {
            setIsModalOpen(false);
            navigate("/styles");
          }}
        />
      </div>
    </>
  );
};

export default Analyzer;