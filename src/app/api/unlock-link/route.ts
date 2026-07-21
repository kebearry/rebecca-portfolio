import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "../../lib/rate-limit";
import { resolveProtectedLink } from "../../lib/protected-links";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limited = rateLimit(`unlock:${ip}`, 10, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please try again later." },
        {
          status: 429,
          headers: limited.retryAfterSec
            ? { "Retry-After": String(limited.retryAfterSec) }
            : undefined,
        }
      );
    }

    const { password, id } = await req.json();

    if (typeof password !== "string" || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const expectedPassword = process.env.LINK_PASSWORD || process.env.EMAIL_PASS;
    if (!expectedPassword) {
      console.error("Missing LINK_PASSWORD or EMAIL_PASS");
      return NextResponse.json(
        { success: false, message: "Unlock is not configured" },
        { status: 500 }
      );
    }

    const url = resolveProtectedLink(id.trim());

    if (!url || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error unlocking link:", error);
    return NextResponse.json(
      { success: false, message: "Failed to unlock link" },
      { status: 500 }
    );
  }
}
