import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { apiRequest } from "./utils/api";
import { clearAuthSession, getAuthToken, setAuthSession } from "./utils/authStorage";

function App() {
  useBackgroundMusic();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const token = getAuthToken();

      if (!token) {
        setAuthReady(true);
        return;
      }

      try {
        const result = await apiRequest("/api/auth/me", { method: "GET" });
        setAuthSession(token, result.user);
      } catch {
        clearAuthSession();
      } finally {
        setAuthReady(true);
      }
    };

    validateSession();
  }, []);

  if (!authReady) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
