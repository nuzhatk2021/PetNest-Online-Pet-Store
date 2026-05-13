import { useCart } from "../cart/CartContext";

function money(n) {
  const num = Number(n) || 0;
  return `$${num.toFixed(2)}`;
}

export default function Cart() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <p className="text-sm text-neutral-500 mt-1">Review items before checkout.</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 px-4 py-2 rounded-full transition-all"
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-lg">Your cart is empty.</p>
            <p className="text-neutral-600 text-sm mt-2">Add a pet from the Pets page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="bg-[#111] border border-white/5 rounded-2xl p-4 flex gap-4 items-center"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{it.name}</p>
                        <p className="text-sm text-neutral-500">{money(it.price)} each</p>
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-sm text-neutral-500 hover:text-white transition-colors"
                        aria-label={`Remove ${it.name}`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(it.id, (Number(it.qty) || 1) - 1)}
                          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          value={it.qty}
                          onChange={(e) => setQty(it.id, e.target.value)}
                          className="w-14 text-center bg-[#0A0A0A] border border-white/10 rounded-full px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50"
                          inputMode="numeric"
                        />
                        <button
                          onClick={() => setQty(it.id, (Number(it.qty) || 1) + 1)}
                          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-yellow-400">{money((Number(it.qty) || 0) * (Number(it.price) || 0))}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-5 h-fit">
              <h2 className="font-semibold mb-4">Summary</h2>
              <div className="flex items-center justify-between text-sm text-neutral-300 mb-2">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="h-px bg-white/10 mb-4" />
              <button
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:opacity-90 transition-opacity"
                onClick={() => alert("Checkout flow not implemented yet.")}
              >
                Checkout
              </button>
              <p className="text-xs text-neutral-600 mt-3">
                This demo cart stores items locally in your browser.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

