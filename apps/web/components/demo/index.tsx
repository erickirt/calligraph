"use client";

import { faker } from "@faker-js/faker";
import { Calligraphy } from "calligraphy";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";

export function Demo() {
  const [text, setText] = useState("calligraphy");

  const shuffle = useCallback(() => {
    setText(faker.word.adjective());
  }, []);

  return (
    <div className={styles.root}>
      <button type="button" className={styles.button} onClick={shuffle}>
        <Calligraphy className={styles.text}>{text}</Calligraphy>
      </button>
    </div>
  );
}
