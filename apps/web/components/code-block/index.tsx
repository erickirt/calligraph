import { codeToHtml } from "shiki";
import styles from "./styles.module.css";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export async function CodeBlock({
  children,
  language = "tsx",
}: CodeBlockProps) {
  const html = await codeToHtml(children, {
    lang: language,
    theme: "github-light",
  });

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted Shiki output at build time
    <div className={styles.root} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
