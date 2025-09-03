"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Mic,
  Image as ImgIcon,
  Video,
  X,
  Send,
  Loader2,
  Share2,
} from "lucide-react";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [currentChat, setCurrentChat] = useState(null); // ✅ only latest Q&A
  const recognitionRef = useRef(null);

  const saveToHistory = (chat) => {
    const prev = JSON.parse(localStorage.getItem("history") || "[]");
    localStorage.setItem("history", JSON.stringify([...prev, chat]));
  };

  // File select
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length) setUploadedFiles((prev) => [...prev, ...files]);
  };

  // Send prompt
  const handleSend = async () => {
    if (!searchInput.trim() && uploadedFiles.length === 0) return;

    const question = searchInput;
    setSearchInput("");
    setIsSending(true);

    // Show "Thinking..."
    setCurrentChat({ question, answer: "Thinking..." });

    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: uploadedFiles.length > 0 ? "llava" : "llama3",
          prompt: question,
          max_tokens: 300,
          system:
            "You are VeritasAI. Always reply in under 50 words. Always provide a reference/source when possible.",
        }),
      });

      if (!res.ok) throw new Error("API returned " + res.status);
      const data = await res.json();

      const newChat = {
        question,
        answer:
          typeof data.output === "string"
            ? data.output
            : data.output?.error
            ? "Error: " + data.output.error
            : JSON.stringify(data.output || data),
      };

      setCurrentChat(newChat);
      saveToHistory(newChat); // ✅ store to history page
      setUploadedFiles([]);
    } catch (err) {
      console.error("AI call failed:", err);
      setCurrentChat({
        question,
        answer: "Error: " + (err.message || err),
      });
    } finally {
      setIsSending(false);
    }
  };

  // Voice input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript || "";
      setSearchInput((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      {/* Centered Welcome if no chat */}
      {!currentChat && (
        <div className="flex-grow flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Welcome to VeritasAI
          </h1>
        </div>
      )}

      {/* Current Chat */}
      {currentChat && (
        <div className="flex-grow overflow-auto p-6">
          <div className="bg-gray-700 rounded-xl p-4 shadow-md relative">
            <p className="text-sm text-indigo-300 mb-2">
              <b>You:</b> {currentChat.question}
            </p>
            <p className="whitespace-pre-wrap text-sm">
              <b>AI:</b>{" "}
              {typeof currentChat.answer === "string"
                ? currentChat.answer
                : JSON.stringify(currentChat.answer)}
            </p>
            {!isSending && currentChat.answer && (
              <button
                className="absolute bottom-3 right-3 text-gray-300 hover:text-indigo-400"
                aria-label="Share"
                onClick={() =>
                  navigator.clipboard.writeText(
                    typeof currentChat.answer === "string"
                      ? currentChat.answer
                      : JSON.stringify(currentChat.answer)
                  )
                }
              >
                <Share2 size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="sticky bottom-0 bg-gray-800 p-6 flex items-center justify-center border-t border-gray-700">
        <div className="relative flex items-center w-full max-w-2xl bg-gray-800 rounded-full shadow-lg border border-gray-700">
          {/* Plus Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="p-3 text-gray-300 hover:text-indigo-400 transition-colors"
              aria-label="Upload menu"
            >
              {isMenuOpen ? <X size={20} /> : <Plus size={20} />}
            </button>

            {/* Upload Menu */}
            {isMenuOpen && (
              <div className="absolute bottom-14 left-0 p-4 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 z-20">
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                    <ImgIcon size={18} />
                    <span>Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <label className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                    <Video size={18} />
                    <span>Videos</span>
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <input
            type="text"
            placeholder="Ask or search for a true fact..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow py-3 px-6 bg-transparent outline-none text-white placeholder-gray-400 rounded-l-full"
          />

          {/* Voice Input */}
          <button
            onClick={handleVoiceInput}
            className={`p-3 transition-colors ${
              isListening
                ? "text-red-500 animate-bounce"
                : "text-gray-300 hover:text-indigo-400"
            }`}
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isSending}
            className="p-3 text-gray-300 hover:text-indigo-400 transition-colors rounded-r-full"
            aria-label="Send"
          >
            {isSending ? (
              <Loader2 size={20} className="animate-spin text-indigo-400" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
