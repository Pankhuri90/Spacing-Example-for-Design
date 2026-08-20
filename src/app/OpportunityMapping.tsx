const imgClearance  = "/assets/clearance.png";
const imgBackArrow  = "/assets/back-arrow.svg";
const imgExportIcon = "/assets/export-icon.svg";

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

export default function OpportunityMapping({ onBack }: Props) {
  return (
    <div className="min-h-screen relative" style={{ background: bg, color: ink, fontFamily: sansF }}>

      {/* radial gradient top-right matching Figma */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <radialGradient id="omGrad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10"
              gradientTransform="matrix(0 -84.853 -84.853 0 600 0)">
              <stop stopColor="rgba(140,26,44,0.18)" offset="0" />
              <stop stopColor="rgba(140,26,44,0.06)" offset="0.45" />
              <stop stopColor="rgba(140,26,44,0)" offset="0.7" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#omGrad)" />
        </svg>
      </div>

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
          Opportunity mapping
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
            Case Study — Opportunity Mapping
          </p>
          <h1 className="font-medium mb-8"
            style={{ fontFamily: serif, fontSize: 96, lineHeight: "0.9em", letterSpacing: "-0.025em", color: ink }}>
            Opportunity mapping
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-[576px]" style={{ color: muted }}>
            Enabling product development through double diamond design principles — discovering the real constraints behind the product, defining the right problem, and building a solution that serves both users and the business.
          </p>
          <div className="flex gap-2">
            {["Workshop Facilitation", "Opportunity Mapping", "Product Strategy"].map((t) => (
              <span key={t} className="border px-2.5 py-1 text-[12px] tracking-[0.04em] uppercase whitespace-nowrap"
                style={{ borderColor: wBorder, fontFamily: monoF, color: muted }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width image ────────────────────────────────────────── */}
      <div className="bg-[#e6dcc8] w-full overflow-hidden" style={{ height: 468 }}>
        <img src={imgClearance} alt="Opportunity mapping" className="w-full h-full object-cover" />
      </div>

      {/* ── Section 01 — Context ───────────────────────────────────── */}
      <section className="border-b px-12 py-24" style={{ borderColor: wBorder }}>
        <div className="grid gap-24 max-w-[1152px]" style={{ gridTemplateColumns: "352px 1fr" }}>
          <div className="pt-1">
            <p className="text-[12px] tracking-[0.167em] uppercase mb-2" style={{ fontFamily: monoF, color: faint }}>01</p>
            <p className="text-[16px] tracking-[0.135em] uppercase" style={{ fontFamily: monoF, color: crimson }}>Context</p>
          </div>
          <div>
            <h2 className="font-normal mb-8" style={{ fontFamily: serif, fontSize: 36, lineHeight: "1.1em", color: ink }}>
              Setting the base
            </h2>
            <div className="text-base leading-relaxed space-y-4" style={{ color: muted }}>
              <p>Any company with long legacy has complex of legacy solutions. These solutions evolve from many years of process evolution — layers built on layers, decisions by different teams, under different constraints. Adding to complexity is a product spanning markets, with nuances of each market.</p>
              <p>It is not a simple product with a clear requirements document.</p>
              <p>It is to be understood what the process is, and not let yourself get drowned in the complexity of this process. It is to identify the user's needs align them to the needs of the business and push for a solution which works for both.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 02 — My Work ───────────────────────────────────── */}
      <section className="border-b px-12 py-24" style={{ borderColor: wBorder }}>
        <div className="grid gap-24 max-w-[1152px]" style={{ gridTemplateColumns: "352px 1fr" }}>
          <div className="pt-1">
            <p className="text-[12px] tracking-[0.167em] uppercase mb-2" style={{ fontFamily: monoF, color: faint }}>02</p>
            <p className="text-[16px] tracking-[0.135em] uppercase" style={{ fontFamily: monoF, color: crimson }}>My Work</p>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-normal" style={{ fontFamily: serif, fontSize: 36, lineHeight: "1.1em", color: ink }}>
              Opportunity mapping
            </h2>

            <div className="text-base leading-relaxed space-y-4 text-justify" style={{ color: faint }}>
              <p>Without a requirements document, you are constantly negotiating what the product is. It sounds trivial — but you cannot start product development without first defining what it is trying to achieve. And while that sounds straightforward, it rarely is. In practice, everyone carries their own version of the product goals. Without a shared understanding, that divergence quietly becomes a conflicting vision.</p>
              <p>So we started exactly there — defining product goals with stakeholders and the team together, deliberately in a larger group setting. By doing it collectively, we could align goals across business objectives, user needs, and the technical improvements the product aimed to offer. All three in the same room.</p>
            </div>

            {/* 3-pillar grid */}
            <div className="grid grid-cols-3 gap-px" style={{ background: wBorder }}>
              {[
                { title: "Business goals", body: "Aligned with what the organisation needed to achieve commercially." },
                { title: "User needs",     body: "Grounded in how people actually use the process today." },
                { title: "Technical aims", body: "Accounting for what the product could realistically improve." },
              ].map((p) => (
                <div key={p.title} className="p-7 flex flex-col gap-5" style={{ background: "#d7cbbe" }}>
                  <h3 className="font-medium text-xl" style={{ fontFamily: serif, color: ink }}>{p.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "#52525b" }}>{p.body}</p>
                </div>
              ))}
            </div>

            <div className="text-base leading-relaxed space-y-4 text-justify" style={{ color: faint }}>
              <p>With goals defined, the next step was to map where the process broke down — and where it had potential. I mapped the user journey to surface pain points and gains, which gave me significantly more context than any document could: I could see how different markets operate with slight but meaningful variations, and how different stakeholders relate to the same process in different ways. Due to different stakeholders we even found there are legacy tools which keep track of errors. The errors which we aim to solve via our product. This ended up being one of our KPI monitoring system.</p>
              <p>One unexpected finding: several markets still relied on legacy tools to track errors — the very errors our product aimed to solve. That discovery shaped one of our key KPI monitoring approaches.</p>
              <p>From the journey mapping, we defined a large set of opportunities. These discussions were not always clean or quick — they went deep, sometimes into technical territory, and needed careful facilitation to stay productive. But the more openly people could talk, the more precisely we could frame each opportunity. The depth was the point.</p>
              <p>In the solutioning phase, each opportunity was mapped to a solution capable of closing the gap. Many extended well beyond our team's scope — some spanning multiple teams within the same programme. But that was exactly the value: it brought people together to brainstorm solutions that worked for business, users, and technical constraints equally.</p>
            </div>

            <p className="text-xl leading-relaxed text-justify" style={{ fontFamily: serif, color: ink }}>
              The team already knew what they needed to build. What was not clear — until this process — was the specific problem each part needed to solve.
            </p>

            <p className="text-base leading-relaxed text-justify" style={{ color: faint }}>
              That is the strength of this approach. It lets you see the product through the lens of problem-solving, and creates a shared space where stakeholders can talk openly about what they want to change — and how best to change it.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-12 py-6 flex justify-between items-center" style={{ borderTop: `1px solid ${wBorder}`, background: "rgba(242,235,224,0.7)" }}>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Case Study 01 · Opportunity Mapping</span>
        <span className="text-[11px]" style={{ fontFamily: monoF, color: faint }}>Design foundations</span>
      </footer>

    </div>
  );
}
