"use client"

import { useState, useEffect } from "react"
import { Network, Activity, Wifi, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

function NetworkSecurity() {
  // State for API data
  const [vulnerabilitiesByPort, setVulnerabilitiesByPort] = useState([])
  const [protocolDistribution, setProtocolDistribution] = useState([])
  const [riskFactorDistribution, setRiskFactorDistribution] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock summary metrics (replace with API call when endpoint is provided)
  const summaryMetrics = {
    networkStatus: "Protected",
    trafficVolume: "1.2 TB/day",
    activeConnections: 247,
    firewallStatus: "Active",
  }

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [vulnResponse, protocolResponse, riskResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/vulnerabilities-by-port"),
          fetch("http://127.0.0.1:8000/protocol-distribution"),
          fetch("http://127.0.0.1:8000/risk-factor-distribution"),
        ])

        if (!vulnResponse.ok || !protocolResponse.ok || !riskResponse.ok) {
          throw new Error("Failed to fetch data from one or more APIs")
        }

        const vulnerabilities = await vulnResponse.json()
        const protocols = await protocolResponse.json()
        const risks = await riskResponse.json()

        setVulnerabilitiesByPort(vulnerabilities)
        setProtocolDistribution(protocols)
        setRiskFactorDistribution(risks)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Prepare data for stacked bar chart
  const prepareRiskData = () => {
    return riskFactorDistribution.map((item) => {
      const result = { ip: item.ip }
      item.risks
        .filter((risk) => risk.risk !== null) // Exclude null risks
        .forEach((risk) => {
          result[risk.risk] = risk.count
        })
      return result
    })
  }

  const riskData = prepareRiskData()
  const riskLevels = ["Critical", "High", "Medium", "Low"]
  const riskColors = {
    Critical: "#ef4444",
    High: "#f59e0b",
    Medium: "#3b82f6",
    Low: "#10b981",
  }

  // Colors for protocol distribution chart
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"]

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
        <h1 className="text-3xl font-bold text-white mb-6">Network Security</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-cyan-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-xl font-bold ${
                  summaryMetrics.networkStatus === "Protected" ? "text-green-400" : "text-red-400"
                }`}
              >
                {summaryMetrics.networkStatus}
              </div>
              <p className="text-sm text-gray-400">Based on vulnerability scan</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Traffic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summaryMetrics.trafficVolume}</div>
              <p className="text-sm text-gray-400">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-400 flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                Active Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summaryMetrics.activeConnections}</div>
              <p className="text-sm text-gray-400">23 authenticated users</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Firewall Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summaryMetrics.firewallStatus}</div>
              <p className="text-sm text-gray-400">Last updated: 2h ago</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Vulnerabilities by Port</CardTitle>
              <CardDescription className="text-gray-400">Distribution of vulnerabilities across ports</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vulnerabilitiesByPort} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="port" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        color: "#f9fafb",
                      }}
                      formatter={(value) => [`${value} vulnerabilities`, "Count"]}
                    />
                    <Legend wrapperStyle={{ color: "#9ca3af" }} />
                    <Bar dataKey="count" name="Vulnerabilities" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Protocol Distribution</CardTitle>
              <CardDescription className="text-gray-400">Network traffic by protocol</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={protocolDistribution}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <YAxis dataKey="protocol" type="category" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        color: "#f9fafb",
                      }}
                      formatter={(value) => [`${value} connections`, "Count"]}
                    />
                    <Legend wrapperStyle={{ color: "#9ca3af" }} />
                    <Bar dataKey="count" name="Connections" fill="#8b5cf6">
                      {protocolDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">Risk Factor Distribution by IP</CardTitle>
            <CardDescription className="text-gray-400">Vulnerability risk levels across IP addresses</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="ip" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#f9fafb",
                    }}
                    formatter={(value, name) => [`${value} vulnerabilities`, `${name} Risk`]}
                  />
                  <Legend wrapperStyle={{ color: "#9ca3af" }} />
                  {riskLevels.map((risk, index) => (
                    <Bar
                      key={`risk-${index}`}
                      dataKey={risk}
                      stackId="a"
                      name={risk}
                      fill={riskColors[risk] || COLORS[index % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NetworkSecurity