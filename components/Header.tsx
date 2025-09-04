"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-gray-700 transition hover:scale-105"
        >
          Marvedge
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <Link
              href="/create-tour"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Tours
            </Link>
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/create-tour"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Tours
                </Link>
                <div className="border-t pt-4">
                  <Button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
