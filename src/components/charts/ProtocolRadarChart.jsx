import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ color: "#FFFFFF", fontWeight: "bold" }}>{`${payload[0].payload.name}`}</p>
        <p style={{ color: "#FF00AA" }}>{`Count: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const ProtocolRadarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={150} data={data}>
        <PolarGrid stroke="#444" />
        <PolarAngleAxis dataKey="name" stroke="#888" />
        <PolarRadiusAxis stroke="#888" />
        <Radar name="Protocols" dataKey="value" stroke="#FF00AA" fill="#FF00AA" fillOpacity={0.6} />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default ProtocolRadarChart

