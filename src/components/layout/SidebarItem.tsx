"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
}

export default function SidebarItem({
  href,
  icon: Icon,
  title,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href === "/dashboard" && pathname === "/");

  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon size={20} />

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
}