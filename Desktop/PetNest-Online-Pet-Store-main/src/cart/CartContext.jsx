import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "petnest_cart_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadInitialState() {
  if (typeof window === "undefined") return { items: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items)) return { items: [] };
  const items = parsed.items
    .filter(Boolean)
    .map((it) => ({
      id: it.id,
      name: String(it.name ?? ""),
      price: Number(it.price ?? 0),
      image: it.image ? String(it.image) : "",
      qty: Math.max(1, Number(it.qty ?? 1)),
    }))
    .filter((it) => (typeof it.id === "number" || typeof it.id === "string") && it.name);
  return { items };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const id = p?.id;
      if (id === undefined || id === null) return state;
      const existing = state.items.find((x) => x.id === id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id,
            name: String(p.name ?? "Pet"),
            price: Number(p.price ?? 0),
            image: p.image ? String(p.image) : "",
            qty: 1,
          },
        ],
      };
    }
    case "REMOVE": {
      const id = action.payload;
      return { ...state, items: state.items.filter((x) => x.id !== id) };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload || {};
      const nextQty = Number(qty);
      if (!Number.isFinite(nextQty)) return state;
      if (nextQty <= 0) return { ...state, items: state.items.filter((x) => x.id !== id) };
      return { ...state, items: state.items.map((x) => (x.id === id ? { ...x, qty: nextQty } : x)) };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  const value = useMemo(() => {
    const items = state.items;
    const count = items.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
    const subtotal = items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
    return {
      items,
      count,
      subtotal,
      addItem: (pet) => dispatch({ type: "ADD", payload: pet }),
      removeItem: (id) => dispatch({ type: "REMOVE", payload: id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

