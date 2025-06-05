import { useEffect, useState } from "react"
import {
  User, UserPlus, UserX, UserCheck, Search,
} from "lucide-react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No token found")
        }

        const response = await fetch("http://127.0.0.1:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || "Failed to fetch users")
        }

        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">User Management</h1>

          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  All Users
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <UserCheck className="mr-2 h-4 w-4 text-green-400" />
                  Active
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <UserX className="mr-2 h-4 w-4 text-red-400" />
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">User Accounts</CardTitle>
            <CardDescription className="text-gray-400">Manage system users and permissions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <p className="text-gray-400 p-4">Loading users...</p>
            ) : error ? (
              <p className="text-red-500 p-4">Error: {error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Dashboard
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx} className="border-b border-gray-800 last:border-0">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-cyan-400">
                              <User className="h-5 w-5" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">{`${user.first_name} ${user.last_name}`}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">{user.role}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.tfa_enabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {user.tfa_enabled ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-400">{user.dashboard_view || "N/A"}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-gray-700 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                            >
                              Disable
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserManagement
