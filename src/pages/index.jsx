"use client"

import { useState, useEffect } from "react"
import HardwareIssueVisualizer from "../components/HardwareIssueVisualizer"
import { Shield } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    name: "Alex Johnson",
    id: "AJ7890",
    role: "System Administrator",
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500 opacity-20"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
              <Shield className="h-12 w-12 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-cyan-400">Loading Hardware Visualization</h2>
          <p className="mt-2 text-gray-400">Preparing your dashboard...</p>
        </div>
      </div>
    )
  }

  return <HardwareIssueVisualizer currentUser={user} />
}

