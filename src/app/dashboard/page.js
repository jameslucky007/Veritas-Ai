"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Mic, Image, Video, File, X, Send, Loader2 } from "lucide-react";


export default function DashboardPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  

  //  Handle file upload
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  //  Handle send
  const handleSend = () => {
    if (!searchInput.trim() && uploadedFiles.length === 0) return;
    setIsSending(true);
    setTimeout(() => {
      alert(`Message sent: ${searchInput}\nFiles: ${uploadedFiles.map((f) => f.name).join(", ")}`);
      setSearchInput("");
      setUploadedFiles([]);
      setIsSending(false);
    }, 2000);
  };

  // Voice recognition (Web Speech API)
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchInput((prev) => prev + " " + transcript);
    };

    recognition.start();
  };


  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-800 text-white">
     

      {/* Welcome Banner */}
      <div className="flex-grow flex items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Welcome to VeritasAI
        </h1>
      </div>

      {/* Input Section */}
      <div className="relative p-6 flex items-center justify-center">
        <div className="relative flex items-center w-full max-w-2xl bg-gray-800 rounded-full shadow-lg border border-gray-700">
          {/* Plus Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Plus size={24} />}
            </button>

            {/* Upload Menu */}
            {isMenuOpen && (
              <div className="absolute bottom-14 left-0 p-4 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                    <Image size={20} />
                    <span>Images A</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
                  </label>
                  <label className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                    <Video size={20} />
                    <span>Videos</span>
                    <input type="file" accept="video/*" multiple className="hidden" onChange={handleFileSelect} />
                  </label>
                  <label className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">
                    <File size={20} />
                    <span>Files</span>
                    <input type="file" multiple className="hidden" onChange={handleFileSelect} />
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
            className="flex-grow py-3 px-6 bg-transparent outline-none text-white placeholder-gray-400"
          />

          {/* Voice Input */}
          <button
            onClick={handleVoiceInput}
            className={`p-3 transition-colors ${isListening ? "text-red-500 animate-bounce" : "text-gray-300 hover:text-indigo-400"}`}
          >
            <Mic size={24} />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isSending}
            className="p-3 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            {isSending ? <Loader2 size={24} className="animate-spin text-indigo-400" /> : <Send size={24} />}
          </button>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mx-auto w-3/4 p-4 bg-gray-700 rounded-xl">
          <h2 className="font-bold mb-2">Uploaded Files:</h2>
          <ul className="list-disc pl-5">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-sm">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
