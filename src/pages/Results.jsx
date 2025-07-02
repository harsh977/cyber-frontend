"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, BarChart } from "lucide-react"
import { useEffect } from "react"

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { message, response } = location.state || {}

  useEffect(() => {
    console.log("✅ Model Response:", response)
  }, [response])

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white p-4">
        <h2 className="text-xl font-bold mb-4">No response found.</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 p-6 text-white">
      <div className="relative w-full max-w-3xl rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow backdrop-blur-md overflow-y-auto max-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-2xl"></div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Model Analysis Result
          </h2>

          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-gray-300">
            <strong>Message Sent:</strong>
            <p className="text-white mt-1">{message}</p>
          </div>

          <div className="space-y-2">
            <div><strong>Intent:</strong> {response.intent}</div>
            <div><strong>Type:</strong> {response.type || response.task_type}</div>
            <div><strong>Description:</strong> {response.description}</div>
          </div>

          {/* numeric / simple numeric data */}
          {response.type === "numeric" && response.data && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded border border-gray-700">
              <strong>Data:</strong>
              <div className="text-white mt-2 text-lg">
                {Object.entries(response.data).map(([k, v]) => (
                  <div key={k}>
                    {k}: <span className="font-bold text-cyan-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* plot with base64 images */}
          {response.task_type === "plot" && response.visualizations?.graph1 && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded border border-gray-700">
              <strong>Visualization:</strong>
              <div className="mt-4 flex justify-center">
                <img
                  src={response.visualizations.graph1}
                  alt="Analysis Plot"
                  className="max-w-full rounded shadow"
                />
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                Additional Data:
                <pre className="mt-2 overflow-x-auto">{JSON.stringify(response.data, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* list with heatmaps or other graphs */}
          {response.type === "list" && response.graph && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded border border-gray-700">
              <strong>Visualization:</strong>
              <div className="mt-4 flex justify-center">
                <img
                  src={response.graph}
                  alt="List Graph"
                  className="max-w-full rounded shadow"
                />
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                Additional Data:
                <pre className="mt-2 overflow-x-auto">{JSON.stringify(response.data, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* type table (columns + data) */}
          {response.type === "table" && response.columns && response.data && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded border border-gray-700 overflow-x-auto">
              <h3 className="font-bold text-cyan-400 mb-2">{response.title || "Table"}</h3>
              <table className="w-full border border-gray-700 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    {response.columns.map((col) => (
                      <th key={col} className="border px-2 py-1 border-gray-700">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {response.data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-700/30">
                      {response.columns.map((col) => (
                        <td key={col} className="border px-2 py-1 border-gray-700">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {response.graph && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={response.graph}
                    alt={response.title}
                    className="max-w-full rounded shadow"
                  />
                </div>
              )}
            </div>
          )}

          {/* dedicated image response */}
          {response.type === "image" && response.graph && (
            <div className="mt-6 p-4 bg-gray-800/40 rounded border border-gray-700">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                {response.title || "Image Visualization"}
              </h3>
              <div className="flex justify-center mt-4">
                <img
                  src={`data:image/png;base64,${response.graph}`}
                  alt={response.title || "Analysis Image"}
                  className="max-w-full rounded shadow"
                />
              </div>
            </div>
          )}

          {response.type === "image" && response.graph1 && (
            <div className="mt-6 p-4 bg-gray-800/40 rounded border border-gray-700">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                {response.title || "Image Visualization"}
              </h3>
              <div className="flex justify-center mt-4">
                <img
                  src={`data:image/png;base64,${response.graph1}`}
                  alt={response.title || "Analysis Image"}
                  className="max-w-full rounded shadow"
                />
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
