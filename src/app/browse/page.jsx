"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";

const genres = ["Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help"];

const SkeletonCard = () => (
    <div className="bg-[#1A1333] rounded-2xl overflow-hidden border border-[#241B45] animate-pulse">
        <div className="h-48 bg-[#241B45]" />
        <div className="p-5 flex flex-col gap-3">
            <div className="h-3 bg-[#241B45] rounded w-1/3" />
            <div className="h-5 bg-[#241B45] rounded w-3/4" />
            <div className="h-3 bg-[#241B45] rounded w-1/2" />
            <div className="h-4 bg-[#241B45] rounded w-1/4" />
        </div>
    </div>
);

const EbookCard = ({ ebook }) => (
    <Link href={`/ebooks/${ebook._id}`} className="bg-[#1A1333] rounded-2xl overflow-hidden border border-[#241B45] hover:border-violet-500/50 transition-all hover:-translate-y-1 group block">
        <div className="h-48 bg-gradient-to-br from-violet-600/30 to-[#241B45] flex items-center justify-center overflow-hidden">
            {ebook.coverImage ? (
                <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover" />
            ) : (
                <span className="text-6xl">📖</span>
            )}
        </div>
        <div className="p-5">
            <span className="text-xs text-violet-400 font-medium uppercase tracking-wide">{ebook.genre}</span>
            <h3 className="text-white font-bold text-lg mt-1 mb-1 line-clamp-1">{ebook.title}</h3>
            <p className="text-gray-400 text-sm mb-3">by {ebook.writerName}</p>
            <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">${ebook.price}</span>
                <span className="text-violet-400 text-sm">View Details →</span>
            </div>
        </div>
    </Link>
);

export default function BrowsePage() {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("");

    const fetchEbooks = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (genre) params.append("genre", genre);
            if (sort) params.append("sort", sort);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks?${params}`);
            const data = await res.json();
            setEbooks(Array.isArray(data) ? data : []);
        } catch {
            setEbooks([]);
        }
        setLoading(false);
    };

    useEffect(() => { fetchEbooks(); }, [genre, sort]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEbooks();
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Browse Ebooks</h1>
                <p className="text-gray-400">Discover original ebooks from talented writers</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title or writer..."
                        className="flex-1 bg-[#1A1333] border border-[#241B45] text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500"
                    />
                    <button type="submit" className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors">
                        <HiSearch size={20} />
                    </button>
                </form>

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-[#1A1333] border border-[#241B45] text-gray-400 px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500"
                >
                    <option value="">All Genres</option>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-[#1A1333] border border-[#241B45] text-gray-400 px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500"
                >
                    <option value="">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : ebooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-[#241B45] rounded-2xl py-20 text-center">
                    <span className="text-6xl mb-4">📭</span>
                    <p className="text-white font-bold text-xl">No ebooks found</p>
                    <p className="text-gray-400 mt-2">Try a different search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ebooks.map(ebook => <EbookCard key={ebook._id} ebook={ebook} />)}
                </div>
            )}
        </div>
    );
}