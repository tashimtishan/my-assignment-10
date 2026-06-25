"use client";

import { authClient } from "@/lib/auth-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
    const { data: session } = authClient.useSession();
    const token = useAuthToken();
    const router = useRouter();
    const [purchases, setPurchases] = useState([]);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("purchases");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const load = async () => {
            try {
                const [userRes, purchaseRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/my-purchases`, { headers: { "Authorization": `Bearer ${token}` } }),
                ]);
                const userData = await userRes.json();
                const purchaseData = await purchaseRes.json();
                if (userData.role === "admin") { router.push("/dashboard/admin"); return; }
                if (userData.role === "writer") { router.push("/dashboard/writer"); return; }
                setUser(userData);
                setPurchases(Array.isArray(purchaseData) ? purchaseData : []);
            } catch { }
            setLoading(false);
        };
        load();
    }, [token]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-8">My Dashboard</h1>

            <div className="flex gap-3 mb-8">
                {["purchases", "profile"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer capitalize ${activeTab === tab ? "bg-violet-600 text-white" : "border border-[#241B45] text-gray-400 hover:text-white"}`}>
                        {tab === "purchases" ? "Purchased Ebooks" : "My Profile"}
                    </button>
                ))}
            </div>

            {activeTab === "purchases" && (
                <div>
                    {purchases.length === 0 ? (
                        <div className="border border-dashed border-[#241B45] rounded-2xl py-20 flex flex-col items-center gap-3 text-center">
                            <span className="text-6xl">📚</span>
                            <p className="text-white font-bold text-xl">No purchases yet</p>
                            <p className="text-gray-400">Browse ebooks and buy your first one</p>
                            <Link href="/browse" className="mt-2 px-6 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">Browse Ebooks</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {purchases.map(ebook => (
                                <Link href={`/ebooks/${ebook._id}`} key={ebook._id}
                                    className="bg-[#1A1333] rounded-2xl overflow-hidden border border-[#241B45] hover:border-violet-500/50 transition-all block">
                                    <div className="h-40 bg-gradient-to-br from-violet-600/30 to-[#241B45] flex items-center justify-center overflow-hidden">
                                        {ebook.coverImage ? <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover" /> : <span className="text-5xl">📖</span>}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-bold">{ebook.title}</h3>
                                        <p className="text-gray-400 text-sm">by {ebook.writerName}</p>
                                        <span className="text-green-400 text-xs mt-2 block">✓ Purchased</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === "profile" && user && (
                <div className="bg-[#1A1333] rounded-2xl border border-[#241B45] p-8 max-w-md">
                    <div className="flex items-center gap-4 mb-6">
                        {user.image ? (
                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="text-white font-bold text-xl">{user.name}</p>
                            <p className="text-gray-400">{user.email}</p>
                            <span className="text-xs px-2 py-0.5 bg-violet-600/20 text-violet-400 rounded-full capitalize">{user.role}</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm">Total Purchases: <span className="text-white font-medium">{purchases.length}</span></p>
                </div>
            )}
        </div>
    );
}