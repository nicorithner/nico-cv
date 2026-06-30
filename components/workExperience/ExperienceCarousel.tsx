"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { workExperience } from "../../data";
import styles from "./ExperienceCarousel.module.scss";

export default function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(900);
  const total = workExperience.length;

  useEffect(() => {
    const update = () => {
      if (stageRef.current) setStageW(stageRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  const isMobile = stageW < 768;
  const CARD_W = isMobile ? stageW : stageW * 0.6;
  const centerX = (stageW - CARD_W) / 2;
  const sideShift = isMobile ? stageW * 1.2 : stageW * 0.4;

  const getRelPos = (i: number) => {
    let p = i - active;
    if (p > total / 2) p -= total;
    if (p < -total / 2) p += total;
    return p;
  };

  const getAnimate = (pos: number) => {
    const isActive = pos === 0;
    const dir = pos > 0 ? 1 : -1;
    return {
      x: isActive ? centerX : centerX + dir * sideShift,
      scale: isActive ? 1 : 0.8,
      opacity: isActive ? 1 : 0.55,
      zIndex: isActive ? 3 : 2,
    };
  };

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const job = workExperience[active];

  return (
    <div className={styles.wrapper}>
      {/* Image-only carousel */}
      <div className={styles.stage} ref={stageRef}>
        {workExperience.map((entry, i) => {
          const pos = getRelPos(i);
          return (
            <motion.div
              key={entry.id}
              className={`${styles.card} ${pos !== 0 ? styles.cardSide : ""}`}
              style={{ width: CARD_W }}
              animate={getAnimate(pos)}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={() => {
                if (pos === 1) prev();
                if (pos === -1) next();
              }}
            >
              {entry.thumbnail && (
                <Image
                  src={entry.thumbnail}
                  alt={entry.company}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.arrow}
          onClick={next}
          aria-label="Previous job"
        >
          <FiArrowLeft />
        </button>
        <div className={styles.dots}>
          {workExperience.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="Next job"
        >
          <FiArrowRight />
        </button>
      </div>

      {/* Text panel — fades to new job on navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.textPanel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.panelHeader}>
            <div className={styles.headerTop}>
              <span className={styles.company}>{job.company}</span>
              {job.partTime && (
                <span className={styles.badge}>Part-time</span>
              )}
            </div>
            <span className={styles.role}>{job.title}</span>
            <span className={styles.meta}>
              {job.location}&nbsp;&middot;&nbsp;{job.years[0]}–{job.years[1]}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.panelBody}>
            <div className={styles.tags}>
              {job.stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
            <ul className={styles.desc}>
              {job.desc.map((item, j) => (
                <li key={j} className={styles.descItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
