"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href) =>
    `text-sm font-medium transition-colors ${pathname === href ? "text-violet-400" : "text-gray-400 hover:text-white"}`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0A1E] border-b border-[#1A1333]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="flex items-center gap-2 text-2xl">
            <Image src={"/ebook.png"} alt="booklogo" width={50} height={50}></Image>
            <p className="flex items-center">Fable</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass("/")}><span className="text-lg">Home</span></Link>
          <Link href="/browse" className={linkClass("/browse")}><span className="text-lg">Browse Ebooks</span></Link>
          <Link href="/dashboard" className={linkClass("/dashboard")}><span className="text-lg">Dashboard</span></Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="px-5 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"><span className="text-lg">Login</span></Link>
          <Link href="/register" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors"><span className="text-lg">Register</span></Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1A1333] px-4 pb-4 flex flex-col gap-4">
          <Link href="/" className={linkClass("/")} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/browse" className={linkClass("/browse")} onClick={() => setIsOpen(false)}>Browse Ebooks</Link>
          <Link href="/dashboard" className={linkClass("/dashboard")} onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/login" className="text-gray-400 hover:text-white text-sm" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/register" className="px-5 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl text-center" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;