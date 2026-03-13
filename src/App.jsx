import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Instructions from "./pages/Instructions";
import QuizPage from "./pages/QuizPage";
import Results from "./pages/Results";
import ReviewAnswers from "./pages/ReviewAnswers";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject/:subjectId" element={<Topics />} />
        <Route path="/instructions/:topicId" element={<Instructions />} />
        <Route path="/quiz/:topicId" element={<QuizPage />} />
        <Route path="/results/:topicId" element={<Results />} />
        <Route path="/answers" element={<ReviewAnswers />} />
      </Routes>
    </div>
  );
}

export default App;
