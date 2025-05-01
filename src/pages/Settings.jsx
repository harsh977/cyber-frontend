import { Bell, Moon, Sun, User, Shield, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Switch } from "../components/ui/switch"

function Settings() {
  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="mr-2 h-5 w-5 text-cyan-400" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Email Address</p>
                    <p className="text-xs text-gray-400">admin@example.com</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Password</p>
                    <p className="text-xs text-gray-400">Last changed 30 days ago</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Update
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400">Enhanced account security</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Bell className="mr-2 h-5 w-5 text-purple-400" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Configure how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Security Alerts</p>
                    <p className="text-xs text-gray-400">Critical security notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">System Updates</p>
                    <p className="text-xs text-gray-400">Platform update notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Report Summaries</p>
                    <p className="text-xs text-gray-400">Weekly security report emails</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="mr-2 h-5 w-5 text-blue-400" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Manage security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Session Timeout</p>
                    <p className="text-xs text-gray-400">Automatically log out after inactivity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      15m
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      30m
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      1h
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Login History</p>
                    <p className="text-xs text-gray-400">View recent account access</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    View Logs
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Mask Sensitive Data</p>
                    <p className="text-xs text-gray-400">Hide confidential information</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <Switch />
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Sun className="mr-2 h-5 w-5 text-yellow-400" />
                Appearance
              </CardTitle>
              <CardDescription className="text-gray-400">Customize your interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Theme</p>
                    <p className="text-xs text-gray-400">Choose light or dark mode</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-gray-400" />
                    <Switch defaultChecked />
                    <Moon className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Accent Color</p>
                    <p className="text-xs text-gray-400">Select your preferred highlight color</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-cyan-500 cursor-pointer ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-900"></div>
                    <div className="h-5 w-5 rounded-full bg-purple-500 cursor-pointer"></div>
                    <div className="h-5 w-5 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="h-5 w-5 rounded-full bg-red-500 cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings

