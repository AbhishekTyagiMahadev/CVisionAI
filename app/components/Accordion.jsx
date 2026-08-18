import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "~/lib/utils";

const AccordionContext = createContext(undefined);
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

export const Accordion = ({ children, defaultOpen, allowMultiple = false, className = "" }) => {
  const [activeItems, setActiveItems] = useState(defaultOpen ? [defaultOpen] : []);
  const toggleItem = (id) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };
  const isItemActive = (id) => activeItems.includes(id);

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ id, children, className = "" }) => {
  return (
    <div className={`overflow-hidden border-b border-line last:border-b-0 ${className}`}>
      {children}
    </div>
  );
};

export const AccordionHeader = ({ itemId, children, className = "", icon, iconPosition = "right" }) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  const defaultIcon = (
    <motion.svg
      className={cn("w-4 h-4 text-muted", { "text-signal": isActive })}
      animate={{ rotate: isActive ? 180 : 0 }}
      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </motion.svg>
  );

  return (
    <button
      onClick={() => toggleItem(itemId)}
      className={`w-full px-5 py-4 text-left focus:outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer hover:bg-panel-2 ${className}`}
    >
      <div className="flex items-center space-x-3">
        {iconPosition === "left" && (icon || defaultIcon)}
        <div className="flex-1">{children}</div>
      </div>
      {iconPosition === "right" && (icon || defaultIcon)}
    </button>
  );
};

export const AccordionContent = ({ itemId, children, className = "" }) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.32, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2 } }}
          className={`overflow-hidden ${className}`}
        >
          <div className="px-5 py-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
