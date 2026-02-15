import { CodeBlock } from "../components/code-block";
import { Demo } from "../components/demo";
import styles from "./styles.module.css";

const usageCode = `import { Calligraphy } from "calligraphy";
import { faker } from '@faker-js/faker';

function App() {
  const text = faker.word.adjective()
  
  function onClick() {
    text = faker.word.adjective();
  }

  return (
    <>
      <Calligraphy>{text}</Calligraphy>
      <button type="button" onClick={onClick}>Shuffle</button>
    </>
  )
}`;

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Calligraphy</h1>
        <span className={styles.version}>v1.0.0</span>
      </div>

      <p className={styles.description}>
        Fluid text transitions powered by Motion. Shared characters slide to
        their new positions while entering characters fade in and exiting ones
        fade out.
      </p>

      <Demo />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Installation</h2>
        <CodeBlock copyable>npm install calligraphy</CodeBlock>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage</h2>
        <CodeBlock>{usageCode}</CodeBlock>
      </div>
    </div>
  );
}
