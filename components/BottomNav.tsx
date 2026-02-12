"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav";

function isActivePath(pathname: string, href: string) {
  if (!pathname) return false;

  const normalize = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

  const current = normalize(pathname);
  const target = normalize(href);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around py-2 md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            className={[
              "flex flex-col items-center text-xs",
              active ? "text-[hsl(var(--primary-active))]" : "text-gray-400",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}