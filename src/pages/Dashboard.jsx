import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("popqz_user") || localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw);
        setUsername(user.username || user.email || "User");
      }
    } catch {
      setUsername("User");
    }

    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/subjects");
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f9f9ff",
          padding: "15px 20px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#6f5af8", margin: 0 }}>
          Welcome, {username}!!
        </h2>
      </div>

      <div className="card">
        <h2>Available Subjects</h2>
        <p style={{ color: "var(--muted)" }}>Pick a subject to start!</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {subjects.map((s) => (
          <div key={s._id || s.id} className="card">
            <h3>{s.name}</h3>
            <Link to={`/subject/${s._id || s.id}`} className="small-btn">
              View Topics
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
