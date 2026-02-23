"use client";

import { Calligraph } from "calligraph";
import { useState } from "react";
import styles from "./styles.module.css";

const variants = ["text", "number", "slots"] as const;
type Variant = (typeof variants)[number];

const animations = ["default", "smooth", "snappy", "bouncy"] as const;
type Animation = (typeof animations)[number];

const presets: Record<Variant, string[]> = {
  text: ["Calligraph", "Craft", "Creative", "Create"],
  number: ["$35.99", "$24.89", "$17.38", "$3.15"],
  slots: ["$1.47", "$34.44", "$148.21", "$3.09"],
};

function parseValues(raw: string): string[] {
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.control}>
      <span className={styles.controlLabel}>{label}</span>
      {children}
    </div>
  );
}

function Tabs<T extends string>({
  options,
  value,
  onChange,
  format,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div className={styles.tabs} role="tablist">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="tab"
          aria-selected={value === o}
          className={styles.tab}
          data-active={value === o || undefined}
          onClick={() => onChange(o)}
        >
          {format ? format(o) : o}
        </button>
      ))}
    </div>
  );
}

export function LabPage() {
  const [variant, setVariant] = useState<Variant>("text");
  const [animation, setAnimation] = useState<Animation>("default");
  const [input, setInput] = useState(() => presets.text.join(" | "));
  const [values, setValues] = useState<string[]>(() => [...presets.text]);
  const [index, setIndex] = useState(0);
  const [stagger, setStagger] = useState(0.02);
  const [drift, setDrift] = useState(true);
  const [autoSize, setAutoSize] = useState(true);

  const list = values.length > 0 ? values : presets[variant];
  const displayValue = list[index % list.length];

  const cycle = () => {
    setIndex((prev) => (prev + 1) % list.length);
  };

  const commitInput = () => {
    const parsed = parseValues(input);
    if (parsed.length > 0) {
      setValues(parsed);
      setInput(parsed.join(" | "));
      setIndex(0);
    }
  };

  const animationProp =
    animation === "default"
      ? undefined
      : (animation as "smooth" | "snappy" | "bouncy");

  return (
    <>
      <div className={styles.heading}>
        <h1 className={styles.title}>Lab</h1>
      </div>

      <p className={styles.description}>
        Interactive playground. Pick a variant, tweak the settings, or type your
        own text.
      </p>

      <div className={styles.stage}>
        <button type="button" className={styles.stageButton} onClick={cycle}>
          <Calligraph
            variant={variant}
            animation={animationProp}
            stagger={stagger}
            drift={drift ? { x: 8, y: 0 } : undefined}
            autoSize={autoSize}
            className={styles.preview}
          >
            {displayValue}
          </Calligraph>
        </button>
      </div>

      <div className={styles.panel}>
        <Control label="Values">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={commitInput}
            onKeyDown={(e) => e.key === "Enter" && commitInput()}
            placeholder={presets[variant].join(" | ")}
            className={styles.input}
          />
        </Control>

        <div className={styles.divider} />

        <Control label="Variant">
          <Tabs
            options={variants}
            value={variant}
            onChange={(v) => {
              setVariant(v);
              const p = presets[v];
              setValues(p);
              setInput(p.join(" | "));
              setIndex(0);
            }}
          />
        </Control>

        <div className={styles.divider} />

        <Control label="Animation">
          <Tabs
            options={animations}
            value={animation}
            onChange={setAnimation}
            format={(a) => a.charAt(0).toUpperCase() + a.slice(1)}
          />
        </Control>

        <div className={styles.divider} />

        <Control label="Stagger">
          <div className={styles.sliderRow}>
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.005"
              value={stagger}
              onChange={(e) => setStagger(Number(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderValue}>{stagger.toFixed(3)}s</span>
          </div>
        </Control>

        <div className={styles.divider} />

        <Control label="Drift">
          <button
            type="button"
            className={styles.toggle}
            data-active={drift || undefined}
            onClick={() => setDrift((d) => !d)}
          >
            {drift ? "On" : "Off"}
          </button>
        </Control>

        <div className={styles.divider} />

        <Control label="Auto-size">
          <button
            type="button"
            className={styles.toggle}
            data-active={autoSize || undefined}
            onClick={() => setAutoSize((a) => !a)}
          >
            {autoSize ? "On" : "Off"}
          </button>
        </Control>
      </div>
    </>
  );
}
