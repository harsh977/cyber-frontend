"use client"

import { useEffect, useRef } from "react"
import { Lock } from "lucide-react"

function SecurityLock() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rotationX = 0
    let rotationY = 0
    let animationFrame

    const animate = () => {
      rotationY += 0.2
      container.style.transform = `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      rotationX = ((e.clientY - centerY) / 20) * -1
      rotationY = (e.clientX - centerX) / 20
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrame)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <div
        ref={containerRef}
        className="relative flex h-32 w-32 transform-gpu items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shadow-[0_0_30px_rgba(0,255,255,0.3)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm"
          style={{ transform: "translateZ(-10px)" }}
        ></div>

        <div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
          style={{ transform: "translateZ(5px)" }}
        ></div>

        <div
          className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600"
          style={{ transform: "translateZ(15px)" }}
        >
          <Lock className="h-10 w-10 text-white" style={{ transform: "translateZ(5px)" }} />
        </div>

        <div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          style={{ transform: "translateZ(20px)" }}
        ></div>

        <div
          className="absolute -inset-4 rounded-full border border-cyan-400/10"
          style={{ transform: "translateZ(25px)" }}
        ></div>
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-cyan-500/20"></div>
      <div className="absolute inset-4 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-purple-500/20"></div>

      {/* Glow effects */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-xl"></div>
      <div className="absolute -bottom-4 h-2 w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 blur-md"></div>
    </div>
  )
}

export default SecurityLock

