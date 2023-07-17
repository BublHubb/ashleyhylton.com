import "./globals.css";
import { Titillium_Web } from "next/font/google";

const titillium_Web = Titillium_Web({
  weight: ["400", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ashley Hylton | Software Developer",
  description: "Software Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={titillium_Web.className}>{children}</body>
    </html>
  );
}
