import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ClientRoot from "./ClientRoot";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-Roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Veritas AI",
  description: "It Is a Fact checking AI software",
  icons: { icon: "/tab.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
