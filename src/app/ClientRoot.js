"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function ClientRoot({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {!isLanding && (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      {/* Dashboard adjusts margin depending on sidebar state */}
      <main
        className={`${
          !isLanding ? (isCollapsed ? "ml-20" : "ml-60") : ""
        } flex-1 bg-gray-800 transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}
