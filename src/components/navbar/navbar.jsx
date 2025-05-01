"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Lock, Menu, Search, User } from "lucide-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Sidebar from "../sidebar"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-gray-800 bg-gray-900 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">CyberViz</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              to="/"
              className="relative text-sm font-medium text-gray-300 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:text-white hover:after:w-full"
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className="relative text-sm font-medium text-gray-300 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:text-white hover:after:w-full"
            >
              Analytics
            </Link>
            <Link
              to="/reports"
              className="relative text-sm font-medium text-gray-300 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:text-white hover:after:w-full"
            >
              Reports
            </Link>
            <Link
              to="/settings"
              className="relative text-sm font-medium text-gray-300 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:text-white hover:after:w-full"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 w-[200px] rounded-md border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-400 focus-visible:ring-cyan-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9 text-gray-400 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-400 hover:text-white"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-400 hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

