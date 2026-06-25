'use client'

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      alert(error.message || "Invalid email or password");
    }
  };

   const handleGooglesignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }
  return (
    <Form
      onSubmit={onSubmit}
      className="flex w-120 flex-col gap-4 container mx-auto p-10 mt-10 mb-10 rounded-2xl border border-[#241B45] bg-linear-to-b from-[#1A1333] via-[#21183F] to-[#2B1E56] shadow-[0_10px_40px_rgba(124,58,237,0.25)]"
    >
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="font-bold text-2xl mt-3 text-white">
          Login
        </p>
        <p className="text-gray-300">
          Welcome Back To Fable
        </p>
      </div>

      <TextField
        isRequired
        name="email"
        type="email"
      >
        <Label className="text-white">Email</Label>
        <Input placeholder="Enter Your Email Address" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="password"
        type="password"
      >
        <Label className="text-white">Password</Label>
        <Input placeholder="Enter your password" />
        <FieldError />
      </TextField>

      <div className="w-full flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-[#A78BFA] hover:text-[#C4B5FD]"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        className="w-full mt-2 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-semibold transition-all"
        type="submit"
      >
        Login
      </Button>

      <div className="flex items-center w-full my-2">
        <div className="flex-1 h-px bg-gray-500"></div>
        <span className="px-3 text-gray-300">OR</span>
        <div className="flex-1 h-px bg-gray-500"></div>
      </div>

      <Button
        onClick={handleGooglesignin}
        className="w-full rounded-xl bg-white hover:bg-gray-100 text-black font-medium"
        variant="outline"
        type="button"
      >
        <FcGoogle className="w-5 h-5" />
        Continue With Google
      </Button>

      <p className="text-center text-gray-300 mt-2">
        Don&apos;t Have An Account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD]"
        >
          Register
        </Link>
      </p>
    </Form>
  );
}