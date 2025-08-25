"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Globe, Database, Brain, Users, CheckCircle } from "lucide-react";
import { auth } from "../firebase/firebase";
import {  GoogleAuthProvider,  signInWithPopup,  onAuthStateChanged,  createUserWithEmailAndPassword,  signInWithEmailAndPassword,} from "firebase/auth";

const Landing = () => {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already signed in, go straight to dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/dashboard");
    } catch (e) {
      setErr(e?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPassword = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace("/dashboard");
    } catch (e) {
      setErr(e?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section with Animated Background */}
      <motion.section
        id="home"
        className="relative min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 overflow-hidden"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Navbar */}
        <header className="absolute top-0 w-full flex items-center justify-between px-8 py-4 bg-transparent">
          <Link href="/" className="text-2xl font-bold tracking-wide">VeritasAI</Link>

          <nav className="hidden md:flex space-x-6 text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="#platform" className="hover:text-white">Platform</Link>
            <Link href="#solution" className="hover:text-white">Solution</Link>
            <Link href="/news" className="hover:text-white">News</Link>
          </nav>

          <div className="flex items-center space-x-4">
           
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-2xl bg-white text-black px-5 py-2 hover:bg-gray-200 transition"
            >
              Login / Signup
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-3xl text-center mt-20 md:mt-32">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Fact <span className="text-gray-400">Verification</span> that Builds{" "}
            <span className="text-gray-400">Trust</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Verify information instantly with AI-powered insights and protect
            your decisions from misinformation.
          </p>
          <div className="mt-8 mb-10" />
          <p className="mt-6 text-gray-500 text-sm">
            Backed by world-class researchers & innovators
          </p>
        </div>

        {/* Auth Modal / Panel */}
        {showAuth && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {mode === "signin" ? "Sign in" : "Create your account"}
                </h3>
                <button onClick={() => setShowAuth(false)} className="px-2">✕</button>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMode("signin")}
                  className={`flex-1 py-2 rounded-xl border ${mode === "signin" ? "bg-white text-black" : "border-gray-700"}`}
                >
                  Sign in
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2 rounded-xl border ${mode === "signup" ? "bg-white text-black" : "border-gray-700"}`}
                >
                  Sign up
                </button>
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full mb-3 px-4 py-2 rounded-xl border border-gray-700"
              >
                {loading ? "Please wait…" : "Continue with Google"}
              </button>

              <div className="text-center text-xs text-gray-500 my-2">or use email</div>

              <form onSubmit={handleEmailPassword} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 outline-none"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 transition"
                >
                  {loading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              {err && <p className="text-red-400 text-sm mt-3">{err}</p>}
            </div>
          </div>
        )}
      </motion.section>

      {/* Platform Section */}
      <section
        id="platform"
        className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center px-8 py-20"
      >
        <div className="max-w-5xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Platform</h3>
          <p className="text-lg text-gray-600 mb-10">
            True Fact is an AI-powered fact-checking platform that scans,
            verifies, and explains authenticity of online content.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Smart Detection", desc: "AI-powered fake news detection." },
              { icon: Globe, title: "Global Coverage", desc: "Works across languages & regions." },
              { icon: Database, title: "Trusted Sources", desc: "Backed by verified databases." },
              { icon: Brain, title: "AI Intelligence", desc: "Deep learning analysis." },
              { icon: Users, title: "Community Driven", desc: "Crowdsourced validation." },
              { icon: CheckCircle, title: "Instant Verification", desc: "Results in real time." },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white shadow rounded-2xl flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <card.icon className="h-10 w-10 text-gray-700 mb-4" />
                <h4 className="font-semibold text-xl mb-2">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} VeritasAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
