import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Settings, Download, Monitor, Type, Users, Zap, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const [settings, setSettings] = useState({
    duration: [45],
    subtitleStyle: "tiktok-bold",
    autoCrop: true,
    highlightKeywords: true,
    speakerDetection: true,
    fps: "30",
  });
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your clips are being processed. This may take a few minutes.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Export Settings - ViralClip</title>
        <meta name="description" content="Configure export settings for your viral clips." />
      </Helmet>

      <div className="min-h-[100dvh] bg-background pb-24 md:pb-16">
        <Navbar />

        <main className="pt-20 sm:pt-28 pb-8 px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm text-primary font-medium">Export Settings</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                Configure Your <span className="gradient-text">Export</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                Fine-tune your clip settings before exporting
              </p>
            </motion.div>

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 sm:p-6 space-y-6 sm:space-y-8"
            >
              {/* Duration */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Clip Duration</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Target length</p>
                    </div>
                  </div>
                  <span className="text-base sm:text-lg font-bold text-primary">{settings.duration[0]}s</span>
                </div>
                <Slider
                  value={settings.duration}
                  onValueChange={(value) => setSettings({ ...settings, duration: value })}
                  min={30}
                  max={60}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30s</span>
                  <span>60s</span>
                </div>
              </div>

              {/* Subtitle Style */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Type className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-sm sm:text-base font-medium">Subtitle Style</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Caption template preset</p>
                  </div>
                </div>
                <Select
                  value={settings.subtitleStyle}
                  onValueChange={(value) => setSettings({ ...settings, subtitleStyle: value })}
                >
                  <SelectTrigger className="w-28 sm:w-40 bg-muted/50 border-border text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok-bold">TikTok Bold</SelectItem>
                    <SelectItem value="mrbeast">MrBeast</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="cinematic">Cinematic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* FPS */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-sm sm:text-base font-medium">Frame Rate</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Output video FPS</p>
                  </div>
                </div>
                <Select
                  value={settings.fps}
                  onValueChange={(value) => setSettings({ ...settings, fps: value })}
                >
                  <SelectTrigger className="w-28 sm:w-40 bg-muted/50 border-border text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 FPS</SelectItem>
                    <SelectItem value="30">30 FPS</SelectItem>
                    <SelectItem value="60">60 FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    </div>
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Auto Crop 9:16</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Smart face-tracking</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoCrop}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoCrop: checked })}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-highlight-yellow/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-highlight-yellow" />
                    </div>
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Highlight Keywords</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Emphasize words</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.highlightKeywords}
                    onCheckedChange={(checked) => setSettings({ ...settings, highlightKeywords: checked })}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Speaker Detection</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Auto-switch speakers</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.speakerDetection}
                    onCheckedChange={(checked) => setSettings({ ...settings, speakerDetection: checked })}
                  />
                </div>
              </div>
            </motion.div>

            {/* Export Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 text-center"
            >
              <Button variant="gradient" size="lg" onClick={handleExport} className="gap-2 w-full">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sm:hidden">Export Clips (1080x1920)</span>
                <span className="hidden sm:inline">Export All Clips (1080x1920)</span>
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
                MP4 format with hardcoded subtitles
              </p>
            </motion.div>
          </div>
        </main>
        
        <MobileNav />
      </div>
    </>
  );
};

export default Export;