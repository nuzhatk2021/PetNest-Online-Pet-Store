import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const HOUSEHOLD_PETS = [
  { id: 1, emoji: "🐕", name: "Dogs", match: "Park-ready companions", price: "From $450", space: "Prospect Park, Brooklyn", energy: 92 },
  { id: 2, emoji: "🐈", name: "Cats", match: "Apartment-window loungers", price: "From $280", space: "Upper West Side, Manhattan", energy: 64 },
  { id: 3, emoji: "🐇", name: "Rabbits", match: "Gentle indoor roommates", price: "From $90", space: "Astoria, Queens", energy: 58 },
  { id: 4, emoji: "🦜", name: "Birds", match: "Bright city singers", price: "From $75", space: "Riverdale, Bronx", energy: 78 },
  { id: 5, emoji: "🐠", name: "Fish", match: "Calm small-space pets", price: "From $25", space: "St. George, Staten Island", energy: 36 },
  { id: 6, emoji: "🐹", name: "Hamsters", match: "Tiny night explorers", price: "From $30", space: "Flushing, Queens", energy: 70 },
  { id: 7, emoji: "🐹", name: "Guinea Pigs", match: "Sweet pair-bonded pets", price: "From $45", space: "Park Slope, Brooklyn", energy: 52 },
  { id: 8, emoji: "🐢", name: "Turtles", match: "Slow and steady friends", price: "From $60", space: "Battery Park City, Manhattan", energy: 42 },
  { id: 9, emoji: "🦦", name: "Ferrets", match: "Playful supervised pets", price: "From $180", space: "Williamsburg, Brooklyn", energy: 88 },
  { id: 10, emoji: "🦎", name: "Reptiles", match: "Quiet terrarium companions", price: "From $120", space: "Pelham Bay, Bronx", energy: 48 },
];

function NYCMap({ theme }) {
  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="220" height="220" fill="transparent" />
      <path d="M78 26 C58 58 50 96 55 138 C58 166 72 188 90 202" fill="none" stroke="rgba(45,120,185,0.25)" strokeWidth="10" strokeLinecap="round" />
      <path d="M144 20 C166 62 172 106 160 158 C156 178 148 194 136 208" fill="none" stroke="rgba(45,120,185,0.22)" strokeWidth="8" strokeLinecap="round" />
      <polygon points="101,20 118,18 132,30 136,52 132,86 127,124 120,160 112,190 103,205 94,188 86,158 78,122 73,84 75,50 84,30" fill="rgba(255,255,255,0.02)" stroke={theme.ring} strokeWidth="1.4" />
      {[38,54,70,86,102,118,134,150,166,182].map((y) => (
        <line key={y} x1="78" y1={y} x2="134" y2={y} stroke="rgba(255,255,255,0.11)" strokeWidth="0.6" />
      ))}
      {[86,94,102,110,118,126].map((x) => (
        <line key={x} x1={x} y1="24" x2={x} y2="198" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      ))}
      <polygon points="88,188 123,188 144,202 133,218 78,216 62,203" fill="rgba(255,255,255,0.015)" stroke={theme.ring} strokeWidth="1" opacity="0.74" />
      <polygon points="137,66 168,58 188,78 190,122 176,150 146,144 133,112" fill="rgba(255,255,255,0.015)" stroke={theme.ring} strokeWidth="1" opacity="0.62" />
      <polygon points="121,18 158,12 178,28 176,58 139,66 132,34" fill="rgba(255,255,255,0.015)" stroke={theme.ring} strokeWidth="1" opacity="0.62" />
      <polygon points="34,156 58,148 76,164 70,194 42,202 24,184" fill="rgba(255,255,255,0.015)" stroke={theme.ring} strokeWidth="1" opacity="0.62" />
      <text x="106" y="110" textAnchor="middle" fill={theme.accent} fontSize="7" fontWeight="800">MANHATTAN</text>
      <text x="164" y="108" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6" fontWeight="700">QUEENS</text>
      <text x="104" y="207" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6" fontWeight="700">BROOKLYN</text>
      <text x="155" y="40" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6" fontWeight="700">BRONX</text>
      <text x="50" y="181" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="5" fontWeight="700">STATEN IS.</text>
      <circle cx="110" cy="111" r="8" fill={theme.accent} opacity="0.2" />
      <circle cx="110" cy="111" r="3" fill={theme.accent} />
    </svg>
  );
}

function CenterBadge({ theme }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "178px",
        height: "178px",
        borderRadius: "50%",
        border: `1px solid ${theme.ring}`,
        background: theme.center,
        boxShadow: `0 0 50px ${theme.glow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <NYCMap theme={theme} />
    </div>
  );
}

export default function PetOrbit({ theme }) {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoRotate) return undefined;

    timerRef.current = setInterval(() => {
      setRotation((prev) => (prev + 0.22) % 360);
    }, 50);

    return () => clearInterval(timerRef.current);
  }, [autoRotate]);

  const getPosition = (index, total) => {
    const angle = ((index / total) * 360 + rotation) % 360;
    const radius = 222;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      opacity: Math.max(0.55, Math.min(1, 0.55 + 0.45 * ((1 + Math.sin(rad)) / 2))),
      zIndex: Math.round(100 + 50 * Math.cos(rad)),
    };
  };

  const handlePetClick = (id) => {
    setActiveId((current) => (current === id ? null : id));
    setAutoRotate(activeId === id);
  };

  return (
    <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "5rem 2rem 4rem", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <p style={{ color: theme.accent, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 800 }}>
          Five-borough pet discovery
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: theme.text, marginBottom: "12px" }}>
          Find a pet near your corner of NYC.
        </h2>
        <p style={{ color: theme.mutedText, fontSize: "15px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
          Explore cats, dogs, birds, fish, rabbits, and more across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "620px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setActiveId(null);
          setAutoRotate(true);
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "444px",
            height: "444px",
            borderRadius: "50%",
            border: `1px solid ${theme.ring}`,
            boxShadow: `0 0 80px ${theme.glow}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: `1px dashed ${theme.faintRing}`,
          }}
        />

        <CenterBadge theme={theme} />

        {HOUSEHOLD_PETS.map((pet, index) => {
          const pos = getPosition(index, HOUSEHOLD_PETS.length);
          const isActive = activeId === pet.id;

          return (
            <div
              key={pet.id}
              onClick={(event) => {
                event.stopPropagation();
                handlePetClick(pet.id);
              }}
              style={{
                position: "absolute",
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isActive ? 250 : pos.zIndex,
                opacity: isActive ? 1 : pos.opacity,
                cursor: "pointer",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                style={{
                  width: isActive ? "68px" : "58px",
                  height: isActive ? "68px" : "58px",
                  borderRadius: "50%",
                  border: `1px solid ${isActive ? theme.accent : theme.ring}`,
                  background: isActive ? theme.accent : theme.node,
                  color: isActive ? theme.accentText : theme.text,
                  boxShadow: isActive ? `0 0 32px ${theme.glowStrong}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isActive ? "28px" : "24px",
                  fontWeight: 900,
                  transition: "all 0.25s ease",
                }}
              >
                {pet.emoji}
              </motion.div>

              <div
                style={{
                  position: "absolute",
                  top: isActive ? "76px" : "66px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: isActive ? theme.accent : theme.softText,
                }}
              >
                {pet.name}
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.94 }}
                    onClick={(event) => event.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: "100px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "230px",
                      padding: "16px",
                      borderRadius: "18px",
                      border: `1px solid ${theme.ring}`,
                      background: theme.popover,
                      boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
                      <span style={{ color: theme.accent, fontSize: "12px", fontWeight: 800 }}>{pet.name}</span>
                      <span style={{ color: theme.text, fontSize: "12px", fontWeight: 700 }}>{pet.price}</span>
                    </div>
                    <p style={{ color: theme.text, fontSize: "15px", fontWeight: 800, margin: "0 0 8px" }}>{pet.match}</p>
                    <p style={{ color: theme.mutedText, fontSize: "13px", lineHeight: 1.55, margin: "0 0 12px" }}>{pet.space}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", color: theme.mutedText, fontSize: "11px", marginBottom: "5px" }}>
                      <span>Energy</span>
                      <span>{pet.energy}%</span>
                    </div>
                    <div style={{ height: "4px", background: theme.track, borderRadius: "999px", overflow: "hidden", marginBottom: "14px" }}>
                      <div style={{ width: `${pet.energy}%`, height: "100%", background: theme.accent, borderRadius: "999px" }} />
                    </div>
                    <Link
                      to="/pets"
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "9px 12px",
                        borderRadius: "999px",
                        background: theme.accent,
                        color: theme.accentText,
                        fontWeight: 800,
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      Browse pets
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", color: theme.dimText, fontSize: "12px", marginTop: "-1.25rem" }}>
        Click a pet type to compare borough availability and care needs.
      </p>
    </section>
  );
}
