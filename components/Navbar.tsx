"use client";
import Link from "next/link";
import { UserButton } from "./userButton";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DecodeUser from "@/hooks/decodeuser";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    checkAuthorization();
  }, []);

  function checkAuthorization() {
      const isLogged = localStorage.getItem("token");
      if (isLogged) {
          setIsLoggedIn(true);
      }
  }

  const { email, role } = DecodeUser();
  const { cartValue } = useCart();


  return (
    <>
      <header className="text-sm py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav className="sm:block hidden">
            <ul className="flex items-center gap-x-8">
                  <Link
                    href="/"
                    className="font-incognito text-black duration-300 text-base"
                  >
                    Discover
                  </Link>
                  <Link
                    href="/checkout"
                    className="font-incognito text-black duration-300 text-base"
                  >
                    Cart : {cartValue}
                  </Link>
                  { isLoggedIn && role === "superadmin" ? (
                  <Link
                    href="/manage_product"
                    className="font-incognito text-black duration-300 text-base"
                  >
                    Manage Product
                  </Link>
                  ) : null }
            </ul>
          </nav>
          {isLoggedIn ? (
            <div className="grid grid-cols-3 gap-3">
              <UserButton />
              <p>Email: {email}</p>
              <p>Role: {role}</p>
            </div>
          ) : (
            <Link href="/signin" className="font-incognito text-black duration-300 text-base">
              <Button size="sm" color="primary">
                Login
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
