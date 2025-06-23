import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const bgGradient = {
  minHeight: "100vh",
  minWidth: "100vw",
  width: "100vw",
  height: "100vh",
  boxSizing: "border-box",
  background: "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #00c6ff 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Montserrat', sans-serif",
};

const glassCard = {
  background: "rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8px)",
  borderRadius: "20px",
  padding: "2.5rem 2rem",
  width: "350px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  animation: "fadeIn 1s ease",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  margin: "0.7rem 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  background: "rgba(255,255,255,0.25)",
  color: "#222",
};

const buttonStyle = {
  width: "100%",
  padding: "0.9rem",
  margin: "1rem 0 0.5rem 0",
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

const linkStyle = {
  color: "#00c6ff",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.95rem",
  marginTop: "0.5rem",
};

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setError("");
      await registerUser(email, password, firstName, lastName);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={bgGradient}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::placeholder { color: #b3e0fc; opacity: 1; }
        button:hover { transform: scale(1.02); }
        button:active { transform: scale(0.98); }
      `}</style>
      <form style={glassCard} onSubmit={handleSignup}>
        <h1 style={{ marginBottom: "0.2em", fontWeight: 800, letterSpacing: "0.03em" }}>
          FinSight
        </h1>
        <p style={{ marginBottom: "1.5em", fontSize: "1.1em", color: "#b3e0fc" }}>
          Create your account to get started.
        </p>
        
        <input
          style={inputStyle}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        
        <input
          style={inputStyle}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        {error && <div style={{ color: "#ff8c8c", marginBottom: "0.6em" }}>{error}</div>}
        
        <button style={buttonStyle} type="submit">
          Sign Up
        </button>
        
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <span style={linkStyle} onClick={() => navigate("/login")}>
            Already have an account? Log in
          </span>
        </div>
      </form>
    </div>
  );
}
