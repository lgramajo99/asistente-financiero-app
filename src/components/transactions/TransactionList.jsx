
import { ReceiptText } from "lucide-react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({
  transactions = [],
  onEdit,
  onDelete,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Historial de movimientos
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {transactions.length} movimientos encontrados
          </p>
        </div>
      </div>

      {transactions.length > 0 ? (
        <>
          {/* Tabla para escritorio */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Movimiento</th>
                  <th className="px-5 py-4 font-semibold">Categoría</th>
                  <th className="px-5 py-4 font-semibold">Fecha</th>
                  <th className="px-5 py-4 font-semibold">Tipo</th>
                  <th className="px-5 py-4 text-right font-semibold">Importe</th>
                  <th className="px-5 py-4 text-right font-semibold">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas para dispositivos móviles */}
          <div className="divide-y divide-slate-100 md:hidden">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
                mobile
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center px-5 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <ReceiptText size={25} className="text-slate-400" />
          </div>

          <h3 className="font-semibold text-slate-800">
            No se encontraron movimientos
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            No hay resultados para los filtros seleccionados.
            Prueba con otros criterios de búsqueda.
          </p>
        </div>
      )}
    </section>
  );
}
