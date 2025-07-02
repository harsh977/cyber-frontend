import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

function Analytics() {
  // Sample data for analytics
  const securityTrendData = [
    { month: "Jan", incidents: 45, resolved: 42 },
    { month: "Feb", incidents: 52, resolved: 49 },
    { month: "Mar", incidents: 48, resolved: 46 },
    { month: "Apr", incidents: 61, resolved: 55 },
    { month: "May", incidents: 55, resolved: 53 },
    { month: "Jun", incidents: 67, resolved: 62 },
    { month: "Jul", incidents: 58, resolved: 56 },
    { month: "Aug", incidents: 43, resolved: 41 },
  ]

  const threatSourceData = [
    { name: "External", value: 65 },
    { name: "Internal", value: 25 },
    { name: "Partner", value: 10 },
  ]

  const vulnerabilityData = [
    { category: "Web App", count: 42 },
    { category: "Network", count: 28 },
    { category: "Endpoint", count: 35 },
    { category: "Cloud", count: 19 },
    { category: "Mobile", count: 15 },
  ]

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Security Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-cyan-400">Security Incident Trends</CardTitle>
              <CardDescription className="text-gray-400">Monthly incident tracking</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={securityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#00FFFF"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#00FF00"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-purple-400">Threat Sources</CardTitle>
              <CardDescription className="text-gray-400">Origin of security threats</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {threatSourceData.map((entry, index) => (
                      <Pie 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#9333ea' : index === 1 ? '#a855f7' : '#c084fc'}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-blue-400">Vulnerability Distribution</CardTitle>
            <CardDescription className="text-gray-400">Vulnerabilities by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vulnerabilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  name="Vulnerabilities"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics