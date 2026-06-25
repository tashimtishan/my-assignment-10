"use client";

import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function WriterDashboard() {
    const token = useAuthToken();
    const router = useRouter();
    const [ebooks, setEbooks] = useState([]);
    const [sales, setSales] = useState([]);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("ebooks");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEbook, setEditingEbook] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", content: "", price: "", genre: "", coverImage: "" });
    const [imgLoading, setImgLoading] = useState(false);

    const genres = ["Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help"];

    useEffect(() => {
        if (!token) return;
        const load = async () => {
            try {
                const [userRes, ebooksRes, salesRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/my`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/writer-sales`, { headers: { "Authorization": `Bearer ${token}` } }),
                ]);
                const userData = await userRes.json();
                if (userData.role === "admin") { router.push("/dashboard/admin"); return; }
                if (userData.role === "user") { router.push("/dashboard/user"); return; }
                setUser(userData);
                setEbooks(await ebooksRes.json());
                setSales(await salesRes.json());
            } catch { }
            setLoading(false);
        };
        load();
    }, [token]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgLoading(true);
        const data = new FormData();
        data.append("image", file);
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            setFormData(prev => ({ ...prev, coverImage: result.data.url }));
            toast.success("Image uploaded!");
        } catch {
            toast.error("Image upload failed");
        }
        setImgLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingEbook
                ? `${process.env.NEXT_PUBLIC_API_URL}/ebooks/${editingEbook._id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/ebooks`;
            const method = editingEbook ? "PATCH" : "POST";
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
            });
            toast.success(editingEbook ? "Ebook updated!" : "Ebook added!");
            setShowForm(false);
            setEditingEbook(null);
            setFormData({ title: "", description: "", content: "", price: "", genre: "", coverImage: "" });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/my`, { headers: { "Authorization": `Bearer ${token}` } });
            setEbooks(await res.json());
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this ebook?")) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        toast.success("Deleted!");
        setEbooks(prev => prev.filter(e => e._id !== id));
    };

    const handleToggleStatus = async (ebook) => {
        const newStatus = ebook.status === "published" ? "unpublished" : "published";
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/${ebook._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus }),
        });
        toast.success(`Ebook ${newStatus}!`);
        setEbooks(prev => prev.map(e => e._id === ebook._id ? { ...e, status: newStatus } : e));
    };

    const openEdit = (ebook) => {
        setEditingEbook(ebook);
        setFormData({ title: ebook.title, description: ebook.description, content: ebook.content, price: ebook.price, genre: ebook.genre, coverImage: ebook.coverImage });
        setShowForm(true);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-8">Writer Dashboard</h1>

            <div className="flex gap-3 mb-8 flex-wrap">
                {["ebooks", "sales", "profile"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer capitalize ${activeTab === tab ? "bg-violet-600 text-white" : "border border-[#241B45] text-gray-400 hover:text-white"}`}>
                        {tab === "ebooks" ? "My Ebooks" : tab === "sales" ? "Sales History" : "Profile"}
                    </button>
                ))}
                <button onClick={() => { setShowForm(true); setEditingEbook(null); setFormData({ title: "", description: "", content: "", price: "", genre: "", coverImage: "" }); }}
                    className="px-6 py-2.5 rounded-xl font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer ml-auto">
                    + Add Ebook
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
                    <div className="relative bg-[#1A1333] rounded-2xl border border-[#241B45] p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto z-10"
                        onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-white mb-6">{editingEbook ? "Edit Ebook" : "Add New Ebook"}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {[
                                { label: "Title", key: "title", type: "text" },
                                { label: "Price ($)", key: "price", type: "number" },
                            ].map(({ label, key, type }) => (
                                <div key={key} className="flex flex-col gap-1">
                                    <label className="text-gray-400 text-sm">{label}</label>
                                    <input type={type} value={formData[key]} onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                                        required className="bg-[#241B45] border border-[#241B45] text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500" />
                                </div>
                            ))}
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Genre</label>
                                <select value={formData.genre} onChange={e => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                                    required className="bg-[#241B45] border border-[#241B45] text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500">
                                    <option value="">Select genre</option>
                                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Description</label>
                                <textarea value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    required rows={3} className="bg-[#241B45] border border-[#241B45] text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500 resize-none" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Content (full ebook text)</label>
                                <textarea value={formData.content} onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    required rows={5} className="bg-[#241B45] border border-[#241B45] text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500 resize-none" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Cover Image</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload}
                                    className="bg-[#241B45] border border-[#241B45] text-gray-400 px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500" />
                                {imgLoading && <p className="text-violet-400 text-sm">Uploading...</p>}
                                {formData.coverImage && <img src={formData.coverImage} alt="cover" className="w-24 h-32 object-cover rounded-xl mt-2" />}
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 py-2.5 border border-[#241B45] text-gray-400 rounded-xl hover:text-white transition-colors">Cancel</button>
                                <button type="submit"
                                    className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors">
                                    {editingEbook ? "Save Changes" : "Add Ebook"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === "ebooks" && (
                <div className="overflow-x-auto">
                    {ebooks.length === 0 ? (
                        <div className="border border-dashed border-[#241B45] rounded-2xl py-20 flex flex-col items-center gap-3 text-center">
                            <span className="text-6xl">✍️</span>
                            <p className="text-white font-bold text-xl">No ebooks yet</p>
                            <p className="text-gray-400">Click Add Ebook to publish your first one</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#241B45]">
                                    {["Title", "Genre", "Price", "Status", "Sales", "Actions"].map(h => (
                                        <th key={h} className="text-left text-gray-400 text-sm py-3 px-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ebooks.map(ebook => (
                                    <tr key={ebook._id} className="border-b border-[#241B45]/50 hover:bg-[#1A1333]/50">
                                        <td className="py-3 px-4 text-white font-medium">{ebook.title}</td>
                                        <td className="py-3 px-4 text-gray-400">{ebook.genre}</td>
                                        <td className="py-3 px-4 text-amber-400">${ebook.price}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ebook.status === "published" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                                {ebook.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">{ebook.totalSales}</td>
                                        <td className="py-3 px-4 flex gap-2">
                                            <button onClick={() => handleToggleStatus(ebook)}
                                                className="px-3 py-1 text-xs bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/40 transition-colors cursor-pointer">
                                                {ebook.status === "published" ? "Unpublish" : "Publish"}
                                            </button>
                                            <button onClick={() => openEdit(ebook)}
                                                className="px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/40 transition-colors cursor-pointer">Edit</button>
                                            <button onClick={() => handleDelete(ebook._id)}
                                                className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors cursor-pointer">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === "sales" && (
                <div className="overflow-x-auto">
                    {sales.length === 0 ? (
                        <div className="border border-dashed border-[#241B45] rounded-2xl py-20 flex flex-col items-center gap-3 text-center">
                            <span className="text-6xl">💰</span>
                            <p className="text-white font-bold text-xl">No sales yet</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#241B45]">
                                    {["Ebook Title", "Buyer", "Amount", "Date"].map(h => (
                                        <th key={h} className="text-left text-gray-400 text-sm py-3 px-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map(sale => (
                                    <tr key={sale._id} className="border-b border-[#241B45]/50">
                                        <td className="py-3 px-4 text-white">{sale.ebookTitle}</td>
                                        <td className="py-3 px-4 text-gray-400">{sale.userEmail}</td>
                                        <td className="py-3 px-4 text-amber-400">${sale.amount}</td>
                                        <td className="py-3 px-4 text-gray-400">{new Date(sale.createdAt).toLocaleDateString("en-GB")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === "profile" && user && (
                <div className="bg-[#1A1333] rounded-2xl border border-[#241B45] p-8 max-w-md">
                    <div className="flex items-center gap-4">
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
                            <span className="text-xs px-2 py-0.5 bg-violet-600/20 text-violet-400 rounded-full">Writer</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6">
                        <div>
                            <p className="text-gray-400 text-sm">Total Ebooks</p>
                            <p className="text-white font-bold text-2xl">{ebooks.length}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Sales</p>
                            <p className="text-white font-bold text-2xl">{sales.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}