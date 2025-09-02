import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/TemplateParts/Footer";

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
		  <main className="min-h-screen p-6 sm:p-10 mx-auto max-w-3xl">
			  {children}
		  </main>
		  <Footer />
      </body>
    </html>
  );
}
