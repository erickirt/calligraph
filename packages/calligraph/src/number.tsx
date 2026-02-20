import type { Transition } from "motion/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef, useState } from "react";

const isDigit = (c: string) => c >= "0" && c <= "9";

const distance = 8;

export function NumberRenderer({
  text,
  Component,
  transition,
  stagger,
  animateInitial,
  onComplete,
  className,
  style,
  rest,
}: {
  text: string;
  Component: React.ElementType;
  transition: Transition;
  stagger: number;
  animateInitial: boolean;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  rest: Record<string, unknown>;
}) {
  const chars = text.split("");

  const nextIdRef = useRef(chars.length);
  const [prevText, setPrevText] = useState(text);
  const [digitKeys, setDigitKeys] = useState<number[]>(() =>
    chars.map((_, i) => i),
  );
  const dirRef = useRef(1);

  if (text !== prevText) {
    const toNum = (s: string) => parseFloat(s.replace(/[^0-9.-]/g, "")) || 0;
    dirRef.current = toNum(text) >= toNum(prevText) ? 1 : -1;

    const oldChars = prevText.split("");

    const firstDigit = (arr: string[]) => {
      const idx = arr.findIndex((c) => isDigit(c));
      return idx === -1 ? arr.length : idx;
    };
    const newPrefixLen = firstDigit(chars);
    const oldPrefixLen = firstDigit(oldChars);
    const minPrefix = Math.min(newPrefixLen, oldPrefixLen);

    const newKeys: number[] = new Array(chars.length);

    for (let i = 0; i < newPrefixLen; i++) {
      newKeys[i] =
        i < minPrefix && chars[i] === oldChars[i]
          ? digitKeys[i]
          : nextIdRef.current++;
    }

    const oldBody = oldChars.slice(oldPrefixLen);
    const newBody = chars.slice(newPrefixLen);
    const oldBodyKeys = digitKeys.slice(oldPrefixLen);
    const maxBodyLen = Math.max(oldBody.length, newBody.length);

    const padOld = [
      ...Array<string>(Math.max(0, maxBodyLen - oldBody.length)).fill(""),
      ...oldBody,
    ];
    const padNew = [
      ...Array<string>(Math.max(0, maxBodyLen - newBody.length)).fill(""),
      ...newBody,
    ];
    const padKeys = [
      ...Array<number>(Math.max(0, maxBodyLen - oldBodyKeys.length)).fill(-1),
      ...oldBodyKeys,
    ];

    const bodyOffset = maxBodyLen - newBody.length;
    for (let i = 0; i < newBody.length; i++) {
      const pi = bodyOffset + i;
      newKeys[newPrefixLen + i] =
        padNew[pi] === padOld[pi] && padKeys[pi] >= 0
          ? padKeys[pi]
          : nextIdRef.current++;
    }

    setDigitKeys(newKeys);
    setPrevText(text);
  }

  const dir = dirRef.current;
  const prefixLen = (() => {
    const idx = chars.findIndex((c) => isDigit(c));
    return idx === -1 ? chars.length : idx;
  })();

  return (
    <MotionConfig transition={transition}>
      <Component
        aria-label={text}
        style={{ display: "inline-flex", position: "relative", ...style }}
        className={className}
        {...rest}
      >
        <AnimatePresence mode="popLayout" initial={animateInitial}>
          {chars.map((char, i) => {
            const isPrefix = i < prefixLen;
            const outerKey = isPrefix
              ? `pre-${i}`
              : `col-${chars.length - 1 - i}`;
            const delay = i * stagger;
            const isLast = i === chars.length - 1;

            return (
              <motion.span
                key={outerKey}
                layout="position"
                initial={isPrefix ? false : { opacity: 0 }}
                animate={isPrefix ? undefined : { opacity: 1 }}
                exit={isPrefix ? undefined : { opacity: 0 }}
                style={{ display: "inline-block", position: "relative" }}
              >
                {isPrefix ? (
                  <span style={{ display: "inline-block", whiteSpace: "pre" }}>
                    {char}
                  </span>
                ) : (
                  <AnimatePresence
                    mode="popLayout"
                    initial={animateInitial}
                    propagate
                  >
                    <motion.span
                      key={digitKeys[i]}
                      aria-hidden="true"
                      initial={{
                        y: isDigit(char) ? (dir > 0 ? distance : -distance) : 0,
                        filter: "blur(2px)",
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                        transition: { delay },
                      }}
                      exit={{
                        y: isDigit(char) ? (dir > 0 ? -distance : distance) : 0,
                        opacity: 0,
                        filter: "blur(2px)",
                        scale: 0.5,
                        transition: { delay },
                      }}
                      onAnimationComplete={
                        isLast && onComplete ? onComplete : undefined
                      }
                      style={{
                        display: "inline-block",
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </motion.span>
                  </AnimatePresence>
                )}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </Component>
    </MotionConfig>
  );
}
