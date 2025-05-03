"use client";

import React, { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { HarData } from "./har-types";

interface HarUploaderProps {
  onHarLoaded: (harData: HarData) => void;
}

export function HarUploader({ onHarLoaded }: HarUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file || !file.name.endsWith(".har")) {
        setError("Please select a valid HAR file (.har extension)");
        return;
      }

      try {
        const text = await file.text();
        const data = JSON.parse(text) as HarData;

        if (!data.log || !Array.isArray(data.log.entries)) {
          setError("Invalid HAR file format");
          return;
        }

        setError(null);
        onHarLoaded(data);
      } catch (err) {
        setError("Failed to parse HAR file. Please try a different file.");
        console.error("Error parsing HAR file:", err);
      }
    },
    [onHarLoaded]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={`mt-8 p-12 rounded-lg text-center border-2 border-dashed ${
        dragActive ? "border-emerald-400" : "border-zinc-400 dark:border-zinc-700"
      } transition-colors bg-zinc-100 dark:bg-zinc-800 shadow-lg max-w-3xl mx-auto`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload size={64} className="mx-auto mb-6 text-emerald-400" />
      <h2 className="text-2xl font-semibold mb-3 text-zinc-800 dark:text-zinc-100">Upload HAR File</h2>
      <p className="mb-6 text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
        Select or drag and drop a HAR file to analyze network requests and responses
      </p>
      <label className="inline-block px-6 py-3 rounded cursor-pointer bg-emerald-400 hover:bg-emerald-500 text-zinc-900 font-medium transition-colors">
        Browse Files
        <input
          type="file"
          accept=".har,application/json"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
