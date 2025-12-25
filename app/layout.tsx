import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mind Palace - Your thinking space, reimagined",
  description:
    "A calm, visual way to organize thoughts, ideas, and information.",
  icons: {
    icon: [
      {
        url: "/mplogo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/mplogo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
