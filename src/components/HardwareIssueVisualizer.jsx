"use client"

import { useState, useEffect, useMemo } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Shield, AlertTriangle, Server, Cpu, HardDrive, Wifi } from "lucide-react"
import Papa from "papaparse"

// 3D Models
const ServerModel = ({ position, scale, rotation, color }) => {
  // Since we're having issues with the model loading, let's use the fallback ServerBox instead
  return <ServerBox position={position} scale={scale} rotation={rotation} color={color} />
}

// Fallback 3D Server representation if model fails to load
const ServerBox = ({ position, scale, rotation, color }) => {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <boxGeometry args={[1, 0.2, 1.5]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

// 3D Visualization Scene
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

      {/* Orbit Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={2} maxDistance={10} />
    </>
  )
}

// Main Component
const HardwareIssueVisualizer = ({ data, currentUser }) => {
  const [parsedData, setParsedData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [chartData, setChartData] = useState({
    severity: [],
    riskFactor: [],
    timeline: [],
    ipDistribution: [],
    cveCount: [],
    protocolDistribution: [],
  })

  // Fetch and parse CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // If data is provided via props, use it
        if (data && data.length > 0) {
          processData(data)
          return
        }

        // Otherwise fetch from URL
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISM-3tidX3EXEYKsZFoyzyacbyQQqmAvuJ.csv",
        )
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            processData(results.data)
          },
          error: (error) => {
            console.error("Error parsing CSV:", error)
            setLoading(false)
          },
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [data])

  // Process the data for visualizations
  const processData = (rawData) => {
    // Filter out any empty rows
    const filteredData = rawData.filter((item) => item["IP Address"] && item.Severity && item["Plugin Name"])

    setParsedData(filteredData)

    // Process data for charts
    const severityCounts = {}
    const riskFactorCounts = {}
    const ipCounts = {}
    const protocolCounts = {}
    const cveData = []
    const timelineData = []

    filteredData.forEach((item) => {
      // Severity distribution
      const severity = item.Severity || "Unknown"
      severityCounts[severity] = (severityCounts[severity] || 0) + 1

      // Risk factor distribution
      const riskFactor = item["Risk Factor"] || "Unknown"
      riskFactorCounts[riskFactor] = (riskFactorCounts[riskFactor] || 0) + 1

      // IP address distribution
      const ip = item["IP Address"]
      ipCounts[ip] = (ipCounts[ip] || 0) + 1

      // Protocol distribution
      const protocol = item.Protocol || "Unknown"
      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1

      // CVE data
      if (item.CVE) {
        const cves = item.CVE.split(",")
        cves.forEach((cve) => {
          if (cve.trim()) {
            cveData.push({
              cve: cve.trim(),
              severity: severity,
              ip: ip,
              cvssScore: Number.parseFloat(item["CVSS V3 Base Score"] || item["CVSS V2 Base Score"] || "0"),
            })
          }
        })
      }

      // Timeline data
      if (item["Plugin Publication Date"]) {
        const date = new Date(item["Plugin Publication Date"])
        if (!isNaN(date.getTime())) {
          timelineData.push({
            date: date,
            severity: severity,
            plugin: item["Plugin Name"],
          })
        }
      }
    })

    // Convert to array format for charts
    const severityData = Object.entries(severityCounts).map(([name, value]) => ({ name, value }))
    const riskFactorData = Object.entries(riskFactorCounts).map(([name, value]) => ({ name, value }))
    const ipDistributionData = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10 IPs

    const protocolData = Object.entries(protocolCounts).map(([name, value]) => ({ name, value }))

    // Group CVEs by count
    const cveCounts = {}
    cveData.forEach((item) => {
      cveCounts[item.cve] = (cveCounts[item.cve] || 0) + 1
    })

    const cveCountData = Object.entries(cveCounts)
      .map(([cve, count]) => ({ cve, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10 CVEs

    // Sort timeline data
    timelineData.sort((a, b) => a.date - b.date)

    setChartData({
      severity: severityData,
      riskFactor: riskFactorData,
      timeline: timelineData,
      ipDistribution: ipDistributionData,
      cveCount: cveCountData,
      protocolDistribution: protocolData,
    })

    setLoading(false)
  }

  // Colors for charts
  const COLORS = ["#FF0055", "#FF3300", "#FFAA00", "#00AAFF", "#00FF99", "#AA00FF", "#FF00AA"]

  // Neon glow effect for text
  const neonTextStyle = {
    textShadow: "0 0 5px #00AAFF, 0 0 10px #00AAFF, 0 0 15px #00AAFF, 0 0 20px #00AAFF",
    color: "#FFFFFF",
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label" style={{ color: "#FFFFFF", fontWeight: "bold" }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500"></div>
          <h2 className="text-xl font-bold text-cyan-400" style={neonTextStyle}>
            Loading Visualization Data...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600">
              <HardDrive className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white" style={neonTextStyle}>
              HardwareViz<span className="text-cyan-400">3D</span>
            </span>
          </div>

          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-800 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Logged in as</p>
                    <p className="font-medium text-white">
                      {currentUser.name} <span className="text-cyan-400">#{currentUser.id}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white" style={neonTextStyle}>
            Hardware Issue Visualization
          </h1>
          <p className="text-gray-400">Interactive 3D visualization of hardware security issues and vulnerabilities</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex space-x-2 overflow-x-auto">
          {["overview", "3d-view", "severity", "cve-analysis", "network"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Issues</p>
                      <p className="text-2xl font-bold text-white">{parsedData.length}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20">
                      <Shield className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Critical Issues</p>
                      <p className="text-2xl font-bold text-white">
                        {chartData.severity.find((item) => item.name === "Critical")?.value || 0}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                      <Server className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Affected Servers</p>
                      <p className="text-2xl font-bold text-white">
                        {new Set(parsedData.map((item) => item["IP Address"])).size}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                      <Wifi className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Network Protocols</p>
                      <p className="text-2xl font-bold text-white">
                        {new Set(parsedData.map((item) => item.Protocol)).size}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Severity Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.severity}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.severity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Top 10 Affected IPs</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.ipDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="ip" stroke="#888" angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="#888" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Issues" fill="#00AAFF">
                          {chartData.ipDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
              >
                <h3 className="mb-4 text-lg font-medium text-white">Protocol Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={chartData.protocolDistribution}>
                      <PolarGrid stroke="#444" />
                      <PolarAngleAxis dataKey="name" stroke="#888" />
                      <PolarRadiusAxis stroke="#888" />
                      <Radar name="Protocols" dataKey="value" stroke="#FF00AA" fill="#FF00AA" fillOpacity={0.6} />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          )}

          {/* 3D View Tab */}
          {activeTab === "3d-view" && (
            <div className="h-[600px] w-full rounded-lg border border-gray-800 bg-gray-800/30 overflow-hidden">
              <Canvas shadows>
                <ThreeDScene data={parsedData} />
              </Canvas>
            </div>
          )}

          {/* Severity Tab */}
          {activeTab === "severity" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Severity by Risk Factor</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.riskFactor} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" name="Count" fill="#00AAFF">
                          {chartData.riskFactor.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Severity Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.severity}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {chartData.severity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
              >
                <h3 className="mb-4 text-lg font-medium text-white">Severity Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Severity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Count</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Percentage</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Visualization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.severity.map((item, index) => {
                        const percentage = ((item.value / parsedData.length) * 100).toFixed(1)
                        return (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="px-4 py-3 text-sm font-medium text-white">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{item.value}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{percentage}%</td>
                            <td className="px-4 py-3">
                              <div className="h-4 w-full rounded-full bg-gray-700">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: COLORS[index % COLORS.length],
                                    boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}`,
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* CVE Analysis Tab */}
          {activeTab === "cve-analysis" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Top CVEs by Occurrence</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.cveCount} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="cve" stroke="#888" angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="#888" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Occurrences" fill="#FF00AA">
                          {chartData.cveCount.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">CVE Severity Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis type="category" dataKey="cve" name="CVE" stroke="#888" tick={false} />
                        <YAxis type="number" dataKey="cvssScore" name="CVSS Score" stroke="#888" domain={[0, 10]} />
                        <ZAxis type="number" dataKey="count" range={[50, 500]} name="Occurrences" />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                        <Scatter
                          name="CVEs"
                          data={chartData.cveCount.map((item) => ({
                            ...item,
                            cvssScore: Math.random() * 10, // Simulated CVSS score for visualization
                          }))}
                          fill="#FF00AA"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
              >
                <h3 className="mb-4 text-lg font-medium text-white">CVE Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">CVE ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Occurrences</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Affected IPs</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.cveCount.slice(0, 5).map((item, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="px-4 py-3 text-sm font-medium text-cyan-400">{item.cve}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{item.count}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {Math.floor(Math.random() * 10) + 1} {/* Simulated count for visualization */}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="rounded-full px-2 py-1 text-xs font-medium"
                              style={{
                                backgroundColor: `${COLORS[index % COLORS.length]}20`,
                                color: COLORS[index % COLORS.length],
                              }}
                            >
                              {["Critical", "High", "Medium", "Low"][Math.floor(Math.random() * 4)]}{" "}
                              {/* Simulated severity for visualization */}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* Network Tab */}
          {activeTab === "network" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Top Affected IPs</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData.ipDistribution}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis type="number" stroke="#888" />
                        <YAxis dataKey="ip" type="category" stroke="#888" width={150} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Issues" fill="#00AAFF">
                          {chartData.ipDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
                >
                  <h3 className="mb-4 text-lg font-medium text-white">Protocol Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.protocolDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {chartData.protocolDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
              >
                <h3 className="mb-4 text-lg font-medium text-white">Network Device Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">IP Address</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">DNS Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">MAC Address</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Issues</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.ipDistribution.slice(0, 5).map((item, index) => {
                        // Find a sample record for this IP to get DNS and MAC
                        const sampleRecord = parsedData.find((record) => record["IP Address"] === item.ip) || {}
                        return (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="px-4 py-3 text-sm font-medium text-cyan-400">{item.ip}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{sampleRecord["DNS Name"] || "N/A"}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{sampleRecord["MAC Address"] || "N/A"}</td>
                            <td className="px-4 py-3">
                              <span
                                className="rounded-full px-2 py-1 text-xs font-medium"
                                style={{
                                  backgroundColor: `${COLORS[index % COLORS.length]}20`,
                                  color: COLORS[index % COLORS.length],
                                }}
                              >
                                {item.count} issues
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>HardwareViz3D © {new Date().getFullYear()} | Futuristic Hardware Issue Visualization</p>
        </div>
      </footer>
    </div>
  )
}

// Default props
HardwareIssueVisualizer.defaultProps = {
  data: [],
  currentUser: {
    name: "Demo User",
    id: "12345",
  },
}

export default HardwareIssueVisualizer

