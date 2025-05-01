import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = ["#FF0055", "#FF3300", "#FFAA00", "#00AAFF", "#00FF99", "#AA00FF", "#FF00AA"]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ color: "#FFFFFF", fontWeight: "bold" }}>{`${payload[0].name}`}</p>
        <p style={{ color: payload[0].color }}>{`Count: ${payload[0].value}`}</p>
        <p style={{ color: "#AAAAAA" }}>
          {`Percentage: ${((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%`}
        </p>
      </div>
    )
  }
  return null
}

const SeverityPieChart = ({ data, total }) => {
  // Add total to each data item for percentage calculation
  const dataWithTotal = data.map((item) => ({ ...item, total }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default SeverityPieChart

