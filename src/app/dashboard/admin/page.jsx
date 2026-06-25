"use client";

import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const token = useAuthToken();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [ebooks, setEbooks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!token) return;
        const load = async () => {
            try {
                const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const userData = await userRes.json();
                if (userData.role !== "admin") { router.push("/dashboard/user"); return; }

                const [statsRes, usersRes, ebooksRes, transRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/stats`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/all`, { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/transactions`, { headers: { "Authorization": `Bearer ${token}` } }),
                ]);
                setStats(await statsRes.json());
                setUsers(await usersRes.json());
                setEbooks(await ebooksRes.json());
                setTransactions(await transRes.json());
            } catch { }
            setLoading(false);
        };
        load();
    }, [token]);

    const handleRoleChange = async (userId, role) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/role`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ role }),
        });
        toast.success("Role updated!");
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role } : u));
    };

    const handleDeleteUser = async (id) => {
        if (!confirm("Delete this user?")) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        toast.success("User deleted!");
        setUsers(prev => prev.filter(u => u._id !== id));
    };

    const handleToggleEbook = async (ebook) => {
        const newStatus = ebook.status === "published" ? "unpublished" : "published";
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/${ebook._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus }),
        });
        toast.success(`Ebook ${newStatus}!`);
        setEbooks(prev => prev.map(e => e._id === ebook._id ? { ...e, status: newStatus } : e));
    };

    const handleDeleteEbook = async (id) => {
        if (!confirm("Delete this ebook?")) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ebooks/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        toast.success("Ebook deleted!");
        setEbooks(prev => prev.filter(e => e._id !== id));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const statCards = [
        { label: "Total Users", value: stats?.totalUsers, color: "violet" },
        { label: "Total Writers", value: stats?.totalWriters, color: "blue" },
        { label: "Ebooks Sold", value: stats?.totalSold, color: "amber" },
        { label: "Total Revenue", value: `$${stats?.totalRevenue?.toFixed(2)}`, color: "green" },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

            <div className="flex gap-3 mb-8 flex-wrap">
                {["overview", "users", "ebooks", "transactions"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer capitalize ${activeTab === tab ? "bg-violet-600 text-white" : "border border-[#241B45] text-gray-400 hover:text-white"}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "overview" && (
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map(card => (
                            <div key={card.label} className="bg-[#1A1333] rounded-2xl border border-[#241B45] p-6">
                                <p className="text-gray-400 text-sm">{card.label}</p>
                                <p className="text-white text-3xl font-bold mt-2">{card.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1A1333] rounded-2xl border border-[#241B45] p-6">
                            <h3 className="text-white font-bold mb-4">Recent Transactions</h3>
                            {transactions.slice(0, 5).map(t => (
                                <div key={t._id} className="flex justify-between py-2 border-b border-[#241B45]/50">
                                    <div>
                                        <p className="text-white text-sm">{t.ebookTitle}</p>
                                        <p className="text-gray-400 text-xs">{t.userEmail}</p>
                                    </div>
                                    <p className="text-amber-400 font-medium">${t.amount}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#1A1333] rounded-2xl border border-[#241B45] p-6">
                            <h3 className="text-white font-bold mb-4">Recent Users</h3>
                            {users.slice(0, 5).map(u => (
                                <div key={u._id} className="flex items-center justify-between py-2 border-b border-[#241B45]/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
                                            {u.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm">{u.name}</p>
                                            <p className="text-gray-400 text-xs">{u.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 bg-violet-600/20 text-violet-400 rounded-full capitalize">{u.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "users" && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#241B45]">
                                {["Name", "Email", "Role", "Actions"].map(h => (
                                    <th key={h} className="text-left text-gray-400 text-sm py-3 px-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} className="border-b border-[#241B45]/50 hover:bg-[#1A1333]/50">
                                    <td className="py-3 px-4 text-white">{u.name}</td>
                                    <td className="py-3 px-4 text-gray-400">{u.email}</td>
                                    <td className="py-3 px-4">
                                        <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)}
                                            className="bg-[#241B45] text-gray-400 px-2 py-1 rounded-lg text-sm focus:outline-none">
                                            <option value="user">user</option>
                                            <option value="writer">writer</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleDeleteUser(u._id)}
                                            className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "ebooks" && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#241B45]">
                                {["Title", "Writer", "Price", "Status", "Actions"].map(h => (
                                    <th key={h} className="text-left text-gray-400 text-sm py-3 px-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ebooks.map(e => (
                                <tr key={e._id} className="border-b border-[#241B45]/50 hover:bg-[#1A1333]/50">
                                    <td className="py-3 px-4 text-white">{e.title}</td>
                                    <td className="py-3 px-4 text-gray-400">{e.writerName}</td>
                                    <td className="py-3 px-4 text-amber-400">${e.price}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.status === "published" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                            {e.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button onClick={() => handleToggleEbook(e)}
                                            className="px-3 py-1 text-xs bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/40 transition-colors cursor-pointer">
                                            {e.status === "published" ? "Unpublish" : "Publish"}
                                        </button>
                                        <button onClick={() => handleDeleteEbook(e._id)}
                                            className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "transactions" && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#241B45]">
                                {["Ebook", "Buyer", "Writer", "Amount", "Date"].map(h => (
                                    <th key={h} className="text-left text-gray-400 text-sm py-3 px-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t._id} className="border-b border-[#241B45]/50">
                                    <td className="py-3 px-4 text-white">{t.ebookTitle}</td>
                                    <td className="py-3 px-4 text-gray-400">{t.userEmail}</td>
                                    <td className="py-3 px-4 text-gray-400">{t.writerName}</td>
                                    <td className="py-3 px-4 text-amber-400">${t.amount}</td>
                                    <td className="py-3 px-4 text-gray-400">{new Date(t.createdAt).toLocaleDateString("en-GB")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}