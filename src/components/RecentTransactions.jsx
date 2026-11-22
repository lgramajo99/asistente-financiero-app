import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentTransactions({ transactions = [], limit = 5 }) {
  const navigate = useNavigate();

  const visibleTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(`${date}T12:00:00`));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Movimientos recientes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tus últimos ingresos y gastos.
          </p>
        </div>

        <button
          onClick={() => navigate("/movimientos")}
          className="hidden items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800 sm:flex"
        >
          Ver todos
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {visibleTransactions.length > 0 ? (
          visibleTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {transaction.description}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.category} · {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 text-sm font-semibold ${
                    isIncome ? "text-emerald-600" : "text-slate-800"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            );
          })
        ) : (
          <p className="p-8 text-center text-sm text-slate-400">
            Todavía no tienes movimientos registrados.
          </p>
        )}
      </div>

      <div className="border-t border-slate-100 p-4 sm:hidden">
        <button
          onClick={() => navigate("/movimientos")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          Ver todos los movimientos
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
