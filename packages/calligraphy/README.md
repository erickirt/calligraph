# Calligraphy

Fluid text transitions powered by [Motion](https://motion.dev). Shared characters slide to their new positions while entering characters fade in and exiting ones fade out.

## Install

```bash
npm install calligraphy
```

## Usage

```tsx
import { Calligraphy } from "calligraphy";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Hello");

  return (
    <>
      <Calligraphy>{text}</Calligraphy>
      <button onClick={() => setText("World")}>Change</button>
    </>
  );
}
```

When `children` changes, characters common to both strings slide into their new positions. New characters fade in, removed characters fade out.

## Props

`Calligraphy` accepts all `HTMLMotionProps<"span">` from Motion, plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | — | Text to display and animate |
| `transition` | `Transition` | `{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }` | Motion transition for all character animations |
| `className` | `string` | — | Class applied to the outer `<span>` |
| `style` | `CSSProperties` | — | Inline styles merged onto the outer `<span>` |

Any additional props are forwarded to the root `motion.span`.

## How it works

1. Computes the [Longest Common Subsequence](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem) between the previous and next text
2. Matched characters keep their identity and animate position via Motion's `layout="position"`
3. New characters enter with `opacity: 0 → 1`
4. Removed characters exit with `opacity: 1 → 0`

## Best practices

- **Keep strings short** — works best with words or short phrases, not paragraphs
- **Avoid rapid updates** — let one transition finish before starting the next
- **Use similar-length strings** — transitions between "Hello" and "World" look better than "Hi" and "Congratulations"
- **Set a container width** — animate the parent's width to prevent layout jumps when text length changes
- **Match your transition to context** — use shorter durations (~0.2s) for frequent updates, longer (~0.5s) for deliberate changes

## Custom transitions

```tsx
<Calligraphy transition={{ type: "spring", stiffness: 200, damping: 20 }}>
  {text}
</Calligraphy>
```

## Requirements

- React 18+
- Motion 11+

## License

MIT

---

Made by [Raphael Salaja](https://github.com/raphaelsalaja)
