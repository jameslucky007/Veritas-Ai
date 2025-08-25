// app/layout.js
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ClientRoot from "./ClientRoot"; // must have "use client"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Veritas AI",
  description: "It is a fact-checking AI software",
  icons: { icon: "/tab.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        {/* 👇 Hydration-safe wrapper */}
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
