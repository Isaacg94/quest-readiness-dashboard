"use client";

import Image from "next/image";
import { PanelLeft } from "lucide-react";

import NavItem from "./NavItem";
import { navItems } from "./nav";

export default function Sidebar({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <aside className="flex h-full flex-col">
      <div
        className={`flex h-18 items-center px-3 transition-all duration-300 ease-in-out ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        <span
          className={`whitespace-nowrap font-semibold transition-[opacity,width] duration-300 ease-in-out overflow-hidden ${
            open ? "w-auto opacity-100" : "w-0 opacity-0"
          }`}
        >
          <Image
            src="/assets/novaLogo.svg"
            alt="Quest"
            width={160}
            height={48}
            className={`transition-[opacity,width] duration-300 ease-in-out overflow-hidden ${
              open ? "w-40 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </span>

        <div
          className={`ml-5 h-4 shrink-0 overflow-hidden bg-gray-400 transition-[opacity,width,margin] duration-300 ease-in-out ${
            open ? "w-px opacity-100" : "hidden"
          }`}
        />

        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer rounded p-1 hover:bg-white"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={!open} />
        ))}
      </nav>
    </aside>
  );
}
