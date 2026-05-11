"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "ok" | "error";
  message: string;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_ADDRESS = "adityanmishra36@gmail.com";

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!email || !topic || !content) {
    return { status: "error", message: "Please fill in all fields." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      status: "error",
      message:
        "Email service is not configured yet. Please reach out via email or LinkedIn instead.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_ADDRESS,
      replyTo: email,
      subject: `[Portfolio] ${topic}`,
      text: `From: ${email}\nTopic: ${topic}\n\n${content}`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        status: "error",
        message: "Could not send your message. Try email or LinkedIn?",
      };
    }

    return {
      status: "ok",
      message: "Thanks — message sent. I'll get back to you soon.",
    };
  } catch (err) {
    console.error("Contact form error:", err);
    return {
      status: "error",
      message: "Could not send your message. Try email or LinkedIn?",
    };
  }
}
