"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  MotionConfig,
  motion,
} from "motion/react";
import { useRef, useState } from "react";

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
      pairs.push([i - 1, j - 1]);
      i--;
      j--;
    } else if (
      dp[i - 1][j] > dp[i][j - 1] ||
      (dp[i - 1][j] === dp[i][j - 1] && i >= j)
    ) {
      i--;
    } else {
      j--;
    }
  }

  pairs.reverse();
  return pairs;
}

type CalligraphProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  children?: string | number;
  drift?: number;
};

/**
 * Calligraph - {@link https://calligraph.raphaelsalaja.com | Documentation}
 *
 * Animates text changes at the character level.
 *
 * @remarks
 * When `children` changes, characters common to both strings
 * reposition via layout animation while new characters drift in
 * and removed characters drift out.
 *
 *
 * @param props - Accepts all {@link HTMLMotionProps} for a `span` element.
 *
 * @param props.drift - Maximum horizontal spread in pixels for entering/exiting
 * characters. Automatically scaled by the fraction of characters that changed —
 * small edits produce subtle drift, large rewrites produce full spread.
 * Set to `0` to disable. Defaults to `10`.
 *
 */
export function Calligraph(props: CalligraphProps) {
  const { children, drift = 15, className, style, ...rest } = props;

  const text = String(children ?? "");

  const nextIdRef = useRef(text.length);

  const [prevText, setPrevText] = useState(text);

  const [charKeys, setCharKeys] = useState<string[]>(() =>
    text.split("").map((_, i) => `c${i}`),
  );

  const [changeRatio, setChangeRatio] = useState(0);

  if (text !== prevText) {
    const matches = computeLCS(prevText, text);
    const newKeys: string[] = new Array(text.length).fill("");

    for (const [oldIdx, newIdx] of matches) {
      newKeys[newIdx] = charKeys[oldIdx];
    }

    let newCount = 0;
    for (let i = 0; i < newKeys.length; i++) {
      if (!newKeys[i]) {
        newKeys[i] = `c${nextIdRef.current++}`;
        newCount++;
      }
    }
    setPrevText(text);
    setCharKeys(newKeys);
    setChangeRatio(text.length > 0 ? newCount / text.length : 1);
  }

  return (
    <MotionConfig
      transition={{
        duration: 0.38,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <span
        style={{
          display: "inline-flex",
          ...style,
        }}
        className={className}
        {...rest}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {text.split("").map((char: string, i: number) => {
            const key = charKeys[i];
            const progress = text.length <= 1 ? 0 : i / (text.length - 1);
            const offset = (progress - 0.5) * drift * changeRatio;
            const stagger = progress * 0.02;

            return (
              <motion.span
                key={key}
                aria-hidden="true"
                layout="position"
                initial={{
                  opacity: 0,
                  x: offset,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: stagger,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: offset,
                  transition: {
                    duration: 0.22,
                    delay: stagger,
                  },
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
      </span>
    </MotionConfig>
  );
}
