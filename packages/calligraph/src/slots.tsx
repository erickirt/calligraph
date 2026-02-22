import type { Transition } from "motion/react";
import {
  AnimatePresence,
  animate,
  MotionConfig,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { reconcileDigitKeys } from "./reconcile";
import { isDigit, mod } from "./shared";

function DigitNum({
  n,
  current,
}: {
  n: number;
  current: ReturnType<typeof useMotionValue<number>>;
}) {
  const y = useTransform(current, (c) => {
    let offset = mod(n - c, 10);
    if (offset > 5) offset -= 10;
    return `${offset * 100}%`;
  });

  return (
    <motion.span
      aria-hidden
      style={{
        position: "absolute",
        top: "0.15em",
        left: 0,
        width: "100%",
        display: "inline-block",
        whiteSpace: "pre",
        y,
      }}
    >
      {n}
    </motion.span>
  );
}

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function SlotColumn({
  digit,
  direction,
  transition,
  delay,
}: {
  digit: number;
  direction: number;
  transition: Transition;
  delay: number;
}) {
  const current = useMotionValue(digit);
  const cumulativeRef = useRef(digit);
  const prevDigitRef = useRef(digit);
  const initialRef = useRef(true);

  if (digit !== prevDigitRef.current) {
    const old = prevDigitRef.current;
    let diff: number;

    if (direction > 0) {
      diff = digit >= old ? digit - old : 10 - old + digit;
    } else if (direction < 0) {
      diff = old >= digit ? -(old - digit) : -(10 - digit + old);
    } else {
      diff = digit - old;
    }

    cumulativeRef.current += diff;
    prevDigitRef.current = digit;
  }

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }

    animate(current, cumulativeRef.current, {
      ...transition,
      delay,
    });
  });

  const pad = "0.15em";

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        height: `calc(1lh + ${pad} * 2)`,
        overflow: "hidden",
        verticalAlign: "top",
        margin: `calc(-1 * ${pad}) 0`,
        maskImage: `linear-gradient(to bottom, transparent 0%, black ${pad}, black calc(100% - ${pad}), transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black ${pad}, black calc(100% - ${pad}), transparent 100%)`,
      }}
    >
      <span
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          paddingTop: pad,
          paddingBottom: pad,
          display: "inline-block",
        }}
      >
        {digit}
      </span>
      {digits.map((n) => (
        <DigitNum key={n} n={n} current={current} />
      ))}
    </span>
  );
}

export function SlotsRenderer({
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
    const result = reconcileDigitKeys(
      prevText,
      text,
      digitKeys,
      nextIdRef.current,
    );
    nextIdRef.current = result.nextId;
    dirRef.current = result.direction;
    setDigitKeys(result.keys);
    setPrevText(text);
  }

  const dir = dirRef.current;
  const prefixLen = (() => {
    const idx = chars.findIndex((c) => isDigit(c));
    return idx === -1 ? chars.length : idx;
  })();

  const digitCount = chars.filter((c) => isDigit(c)).length;
  let digitIndex = 0;

  return (
    <MotionConfig transition={transition}>
      <Component
        aria-label={text}
        style={{
          display: "inline-flex",
          position: "relative",
          ...style,
        }}
        className={className}
        {...rest}
      >
        <AnimatePresence mode="popLayout" initial={animateInitial}>
          {chars.map((char, i) => {
            const isPrefix = i < prefixLen;
            const outerKey = isPrefix
              ? `pre-${i}`
              : `col-${chars.length - 1 - i}`;

            if (isPrefix || !isDigit(char)) {
              return (
                <motion.span
                  key={outerKey}
                  layout="position"
                  initial={isPrefix ? false : { opacity: 0 }}
                  animate={isPrefix ? undefined : { opacity: 1 }}
                  exit={isPrefix ? undefined : { opacity: 0 }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              );
            }

            const delay = digitIndex * stagger;
            const isLast = digitIndex === digitCount - 1;
            digitIndex++;

            return (
              <motion.span
                key={outerKey}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onAnimationComplete={
                  isLast && onComplete ? onComplete : undefined
                }
                style={{ display: "inline-block" }}
              >
                <SlotColumn
                  digit={Number(char)}
                  direction={dir}
                  transition={transition}
                  delay={delay}
                />
              </motion.span>
            );
          })}
        </AnimatePresence>
      </Component>
    </MotionConfig>
  );
}
