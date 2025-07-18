"use client";

import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserNav } from "./UserNav";
import { motion } from "framer-motion";

export function NavbarClient({ user }: { user: any }) {
  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-primary to-secondary w-8 h-8 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
              </svg>
            </div>
            <h1 className="font-bold text-xl tracking-tight">
              Legal<span className="text-primary">ynx</span>
            </h1>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#features">
            <motion.span 
              className="text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Features
            </motion.span>
          </Link>
          <Link href="/#solutions">
            <motion.span 
              className="text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Solutions
            </motion.span>
          </Link>
          <Link href="/#pricing">
            <motion.span 
              className="text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Pricing
            </motion.span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <UserNav
              email={user.email as string}
              image={user.picture as string}
              name={user.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-3">
              <LoginLink>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" className="rounded-full">
                    Sign In
                  </Button>
                </motion.div>
              </LoginLink>
              <RegisterLink>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="rounded-full bg-gradient-to-r from-primary to-secondary">
                    Sign Up
                  </Button>
                </motion.div>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
