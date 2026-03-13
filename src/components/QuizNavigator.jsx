import React from "react";

export default function QuizNavigator({ questions, current, onJump }) {
  return (
    <div className="card">
      <h3>Questions</h3>
      {questions.map((q, i) => (
        <div
          key={q.id}
          onClick={() => onJump(i)}
          style={{
            cursor: "pointer",
            padding: 6,
            borderRadius: 6,
            background: i === current ? "rgba(255,255,255,0.15)" : "transparent",
            marginBottom: 4
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
