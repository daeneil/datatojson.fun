"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="flex z-40 font-semibold ml-12">
          <span className="text-black">datatojson.fun</span>
        </Link>
        <div className="flex items-center space-x-4 mr-12 font-semibold">
          <Link href="/pricing" className="text-black"></Link>
          <Link href="/about"></Link>
          {session ? (
            <>
              <span className="text-black ">Welcome, {session.user?.name ?? "User"}</span>
              <Link href="/dashboard">
              <Button className="bg-blue-600 text-white hover:bg-gray-700 hover:text-white">
                Dashboard
              </Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
            <Button
              className="bg-blue-600 font-semibold text-blue-50 hover:bg-gray-700  hover:text-white"
            >
              Login
            </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
