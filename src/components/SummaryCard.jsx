
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank
} from "lucide-react";

const variants = {
  balance: {
    icon: Wallet,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  income: {
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  expense: {
    icon: TrendingDown,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  savings: {
    icon: PiggyBank,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
};

export default function SummaryCard({
  title,
  amount,
  type = "balance",
  description,
  percentage,
}) {
  const variant = variants[type] || variants.balance;
  const Icon = variant.icon;

  const formattedAmount = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-indigo-200 hover:shadow-sm">

      {/* Encabezado */}
      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${variant.iconBg}`}>
          <Icon size={20} className={variant.iconColor} />
        </div>

      </div>

      {/* Importe */}
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {formattedAmount}
      </h2>

      {/* Descripción */}
      <div className="mt-3 flex flex-wrap items-center gap-2">

        {percentage !== undefined && (
          <span className={`rounded-md px-2 py-1 text-xs font-semibold ${
            percentage >= 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}>
            {percentage > 0 ? "+" : ""}
            {percentage}%
          </span>
        )}

        {description && (
          <span className="text-xs text-slate-400">
            {description}
          </span>
        )}

      </div>

    </article>
  );
}
