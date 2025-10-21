"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/verify");
        if (!res.ok) return router.push("/login");
        const data = await res.json();
        setUser(data.user);
        setAuth(true);
      } catch (err) {
        console.error("Auth error:", err);
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!auth)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className={`d-flex vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Sidebar */}
      <div
        className={`sidebar position-fixed top-0 start-0 h-100 p-3 shadow ${
          darkMode ? "bg-secondary text-light" : "bg-white text-dark"
        } ${sidebarOpen ? "open" : ""}`}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">MyDashboard</h4>
          <button
            className="btn btn-sm btn-outline-secondary d-lg-none rotate-icon"
            onClick={toggleSidebar}
          >
            <i className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          {["dashboard", "profile", "settings"].map((item) => (
            <li key={item}>
              <button
                className={`nav-link text-start ${active === item ? "active" : ""}`}
                onClick={() => {
                  setActive(item);
                  setSidebarOpen(false);
                }}
              >
                <i
                  className={`bi bi-${
                    item === "dashboard" ? "speedometer2" : item === "profile" ? "person" : "gear"
                  } me-2`}
                ></i>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <hr />
        <div className="mt-auto text-center">
          <button className="btn btn-outline-secondary w-100 mb-2" onClick={toggleTheme}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay position-fixed top-0 start-0 w-100 h-100 d-lg-none" onClick={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <div className={`flex-grow-1 p-4 overflow-auto content ${sidebarOpen ? "blurred" : ""}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn btn-outline-primary d-lg-none ${sidebarOpen ? "rotate" : ""}`}
              onClick={toggleSidebar}
            >
              <i className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
            <h4 className="fw-bold mb-0 text-capitalize">{active}</h4>
          </div>
          <span className="fw-semibold">👋 {user?.email || "User"}</span>
        </div>

        {active === "dashboard" && <DashboardCards darkMode={darkMode} />}
        {active === "profile" && <ProfileInfo user={user} darkMode={darkMode} />}
        {active === "settings" && <Settings darkMode={darkMode} />}
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          transition: transform 0.3s ease-in-out;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .rotate-icon i {
          transition: transform 0.3s ease;
        }
        @media (max-width: 991px) {
          .sidebar {
            transform: translateX(-100%);
            z-index: 1050;
          }
          .overlay {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 1045;
            transition: opacity 0.3s ease;
          }
          .blurred {
            filter: blur(3px);
            pointer-events: none;
            user-select: none;
            transition: filter 0.3s ease;
          }
        }
        @media (min-width: 992px) {
          .content {
            margin-left: 250px;
          }
        }
      `}</style>
    </div>
  );
}

// Dashboard Cards
function DashboardCards({ darkMode }) {
  const items = [
    { icon: "people", title: "Users", value: "120" },
    { icon: "briefcase", title: "Projects", value: "8" },
    { icon: "graph-up", title: "Reports", value: "3" },
  ];
  return (
    <div className="row g-3">
      {items.map((item, i) => (
        <div className="col-12 col-md-4" key={i}>
          <div className={`card shadow-sm border-0 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}>
            <div className="card-body text-center">
              <i className={`bi bi-${item.icon} fs-1 mb-2`}></i>
              <h5>{item.title}</h5>
              <p className="text-muted mb-0">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileInfo({ user, darkMode }) {
  return (
    <div className={`card p-4 shadow-sm border-0 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}>
      <h5 className="fw-bold mb-3">Profile Information</h5>
      <p>Email: {user?.email}</p>
      <p>Status: Active User</p>
    </div>
  );
}

function Settings({ darkMode }) {
  return (
    <div className={`card p-4 shadow-sm border-0 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}>
      <h5 className="fw-bold mb-3">Settings</h5>
      <p>Notification: Enabled</p>
      <p>Language: English</p>
    </div>
  );
}
