// src/app/components/NavBar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, UserCog } from "lucide-react"; // uses lucide icons
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent px-6 py-4 text-lg font-semibold text-purple-800 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/skolstvo-logo-05.svg" // Place your logo image in /public/logo.png
            alt="Mládež PSK logo"
            width={100}
            height={100}
          />
          {/* <span className="text-xl font-bold text-purple-900">Mládež PSK</span> */}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Domov
          </Link>
          <Link href="/events" className="hover:text-blue-600 transition">
            Podujatia
          </Link>
          <Link
            href="/organizations"
            className="hover:text-blue-600 transition"
          >
            Organizácie
          </Link>
          <Link
            href="/admin/dashboard"
            className="hover:text-blue-600 transition"
          >
            <UserCog className="w-5 h-5" />
            <span className="sr-only">Admin</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 space-y-4 md:hidden">
          <Link
            href="/"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Domov
          </Link>
          <Link
            href="/events"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Podujatia
          </Link>
          <Link
            href="/organizations"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Organizácie
          </Link>
          <Link
            href="/admin/dashboard"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            <UserCog className="w-5 h-5" />
            <span className="sr-only">Admin</span>
          </Link>
          <div className="block md:hidden mt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
