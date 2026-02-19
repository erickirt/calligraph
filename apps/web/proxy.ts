import { type NextRequest, NextResponse } from "next/server";
import { palette, step9 } from "@/lib/color";

export function proxy(request: NextRequest) {
  const name = palette[Math.floor(Math.random() * palette.length)];

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-color-name", name);
  requestHeaders.set("x-color-hex", step9[name]);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.cookies.set("color", name, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/"],
};
