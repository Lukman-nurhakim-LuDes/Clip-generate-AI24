import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, RotateCcw, Palette } from "lucide-react";
import { motion } from "framer-motion";

interface Clip {
  id: string;
  thumbnail: string;
  duration: string;
  score: number;
  subtitle: string;
  startTime: string;
  endTime: string;
}

interface VideoPlayerModalProps {
  clip: Clip | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onRegenerate: () => void;
  onChangeStyle: () => void;
}

export function VideoPlayerModal({
  clip,
  isOpen,
  onClose,
  onDownload,
  onRegenerate,
  onChangeStyle,
}: VideoPlayerModalProps) {
  if (!clip) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-bold text-foreground">
            Preview Clip • {clip.startTime} - {clip.endTime}
          </DialogTitle>
        </DialogHeader>
        
        {/* Video Player Area */}
        <div className="relative aspect-[9/16] max-h-[60vh] mx-4 rounded-xl overflow-hidden bg-black">
          {/* Placeholder Video - In production this would be actual video */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${clip.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Subtitle Preview */}
          <motion.div 
            className="absolute bottom-8 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="subtitle-preview text-center">
              <span className="text-white font-black text-xl drop-shadow-lg"
                style={{ 
                  textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                  WebkitTextStroke: '1px black'
                }}
              >
                {clip.subtitle}
              </span>
            </div>
          </motion.div>

          {/* Score Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
              <span className="text-sm font-bold text-primary-foreground">🔥 {clip.score}%</span>
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">{clip.duration}</span>
            </div>
          </div>

          {/* Play Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-0 h-0 border-l-[30px] border-l-white border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent ml-2" />
            </motion.div>
            <p className="absolute bottom-2 text-white/60 text-xs">
              Video player memerlukan koneksi backend
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex flex-wrap gap-3 justify-center border-t border-border/30">
          <Button 
            onClick={onDownload}
            className="btn-gradient gap-2"
          >
            <Download className="w-4 h-4" />
            Download MP4
          </Button>
          <Button 
            variant="outline" 
            onClick={onRegenerate}
            className="gap-2 border-border/50 hover:bg-accent"
          >
            <RotateCcw className="w-4 h-4" />
            Regenerate
          </Button>
          <Button 
            variant="outline" 
            onClick={onChangeStyle}
            className="gap-2 border-border/50 hover:bg-accent"
          >
            <Palette className="w-4 h-4" />
            Change Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
