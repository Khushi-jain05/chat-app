import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

