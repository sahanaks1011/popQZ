import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Results() {
  const loc = useLocation();
  const payload = loc.state || {};
  const result = payload.result ?? payload;
  const detail = payload.detail ?? payload.detail ?? [];
  const timeSpentSec = payload.timeSpentSec ?? payload.timeSpentSec ?? 0;

  if (!result || (result.score === undefined && result.percent === undefined)) {
    return <div className="card">No results to display.</div>;
  }

  const score = result.score ?? 0;
  const percent = Math.round(result.percent ?? 0);
  const total = result.total ?? (detail.length ? detail.length * 10 : 0);
  const rank = result.rank ?? "-";

  const minutes = Math.floor((timeSpentSec ?? 0) / 60);
  const seconds = String((timeSpentSec ?? 0) % 60).padStart(2, "0");

  const badge = percent >= 90 ? "Excellent" : percent >= 70 ? "Great" : percent >= 50 ? "Good" : "Keep Practicing";
  const badgeColor = percent >= 90 ? "#16a34a" : percent >= 70 ? "#059669" : percent >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="page-wrap">
      <div className="card result-card" style={{ maxWidth: 720, margin: "24px auto", padding: 22 }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Your Results</h2>

        <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "1fr 140px 1fr", gap: 16, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "var(--primary)" }}>{score}</div>
            <div style={{ color: "var(--muted-2)" }}>Score</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ width: 96, height: 96, margin: "0 auto" }}>
              <svg viewBox="0 0 36 36" className="progress-ring" style={{ width: 96, height: 96 }}>
                <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="3.8" />
                <path className="progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary)" strokeWidth="3.8" strokeDasharray={`${percent},100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                <text x="18" y="20.5" style={{ fontSize: 7, textAnchor: "middle", fill: "#111827" }}>{percent}%</text>
              </svg>
            </div>
            <div style={{ marginTop: 12, display: "inline-block", background: badgeColor, color: "white", padding: "6px 12px", borderRadius: 20, fontWeight: 700 }}>
              {badge}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><strong>Rank</strong><div className="meta-value" style={{ marginTop: 6 }}>{rank} / {result.total ?? "-"}</div></div>
            <div><strong>Time</strong><div className="meta-value" style={{ marginTop: 6 }}>{minutes}:{seconds}</div></div>
            <div><strong>Accuracy</strong><div className="meta-value" style={{ marginTop: 6 }}>{percent}%</div></div>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Link to="/answers" state={{ detail }} className="small-btn primary" style={{ marginRight: 12 }}>Review Answers</Link>
          <Link to="/dashboard" className="small-btn secondary">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
