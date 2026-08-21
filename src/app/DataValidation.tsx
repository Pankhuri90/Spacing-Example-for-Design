import imgBackArrow  from "/public/assets/back-arrow.svg";
import imgExportIcon from "/public/assets/export-icon.svg";

const bg      = "#f2ebe0";
const ink     = "#1c1410";
const muted   = "#524130";
const faint   = "#7a6a5a";
const wBorder = "rgba(28,20,16,0.12)";
const crimson = "#8c1a2c";
const serif   = "'Playfair Display', serif";
const monoF   = "'DM Mono', monospace";
const sansF   = "'Inter', sans-serif";

interface Props {
  onBack?: () => void;
}

export default function DataValidation({ onBack }: Props) {
  return (
    <div className="min-h-screen relative" style={{ background: bg, color: ink, fontFamily: sansF }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-12 py-5"
        style={{ background: "rgba(242,235,224,0.95)", borderColor: wBorder }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 hover:opacity-60 transition-opacity"
          style={{ color: faint }}
        >
          <img src={imgBackArrow} alt="" className="w-3 h-3" />
          <span className="text-[12px] tracking-[0.18em] uppercase" style={{ fontFamily: monoF, fontWeight: 500 }}>
            Back to Portfolio
          </span>
        </button>
        <span className="text-base" style={{ fontFamily: monoF, letterSpacing: "-0.025em" }}>
          Data validation
        </span>
        <button className="flex items-center gap-2 border px-3 py-1.5 hover:opacity-70 transition-opacity"
          style={{ borderColor: wBorder }}>
          <img src={imgExportIcon} alt="" className="w-[11px] h-[11px]" />
          <span className="text-[12px] tracking-[0.18em] uppercase" style={{ fontFamily: monoF, fontWeight: 500 }}>
            Export PPT
          </span>
        </button>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="border-b px-12 pb-20 pt-32" style={{ borderColor: wBorder }}>
        <div className="max-w-[896px]">
          <p className="text-[16px] tracking-[0.165em] uppercase mb-6"
            style={{ fontFamily: monoF, color: crimson }}>
            Case Study — Data Validation
          </p>
          <h1 className="font-medium mb-8"
            style={{ fontFamily: serif, fontSize: 96, lineHeight: "0.9em", letterSpacing: "-0.025em", color: ink }}>
            Data validation
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-[576px]" style={{ color: muted }}>
            Defining usability KPIs for a product to map and measure its usability over time — giving the team a shared language for quality and a baseline to design against.
          </p>
          <div className="flex gap-2">
            {["User Research", "Usability Testing"].map((t) => (
              <span key={t} className="border px-2.5 py-1 text-[12px] tracking-[0.04em] uppercase whitespace-nowrap"
                style={{ borderColor: wBorder, fontFamily: monoF, color: muted }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Placeholder ────────────────────────────────────────────── */}
      <section className="px-12 py-24">
        <div className="max-w-[704px] ml-[calc(352px+6rem)]">
          <p className="text-base" style={{ color: faint }}>Design content coming soon.</p>
        </div>
      </section>

      <footer className="px-12 py-6 flex justify-between items-center" style={{ borderTop: `1px solid ${wBorder}`, background: "rgba(242,235,224,0.7)" }}>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Case Study 03 · Data Validation</span>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Design foundations</span>
      </footer>

    </div>
  );
}
