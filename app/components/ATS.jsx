import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const ATS = ({ score, suggestions }) => {
  const tone = score > 69 ? 'pass' : score > 49 ? 'flag' : 'fail';
  const toneVar = `var(--color-${tone})`;

  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, score, { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 });
    return controls.stop;
  }, [score]);

  return (
    <div className="panel-raised w-full p-6">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-11 h-11 rounded-[10px] border flex items-center justify-center shrink-0"
          style={{ borderColor: `${toneVar}44`, background: `${toneVar}18` }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: toneVar, boxShadow: `0 0 8px 2px ${toneVar}66` }} />
        </div>
        <div>
          <div className="eyebrow mb-1">ATS Compatibility</div>
          <h2 className="text-xl font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>
            <motion.span className="readout">{rounded}</motion.span>
            <span className="text-muted-2 readout text-base">/100</span>
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text mb-2">{subtitle}</h3>
        <p className="text-muted mb-5 text-sm leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        <div className="space-y-2.5">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 bg-panel-2 border border-line rounded-[10px] p-3">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-4 h-4 mt-0.5 opacity-90"
              />
              <p className={`text-sm ${suggestion.type === "good" ? "text-pass" : "text-flag"}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted-2 text-xs italic border-t border-line pt-4">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
