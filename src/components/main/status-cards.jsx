import { AlertCircle, Network, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

function StatusCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-cyan-400">Security Status</CardTitle>
          <CardDescription className="text-gray-400">Current system security overview</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Protection Level</p>
                <p className="font-medium text-white">Optimal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">98%</p>
              <p className="text-xs text-gray-400">+2.5% from last week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-blue-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-blue-400">Network Traffic</CardTitle>
          <CardDescription className="text-gray-400">Real-time network monitoring</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Network className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Traffic</p>
                <p className="font-medium text-white">1.2 TB/day</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">Normal</p>
              <p className="text-xs text-gray-400">No anomalies detected</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-red-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-red-400">Threat Alerts</CardTitle>
          <CardDescription className="text-gray-400">Active security threats</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Threats</p>
                <p className="font-medium text-white">3 Detected</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-400">Medium</p>
              <p className="text-xs text-gray-400">2 in quarantine</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatusCards

