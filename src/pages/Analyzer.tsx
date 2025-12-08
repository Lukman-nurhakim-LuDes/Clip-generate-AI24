import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link2, Brain, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import ProgressSteps from "@/components/analyzer/ProgressSteps";
import ClipCard from "@/components/analyzer/ClipCard";
import { VideoPlayerModal } from "@/components/analyzer/VideoPlayerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  title?: string;
  emotionType?: string;
}

interface ViralMoment {
  startTime: number;
  endTime: number;
  score: number;
  reason: string;
  transcript: string;
  emotionType: string;
}

interface GeneratedClip {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  transcript: string;
  viralScore: number;
  emotionType: string;
  title: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const thumbnails = [
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541f7f7b9e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=600&fit=crop",
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

  const updateStep = async (stepIndex: number) => {
    setCurrentStep(stepIndex);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const completeStep = (stepId: string) => {
    setCompletedSteps((prev) => [...prev, stepId]);
  };

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

    try {
      // Step 1: Fetching Video
      await updateStep(0);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      completeStep("fetch");

      // Step 2: Speech Recognition (calling analyze-video which includes mock transcription)
      await updateStep(1);
      
      console.log("Calling analyze-video edge function...");
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-video', {
        body: { videoUrl }
      });

      if (analysisError) {
        console.error("Analysis error:", analysisError);
        throw new Error(analysisError.message || 'Failed to analyze video');
      }

      console.log("Analysis response:", analysisData);
      completeStep("speech");

      // Step 3: Emotional Analysis
      await updateStep(2);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      completeStep("emotion");

      // Step 4: Scene Detection
      await updateStep(3);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      completeStep("scene");

      // Step 5: Generate Clips
      await updateStep(4);
      
      const viralMoments: ViralMoment[] = analysisData?.viralMoments || [];
      
      if (viralMoments.length > 0) {
        console.log("Calling generate-clips edge function...");
        const { data: clipsData, error: clipsError } = await supabase.functions.invoke('generate-clips', {
          body: {
            viralMoments,
            subtitleStyle: 'TikTok Bold',
            clipDuration: 45,
          }
        });

        if (clipsError) {
          console.error("Clips generation error:", clipsError);
          throw new Error(clipsError.message || 'Failed to generate clips');
        }

        console.log("Clips response:", clipsData);
        
        // Transform generated clips to our Clip interface
        const generatedClips: GeneratedClip[] = clipsData?.clips || [];
        const formattedClips: Clip[] = generatedClips.map((clip, index) => ({
          id: clip.id,
          thumbnail: thumbnails[index % thumbnails.length],
          duration: `${Math.round(clip.duration)}s`,
          score: clip.viralScore,
          subtitle: `"${clip.transcript.substring(0, 40)}..."`,
          startTime: formatTime(clip.startTime),
          endTime: formatTime(clip.endTime),
          title: clip.title,
          emotionType: clip.emotionType,
        }));

        setClips(formattedClips);
        completeStep("clips");
        
        toast({
          title: "✅ Analysis Complete!",
          description: `Generated ${formattedClips.length} viral clips using AI`,
        });
      } else {
        // No viral moments found, use fallback
        completeStep("clips");
        toast({
          title: "Analysis Complete",
          description: "No viral moments detected. Try a different video.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setCurrentStep(-1);
      setIsAnalyzing(false);
    }
  };

  const handleDownload = (clip: Clip) => {
    toast({ 
      title: "⏳ Memproses Download...", 
      description: `Clip ${clip.startTime} - ${clip.endTime} sedang disiapkan` 
    });
    setTimeout(() => {
      const dummyContent = `ViralClip Export\n\nClip: ${clip.id}\nTitle: ${clip.title || 'Viral Clip'}\nDuration: ${clip.duration}\nTimestamp: ${clip.startTime} - ${clip.endTime}\nSubtitle: ${clip.subtitle}\nViral Score: ${clip.score}%\nEmotion Type: ${clip.emotionType || 'N/A'}\n\n---\nCatatan: Ini adalah file placeholder.\nUntuk video rendering diperlukan integrasi video processing.`;
      
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
        description: "Clip info exported. Video rendering coming soon!" 
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Video Analyzer - ViralClip</title>
        <meta name="description" content="Analyze your YouTube video and generate viral clips automatically." />
      </Helmet>

      <div className="min-h-[100dvh] bg-background pb-24 md:pb-16">
        <Navbar />
        
        <main className="pt-20 sm:pt-28 pb-8 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                Video <span className="gradient-text">Analyzer</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                Paste your YouTube link and let AI detect the most viral moments
              </p>
            </motion.div>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-3 sm:p-4 mb-6 sm:mb-8 max-w-2xl mx-auto"
            >
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Link2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pl-10 sm:pl-12 h-11 sm:h-12 bg-muted/50 border-0 rounded-xl text-sm sm:text-base"
                    disabled={isAnalyzing}
                  />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="w-full h-11 sm:h-12"
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
                className="glass-card p-4 sm:p-6 max-w-xl mx-auto mb-6 sm:mb-8"
              >
                <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
                <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Generated Clips ({clips.length})
                  </h2>
                  <Button variant="glass" size="sm" className="gap-2 text-xs sm:text-sm">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Export All</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
                      onRegenerate={() => toast({ title: "Regenerating clip...", description: "AI sedang membuat ulang clip" })}
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
          onRegenerate={() => toast({ title: "Regenerating clip...", description: "AI sedang membuat ulang clip" })}
          onChangeStyle={() => {
            setIsModalOpen(false);
            navigate("/styles");
          }}
        />
        
        <MobileNav />
      </div>
    </>
  );
};

export default Analyzer;
