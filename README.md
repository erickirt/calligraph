# Calligraphy

[![npm version](https://img.shields.io/npm/v/calligraphy)](https://www.npmjs.com/package/calligraphy)
[![npm downloads](https://img.shields.io/npm/dm/calligraphy)](https://www.npmjs.com/package/calligraphy)

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

## Acknowledgments

- [Jace](https://github.com/jace-ai) for pushing me to build this
