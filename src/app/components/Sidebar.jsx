import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6 h-screen fixed top-0 left-0 w-[220px]">
      <h1 className="text-2xl font-extrabold mb-8 tracking-wide">True Fact</h1>
      <nav className="space-y-6">
        <Link href="/" className="block hover:text-indigo-300 transition">Home</Link>
        <Link href="/dashboard" className="block hover:text-indigo-300 transition">Dashboard</Link>
        <Link href="/settings" className="block hover:text-indigo-300 transition">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
