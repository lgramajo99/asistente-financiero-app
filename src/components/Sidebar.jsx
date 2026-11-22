
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  Target,
  ChartNoAxesCombined,
  Trophy,
  Settings,
  MessageCircle,
  ChevronDown,
  Lightbulb,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Inicio",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Movimientos",
    path: "/movimientos",
    icon: ArrowLeftRight,
  },
  {
    name: "Categorías",
    path: "/categorias",
    icon: Tags,
  },
  {
    name: "Cuentas",
    path: "/cuentas",
    icon: Wallet,
  },
  {
    name: "Presupuestos",
    path: "/presupuestos",
    icon: Target,
  },
  {
    name: "Estadísticas",
    path: "/estadisticas",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Objetivos",
    path: "/objetivos",
    icon: Trophy,
  },
  {
    name: "Configuración",
    path: "/configuracion",
    icon: Settings,
  },
];

export default function Sidebar({ isOpen = true, onClose, whatsappUrl }) {
  return (
    <>
      {/* Overlay mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          bg-[#151F38] text-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-28 items-center justify-between px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20">
              <ChartNoAxesCombined
                size={28}
                className="text-indigo-400"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Mi Finanzas
              </h1>
              <p className="text-xs text-gray-400">
                Tu asistente financiero
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-4 rounded-xl px-4 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={21} strokeWidth={2} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Asistente WhatsApp */}
        <div className="mx-4 mb-6 rounded-2xl border border-white/5 bg-[#202C48] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={23} className="text-yellow-400" />
            <span className="text-sm font-semibold">
              ¿Necesitás ayuda?
            </span>
          </div>

          <p className="mb-4 text-xs leading-relaxed text-gray-300">
            Escribile a tu asistente financiero y resolvé tus dudas.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold transition hover:bg-emerald-600"
            >
              <MessageCircle size={18} />
              Abrir WhatsApp
            </a>
          ) : (
            <button
              disabled
              title="Configurar enlace de WhatsApp"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-500/40 py-2.5 text-sm font-semibold text-white/70"
            >
              <MessageCircle size={18} />
              Abrir WhatsApp
            </button>
          )}
        </div>

        {/* Perfil */}
        <div className="border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              U
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">
                Mi cuenta
              </p>
              <p className="text-xs text-gray-400">
                Usuario
              </p>
            </div>

            <ChevronDown size={18} className="text-gray-400" />
          </button>
        </div>
      </aside>
    </>
  );
}
