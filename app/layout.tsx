import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import LoadingScreen from "@/components/LoadingScreen";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Central Academy Senior Secondary School, Anta",
    template: "%s | CAS Anta",
  },
  description:
    "Central Academy Senior Secondary School (CAS), Anta, Baran, Rajasthan. CBSE affiliated school offering Classes I–XII with modern facilities, experienced faculty, and over a decade of academic excellence.",
  metadataBase: new URL("https://centralacademyantah.vercel.app"),
  openGraph: {
    siteName: "Central Academy Senior Secondary School",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <LoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


