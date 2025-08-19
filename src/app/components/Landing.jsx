"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {ShieldCheck, Globe, Database, Brain, Users, CheckCircle,  Search, FileCheck,  BookOpen,  Share2,  Zap,  BarChart3,} from "lucide-react";

const Landing = () => {
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
          <Link href="#home" className="text-2xl font-bold tracking-wide">
            True Fact
          </Link>
          <nav className="hidden md:flex space-x-6 text-gray-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="#platform" className="hover:text-white">
              Platform
            </Link>
            <Link href="#solution" className="hover:text-white">
              Solution
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">Log in</button>
            <Link href="/dashboard" className="rounded-2xl bg-white text-black px-5 py-2 hover:bg-gray-200 transition">
              Get Started
            </Link>
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
          <div className="mt-8 mb-10">
            <Link
              href="#platform"
              className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 text-white px-6 py-3 rounded-full shadow-lg text-lg transition"
            >
              Register Here
            </Link>
          </div>
          <p className="mt-6 text-gray-500 text-sm">
            Backed by world-class researchers & innovators
          </p>
        </div>
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

      {/* Solution Section */}
      <section
        id="solution"
        className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-8 py-20"
      >
        <div className="max-w-5xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Solution</h3>
          <p className="text-lg text-gray-400 mb-10">
            We combine machine learning, crowdsourced verification, and trusted
            databases to provide accurate results in seconds.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Claim Analysis", desc: "Analyze claims automatically." },
              { icon: FileCheck, title: "Verified Sources", desc: "Cross-check with news & journals." },
              { icon: BookOpen, title: "Educational", desc: "Learn why content is true/false." },
              { icon: Share2, title: "Easy Sharing", desc: "Share fact-checks instantly." },
              { icon: Zap, title: "Lightning Fast", desc: "Results in seconds." },
              { icon: BarChart3, title: "Analytics", desc: "Track misinformation trends." },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-800 rounded-2xl shadow flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <card.icon className="h-10 w-10 text-gray-300 mb-4" />
                <h4 className="font-semibold text-xl mb-2">{card.title}</h4>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} True Fact. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white">
                Tranding Feed
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
