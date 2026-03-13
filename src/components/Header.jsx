import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user") || localStorage.getItem("popqz_user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("popqz_user");
    localStorage.removeItem("token"); 
    navigate("/signup");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        padding: "10px 20px",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 24 }}>
        <Link to="/" style={{ textDecoration: "none", color: "var(--primary)" }}>
          popQZ
        </Link>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {!user ? (
          <>
            <Link to="/login" className="small-btn">
              Login
            </Link>
            <Link to="/signup" className="small-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="small-btn"
            style={{
              backgroundColor: "#6f5af8",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
