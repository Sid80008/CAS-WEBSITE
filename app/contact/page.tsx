import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Central Academy Senior Secondary School, Anta. Phone: +91-7737689684. Email: centralacademyanta@gmail.com. Near Sahkari Petrol Pump, Kota Road, Anta, Baran, Rajasthan.",
};

export default function ContactPage() {
  return <ContactForm />;
}
