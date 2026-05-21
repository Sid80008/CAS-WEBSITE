import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Central Academy Senior Secondary School, antah",
    template: "%s | CAS antah",
  },
  description:
    "Central Academy Senior Secondary School (CAS), antah, Baran, Rajasthan. RBSE affiliated school offering Classes I–XII with modern facilities, experienced faculty, and over a decade of academic excellence.",
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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <CustomCursor />
        <LoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


