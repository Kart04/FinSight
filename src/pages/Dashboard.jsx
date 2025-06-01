import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import "../App.css"; 
//import "./App.css";


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
  width: "420px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  animation: "fadeIn 1s ease",
};

const headingStyle = {
  fontWeight: 900,
  fontSize: "2.1rem",
  letterSpacing: "0.05em",
  marginBottom: "0.5em",
  color: "#00c6ff",
  textShadow: "0 2px 16px rgba(0,198,255,0.15)",
};

const introStyle = {
  fontSize: "1.13rem",
  color: "#e3f7ff",
  marginBottom: "1.5em",
  textAlign: "center",
  lineHeight: 1.6,
};

const emailStyle = {
  color: "#fff",
  fontWeight: "bold",
  marginBottom: "2em",
};

const buttonStyle = {
  padding: "0.7rem 2.5rem",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(0,198,255,0.25)",
  transition: "transform 0.1s",
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          Charts
        </NavLink>
        
        {/* Add more NavLinks for other menu items as needed */}
      </div>
            
      {/* Main Content */}
      <div style={mainContent}>
        <div style={glassCard}>
          <h1 style={headingStyle}>Welcome to FinSight</h1>
          <div style={emailStyle}>Logged in as: {user?.email}</div>
          <div style={introStyle}>
            FinSight is an award-winning financial technology platform delivering unparalleled visibility and actionable insights into capital markets and corporate finance. 
            <br /><br />
            Trusted by thousands worldwide, FinSight empowers you with real-time data, advanced analytics, and intuitive tools to make smarter decisions. Experience the future of finance-today.
          </div>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
