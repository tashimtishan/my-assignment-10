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
import { redirect } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      image: user.image,
      name: user.name,
      password: user.password,
    });

    if (data) {
      redirect("/login");
    }

    if (error) {
      alert(error.message || "Invalid information");
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
     className="flex w-120 flex-col gap-4 container mx-auto p-10 mt-10 mb-10 rounded-2xl border border-[#241B45] bg-linear-to-b from-[#1A1333] via-[#21183F] to-[#2B1E56] shadow-[0_10px_40px_rgba(124,58,237,0.25)]"
    >
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="font-bold text-2xl mt-3 text-white">
          Register
        </p>
        <p className="text-gray-300">
          Create Your Fable Account
        </p>
      </div>

      <TextField
        isRequired
        name="name"
        type="text"
      >
        <Label className="text-white">Name</Label>
        <Input placeholder="Enter Your Name Here" />
        <FieldError />
      </TextField>

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
        name="image"
        type="url"
      >
        <Label className="text-white">Photo URL (optional)</Label>
        <Input placeholder="https://...." />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={6}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 6) {
            return "Password must be at least 6 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
          }
          return null;
        }}
      >
        <Label className="text-white">Password</Label>
        <Input placeholder="Enter your password" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="confirmPassword"
        type="password"
      >
        <Label className="text-white">Confirm Password</Label>
        <Input placeholder="Confirm your password" />
        <FieldError />
      </TextField>

      <Button
        className="
          w-full
          mt-4
          rounded-xl
          bg-[#7C3AED]
          hover:bg-[#8B5CF6]
          text-white
          font-semibold
          transition-all
        "
        type="submit"
      >
        Register
      </Button>

      <div className="flex items-center w-full my-2">
        <div className="flex-1 h-px bg-gray-500"></div>
        <span className="px-3 text-gray-300">OR</span>
        <div className="flex-1 h-px bg-gray-500"></div>
      </div>

      <Button
        className="
          w-full
          rounded-xl
          bg-white
          hover:bg-gray-100
          text-black
          font-medium
        "
        variant="outline"
        type="button"
      >
        <FcGoogle className="w-5 h-5" />
        Continue With Google
      </Button>

      <p className="text-center text-gray-300 mt-2">
        Already Have An Account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD]"
        >
          Login
        </Link>
      </p>
    </Form>
  );
}