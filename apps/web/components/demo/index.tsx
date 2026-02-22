"use client";

import { Calligraph } from "calligraph";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const animationPresets = [
  "Default",
  "Smooth",
  "Snappy",
  "Bouncy",
] as const;
export type AnimationPreset = (typeof animationPresets)[number];

export const animationPropMap: Record<AnimationPreset, string | undefined> = {
  Default: undefined,
  Smooth: "smooth",
  Snappy: "snappy",
  Bouncy: "bouncy",
};

const words = ["Calligraph", "Craft", "Creative", "Create"];
const CYCLE_MS = 3000;

export function Demo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.stage}
        onClick={() => setIndex((prev) => (prev + 1) % words.length)}
      >
        <Calligraph variant="text" className={styles.hero}>
          {words[index]}
        </Calligraph>
      </button>
    </div>
  );
}
