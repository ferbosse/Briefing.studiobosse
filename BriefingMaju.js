import { useState } from "react";

const sections = [
  {
    label: "Identidade do espaço",
    questions: [
      {
        id: "idade_perfil", text: "Qual a faixa etária da Majú?", multi: false, card: true,
        options: [
          { value: "crianca", label: "Criança", sub: "até 10 anos", icon: "🌈" },
          { value: "pre_adolescente", label: "Pré-adolescente", sub: "11–13 anos", icon: "🎒" },
          { value: "adolescente", label: "Adolescente", sub: "14–17 anos", icon: "🎧" },
          { value: "jovem_adulta", label: "Jovem adulta", sub: "18+ anos", icon: "✨" },
        ],
      },
      {
        id: "personalidade", text: "Como você descreveria a personalidade dela?", multi: true,
        options: [
          { value: "criativa", label: "Criativa / artística" },
          { value: "organizada", label: "Organizada / metódica" },
          { value: "romantica", label: "Romântica / delicada" },
          { value: "despojada", label: "Despojada / moderna" },
          { value: "outro", label: "Outro" },
        ], other: true,
      },
    ],
  },
  {
    label: "Estética e atmosfera",
    questions: [
      {
        id: "atmosfera", text: "Qual atmosfera você quer criar para o quarto dela?", multi: false, card: true,
        options: [
          { value: "aconchegante", label: "Aconchegante", sub: "Quente, envolvente", icon: "🌿" },
          { value: "jovem_moderno", label: "Jovem e moderno", sub: "Limpo, atual", icon: "✦" },
          { value: "romantico", label: "Romântico", sub: "Delicado, suave", icon: "🌸" },
          { value: "criativo", label: "Criativo", sub: "Com personalidade", icon: "🎨" },
        ],
      },
      {
        id: "paleta", text: "Paleta de cores — qual direção prefere?", multi: false,
        options: [
          { value: "bege_nude", label: "Bege e nude" },
          { value: "rosa_terracota", label: "Rosa e terracota" },
          { value: "verde_natural", label: "Verde natural / sage" },
          { value: "azul_calmo", label: "Azul calmo / denim" },
          { value: "neutro_off_white", label: "Neutro off-white" },
          { value: "outro", label: "Outro" },
        ], other: true,
      },
      {
        id: "estilo_referencia", text: "Qual estilo visual mais combina com ela?", multi: false,
        options: [
          { value: "boho_natural", label: "Boho / natural" },
          { value: "escandinavo", label: "Escandinavo / minimalista" },
          { value: "contemporaneo", label: "Contemporâneo / clean" },
          { value: "maximalist", label: "Cheio de vida / maximalist" },
          { value: "outro", label: "Outro" },
        ], other: true,
      },
    ],
  },
  {
    label: "Marcenaria e mobiliário",
    questions: [
      {
        id: "ripado", text: "Onde aplicar o ripado (já aprovado pela cliente)?", multi: false,
        options: [
          { value: "cabeceira", label: "Painel cabeceira" },
          { value: "lateral_escrivaninha", label: "Lateral da escrivaninha" },
          { value: "armario", label: "Frente do armário" },
          { value: "composicao_livre", label: "Composição livre — sugestão do escritório" },
        ],
      },
      {
        id: "escrivaninha_penteadeira", text: "A escrivaninha/penteadeira — como prefere que seja?", multi: false,
        options: [
          { value: "integrada_espelho", label: "Integrada com espelho e iluminação" },
          { value: "bancada_simples", label: "Bancada com gavetas, sem espelho fixo" },
          { value: "flutuante", label: "Bancada flutuante (sem pés)" },
          { value: "movel_solto", label: "Móvel solto (não embutido)" },
          { value: "livre", label: "Em aberto — sugestão do escritório" },
        ],
      },
      {
        id: "armazenamento", text: "Como prefere distribuir o armazenamento?", multi: true,
        options: [
          { value: "guarda_roupa_embutido", label: "Guarda-roupa embutido (piso a teto)" },
          { value: "muitas_gavetas", label: "Muitas gavetas no guarda-roupa" },
          { value: "prateleiras_abertas", label: "Prateleiras abertas decorativas" },
          { value: "nicho_cabeceira", label: "Nichos na cabeceira" },
          { value: "gavetas_escrivaninha", label: "Gavetas na escrivaninha" },
        ],
      },
      {
        id: "mobiliario_extra", text: "Além do essencial, o que mais gostaria de incluir?", multi: true,
        options: [
          { value: "poltrona", label: "Poltrona / puf" },
          { value: "espelho_corpo", label: "Espelho corpo inteiro" },
          { value: "tv", label: "TV / painel de TV" },
          { value: "prateleiras_livros", label: "Prateleiras para livros / objetos" },
          { value: "nenhum", label: "Não — só o essencial" },
        ],
      },
    ],
  },
  {
    label: "Iluminação e detalhes",
    questions: [
      {
        id: "iluminacao", text: "Iluminação — quais recursos deseja incluir?", multi: true,
        options: [
          { value: "spots_embutidos", label: "Spots embutidos" },
          { value: "sanca_indireta", label: "Sanca com luz indireta" },
          { value: "led_ripado", label: "LED integrado ao ripado" },
          { value: "arandelas", label: "Arandelas na cabeceira" },
          { value: "pendente", label: "Pendente decorativo" },
          { value: "led_escrivaninha", label: "Iluminação na escrivaninha" },
        ],
      },
      {
        id: "prateleiras_estilo", text: "As prateleiras — qual estilo prefere?", multi: false,
        options: [
          { value: "madeira_natural", label: "Madeira natural / ripada" },
          { value: "mdf_pintado", label: "MDF pintado (mesma cor do armário)" },
          { value: "metalica", label: "Com suporte metálico aparente" },
          { value: "nicho_embutido", label: "Nicho embutido na parede" },
          { value: "livre", label: "Livre — sugestão do escritório" },
        ],
      },
      { id: "referencias", text: "Tem alguma referência visual que represente bem o que imagina?", type: "textarea", placeholder: "Cole links, descreva imagens ou mencione projetos de referência..." },
      { id: "observacoes", text: "Algo mais que queira comunicar sobre o quarto da Majú?", type: "textarea", placeholder: "Desejos específicos, restrições, itens que ela ama ou detesta..." },
    ],
  },
];

const ACCENT = "#7A6A55";
const ACCENT_LIGHT = "#EDE5DB";

export default function BriefingMaju() { return <Form sections={sections} accent={ACCENT} accentLight={ACCENT_LIGHT} resumeSub="MDF BEIGE · Metais níquel escovado · Ripado integrado" />; }

function Form({ sections, accent, accentLight, resumeSub }) {
  const [answers, setAnswers] = useState({});
  const [otherTexts, setOtherTexts] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id, value, multi) => setAnswers(prev => {
    const cur = prev[id] || [];
    if (!multi) return { ...prev, [id]: cur.includes(value) ? [] : [value] };
    return { ...prev, [id]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
  });
  const isSelected = (id, value) => (answers[id] || []).includes(value);
  const isOtherVal = v => ["outro", "aberto", "variado", "livre"].includes(v);

  const allQ = sections.flatMap(s => s.questions);
  const answered = allQ.filter(q => q.type === "textarea" ? !!(answers[q.id] || "").trim() : (answers[q.id] || []).length > 0).length;

  if (submitted) {
    const lines = [];
    sections.forEach(sec => sec.questions.forEach(q => {
      if (q.type === "textarea") { const v = (answers[q.id] || "").trim(); if (v) lines.push({ label: q.text, value: v }); }
      else { const sel = answers[q.id] || []; if (sel.length) lines.push({ label: q.text, value: sel.map(v => isOtherVal(v) && otherTexts[q.id] ? otherTexts[q.id] : q.options.find(o => o.value === v)?.label || v).join(", ") }); }
    }));
    return (
      <div style={{ background: "#FFF", borderRadius: 8, padding: "2rem", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 11, color: "#9A8F82", margin: "0 0 1.5rem" }}>{resumeSub}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {lines.map((l, i) => (
            <li key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, padding: "10px 0", borderBottom: "0.5px solid #EDE8E1" }}>
              <span style={{ fontSize: 11, color: "#9A8F82", lineHeight: 1.5 }}>{l.label}</span>
              <span style={{ fontSize: 13, color: "#1A1814", lineHeight: 1.5 }}>{l.value}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: 24, background: "transparent", border: `1px solid ${accent}`, borderRadius: 4, padding: "8px 20px", fontSize: 12, color: accent, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Editar respostas</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFF", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ background: "#F5F2ED", padding: "8px 1.5rem", display: "flex", alignItems: "center", gap: 10, borderBottom: "0.5px solid #E8E2DA" }}>
        <div style={{ flex: 1, height: 2, background: "#E0DAD2", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: accent, width: `${(answered / allQ.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 11, color: "#9A8F82", whiteSpace: "nowrap" }}>{answered}/{allQ.length} respondidas</span>
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {sections.map((sec, si) => (
          <div key={si}>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A8F82", marginBottom: "1rem", paddingBottom: 6, borderBottom: "0.5px solid #E8E2DA" }}>{sec.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {sec.questions.map(q => (
                <div key={q.id}>
                  <div style={{ fontSize: 13, color: "#1A1814", marginBottom: 10, lineHeight: 1.5, fontWeight: 500 }}>{q.text}</div>
                  {q.type === "textarea" ? (
                    <textarea value={answers[q.id] || ""} onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))} placeholder={q.placeholder}
                      style={{ width: "100%", minHeight: 80, padding: "10px 12px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#1A1814", background: "#FAFAF8", border: "0.5px solid #D4CECC", borderRadius: 6, resize: "vertical", boxSizing: "border-box", lineHeight: 1.6, outline: "none" }} />
                  ) : q.card ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {q.options.map(opt => {
                        const sel = isSelected(q.id, opt.value);
                        return (
                          <button key={opt.value} onClick={() => toggle(q.id, opt.value, q.multi)}
                            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", minWidth: 130, textAlign: "left", background: sel ? accentLight : "#FAFAF8", border: sel ? `1.5px solid ${accent}` : "0.5px solid #D4CECC", borderRadius: 8, cursor: "pointer", transition: "all 0.15s" }}>
                            {opt.icon && <span style={{ fontSize: 20 }}>{opt.icon}</span>}
                            <span>
                              <span style={{ fontSize: 12, fontWeight: 600, display: "block", color: sel ? accent : "#1A1814" }}>{opt.label}</span>
                              {opt.sub && <span style={{ fontSize: 11, color: "#9A8F82" }}>{opt.sub}</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {q.options.map(opt => {
                          const sel = isSelected(q.id, opt.value);
                          return (
                            <button key={opt.value} onClick={() => toggle(q.id, opt.value, q.multi)}
                              style={{ padding: "6px 14px", fontSize: 12, background: sel ? accentLight : "#FAFAF8", border: sel ? `1.5px solid ${accent}` : "0.5px solid #D4CECC", borderRadius: 20, cursor: "pointer", color: sel ? accent : "#4A4540", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" }}>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {q.other && (answers[q.id] || []).some(isOtherVal) && (
                        <input type="text" value={otherTexts[q.id] || ""} onChange={e => setOtherTexts(p => ({ ...p, [q.id]: e.target.value }))} placeholder="Especifique..."
                          style={{ marginTop: 8, width: "100%", padding: "7px 12px", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#1A1814", background: "#FAFAF8", border: "0.5px solid #D4CECC", borderRadius: 6, boxSizing: "border-box", outline: "none" }} />
                      )}
                      {q.multi && <div style={{ fontSize: 10, color: "#B0A89E", marginTop: 5 }}>Múltipla escolha permitida</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "1rem 1.5rem", borderTop: "0.5px solid #E8E2DA", display: "flex", justifyContent: "flex-end", background: "#F5F2ED" }}>
        <button onClick={() => setSubmitted(true)} style={{ background: accent, color: "#FDF8F2", border: "none", borderRadius: 4, padding: "10px 26px", fontSize: 13, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Gerar resumo →</button>
      </div>
    </div>
  );
}
