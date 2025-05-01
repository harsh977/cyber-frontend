"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "../ui/button"

function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        onFileUpload(file)
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0])
    }
  }

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
        <h3 className="mb-2 text-xl font-medium text-white">Upload Excel Data</h3>
        <p className="mb-4 max-w-xs text-sm text-gray-400">
          Drag and drop your Excel file here, or click to browse your files
        </p>

        <label htmlFor="file-upload">
          <Button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
            <span className="relative z-10 flex items-center gap-2">Select Excel File</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </label>
        <input id="file-upload" type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />

        <div className="absolute -bottom-4 h-2 w-3/4 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-500/0 blur-sm"></div>
        <div className="absolute -top-4 h-2 w-3/4 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-cyan-500/0 blur-sm"></div>
      </div>
    </div>
  )
}

export default FileUpload

