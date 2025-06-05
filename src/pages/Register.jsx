import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, User, Building } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import axios from "axios"

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "Viewer",
    lab: "Lab1",
    business_unit: "Server",
    dashboard_view: "Summary",
    notification_preferences: ["Email"],
    tfa_enabled: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const roles = ["Admin", "Manager", "Researcher", "Viewer"]
  const labs = ["Lab1", "Lab2", "Lab3"]
  const businessUnits = [
    "Server", 
    "Hybrid Cloud", 
    "Intelligent Edge", 
    "Financial Services", 
    "Corporate Investments & Other", 
    "Compute, High Performance Computing & AI", 
    "Software", 
    "Storage"
  ]
  const notificationPreferences = ["Email", "SMS", "App"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (preference) => {
    setFormData((prev) => {
      const currentPreferences = [...prev.notification_preferences]
      if (currentPreferences.includes(preference)) {
        return {
          ...prev,
          notification_preferences: currentPreferences.filter(p => p !== preference)
        }
      } else {
        return {
          ...prev,
          notification_preferences: [...currentPreferences, preference]
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await axios.post("http://127.0.0.1:8000/auth/signup", formData)
      alert("Registration successful! Please login.")
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gray-950">
      <div className="w-full max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 blur-3xl pointer-events-none"></div>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Create an Account</CardTitle>
            <CardDescription className="text-gray-400">Enter your information to register</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium text-gray-400">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      id="first_name"
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="last_name" className="text-sm font-medium text-gray-400">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      id="last_name"
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-400">Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 rounded-md py-2"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lab" className="text-sm font-medium text-gray-400">Lab</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {/* Use a suitable icon if available */}
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v2a2 2 0 002 2h2v2a2 2 0 002 2h2v2a2 2 0 002 2h2v2a2 2 0 002 2h2v2a2 2 0 002 2v2"></path></svg>
                    </div>
                    <select
                      id="lab"
                      name="lab"
                      value={formData.lab}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 rounded-md py-2"
                    >
                      {labs.map(lab => (
                        <option key={lab} value={lab}>{lab}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="business_unit" className="text-sm font-medium text-gray-400">Business Unit</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-5 w-5 text-gray-500" />
                  </div>
                  <select
                    id="business_unit"
                    name="business_unit"
                    value={formData.business_unit}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 rounded-md py-2"
                  >
                    {businessUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Notification Preferences</label>
                <div className="flex flex-wrap gap-4">
                  {notificationPreferences.map(preference => (
                    <div key={preference} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`notification-${preference}`}
                        checked={formData.notification_preferences.includes(preference)}
                        onChange={() => handleNotificationChange(preference)}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <label htmlFor={`notification-${preference}`} className="text-sm text-gray-400">
                        {preference}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="tfa_enabled"
                  checked={formData.tfa_enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, tfa_enabled: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="tfa_enabled" className="text-sm text-gray-400">
                  Enable Two-Factor Authentication
                </label>
              </div>
              <div className="flex items-center space-x-2">
                
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in
              </Link>
            </p>
          </CardFooter>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 blur-[1px] animate-scanline"></div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register
