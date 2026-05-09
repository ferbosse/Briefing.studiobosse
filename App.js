import { useState } from "react";
import BriefingVisitas from "./BriefingVisitas";
import BriefingMaju from "./BriefingMaju";
import BriefingPrincipal from "./BriefingPrincipal";

const rooms = [
  { id: "visitas", label: "Suíte de Visitas", sub: "MDF Griss · Metais pretos", color: "#1A1814" },
  { id: "maju",    label: "Suíte Majú",       sub: "MDF Beige · Níquel escovado", color: "#7A6A55" },
  { id: "principal", label: "Suíte Principal", sub: "MDF Beton TX · Dourado fosco", color: "#4A3F35" },
];

const S = {
  wrap: { minHeight: "100vh", background: "#F8F6F2", fontFamily: "'DM Sans', sans-serif" },
  header: {
    background: "#1A1814", padding: "1.5rem 2rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 1px 12px rgba(0,0,0,0.18)"
  },
  logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#F5F0E8", fontWeight: 400, letterSpacing: "0.08em" },
  logoSub: { fontSize: 11, color: "#7A6A55", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 },
  client: { fontSize: 12, color: "#6B6055", textAlign: "right" },
  tabs: { display: "flex", gap: 0, borderBottom: "1px solid #E8E2DA", background: "#FFF", overflowX: "auto" },
  tab: (active, color) => ({
    padding: "14px 24px", fontSize: 13, cursor: "pointer", border: "none",
    background: active ? "#FFF" : "transparent",
    borderBottom: active ? `2px solid ${color}` : "2px solid transparent",
    color: active ? color : "#9A8F82", fontFamily: "'DM Sans', sans-serif",
    fontWeight: active ? 500 : 400, transition: "all 0.2s", whiteSpace: "nowrap",
    marginBottom: -1,
  }),
  body: { maxWidth: 680, margin: "2.5rem auto", padding: "0 1.5rem 4rem" },
};

export default function App() {
  const [active, setActive] = useState("visitas");
  const room = rooms.find(r => r.id === active);

  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <div>
          <div style={S.logo}>Studio Bosse</div>
          <div style={S.logoSub}>Arquitetura & Interiores</div>
        </div>
        <div style={S.client}>
          <div style={{ color: "#F5F0E8", fontSize: 13, fontWeight: 500 }}>Projeto Karine</div>
          <div style={{ color: "#6B6055", fontSize: 11, marginTop: 2 }}>Briefing de Quartos</div>
        </div>
      </header>

      <nav style={S.tabs}>
        {rooms.map(r => (
          <button key={r.id} style={S.tab(active === r.id, r.color)} onClick={() => setActive(r.id)}>
            {r.label}
          </button>
        ))}
      </nav>

      <main style={S.body}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#1A1814", margin: 0 }}>
            {room.label}
          </h1>
          <p style={{ fontSize: 12, color: "#9A8F82", margin: "4px 0 0", letterSpacing: "0.04em" }}>{room.sub}</p>
        </div>

        {active === "visitas"   && <BriefingVisitas />}
        {active === "maju"      && <BriefingMaju />}
        {active === "principal" && <BriefingPrincipal />}
      </main>

      <footer style={{ textAlign: "center", padding: "1.5rem", fontSize: 11, color: "#C4B8A8", borderTop: "0.5px solid #E8E2DA", background: "#FFF" }}>
        Studio Bosse · Uso interno · Projeto Karine
      </footer>
    </div>
  );
}
