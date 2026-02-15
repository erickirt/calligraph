"use client";

import { Calligraphy } from "calligraphy";
import { MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

function useMeasure<T extends HTMLElement = HTMLElement>(): [
  (node: T | null) => void,
  { width: number; height: number },
] {
  const [element, setElement] = useState<T | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds];
}

const words = ["Calligraphy", "Craft", "Creative", "Create"];

export function Demo() {
  const [text, setText] = useState("Calligraphy");
  const [ref, bounds] = useMeasure();

  const shuffle = useCallback(() => {
    setText((prev) => {
      const others = words.filter((w) => w !== prev);
      return others[Math.floor(Math.random() * others.length)];
    });
  }, []);

  return (
    <div className={styles.root}>
      <motion.button
        type="button"
        animate={{
          width: bounds.width > 0 ? bounds.width : "auto",
        }}
        onClick={shuffle}
        className={styles.button}
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <div ref={ref} className={styles.wrapper}>
          <Calligraphy className={styles.text}>{text}</Calligraphy>
        </div>
      </motion.button>
    </div>
  );
}
