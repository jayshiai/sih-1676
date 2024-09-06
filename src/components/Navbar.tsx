import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
const Navbar = () => {
  return (
    <div className="w-full h-12 border border-b flex items-center justify-between pl-8 pr-4">
      <section className="flex gap-4">
        <Link href="/">Dashboard</Link>
        <Link href="/vuln">Vulnerabilities</Link>
        <Link href="/vendors">Vendors</Link>
        <Link href="/products">Products</Link>
      </section>
      <section className="flex gap-4">
        <ModeToggle />
        <Input
          type="text"
          placeholder="Search for Vulnerabulity"
          className="w-64 h-8 hover:bg-accent hover:text-accent-foreground text-muted-foreground bg-muted/50"
        />
        <div className="flex items-center space-x-2">
          <UserNav link={"https://github.com/shadcn.png"} />
        </div>
      </section>
    </div>
  );
};

export default Navbar;
