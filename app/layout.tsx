"use client";

import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { FirebaseProvider } from "@/firebase/FirebaseContext";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/firebase/init";

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
      {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProvider> */}
      <body className={titillium_Web.className}>{children}</body>
      {/* </FirebaseProvider>
      </FirebaseAppProvider> */}
    </html>
  );
}
