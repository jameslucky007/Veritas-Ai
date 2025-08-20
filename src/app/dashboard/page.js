"use client";
import { useState } from "react";
import { Plus, Mic, Image, Video, File, X } from "lucide-react";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-800 text-white ">
      {/* Welcome Banner */}
      <div className="flex-grow flex items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Welcome to Veritas AI
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative p-6 flex items-center justify-center">
        <div className="relative flex items-center w-full max-w-2xl bg-gray-800 rounded-full shadow-lg border border-gray-700">
          <input
            type="text"
            placeholder="Ask or search for a true fact..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow py-3 px-6 rounded-l-full bg-transparent outline-none text-white placeholder-gray-400"
          />

          {/* Plus Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Plus size={24} />}
          </button>

          {/* Voice Button */}
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-r-full transition-colors ${
              isListening
                ? "text-red-500 animate-pulse"
                : "text-gray-300 hover:text-indigo-400"
            }`}
          >
            <Mic size={24} />
          </button>
        </div>

        {/* Upload Menu */}
        {isMenuOpen && (
          <div className="absolute bottom-20 p-4 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                <Image size={20} />
                <span>Upload Images</span>
              </div>
              <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                <Video size={20} />
                <span>Upload Videos</span>
              </div>
              <div className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                <File size={20} />
                <span>Upload Files</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
