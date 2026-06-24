import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Fable", template: "%s | Fable" },
  description: "Discover and read original ebooks on Fable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${geist.className} min-h-screen flex flex-col bg-[#0F0A1E] text-gray-200`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}