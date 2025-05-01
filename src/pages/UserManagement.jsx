import { User, UserPlus, UserX, UserCheck, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

function UserManagement() {
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Administrator",
      status: "Active",
      lastActive: "10 minutes ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Security Analyst",
      status: "Active",
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@example.com",
      role: "IT Support",
      status: "Active",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "e.davis@example.com",
      role: "Security Analyst",
      status: "Inactive",
      lastActive: "5 days ago",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      role: "IT Manager",
      status: "Active",
      lastActive: "3 hours ago",
    },
  ]

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
                      Last Active
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800 last:border-0">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-cyan-400">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">{user.role}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400">{user.lastActive}</td>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserManagement

