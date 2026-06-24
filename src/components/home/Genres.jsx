import Link from "next/link";

const genres = [
  { name: "Fiction", emoji: "✍️" },
  { name: "Mystery", emoji: "🔍" },
  { name: "Romance", emoji: "💕" },
  { name: "Sci-Fi", emoji: "🚀" },
  { name: "Fantasy", emoji: "🧙" },
  { name: "Horror", emoji: "👻" },
  { name: "Biography", emoji: "📜" },
  { name: "Self-Help", emoji: "💡" },
];

const Genres = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-[#7C3AED] text-sm font-medium uppercase tracking-wide mb-2">explore</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Browse by Genre</h2>
        <p className="text-gray-400 mt-4">Find your next favorite read in any category.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre.name}
            href={`/browse?genre=${genre.name}`}
            className="bg-[#1A1333] hover:bg-[#7C3AED]/20 border border-[#241B45] hover:border-[#7C3AED]/50 rounded-2xl p-6 text-center transition-all group"
          >
            <span className="text-4xl mb-3 block">{genre.emoji}</span>
            <p className="text-white font-medium group-hover:text-[#7C3AED] transition-colors">{genre.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Genres;