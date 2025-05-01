import { Link, useLocation } from "react-router-dom"
import { BarChart2, Database, FileText, Home, Lock, Network, Settings, Shield, Users } from "lucide-react"

import { cn } from "../../utils/cn"

function Sidebar() {
  const location = useLocation()

  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      isActive: location.pathname === "/",
    },
    {
      title: "Threat Analysis",
      icon: Shield,
      href: "/threat-analysis",
      isActive: location.pathname === "/threat-analysis",
    },
    {
      title: "Network Security",
      icon: Network,
      href: "/network-security",
      isActive: location.pathname === "/network-security",
    },
    {
      title: "Data Protection",
      icon: Database,
      href: "/data-protection",
      isActive: location.pathname === "/data-protection",
    },
    {
      title: "Access Control",
      icon: Lock,
      href: "/access-control",
      isActive: location.pathname === "/access-control",
    },
    {
      title: "User Management",
      icon: Users,
      href: "/user-management",
      isActive: location.pathname === "/user-management",
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/reports",
      isActive: location.pathname === "/reports",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      href: "/analytics",
      isActive: location.pathname === "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      isActive: location.pathname === "/settings",
    },
  ]

  return (
    <aside className="group/sidebar flex h-full w-64 flex-col border-r border-gray-800 bg-gray-950 transition-all">
      <div className="flex flex-1 flex-col gap-2 overflow-auto p-4">
        <div className="mb-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Navigation
        </div>
        <nav className="grid gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                item.isActive
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white",
              )}
            >
              <item.icon
                className={cn("h-5 w-5", item.isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-white")}
              />
              <span>{item.title}</span>
              {item.isActive && (
                <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-blue-500" />
              )}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-blue-500/0 opacity-0 transition-opacity",
                  item.isActive ? "opacity-100" : "group-hover:opacity-70",
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-800 p-4">
        <div className="rounded-lg bg-gray-900 p-4">
          <h3 className="mb-2 text-sm font-medium text-cyan-400">Security Status</h3>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">System Protection</span>
            <span className="text-xs font-medium text-green-400">Active</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

