import { useState } from "react";

const sections = [
  {
    label: "Identidade do espaço",
    questions: [
      {
        id: "frequencia_uso", text: "Qual é a frequência de uso desse quarto?", multi: false,
        options: [
          { value: "raramente", label: "Raramente", sub: "Ocasiões especiais" },
          { value: "mensal", label: "Mensalmente", sub: "" },
          { value: "frequente", label: "Frequente", sub: "Família/amigos próximos" },
        ], card: true,
      },
      {
        id: "perfil_hospede", text: "Perfil típico de quem vai usar esse espaço?", multi: true,
        options: [
          { value: "casal_adulto", label: "Casal adulto" },
          { value: "familiar_idoso", label: "Familiar idoso" },
          { value: "amigos", label: "Amigos" },
          { value: "criancas", label: "Crianças / sobrinhxs" },
          { value: "variado", label: "Variado" },
        ], other: true,
      },
    ],
  },
  {
    label: "Estética e atmosfera",
    questions: [
      {
        id: "atmosfera", text: "Qual atmosfera você quer criar para quem entra?", multi: false, card: true,
        options: [
          { value: "hotel_boutique", label: "Hotel boutique", sub: "Elegante, impecável", icon: "🏨" },
          { value: "aconchego_casa", label: "Casa acolhedora", sub: "Quente, familiar", icon: "🏠" },
          { value: "minimalista", label: "Minimalista", sub: "Limpo, sem excessos", icon: "▭" },
          { value: "sofisticado_neutro", label: "Sofisticado neutro", sub: "Moderno, atemporal", icon: "◆" },
        ],
      },
      {
        id: "paleta", text: "Paleta de cores — qual direção prefere?", multi: false,
        options: [
          { value: "off_white_bege", label: "Off-white e bege" },
          { value: "cinza_greige", label: "Cinza e greige" },
          { value: "escuro_carbon", label: "Escuro / carbono" },
          { value: "duo_claro_escuro", label: "Contraste claro + escuro" },
          { value: "outro", label: "Outro" },
        ], other: true,
      },
    ],
  },
  {
    label: "Marcenaria e mobiliário",
    questions: [
      {
        id: "painel_cabeceira", text: "Painel/cabeceira — como prefere tratar essa parede?", multi: false,
        options: [
          { value: "ripado_madeira", label: "Ripado em madeira / MDF" },
          { value: "estofado", label: "Painel estofado" },
          { value: "marcenaria_nicho", label: "Marcenaria com nichos" },
          { value: "papel_parede", label: "Papel de parede / textura" },
          { value: "parede_limpa", label: "Parede limpa (pintura)" },
          { value: "aberto", label: "Em aberto / sugestão" },
        ], other: true,
      },
      {
        id: "armazenamento", text: "Onde concentrar o armazenamento?", multi: true,
        options: [
          { value: "guarda_roupa_embutido", label: "Guarda-roupa embutido (piso a teto)" },
          { value: "closet_separado", label: "Closet separado (se houver espaço)" },
          { value: "gavetas_cama", label: "Gaveteiro sob a cama" },
          { value: "bancada_gavetas", label: "Bancada com gavetas" },
          { value: "prateleiras", label: "Prateleiras decorativas" },
        ],
      },
      {
        id: "mobiliario_extra", text: "Além da cama e armário, algum item desejado?", multi: true,
        options: [
          { value: "poltrona", label: "Poltrona / chaise" },
          { value: "escrivaninha", label: "Pequena escrivaninha" },
          { value: "tv", label: "TV / painel de TV" },
          { value: "espelho_corpo", label: "Espelho corpo inteiro" },
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
          { value: "arandelas_cabeceira", label: "Arandelas na cabeceira" },
          { value: "pendente", label: "Pendente(s) decorativo(s)" },
          { value: "fita_led_marcenaria", label: "Fita LED na marcenaria" },
        ],
      },
      { id: "referencias", text: "Tem alguma referência visual que represente bem o que imagina?", type: "textarea", placeholder: "Cole links, descreva imagens ou mencione projetos de referência..." },
      { id: "observacoes", text: "Algo mais que queira comunicar sobre esse espaço?", type: "textarea", placeholder: "Restrições, preocupações, desejos específicos..." },
    ],
  },
];

const ACCENT = "#1A1814";
const ACCENT_LIGHT = "#E8E4DE";
export default function BriefingVisitas() { return <Form sections={sections} accent={ACCENT} accentLight={ACCENT_LIGHT} resumeSub="MDF GRISS · Metais pretos" />; }

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

  const allQ = sections.flatMap(s => s.questions);
  const answered = allQ.filter(q => q.type === "textarea" ? !!(answers[q.id] || "").trim() : (answers[q.id] || []).length > 0).length;

  if (submitted) {
    const lines = [];
    sections.forEach(sec => sec.questions.forEach(q => {
      if (q.type === "textarea") { const v = (answers[q.id] || "").trim(); if (v) lines.push({ label: q.text, value: v }); }
      else {
        const sel = answers[q.id] || [];
        if (sel.length) lines.push({ label: q.text, value: sel.map(v => (v === "outro" || v === "aberto" || v === "variado") && otherTexts[q.id] ? otherTexts[q.id] : q.options.find(o => o.value === v)?.label || v).join(", ") });
      }
    }));
    return <Summary lines={lines} sub={resumeSub} accent={accent} onBack={() => setSubmitted(false)} />;
  }

  return <FormBody sections={sections} answers={answers} otherTexts={otherTexts} toggle={toggle} isSelected={isSelected} answered={answered} total={allQ.length} accent={accent} accentLight={accentLight} setAnswers={setAnswers} setOtherTexts={setOtherTexts} onSubmit={() => setSubmitted(true)} />;
}

function Summary({ lines, sub, accent, onBack }) {
  return (
    <div style={{ background: "#FFF", borderRadius: 8, padding: "2rem", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      <p style={{ fontSize: 11, color: "#9A8F82", margin: "0 0 1.5rem", letterSpacing: "0.04em" }}>{sub}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {lines.map((l, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, padding: "10px 0", borderBottom: "0.5px solid #EDE8E1" }}>
            <span style={{ fontSize: 11, color: "#9A8F82", lineHeight: 1.5 }}>{l.label}</span>
            <span style={{ fontSize: 13, color: "#1A1814", lineHeight: 1.5 }}>{l.value}</span>
          </li>
        ))}
      </ul>
      <button onClick={onBack} style={{ marginTop: 24, background: "transparent", border: `1px solid ${accent}`, borderRadius: 4, padding: "8px 20px", fontSize: 12, color: accent, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>← Editar respostas</button>
    </div>
  );
}

function FormBody({ sections, answers, otherTexts, toggle, isSelected, answered, total, accent, accentLight, setAnswers, setOtherTexts, onSubmit }) {
  const isOtherVal = v => ["outro", "aberto", "variado", "livre"].includes(v);
  return (
    <div style={{ background: "#FFF", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      {/* Progress */}
      <div style={{ background: "#F5F2ED", padding: "8px 1.5rem", display: "flex", alignItems: "center", gap: 10, borderBottom: "0.5px solid #E8E2DA" }}>
        <div style={{ flex: 1, height: 2, background: "#E0DAD2", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: accent, width: `${(answered / total) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 11, color: "#9A8F82", whiteSpace: "nowrap" }}>{answered}/{total} respondidas</span>
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
        <button onClick={onSubmit} style={{ background: accent, color: "#FDF8F2", border: "none", borderRadius: 4, padding: "10px 26px", fontSize: 13, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          Gerar resumo →
        </button>
      </div>
    </div>
  );
}
