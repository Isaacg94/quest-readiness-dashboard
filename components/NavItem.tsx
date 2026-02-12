"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isActivePath(pathname: string, href: string) {
  if (!pathname) return false;

  // Normalize trailing slashes (except root)
  const normalize = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

  const current = normalize(pathname);
  const target = normalize(href);

  // Root should match only root
  if (target === "/") return current === "/";

  // Exact match OR nested routes
  return current === target || current.startsWith(`${target}/`);
}

export default function NavItem({ label, href, icon: Icon, collapsed }: any) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-md px-3 py-2 mb-3 w-full transition-colors duration-300 ease-in-out ${active ? "bg-[hsl(var(--primary-active))] text-primary-foreground flex items-center" : "text-muted-foreground hover:bg-white"}`}
    >
      <Icon size={24} strokeWidth={1} className="shrink-0" />

      <span
        className={`
          text-sm 
          transition-[opacity,transform] duration-300 ease-in-out
          ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 translate-x-0"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
