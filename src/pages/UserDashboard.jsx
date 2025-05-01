import { Shield, AlertTriangle, Activity, Server, Users, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

function UserDashboard() {
  const securityScore = 85
  const threatLevel = "Low"
  const lastScan = "2 hours ago"

  const securityMetrics = [
    { name: "Firewall Status", value: "Active", icon: Shield, color: "text-green-400" },
    { name: "Vulnerabilities", value: "3 Found", icon: AlertTriangle, color: "text-yellow-400" },
    { name: "System Health", value: "Optimal", icon: Activity, color: "text-blue-400" },
    { name: "Server Status", value: "Online", icon: Server, color: "text-purple-400" },
    { name: "User Access", value: "Restricted", icon: Users, color: "text-cyan-400" },
    { name: "Encryption", value: "Enabled", icon: Lock, color: "text-indigo-400" },
  ]

  const recentActivities = [
    { id: 1, action: "Login attempt", status: "Success", time: "Just now", ip: "192.168.1.1" },
    { id: 2, action: "Password changed", status: "Success", time: "Yesterday", ip: "192.168.1.1" },
    { id: 3, action: "File download", status: "Success", time: "2 days ago", ip: "192.168.1.1" },
    { id: 4, action: "Login attempt", status: "Failed", time: "3 days ago", ip: "103.45.67.89" },
  ]

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">User Dashboard</h1>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-cyan-500/5 overflow-hidden">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-cyan-400">Security Score</CardTitle>
              <CardDescription className="text-gray-400">Your overall security rating</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-cyan-400"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${(2 * Math.PI * 40 * securityScore) / 100} ${2 * Math.PI * 40}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{securityScore}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Last scan: {lastScan}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5 overflow-hidden">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-purple-400">Threat Level</CardTitle>
              <CardDescription className="text-gray-400">Current security threat status</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
                  <Shield className="h-12 w-12 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">{threatLevel}</h3>
                <p className="text-sm text-gray-400 mt-2">No immediate threats detected</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-blue-500/5 overflow-hidden">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-blue-400">Account Status</CardTitle>
              <CardDescription className="text-gray-400">Your account security status</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Two-factor authentication</span>
                  <span className="text-sm font-medium text-green-400">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Password strength</span>
                  <span className="text-sm font-medium text-yellow-400">Medium</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Last password change</span>
                  <span className="text-sm font-medium text-white">30 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Account verification</span>
                  <span className="text-sm font-medium text-green-400">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Metrics */}
        <h2 className="text-xl font-bold text-white mb-4">Security Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="border-gray-800 bg-gray-900/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 ${metric.color}`}
                  >
                    <metric.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">{metric.name}</p>
                    <p className={`font-medium ${metric.color}`}>{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
          <CardHeader className="border-b border-gray-800 pb-3">
            <CardTitle className="text-white">Activity Log</CardTitle>
            <CardDescription className="text-gray-400">Recent account activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-800 last:border-0">
                      <td className="px-4 py-3 text-sm text-white">{activity.action}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            activity.status === "Success"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{activity.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{activity.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDashboard

