"use client";
import React, { useEffect, useState } from "react";
import { Share2, Trash2 } from "lucide-react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(saved);
  }, []);

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Conversation History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-400">No history yet. Start asking questions!</p>
      ) : (
        <div className="grid gap-4">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded-xl shadow-md relative"
            >
              <p className="text-sm text-gray-400 mb-2">{item.time}</p>
              <p className="font-semibold mb-2">
                <span className="text-indigo-400">You:</span> {item.question}
              </p>
              <pre className="whitespace-pre-wrap text-sm">
                <span className="text-green-400">AI:</span> {item.answer}
              </pre>

              {/* Share Button */}
              <button
                className="absolute bottom-3 right-3 text-gray-300 hover:text-indigo-400"
                aria-label="Share"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `Q: ${item.question}\nA: ${item.answer}`
                  )
                }
              >
                <Share2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
