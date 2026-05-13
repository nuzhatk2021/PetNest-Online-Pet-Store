import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { fetchPetById } from "../utils/pets";

function money(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

export default function PetDetail() {
  const { petID } = useParams();
<<<<<<< HEAD
  const { addItem } = useCart();
=======
  const { addItem, hasInCart } = useCart();
>>>>>>> 3a88ab5 (update)
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPet() {
      try {
        setLoading(true);
        setError("");
        const petData = await fetchPetById(petID);
        if (active) {
          setPet(petData);
          setImageFailed(false);
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to load this pet. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPet();

    return () => {
      active = false;
    };
  }, [petID]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <Link
          to="/pets"
          className="inline-flex items-center text-sm text-neutral-400 hover:text-yellow-400 transition-colors mb-8"
        >
          Back to pets
        </Link>

        {loading ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-lg">Loading pet details...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-300 text-lg">{error}</p>
          </div>
        ) : !pet ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-lg">Pet not found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
              {pet.image && !imageFailed ? (
                <img
                  src={pet.image}
                  alt={pet.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.style.display = "none"; setImageFailed(true); }}
                  className="w-full aspect-[4/3] object-cover bg-white/5"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-white/5 flex items-center justify-center text-neutral-500">
                  Image unavailable
                </div>
              )}
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-yellow-400 font-bold mb-2">
                    {pet.category}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-black">{pet.name}</h1>
                </div>
                <span className="text-yellow-400 font-black text-2xl">{money(pet.price)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-neutral-500 mb-1">Breed</p>
                  <p className="font-semibold">{pet.breed}</p>
                </div>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-neutral-500 mb-1">Age</p>
                  <p className="font-semibold">{pet.age} year{pet.age === 1 ? "" : "s"}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-neutral-400 leading-7">
                  {pet.description || "No description is available for this pet yet."}
                </p>
              </div>

              <button
<<<<<<< HEAD
                onClick={() => addItem(pet)}
                className="w-full bg-yellow-400 hover:opacity-90 text-black px-6 py-3 rounded-full transition-all duration-200 font-bold"
              >
                Add to Cart
=======
                type="button"
                disabled={hasInCart(pet.id)}
                onClick={() => addItem(pet)}
                className="w-full bg-yellow-400 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-3 rounded-full transition-all duration-200 font-bold"
              >
                {hasInCart(pet.id) ? "Already in cart" : "Add to Cart"}
>>>>>>> 3a88ab5 (update)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
