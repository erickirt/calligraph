import styles from "./styles.module.css";

interface CodeBlockProps {
  children: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className={styles.root}>
      <code className={styles.code}>{children}</code>
    </div>
  );
}
