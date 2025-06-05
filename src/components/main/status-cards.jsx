import React, { useEffect, useState } from "react";
import { AlertCircle, Network, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function StatusCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/severity-counts")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => {
        console.error("Error fetching severity counts:", err);
      });
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-cyan-400">Security Status</CardTitle>
          <CardDescription className="text-gray-400">
            Current system security overview
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Records</p>
                <p className="font-medium text-white">
                  {data ? data.total_records : "Loading..."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">✓</p>
              <p className="text-xs text-gray-400">Synced with DB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-blue-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-blue-400">Severity Summary</CardTitle>
          <CardDescription className="text-gray-400">
            High & Medium threats overview
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Network className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">High</p>
                <p className="font-medium text-white">
                  {data ? data.severity_counts?.High || 0 : "Loading..."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">
                {data ? data.severity_counts?.Medium || 0 : "–"}
              </p>
              <p className="text-xs text-gray-400">Medium</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-red-500/5">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-red-400">Low & Info</CardTitle>
          <CardDescription className="text-gray-400">
            Less severe alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Low</p>
                <p className="font-medium text-white">
                  {data ? data.severity_counts?.Low || 0 : "Loading..."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-400">
                {data ? data.severity_counts?.Info || 0 : "–"}
              </p>
              <p className="text-xs text-gray-400">Info</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatusCards;
