"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-gray-200 relative flex h-screen overflow-hidden">
      <div
        className={`hidden md:block shrink-0 transition-[width] duration-300 transition-slider
                    ${open ? "w-64" : "w-16"}`}
      >
        <Sidebar open={open} toggle={() => setOpen(!open)} />
      </div>

      <div
        className={`md:rounded-l-2xl flex-1 transition-[margin] duration-300 ease-in-out
                    bg-[url('/assets/takeoffnovacolors.png')] 
                    bg-cover bg-center bg-no-repeat`}
      >
        <main className="h-full overflow-y-auto p-4 pb-20 md:pb-4">
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}