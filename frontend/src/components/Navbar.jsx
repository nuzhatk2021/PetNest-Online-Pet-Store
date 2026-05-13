import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

export default function Navbar({ user, onSignOut }) {
  const { count } = useCart();

  return (
    <nav
      style={{
        position: "fixed",
        top: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "92%",
        maxWidth: "1100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        borderRadius: "999px",
        background: "rgba(10, 10, 10, 0.82)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        Pet<span style={{ color: "#E8C547" }}>Nest</span>
      </Link>

      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        {["Home", "Pets"].map((label) => (
          <Link
            key={label}
            to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
            style={{ color: "#aaa", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = "white";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "#aaa";
            }}
          >
            {label}
          </Link>
        ))}


        {!user && <>
          <Link
            to="/login"
            style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "13px",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "6px 16px",
              borderRadius: "999px",
            }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            style={{
              color: "#000",
              background: "linear-gradient(to right, #f0d060, #E8C547)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
            }}
          >
            Register
          </Link>
        </>
        }

        {user &&
          <button
            onClick={() => onSignOut()}
            style={{
              color: "#000",
              background: "#E8C547",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
            }}
          >
            Sign Out
          </button>
        }

        <Link
          to="/cart"
          style={{
            color: "#000",
            background: "#E8C547",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: "999px",
          }}
        >
          Cart ({count})
        </Link>

        {user &&
          <Link
            to="/profile"
            style={{
              color: "white",
              background: "purple",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
            }}
          >
              {user.user_metadata?.username || user.email?.split('@')[0] || "Profile"}
          </Link>
        }
      </div>
    </nav>
  );
}
