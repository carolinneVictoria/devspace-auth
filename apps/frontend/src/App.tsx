import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import ForgotPassword from "./components/auth/forgot-password";

type Page = "login" | "signin" | "forgot-password";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" replace/>} />
    </Routes>
  )
}

export default App;