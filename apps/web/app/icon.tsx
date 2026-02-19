import { cookies } from "next/headers";
import { ImageResponse } from "next/og";
import { type PaletteColor, step9 } from "@/lib/color";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const cookieStore = await cookies();
  const name = (cookieStore.get("color")?.value || "crimson") as PaletteColor;
  const hex = step9[name] || "#e5484d";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: hex,
        }}
      />
    </div>,
    { ...size },
  );
}
