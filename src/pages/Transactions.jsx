import { useMemo, useState } from "react";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";

import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";
import TransactionForm from "../components/transactions/TransactionForm";

import { recentTransactions } from "../data/data";

export default function Transactions() {
  const [transactions, setTransactions] = useState(recentTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    const today = new Date();

    return transactions
      .filter((transaction) => {
        const matchesSearch =
          transaction.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.category.toLowerCase().includes(search.toLowerCase());

        const matchesType =
          typeFilter === "all" || transaction.type === typeFilter;

        const matchesCategory =
          categoryFilter === "all" || transaction.category === categoryFilter;

        const transactionDate = new Date(`${transaction.date}T12:00:00`);

        const matchesDate =
          dateFilter === "all" ||
          (dateFilter === "month" &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()) ||
          (dateFilter === "year" &&
            transactionDate.getFullYear() === today.getFullYear());

        return matchesSearch && matchesType && matchesCategory && matchesDate;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, search, typeFilter, categoryFilter, dateFilter]);

  const categories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const balance = income - expenses;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleSave = (formData) => {
    if (editingTransaction) {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...formData, id: transaction.id }
            : transaction,
        ),
      );
    } else {
      setTransactions((current) => [
        { ...formData, id: Date.now() },
        ...current,
      ]);
    }

    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este movimiento?",
    );

    if (confirmed) {
      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id),
      );
    }
  };

  const handleNewTransaction = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      {/* Encabezado */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Movimientos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Administra todos tus ingresos y gastos.
          </p>
        </div>

        <button
          onClick={handleNewTransaction}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Nuevo movimiento
        </button>
      </header>

      {/* Resumen */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryBox
          title="Ingresos"
          amount={income}
          icon={TrendingUp}
          color="emerald"
          formatCurrency={formatCurrency}
        />

        <SummaryBox
          title="Egresos"
          amount={expenses}
          icon={TrendingDown}
          color="rose"
          formatCurrency={formatCurrency}
        />

        <SummaryBox
          title="Balance"
          amount={balance}
          icon={Wallet}
          color="indigo"
          formatCurrency={formatCurrency}
        />
      </section>

      {/* Filtros */}
      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        categories={categories}
      />

      {/* Listado */}
      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Formulario */}
      {isFormOpen && (
        <TransactionForm
          transaction={editingTransaction}
          onSave={handleSave}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTransaction(null);
          }}
          categories={categories}
        />
      )}
    </div>
  );
}

function SummaryBox({ title, amount, icon: Icon, color, formatCurrency }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
        >
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
        {formatCurrency(amount)}
      </p>
    </article>
  );
}
