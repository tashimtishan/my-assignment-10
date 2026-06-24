import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-[#0F0A1E] to-[#0F0A1E]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-violet-600/20 text-violet-400 text-sm font-medium rounded-full mb-6 border border-violet-600/30">
            The home for original ebooks
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Discover &amp; Read
            <span className="text-violet-400"> Original</span>
            <br />Ebooks
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            Connect with talented writers. Browse thousands of original ebooks across every genre. Start reading today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/browse" className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors text-center text-lg">
              Browse Ebooks
            </Link>
            <Link href="/register" className="px-8 py-4 border border-[#241B45] hover:border-violet-600 text-white font-semibold rounded-xl transition-colors text-center text-lg">
              Start Writing
            </Link>
          </div>
          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-gray-400 text-sm">Ebooks</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-gray-400 text-sm">Writers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-gray-400 text-sm">Readers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;