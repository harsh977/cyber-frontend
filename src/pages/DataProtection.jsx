import { Database, Lock, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

function DataProtection() {
  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Data Protection</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-400">
                <Database className="mr-2 h-5 w-5" />
                Data Encryption
              </CardTitle>
              <CardDescription className="text-gray-400">Protect sensitive information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                All sensitive data is encrypted using industry-standard AES-256 encryption. Data is encrypted both at
                rest and in transit.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Lock className="mr-2 h-5 w-5" />
                Access Controls
              </CardTitle>
              <CardDescription className="text-gray-400">Manage data access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Implement role-based access controls to ensure only authorized personnel can access sensitive data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Shield className="mr-2 h-5 w-5" />
                Data Loss Prevention
              </CardTitle>
              <CardDescription className="text-gray-400">Prevent unauthorized data exfiltration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Monitor and control endpoint activities to prevent data leakage through email, web, or removable media.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-white">Data Protection Policies</CardTitle>
            <CardDescription className="text-gray-400">Organization-wide data handling guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-800 p-4">
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Data Classification</h3>
                <p className="text-sm text-gray-400 mb-3">
                  All data must be classified according to sensitivity levels:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                  <li>Public - Information that can be freely shared</li>
                  <li>Internal - Information for internal use only</li>
                  <li>Confidential - Sensitive information with restricted access</li>
                  <li>Restricted - Highly sensitive information with strictly controlled access</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-800 p-4">
                <h3 className="text-lg font-medium text-purple-400 mb-2">Data Retention</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Data retention policies define how long data should be kept:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                  <li>Customer data: 7 years after last interaction</li>
                  <li>Financial records: 10 years</li>
                  <li>Employee records: Duration of employment + 5 years</li>
                  <li>Security logs: 1 year</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DataProtection

