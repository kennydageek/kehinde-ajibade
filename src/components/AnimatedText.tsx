import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap leading-relaxed ${className}`}>
      {words.map((word, wordIndex) => {
        const start = wordIndex / words.length;
        const end = start + 1 / words.length;
        // Map word progress to opacity from 0.2 to 1.0
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1.0]);

        return (
          <span key={wordIndex} className="inline-block mr-[0.3em] relative">
            <motion.span style={{ opacity }} className="inline-block">
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};
