import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds total loading time
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        // Mark as complete and wait before triggering onLoadingComplete
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1200); // Increased delay to allow for smoother fade out
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isComplete ? 0 : 1,
        scale: isComplete ? 1.05 : 1
      }}
      transition={{
        duration: isComplete ? 1.0 : 0.5,
        ease: "easeInOut"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-6"
      >
        LakshaN
      </motion.div>

      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gray-600 to-gray-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      <motion.div
        className="mt-4 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {progress}%
      </motion.div>
    </motion.div>
  );
};

export default Loading;
