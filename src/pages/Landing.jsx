import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="card" style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to popQZ 🎯</h1>
      <p>Take fun, timed quizzes and see how you rank among others!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/signup" className="small-btn">Get Started</Link>{" "}
        <Link to="/dashboard" className="small-btn">Browse Quizzes</Link>
      </div>
    </div>
  );
}
