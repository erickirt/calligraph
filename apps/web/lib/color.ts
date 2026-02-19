export const palette = [
  "crimson",
  "violet",
  "indigo",
  "cyan",
  "teal",
  "orange",
  "plum",
] as const;

export type PaletteColor = (typeof palette)[number];

export const step9: Record<PaletteColor, string> = {
  crimson: "#e5484d",
  violet: "#8e4ec6",
  indigo: "#3e63dd",
  cyan: "#00a2c7",
  teal: "#12a594",
  orange: "#f76b15",
  plum: "#ab4aba",
};
