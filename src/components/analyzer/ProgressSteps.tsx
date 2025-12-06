import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  completedSteps: string[];
}

const ProgressSteps = ({ steps, currentStep, completedSteps }: ProgressStepsProps) => {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`progress-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="completed"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-secondary-foreground" />
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    key="active"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pending"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                  >
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1">
              <p className={`font-medium text-sm ${isPending ? "text-muted-foreground" : "text-foreground"}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>

            {isActive && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="absolute bottom-0 left-0 h-0.5 bg-primary/50 rounded-full"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;