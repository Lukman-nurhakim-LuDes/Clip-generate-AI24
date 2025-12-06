import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Settings, Download, Monitor, Type, Users, Zap, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
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

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Settings className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Export Settings</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Configure Your <span className="gradient-text">Export</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Fine-tune your clip settings before exporting
              </p>
            </motion.div>

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 space-y-8"
            >
              {/* Duration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Clip Duration</Label>
                      <p className="text-sm text-muted-foreground">Target length for each clip</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary">{settings.duration[0]}s</span>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Type className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Subtitle Style</Label>
                    <p className="text-sm text-muted-foreground">Caption template preset</p>
                  </div>
                </div>
                <Select
                  value={settings.subtitleStyle}
                  onValueChange={(value) => setSettings({ ...settings, subtitleStyle: value })}
                >
                  <SelectTrigger className="w-40 bg-muted/50 border-border">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Frame Rate</Label>
                    <p className="text-sm text-muted-foreground">Output video FPS</p>
                  </div>
                </div>
                <Select
                  value={settings.fps}
                  onValueChange={(value) => setSettings({ ...settings, fps: value })}
                >
                  <SelectTrigger className="w-40 bg-muted/50 border-border">
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
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Auto Crop 9:16</Label>
                      <p className="text-sm text-muted-foreground">Smart face-tracking crop</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoCrop}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoCrop: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-highlight-yellow/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-highlight-yellow" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Highlight Keywords</Label>
                      <p className="text-sm text-muted-foreground">Emphasize important words</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.highlightKeywords}
                    onCheckedChange={(checked) => setSettings({ ...settings, highlightKeywords: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Speaker Detection</Label>
                      <p className="text-sm text-muted-foreground">Auto-switch between speakers</p>
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
              className="mt-8 text-center"
            >
              <Button variant="gradient" size="xl" onClick={handleExport} className="gap-2 w-full sm:w-auto">
                <Download className="w-5 h-5" />
                Export All Clips (1080x1920)
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                MP4 format with hardcoded subtitles
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Export;