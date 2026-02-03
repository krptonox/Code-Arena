import { Routes, Route, Navigate } from "react-router-dom";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import Register from "./Pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const bgm = useBackgroundMusic();
  return (
    <Routes>
       <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
