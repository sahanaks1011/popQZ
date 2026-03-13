import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Instructions() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await fetch(`http://localhost:4000/api/topics/${topicId}`);
        if (!res.ok) throw new Error("Quiz not found");
        const data = await res.json();
        setTopic(data);
      } catch (err) {
        console.error("Error loading quiz:", err);
      }
    }
    fetchTopic();
  }, [topicId]);

  if (!topic) return <div className="card">Loading instructions...</div>;

  return (
    <div className="card">
      <h2>{topic.title}</h2>
      <ul>
        <li>{topic.questions?.length || 0} questions</li>
        <li>5 minutes total</li>
        <li>No negative marking</li>
      </ul>
      <div style={{ marginTop: 20 }}>
        <Link to={`/quiz/${topic._id}`} className="small-btn primary">
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
