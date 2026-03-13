import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTopic, submitQuiz } from "../api";

export default function QuizPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timeSec, setTimeSec] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function fetchTopic() {
      try {
        const data = await getTopic(topicId); 
        if (!data) {
          if (mounted) setTopic(null);
          return;
        }
        const t = data.topic || data;
        if (mounted) {
          setTopic(t);
          setAnswers(new Array(t.questions.length).fill(null));
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        if (mounted) setTopic(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTopic();
    return () => (mounted = false);
  }, [topicId]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeSec((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function selectAnswer(questionIndex, optionIndex) {
    const copy = [...answers];
    copy[questionIndex] = optionIndex;
    setAnswers(copy);
  }

  async function handleSubmit() {
    try {
      const payload = {
        topicId,
        answers,
        timeSpentSec: timeSec,
      };
      const res = await submitQuiz(payload);
      const state = {
        ...(res || {}),
        timeSpentSec: timeSec,
      };
      navigate(`/results/${topicId}`, { state });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Failed to submit quiz. Please try again.");
    }
  }

  if (loading) return <div className="card center">Loading quiz...</div>;
  if (!topic) return <div className="card center">Quiz not found</div>;

  const minutes = Math.floor(timeSec / 60);
  const seconds = String(timeSec % 60).padStart(2, "0");

  return (
    <div className="page-wrap">
      <div className="card" style={{ maxWidth: 840, margin: "20px auto" }}>
        <div className="quiz-top" style={{ alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{topic.title || topic.name}</h2>
          <div className="timer-display">⏱ {minutes}:{seconds}</div>
        </div>

        {topic.questions.map((q, qi) => (
          <div key={qi} className="question-card" style={{ marginTop: 18 }}>
            <p className="question-text"><strong>Q{qi + 1}.</strong> {q.text}</p>

            <div className="options" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  className={`option-btn ${answers[qi] === oi ? "selected" : ""}`}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, gap: 12 }}>
          <button
            className="small-btn secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
          >
            Back to top
          </button>
          <button className="small-btn primary" onClick={handleSubmit} type="button">
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
