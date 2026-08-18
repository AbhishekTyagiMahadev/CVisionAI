import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const ScoreGauge = ({ score = 75 }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef(null);

  const tone = score > 69 ? 'var(--color-pass)' : score > 49 ? 'var(--color-flag)' : 'var(--color-fail)';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const offset = useTransform(count, (v) => pathLength * (1 - v / 100));

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (!pathLength) return;
    const controls = animate(count, score, { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 });
    return controls.stop;
  }, [score, pathLength]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="var(--color-line)" strokeWidth="8" strokeLinecap="round" />
          <motion.path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke={tone}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            style={{ strokeDashoffset: offset, filter: `drop-shadow(0 0 6px ${tone}66)` }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
          <motion.span className="readout text-xl font-semibold text-text">{rounded}</motion.span>
          <div className="readout text-[9px] uppercase tracking-[0.1em] text-muted-2">/ 100</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
