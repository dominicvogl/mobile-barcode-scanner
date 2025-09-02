import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/TemplateParts/Footer";

// Load local Inter fonts (regular 400 and semibold 600)
const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/inter-v19-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/inter-v19-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "EAN Code Scanner",
  description: "Scan your barcodes and ean codes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" data-theme={"pastel"}>
      <body className={`${inter.variable} antialiased`}>
        <main className="p-6 sm:p-10 mx-auto max-w-4xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
