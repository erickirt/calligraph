"use client";

import NumberFlow from "@number-flow/react";
import { Calligraph } from "calligraph";
import React, { useState } from "react";
import { TextMorph } from "torph/react";
import { Check } from "../icons/check";
import { Cross } from "../icons/cross";
import styles from "./styles.module.css";

const words = ["Calligraph", "Craft", "Creative", "Create"];
const numbers = [35.99, 24.89, 17.38, 3.15];
const spins = [1204, 387, 52, 9631];

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const libs = ["calligraph", "torph", "numberflow"] as const;

type Lib = (typeof libs)[number];

const libLabels: Record<Lib, string> = {
  calligraph: "Calligraph",
  torph: "Torph",
  numberflow: "NumberFlow",
};

type Row =
  | ({ label: string } & Record<Lib, boolean>)
  | { kind: "divider"; label: string };

const rows: Row[] = [
  { kind: "divider", label: "Animation" },
  {
    label: "Text",
    calligraph: true,
    torph: true,
    numberflow: false,
  },
  {
    label: "Number",
    calligraph: true,
    torph: true,
    numberflow: true,
  },
  {
    label: "Slots",
    calligraph: true,
    torph: false,
    numberflow: true,
  },
  {
    label: "Springs",
    calligraph: true,
    torph: false,
    numberflow: false,
  },
  { label: "Stagger", calligraph: true, torph: false, numberflow: false },
  { label: "Auto-size", calligraph: true, torph: false, numberflow: true },
  {
    label: "Trend direction",
    calligraph: false,
    torph: false,
    numberflow: true,
  },

  { kind: "divider", label: "Formatting" },
  {
    label: "Intl.NumberFormat",
    calligraph: true,
    torph: true,
    numberflow: true,
  },
  { label: "Plugins", calligraph: false, torph: false, numberflow: true },

  { kind: "divider", label: "Architecture" },

  {
    label: "Dependencies",
    calligraph: true,
    torph: false,
    numberflow: false,
  },
  {
    label: "React",
    calligraph: true,
    torph: true,
    numberflow: true,
  },
  {
    label: "Vue",
    calligraph: false,
    torph: true,
    numberflow: true,
  },
  {
    label: "Svelte",
    calligraph: false,
    torph: true,
    numberflow: true,
  },
  {
    label: "Angular",
    calligraph: false,
    torph: true,
    numberflow: true,
  },
  { label: "TypeScript", calligraph: true, torph: true, numberflow: true },
  { label: "SSR compatible", calligraph: true, torph: true, numberflow: true },

  { kind: "divider", label: "Accessibility" },
  { label: "Reduced motion", calligraph: true, torph: true, numberflow: true },
  {
    label: "Screen reader friendly",
    calligraph: true,
    torph: true,
    numberflow: true,
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h3 className={styles.sectionLabel}>{title}</h3>
      <div className={styles.grid}>{children}</div>
    </>
  );
}

function Panel({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.panel}>
      <span className={styles.badge}>{label}</span>
      <div className={styles.panelContent}>
        {children ?? <span className={styles.placeholder}>N/A</span>}
      </div>
    </div>
  );
}

function Cell({ value }: { value: boolean }) {
  if (value) return <Check className={`${styles.icon} ${styles.iconCheck}`} />;
  return <Cross className={`${styles.icon} ${styles.iconCross}`} />;
}

export function ComparePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [numberIndex, setNumberIndex] = useState(0);
  const [spinIndex, setSpinIndex] = useState(0);

  const cycleText = () => setTextIndex((i) => (i + 1) % words.length);
  const cycleNumber = () => setNumberIndex((i) => (i + 1) % numbers.length);
  const cycleSpin = () => setSpinIndex((i) => (i + 1) % spins.length);

  const word = words[textIndex];
  const value = numbers[numberIndex];
  const spin = spins[spinIndex];

  return (
    <React.Fragment>
      <div className={styles.heading}>
        <h1 className={styles.title}> Comparisons</h1>
      </div>

      <p className={styles.description}>
        Three libraries that animate text and numbers on the web, each with a
        different philosophy. Below you can interact with each library
        side-by-side and see exactly where they overlap and where they diverge.
      </p>

      <div>
        <Section title="Text">
          <Panel label="Calligraph">
            <button type="button" className={styles.button} onClick={cycleText}>
              <Calligraph variant="text" className={styles.animatedText}>
                {word}
              </Calligraph>
            </button>
          </Panel>
          <Panel label="Torph">
            <button type="button" className={styles.button} onClick={cycleText}>
              <TextMorph className={styles.animatedText}>{word}</TextMorph>
            </button>
          </Panel>
          <Panel label="NumberFlow" />
        </Section>

        <Section title="Number">
          <Panel label="Calligraph">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <Calligraph variant="number" className={styles.animatedText}>
                {value.toLocaleString()}
              </Calligraph>
            </button>
          </Panel>
          <Panel label="Torph">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <TextMorph className={styles.animatedText}>
                {value.toLocaleString()}
              </TextMorph>
            </button>
          </Panel>
          <Panel label="NumberFlow">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <NumberFlow
                value={value}
                className={`${styles.animatedText} ${styles.numberFlow}`}
              />
            </button>
          </Panel>
        </Section>

        <Section title="Spins">
          <Panel label="Calligraph">
            <button type="button" className={styles.button} onClick={cycleSpin}>
              <Calligraph variant="slots" className={styles.animatedText}>
                {fmt.format(spin)}
              </Calligraph>
            </button>
          </Panel>
          <Panel label="Torph" />
          <Panel label="NumberFlow">
            <button type="button" className={styles.button} onClick={cycleSpin}>
              <NumberFlow
                value={spin}
                format={{ style: "currency", currency: "USD" }}
                className={`${styles.animatedText} ${styles.numberFlow}`}
              />
            </button>
          </Panel>
        </Section>
      </div>

      <div className={styles.section}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: "40%" }} />
            {libs.map((lib) => (
              <col key={lib} style={{ width: "20%" }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th>Feature</th>
              {libs.map((lib) => (
                <th key={lib}>{libLabels[lib]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              if ("kind" in row) {
                return (
                  <tr key={row.label} className={styles.groupRow}>
                    <td colSpan={libs.length + 1}>{row.label}</td>
                  </tr>
                );
              }

              return (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {libs.map((lib) => (
                    <td key={lib}>
                      <Cell value={row[lib]} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
