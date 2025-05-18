import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const data = [
  { time: "09:00", price: 20 },
  { time: "09:30", price: 24 },
  { time: "10:00", price: 22 },
  { time: "10:30", price: 25 },
  { time: "11:00", price: 23 },
  { time: "11:30", price: 28 },
  { time: "12:00", price: 27 },
  { time: "12:30", price: 29 },
  { time: "13:00", price: 26 },
  { time: "13:30", price: 24 },
  { time: "14:00", price: 22 },
  { time: "14:30", price: 23 },
  { time: "15:00", price: 25 },
  { time: "15:30", price: 26 },
  { time: "16:00", price: 28 }
];

export default function Chart() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#232b36",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <div
        style={{
          background: "#181d23",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
          width: "700px",
          color: "#fff",
          border: "1px solid #232b36",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.27)"
        }}
      >
        <h2 style={{ color: "#00c6ff", textAlign: "center", marginBottom: "1.2em" }}>
          FinSight Price Chart
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid stroke="#2c3e50" strokeDasharray="4 4" />
            <XAxis dataKey="time" stroke="#b3e0fc" />
            <YAxis stroke="#b3e0fc" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ background: "#232b36", border: "none", color: "#fff" }}
              labelStyle={{ color: "#b3e0fc" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00c6ff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#00c6ff", stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
