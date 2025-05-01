import Papa from "papaparse"

/**
 * Fetches and parses CSV data from a URL
 * @param {string} url - URL of the CSV file
 * @returns {Promise<Array>} - Parsed data as an array of objects
 */
export const fetchCSVData = async (url) => {
  try {
    const response = await fetch(url)
    const csvText = await response.text()

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    throw error
  }
}

/**
 * Processes raw data for visualization
 * @param {Array} rawData - Raw data from CSV
 * @returns {Object} - Processed data for different chart types
 */
export const processDataForVisualization = (rawData) => {
  // Filter out any empty rows
  const filteredData = rawData.filter((item) => item["IP Address"] && item.Severity && item["Plugin Name"])

  // Process data for charts
  const severityCounts = {}
  const riskFactorCounts = {}
  const ipCounts = {}
  const protocolCounts = {}
  const cveData = []
  const timelineData = []

  filteredData.forEach((item) => {
    // Severity distribution
    const severity = item.Severity || "Unknown"
    severityCounts[severity] = (severityCounts[severity] || 0) + 1

    // Risk factor distribution
    const riskFactor = item["Risk Factor"] || "Unknown"
    riskFactorCounts[riskFactor] = (riskFactorCounts[riskFactor] || 0) + 1

    // IP address distribution
    const ip = item["IP Address"]
    ipCounts[ip] = (ipCounts[ip] || 0) + 1

    // Protocol distribution
    const protocol = item.Protocol || "Unknown"
    protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1

    // CVE data
    if (item.CVE) {
      const cves = item.CVE.split(",")
      cves.forEach((cve) => {
        if (cve.trim()) {
          cveData.push({
            cve: cve.trim(),
            severity: severity,
            ip: ip,
            cvssScore: Number.parseFloat(item["CVSS V3 Base Score"] || item["CVSS V2 Base Score"] || "0"),
          })
        }
      })
    }

    // Timeline data
    if (item["Plugin Publication Date"]) {
      const date = new Date(item["Plugin Publication Date"])
      if (!isNaN(date.getTime())) {
        timelineData.push({
          date: date,
          severity: severity,
          plugin: item["Plugin Name"],
        })
      }
    }
  })

  // Convert to array format for charts
  const severityData = Object.entries(severityCounts).map(([name, value]) => ({ name, value }))
  const riskFactorData = Object.entries(riskFactorCounts).map(([name, value]) => ({ name, value }))
  const ipDistributionData = Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 IPs

  const protocolData = Object.entries(protocolCounts).map(([name, value]) => ({ name, value }))

  // Group CVEs by count
  const cveCounts = {}
  cveData.forEach((item) => {
    cveCounts[item.cve] = (cveCounts[item.cve] || 0) + 1
  })

  const cveCountData = Object.entries(cveCounts)
    .map(([cve, count]) => ({ cve, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 CVEs

  // Sort timeline data
  timelineData.sort((a, b) => a.date - b.date)

  return {
    severity: severityData,
    riskFactor: riskFactorData,
    timeline: timelineData,
    ipDistribution: ipDistributionData,
    cveCount: cveCountData,
    protocolDistribution: protocolData,
    rawData: filteredData,
  }
}

/**
 * Analyzes data to extract key metrics
 * @param {Array} data - Processed data
 * @returns {Object} - Key metrics
 */
export const extractKeyMetrics = (data) => {
  const totalIssues = data.length
  const criticalIssues = data.filter((item) => item.Severity === "Critical").length
  const highIssues = data.filter((item) => item.Severity === "High").length
  const uniqueIPs = new Set(data.map((item) => item["IP Address"])).size
  const uniqueProtocols = new Set(data.map((item) => item.Protocol)).size

  // Extract all CVEs
  const allCVEs = []
  data.forEach((item) => {
    if (item.CVE) {
      const cves = item.CVE.split(",")
      cves.forEach((cve) => {
        if (cve.trim()) {
          allCVEs.push(cve.trim())
        }
      })
    }
  })

  const uniqueCVEs = new Set(allCVEs).size

  return {
    totalIssues,
    criticalIssues,
    highIssues,
    uniqueIPs,
    uniqueProtocols,
    uniqueCVEs,
  }
}

