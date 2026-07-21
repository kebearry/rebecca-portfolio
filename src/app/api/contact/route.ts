import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getClientIp, rateLimit } from "../../lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function getMailAuth() {
  const user = process.env.EMAIL_USER?.trim();
  // Gmail app passwords are often copied with spaces — strip them
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "");
  return { user, pass };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limited = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: limited.retryAfterSec
            ? { "Retry-After": String(limited.retryAfterSec) }
            : undefined,
        }
      );
    }

    const { name, email, message, website } = await req.json();

    // Honeypot: bots often fill hidden fields
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully!",
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid form data" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (
      trimmedName.length > MAX_NAME ||
      trimmedEmail.length > MAX_EMAIL ||
      trimmedMessage.length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { success: false, message: "Input too long" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    const { user, pass } = getMailAuth();
    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return NextResponse.json(
        { success: false, message: "Email is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: user,
      replyTo: trimmedEmail,
      subject: `[Portfolio] New Contact Form Submission from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error sending email:", message);

    const isAuthFailure =
      /Invalid login|BadCredentials|EAUTH|535/i.test(message);

    return NextResponse.json(
      {
        success: false,
        message: isAuthFailure
          ? "Email login failed. Check EMAIL_USER / EMAIL_PASS on Vercel."
          : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
