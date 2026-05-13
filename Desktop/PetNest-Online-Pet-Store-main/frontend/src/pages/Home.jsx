import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Palette } from "lucide-react";
import * as THREE from "three";
import PetCard from "../components/PetCard";
import PetOrbit from "../components/PetOrbit";
import { fetchPets } from "../utils/pets";

const THEMES = {
  night: {
    name: "City Night",
    page: "#070707",
    surface: "rgba(8,8,8,0.94)",
    surfaceSoft: "rgba(17,17,17,0.9)",
    text: "#ffffff",
    softText: "rgba(255,255,255,0.78)",
    mutedText: "rgba(255,255,255,0.58)",
    dimText: "rgba(255,255,255,0.28)",
    accent: "#E8C547",
    accentText: "#070707",
    ring: "rgba(232,197,71,0.34)",
    faintRing: "rgba(255,255,255,0.08)",
    glow: "rgba(232,197,71,0.14)",
    glowStrong: "rgba(232,197,71,0.42)",
    node: "rgba(10,10,10,0.92)",
    center: "radial-gradient(circle, rgba(232,197,71,0.14), rgba(8,8,8,0.96) 66%)",
    popover: "rgba(8,8,8,0.94)",
    track: "rgba(255,255,255,0.12)",
    dots: [
      [232 / 255, 197 / 255, 71 / 255],
      [1, 1, 1],
      [232 / 255, 197 / 255, 71 / 255],
    ],
  },
  meadow: {
    name: "Meadow Glow",
    page: "#09110d",
    surface: "rgba(7,17,12,0.92)",
    surfaceSoft: "rgba(16,31,22,0.9)",
    text: "#fffaf0",
    softText: "rgba(255,250,240,0.78)",
    mutedText: "rgba(255,250,240,0.62)",
    dimText: "rgba(255,250,240,0.34)",
    accent: "#9DD86A",
    accentText: "#07110b",
    ring: "rgba(157,216,106,0.36)",
    faintRing: "rgba(255,250,240,0.1)",
    glow: "rgba(157,216,106,0.14)",
    glowStrong: "rgba(157,216,106,0.42)",
    node: "rgba(8,20,13,0.93)",
    center: "radial-gradient(circle, rgba(157,216,106,0.16), rgba(7,17,12,0.96) 66%)",
    popover: "rgba(7,17,12,0.94)",
    track: "rgba(255,250,240,0.14)",
    dots: [
      [157 / 255, 216 / 255, 106 / 255],
      [232 / 255, 197 / 255, 71 / 255],
      [1, 250 / 255, 240 / 255],
    ],
  },
  sunrise: {
    name: "Sunrise Yard",
    page: "#120c08",
    surface: "rgba(21,12,8,0.92)",
    surfaceSoft: "rgba(35,20,13,0.88)",
    text: "#fff8ed",
    softText: "rgba(255,248,237,0.8)",
    mutedText: "rgba(255,248,237,0.62)",
    dimText: "rgba(255,248,237,0.34)",
    accent: "#FF8A4C",
    accentText: "#160a05",
    ring: "rgba(255,138,76,0.34)",
    faintRing: "rgba(255,248,237,0.1)",
    glow: "rgba(255,138,76,0.16)",
    glowStrong: "rgba(255,138,76,0.42)",
    node: "rgba(25,13,8,0.93)",
    center: "radial-gradient(circle, rgba(255,138,76,0.17), rgba(21,12,8,0.96) 66%)",
    popover: "rgba(21,12,8,0.94)",
    track: "rgba(255,248,237,0.14)",
    dots: [
      [255 / 255, 138 / 255, 76 / 255],
      [232 / 255, 197 / 255, 71 / 255],
      [255 / 255, 248 / 255, 237 / 255],
    ],
  },
  coastal: {
    name: "Coastal Calm",
    page: "#061015",
    surface: "rgba(5,16,22,0.92)",
    surfaceSoft: "rgba(10,30,39,0.9)",
    text: "#f2fbff",
    softText: "rgba(242,251,255,0.8)",
    mutedText: "rgba(242,251,255,0.62)",
    dimText: "rgba(242,251,255,0.34)",
    accent: "#64D2C8",
    accentText: "#041114",
    ring: "rgba(100,210,200,0.34)",
    faintRing: "rgba(242,251,255,0.1)",
    glow: "rgba(100,210,200,0.16)",
    glowStrong: "rgba(100,210,200,0.42)",
    node: "rgba(5,18,24,0.93)",
    center: "radial-gradient(circle, rgba(100,210,200,0.16), rgba(5,16,22,0.96) 66%)",
    popover: "rgba(5,16,22,0.94)",
    track: "rgba(242,251,255,0.14)",
    dots: [
      [100 / 255, 210 / 255, 200 / 255],
      [104 / 255, 162 / 255, 255 / 255],
      [242 / 255, 251 / 255, 255 / 255],
    ],
  },
  berry: {
    name: "Berry Bloom",
    page: "#130911",
    surface: "rgba(20,8,18,0.92)",
    surfaceSoft: "rgba(34,15,31,0.88)",
    text: "#fff5fb",
    softText: "rgba(255,245,251,0.8)",
    mutedText: "rgba(255,245,251,0.62)",
    dimText: "rgba(255,245,251,0.34)",
    accent: "#F06AA6",
    accentText: "#16060f",
    ring: "rgba(240,106,166,0.34)",
    faintRing: "rgba(255,245,251,0.1)",
    glow: "rgba(240,106,166,0.15)",
    glowStrong: "rgba(240,106,166,0.4)",
    node: "rgba(22,9,19,0.93)",
    center: "radial-gradient(circle, rgba(240,106,166,0.16), rgba(20,8,18,0.96) 66%)",
    popover: "rgba(20,8,18,0.94)",
    track: "rgba(255,245,251,0.14)",
    dots: [
      [240 / 255, 106 / 255, 166 / 255],
      [232 / 255, 197 / 255, 71 / 255],
      [255 / 255, 245 / 255, 251 / 255],
    ],
  },
};

const FEATURE_CARDS = [
  { title: "Vet-checked pets", text: "Every animal is reviewed for health, temperament, and care needs before listing." },
  { title: "Home-fit matching", text: "Compare energy, space, and routine so the pet fits your actual day-to-day life." },
  { title: "Care-first listings", text: "Clear details help you choose with confidence, not impulse." },
  { title: "Secure cart", text: "Save your favorites and review everything before moving forward." },
];

function ShaderMesh({ source, uniforms }) {
  const { size } = useThree();
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  const material = useMemo(() => {
    const prepared = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width * 2, size.height * 2) },
    };

    for (const name in uniforms) {
      const uniform = uniforms[name];
      if (uniform.type === "uniform1f" || uniform.type === "uniform1i" || uniform.type === "uniform1fv") {
        prepared[name] = { value: uniform.value };
      }
      if (uniform.type === "uniform3fv") {
        prepared[name] = { value: uniform.value.map((value) => new THREE.Vector3().fromArray(value)) };
      }
    }

    return new THREE.ShaderMaterial({
      vertexShader: "precision mediump float; uniform vec2 u_resolution; out vec2 fragCoord; void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution; fragCoord.y = u_resolution.y - fragCoord.y; }",
      fragmentShader: source,
      uniforms: prepared,
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });
  }, [size.width, size.height, source, uniforms]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function HomeBackground({ theme }) {
  const uniforms = useMemo(
    () => ({
      u_colors: { value: [theme.dots[0], theme.dots[0], theme.dots[1], theme.dots[1], theme.dots[2], theme.dots[2]], type: "uniform3fv" },
      u_opacities: { value: [0.22, 0.26, 0.3, 0.38, 0.45, 0.52, 0.66, 0.74, 0.82, 0.92], type: "uniform1fv" },
      u_total_size: { value: 20, type: "uniform1f" },
      u_dot_size: { value: 3, type: "uniform1f" },
    }),
    [theme],
  );

  const source = `
    precision mediump float;
    in vec2 fragCoord;
    uniform float u_time;
    uniform float u_opacities[10];
    uniform vec3 u_colors[6];
    uniform float u_total_size;
    uniform float u_dot_size;
    uniform vec2 u_resolution;
    out vec4 fragColor;
    float PHI = 1.61803398874989484820459;
    float random(vec2 xy) { return fract(tan(distance(xy*PHI,xy)*0.5)*xy.x); }
    void main() {
      vec2 st = fragCoord.xy;
      st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
      st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));
      float opacity = step(0.0, st.x) * step(0.0, st.y);
      vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
      float show_offset = random(st2);
      float rand = random(st2 * floor((u_time / 5.0) + show_offset + 5.0));
      opacity *= u_opacities[int(rand * 10.0)];
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
      vec3 color = u_colors[int(show_offset * 6.0)];
      float offset_in = distance(u_resolution/2.0/u_total_size, st2) * 0.01 + random(st2) * 0.15;
      opacity *= step(offset_in, u_time * 0.5);
      fragColor = vec4(color, opacity);
      fragColor.rgb *= fragColor.a;
    }
  `;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: theme.page }}>
      <Canvas style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <ShaderMesh source={source} uniforms={uniforms} />
      </Canvas>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center, transparent 0%, ${theme.page} 88%)`, opacity: 0.86 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${theme.page}, transparent 22%, transparent 72%, ${theme.page})` }} />
    </div>
  );
}

function HeroVideo() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "420px", overflow: "hidden", borderRadius: "0 22px 22px 0" }}>
      <video
        src="/videos/pet-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.58), rgba(0,0,0,0.04) 58%, rgba(0,0,0,0.2))" }} />
    </div>
  );
}

function ThemeDock({ activeTheme, setActiveTheme, theme }) {
  const themeKeys = Object.keys(THEMES);
  const currentIndex = themeKeys.indexOf(activeTheme);
  const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];

  return (
    <button
      type="button"
      aria-label={`Change theme. Current theme: ${THEMES[activeTheme].name}`}
      title={`Theme: ${THEMES[activeTheme].name}`}
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

export default function Home() {
  const [activeTheme, setActiveTheme] = useState("night");
  const [featuredPets, setFeaturedPets] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState("");
  const theme = THEMES[activeTheme];

  useEffect(() => {
    let active = true;

    async function loadFeaturedPets() {
      try {
        setFeaturedLoading(true);
        setFeaturedError("");
        const petsData = await fetchPets();
        if (active) setFeaturedPets(petsData.slice(0, 6));
      } catch (err) {
        if (active) setFeaturedError(err.message || "Unable to load featured pets.");
      } finally {
        if (active) setFeaturedLoading(false);
      }
    }

    loadFeaturedPets();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{ background: theme.page, minHeight: "100vh", color: theme.text, overflowX: "hidden" }}>
      <HomeBackground theme={theme} />
      <ThemeDock activeTheme={activeTheme} setActiveTheme={setActiveTheme} theme={theme} />

      <section style={{ width: "100%", minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", zIndex: 1, padding: "7rem 1.5rem 4rem" }}>
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            maxWidth: "1180px",
            minHeight: "560px",
            background: theme.surface,
            borderRadius: "24px",
            border: `1px solid ${theme.faintRing}`,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.92fr) minmax(420px, 1.08fr)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.42)",
          }}
        >
          <div style={{ padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ color: theme.accent, fontSize: "12px", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.3rem" }}>
              NYC-only pet matching
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ fontSize: "clamp(3rem, 6vw, 5.45rem)", fontWeight: 900, lineHeight: 0.98, color: theme.text, margin: "0 0 1.5rem", letterSpacing: 0 }}>
              Find Your<br />Forever<br />Friend.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
              style={{ color: theme.mutedText, fontSize: "16px", lineHeight: 1.75, maxWidth: "390px", margin: "0 0 2rem" }}>
              Browse adoptable and shop-ready companions across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "2rem" }}>
              <Link to="/pets" style={{ background: theme.accent, color: theme.accentText, fontWeight: 900, padding: "13px 28px", borderRadius: "999px", fontSize: "14px", textDecoration: "none" }}>
                Browse Pets
              </Link>
              <Link to="/register" style={{ border: `1px solid ${theme.faintRing}`, color: theme.text, padding: "13px 28px", borderRadius: "999px", fontSize: "14px", textDecoration: "none", fontWeight: 800 }}>
                Create Account
              </Link>
            </motion.div>

          </div>

          <HeroVideo />
        </div>
      </section>

      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "1rem 2rem 4rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: theme.accent, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 800 }}>
              Featured pets
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 850, color: theme.text, margin: 0 }}>
              Meet a few new friends.
            </h2>
          </div>
          <Link to="/pets" style={{ border: `1px solid ${theme.faintRing}`, color: theme.text, padding: "11px 22px", borderRadius: "999px", fontSize: "14px", textDecoration: "none", fontWeight: 800 }}>
            View All
          </Link>
        </div>

        {featuredLoading ? (
          <div style={{ border: `1px solid ${theme.faintRing}`, background: theme.surfaceSoft, borderRadius: "16px", padding: "3rem 1rem", textAlign: "center", color: theme.mutedText }}>
            Loading featured pets...
          </div>
        ) : featuredError ? (
          <div style={{ border: `1px solid ${theme.faintRing}`, background: theme.surfaceSoft, borderRadius: "16px", padding: "3rem 1rem", textAlign: "center", color: "#fca5a5" }}>
            {featuredError}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet, index) => (
              <PetCard key={pet.id} pet={pet} index={index} />
            ))}
          </div>
        )}
      </section>

      <div style={{ position: "relative", zIndex: 1 }}>
        <PetOrbit theme={theme} />
      </div>

      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
        <p style={{ color: theme.accent, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", marginBottom: "12px", fontWeight: 800 }}>
          Why PetNest
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 850, textAlign: "center", color: theme.text, marginBottom: "2.5rem" }}>
          Built for careful NYC pet choices.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {FEATURE_CARDS.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              style={{
                padding: "24px",
                borderRadius: "16px",
                border: `1px solid ${theme.faintRing}`,
                background: theme.surfaceSoft,
                boxShadow: "0 16px 50px rgba(0,0,0,0.22)",
              }}
            >
              <div style={{ width: "34px", height: "3px", background: theme.accent, borderRadius: "999px", marginBottom: "18px" }} />
              <h3 style={{ color: theme.text, fontWeight: 850, fontSize: "16px", marginBottom: "9px" }}>{feature.title}</h3>
              <p style={{ color: theme.mutedText, fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "3rem 2rem 5rem", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            minHeight: "430px",
            borderRadius: "24px",
            border: `1px solid ${theme.ring}`,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: "0 24px 80px rgba(0,0,0,0.34)",
          }}
        >
          <video
            src="/videos/pet-cta.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.62), rgba(0,0,0,0.82))" }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center, ${theme.glowStrong}, transparent 58%)`, opacity: 0.45 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "620px", padding: "3rem 1.5rem" }}>
            <p style={{ color: theme.accent, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 900 }}>
              Ready to find your NYC companion?
            </p>
            <h2 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem", lineHeight: 1.08, textShadow: "0 3px 24px rgba(0,0,0,0.85)" }}>
              Your forever friend<br />is waiting for you.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 2rem", textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>
              Browse healthy, happy pets available around the five boroughs. Each one is ready to join a city home that fits them well.
            </p>
            <Link to="/pets" style={{ display: "inline-block", background: theme.accent, color: theme.accentText, fontWeight: 900, padding: "14px 38px", borderRadius: "999px", fontSize: "14px", textDecoration: "none" }}>
              Browse All Pets
            </Link>
          </div>
        </motion.div>
      </section>

      <footer style={{ borderTop: `1px solid ${theme.faintRing}`, padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1120px", margin: "0 auto", position: "relative", zIndex: 1, color: theme.dimText }}>
        <div style={{ color: theme.text, fontWeight: 900, fontSize: "18px" }}>Pet<span style={{ color: theme.accent }}>Nest</span></div>
        <p style={{ fontSize: "12px" }}>New York City pets only.</p>
        <p style={{ fontSize: "12px" }}>2026 PetNest.</p>
      </footer>
    </div>
  );
}
