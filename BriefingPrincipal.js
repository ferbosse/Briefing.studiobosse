import { useState } from "react";

const sections = [
  {
    label: "Identidade do espaço",
    questions: [
      {
        id: "uso_rotina", text: "Além de dormir, quais atividades acontecem nesse quarto?", multi: true,
        options: [
          { value: "ler", label: "Leitura / relaxamento" },
          { value: "trabalho", label: "Trabalho / home office eventual" },
          { value: "tv_series", label: "Assistir TV / séries" },
          { value: "exercicio", label: "Exercício / yoga" },
          { value: "apenas_dormir", label: "Apenas dormir" },
        ],
      },
      {
        id: "quem_usa", text: "O quarto é usado por:", multi: false, card: true,
        options: [
          { value: "casal", label: "Casal", sub: "Dois perfis a conciliar", icon: "👫" },
          { value: "individuo", label: "Individual", sub: "Um perfil dominante", icon: "🧘" },
        ],
      },
    ],
  },
  {
    label: "Estética e atmosfera",
    questions: [
      {
        id: "atmosfera", text: "Qual atmosfera você quer para a suíte principal?", multi: false, card: true,
        options: [
          { value: "resort_luxo", label: "Resort de luxo", sub: "Sofisticado, imponente", icon: "✦" },
          { value: "spa_sereno", label: "Spa sereno", sub: "Calmo, restaurador", icon: "🌿" },
          { value: "moderno_elegante", label: "Moderno elegante", sub: "Atemporal, refinado", icon: "◆" },
          { value: "calor_sofisticado", label: "Calor sofisticado", sub: "Madeira, textura, aconchego", icon: "🪵" },
        ],
      },
      {
        id: "paleta", text: "Paleta de cores — qual direção prefere?", multi: false,
        options: [
          { value: "beton_neutro", label: "Tons do Beton TX (concreto, cinza quente)" },
          { value: "off_white_dourado", label: "Off-white com detalhes dourados" },
          { value: "escuro_elegante", label: "Escuro / carbono com dourado" },
          { value: "bege_caramelo", label: "Bege e caramelo" },
          { value: "outro", label: "Outro" },
        ], other: true,
      },
    ],
  },
  {
    label: "Marcenaria e mobiliário",
    questions: [
      {
        id: "cabeceira", text: "Cabeceira / painel da cama — qual tratamento prefere?", multi: false,
        options: [
          { value: "estofado_alto", label: "Painel estofado alto (até o teto)" },
          { value: "estofado_simples", label: "Painel estofado convencional" },
          { value: "marcenaria_beton", label: "Marcenaria em Beton TX com iluminação" },
          { value: "ripado_integrado", label: "Ripado integrado à marcenaria" },
          { value: "livre", label: "Em aberto — sugestão do escritório" },
        ],
      },
      {
        id: "sapateira", text: "A sapateira — como prefere organizar?", multi: false,
        options: [
          { value: "integrada_guarda_roupa", label: "Integrada ao guarda-roupa / closet" },
          { value: "modulo_separado", label: "Módulo separado com porta" },
          { value: "aberta_nicho", label: "Nicho aberto (exposição decorativa)" },
          { value: "livre", label: "Em aberto — sugestão do escritório" },
        ],
      },
      {
        id: "penteadeira", text: "A penteadeira — como prefere que seja?", multi: false,
        options: [
          { value: "integrada_espelho_iluminado", label: "Integrada com espelho iluminado" },
          { value: "bancada_gavetas", label: "Bancada com gavetas e espelho solto" },
          { value: "composicao_tv", label: "Integrada à composição da TV" },
          { value: "movel_solto", label: "Móvel solto, não embutido" },
          { value: "livre", label: "Em aberto — sugestão do escritório" },
        ],
      },
      {
        id: "armazenamento", text: "Armazenamento — como prefere organizar?", multi: true,
        options: [
          { value: "guarda_roupa_piso_teto", label: "Guarda-roupa piso a teto" },
          { value: "closet_separado", label: "Closet separado (dressing room)" },
          { value: "gavetas_cama", label: "Gaveteiro sob a cama" },
          { value: "muitas_gavetas", label: "Muitas gavetas internas" },
          { value: "prateleiras", label: "Prateleiras decorativas" },
        ],
      },
      {
        id: "mobiliario_extra", text: "Além do essencial, o que mais gostaria de incluir?", multi: true,
        options: [
          { value: "poltrona_canto", label: "Poltrona de leitura / canto" },
          { value: "tv_painel", label: "TV com painel integrado" },
          { value: "espelho_corpo", label: "Espelho corpo inteiro" },
          { value: "bancada_lateral", label: "Bancada / aparador lateral" },
          { value: "nenhum", label: "Não — só o essencial" },
        ],
      },
    ],
  },
  {
    label: "Acabamentos e detalhes",
    questions: [
      {
        id: "puxadores", text: "Puxadores e metais — qual perfil prefere?", multi: false,
        options: [
          { value: "dourado_fosco_fino", label: "Dourado fosco, perfil fino / minimalista" },
          { value: "dourado_escovado_robusto", label: "Dourado escovado, perfil mais robusto" },
          { value: "sem_puxador", label: "Sem puxador (toque ou fresagem)" },
          { value: "livre", label: "Em aberto — coerente com o banheiro" },
        ],
      },
      {
        id: "iluminacao", text: "Iluminação — quais recursos deseja incluir?", multi: true,
        options: [
          { value: "spots_embutidos", label: "Spots embutidos" },
          { value: "sanca_indireta", label: "Sanca com luz indireta" },
          { value: "arandelas_cabeceira", label: "Arandelas na cabeceira" },
          { value: "pendente", label: "Pendente(s) decorativo(s)" },
          { value: "fita_led_marcenaria", label: "Fita LED na marcenaria" },
          { value: "led_penteadeira", label: "Iluminação na penteadeira" },
        ],
      },
      { id: "referencias", text: "Tem alguma referência visual que represente bem o que imagina?", type: "textarea", placeholder: "Cole links, descreva imagens ou mencione projetos de referência..." },
      { id: "observacoes", text: "Algo mais que queira comunicar sobre a suíte principal?", type: "textarea", placeholder: "Restrições, preferências específicas, itens que já possui e serão aproveitados..." },
    ],
  },
];

const ACCENT = "#4A3F35";
const ACCENT_GOLD = "#B8975A";
const ACCENT_LIGHT = "#EDE5D8";

export default function BriefingPrincipal() { return <Form sections={sections} accent={ACCENT} accentGold={ACCENT_GOLD} accentLight={ACCENT_LIGHT} resumeSub="MDF Beton TX Arauco · Metais dourado fosco/escovado" />; }

function Form({ sections, accent, accentGold, accentLight, resumeSub }) {
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
        <button onClick={() => setSubmitted(false)} style={{ marginTop: 24, background: "transparent", border: `1px solid ${accentGold}`, borderRadius: 4, padding: "8px 20px", fontSize: 12, color: accentGold, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Editar respostas</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFF", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ background: "#F5F2ED", padding: "8px 1.5rem", display: "flex", alignItems: "center", gap: 10, borderBottom: "0.5px solid #E8E2DA" }}>
        <div style={{ flex: 1, height: 2, background: "#E0DAD2", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: accentGold, width: `${(answered / allQ.length) * 100}%`, transition: "width 0.3s" }} />
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
                            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", minWidth: 130, textAlign: "left", background: sel ? accentLight : "#FAFAF8", border: sel ? `1.5px solid ${accentGold}` : "0.5px solid #D4CECC", borderRadius: 8, cursor: "pointer", transition: "all 0.15s" }}>
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
                              style={{ padding: "6px 14px", fontSize: 12, background: sel ? accentLight : "#FAFAF8", border: sel ? `1.5px solid ${accentGold}` : "0.5px solid #D4CECC", borderRadius: 20, cursor: "pointer", color: sel ? accent : "#4A4540", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" }}>
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
        <button onClick={() => setSubmitted(true)} style={{ background: accent, color: "#FDF8F2", border: `1px solid ${accentGold}`, borderRadius: 4, padding: "10px 26px", fontSize: 13, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Gerar resumo →</button>
      </div>
    </div>
  );
}
