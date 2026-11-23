
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function TransactionFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  categoryFilter,
  onCategoryChange,
  dateFilter,
  onDateChange,
  categories = [],
}) {
  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const hasFilters =
    search ||
    typeFilter !== "all" ||
    categoryFilter !== "all" ||
    dateFilter !== "all";

  const clearFilters = () => {
    onSearchChange("");
    onTypeChange("all");
    onCategoryChange("all");
    onDateChange("all");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-800">
            Buscar y filtrar
          </h2>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar movimiento..."
            aria-label="Buscar movimiento"
            className={`${selectClass} pl-10`}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) => onTypeChange(event.target.value)}
          className={selectClass}
          aria-label="Filtrar por tipo"
        >
          <option value="all">Todos los movimientos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Egresos</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={selectClass}
          aria-label="Filtrar por categoría"
        >
          <option value="all">Todas las categorías</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(event) => onDateChange(event.target.value)}
          className={selectClass}
          aria-label="Filtrar por fecha"
        >
          <option value="all">Todas las fechas</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
        </select>
      </div>
    </section>
  );
}
