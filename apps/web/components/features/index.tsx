"use client";

import { Calligraph } from "calligraph";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const words = ["Calligraph", "Craft", "Creative", "Create"];
const prices = [35.99, 24.89, 17.38, 3.15];
const spins = [1204, 387, 52, 9631];

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function useCycle(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  const advance = () => setIndex((prev) => (prev + 1) % length);

  return { index, advance };
}

function Card({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.label}>{label}</span>
      <div className={styles.cardContent}>{children}</div>
    </button>
  );
}

export function Features() {
  const text = useCycle(words.length, 2500);
  const number = useCycle(prices.length, 3000);
  const slots = useCycle(spins.length, 3500);

  return (
    <div className={styles.grid}>
      <Card label="Text" onClick={text.advance}>
        <Calligraph variant="text" className={styles.value}>
          {words[text.index]}
        </Calligraph>
      </Card>

      <Card label="Number" onClick={number.advance}>
        <Calligraph
          variant="number"
          animation="snappy"
          className={styles.value}
        >
          {fmt.format(prices[number.index])}
        </Calligraph>
      </Card>

      <Card label="Slots" onClick={slots.advance}>
        <Calligraph variant="slots" animation="snappy" className={styles.value}>
          {fmt.format(spins[slots.index])}
        </Calligraph>
      </Card>
    </div>
  );
}
