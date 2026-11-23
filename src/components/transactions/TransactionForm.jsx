import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const getToday = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const getInitialForm = () => ({
  description: "",
  category: "",
  amount: "",
  type: "expense",
  date: getToday(),
});

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function TransactionForm({
  transaction,
  onSave,
  onClose,
  categories = [],
}) {
  const [form, setForm] = useState(() => getInitialForm());
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const onCloseRef = useRef(onClose);
  const downOnBackdrop = useRef(false);

  // Mantener onClose actualizado sin re-ejecutar el efecto de teclado
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description ?? "",
        category: transaction.category ?? "",
        amount: String(Math.abs(Number(transaction.amount) || 0)),
        type: transaction.type === "income" ? "income" : "expense",
        date: String(transaction.date ?? "").slice(0, 10) || getToday(),
      });
    } else {
      setForm(getInitialForm());
    }

    setError("");
  }, [transaction]);

  // Foco inicial, focus trap y restauración al cerrar
  useEffect(() => {
    previouslyFocused.current = document.activeElement;

    const dialog = dialogRef.current;
    const first = dialog?.querySelector(FOCUSABLE);
    if (first instanceof HTMLElement) first.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll(FOCUSABLE)
      ).filter((el) => !el.disabled && el.offsetParent !== null);

      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const prev = previouslyFocused.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, []);

  const updateForm = (patch) => {
    setForm((current) => ({ ...current, ...patch }));
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    const amount = Number(form.amount);

    if (!form.description.trim() || !form.category.trim() || !form.date) {
      setError("Completa todos los campos.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Ingresa un importe válido mayor que cero.");
      return;
    }

    setSubmitting(true);
    const result = onSave({
      description: form.description.trim(),
      category: form.category.trim(),
      amount,
      type: form.type,
      date: form.date,
    });

    // Si el padre devuelve una promesa, liberamos el bloqueo al terminar
    if (result && typeof result.finally === "function") {
      result.finally(() => setSubmitting(false));
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        downOnBackdrop.current = event.target === event.currentTarget;
      }}
      onMouseUp={(event) => {
        if (downOnBackdrop.current && event.target === event.currentTarget) {
          onClose();
        }
        downOnBackdrop.current = false;
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2
              id="transaction-form-title"
              className="text-lg font-semibold text-slate-900"
            >
              {transaction ? "Editar movimiento" : "Nuevo movimiento"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Completa los datos de la operación.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div role="group" aria-labelledby="transaction-type-label">
            <span
              id="transaction-type-label"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tipo de movimiento
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateForm({ type: "income" })}
                aria-pressed={form.type === "income"}
                className={`rounded-xl border py-3 text-sm font-medium transition ${
                  form.type === "income"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                Ingreso
              </button>

              <button
                type="button"
                onClick={() => updateForm({ type: "expense" })}
                aria-pressed={form.type === "expense"}
                className={`rounded-xl border py-3 text-sm font-medium transition ${
                  form.type === "expense"
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                Egreso
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="transaction-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Descripción
            </label>

            <input
              id="transaction-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ej. Compra en supermercado"
              disabled={submitting}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="transaction-amount"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Importe (ARS)
            </label>

            <input
              id="transaction-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="Ej. 15000"
              disabled={submitting}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="transaction-category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Categoría
            </label>

            <input
              id="transaction-category"
              name="category"
              list="transaction-categories"
              value={form.category}
              onChange={handleChange}
              placeholder="Seleccionar o escribir categoría"
              disabled={submitting}
              className={inputClass}
            />

            <datalist id="transaction-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div>
            <label
              htmlFor="transaction-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Fecha
            </label>

            <input
              id="transaction-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              disabled={submitting}
              className={inputClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Guardando..."
                : transaction
                  ? "Guardar cambios"
                  : "Registrar movimiento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}