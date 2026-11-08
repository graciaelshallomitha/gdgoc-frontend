import type { Metadata } from "next";
import "@fontsource-variable/google-sans";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDGoC UGM – Open Recruitment",
  description:
    "Google Developer Groups on Campus, Universitas Gadjah Mada. A place for curious minds to learn, connect, and build technology together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}