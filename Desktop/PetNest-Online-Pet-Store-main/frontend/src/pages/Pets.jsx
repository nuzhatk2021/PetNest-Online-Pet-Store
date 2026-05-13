import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import PetCard from "../components/PetCard";
import { fetchPets } from "../utils/pets";

const CATEGORIES = ["All", "Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Guinea Pig", "Turtle", "Ferret", "Reptile"];

const THEMES = {
  night: {
    name: "City Night",
    page: "#070707",
    surface: "rgba(8,8,8,0.94)",
    surfaceSoft: "rgba(17,17,17,0.9)",
    text: "#ffffff",
    mutedText: "rgba(255,255,255,0.58)",
    accent: "#E8C547",
    accentText: "#070707",
    faintRing: "rgba(255,255,255,0.1)",
    ring: "rgba(232,197,71,0.38)",
    glow: "rgba(232,197,71,0.14)",
    glowStrong: "rgba(232,197,71,0.42)",
  },
  meadow: {
    name: "Meadow Glow",
    page: "#09110d",
    surface: "rgba(7,17,12,0.94)",
    surfaceSoft: "rgba(16,31,22,0.9)",
    text: "#fffaf0",
    mutedText: "rgba(255,250,240,0.62)",
    accent: "#9DD86A",
    accentText: "#07110b",
    faintRing: "rgba(255,250,240,0.12)",
    ring: "rgba(157,216,106,0.38)",
    glow: "rgba(157,216,106,0.14)",
    glowStrong: "rgba(157,216,106,0.42)",
  },
  sunrise: {
    name: "Sunrise Yard",
    page: "#120c08",
    surface: "rgba(21,12,8,0.94)",
    surfaceSoft: "rgba(35,20,13,0.9)",
    text: "#fff8ed",
    mutedText: "rgba(255,248,237,0.62)",
    accent: "#FF8A4C",
    accentText: "#160a05",
    faintRing: "rgba(255,248,237,0.12)",
    ring: "rgba(255,138,76,0.38)",
    glow: "rgba(255,138,76,0.16)",
    glowStrong: "rgba(255,138,76,0.42)",
  },
  coastal: {
    name: "Coastal Calm",
    page: "#061015",
    surface: "rgba(5,16,22,0.94)",
    surfaceSoft: "rgba(10,30,39,0.9)",
    text: "#f2fbff",
    mutedText: "rgba(242,251,255,0.62)",
    accent: "#64D2C8",
    accentText: "#041114",
    faintRing: "rgba(242,251,255,0.12)",
    ring: "rgba(100,210,200,0.38)",
    glow: "rgba(100,210,200,0.16)",
    glowStrong: "rgba(100,210,200,0.42)",
  },
  berry: {
    name: "Berry Bloom",
    page: "#130911",
    surface: "rgba(20,8,18,0.94)",
    surfaceSoft: "rgba(34,15,31,0.9)",
    text: "#fff5fb",
    mutedText: "rgba(255,245,251,0.62)",
    accent: "#F06AA6",
    accentText: "#16060f",
    faintRing: "rgba(255,245,251,0.12)",
    ring: "rgba(240,106,166,0.38)",
    glow: "rgba(240,106,166,0.15)",
    glowStrong: "rgba(240,106,166,0.4)",
  },
};

function ThemeDock({ activeTheme, setActiveTheme, theme }) {
  const themeKeys = Object.keys(THEMES);
  const currentIndex = themeKeys.indexOf(activeTheme);
  const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];

  return (
    <button
      type="button"
      aria-label={`Change theme. Current theme: ${theme.name}`}
      title={`Theme: ${theme.name}`}
      onClick={() => setActiveTheme(nextTheme)}
      style={{
        position: "fixed",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 80,
        width: "48px",
        height: "48px",
        padding: 0,
        borderRadius: "50%",
        border: `1px solid ${theme.faintRing}`,
        background: "rgba(8,8,8,0.74)",
        color: theme.text,
        backdropFilter: "blur(18px)",
        boxShadow: `0 16px 42px rgba(0,0,0,0.34), 0 0 26px ${theme.glow}`,
        display: "grid",
        placeItems: "center",
      }}
    >
      <Palette size={20} strokeWidth={2.2} />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "7px",
          bottom: "7px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: theme.accent,
          boxShadow: `0 0 14px ${theme.glowStrong}`,
        }}
      />
    </button>
  );
}

export default function Pets() {
  const [activeTheme, setActiveTheme] = useState("night");
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = THEMES[activeTheme];

  useEffect(() => {
    let active = true;

    async function loadPets() {
      try {
        setLoading(true);
        setError("");
        const petsData = await fetchPets();
        if (active) setPets(petsData);
      } catch (err) {
        if (active) setError(err.message || "Unable to load pets. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPets();

    return () => {
      active = false;
    };
  }, []);

  let filtered = pets
    .filter(p => category === "All" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sort === "newest") filtered = [...filtered];
  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.page,
        color: theme.text,
        "--petnest-accent": theme.accent,
        "--petnest-accent-text": theme.accentText,
        "--petnest-card": theme.surfaceSoft,
        "--petnest-ring": theme.faintRing,
        "--petnest-muted": theme.mutedText,
      }}
    >
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at 50% 0%, ${theme.glowStrong}, transparent 34%), radial-gradient(circle at 85% 25%, ${theme.glow}, transparent 28%), ${theme.page}`, opacity: 0.9 }} />
      <ThemeDock activeTheme={activeTheme} setActiveTheme={setActiveTheme} theme={theme} />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16" style={{ position: "relative", zIndex: 1 }}>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search pets by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-[#111] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400/50"
            style={{ background: theme.surface, borderColor: theme.faintRing, color: theme.text }}
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-full px-5 py-3 text-sm text-neutral-400 focus:outline-none focus:border-yellow-400/50"
            style={{ background: theme.surface, borderColor: theme.faintRing, color: theme.mutedText }}
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
        <div className="flex gap-3 mb-10 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === c
                  ? ""
                  : "border border-white/10 text-neutral-400 hover:border-yellow-400/50 hover:text-white"
              }`}
              style={{
                background: category === c ? theme.accent : "transparent",
                borderColor: category === c ? theme.accent : theme.faintRing,
                color: category === c ? theme.accentText : theme.mutedText,
                boxShadow: category === c ? `0 0 24px ${theme.glow}` : "none",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-lg">Loading pets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-300 text-lg">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-lg">No pets found for "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-4 text-yellow-400 text-sm hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pet, i) => (
              <PetCard key={pet.id} pet={pet} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
