import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CartWitness",
  description: "Bokningssystem för vagnpass",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}

