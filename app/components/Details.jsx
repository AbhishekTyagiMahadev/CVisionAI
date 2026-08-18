import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }) => {
  const toneClasses = score > 69
    ? "text-pass bg-pass-dim border-pass-dim"
    : score > 39
      ? "text-flag bg-flag-dim border-flag-dim"
      : "text-fail bg-fail-dim border-fail-dim";
  const dotClass = score > 69 ? "bg-pass" : score > 39 ? "bg-flag" : "bg-fail";

  return (
    <div className={cn("score-badge border", toneClasses)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dotClass)} />
      <p>{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }) => {
  return (
    <div className="flex flex-row gap-3 items-center py-1">
      <p className="text-lg font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-panel-2 border border-line w-full rounded-[10px] px-4 py-4 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt="score"
              className="size-4 opacity-90"
            />
            <p className="text-sm text-muted">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-[10px] p-4 border",
              tip.type === "good"
                ? "bg-pass-dim border-pass-dim text-pass"
                : "bg-flag-dim border-flag-dim text-flag"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-4"
              />
              <p className="text-sm font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm text-muted leading-relaxed">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full panel-raised">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={feedback.content.score} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
