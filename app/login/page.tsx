"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !form.email.trim(),
      password: !form.password.trim(),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        cache: "no-store",
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setForm({ email: "", password: "" });
        toast.success(data.message || "Logged in successfully!");
        setTimeout(() => {
          router.replace("/");
        }, 100);
      } else {
        toast.error(data.error || "Login failed");
        setErrors({ email: true, password: true });
      }
    } catch {
      throw errors;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <Link
          href="/"
          className="text-xl font-bold text-black hover:text-gray-800"
        >
          Marvedge
        </Link>

        <nav className="space-x-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Home
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-black bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
        <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: false });
                  }}
                  className={`w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-black`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">Email is required.</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: false });
                  }}
                  className={`w-full pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-black`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  Password is required.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-sm text-center mt-6 text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline hover:text-black transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
