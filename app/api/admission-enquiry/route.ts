import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SCHOOL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      studentName,
      parentName,
      phone,
      email,
      grade,
      message,
    } = body;

    // Basic validation
    if (!studentName || !parentName || !phone) {
      return NextResponse.json(
        { success: false, error: "Student name, parent name, and phone are required." },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Send notification email to school
    await resend.emails.send({
      from: "CAS Website <onboarding@resend.dev>",
      to: SCHOOL.email,
      subject: `New Admission Enquiry — ${studentName} (Class ${grade || "Not specified"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Admission Enquiry</h2>
            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">Received via CAS Website</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-top: none;">
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 40%;">Student Name</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${studentName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Parent Name</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${parentName}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;"><strong>${phone}</strong></td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${email || "Not provided"}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Class Applying For</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${grade || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Message</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${message || "None"}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px 16px; font-weight: bold;">Submitted At</td>
              <td style="padding: 12px 16px;">${submittedAt}</td>
            </tr>
          </table>
          <div style="padding: 16px; background: #fef3c7; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0; font-size: 13px; color: #92400e;">
              📞 Please contact the parent at <strong>${phone}</strong> within 1–2 working days.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to parent if they gave an address
    if (email) {
      await resend.emails.send({
        from: "Central Academy School <onboarding@resend.dev>",
        to: email,
        subject: "We received your admission enquiry — CAS Anta",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">Enquiry Received ✓</h2>
              <p style="margin: 4px 0 0; opacity: 0.8;">Central Academy Senior Secondary School, Anta</p>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p>Dear <strong>${parentName}</strong>,</p>
              <p>Thank you for your admission enquiry for <strong>${studentName}</strong> (Class ${grade || "—"}).</p>
              <p>Our admissions team will contact you within <strong>1–2 working days</strong> on <strong>${phone}</strong>.</p>
              <p>For urgent queries, please call us directly:</p>
              <ul>
                <li>📞 ${SCHOOL.phone1}</li>
                <li>📞 ${SCHOOL.phone2}</li>
              </ul>
              <p>📍 ${SCHOOL.address}</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 12px; color: #6b7280;">
                This is an automated confirmation from the CAS website. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admission enquiry error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Something went wrong. Please call us at ${SCHOOL.phone1}.`,
      },
      { status: 500 }
    );
  }
}
