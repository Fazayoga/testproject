"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { error: "Response tidak valid dari server" };
      }

      if (!res.ok) return setError(data.error || "Login gagal");
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Gagal terhubung ke server");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Welcome Back 👋</h3>
          <p className="text-muted small mb-0">
            Login to access your dashboard
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email / Username</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group input-group-lg">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold mt-3 py-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          © {new Date().getFullYear()} Project. All rights reserved.
        </p>
      </div>
    </div>
  );
}
