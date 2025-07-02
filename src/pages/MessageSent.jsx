"use client"

import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CheckCircle, Send } from "lucide-react"

function MessageSent() {
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message

  useEffect(() => {
    async function sendToModel() {
      try {
        const response = await fetch("http://127.0.0.1:8001/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        })
        const data = await response.json()
        navigate("/results", { state: { message, response: data } })
      } catch (error) {
        console.error("Error sending to model:", error)
        navigate("/results", { state: { message, response: null } })
      }
    }

    if (message) {
      sendToModel()
    } else {
      navigate("/")
    }
  }, [message, navigate])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-950">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center rounded-xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-sm">
          <div className="mb-6 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20"></div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
              <CheckCircle className="h-12 w-12 text-green-400 animate-spin" />
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-white">Sending your message...</h2>
          <p className="mb-6 text-center text-gray-400">Please wait while we process it.</p>

          <div className="mb-6 flex items-center justify-center space-x-2">
            <div className="h-1 w-3 animate-pulse rounded-full bg-cyan-400"></div>
            <div className="h-1 w-3 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-1 w-3 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.4s" }}></div>
            <div className="h-1 w-3 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.6s" }}></div>
            <div className="h-1 w-3 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.8s" }}></div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Send className="h-4 w-4 animate-bounce" />
            <span>Waiting for model response...</span>
          </div>

          <div className="absolute -top-4 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 blur-sm"></div>
          <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 blur-sm"></div>
        </div>
      </div>
    </div>
  )
}

export default MessageSent
