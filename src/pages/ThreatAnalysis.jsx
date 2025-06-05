"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, Zap, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for vulnerability trend (kept as is per request)
const mockVulnerabilityTrend = [
  { date: "2023-01", count: 12 },
  { date: "2023-02", count: 19 },
  { date: "2023-03", count: 15 },
  { date: "2023-04", count: 22 },
  { date: "2023-05", count: 28 },
  { date: "2023-06", count: 24 },
  { date: "2023-07", count: 31 },
  { date: "2023-08", count: 27 },
  { date: "2023-09", count: 23 },
  { date: "2023-10", count: 18 },
  { date: "2023-11", count: 14 },
  { date: "2023-12", count: 9 },
]

function ThreatAnalysis() {
  // State for API data
  const [exploitAvailability, setExploitAvailability] = useState([])
  const [topVulnerabilities, setTopVulnerabilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [exploitResponse, topVulnResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/exploit-availability"),
          fetch("http://127.0.0.1:8000/top-vulnerabilities"),
        ])

        if (!exploitResponse.ok || !topVulnResponse.ok) {
          throw new Error("Failed to fetch data from one or more APIs")
        }

        const exploitData = await exploitResponse.json()
        const topVulnData = await topVulnResponse.json()

        setExploitAvailability(exploitData)
        setTopVulnerabilities(topVulnData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Summary metrics calculated from fetched data
  const summaryMetrics = {
    critical: exploitAvailability.find((item) => item.status === "Exploit Available")?.count || 0,
    medium: topVulnerabilities.reduce((sum, item) => sum + item.count, 0) - 
            (exploitAvailability.find((item) => item.status === "Exploit Available")?.count || 0),
    resolved: 27, // Fixed value for demo
    score: 68, // Fixed value for demo
  }

  // Colors for charts
  const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"]

  // Loading and error states
  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-gray-950 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Threat Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Critical Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{summaryMetrics.critical}</div>
              <p className="text-sm text-gray-400">Exploitable vulnerabilities</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-yellow-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-400 flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Medium Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{summaryMetrics.medium}</div>
              <p className="text-sm text-gray-400">Potential vulnerabilities</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{summaryMetrics.resolved}</div>
              <p className="text-sm text-gray-400">Patched vulnerabilities</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg self-center shadow-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Threat Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{summaryMetrics.score}/100</div>
              <p className="text-sm text-gray-400">
                {summaryMetrics.score < 30 ? "Low" : summaryMetrics.score < 70 ? "Moderate" : "High"} risk level
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Vulnerability Trend</CardTitle>
              <CardDescription className="text-gray-400">Monthly vulnerability count</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockVulnerabilityTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        color: "#f9fafb",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend wrapperStyle={{ color: "#9ca3af" }} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Vulnerabilities"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Exploit Availability</CardTitle>
              <CardDescription className="text-gray-400">Distribution of exploit status</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={exploitAvailability}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="status"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {exploitAvailability.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        color: "#f9fafb",
                      }}
                      formatter={(value, name) => [`${value} vulnerabilities`, name]}
                    />
                    <Legend formatter={(value) => <span style={{ color: "#9ca3af" }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">Top Vulnerabilities</CardTitle>
            <CardDescription className="text-gray-400">Most common vulnerability types</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVulnerabilities} margin={{ top: 5, right: 30, left: 20, bottom: 100 } }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="plugin"
                    stroke="#9ca3af"
                    tick={{ fill: "#9ca3af" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#f9fafb",
                    }}
                    formatter={(value) => [`${value} instances`, "Count"]}
                  />
                  <Legend wrapperStyle={{ color: "#9ca3af" }} />
                  <Bar dataKey="count" name="Occurrences" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ThreatAnalysis