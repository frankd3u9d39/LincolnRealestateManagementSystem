import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LincolnEstate - Admin Dashboard",
  description: "Real Estate & Estate Community Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-surface text-dark">
        {children}
      </body>
    </html>
  );
}
