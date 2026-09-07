import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signin from "./pages/auth/Signin";
import ForgotPassword from "./pages/auth/forgot-password";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;