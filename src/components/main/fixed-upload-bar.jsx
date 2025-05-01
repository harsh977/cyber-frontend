"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

function FixedUploadBar({ onFileUpload }) {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSendClick = () => {
    if (message.trim()) {
      // Navigate to the message sent page with loading animation
      navigate("/message-sent")
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/90 p-3 shadow-lg backdrop-blur-md">
      <Input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border-gray-700 bg-gray-800/50 text-white placeholder-gray-400"
      />
      <Button
        onClick={handleSendClick}
        className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Send className="h-4 w-4" />
          Send
        </span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
      </Button>
      <div className="absolute -bottom-px left-0 h-px w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-blue-500/0"></div>
    </div>
  )
}

export default FixedUploadBar

