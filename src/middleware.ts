import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rest = "49.205.xx.xx";

export function middleware(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || "unknown";

  console.log("Detected IP:", ip);

  if (ip !== rest) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h1>An unexpected error occurred in the Server Components render.</h1>
        <p>The specific message is hidden in production builds.</p>
        <p>Error digest: 1729477121</p>
      </body></html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  return NextResponse.next();
}
