import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Segment {
  text: string;
  className: string;
}

interface Props {
  segments: Segment[];
  delayPerChar?: number;
  loopDelay?: number;
  className?: string;
}

const AnimatedStyledText = ({
  segments,
  delayPerChar = 0.08,
  loopDelay = 2000,
  className = "",
}: Props) => {
  const totalChars = segments.reduce((acc, cur) => acc + cur.text.length, 0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const totalDuration = totalChars * delayPerChar * 1000 + loopDelay;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 100);
    }, totalDuration);
    return () => clearInterval(timer);
  }, [totalChars, delayPerChar, loopDelay]);

  const letterAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * delayPerChar },
    }),
  };

  return (
    <div className={`text-center leading-tight ${className}`}>
      {visible &&
        segments.map((segment, segIdx) => {
          const delayOffset = segments
            .slice(0, segIdx)
            .reduce((acc, cur) => acc + cur.text.length, 0);
          return (
            <div
              key={segIdx}
              className="min-h-[2.75rem] sm:min-h-[3.25rem] leading-tight"
            >
              {segment.text.split("").map((char, i) => {
                const animationIndex = delayOffset + i;
                return (
                  <motion.span
                    key={`${segIdx}-${i}`}
                    custom={animationIndex}
                    initial="hidden"
                    animate="visible"
                    variants={letterAnimation}
                    className={`${segment.className} inline-block`}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default AnimatedStyledText;
