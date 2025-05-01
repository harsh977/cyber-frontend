"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./navbar/navbar"
import Sidebar from "./sidebar"
import { read, utils } from "xlsx"

const Layout = () => {
  const [data, setData] = useState([])
  const [fileName, setFileName] = useState(null)

  const handleFileUpload = async (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result)
        const workbook = read(data, { type: "array" })
        const firstSheet = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheet]
        const jsonData = utils.sheet_to_json(worksheet)
        setData(jsonData)
        setFileName(file.name)
      } catch (error) {
        console.error("Error parsing Excel file:", error)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Outlet context={{ data, fileName, handleFileUpload }} />
        </main>
      </div>
    </div>
  )
}

export default Layout

