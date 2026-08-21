import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";

const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#eff4ff";

// ─── Portfolio design tokens ──────────────────────────────────────────────────
const bg      = "#f2ebe0";
const ink     = "#1c1410";
const muted   = "#524130";
const faint   = "#7a6a5a";
const wBorder = "rgba(28,20,16,0.12)";
const crimson = "#8c1a2c";
const serif   = "'Playfair Display', serif";
const monoF   = "'DM Mono', monospace";
const sansF   = "'Inter', sans-serif";

const BEVERAGES = ["Cappuccino", "Tea", "Latte", "Matcha"];

const BEVERAGE_META: Record<string, string> = {
  Cappuccino: "Half coffee, half milk",
  Tea:        "Half tea, half milk",
  Latte:      "Espresso with steamed milk",
  Matcha:     "Whisked green tea powder",
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function RefCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 py-3 border-b border-black/[0.07] cursor-pointer last:border-0">
      <span
        onClick={onChange}
        className="w-4 h-4 shrink-0 border-2 rounded-sm flex items-center justify-center transition-colors"
        style={{ borderColor: checked ? ACCENT : "#bbb", background: checked ? ACCENT : "white" }}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm text-[#1a1a1a]">{label}</span>
    </label>
  );
}

function RefDropdown({ value, placeholder, onClick }: { value?: string; placeholder: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded border text-sm"
      style={{ background: "#f0f0f0", borderColor: "#e0e0e0", color: value ? "#1a1a1a" : "#999" }}
    >
      <span>{value || placeholder}</span>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function RefButton({ children, variant = "primary", disabled, onClick }: { children: React.ReactNode; variant?: "primary" | "ghost"; disabled?: boolean; onClick?: () => void }) {
  if (variant === "ghost") {
    return (
      <button onClick={onClick} className="px-4 py-2 text-sm font-medium border rounded transition-colors hover:bg-black/5"
        style={{ borderColor: "#d0d0d0", color: "#444" }}>
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 text-sm font-semibold text-white rounded transition-opacity"
      style={{ background: ACCENT, opacity: disabled ? 0.4 : 1 }}
    >
      {children}
    </button>
  );
}

// ─── Form Actions mockup ──────────────────────────────────────────────────────

function FormActionsMockup() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (item: string) =>
    setSelected((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  const handleSave = () => {
    if (!selected.length) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setSelected([]);
    setOpen(false);
  };

  return (
    <div className="h-[320px] bg-white border border-black/10 rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between shrink-0">
        <span className="font-bold text-[15px] text-[#111]">Add Beverage Order</span>
        <button onClick={handleCancel} className="text-black/25 hover:text-black/50 text-lg leading-none transition-colors">×</button>
      </div>
      <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
        <div>
          <label className="block text-xs font-semibold text-[#555] mb-1.5 tracking-wide uppercase">Customer</label>
          <div className="border border-black/10 rounded px-3 py-2.5 text-sm text-[#1a1a1a]" style={{ background: "#f0f0f0" }}>
            Alicia Moreno
          </div>
        </div>
        <div ref={ref}>
          <label className="block text-xs font-semibold text-[#555] mb-1.5 tracking-wide uppercase">Beverages</label>
          <RefDropdown
            placeholder="Choose your selection"
            value={selected.length ? `${selected.join(", ")}` : undefined}
            onClick={() => setOpen((v) => !v)}
          />
          {open && (
            <div className="border border-black/10 rounded-lg px-4 bg-white shadow-sm mt-1">
              {BEVERAGES.map((b) => (
                <RefCheckbox key={b} label={b} checked={selected.includes(b)} onChange={() => toggle(b)} />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1" style={{ background: ACCENT, opacity: 0.3 }} />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: ACCENT }}>↓ Actions below the form</span>
          <div className="h-px flex-1" style={{ background: ACCENT, opacity: 0.3 }} />
        </div>
        <div className="flex justify-end gap-2 border-t border-black/[0.06] pt-2">
          <RefButton variant="ghost" onClick={handleCancel}>Cancel</RefButton>
          <RefButton disabled={!selected.length} onClick={handleSave}>
            {saved ? "✓ Saved" : "Save Order"}
          </RefButton>
        </div>
      </div>
    </div>
  );
}

// ─── Feature Actions mockup ───────────────────────────────────────────────────

const FAVORITES = [
  { name: "Cappuccino",  freq: "Daily",   last: "Today" },
  { name: "Matcha",      freq: "Weekly",  last: "Mon" },
  { name: "Flat White",  freq: "Weekly",  last: "Tue" },
  { name: "Chai Latte",  freq: "Monthly", last: "12 Jul" },
];

function FeatureActionsMockup() {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(1);
  const [venue, setVenue] = useState("");

  const closeModal = () => { setModal(false); setStep(1); setVenue(""); };

  return (
    <div className="relative h-[320px] bg-white border border-black/10 rounded-lg overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-black/[0.08]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1" style={{ background: ACCENT, opacity: 0.3 }} />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: ACCENT }}>↑ Actions top right — starts a new flow</span>
          <div className="h-px flex-1" style={{ background: ACCENT, opacity: 0.3 }} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[15px] text-[#111]">Favourites Dashboard</p>
            <p className="text-xs text-black/35 mt-0.5">Your saved beverage preferences</p>
          </div>
          <RefButton onClick={() => setModal(true)}>+ New Order</RefButton>
        </div>
      </div>

      {/* Favourites table */}
      <div className="px-5 py-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.08]">
              <th className="text-left py-2 font-semibold text-[#111] text-[12px]">Beverage</th>
              <th className="text-left py-2 font-semibold text-[#111] text-[12px]">Frequency</th>
              <th className="text-right py-2 font-semibold text-[#111] text-[12px]">Last ordered</th>
            </tr>
          </thead>
          <tbody>
            {FAVORITES.map((f) => (
              <tr key={f.name} className="border-b border-black/[0.05] last:border-0 hover:bg-[#fafafa] transition-colors">
                <td className="py-2.5 text-[#1a1a1a]">{f.name}</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      background: f.freq === "Daily" ? ACCENT_LIGHT : f.freq === "Weekly" ? "#f0fdf4" : "#f9fafb",
                      color: f.freq === "Daily" ? ACCENT : f.freq === "Weekly" ? "#16a34a" : "#888",
                    }}>
                    {f.freq}
                  </span>
                </td>
                <td className="py-2.5 text-right text-black/40 font-mono text-[11px]">{f.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Order modal — separate flow */}
      {modal && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 rounded-lg">
          <div className="bg-white rounded-lg shadow-xl w-72 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <div>
                <p className="font-bold text-[14px] text-[#111]">New Order</p>
                <p className="text-[10px] text-black/35 font-mono">Step {step} of 2</p>
              </div>
              <button onClick={closeModal} className="text-black/25 hover:text-black/60 transition-colors text-lg leading-none">×</button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {step === 1 ? (
                <>
                  <p className="text-xs font-semibold text-[#555] uppercase tracking-wide">Choose a venue</p>
                  {["The Roast Room", "Bean & Co.", "Morning Grounds"].map((v) => (
                    <label key={v} className="flex items-center gap-3 py-2 cursor-pointer">
                      <span className="w-4 h-4 shrink-0 border-2 rounded-full flex items-center justify-center transition-colors"
                        style={{ borderColor: venue === v ? ACCENT : "#bbb" }}>
                        {venue === v && <span className="w-2 h-2 rounded-full block" style={{ background: ACCENT }} />}
                      </span>
                      <span className="text-sm text-[#1a1a1a]" onClick={() => setVenue(v)}>{v}</span>
                    </label>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-[#555] uppercase tracking-wide">Confirm order</p>
                  <div className="bg-[#f7f7f8] rounded p-3 space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-black/50">Venue</span><span className="text-[#111] font-medium">{venue}</span></div>
                    <div className="flex justify-between"><span className="text-black/50">Beverage</span><span className="text-[#111] font-medium">From favourites</span></div>
                  </div>
                </>
              )}
            </div>
            <div className="px-5 py-3 border-t border-black/[0.06] flex justify-end gap-2">
              <RefButton variant="ghost" onClick={step === 1 ? closeModal : () => setStep(1)}>{step === 1 ? "Cancel" : "Back"}</RefButton>
              <RefButton disabled={step === 1 && !venue} onClick={step === 1 ? () => setStep(2) : closeModal}>
                {step === 1 ? "Next" : "Place Order"}
              </RefButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Variant A: Confirmed selection ──────────────────────────────────────────

function VariantADemo() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string[]>([]);
  const [table, setTable] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const togglePending = (item: string) =>
    setPending((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  const handleAdd = () => {
    setTable((t) => [...new Set([...t, ...pending])]);
    setPending([]);
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="font-bold text-[15px] text-[#111] mb-2">Beverages</p>
        <div className="flex items-start gap-3" ref={ref}>
          <div className="flex-1 relative">
            <RefDropdown
              placeholder="Choose your selection"
              value={pending.length ? `${pending.length} selected` : undefined}
              onClick={() => setOpen((v) => !v)}
            />
            {open && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-lg shadow-lg px-4">
                {BEVERAGES.map((b) => (
                  <RefCheckbox key={b} label={b} checked={pending.includes(b)} onChange={() => togglePending(b)} />
                ))}
              </div>
            )}
          </div>
          <RefButton disabled={pending.length === 0} onClick={handleAdd}>Add</RefButton>
        </div>
        <p className="text-xs text-black/35 mt-1.5">Add your favourite beverages here</p>
      </div>
      <div className="border border-black/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-4 py-3 font-semibold text-[#111] text-[13px]">Beverage</th>
              <th className="text-left px-4 py-3 font-semibold text-[#111] text-[13px]">Description</th>
              <th className="text-right px-4 py-3 font-semibold text-[#111] text-[13px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-black/25 text-sm">No beverages added yet</td>
              </tr>
            ) : (
              table.map((item) => (
                <tr key={item} className="border-b border-black/[0.06] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-4 py-3 text-[#1a1a1a]">{item}</td>
                  <td className="px-4 py-3 text-black/50">{BEVERAGE_META[item]}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setTable((t) => t.filter((x) => x !== item))} className="text-black/25 hover:text-[#dc2626] transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Variant B: Lightweight selection ────────────────────────────────────────

function VariantBDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (item: string) =>
    setSelected((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  return (
    <div className="space-y-3">
      <div>
        <p className="font-bold text-[15px] text-[#111] mb-2">Beverages</p>
        <div ref={ref} className="relative">
          <RefDropdown
            placeholder="Choose your selection"
            value={selected.length ? selected.join(", ") : undefined}
            onClick={() => setOpen((v) => !v)}
          />
          {open && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-lg shadow-lg px-4">
              {BEVERAGES.map((b) => (
                <RefCheckbox key={b} label={b} checked={selected.includes(b)} onChange={() => toggle(b)} />
              ))}
            </div>
          )}
        </div>
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map((item) => (
            <span key={item} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: ACCENT_LIGHT, color: ACCENT }}>
              {item}
              <button onClick={() => toggle(item)} className="opacity-50 hover:opacity-100 transition-opacity leading-none">×</button>
            </span>
          ))}
        </div>
      )}
      <div className="border border-dashed border-black/10 rounded-lg px-4 py-5 text-center mt-[50px]">
        <p className="text-xs text-black/25">No table needed — selections visible above</p>
      </div>
    </div>
  );
}

// ─── Evolved dropdown diagram ─────────────────────────────────────────────────

function DiagramDropdownPanel({
  title, showTable,
}: {
  title: string; showTable: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string[]>([]);
  const [table, setTable] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const togglePending = (item: string) =>
    setPending((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  const handleAdd = () => {
    if (showTable) {
      setTable((t) => [...new Set([...t, ...pending])]);
      setPending([]);
      setOpen(false);
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <p className="font-bold text-[14px] text-[#111] mb-2">{title}</p>
      <div className="flex items-center gap-2 mb-1" ref={ref}>
        <div className="relative flex-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded border text-sm"
            style={{ background: "#f0f0f0", borderColor: open ? ACCENT : "#e0e0e0", color: pending.length ? "#1a1a1a" : "#999" }}
          >
            <span>{pending.length ? `${pending.length} selected` : "Choose your selection"}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {open && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-lg shadow-lg px-4">
              {BEVERAGES.map((b) => (
                <div key={b} onClick={() => togglePending(b)} className="flex items-center gap-3 py-2.5 border-b border-black/[0.07] last:border-0 cursor-pointer">
                  <span className="w-4 h-4 shrink-0 border-2 rounded-sm flex items-center justify-center transition-colors"
                    style={{ borderColor: pending.includes(b) ? ACCENT : "#bbb", background: pending.includes(b) ? ACCENT : "white" }}>
                    {pending.includes(b) && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-[#1a1a1a]">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={pending.length === 0}
          className="px-4 py-2.5 text-sm font-semibold text-white rounded shrink-0 transition-opacity"
          style={{ background: ACCENT, opacity: pending.length === 0 ? 0.4 : 1 }}
        >Add</button>
      </div>
      {showTable && (
        <>
          <p className="text-xs text-black/35 mb-2">Add your favourite beverages here</p>
          <div className="border border-black/10 rounded-lg overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-[#fafafa]">
                  <th className="text-left px-3 py-2 font-semibold text-[#111] text-[12px]">Beverage</th>
                  <th className="text-left px-3 py-2 font-semibold text-[#111] text-[12px]">Description</th>
                  <th className="text-right px-3 py-2 font-semibold text-[#111] text-[12px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {table.length === 0 ? (
                  <tr><td colSpan={3} className="px-3 py-4 text-center text-black/25 text-[12px]">Select beverages and click Add</td></tr>
                ) : (
                  table.map((item) => (
                    <tr key={item} className="border-b border-black/[0.06] last:border-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-3 py-2.5 text-[#1a1a1a] text-[13px]">{item}</td>
                      <td className="px-3 py-2.5 text-black/50 text-[13px]">{BEVERAGE_META[item]}</td>
                      <td className="px-3 py-2.5 text-right">
                        <button onClick={() => setTable((t) => t.filter((x) => x !== item))} className="text-black/25 hover:text-[#dc2626] transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function EvolvedDropdownDiagram() {
  return (
    <div className="grid grid-cols-1">
      <div className="border border-black/10 rounded-xl p-6 bg-[#fafafa]">
        <DiagramDropdownPanel title="Beverages" showTable={true} />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type Page = "home" | "button-placement" | "component-behaviour" | "progressive-disclosure";

export default function App({ onBack }: { onBack?: () => void }) {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen" style={{ background: bg, color: ink, fontFamily: sansF }}>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 flex-wrap" style={{ background: "rgba(242,235,224,0.95)", borderColor: wBorder }}>
        <div className="flex items-center gap-3">
          {onBack && page === "home" && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 transition-colors mr-2" style={{ color: faint }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: monoF }}>Portfolio</span>
            </button>
          )}
          {page !== "home" && (
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-2 transition-colors mr-2" style={{ color: faint }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: monoF }}>Back</span>
            </button>
          )}
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: monoF, color: crimson }}>Design Refactoring</span>
          {page !== "home" && (
            <>
              <span style={{ color: wBorder }}>/</span>
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>
                {page === "button-placement" ? "Button Placement" : page === "component-behaviour" ? "Component Behaviour" : "Progressive Disclosure"}
              </span>
            </>
          )}
        </div>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Case Study 03</span>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-8 sm:space-y-16">

        {page === "home" && (
          <>
            {/* ── Intro ──────────────────────────────────────────────── */}
            <section className="pb-8 border-b" style={{ borderColor: wBorder }}>
              <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: crimson }}>Design Refactoring</p>
              <h1 className="font-medium leading-tight mb-8 max-w-3xl" style={{ fontFamily: serif, fontSize: "clamp(40px,5vw,64px)", color: ink }}>
                The decisions that kept coming back.
              </h1>
              <p className="text-lg max-w-full leading-relaxed mb-4" style={{ color: muted }}>
                While building out an application, we kept hitting the same trivial, recurring decisions — the ones that take up time in every refinement and quietly add up to an inconsistent product.
              </p>
              <p className="text-base max-w-full leading-relaxed" style={{ color: faint }}>
                We had a well established design system, there were also some standard design rules defined at the beginning of the project, but as the functionality of the application grew, the baselines also needed upgrading and these trivial questions kept reappearing.
              </p>
            </section>

            {/* ── Carousel ───────────────────────────────────────────── */}
            <section>
              <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: faint }}>What were these trivial questions?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Card 1 — Button Placement */}
                <button
                  onClick={() => setPage("button-placement")}
                  className="text-left group border p-7 hover:shadow-md transition-all"
                  style={{ borderColor: wBorder, background: "rgba(242,235,224,0.4)" }}
                >
                  <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Button Placement</span>
                  <h2 className="text-xl font-medium mt-3 mb-3 group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif, color: ink }}>
                    In the first few screens, we put buttons at the top.{" "}
                    <span style={{ color: faint }}>Then it became a rule nobody wrote down.</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: muted }}>
                    Early screens were simple — a header, a button, some content. Buttons lived at the top because
                    that's where we put them first. No guidelines were written.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase" style={{ fontFamily: monoF, color: crimson }}>
                    Read more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Card 2 — Component Behaviour */}
                <button
                  onClick={() => setPage("component-behaviour")}
                  className="text-left group border p-7 hover:shadow-md transition-all"
                  style={{ borderColor: wBorder, background: "rgba(242,235,224,0.4)" }}
                >
                  <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Component Behaviour</span>
                  <h2 className="text-xl font-medium mt-3 mb-3 group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif, color: ink }}>
                    Does every multi-select need a confirmation button?{" "}
                    <span style={{ color: faint }}>Probably not. But you should decide.</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: muted }}>
                    We built a multi-select dropdown that adds selections to a table below. It was the right call
                    for a complex feature. Then we started copying that pattern everywhere.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase" style={{ fontFamily: monoF, color: crimson }}>
                    Read more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Card 3 — Progressive Disclosure */}
                <button
                  onClick={() => setPage("progressive-disclosure")}
                  className="text-left group border p-7 hover:shadow-md transition-all"
                  style={{ borderColor: wBorder, background: "rgba(242,235,224,0.4)" }}
                >
                  <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Progressive Disclosure</span>
                  <h2 className="text-xl font-medium mt-3 mb-3 group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif, color: ink }}>
                    Button visibility.{" "}
                    <span style={{ color: faint }}>Show it when it matters, hide it when it doesn't.</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: muted }}>
                    Not every action needs to be visible all the time. Showing buttons only when they become
                    relevant reduces noise and helps users focus on what matters right now.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase" style={{ fontFamily: monoF, color: crimson }}>
                    Read more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </section>
          </>
        )}

        {page === "button-placement" && (
          /* ── Button placement ──────────────────────────────────── */
          <section>
            <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: faint }}>Button Placement</p>
            <h2 className="font-medium leading-tight mb-6 max-w-2xl" style={{ fontFamily: serif, fontSize: "clamp(32px,4vw,48px)", color: ink }}>
              In the first few screens, we put buttons at the top.<br />
              <span style={{ color: faint }}>Then it became a rule nobody wrote down.</span>
            </h2>
            <p className="text-lg max-w-full leading-relaxed mb-4" style={{ color: muted }}>
              Early screens were simple — a header, a button, some content. Buttons lived at the top because
              that's where we put them first. No guidelines were written.
            </p>
            <p className="text-base max-w-full leading-relaxed mb-4" style={{ color: muted }}>
              But over time, every new feature inherited that pattern, and eventually "buttons go on top"
              became an unspoken law. As we started developing more features, a button on the top did not
              always make sense.
            </p>
            <p className="text-base max-w-full leading-relaxed mb-16" style={{ color: muted }}>
              We divided button placement based on the kind of button it is. There are either buttons from
              <strong style={{ color: ink }}> Form Actions</strong> or{" "}
              <strong style={{ color: ink }}>Feature Actions</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 items-stretch">
              {/* Type 1 */}
              <div className="space-y-5 flex flex-col">
                <div>
                  <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Type 1</span>
                  <h3 className="text-xl font-medium mt-1" style={{ fontFamily: serif, color: ink }}>Form Actions</h3>
                  <p className="text-sm mt-0.5" style={{ color: faint }}>Save · Close · Cancel · Submit</p>
                </div>
                <div className="flex gap-3 min-h-[72px]">
                  <div className="w-0.5 self-stretch" style={{ background: crimson }} />
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    These actions are consequences of something the user just filled out. They belong{" "}
                    <em style={{ color: ink }}>below the form</em> — at the natural end of the reading
                    flow. Placing them at the top forces the eye to travel back up after completing the task.
                  </p>
                </div>
                <FormActionsMockup />
              </div>

              {/* Type 2 */}
              <div className="space-y-5 flex flex-col">
                <div>
                  <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Type 2</span>
                  <h3 className="text-xl font-medium mt-1" style={{ fontFamily: serif, color: ink }}>Feature Actions</h3>
                  <p className="text-sm mt-0.5" style={{ color: faint }}>New · Export · Share</p>
                </div>
                <div className="flex gap-3 min-h-[72px]">
                  <div className="w-0.5 self-stretch" style={{ background: crimson }} />
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    These actions operate on a page or trigger a new form when clicked. They are placed on
                    the <em style={{ color: ink }}>top right</em>. That position doesn't compete with
                    content the user is reading.<br />&nbsp;
                  </p>
                </div>
                <FeatureActionsMockup />
              </div>
            </div>

            {/* Revisit reminder */}
            <div className="p-7 flex gap-6 items-start border" style={{ borderColor: `rgba(140,26,44,0.2)`, background: "rgba(140,26,44,0.05)" }}>
              <span className="text-2xl mt-0.5" style={{ fontFamily: monoF, color: crimson }}>↻</span>
              <div>
                <p className="font-medium text-base mb-2" style={{ fontFamily: serif, color: ink }}>
                  Revisit these guidelines on a regular cadence
                </p>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: muted }}>
                  Patterns that made sense at launch can quietly drift out of alignment as the product grows.
                  Schedule a periodic guidelines review — quarterly is a good starting point — to catch
                  placement inconsistencies before they calcify into "the way we always do it."
                </p>
              </div>
            </div>
          </section>
        )}

        {page === "component-behaviour" && (
          /* ── Component behaviour ───────────────────────────────── */
          <section>
            <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: faint }}>Component Behaviour</p>
            <h2 className="font-medium leading-tight mb-6 max-w-2xl" style={{ fontFamily: serif, fontSize: "clamp(32px,4vw,48px)", color: ink }}>
              Does every multi-select need a confirmation button?<br />
              <span style={{ color: faint }}>Probably not. But you should decide.</span>
            </h2>
            <p className="text-lg max-w-full leading-relaxed mb-6" style={{ color: muted }}>
              We built a multi-select dropdown that adds selections to a table below — with descriptions
              and the ability to delete rows. It was the right call for a complex feature where the
              selection list was long and each item carried detail that mattered. Then we started copying
              that pattern everywhere.
            </p>
            <p className="text-base max-w-full leading-relaxed mb-8" style={{ color: muted }}>
              Soon, every dropdown in the app had an Add button next to it, regardless of whether users
              actually needed to confirm their choice.
            </p>

            <div className="mb-12">
              <EvolvedDropdownDiagram />
            </div>

            <h3 className="text-2xl font-medium mb-8" style={{ fontFamily: serif, color: faint }}>
              Defining consistent component behaviour has benefits across the board.
            </h3>

            {/* 3 pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-12" style={{ background: wBorder }}>
              {[
                { who: "Users", icon: "◎", body: "Consistent behaviour builds a mental model. When users know how a component works in one place, they don't have to relearn it in another. Inconsistency creates friction and erodes trust." },
                { who: "Developers", icon: "⬡", body: "Defined variants mean reusable components. Instead of building bespoke versions of the same pattern, the team ships one component with two modes — and every page benefits automatically." },
                { who: "Refinement", icon: "↻", body: "When behaviour is documented, discussions get faster. \"Which variant?\" is a one-sentence question with a one-sentence answer." },
              ].map((p, i) => (
                <div key={p.who} className="p-6 space-y-3" style={{ background: bg }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl" style={{ fontFamily: monoF, color: wBorder }}>{p.icon}</span>
                    <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Easier for</span>
                  </div>
                  <h3 className="font-medium text-lg" style={{ fontFamily: serif, color: ink }}>{p.who}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>{p.body}</p>
                </div>
              ))}
            </div>

            <p className="text-base leading-relaxed max-w-full mb-12" style={{ color: muted }}>
              But it's also true — a confirmation button might be essential in one context because the selection carries real consequence and users need to deliberate. In another context, like choosing beverages, that same button feels like unnecessary friction. You don't have to pick one pattern for everything. You might just need two variants of component behaviour for your application.
            </p>

            {/* Two live demos */}
            <p className="text-[11px] tracking-widest uppercase mb-6" style={{ fontFamily: monoF, color: faint }}>Two variants — try both</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 items-stretch">
              <div className="space-y-5 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Variant A</span>
                    <h3 className="text-xl font-medium mt-1" style={{ fontFamily: serif, color: ink }}>Confirmed Selection</h3>
                  </div>
                  <span className="mt-1 px-2.5 py-1 text-[10px] border" style={{ borderColor: `rgba(140,26,44,0.2)`, color: crimson }}>High-stakes</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-0.5 self-stretch" style={{ background: crimson }} />
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    The user selects items in the dropdown, then explicitly clicks <strong style={{ color: ink }}>Add</strong> to
                    confirm. Each selection appears in a table with its description and a delete action. Use this when
                    the selection is consequential, and you want user to be completely sure of their selection, where the details of each item matter.
                  </p>
                </div>
                <div className="border p-5 bg-white flex-1" style={{ borderColor: wBorder }}>
                  <VariantADemo />
                </div>
              </div>

              <div className="space-y-5 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: monoF, color: faint }}>Variant B</span>
                    <h3 className="text-xl font-medium mt-1" style={{ fontFamily: serif, color: ink }}>Lightweight Selection</h3>
                  </div>
                  <span className="mt-1 px-2.5 py-1 text-[10px] border" style={{ borderColor: "rgba(22,163,74,0.25)", color: "#16a34a" }}>Low-stakes</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-0.5 self-stretch bg-[#16a34a]" />
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    The user picks items directly in the dropdown — selections appear as removable tags
                    immediately, with no Add step in between. Use this when the selection is supplementary,
                    not mission-critical. Ordering a round of beverages, tagging a post, filtering a list.
                    The extra ceremony of Variant A would feel like overkill here.
                  </p>
                </div>
                <div className="border p-5 bg-white flex-1" style={{ borderColor: wBorder }}>
                  <VariantBDemo />
                </div>
              </div>
            </div>

            {/* Decision guide */}
            <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border" style={{ background: "rgba(28,20,16,0.03)", borderColor: wBorder }}>
              <div>
                <p className="font-medium text-base mb-3" style={{ fontFamily: serif, color: ink }}>Use Variant A when…</p>
                <ul className="space-y-2 text-sm" style={{ color: muted }}>
                  {["Each selected item has detail worth displaying", "Users need to confirm before committing", "Selections can be individually reviewed or removed", "The choice has downstream consequences"].map((t) => (
                    <li key={t} className="flex items-start gap-2"><span style={{ color: crimson }} className="mt-0.5 shrink-0">→</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-base mb-3" style={{ fontFamily: serif, color: ink }}>Use Variant B when…</p>
                <ul className="space-y-2 text-sm" style={{ color: muted }}>
                  {["Selection is quick and easily reversible", "Items need no further description", "A confirmation step would feel like friction", "The selection filters or augments — doesn't create"].map((t) => (
                    <li key={t} className="flex items-start gap-2"><span className="text-[#16a34a] mt-0.5 shrink-0">→</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {page === "progressive-disclosure" && (
          /* ── Progressive Disclosure ────────────────────────────── */
          <section>
            <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: faint }}>Progressive Disclosure</p>
            <h2 className="font-medium leading-tight mb-6 max-w-2xl" style={{ fontFamily: serif, fontSize: "clamp(32px,4vw,48px)", color: ink }}>
              Button visibility.<br />
              <span style={{ color: faint }}>Show it when it matters, hide it when it doesn't.</span>
            </h2>
            <p className="text-lg max-w-full leading-relaxed mb-4" style={{ color: muted }}>
              Not every action needs to be visible all the time. Showing buttons only when they become
              relevant reduces noise and helps users focus on what matters right now.
            </p>
            <p className="text-base max-w-full leading-relaxed" style={{ color: muted }}>
              Progressive disclosure is the practice of revealing controls and options only when the context
              calls for them — keeping the interface clean by default and surfacing complexity on demand.
            </p>
          </section>
        )}

        {/* ── Closing quote (home only) ─────────────────────────────── */}
        {page === "home" && (
          <section className="text-center py-12 border-t" style={{ borderColor: wBorder }}>
            <p className="text-[11px] tracking-widest uppercase mb-8" style={{ fontFamily: monoF, color: faint }}>The takeaway</p>
            <blockquote className="font-medium leading-snug max-w-2xl mx-auto" style={{ fontFamily: serif, fontSize: "clamp(24px,3vw,36px)", color: muted }}>
              "A pattern without a <span style={{ color: crimson }}>name</span> is just a habit.<br />
              A named rule is a <span style={{ color: crimson }}>decision</span>."
            </blockquote>
            <p className="text-sm mt-6 max-w-md mx-auto" style={{ color: faint }}>
              The goal isn't uniformity — it's intentionality. Two variants, clearly defined,
              consistently applied, is better than one pattern copied without thought.
            </p>
          </section>
        )}

      </main>

      <footer className="border-t px-4 sm:px-8 py-6 flex justify-between items-center gap-4 flex-wrap" style={{ borderColor: wBorder, background: "rgba(242,235,224,0.7)" }}>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Design Guidelines · Case Study 03</span>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Design foundations</span>
      </footer>
    </div>
  );
}
