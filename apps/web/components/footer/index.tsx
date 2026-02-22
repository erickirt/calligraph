import Link from "next/link";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a
          href="https://x.com/intent/follow?screen_name=raphaelsalaja"
          target="_blank"
          rel="noopener noreferrer"
        >
          raphael salaja
        </a>
        {" / "}
        <a
          href="https://userinterface.wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          ui.wiki
        </a>
      </div>
      <div className={styles.links}>
        <Link href="/">home</Link>
        <Link href="/compare">compare</Link>
      </div>
    </footer>
  );
}
