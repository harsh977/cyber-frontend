import { useEffect, useState } from "react";
import { Key, Lock, UserCheck, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axios from "axios";

function AccessControl() {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user token found. Please log in.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role.toLowerCase() !== "admin") {
      setError("You are not authorized (admin only).");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Checking admin status for user:", user.email);

        const checkAdmin = await axios.get(
          "http://127.0.0.1:8000/auth/access-control",
          { headers: { user_email: user.email } }
        );
        console.log("Admin status response:", checkAdmin.data);

        if (!checkAdmin.data.is_admin) {
          setError("You are not authorized (admin only).");
          return;
        }

        const statsRes = await axios.get(
          "http://127.0.0.1:8000/auth/access-stats",
          { headers: { user_email: user.email } }
        );
        console.log("Access stats response:", statsRes.data);
        setStats(statsRes.data);

        const eventsRes = await axios.get(
          "http://127.0.0.1:8000/auth/recent-access-events",
          { headers: { user_email: user.email } }
        );
        console.log("Recent events response:", eventsRes.data);
        setEvents(eventsRes.data.events);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching data or unauthorized.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl font-bold">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Access Control</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {stats?.active_users ?? "--"}
              </div>
              <p className="text-sm text-gray-400">Currently authenticated</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-400 flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Access Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {stats?.access_attempts_24h ?? "--"}
              </div>
              <p className="text-sm text-gray-400">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                MFA Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {stats?.mfa_compliance ?? "--"}%
              </div>
              <p className="text-sm text-gray-400">User compliance</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Failed Logins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {stats?.failed_logins ?? "--"}
              </div>
              <p className="text-sm text-gray-400">Requires investigation</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 shadow-lg overflow-hidden mb-8">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white">Recent Access Events</CardTitle>
            <CardDescription className="text-gray-400">
              Last 10 authentication attempts
            </CardDescription>
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
                      IP Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <td className="px-4 py-3 text-sm text-white">
                        {event.user}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {event.ip_address}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {new Date(event.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            event.status === "success"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {event.status}
                        </span>
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
  );
}

export default AccessControl;
