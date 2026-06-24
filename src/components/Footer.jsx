import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A1333] border-t border-[#241B45] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-3">📚 Fable</h2>
            <p className="text-text-gray-400 max-w-sm">A digital platform connecting ebook lovers with talented writers. Discover, read, and share original ebooks.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-[#241B45] flex items-center justify-center text-text-gray-400 hover:text-white hover:bg-[#7C3AED] transition-colors"><FaTwitter /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#241B45] flex items-center justify-center text-text-gray-400 hover:text-white hover:bg-[#7C3AED] transition-colors"><FaFacebookF /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#241B45] flex items-center justify-center text-text-gray-400 hover:text-white hover:bg-[#7C3AED] transition-colors"><FaInstagram /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#241B45] flex items-center justify-center text-text-gray-400 hover:text-white hover:bg-[#7C3AED] transition-colors"><FaGithub /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/browse" className="text-text-gray-400 hover:text-white transition-colors">Browse Ebooks</Link>
              <Link href="/login" className="text-text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="text-text-gray-400 hover:text-white transition-colors">Register</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-text-gray-400 text-sm mb-3">Stay updated with new releases.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 bg-[#241B45] text-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED]" />
              <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-sm hover:bg-violet-600 transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#241B45] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-gray-400 text-sm">2026 Fable. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-text-gray-400">
            <span className="hover:text-white cursor-pointer">About</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;