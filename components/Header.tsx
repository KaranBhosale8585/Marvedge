"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-black hover:text-gray-700 transition"
        >
          RK
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
          <Link
            href="/tour/editor"
            className="text-2xl font-bold text-black hover:text-gray-700 transition"
          >
            Tours
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-gray-800 hover:text-black hover:bg-gray-100 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-black">
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="block w-full px-3 py-2 rounded-md text-left hover:bg-gray-100 hover:text-black transition"
          >
            <div className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </div>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
