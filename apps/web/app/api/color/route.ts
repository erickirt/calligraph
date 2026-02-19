import { cookies } from "next/headers";
import { type PaletteColor, step9 } from "@/lib/color";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const name = (cookieStore.get("color")?.value || "crimson") as PaletteColor;
  return Response.json({ name, hex: step9[name] || "#e5484d" });
}
