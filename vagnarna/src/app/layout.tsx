import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Vagnarna.se",
  description: "Bokningssystem för litteraturvagnar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="container py-8">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
