"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function submitContact(prevState: any, formData: FormData): Promise<ContactFormState> {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  try {
    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    await resend.emails.send({
      from: "CAS Website <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "admin@cas.com",
      subject: `Contact Form: ${data.subject || "General Enquiry"} — from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Message</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
            <tr><td style="padding: 12px; font-weight: bold;">Name</td><td style="padding: 12px;">${data.name}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold;">Email</td><td style="padding: 12px;">${data.email || "N/A"}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold;">Subject</td><td style="padding: 12px;">${data.subject || "N/A"}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold;">Message</td><td style="padding: 12px;">${data.message}</td></tr>
          </table>
        </div>
      `,
    });
  } catch (error) {
    console.error("Resend error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Your message has been sent successfully. We will get back to you soon.",
  };
}
