import { notFound } from "next/navigation";
import Link from "next/link";
import PurchaseButton from "@/components/PurchaseButton";
import SuccessMessage from "@/components/SuccessMessage";
export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const res = await fetch(`${process.env.API_URL}/ebooks/${id}`);
        const ebook = await res.json();
        return { title: ebook.title, description: ebook.description };
    } catch {
        return { title: "Ebook Details" };
    }
}

export default async function EbookDetailsPage({ params }) {
    const { id } = await params;
    let ebook = null;

    try {
        const res = await fetch(`${process.env.API_URL}/ebooks/${id}`, { cache: "no-store" });
        if (!res.ok) return notFound();
        ebook = await res.json();
    } catch {
        return notFound();
    }
   <SuccessMessage />
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                <div className="lg:w-72 shrink-0">
                    <div className="w-full h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600/30 to-[#241B45] flex items-center justify-center">
                        {ebook.coverImage ? (
                            <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-8xl">📖</span>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                    <div>
                        <span className="px-3 py-1 bg-violet-600/20 text-violet-400 text-sm rounded-full border border-violet-600/30">
                            {ebook.genre}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">{ebook.title}</h1>
                        <Link href={`/browse?writer=${ebook.writerName}`} className="text-gray-400 mt-2 hover:text-violet-400 transition-colors block">
                            by {ebook.writerName}
                        </Link>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{ebook.description}</p>

                    <div className="flex flex-col gap-3 text-gray-400">
                        <p className="flex items-center gap-2">
                            <span className="text-gray-500">Price:</span>
                            <span className="text-amber-400 font-bold text-xl">${ebook.price}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-gray-500">Status:</span>
                            <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${ebook.status === "published" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {ebook.status === "published" ? "Available" : "Unavailable"}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-gray-500">Uploaded:</span>
                            <span>{new Date(ebook.createdAt).toLocaleDateString("en-GB")}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-gray-500">Total Sales:</span>
                            <span>{ebook.totalSales}</span>
                        </p>
                    </div>

                    <PurchaseButton ebook={ebook} />
                </div>
            </div>
        </div>
    );
}