"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserNav } from "./UserNav";
import { motion } from "framer-motion";

export function NavbarClient({ user }: { user: any }) {
  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b bg-[#0D0D0D] border-custom"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container flex h-16 items-center justify-between px-8 py-4">
        <Link href="/" className="text-2xl font-bold text-accent-purple tracking-tight">
          Legalynx
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <UserNav
              name={user.given_name || "User"}
              email={user.email || ""}
              image={user.picture || ""}
            />
          ) : (
            <>
              <RegisterLink>
                <Button className="bg-accent-purple text-primary hover:bg-purple-hover rounded-lg px-6 py-2 font-semibold transition">
                  Sign Up
                </Button>
              </RegisterLink>
              <LoginLink>
                <Button variant="outline" className="border-custom text-primary rounded-lg px-6 py-2 font-semibold transition">
                  Sign In
                </Button>
              </LoginLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
