import { useState } from "react";
import { fetchProducts } from "../utils/api";

const sampleProducts = [
  {
    _id: "1",
    name: "Golden Retriever Puppy",
    category: "Dogs",
    price: 1200,
    image: "https://via.placeholder.com/300x180?text=Dog",
  },
  {
    _id: "2",
    name: "Persian Cat",
    category: "Cats",
    price: 900,
    image: "https://via.placeholder.com/300x180?text=Cat",
  },
  {
    _id: "3",
    name: "Parrot Toy Set",
    category: "Birds",
    price: 35,
    image: "https://via.placeholder.com/300x180?text=Bird",
  },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetchProducts(searchTerm);
      const productList = Array.isArray(data) ? data : data.products || [];
      setProducts(productList);
      setSearched(true);
    } catch (err) {
      const filtered = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setProducts(filtered);
      setSearched(true);
      setError("Backend not available. Showing demo results.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Search Products</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && searched && products.length === 0 && (
        <p className="status-message">No results found.</p>
      )}

      <div className="card-grid">
        {products.map((product) => (
          <div key={product._id} className="card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
