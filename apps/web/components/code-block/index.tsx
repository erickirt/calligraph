import styles from "./styles.module.css";

interface CodeBlockProps {
  children: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className={styles.root}>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
