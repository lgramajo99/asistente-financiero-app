
import {
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
  Trash2,
} from "lucide-react";

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
  mobile = false,
}) {
  const isIncome = transaction.type === "income";

  const formattedAmount = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.abs(transaction.amount));

  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${transaction.date}T12:00:00`));

  const iconStyle = isIncome
    ? "bg-emerald-50 text-emerald-600"
    : "bg-rose-50 text-rose-600";

  const amountStyle = isIncome
    ? "text-emerald-600"
    : "text-slate-800";

  const actions = (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit?.(transaction)}
        title="Editar movimiento"
        aria-label={`Editar ${transaction.description}`}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={() => onDelete?.(transaction.id)}
        title="Eliminar movimiento"
        aria-label={`Eliminar ${transaction.description}`}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const icon = isIncome
    ? <ArrowDownLeft size={19} />
    : <ArrowUpRight size={19} />;

  if (mobile) {
    return (
      <article className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">
              {transaction.description}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {transaction.category} · {formattedDate}
            </p>

            <p className={`mt-1 text-sm font-semibold ${amountStyle}`}>
              {isIncome ? "+" : "-"}{formattedAmount}
            </p>
          </div>
        </div>

        {actions}
      </article>
    );
  }

  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
          >
            {icon}
          </div>

          <span className="text-sm font-medium text-slate-800">
            {transaction.description}
          </span>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {transaction.category}
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {formattedDate}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isIncome
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {isIncome ? "Ingreso" : "Egreso"}
        </span>
      </td>

      <td className={`px-5 py-4 text-right text-sm font-semibold ${amountStyle}`}>
        {isIncome ? "+" : "-"}{formattedAmount}
      </td>

      <td className="px-5 py-4">
        {actions}
      </td>
    </tr>
  );
}
