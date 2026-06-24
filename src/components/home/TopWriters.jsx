const writers = [
  { name: "Sarah Ahmed", books: 12, sales: 340, initial: "S" },
  { name: "Rahul Khan", books: 8, sales: 280, initial: "R" },
  { name: "Aisha Begum", books: 15, sales: 420, initial: "A" },
];

const TopWriters = () => {
  return (
    <section className="bg-[#1A1333] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#7C3AED] text-sm font-medium uppercase tracking-wide mb-2">community</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Top Writers</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">Meet the most celebrated authors on Fable with the highest reader engagement.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {writers.map((writer, i) => (
            <div key={i} className="bg-[#241B45] rounded-2xl p-6 text-center border border-[#241B45] hover:border-[#7C3AED]/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {writer.initial}
              </div>
              <h3 className="text-white font-bold text-lg">{writer.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{writer.books} ebooks published</p>
              <p className="text-[#F59E0B] text-sm font-medium mt-1">{writer.sales} total sales</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWriters;