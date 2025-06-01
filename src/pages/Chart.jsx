import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
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

// Mock data for different stocks (just for demo)
const stocks = {
  AAPL: [
    { time: "09:00", price: 124 },
    { time: "09:30", price: 126 },
    { time: "10:00", price: 121 },
    { time: "10:30", price: 122 },
    { time: "11:00", price: 122 },
    { time: "11:30", price: 130 },
    { time: "12:00", price: 117 },
    { time: "12:30", price: 109 },
    { time: "13:00", price: 126 },
    { time: "13:30", price: 100 },
    { time: "14:00", price: 130 },
    { time: "14:30", price: 123 },
    { time: "15:00", price: 150 },
    { time: "15:30", price: 126 },
    { time: "16:00", price: 130 }
  ],
  MSFT: [
  { time: "09:00", price: 219 },
  { time: "09:30", price: 225 },
  { time: "10:00", price: 217 },
  { time: "10:30", price: 230 },
  { time: "11:00", price: 221 },
  { time: "11:30", price: 233 },
  { time: "12:00", price: 216 },
  { time: "12:30", price: 229 },
  { time: "13:00", price: 222 },
  { time: "13:30", price: 218 },
  { time: "14:00", price: 234 },
  { time: "14:30", price: 215 },
  { time: "15:00", price: 227 },
  { time: "15:30", price: 231 },
  { time: "16:00", price: 220 }
],
  AMZN: [
    { time: "09:00", price: 320 },
    { time: "09:30", price: 324 },
    { time: "10:00", price: 322 },
    { time: "10:30", price: 325 },
    { time: "11:00", price: 323 },
    { time: "11:30", price: 328 },
    { time: "12:00", price: 327 },
    { time: "12:30", price: 329 },
    { time: "13:00", price: 326 },
    { time: "13:30", price: 324 },
    { time: "14:00", price: 322 },
    { time: "14:30", price: 323 },
    { time: "15:00", price: 325 },
    { time: "15:30", price: 326 },
    { time: "16:00", price: 328 }
  ]
};

const stockOptions = [
  { label: "Apple (AAPL)", value: "AAPL" },
  { label: "Microsoft (MSFT)", value: "MSFT" },
  { label: "Amazon (AMZN)", value: "AMZN" }
];

// Styles
const bgGradient = {
  minHeight: "100vh",
  minWidth: "100vw",
  background: "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #00c6ff 100%)",
  display: "flex",
  fontFamily: "'Montserrat', sans-serif",
};

const sidebarStyle = {
  width: "220px",
  background: "rgba(44,83,100,0.95)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2.5rem",
  boxShadow: "2px 0 16px rgba(0,198,255,0.07)",
  zIndex: 2,
};

const sidebarTitle = {
  fontWeight: 900,
  fontSize: "1.6rem",
  marginBottom: "2.5rem",
  color: "#00c6ff",
  letterSpacing: "0.05em",
};

const mainContent = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const glassCard = {
  background: "rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8px)",
  borderRadius: "24px",
  padding: "2.5rem 2rem",
  width: "700px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  animation: "fadeIn 1s ease",
};

const tabBarStyle = {
  display: "flex",
  gap: "1.5rem",
  marginBottom: "1.8rem",
  justifyContent: "center",
};

const tabStyle = (active) => ({
  padding: "0.7rem 2.5rem",
  borderRadius: "12px 12px 0 0",
  background: active
    ? "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)"
    : "rgba(255,255,255,0.07)",
  color: active ? "#fff" : "#b3e0fc",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer",
  border: "none",
  outline: "none",
  transition: "background 0.2s, color 0.2s",
  boxShadow: active ? "0 4px 14px rgba(0,198,255,0.18)" : "none",
});

const selectStyle = {
  padding: "0.5em 1.2em",
  borderRadius: "8px",
  border: "1px solid #00c6ff",
  background: "#232b36",
  color: "#b3e0fc",
  fontSize: "1.1em",
  marginBottom: "1.5em",
  width: "250px"
};

export default function ChartPage() {
  const [activeTab, setActiveTab] = useState("charts");
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].value);

  return (
    <div style={bgGradient}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={sidebarTitle}>FinSight</div>
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            "sidebar-menu-item" + (isActive ? " active" : "")
          }
        >
          Introduction
        </NavLink>
        <NavLink
          to="/chart"
          className={({ isActive }) =>
            "sidebar-menu-item" + (isActive ? " active" : "")
          }
        >
          Chart
        </NavLink>
      </div>
      {/* Main Content */}
      <div style={mainContent}>
        <div style={glassCard}>
          {/* Top Tab Bar */}
          <div style={tabBarStyle}>
            <button
              style={tabStyle(activeTab === "charts")}
              onClick={() => setActiveTab("charts")}
            >
              Charts
            </button>
            <button
              style={tabStyle(activeTab === "analytics")}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </div>
          {/* Tab Content */}
          {activeTab === "charts" && (
            <>
              <h2 style={{ color: "#00c6ff", textAlign: "center", marginBottom: "1.2em" }}>
                FinSight Price Chart
              </h2>
              {/* Stock selection dropdown */}
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                style={selectStyle}
              >
                {stockOptions.map((stock) => (
                  <option key={stock.value} value={stock.value}>
                    {stock.label}
                  </option>
                ))}
              </select>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={stocks[selectedStock]}>
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
            </>
          )}
         {activeTab === "analytics" && (
  <div style={{ color: "#b3e0fc", textAlign: "center", marginTop: "2em" }}>
    <h2>Analytics</h2>
    <p>Here are some key metrics and recent activity.</p>
    <div style={{ width: "100%", marginTop: "1em", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(0,198,255,0.05)", borderRadius: "8px" }}>
        <thead>
          <tr style={{ background: "rgba(0,198,255,0.15)" }}>
            <th style={{ padding: "0.75em 1em", textAlign: "left", borderBottom: "1px solid #00c6ff" }}>Date</th>
            <th style={{ padding: "0.75em 1em", textAlign: "left", borderBottom: "1px solid #00c6ff" }}>Stock</th>
            <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Price</th>
            <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Change</th>
            <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>AAPL</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>189.98</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#4caf50" }}>+2.35%</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>45,120,000</td>
          </tr>
          <tr>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>MSFT</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>415.28</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#4caf50" }}>+1.47%</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>32,450,000</td>
          </tr>
          <tr>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>AMZN</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>178.75</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#f44336" }}>-0.89%</td>
            <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>28,760,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  )
  ;
}
