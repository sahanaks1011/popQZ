import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ReviewAnswers() {
  const loc = useLocation();
  const { detail } = loc.state || {};

  if (!detail || detail.length === 0) {
    return (
      <div className="card center" style={{ marginTop: "40px" }}>
        <h2>Review Answers</h2>
        <p style={{ color: "#9ca3af", marginTop: "10px" }}>
          No answers to review yet.
        </p>
        <Link to="/dashboard" className="small-btn primary" style={{ marginTop: "20px" }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="card center">
        <h2>Review Answers</h2>
      </div>
      <div style={{ marginTop: "16px", padding: "0 10px" }}>
        {detail.map((q, i) => (
          <div key={i} className="card" style={{ textAlign: "left" }}>
            <h4 style={{ color: "#4b5563" }}>Q{i + 1}: {q.text}</h4>
            <p>
              Your answer:{" "}
              <strong style={{ color: q.correct ? "#22c55e" : "#ef4444" }}>
                {q.userAns !== null ? q.userAns : "Not answered"}
              </strong>
            </p>
            <p>
              Correct answer:{" "}
              <strong style={{ color: "#22c55e" }}>{q.correctAns}</strong>
            </p>
          </div>
        ))}
      </div>
      <div className="center" style={{ marginTop: "20px" }}>
        <Link to="/dashboard" className="small-btn secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
