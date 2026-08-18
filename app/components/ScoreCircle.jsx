import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const ScoreCircle = ({ score = 75 }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const tone = score > 69 ? 'var(--color-pass)' : score > 49 ? 'var(--color-flag)' : 'var(--color-fail)';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const offset = useTransform(count, (v) => circumference * (1 - v / 100));

  useEffect(() => {
    const controls = animate(count, score, { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 });
    return controls.stop;
  }, [score]);

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg height="100%" width="100%" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle cx="50" cy="50" r={normalizedRadius} stroke="var(--color-line)" strokeWidth={stroke} fill="transparent" />
        <motion.circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={tone}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset, filter: `drop-shadow(0 0 6px ${tone}66)` }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <motion.span className="readout font-semibold text-base text-text">{rounded}</motion.span>
        <span className="readout text-[9px] uppercase tracking-[0.1em] text-muted-2">/100</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
