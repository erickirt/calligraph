"use client";

import { Calligraph } from "calligraph";
import { motion } from "motion/react";
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

const defaultWords = ["Calligraph", "Craft", "Creative", "Create"];

export function Demo() {
  const [wordList, setWordList] = useState(defaultWords);
  const [inputValue, setInputValue] = useState(defaultWords.join(", "));
  const [text, setText] = useState("Calligraph");
  const [ref, bounds] = useMeasure();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = inputValue
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    if (parsed.length > 0) {
      setWordList(parsed);
      setInputValue(parsed.join(", "));
      setText(parsed[0]);
    }
  };

  const cycle = useCallback(() => {
    setText((prev) => {
      const idx = wordList.indexOf(prev);
      return wordList[(idx + 1) % wordList.length] ?? prev;
    });
  }, [wordList]);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <motion.button
          type="button"
          animate={{
            width: bounds.width > 0 ? bounds.width : "auto",
          }}
          onClick={cycle}
          className={styles.button}
          transition={{
            duration: 0.4,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          <div ref={ref} className={styles.wrapper}>
            <Calligraph className={styles.text}>{text}</Calligraph>
          </div>
        </motion.button>
      </div>

      <div className={styles.control}>
        <label htmlFor="words-input" className={styles.label}>
          Words
        </label>
        <input
          id="words-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={styles.input}
          placeholder="Comma separated words"
        />
      </div>
    </div>
  );
}
