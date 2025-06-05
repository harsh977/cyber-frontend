// File: src/components/main/FileUpload.js
"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";

function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv") {
        await uploadFile(file);
      } else {
        setError("Please upload a valid CSV file.");
      }
    }
  };

  const handleFileChange = async (e) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "text/csv") {
        await uploadFile(file);
      } else {
        setError("Please upload a valid CSV file.");
      }
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (onFileUpload) {
        onFileUpload(file, data);
      }
      window.location.reload();
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <div
        className={`relative mx-auto mt-8 flex w-full max-w-2xl flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
          <Upload className="h-8 w-8 text-cyan-400" />
        </div>
        <h3 className="mb-2 text-xl font-medium text-white">Upload CSV Data</h3>
        <p className="mb-4 max-w-xs text-sm text-gray-400">
          Drag and drop your CSV file here, or click to browse your files
        </p>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {isUploading && <p className="mb-4 text-sm text-gray-400">Uploading...</p>}

        <label
          htmlFor="file-upload"
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">Select CSV File</span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <div className="absolute -bottom-4 h-2 w-3/4 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-500/0 blur-sm"></div>
        <div className="absolute -top-4 h-2 w-3/4 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-cyan-500/0 blur-sm"></div>
      </div>
    </div>
  );
}

export default FileUpload;