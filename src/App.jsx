
import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Errorpage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        whatsappUrl="https://wa.me/1234567890"
      />

      {/* Contenido principal */}
      <main className="min-h-screen bg-slate-50 lg:ml-64">

        <Routes>
          {/* Ruta principal */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Página de error 404 */}
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>

      </main>

    </section>
  );
}

export default App;
