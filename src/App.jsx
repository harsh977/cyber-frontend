import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import ThreatAnalysis from "./pages/ThreatAnalysis"
import NetworkSecurity from "./pages/NetworkSecurity"
import DataProtection from "./pages/DataProtection"
import AccessControl from "./pages/AccessControl"
import AIModels from "./pages/AIModels"
import Reports from "./pages/Reports"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import HardwareIssueVisualizer from "./components/HardwareIssueVisualizer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserDashboard from "./pages/UserDashboard"
import MessageSent from "./pages/MessageSent"
import Results from "./pages/Results"
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => {}} />} />
      <Route path="/register" element={<Register onRegister={() => {}} />} />
      <Route path="/message-sent" element={<MessageSent />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/hardware-visualizer" element={<HardwareIssueVisualizer />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="threat-analysis" element={<ThreatAnalysis />} />
        <Route path="network-security" element={<NetworkSecurity />} />
        <Route path="data-protection" element={<DataProtection />} />
        <Route path="access-control" element={<AccessControl />} />
        <Route path="ai-models" element={<AIModels />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  )
}

export default App

