import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StyleCardProps {
  style: {
    id: string;
    name: string;
    preview: string;
    font: string;
    color: string;
    bgColor: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const StyleCard = ({ style, isSelected, onSelect, index }: StyleCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
      className={`glass-card p-4 text-left transition-all duration-300 relative ${
        isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"
      }`}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}

      {/* Style Preview */}
      <div
        className="aspect-[9/16] rounded-xl mb-4 flex items-end justify-center pb-8 relative overflow-hidden"
        style={{ backgroundColor: style.bgColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <p
          className="subtitle-preview text-base relative z-10 px-2"
          style={{ 
            fontFamily: style.font,
            color: style.color,
          }}
        >
          {style.preview}
        </p>
      </div>

      <h3 className="font-semibold text-sm">{style.name}</h3>
    </motion.button>
  );
};

export default StyleCard;