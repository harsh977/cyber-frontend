import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ color: "#FFFFFF", fontWeight: "bold" }}>{`${payload[0].payload.cve}`}</p>
        <p style={{ color: "#00AAFF" }}>{`CVSS Score: ${payload[0].payload.cvssScore.toFixed(1)}`}</p>
        <p style={{ color: "#FF00AA" }}>{`Occurrences: ${payload[0].payload.count}`}</p>
      </div>
    )
  }
  return null
}

const CVEScatterChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis type="category" dataKey="cve" name="CVE" stroke="#888" tick={false} />
        <YAxis type="number" dataKey="cvssScore" name="CVSS Score" stroke="#888" domain={[0, 10]} />
        <ZAxis type="number" dataKey="count" range={[50, 500]} name="Occurrences" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Scatter name="CVEs" data={data} fill="#FF00AA" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default CVEScatterChart

