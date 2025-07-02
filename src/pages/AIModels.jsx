"use client"

import { useState } from "react"
import { X, Brain, Database, Target, Zap, Send, Loader2 } from "lucide-react"
import axios from "axios"

const AIModels = () => {
  const [selectedModel, setSelectedModel] = useState(null)
  const [inputText, setInputText] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Model data
  const models = [
    {
      id: 1,
      name: "RAW Transformers Model",
      description:
        "Advanced transformer-based model for intent classification with high accuracy. Capable of processing raw text inputs and generating detailed analytics graphs.",
      accuracy: 94.7,
      trainingDataSize: "2.3M samples",
      modelType: "Transformer Architecture",
      lastUpdated: "2024-01-15",
      features: ["Real-time classification", "Multi-intent detection", "Visual analytics"],
      endpoint: "/api/models/raw-transformers/predict",
    },
    {
      id: 2,
      name: "Zero Shot Classification",
      description:
        "Specialized model for classifying text without task-specific training. Achieves high accuracy on unseen categories and generates classification graphs.",
      accuracy: 97.2,
      trainingDataSize: "1.8M samples",
      modelType: "Zero-shot Learner",
      lastUpdated: "2024-01-12",
      features: ["No training required", "Multi-label classification", "Visual outputs"],
      endpoint: "/api/models/zero-shot/predict",
    },
    {
      id: 3,
      name: "Intent Analyzer Pro",
      description:
        "High-performance model specifically designed for intent detection with visualization capabilities. Processes complex datasets with 95%+ accuracy.",
      accuracy: 91.5,
      trainingDataSize: "3.1M samples",
      modelType: "Deep Neural Network",
      lastUpdated: "2024-01-18",
      features: ["Intent clustering", "Confidence scoring", "Interactive graphs"],
      endpoint: "/api/models/intent-analyzer/predict",
    },
  ]

  const handleCardClick = (model) => {
    setSelectedModel(model)
    setInputText("")
    setPrediction(null)
    setError(null)
  }

  const handleCloseModal = () => {
    setSelectedModel(null)
    setInputText("")
    setPrediction(null)
    setError(null)
    setIsLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      if (selectedModel.name === "Zero Shot Classification") {
        const response = await axios.post("http://127.0.0.1:8002/predict", {
          text: inputText,
        })

        setPrediction({
          result: response.data.result || "Unknown",
          confidence: response.data.confidence || 90,
          details: response.data.details || "Classification completed successfully.",
        })
      } else if (selectedModel.name === "RAW Transformers Model") {
        const response = await axios.post("http://127.0.0.1:8001/predict-intent", {
          prompt: inputText,
        })

        setPrediction({
          result: response.data.predicted_intent,
          confidence: response.data.confidence,
          details: `Intent analysis completed with ${response.data.confidence.toFixed(1)}% confidence.`,
        })
      } else {
        setPrediction({
          result: "Sample Intent",
          confidence: 95,
          details: "This model specializes in intent classification with visualization capabilities.",
        })
      }
    } catch (err) {
      console.error(err)
      setError("Failed to get prediction. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return "text-green-400"
    if (accuracy >= 90) return "text-yellow-400"
    return "text-red-400"
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 70) return "text-green-400" // High confidence
    if (confidence >= 40) return "text-yellow-400" // Medium confidence
    return "text-red-400" // Low confidence
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">NLP Models</h1>
              <p className="text-gray-400 mt-1">Advanced natural language processing models for intent classification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => handleCardClick(model)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800/70 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              {/* Model Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-400">{model.modelType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getAccuracyColor(model.accuracy)}`}>{model.accuracy}%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{model.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-white">{model.trainingDataSize}</div>
                    <div className="text-xs text-gray-400">Training Data</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-white">{model.lastUpdated}</div>
                    <div className="text-xs text-gray-400">Last Updated</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Features</div>
                <div className="flex flex-wrap gap-2">
                  {model.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-xs text-gray-300 rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Click indicator */}
              <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors">
                  Click to test model →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedModel.name}</h2>
                  <p className="text-sm text-gray-400">Test Model Prediction</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Model Info */}
              <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Accuracy:</span>
                    <span className={`ml-2 font-medium ${getAccuracyColor(selectedModel.accuracy)}`}>
                      {selectedModel.accuracy}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Training Data:</span>
                    <span className="ml-2 text-white">{selectedModel.trainingDataSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Model Type:</span>
                    <span className="ml-2 text-white">{selectedModel.modelType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="ml-2 text-white">{selectedModel.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Input Text for Classification</label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Enter text to analyze ${
                      selectedModel.name === "RAW Transformers Model"
                        ? "for intent classification"
                        : selectedModel.name === "Zero Shot Classification"
                          ? "for zero-shot categorization"
                          : "for NLP analysis"
                    }...`}
                    className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Get Prediction</span>
                    </>
                  )}
                </button>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Prediction Result */}
              {prediction && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Classification Result</h3>

                  <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Result:</span>
                      <span className="text-white font-medium">{prediction.result}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence.toFixed(1)}%
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-700">
                      <span className="text-gray-400 text-sm">Details:</span>
                      <p className="text-gray-300 text-sm mt-1">{prediction.details}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIModels