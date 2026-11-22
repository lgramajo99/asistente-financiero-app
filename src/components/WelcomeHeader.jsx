import { CalendarDays, ChevronDown, Sparkles } from "lucide-react";

export default function WelcomeHeader({
  userName = "Usuario",
  period = "Este mes",
  onPeriodChange,
}) {
  const currentDate = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Saludo */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={17} className="text-indigo-500" />

          <span className="text-sm font-medium text-indigo-600">
            Tu espacio financiero
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          ¡Hola, {userName}!
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Aquí tienes un resumen de tus finanzas.
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs capitalize text-slate-400">
          <CalendarDays size={14} />
          {currentDate}
        </div>
      </div>

      {/* Selector de período */}
      <div className="relative">
        <select
          value={period}
          onChange={(e) => onPeriodChange?.(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-auto"
        >
          <option value="Este mes">Este mes</option>
          <option value="Mes anterior">Mes anterior</option>
          <option value="Últimos 3 meses">Últimos 3 meses</option>
          <option value="Este año">Este año</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </header>
  );
}
