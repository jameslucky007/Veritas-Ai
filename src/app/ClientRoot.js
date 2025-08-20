"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";

export default function ClientRoot({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <div className="flex min-h-screen">
      {!isLanding && <Sidebar />}
      <main className={`${!isLanding ? "ml-[240px]" : ""} flex-1 bg-gray-800`}>
        {children}
      </main>
    </div>
  );
}




