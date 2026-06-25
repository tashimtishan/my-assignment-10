"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
  };

  const linkClass = (href) =>
    `text-sm font-medium transition-colors ${pathname === href ? "text-violet-400" : "text-gray-400 hover:text-white"}`;

  const navLinks = (
    <>
      <Link href="/" className={linkClass("/")}><span className="text-lg">Home</span></Link>
      <Link href="/browse" className={linkClass("/browse")}><span className="text-lg">Browse Ebooks</span></Link>
      <Link href="/dashboard" className={linkClass("/dashboard")}><span className="text-lg">Dashboard</span></Link>
    </>
  );

  const authLinks = (
    <>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {user?.image ? (
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={user.image} alt={user.name} width={36} height={36} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-white text-sm font-medium hidden lg:block">{user?.name}</span>
          </div>
          <button
            onClick={handleSignout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium rounded-xl transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link href="/login" className="px-5 py-2 text-gray-400 hover:text-white text-lg font-medium transition-colors">Login</Link>
          <Link href="/register" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-lg font-medium rounded-xl transition-colors">Register</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0A1E] border-b border-[#1A1333]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/ebook.png"} alt="booklogo" width={50} height={50} />
          <p className="text-2xl font-bold text-white">Fable</p>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {authLinks}
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
          <div className="flex flex-col gap-3 pt-2 border-t border-[#241B45]">
            {authLinks}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;