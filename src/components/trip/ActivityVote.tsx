
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityVoteProps {
  votes: number;
  userVoted?: boolean;
  isLockedIn?: boolean;
  onVote?: () => void;
  lockThreshold?: number;
}

export function ActivityVote({
  votes = 0,
  userVoted = false,
  isLockedIn = false,
  onVote,
  lockThreshold = 3
}: ActivityVoteProps) {
  const [hasVoted, setHasVoted] = useState(userVoted);
  const [voteCount, setVoteCount] = useState(votes);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleVote = () => {
    if (isLockedIn) return;
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (hasVoted) {
      setVoteCount(prev => prev - 1);
      setHasVoted(false);
    } else {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
    }
    
    if (onVote) onVote();
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleVote}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors",
          isLockedIn ? "bg-green-100 dark:bg-green-900/30 cursor-default" : 
           hasVoted ? "bg-primary-foreground text-primary" : "bg-muted hover:bg-muted/80"
        )}
        disabled={isLockedIn}
      >
        {isLockedIn ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Check className="w-5 h-5 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ThumbsUp className={cn("w-4 h-4", hasVoted ? "fill-primary text-primary" : "")} />
          </motion.div>
        )}
        
        {/* Show progress to locked in status */}
        {!isLockedIn && lockThreshold > 0 && (
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(voteCount / lockThreshold) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </button>
      
      <AnimatePresence mode="popLayout">
        <motion.div
          key={voteCount}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="text-sm font-medium mt-1"
        >
          {voteCount}
        </motion.div>
      </AnimatePresence>
      
      {isLockedIn && (
        <span className="text-xs text-green-500 font-medium mt-1">Locked In</span>
      )}
    </div>
  );
}
