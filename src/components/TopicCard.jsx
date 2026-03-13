import React from "react";
import { Link } from "react-router-dom";

export default function TopicCard({ subject }) {
  return (
    <div className="card" style={{background: subject.color}}>
      <h3>{subject.title}</h3>
      <div style={{marginTop: 10}}>
        <Link to={`/subject/${subject.id}`} className="small-btn">View Topics</Link>
      </div>
    </div>
  );
}
