import { useOutletContext } from "react-router-dom"
import { FileSpreadsheet, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"

import StatusCards from "../components/main/status-cards"
import SecurityCharts from "../components/main/security-charts"
import FuturisticCharts from "../components/main/futuristic-charts"
import FileUpload from "../components/main/file-upload"
import FixedUploadBar from "../components/main/fixed-upload-bar"
import SecurityLock from "../components/main/security-lock"

function Dashboard() {
  const { data, fileName, handleFileUpload } = useOutletContext() || {
    data: [],
    fileName: null,
    handleFileUpload: () => {},
  }

  return (
    <main className="flex-1 p-6">
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-cyan-900/50 p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Cybersecurity <span className="text-cyan-400">Analytics</span> Dashboard
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-gray-300">
              Visualize and analyze your security data with our advanced cyberpunk-inspired dashboard. Upload your Excel
              data for real-time insights.
            </p>
            {fileName ? (
              <div className="flex items-center gap-2 rounded-lg bg-cyan-950/50 px-4 py-2 text-cyan-300">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Analyzing: {fileName}</span>
              </div>
            ) : (
              <Button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            )}
          </div>
          <div className="flex-shrink-0 flex justify-center">
            <SecurityLock />
          </div>
        </div>
        <div className="absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 z-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
      </div>

      <StatusCards />

      <div className="mt-6">
        <SecurityCharts />
      </div>

      <div className="mt-6">
        <FuturisticCharts />
      </div>

      <FileUpload onFileUpload={handleFileUpload} />
      <FixedUploadBar onFileUpload={handleFileUpload} />
    </main>
  )
}

export default Dashboard

