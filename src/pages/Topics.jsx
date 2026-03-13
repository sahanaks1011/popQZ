import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Topics() {
  const { subjectId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("http://localhost:4000/api/quizzes");
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        const data = await res.json();

        console.log("subjectId param:", subjectId);
        console.log("quizzes data:", data);

        const filtered = Array.isArray(data)
          ? data.filter((q) => q.subjectId == subjectId) 
          : [];

        setTopics(filtered);
      } catch (err) {
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [subjectId]);

  if (loading) return <div className="card">Loading topics...</div>;
  if (topics.length === 0)
    return <div className="card">No topics found for this subject.</div>;

  return (
    <div>
      <div className="card">
        <h2>{topics[0]?.subjectName || "Topics"}</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 16,
        }}
      >
        {topics.map((t) => (
          <div
            key={t._id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{t.title}</h3>
            </div>
            <Link to={`/instructions/${t._id}`} className="small-btn">
              Start
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
