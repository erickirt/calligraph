"use client";

import NumberFlow from "@number-flow/react";
import { Calligraph } from "calligraph";
import { useState } from "react";
import { TextMorph } from "torph/react";
import { Check } from "../icons/check";
import { Cross } from "../icons/cross";
import styles from "./styles.module.css";

const words = ["Calligraph", "Craft", "Creative", "Create"];
const numbers = [35.99, 24.89, 17.38, 3.15];

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type Row =
  | { label: string; values: [boolean, boolean, boolean] }
  | { kind: "divider"; label: string };

const rows: Row[] = [
  { kind: "divider", label: "Capabilities" },
  { label: "Text transitions", values: [true, true, false] },
  { label: "Number transitions", values: [true, true, true] },
  { label: "Digit spin (slots)", values: [true, false, true] },
  { label: "Auto-size", values: [true, false, false] },
  { label: "Spring physics", values: [true, false, false] },
  { label: "Stagger", values: [true, false, false] },
  { label: "Intl formatting", values: [false, false, true] },
  { label: "Plugins", values: [false, false, true] },
  { kind: "divider", label: "Architecture" },
  { label: "Text + number focus", values: [true, true, false] },
  { label: "Zero dependencies", values: [false, true, false] },
  { label: "ESM only", values: [true, false, false] },
  { label: "Multi-framework", values: [false, true, true] },
  { label: "Custom wrapper element", values: [true, true, false] },
  { label: "Reduced motion", values: [true, true, true] },
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
  children: React.ReactNode;
}) {
  return (
    <div className={styles.panel}>
      <span className={styles.badge}>{label}</span>
      <div className={styles.panelContent}>{children}</div>
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

  const cycleText = () => setTextIndex((i) => (i + 1) % words.length);
  const cycleNumber = () => setNumberIndex((i) => (i + 1) % numbers.length);

  const word = words[textIndex];
  const value = numbers[numberIndex];

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Compare</h1>
      </div>

      <p className={styles.description}>
        Calligraph vs Torph vs NumberFlow — interactive demos and feature
        comparison.
      </p>

      <div>
        <Section title="Text Transitions">
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
          <Panel label="NumberFlow">
            <span className={styles.animatedText} style={{ opacity: 0.4 }}>
              N/A
            </span>
          </Panel>
        </Section>

        <Section title="Number Transitions">
          <Panel label="Calligraph">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <Calligraph variant="number" className={styles.animatedText}>
                {fmt.format(value)}
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
                {fmt.format(value)}
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
                format={{ style: "currency", currency: "USD" }}
                className={`${styles.animatedText} ${styles.numberFlow}`}
              />
            </button>
          </Panel>
        </Section>

        <Section title="Digit Spin (Slots)">
          <Panel label="Calligraph (slots)">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <Calligraph variant="slots" className={styles.animatedText}>
                {fmt.format(value)}
              </Calligraph>
            </button>
          </Panel>
          <Panel label="Calligraph (number)">
            <button
              type="button"
              className={styles.button}
              onClick={cycleNumber}
            >
              <Calligraph variant="number" className={styles.animatedText}>
                {fmt.format(value)}
              </Calligraph>
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
                format={{ style: "currency", currency: "USD" }}
                className={`${styles.animatedText} ${styles.numberFlow}`}
              />
            </button>
          </Panel>
        </Section>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Feature Comparison</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th>Calligraph</th>
              <th>Torph</th>
              <th>NumberFlow</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              if ("kind" in row) {
                return (
                  <tr key={row.label} className={styles.groupRow}>
                    <td colSpan={4}>{row.label}</td>
                  </tr>
                );
              }

              return (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>
                    <Cell value={row.values[0]} />
                  </td>
                  <td>
                    <Cell value={row.values[1]} />
                  </td>
                  <td>
                    <Cell value={row.values[2]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        by{" "}
        <a
          href="https://x.com/intent/follow?screen_name=raphaelsalaja"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          raphael salaja
        </a>
        {" / "}
        <a
          href="https://userinterface.wiki"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          userinterface.wiki
        </a>
      </footer>
    </div>
  );
}
