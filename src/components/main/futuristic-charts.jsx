import {
  PieChart,
  BarChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

function FuturisticCharts() {
  // Sample data for pie chart
  const securityLayersData = [
    { name: "Network", value: 35 },
    { name: "Application", value: 25 },
    { name: "Data", value: 20 },
    { name: "Endpoint", value: 15 },
    { name: "Physical", value: 5 },
  ]

  // Sample data for bar chart
  const attackVectorsData = [
    { vector: "Web App", attacks: 423, blocked: 410 },
    { vector: "Email", attacks: 327, blocked: 320 },
    { vector: "Network", attacks: 215, blocked: 205 },
    { vector: "Social", attacks: 189, blocked: 175 },
    { vector: "Physical", attacks: 87, blocked: 85 },
  ]

  // Colors for pie chart
  const COLORS = ["#8884d8", "#00C49F", "#FFBB28", "#FF8042", "#0088FE"]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5 overflow-hidden">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-purple-400">Security Layer Distribution</CardTitle>
          <CardDescription className="text-gray-400">Protection by security layer</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative">
          {/* Futuristic background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"></div>
            <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"></div>
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/5"></div>
            <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl"></div>
          </div>

          <div className="aspect-[4/3] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={securityLayersData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {securityLayersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border-b border-l border-cyan-500/5"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-cyan-500/5 overflow-hidden">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-cyan-400">Attack Vectors Analysis</CardTitle>
          <CardDescription className="text-gray-400">Attacks vs blocked by vector</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative">
          {/* Futuristic background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"></div>
          </div>

          <div className="aspect-[4/3] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attackVectorsData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="vector" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="attacks" fill="#00FFFF" />
                <Bar dataKey="blocked" fill="#00FF00" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scan lines effect */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-cyan-400"
                style={{ top: `${i * 5}%`, opacity: 0.5 + Math.random() * 0.5 }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuturisticCharts

