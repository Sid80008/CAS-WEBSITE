"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function submitContact(prevState: any, formData: FormData) {
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
      error: parsed.error.errors[0].message,
    };
  }

  // Simulate network delay and DB saving/emailing for now, 
  // until a real mailer like Resend or DB schema for inquiries is implemented.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: "Your message has been sent successfully. We will get back to you soon.",
  };
}
