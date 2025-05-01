import { FileText, Download, Eye, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

function Reports() {
  const reports = [
    {
      id: 1,
      title: "Monthly Security Summary",
      description: "Overview of security incidents and resolutions",
      date: "March 1, 2025",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Vulnerability Assessment",
      description: "Detailed analysis of system vulnerabilities",
      date: "February 15, 2025",
      type: "PDF",
      size: "4.7 MB",
    },
    {
      id: 3,
      title: "Compliance Audit Report",
      description: "Regulatory compliance status and findings",
      date: "January 30, 2025",
      type: "XLSX",
      size: "1.8 MB",
    },
    {
      id: 4,
      title: "Incident Response Summary",
      description: "Details of major security incidents and responses",
      date: "January 15, 2025",
      type: "PDF",
      size: "3.2 MB",
    },
    {
      id: 5,
      title: "User Access Review",
      description: "Quarterly review of user access rights",
      date: "December 31, 2024",
      type: "XLSX",
      size: "2.1 MB",
    },
  ]

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Security Reports</h1>

          <div className="flex gap-4">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {reports.map((report) => (
            <Card key={report.id} className="border-gray-800 bg-gray-900/50 shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-white mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{report.date}</span>
                      <span className="mx-2">•</span>
                      <span>{report.type}</span>
                      <span className="mx-2">•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-white">Report Settings</CardTitle>
            <CardDescription className="text-gray-400">Configure your report preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-800 p-4">
                  <h3 className="text-sm font-medium text-cyan-400 mb-2">Report Format</h3>
                  <p className="text-xs text-gray-400 mb-3">Select your preferred report format for downloads</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      XLSX
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      CSV
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-800 p-4">
                  <h3 className="text-sm font-medium text-purple-400 mb-2">Scheduled Reports</h3>
                  <p className="text-xs text-gray-400 mb-3">Configure automatic report generation</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Weekly
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Monthly
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Custom
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Reports

