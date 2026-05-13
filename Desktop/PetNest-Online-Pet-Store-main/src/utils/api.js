const API_BASE = "http://localhost:8080/api";

export async function fetchProducts(search = "") {
  const url = search
    ? `${API_BASE}/products?search=${encodeURIComponent(search)}`
    : `${API_BASE}/products`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchCart() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/cart`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
}

export async function loginUser(formData) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function registerUser(formData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}
