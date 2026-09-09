import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, Calendar, Shield } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">DevSpace</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user?.name || "Usuário"}! 👋
          </h2>
          <p className="text-gray-600">Você está logado no sistema e pronto para usar todas as funcionalidades.</p>
        </div>

        {/* User Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* User Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-6 h-6 text-indigo-600" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Nome</h3>
            </div>
            <p className="text-xl font-bold text-gray-900">{user?.name || "Não informado"}</p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Email</h3>
            </div>
            <p className="text-sm font-bold text-gray-900 break-all">{user?.email || "Não informado"}</p>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Status</h3>
            </div>
            <p className="text-xl font-bold text-green-600">Ativo</p>
          </div>

          {/* Join Date Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Membro desde</h3>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {user?.createdAt ? formatDate(user.createdAt) : "Recentemente"}
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Funcionalidades Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Gerenciamento de Perfil",
                description: "Atualize suas informações pessoais e preferências",
                icon: "👤",
              },
              {
                title: "Segurança",
                description: "Gerencie sua senha e configurações de segurança",
                icon: "🔒",
              },
              {
                title: "Notificações",
                description: "Receba atualizações sobre sua conta e atividades",
                icon: "🔔",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Sessões Ativas", value: "1", color: "bg-blue-100 text-blue-700" },
            { label: "Último Acesso", value: "Agora", color: "bg-green-100 text-green-700" },
            { label: "Contas Vinculadas", value: "1", color: "bg-purple-100 text-purple-700" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-lg p-6 text-center ${stat.color}`}>
              <p className="text-sm font-medium opacity-80 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;