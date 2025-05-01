import { BarChart, LineChart, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"

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
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  incidents: {
                    label: "Incidents",
                    color: "hsl(180, 100%, 50%)",
                  },
                  resolved: {
                    label: "Resolved",
                    color: "hsl(120, 100%, 50%)",
                  },
                }}
                className="aspect-[4/3]"
              >
                <LineChart
                  data={securityTrendData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-purple-400">Threat Sources</CardTitle>
              <CardDescription className="text-gray-400">Origin of security threats</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "hsl(280, 100%, 70%)",
                  },
                }}
                className="aspect-[4/3]"
              >
                <PieChart
                  data={threatSourceData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-blue-400">Vulnerability Distribution</CardTitle>
            <CardDescription className="text-gray-400">Vulnerabilities by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(220, 100%, 60%)",
                },
              }}
              className="aspect-[21/9]"
            >
              <BarChart
                data={vulnerabilityData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics

