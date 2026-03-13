import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortid from "shortid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  id: { type: String, default: shortid.generate },
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const quizSchema = new mongoose.Schema({
  _id: String,
  subjectId: String,
  title: String,
  instructions: String,
  questions: [
    {
      text: String,
      options: [String],
      correctIndex: Number,
    },
  ],
});

const subjectSchema = new mongoose.Schema({
  _id: String,
  name: String,
});

const User = mongoose.model("User", userSchema);
const Quiz = mongoose.model("Quiz", quizSchema);
const Subject = mongoose.model("Subject", subjectSchema);

async function seedData() {
  const subjectsCount = await Subject.countDocuments();

  if (subjectsCount === 0) {
    await Subject.insertMany([
      { _id: "1", name: "Web Tech" },
      { _id: "2", name: "Maths" }
    ]);
    console.log("Core subjects seeded");
  }

  await Subject.updateOne(
    { _id: "3" },
    { _id: "3", name: "DSA" },
    { upsert: true }
  );
  console.log("DSA subject ensured");
}

  const quizzesCount = await Quiz.countDocuments();
  if (quizzesCount === 0) {
    await Quiz.insertMany([
      {
        _id: "101",
        subjectId: "1",
        title: "Web Tech Quiz 1",
        instructions:
          "This quiz tests your basics of HTML and CSS. Each correct answer gives 10 points.",
        questions: [
          {
            text: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Text Markdown Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
            ],
            correctIndex: 0,
          },
          {
            text: "Which tag is used for inserting an image?",
            options: ["<image>", "<img>", "<pic>", "<src>"],
            correctIndex: 1,
          },
          {
            text: "Which property changes text color in CSS?",
            options: ["font-color", "text-color", "color", "font-style"],
            correctIndex: 2,
          },
          {
            text: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctIndex: 1,
          },
        ],
      },
      {
        _id: "102",
        subjectId: "1",
        title: "Web Tech Quiz 2",
        instructions:
          "Advanced HTML and CSS concepts. Each correct answer gives 10 points.",
        questions: [
          {
            text: "Which HTML tag is used to define an internal stylesheet?",
            options: ["<css>", "<script>", "<style>", "<link>"],
            correctIndex: 2,
          },
          {
            text: "What does the z-index property control in CSS?",
            options: [
              "Element stacking order",
              "Font size",
              "Transparency",
              "Positioning mode",
            ],
            correctIndex: 0,
          },
          {
            text: "Which HTML element is used to define navigation links?",
            options: ["<nav>", "<navigation>", "<links>", "<menu>"],
            correctIndex: 0,
          },
          {
            text: "What is the default position value in CSS?",
            options: ["relative", "fixed", "absolute", "static"],
            correctIndex: 3,
          },
        ],
      },
      {
        _id: "201",
        subjectId: "2",
        title: "Maths Quiz 1",
        instructions: "Basic Algebra quiz. Each question carries 10 points.",
        questions: [
          {
            text: "What is 2x + 3x?",
            options: ["5", "10", "5x", "x^2"],
            correctIndex: 2,
          },
          {
            text: "Simplify: (a+b)^2",
            options: [
              "a^2 + b^2",
              "a^2 + 2ab + b^2",
              "2a + 2b",
              "ab + a + b",
            ],
            correctIndex: 1,
          },
          {
            text: "Find x: 2x = 10",
            options: ["5", "10", "2", "20"],
            correctIndex: 0,
          },
          {
            text: "Derivative of x^2 is?",
            options: ["x", "x^2", "2x", "1"],
            correctIndex: 2,
          },
        ],
      },
      {
        _id: "202",
        subjectId: "2",
        title: "Maths Quiz 2",
        instructions:
          "Intermediate Algebra and Calculus questions. Each correct answer gives 10 points.",
        questions: [
          {
            text: "Integrate x dx.",
            options: ["x^2", "x^2 / 2 + C", "ln(x)", "1/x"],
            correctIndex: 1,
          },
          {
            text: "Simplify: (x+3)(x-3)",
            options: ["x^2 - 9", "x^2 + 9", "x^2 + 6x + 9", "x^2 - 6x + 9"],
            correctIndex: 0,
          },
          {
            text: "If f(x) = 2x + 1, find f(3).",
            options: ["5", "7", "9", "6"],
            correctIndex: 1,
          },
          {
            text: "Find derivative of sin(x).",
            options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
            correctIndex: 0,
          },
        ],
      },
    ]);
    console.log("Quizzes seeded (2 per subject)");
  }
seedData();

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/subjects", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

app.get("/api/quizzes", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

app.get("/api/topics/:topicId", async (req, res) => {
  const topic = await Quiz.findById(req.params.topicId);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  res.json(topic);
});

app.post("/api/submit", async (req, res) => {
  const { topicId, answers } = req.body;
  const topic = await Quiz.findById(topicId);

  if (!topic) return res.status(404).json({ error: "Topic not found" });

  const detail = topic.questions.map((q, i) => ({
    text: q.text,
    correctAns: q.options[q.correctIndex],
    userAns: answers[i] !== null ? q.options[answers[i]] : null,
    correct: answers[i] === q.correctIndex,
  }));

  const score = detail.filter((d) => d.correct).length * 10;
  res.json({
    result: {
      score,
      percent: (score / (topic.questions.length * 10)) * 100,
      total: topic.questions.length,
    },
    detail,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
