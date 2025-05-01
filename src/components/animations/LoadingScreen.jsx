"use client"

import { useEffect, useState } from "react"
import { Lock, Shield, Key, RefreshCw } from "lucide-react"

function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [securityMessage, setSecurityMessage] = useState("Initializing secure connection...")

  const messages = [
    "Initializing secure connection...",
    "Encrypting data channels...",
    "Verifying security protocols...",
    "Scanning for vulnerabilities...",
    "Establishing secure tunnel...",
    "Authenticating credentials...",
    "Finalizing security measures...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length)
      setSecurityMessage(messages[randomIndex])
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 p-8">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center rounded-xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-sm">
          <div className="mb-8 flex items-center justify-center">
            <div className="relative">
              {/* Rotating outer ring */}
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite] rounded-full border-2 border-dashed border-cyan-500/30"></div>

              {/* Rotating inner ring (opposite direction) */}
              <div className="absolute inset-4 animate-[spin_6s_linear_infinite_reverse] rounded-full border-2 border-dashed border-purple-500/30"></div>

              {/* Center shield with lock */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-cyan-500/50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <Lock className="h-8 w-8 text-cyan-400" />
                </div>
              </div>

              {/* Orbiting key */}
              <div
                className="absolute h-8 w-8 animate-[spin_8s_linear_infinite] text-purple-400"
                style={{
                  transformOrigin: "center",
                  left: "calc(50% - 1rem)",
                  top: "-1rem",
                }}
              >
                <Key className="h-full w-full" />
              </div>

              {/* Orbiting refresh icon */}
              <div
                className="absolute h-8 w-8 animate-[spin_8s_linear_infinite_reverse] text-blue-400"
                style={{
                  transformOrigin: "center",
                  left: "calc(50% - 1rem)",
                  bottom: "-1rem",
                }}
              >
                <RefreshCw className="h-full w-full" />
              </div>
            </div>
          </div>

          <h2 className="mb-2 text-xl font-bold text-cyan-400">Securing Your Connection</h2>
          <p className="mb-6 text-center text-sm text-gray-400">{securityMessage}</p>

          <div className="mb-2 w-full">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-gray-500">{progress}% Complete</p>

          {/* Binary code effect */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden text-[8px] text-cyan-500/20 select-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-marquee whitespace-nowrap">
                {Array.from({ length: 50 }).map((_, j) => (
                  <span key={j}>{Math.round(Math.random())}</span>
                ))}
              </div>
            ))}
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 h-[1px] bg-cyan-400/30 blur-[1px] animate-scanline"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

