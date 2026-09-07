import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">
        Bem-vindo{user?.name ? `, ${user.name}` : ""}!
      </h1>

      <p>Você está dentro do sistema.</p>

      <Button onClick={handleLogout}>Sair</Button>
    </main>
  );
}

export default Dashboard;