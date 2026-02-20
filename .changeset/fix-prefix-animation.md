---
"calligraph": patch
---

Fix number variant animating currency/prefix symbols (e.g. `$`, `€`) on value change. Prefix characters now keep stable keys and only use layout positioning, so they slide smoothly without triggering rolling, blur, or fade animations.
