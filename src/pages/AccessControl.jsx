import { Key, Lock, UserCheck, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

function AccessControl() {
  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Access Control</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">247</div>
              <p className="text-sm text-gray-400">Currently authenticated</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-400 flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Access Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">1,893</div>
              <p className="text-sm text-gray-400">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                MFA Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">92%</div>
              <p className="text-sm text-gray-400">User compliance</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Failed Logins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">37</div>
              <p className="text-sm text-gray-400">Requires investigation</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">Recent Access Events</CardTitle>
            <CardDescription className="text-gray-400">Last 10 authentication attempts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, user: "admin@example.com", ip: "192.168.1.105", time: "2 min ago", status: "Success" },
                    { id: 2, user: "jsmith@example.com", ip: "192.168.1.120", time: "15 min ago", status: "Success" },
                    { id: 3, user: "unknown", ip: "103.235.46.39", time: "1 hour ago", status: "Failed" },
                    { id: 4, user: "alee@example.com", ip: "192.168.1.110", time: "3 hours ago", status: "Success" },
                    { id: 5, user: "unknown", ip: "185.176.43.87", time: "5 hours ago", status: "Failed" },
                  ].map((event) => (
                    <tr key={event.id} className="border-b border-gray-800 last:border-0">
                      <td className="px-4 py-3 text-sm text-white">{event.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{event.ip}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{event.time}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            event.status === "Success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {event.status}
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
  )
}

export default AccessControl

