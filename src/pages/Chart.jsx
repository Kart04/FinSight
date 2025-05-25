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

// Chart data
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

// Styles (copied from Dashboard for consistency)
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

// Top tab bar styles
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

export default function ChartPage() {
  const [activeTab, setActiveTab] = useState("charts");

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
        {/* Add more NavLinks for other menu items as needed */}
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
            </>
          )}
          {activeTab === "analytics" && (
            <div style={{ color: "#b3e0fc", textAlign: "center", marginTop: "2em" }}>
              <h2>Analytics Coming Soon</h2>
              <p>Here you can add tables, KPIs, or other analytics widgets.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
