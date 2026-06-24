import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const EbookCard = ({ ebook }) => (
  <div className="bg-[#1A1333] rounded-2xl overflow-hidden border border-[#241B45] hover:border-[#7C3AED]/50 transition-all hover:-translate-y-1 group">
    <div className="h-48 bg-linear-to-br from-[#7C3AED]/30 to-[#241B45] flex items-center justify-center">
      <span className="text-6xl">📖</span>
    </div>
    <div className="p-5">
      <span className="text-xs text-[#7C3AED] font-medium uppercase tracking-wide">{ebook.genre}</span>
      <h3 className="text-white font-bold text-lg mt-1 mb-1">{ebook.title}</h3>
      <p className="text-gray-400 text-sm mb-3">by {ebook.writer}</p>
      <div className="flex items-center justify-between">
        <span className="text-[#F59E0B] font-bold">${ebook.price}</span>
        <Link href={`/ebooks/${ebook._id}`} className="text-[#7C3AED] text-sm hover:underline flex items-center gap-1">
          View Details <HiArrowRight />
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedEbooks = async () => {
  let ebooks = [];
  try {
    const res = await fetch(`${process.env.API_URL}/ebooks?limit=6`, { cache: "no-store" });
    if (res.ok) ebooks = await res.json();
  } catch {
    ebooks = [];
  }

  const placeholders = [
    { _id: "1", title: "The Last Chapter", writer: "Sarah Ahmed", genre: "Fiction", price: 9.99 },
    { _id: "2", title: "Digital Dreams", writer: "Rahul Khan", genre: "Sci-Fi", price: 12.99 },
    { _id: "3", title: "Midnight Mystery", writer: "Aisha Begum", genre: "Mystery", price: 7.99 },
    { _id: "4", title: "Love in Dhaka", writer: "Farhan Islam", genre: "Romance", price: 8.99 },
    { _id: "5", title: "The Dark Forest", writer: "Nadia Hossain", genre: "Horror", price: 11.99 },
    { _id: "6", title: "Beyond the Stars", writer: "Karim Ali", genre: "Fantasy", price: 10.99 },
  ];

  const displayEbooks = ebooks.length > 0 ? ebooks : placeholders;

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[#7C3AED] text-sm font-medium uppercase tracking-wide mb-2">handpicked for you</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Ebooks</h2>
        </div>
        <Link href="/browse" className="hidden md:flex items-center gap-2 text-text-gray-400 hover:text-white transition-colors">
          View all <HiArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayEbooks.slice(0, 6).map((ebook) => (
          <EbookCard key={ebook._id} ebook={ebook} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEbooks;