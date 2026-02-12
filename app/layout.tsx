import "./globals.css";
import AppShell from "@/components/AppShell";
import { Inter, Poppins } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Quest – Your Future Awaits",
    template: "%s | Quest",
  },
  description:
    "A readiness dashboard for tracking skill growth, progress, and personalized insights on your journey to becoming a Nova Pioneer.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}