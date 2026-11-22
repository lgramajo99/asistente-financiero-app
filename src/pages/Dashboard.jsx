import { useState } from "react";
import WelcomeHeader from "../components/WelcomeHeader";
import SummaryCard from "../components/SummaryCard";
import {
  userData,
  financialSummary,
  summaryComparisons,
  recentTransactions,
} from "../data/data";

import RecentTransactions from "../components/RecentTransactions";

export default function Dashboard() {
  const [period, setPeriod] = useState("Este mes");

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      {/* Encabezado */}
      <WelcomeHeader
        userName={userData.name}
        period={period}
        onPeriodChange={setPeriod}
      />

      {/* Resumen financiero */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Resumen financiero
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Una visión general de tu dinero.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Balance disponible"
            amount={financialSummary.balance}
            type="balance"
            description="Dinero disponible"
          />

          <SummaryCard
            title="Ingresos"
            amount={financialSummary.income}
            type="income"
            percentage={summaryComparisons.income.percentage}
            description={summaryComparisons.income.description}
          />

          <SummaryCard
            title="Gastos"
            amount={financialSummary.expenses}
            type="expense"
            percentage={summaryComparisons.expenses.percentage}
            description={summaryComparisons.expenses.description}
          />

          <SummaryCard
            title="Ahorros"
            amount={financialSummary.savings}
            type="savings"
            description="27% de tus ingresos"
          />
        </div>
      </section>

      <RecentTransactions transactions={recentTransactions} limit={5} />
    </div>
  );
}
