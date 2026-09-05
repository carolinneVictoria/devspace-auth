import { useState } from "react";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import ForgotPassword from "./components/auth/forgot-password";

type Page = "login" | "signin" | "forgot-password";

function App() {
  const [page, setPage] = useState<Page>("login");

  if (page === "signin") {
    return <Signin onLogin={() => setPage("login")} />;
  }

  if (page === "forgot-password") {
    return <ForgotPassword onBack={() => setPage("login")} />;
  }

  return (
    <Login
      onCreateAccount={() => setPage("signin")}
      onForgotPassword={() => setPage("forgot-password")}
    />
  )
}

export default App;