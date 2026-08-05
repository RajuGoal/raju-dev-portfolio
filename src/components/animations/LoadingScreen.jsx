import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Full-screen loader shown once on initial app mount
export default function LoadingScreen({ onFinish, minDuration = 1400 }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100);
        return next;
      });
    }, 180);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const elapsed = Date.now() - start;
      const remaining = Math.max(minDuration - elapsed, 0);
      setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, remaining + 200);
    }, minDuration - 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center gap-6"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* Blueprint corner brackets */}
          <div className="relative w-24 h-24">
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-400" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-400" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-400" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-400" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-amber-400 text-2xl font-bold">
              {Math.floor(progress)}%
            </div>
          </div>

          <div className="w-56 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-400"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
            Initializing Portfolio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}