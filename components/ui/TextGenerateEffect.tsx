"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import styles from "./TextGenerateEffect.module.scss";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate("span", { opacity: 1 }, { duration: 2, delay: stagger(0.2) });
  }, [animate]);

  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      <div className={styles.inner}>
        <motion.div ref={scope} className={styles.words}>
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className={idx >= 1 ? styles.wordBrand : styles.word}
              style={{ opacity: 0 }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
