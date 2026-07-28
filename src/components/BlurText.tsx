import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center ${className}`}
      style={{ rowGap: "0.1em" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { filter: "blur(10px)", opacity: 0, y: 34 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : isInView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [34, 0, 0],
                }
              : { filter: "blur(10px)", opacity: 0, y: 34 }
          }
          transition={{
            duration: 0.62,
            times: [0, 0.5, 1],
            ease: [0.22, 1, 0.36, 1],
            delay: (i * 70) / 1000,
          }}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
