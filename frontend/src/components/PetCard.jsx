import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../cart/CartContext";

export default function PetCard({ pet, index }) {
  const { addItem, items } = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  const inCart = items.some((x) => String(x.id) === String(pet.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-all duration-300"
      style={{ background: "var(--petnest-card, #111)", borderColor: "var(--petnest-ring, rgba(255,255,255,0.05))" }}
    >
      <div className="overflow-hidden h-52">
        {pet.image && !imageFailed ? (
          <img
            src={pet.image}
            alt={pet.name}
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.style.display = "none"; setImageFailed(true); }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-neutral-500 text-sm">
            Image unavailable
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-semibold text-lg">{pet.name}</h3>
          <span className="text-xs bg-white/5 text-neutral-400 px-2 py-1 rounded-full" style={{ color: "var(--petnest-muted, rgb(163 163 163))" }}>
            {pet.category}
          </span>
        </div>
        <p className="text-neutral-500 text-sm mb-3" style={{ color: "var(--petnest-muted, rgb(115 115 115))" }}>
          {pet.breed} - {pet.age}yr
        </p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg" style={{ color: "var(--petnest-accent, #E8C547)" }}>${pet.price}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={inCart}
              onClick={() => {
                if (!inCart) addItem(pet);
              }}
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 font-semibold ${
                inCart
                  ? "cursor-default border border-white/10 text-neutral-400"
                  : "bg-yellow-400 hover:opacity-90 text-black"
              }`}
              style={
                inCart
                  ? {
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "var(--petnest-ring, rgba(255,255,255,0.1))",
                      color: "var(--petnest-muted, rgb(163 163 163))",
                    }
                  : {
                      background: "var(--petnest-accent, #E8C547)",
                      color: "var(--petnest-accent-text, #070707)",
                    }
              }
              aria-label={inCart ? `${pet.name} is already in your cart` : `Add ${pet.name} to cart`}
            >
              {inCart ? "In cart" : "Add to cart"}
            </button>
            <Link
              to={`/pets/${pet.id}`}
              className="text-sm bg-white/5 hover:bg-white/10 text-neutral-300 px-4 py-2 rounded-full transition-all duration-200"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
