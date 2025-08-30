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
  const [aiResponse, setAiResponse] = useState("");
  const [accuracy, setAccuracy] = useState(null); // percentage score

  const recognitionRef = useRef(null);

  // File select handler
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length) setUploadedFiles((prev) => [...prev, ...files]);
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) setUploadedFiles((prev) => [...prev, ...files]);
  };
  const handleDragOver = (e) => e.preventDefault();

  // Handle keyboard enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Send prompt to local Ollama via /api/ollama
  const handleSend = async () => {
    if (!searchInput.trim() && uploadedFiles.length === 0) return;
    setIsSending(true);
    setAiResponse("");
    setAccuracy(null);

    const filesSummary =
      uploadedFiles.length > 0
        ? `\n\nFiles: ${uploadedFiles.map((f) => f.name).join(", ")}`
        : "";

    const currentInput = searchInput; // Store current input
    setSearchInput(""); // Clear input immediately after sending

    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentInput + filesSummary,
          model: "llama3",
          max_tokens: 300,
        }),
      });

      if (!res.ok) throw new Error("API returned " + res.status);

      const data = await res.json();
      setAiResponse(data.output || "No response from model");

      // mock correctness score (replace later with real check)
      setAccuracy(Math.floor(Math.random() * 21) + 80); // 80–100%
    } catch (err) {
      console.error("AI call failed:", err);
      setAiResponse("Error contacting local model: " + (err.message || err));
    } finally {
      setIsSending(false);
    }
  };

  // Voice recognition
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = (e) => {
      console.error("Speech recognition error", e);
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
    <div
      className="flex flex-col min-h-screen bg-gray-800 text-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Welcome Banner (hidden once AI responds) */}
      {!aiResponse && (
        <div className="flex-grow flex items-center justify-center p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Welcome to VeritasAI
          </h1>
        </div>
      )}

      {/* AI response card */}
      {aiResponse || isSending ? (
        <div className="flex-grow overflow-auto">
          <div className="mx-auto w-full max-w-2xl p-4">
            <div className="bg-gray-700 rounded-xl p-4 shadow-md relative">
              <h3 className="font-semibold mb-2">AI Response</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {isSending ? "Thinking..." : aiResponse}
              </pre>

              {/* Metric */}
              {accuracy && !isSending && (
                <p className="mt-3 text-green-400 font-medium">
                  ✅ Correctness Score: {accuracy}%
                </p>
              )}

              {/* Share Icon */}
              {!isSending && aiResponse && (
                <button
                  className="absolute bottom-3 right-3 text-gray-300 hover:text-indigo-400"
                  aria-label="Share"
                  onClick={() => navigator.clipboard.writeText(aiResponse)}
                >
                  <Share2 size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mx-auto w-full max-w-2xl p-4">
          <div className="bg-gray-700 rounded-xl p-4">
            <h2 className="font-bold mb-2">Uploaded Files:</h2>
            <ul className="list-disc pl-5">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Input Section - Fixed at bottom */}
      <div className="sticky bottom-0 bg-gray-800 p-6 flex items-center justify-center border-t border-gray-700">
        <div className="relative flex items-center w-full max-w-2xl bg-gray-800 rounded-full shadow-lg border border-gray-700">
          {/* Plus Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="p-3 text-gray-300 hover:text-indigo-400 transition-colors"
              aria-label="Open uploads"
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
            onKeyPress={handleKeyPress}
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
            aria-pressed={isListening}
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