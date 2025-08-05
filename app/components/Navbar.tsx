// app/components/Navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-custom bg-[#0D0D0D]">
      <Link href="/" className="text-2xl font-bold text-accent-purple tracking-tight">Legalynx</Link>
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
              <Button className="bg-accent-purple text-primary hover:bg-purple-hover rounded-2xl px-7 py-2 font-semibold shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Sign Up</Button>
            </RegisterLink>
            <LoginLink>
              <Button variant="outline" className="border-custom text-primary rounded-2xl px-7 py-2 font-semibold shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Sign In</Button>
            </LoginLink>
          </>
        )}
      </div>
    </nav>
  );
}