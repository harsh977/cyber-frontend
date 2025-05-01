"use client"

import { useEffect, useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"

const ThreeDScene = ({ data }) => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(5, 5, 5)
  }, [camera])

  // Group data by severity
  const severityGroups = useMemo(() => {
    return data.reduce((acc, item) => {
      const severity = item.Severity || "Unknown"
      if (!acc[severity]) acc[severity] = []
      acc[severity].push(item)
      return acc
    }, {})
  }, [data])

  const severityColors = {
    Critical: "#ff0055",
    High: "#ff3300",
    Medium: "#ffaa00",
    Low: "#00aaff",
    Info: "#00ff99",
    Unknown: "#aaaaaa",
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0099ff" />

      {/* Severity Towers */}
      {Object.entries(severityGroups).map(([severity, items], index) => {
        const angle = (index / Object.keys(severityGroups).length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const height = Math.max(0.5, items.length / 10)

        return (
          <group key={severity} position={[x, 0, z]}>
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry args={[0.8, height, 0.8]} />
              <meshStandardMaterial
                color={severityColors[severity] || "#aaaaaa"}
                emissive={severityColors[severity] || "#aaaaaa"}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <Text
              position={[0, height + 0.5, 0]}
              color={severityColors[severity] || "#aaaaaa"}
              fontSize={0.3}
              maxWidth={2}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
            >
              {`${severity}: ${items.length}`}
            </Text>
          </group>
        )
      })}

      {/* Grid */}
      <gridHelper args={[10, 10, "#444444", "#222222"]} />
    </>
  )
}

export default ThreeDScene

