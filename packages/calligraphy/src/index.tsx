"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from "motion/react";
import { useRef, useState } from "react";

/**
 * Compute the Longest Common Subsequence between two strings.
 * Returns an array of [oldIndex, newIndex] pairs for matched characters.
 */
function computeLCS(oldStr: string, newStr: string): [number, number][] {
  const m = oldStr.length;
  const n = newStr.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (oldStr[i - 1] === newStr[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const pairs: [number, number][] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (oldStr[i - 1] === newStr[j - 1]) {
      pairs.unshift([i - 1, j - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return pairs;
}

type CalligraphyProps = HTMLMotionProps<"span">;

/**
 * Calligraphy — fluid text transitions.
 *
 * Shared characters slide to their new positions while
 * entering characters fade in and exiting characters fade out.
 */
export function Calligraphy(props: CalligraphyProps) {
  const { children, transition, className, style, ...rest } = props;

  const text = typeof children === "string" ? children : String(children ?? "");

  const nextIdRef = useRef(text.length);
  const enteringKeysRef = useRef<Map<string, number>>(new Map());

  const [prevText, setPrevText] = useState(text);
  const [charKeys, setCharKeys] = useState<string[]>(() =>
    text.split("").map((_, i) => `c${i}`),
  );

  if (text !== prevText) {
    const matches = computeLCS(prevText, text);
    const newKeys: string[] = new Array(text.length).fill("");

    for (const [oldIdx, newIdx] of matches) {
      newKeys[newIdx] = charKeys[oldIdx];
    }

    const entering = new Map<string, number>();
    let enterIdx = 0;
    for (let i = 0; i < newKeys.length; i++) {
      if (!newKeys[i]) {
        const key = `c${nextIdRef.current++}`;
        newKeys[i] = key;
        entering.set(key, enterIdx++);
      }
    }

    enteringKeysRef.current = entering;
    setPrevText(text);
    setCharKeys(newKeys);
  }

  const base: Transition = transition ?? {
    duration: 0.35,
    ease: [0.19, 1, 0.22, 1],
  };

  return (
    <motion.span
      className={className}
      style={{
        display: "inline-flex",
        ...style,
      }}
      {...rest}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {text.split("").map((char: string, i: number) => {
          const key = charKeys[i];
          const enterIdx = enteringKeysRef.current.get(key);
          const isEntering = enterIdx !== undefined;

          return (
            <motion.span
              key={key}
              layout={isEntering ? false : "position"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ...base,
                ...(isEntering && {
                  delay: enterIdx * 0.02,
                }),
              }}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </motion.span>
  );
}
