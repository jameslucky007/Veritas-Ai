  "use client";
  import { useState, useEffect } from "react";
  import Link from "next/link";
  import {
    Home,
    LayoutDashboard,
    Newspaper,
    Bookmark,
    Settings,
    Share2,
    Menu,
    Sun,
    Moon,
  } from "lucide-react";

  const Sidebar = () => {
    const [isCollapsed] = useState(false);
      return (
      <>
    

        {/* Sidebar */}
        <aside
          className={`${
            isCollapsed ? "w-20" : "w-60"
          } bg-gray-800 dark:bg-gray-900 text-white p-6 h-screen fixed top-0 left-0 shadow-lg transition-all duration-300 flex flex-col`}
        >
          {/* Logo */}
          <Link href="/dashboard"><h2 className="text-white text-3xl mb-10">VeritasAI </h2></Link>
          {/* Navigation */}
          <nav className="space-y-6 flex-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:text-indigo-200 transition"
            >
              <Home size={20} />
              {!isCollapsed && "Home"}
            </Link>

    

            <Link
              href="/history"
              className="flex items-center gap-3 hover:text-indigo-300 transition"
            >
              <Bookmark size={20} />
              {!isCollapsed && "History"}
            </Link>

            <Link
              href="/Setting"
              className="flex items-center gap-3 hover:text-indigo-300 transition"
            >
              <Settings size={20} />
              {!isCollapsed && "Settings"}
            </Link>

          </nav>
        </aside>
      </>
    );
  };

  export default Sidebar;
