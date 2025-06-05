import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";

function SecurityCharts() {
  const [securityIncidents, setSecurityIncidents] = useState([]);
  const [vulnerabilitiesByIp, setVulnerabilitiesByIp] = useState([]);

  // Fetch high severity incidents data
  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/high-severity-yearwise-summary");
        const data = await response.json();
        
        const transformedData = Object.keys(data).map((year) => ({
          month: year,
          incidents: data[year].total_high_incidents,
          resolved: data[year].resolved_by_year_end,
        }));

        setSecurityIncidents(transformedData);
      } catch (error) {
        console.error("Error fetching incident data: ", error);
      }
    };

    fetchIncidentData();
  }, []);

  // Fetch vulnerabilities by IP data
  useEffect(() => {
    const fetchVulnerabilityData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/vulnerabilities-by-ip");
        const data = await response.json();
        
        const transformedData = data.vulnerabilities_by_ip.map(item => ({
          type: item.ip,
          count: item.total_vulnerabilities
        }));

        setVulnerabilitiesByIp(transformedData);
      } catch (error) {
        console.error("Error fetching vulnerability data: ", error);
      }
    };

    fetchVulnerabilityData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Existing LineChart remains unchanged */}
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-cyan-500/5">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-cyan-400">Security Incidents Over Time</CardTitle>
          <CardDescription className="text-gray-400">Yearly breakdown of high-severity incidents</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="aspect-[4/3]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={securityIncidents}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#00FFFF" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#00FF00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg shadow-purple-500/5">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-purple-400">Vulnerabilities by IP</CardTitle>
          <CardDescription className="text-gray-400">Distribution across network hosts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="aspect-[4/3]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vulnerabilitiesByIp}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="type" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="#BF00FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SecurityCharts;
