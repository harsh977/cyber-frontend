"use client"

import { useEffect, useState } from "react"
import { Shield, AlertTriangle, Zap, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import LoadingScreen from "../components/animations/LoadingScreen"

function ThreatAnalysis() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
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
              <div className="text-3xl font-bold text-white">3</div>
              <p className="text-sm text-gray-400">+1 from yesterday</p>
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
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-sm text-gray-400">-3 from yesterday</p>
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
              <div className="text-3xl font-bold text-white">27</div>
              <p className="text-sm text-gray-400">+5 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Threat Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">68/100</div>
              <p className="text-sm text-gray-400">Moderate risk level</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Recent Threats</CardTitle>
              <CardDescription className="text-gray-400">Last 7 days of detected threats</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Threat
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Malware Detected", type: "Trojan", severity: "Critical", status: "Active" },
                      {
                        id: 2,
                        name: "Suspicious Login",
                        type: "Brute Force",
                        severity: "Medium",
                        status: "Investigating",
                      },
                      {
                        id: 3,
                        name: "Data Exfiltration",
                        type: "Data Breach",
                        severity: "Critical",
                        status: "Contained",
                      },
                      {
                        id: 4,
                        name: "Phishing Attempt",
                        type: "Social Engineering",
                        severity: "Medium",
                        status: "Resolved",
                      },
                      { id: 5, name: "Ransomware", type: "Encryption", severity: "Critical", status: "Active" },
                    ].map((threat) => (
                      <tr key={threat.id} className="border-b border-gray-800 last:border-0">
                        <td className="px-4 py-3 text-sm text-white">{threat.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{threat.type}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              threat.severity === "Critical"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {threat.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              threat.status === "Active"
                                ? "bg-red-500/20 text-red-400"
                                : threat.status === "Investigating"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : threat.status === "Contained"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {threat.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Threat Map</CardTitle>
              <CardDescription className="text-gray-400">Geographic distribution of threats</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Interactive threat map</p>
                  <p className="text-xs text-gray-500">Showing global threat activity in real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">Threat Intelligence</CardTitle>
            <CardDescription className="text-gray-400">Analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-800 p-4">
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Ransomware Protection</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Recent intelligence indicates an increase in ransomware attacks targeting your industry. We recommend
                  implementing the following measures:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                  <li>Update all systems to the latest security patches</li>
                  <li>Implement offline backup solutions</li>
                  <li>Conduct employee training on phishing awareness</li>
                  <li>Enable multi-factor authentication across all systems</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-800 p-4">
                <h3 className="text-lg font-medium text-purple-400 mb-2">Data Breach Prevention</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Your organization's data protection measures need improvement. Consider implementing:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                  <li>Data encryption for sensitive information</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Data loss prevention (DLP) solutions</li>
                  <li>Strict access control policies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ThreatAnalysis

