"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, Bookmark, Settings, Menu, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust path

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, href: "/dashboard" },
    { name: "History", icon: <Bookmark size={20} />, href: "/history" },
    { name: "Settings", icon: <Settings size={20} />, href: "/setting" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside
      className={`
        ${isCollapsed ? "w-16" : "w-64"}
        bg-gray-900 text-white h-screen fixed top-0 left-0
        shadow-lg transition-all duration-300 flex flex-col z-50
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-xl font-bold">VeritasAI</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {menuItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
