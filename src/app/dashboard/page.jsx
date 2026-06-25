"use client";

import { authClient } from "@/lib/auth-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();
    const token = useAuthToken();
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const user = session?.user;

    useEffect(() => {
        if (!session && session !== undefined) {
            router.push("/login");
            return;
        }
        if (!token || !user) return;

        const getRole = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.role === "admin") router.push("/dashboard/admin");
                else if (data.role === "writer") router.push("/dashboard/writer");
                else router.push("/dashboard/user");
            } catch {
                router.push("/dashboard/user");
            }
            setChecking(false);
        };
        getRole();
    }, [token, user, session]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}