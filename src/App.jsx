import { useState, useEffect } from "react";

const ESTADOS_3D = ["Pendiente", "Imprimiendo", "Listo", "Entregado"];
const ESTADOS_AGENCIA = ["Por hacer", "En proceso", "Revisión", "Completado"];
const PRIORIDADES = ["Alta", "Media", "Baja"];
const MATERIALES = ["PLA", "PETG", "ABS", "TPU", "Resina", "Otro"];
const TIPOS_TAREA = ["Redes", "Diseño", "Reporte", "Contenido", "Reunión", "Otro"];

const COLORES_ESTADO_3D = {
  "Pendiente": "#f59e0b", "Imprimiendo": "#3b82f6",
  "Listo": "#10b981", "Entregado": "#6b7280",
};
const COLORES_ESTADO_AG = {
  "Por hacer": "#f59e0b", "En proceso": "#3b82f6",
  "Revisión": "#a855f7", "Completado": "#6b7280",
};
const COLORES_PRIORIDAD = { Alta: "#ef4444", Media: "#f59e0b", Baja: "#10b981" };
const TIPO_COLORS = { Redes: "#06b6d4", Diseño: "#f59e0b", Reporte: "#10b981", Contenido: "#a855f7", Reunión: "#3b82f6", Otro: "#64748b" };

const INITIAL_PEDIDOS = [
  { id: 1, cliente: "Martín G.", pieza: "Soporte para celular", material: "PLA", color: "#ff6b35", estado: "Imprimiendo", prioridad: "Alta", fecha: "2026-05-08", nota: "Escala 1:1" },
  { id: 2, cliente: "Laura V.", pieza: "Figura decorativa", material: "PETG", color: "#a78bfa", estado: "Pendiente", prioridad: "Media", fecha: "2026-05-10", nota: "" },
];
const INITIAL_TAREAS = [
  { id: 1, titulo: "Redactar post para cliente X", cliente: "Agencia Norte", tipo: "Redes", estado: "En proceso", prioridad: "Alta", fecha: "2026-05-07", nota: "Instagram + LinkedIn" },
  { id: 2, titulo: "Informe mensual de métricas", cliente: "Agencia Norte", tipo: "Reporte", estado: "Por hacer", prioridad: "Media", fecha: "2026-05-09", nota: "" },
];

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

const btnBase = {
  border: "none", borderRadius: 8, padding: "8px 18px",
  fontWeight: 700, cursor: "pointer", fontSize: 13,
  fontFamily: "'DM Mono', monospace",
};
const inputStyle = {
  width: "100%", background: "#0d0d1f", border: "1px solid #2a2a4a",
  borderRadius: 8, color: "#e2e8f0", padding: "9px 12px", fontSize: 13,
  outline: "none", boxSizing: "border-box", fontFamily: "'DM Mono', monospace",
};

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}44`,
      borderRadius: 6, padding: "2px 9px", fontSize: 11, fontWeight: 700,
      letterSpacing: 0.4, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: "block", fontSize: 10, color: "#666", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ label, as, children, ...props }) {
  const el = as === "select"
    ? <select {...props} style={inputStyle}>{children}</select>
    : as === "textarea"
    ? <textarea {...props} style={{ ...inputStyle, resize: "vertical", minHeight: 58 }} />
    : <input {...props} style={inputStyle} />;
  return <Field label={label}>{el}</Field>;
}

function Modal({ title, accent, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,5,15,0.85)",
      backdropFilter: "blur(6px)", zIndex: 200,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#13132a", borderTop: `2px solid ${accent}`,
        borderRadius: "20px 20px 0 0", padding: "24px 20px 36px",
        width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 -8px 48px #0009",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#e2e8f0", fontFamily: "'Syne', sans-serif" }}>{title}</span>
          <button onClick={onClose} style={{ background: "#1e1e3a", border: "none", color: "#aaa", fontSize: 16, cursor: "pointer", borderRadius: 8, width: 32, height: 32 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Form3D({ initial, onSave, onClose }) {
  const blank = { cliente: "", pieza: "", material: "PLA", color: "#ff6b35", estado: "Pendiente", prioridad: "Media", fecha: "", nota: "" };
  const [d, setD] = useState(initial ? { ...blank, ...initial } : blank);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const valid = d.cliente.trim() && d.pieza.trim();
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <Input label="CLIENTE" value={d.cliente} onChange={e => set("cliente", e.target.value)} placeholder="Nombre del cliente" />
        <Input label="PIEZA / MODELO" value={d.pieza} onChange={e => set("pieza", e.target.value)} placeholder="¿Qué se imprime?" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 72px", gap: "0 12px" }}>
        <Input label="MATERIAL" as="select" value={d.material} onChange={e => set("material", e.target.value)}>
          {MATERIALES.map(m => <option key={m}>{m}</option>)}
        </Input>
        <Input label="PRIORIDAD" as="select" value={d.prioridad} onChange={e => set("prioridad", e.target.value)}>
          {PRIORIDADES.map(p => <option key={p}>{p}</option>)}
        </Input>
        <Field label="COLOR">
          <input type="color" value={d.color} onChange={e => set("color", e.target.value)}
            style={{ width: "100%", height: 38, background: "#0d0d1f", border: "1px solid #2a2a4a", borderRadius: 8, cursor: "pointer", padding: 3 }} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <Input label="ESTADO" as="select" value={d.estado} onChange
