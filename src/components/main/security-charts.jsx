import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

function SecurityCharts() {
  // Sample data for initial visualization
  const securityIncidents = [
    { month: "Jan", incidents: 45, resolved: 42 },
    { month: "Feb", incidents: 52, resolved: 49 },
    { month: "Mar", incidents: 48, resolved: 46 },
    { month: "Apr", incidents: 61, resolved: 55 },
    { month: "May", incidents: 55, resolved: 53 },
    { month: "Jun", incidents: 67, resolved: 62 },
  ]

  const threatTypes = [
    { type: "Malware", count: 423 },
    { type: "Phishing", count: 327 },
    { type: "DDoS", count: 125 },
    { type: "Insider", count: 78 },
    { type: "Zero-day", count: 42 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-cyan-500/5">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-cyan-400">Security Incidents Over Time</CardTitle>
          <CardDescription className="text-gray-400">Monthly breakdown of security events</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="aspect-[4/3]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={securityIncidents}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#00FFFF" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#00FF00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-purple-400">Threat Distribution</CardTitle>
          <CardDescription className="text-gray-400">Breakdown by threat type</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="aspect-[4/3]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={threatTypes}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="type" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="#BF00FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SecurityCharts

