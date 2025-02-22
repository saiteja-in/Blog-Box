// TextGenerateEffect.jsx
import React, { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../utils/cn.js";

const TextGenerate = ({ words, className }) => {
  const [scope, animate] = useAnimate();
  const scopeRef = useRef(null); // Initialize ref with null

  let wordsArray = words ? words.split(" ") : [];

  useEffect(() => {
    if (scopeRef.current && scopeRef.current.children.length > 0) {
      animate(
        scopeRef.current.children,
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(0.2),
        }
      );
    } else {
      // console.log("No scope element found or no children to animate.");
    }
  }, [scopeRef.current, words]);

  const renderWords = () => {
    return (
      <motion.div ref={scopeRef}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-black opacity-0"
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-4xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerate;
