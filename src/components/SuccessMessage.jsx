"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SuccessMessage = () => {
    const params = useSearchParams();

    useEffect(() => {
        if (params.get("success") === "true") {
            toast.success("Purchase successful! Enjoy your ebook.");
        }
        if (params.get("cancelled") === "true") {
            toast.error("Payment cancelled.");
        }
    }, []);

    return null;
};

export default SuccessMessage;