"use client"

import { useEffect, useState } from "react"
import { Network, Activity, Wifi, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import LoadingScreen from "../components/animations/LoadingScreen"

function NetworkSecurity() {
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
              <div className="text-xl font-bold text-green-400">Protected</div>
              <p className="text-sm text-gray-400">All systems operational</p>
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
              <div className="text-xl font-bold text-white">1.2 TB/day</div>
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
              <div className="text-xl font-bold text-white">247</div>
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
              <div className="text-xl font-bold text-white">Active</div>
              <p className="text-sm text-gray-400">Last updated: 2h ago</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Network Traffic</CardTitle>
              <CardDescription className="text-gray-400">Real-time traffic monitoring</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Interactive network graph</p>
                  <p className="text-xs text-gray-500">Showing real-time network traffic and connections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Blocked Threats</CardTitle>
              <CardDescription className="text-gray-400">Recent blocked network threats</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Threat Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, ip: "192.168.1.105", type: "Port Scan", time: "2 min ago", action: "Blocked" },
                      { id: 2, ip: "45.33.32.156", type: "DDoS Attempt", time: "15 min ago", action: "Blocked" },
                      { id: 3, ip: "103.235.46.39", type: "Malware", time: "1 hour ago", action: "Quarantined" },
                      { id: 4, ip: "91.234.99.10", type: "Phishing", time: "3 hours ago", action: "Blocked" },
                      { id: 5, ip: "185.176.43.87", type: "Brute Force", time: "5 hours ago", action: "Blocked" },
                    ].map((threat) => (
                      <tr key={threat.id} className="border-b border-gray-800 last:border-0">
                        <td className="px-4 py-3 text-sm text-white">{threat.ip}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{threat.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{threat.time}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              threat.action === "Blocked"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {threat.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Network Topology</CardTitle>
              <CardDescription className="text-gray-400">Current network infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Interactive network topology map</p>
                  <p className="text-xs text-gray-500">Showing all connected devices and infrastructure</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white">Network Devices</CardTitle>
              <CardDescription className="text-gray-400">Connected hardware status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Main Firewall", status: "Online" },
                      { id: 2, name: "Core Router", status: "Online" },
                      { id: 3, name: "Edge Switch", status: "Online" },
                      { id: 4, name: "Backup Server", status: "Online" },
                      { id: 5, name: "VPN Gateway", status: "Online" },
                      { id: 6, name: "IDS System", status: "Online" },
                    ].map((device) => (
                      <tr key={device.id} className="border-b border-gray-800 last:border-0">
                        <td className="px-4 py-3 text-sm text-white">{device.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                            <span className="text-green-400">{device.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NetworkSecurity

