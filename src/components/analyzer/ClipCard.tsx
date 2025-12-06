import { motion } from "framer-motion";
import { Play, Download, RefreshCw, Palette, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClipCardProps {
  clip: {
    id: string;
    thumbnail: string;
    duration: string;
    score: number;
    subtitle: string;
    startTime: string;
    endTime: string;
  };
  index: number;
  onPlay: () => void;
  onDownload: () => void;
  onRegenerate: () => void;
  onChangeStyle: () => void;
}

const ClipCard = ({ clip, index, onPlay, onDownload, onRegenerate, onChangeStyle }: ClipCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden group"
    >
      {/* Thumbnail */}
      <div 
        className="aspect-[9/16] relative bg-gradient-to-b from-muted to-background cursor-pointer"
        onClick={onPlay}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </motion.div>
        </div>

        {/* Score Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
          <Flame className="w-3 h-3 text-highlight-yellow" />
          <span className="text-xs font-bold">{clip.score}%</span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs font-medium">{clip.duration}</span>
        </div>

        {/* Subtitle Preview */}
        <div className="absolute bottom-12 left-2 right-2 text-center">
          <p className="subtitle-preview text-sm text-foreground px-2 py-1">
            {clip.subtitle}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 space-y-3">
        <div className="text-xs text-muted-foreground text-center">
          {clip.startTime} - {clip.endTime}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="glass" size="sm" onClick={onPlay} className="gap-1.5">
            <Play className="w-3.5 h-3.5" />
            Play
          </Button>
          <Button variant="gradient" size="sm" onClick={onDownload} className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-1.5 text-muted-foreground">
            <RefreshCw className="w-3.5 h-3.5" />
            Regen
          </Button>
          <Button variant="ghost" size="sm" onClick={onChangeStyle} className="gap-1.5 text-muted-foreground">
            <Palette className="w-3.5 h-3.5" />
            Style
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClipCard;