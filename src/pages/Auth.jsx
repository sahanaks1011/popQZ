import React, { useState } from "react";
import { signup, login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const fn = mode === "signup" ? signup : login;
      const res = await fn(form);

      if (!res) throw new Error("No response from server");

      if (res.error) throw new Error(res.error);

      try {
        const userObj = res.user ?? res;
        if (userObj && typeof userObj === "object") {
          localStorage.setItem("popqz_user", JSON.stringify(userObj));
        }

        if (res.token) {
          localStorage.setItem("token", res.token);
        }
      } catch (storageErr) {
        console.warn("Could not persist user to localStorage", storageErr);
      }

      window.dispatchEvent(new Event("authChanged"));

      nav("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div className="card center" style={{ marginTop: "40px" }}>
      <h2 className="logo">popQZ</h2>

      <h3 style={{ marginTop: "10px", color: "#4b5563" }}>
        {mode === "login" ? "Welcome to popQZ" : "Sign up to continue"}
      </h3>

      <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "20px" }}>
        {mode === "login" ? "Login/Sign up to continue" : "Sign up here"}
      </p>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <input
            //required
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <input
          //required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {mode === "signup" && (
          <input
            required
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        )}

        {error && (
          <div style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</div>
        )}

        <button
          type="submit"
          className="small-btn primary"
          style={{ width: "100%", marginTop: "10px" }}
        >
          {mode === "login" ? "Login" : "Sign up"}
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "0.9rem" }}>
        {mode === "login" ? (
          <p>
            Don’t already have an account?{" "}
            <button
              type="button"
              className="small-btn secondary"
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Go back to login page{" "}
            <button
              type="button"
              className="small-btn secondary"
              onClick={() => setMode("login")}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
