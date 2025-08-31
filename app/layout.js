import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "EAN Code Scanner",
  description: "Scan your barcodes and ean codes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={"pastel"}>
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
