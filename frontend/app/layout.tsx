import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khusaal FPO",
  description: "Khusaal FPO website",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}