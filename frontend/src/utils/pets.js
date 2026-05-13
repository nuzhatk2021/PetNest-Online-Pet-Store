const PETS_API_BASE = import.meta?.env?.VITE_PETS_API_BASE ?? "http://localhost:9090/pets";

export function normalizePet(pet) {
  if (!pet) return null;

  return {
    id: pet.PetID ?? pet.id,
    name: pet.PetName ?? pet.name ?? "Unnamed pet",
    breed: pet.PetBreed ?? pet.breed ?? "Unknown breed",
    age: Number(pet.PetAge ?? pet.age ?? 0),
    price: Number(pet.PetPrice ?? pet.price ?? 0),
    category: pet.PetCategory ?? pet.category ?? "Pet",
    image: pet.PetImg ?? pet.image ?? "",
    description: pet.PetDescription ?? pet.description ?? "",
  };
}

export async function fetchPets() {
  const response = await fetch(`${PETS_API_BASE}`, {cache: "no-cache"});

  if (!response.ok) {
    throw new Error("Unable to load pets. Please try again.");
  }
  
  const data = await response.json();
  return (Array.isArray(data) ? data : []).map(normalizePet).filter(Boolean).reverse();
}

export async function fetchPetById(petID) {
  const response = await fetch(`${PETS_API_BASE}/${encodeURIComponent(petID)}`, { cache: "no-cache" });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody?.message || "Unable to load this pet. Please try again.");
  }

  const data = await response.json();
  const pet = Array.isArray(data) ? data[0] : data;
  return normalizePet(pet);
}
