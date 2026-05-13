import { useMemo, useState } from "react";
import { placeOrder } from "../utils/orders";

function money(n) {
  const num = Number(n) || 0;
  return `$${num.toFixed(2)}`;
}

export default function CheckoutModal({ open, onClose, items, subtotal, onSuccess, onClearCart }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const itemCount = useMemo(() => items.reduce((sum, it) => sum + (Number(it.qty) || 0), 0), [items]);

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  if (!open) return null;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      await placeOrder({
        items: items.map((it) => ({ id: it.id, qty: it.qty, name: it.name, price: it.price })),
        customer,
      });
      onClearCart?.();
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#0B0B0B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <p className="text-white font-semibold">Checkout</p>
              <p className="text-xs text-neutral-500">
                {itemCount} item{itemCount === 1 ? "" : "s"} · Total {money(subtotal)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 px-3 py-2 rounded-full transition-all"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <form onSubmit={onSubmit} className="lg:col-span-2 p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm text-neutral-300">
                  Full name
                  <input
                    value={customer.fullName}
                    onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                    required
                  />
                </label>

                <label className="text-sm text-neutral-300">
                  Email
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                    required
                  />
                </label>

                <label className="text-sm text-neutral-300">
                  Phone (optional)
                  <input
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                  />
                </label>

                <label className="text-sm text-neutral-300">
                  Postal code
                  <input
                    value={customer.postalCode}
                    onChange={(e) => setCustomer((c) => ({ ...c, postalCode: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                    required
                  />
                </label>

                <label className="text-sm text-neutral-300 md:col-span-2">
                  Address
                  <input
                    value={customer.address1}
                    onChange={(e) => setCustomer((c) => ({ ...c, address1: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                    required
                  />
                </label>

                <label className="text-sm text-neutral-300">
                  City
                  <input
                    value={customer.city}
                    onChange={(e) => setCustomer((c) => ({ ...c, city: e.target.value }))}
                    className="mt-2 w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                    required
                  />
                </label>

                <label className="text-sm text-neutral-300 md:col-span-2">
                  Notes (optional)
                  <textarea
                    value={customer.notes}
                    onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                    className="mt-2 w-full min-h-24 bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                  />
                </label>
              </div>

              {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="bg-yellow-400 disabled:opacity-60 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  {submitting ? "Placing order..." : "Place order"}
                </button>
                <p className="text-xs text-neutral-600">Placing an order will mark these pets as sold in Supabase.</p>
              </div>
            </form>

            <div className="p-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0A0A0A]">
              <p className="font-semibold mb-4">Items</p>
              <div className="space-y-3 max-h-72 overflow-auto pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{it.name}</p>
                      <p className="text-xs text-neutral-500">
                        x{it.qty} · {money(it.price)}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-200">{money((Number(it.qty) || 0) * (Number(it.price) || 0))}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10 my-4" />
              <div className="flex items-center justify-between text-sm text-neutral-300 mb-2">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-yellow-400">{money(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

