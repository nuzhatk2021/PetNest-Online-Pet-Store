<<<<<<< HEAD
const BACKEND_BASE = import.meta?.env?.VITE_BACKEND_BASE ?? "http://localhost:8080";
=======
const BACKEND_BASE = import.meta?.env?.VITE_BACKEND_BASE ?? "http://localhost:9090";
>>>>>>> 3a88ab5 (update)

export async function placeOrder({ items, customer }) {
  const res = await fetch(`${BACKEND_BASE}/order/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.message || "Failed to place order";
    throw new Error(msg);
  }

  return data;
}

