"use client";

import { authClient } from "@/lib/auth-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PurchaseButton = ({ ebook }) => {
    const { data: session } = authClient.useSession();
    const token = useAuthToken();
    const [loading, setLoading] = useState(false);
    const [alreadyPurchased, setAlreadyPurchased] = useState(false);
    const user = session?.user;

    useEffect(() => {
        if (!token) return;
        const checkPurchase = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/my-purchases`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                const purchased = Array.isArray(data) && data.some(e => e._id === ebook._id.toString());
                setAlreadyPurchased(purchased);
            } catch { }
        };
        checkPurchase();
    }, [token, ebook._id]);

    const isWriter = user?.email === ebook.writerEmail;

    const handlePurchase = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ebookId: ebook._id,
                    ebookTitle: ebook.title,
                    price: ebook.price,
                }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else toast.error("Payment failed");
        } catch {
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    if (alreadyPurchased) {
        return (
            <div className="px-8 py-4 bg-green-500/20 text-green-400 font-semibold rounded-xl border border-green-500/30 w-fit">
                Already Purchased ✓
            </div>
        );
    }

    return (
        <button
            onClick={handlePurchase}
            disabled={loading || isWriter}
            className="mt-2 w-full sm:w-fit px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Redirecting..." : isWriter ? "Your Own Ebook" : `Buy Now — $${ebook.price}`}
        </button>
    );
};

export default PurchaseButton;