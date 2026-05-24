import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SCHOOL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Basic validation
    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    await resend.emails.send({
      from: "CAS Website <onboarding@resend.dev>",
      to: "siddharthmeenasiddhu@gmail.com",
      subject: `Contact Form: ${subject || "General Enquiry"} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Message</h2>
            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">Received via CAS Website Contact Page</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-top: none;">
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 35%;">Name</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${phone || "Not provided"}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${email || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${subject || "General Enquiry"}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Message</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; white-space: pre-wrap;">${message}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold;">Submitted At</td>
              <td style="padding: 12px 16px;">${submittedAt}</td>
            </tr>
          </table>
          <div style="padding: 12px 16px; background: #eff6ff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 13px; color: #1e40af;">
              Reply to <strong>${email || "sender (no email provided)"}</strong> or call <strong>${phone || "N/A"}</strong>.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Something went wrong. Please call us at ${SCHOOL.phone1}.`,
      },
      { status: 500 }
    );
  }
}
