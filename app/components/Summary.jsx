import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const Category = ({ title, score }) => {
  const textColor = score > 70 ? 'text-pass' : score > 49 ? 'text-flag' : 'text-fail';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, score, { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 });
    return controls.stop;
  }, [score]);

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-3 items-center justify-center">
          <p className="text-base text-text">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="readout text-lg">
          <motion.span className={textColor}>{rounded}</motion.span>
          <span className="text-muted-2">/100</span>
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }) => {
  return (
    <div className="panel-raised w-full">
      <div className="flex flex-row items-center p-5 gap-6 border-b border-line">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-1.5">
          <div className="eyebrow">Overall Result</div>
          <h2 className="text-xl font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>
            Your Resume Score
          </h2>
          <p className="text-sm text-muted">
            Calculated from the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
