import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const COLORS = ["#FF0055", "#FF3300", "#FFAA00", "#00AAFF", "#00FF99", "#AA00FF", "#FF00AA"]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ color: "#FFFFFF", fontWeight: "bold" }}>{`${label}`}</p>
        <p style={{ color: payload[0].color }}>{`Issues: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const IPBarChart = ({ data, vertical = false }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: vertical ? 5 : 60 }}
        layout={vertical ? "vertical" : "horizontal"}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        {vertical ? (
          <>
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="ip" type="category" stroke="#888" width={150} />
          </>
        ) : (
          <>
            <XAxis dataKey="ip" stroke="#888" angle={-45} textAnchor="end" height={60} />
            <YAxis stroke="#888" />
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Issues" fill="#00AAFF">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IPBarChart

