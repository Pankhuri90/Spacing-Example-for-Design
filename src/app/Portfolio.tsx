import imgPortfolioPhoto from "/public/assets/portfolio-photo.png";
import imgClearance    from "/public/assets/clearance.png";
import imgDeals        from "/public/assets/deals.png";
import imgWaypoint     from "/public/assets/waypoint.png";
import imgArrowOut     from "/public/assets/arrow-out.svg";
import imgArrow        from "/public/assets/arrow.svg";

const serif   = "'Playfair Display', serif";
const mono    = "'DM Mono', monospace";
const sans    = "'Inter', sans-serif";
const bg      = "#f2ebe0";
const ink     = "#1c1410";
const muted   = "#524130";
const faint   = "#7a6a5a";
const border  = "rgba(28,20,16,0.12)";
const crimson = "#8c1a2c";

function Tag({ label, large }: { label: string; large?: boolean }) {
  return (
    <span
      className="border px-[11px] py-[5px] whitespace-nowrap"
      style={{
        borderColor: border, fontFamily: mono, color: faint,
        fontSize: large ? 16 : 12,
        textTransform: large ? "none" : "capitalize",
        letterSpacing: large ? 0 : "0.03em",
      }}
    >
      {label}
    </span>
  );
}

interface Props {
  onOpenDesignRefactoring: () => void;
  onOpenOpportunityMapping: () => void;
  onOpenDataValidation: () => void;
}

export default function Portfolio({ onOpenDesignRefactoring, onOpenOpportunityMapping, onOpenDataValidation }: Props) {
  return (
    <div style={{ background: bg, fontFamily: sans, color: ink }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 border-b"
        style={{ background: "rgba(242,235,224,0.95)", borderColor: border }}
      >
        <span style={{ fontFamily: mono, fontSize: 16, letterSpacing: "-0.025em" }}>Pankhuri Bedi</span>
        <div className="flex items-center gap-10">
          {["WORK", "ABOUT", "CONTACT"].map((l) => (
            <button key={l} className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.135em" }}>
              {l}
            </button>
          ))}
          <button
            className="border px-4 py-2 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ borderColor: "rgba(28,20,16,0.25)", fontFamily: mono, letterSpacing: "0.135em" }}
          >
            HIRE ME
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-64px)] flex flex-col justify-end px-12 pb-20 pt-32">
        {/* elliptical gradient from top-right, matching Figma gradientTransform matrix */}
        <div className="pointer-events-none absolute top-0 right-0 h-[600px]" style={{ width: "1024px" }}>
          <svg viewBox="0 0 1024 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <radialGradient id="heroGrad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10"
                gradientTransform="matrix(0 -84.853 -144.82 0 1024 0)">
                <stop stopColor="rgba(140,26,44,0.2)" offset="0.44712" />
                <stop stopColor="rgba(140,26,44,0.1)" offset="0.575" />
                <stop stopColor="rgba(140,26,44,0)" offset="0.7" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#heroGrad)" />
          </svg>
        </div>

        <div className="max-w-[1024px] w-full">
          <p className="text-xs tracking-widest uppercase mb-8" style={{ fontFamily: mono, color: "#760b1c", letterSpacing: "0.22em" }}>
            Product designer
          </p>
          <h1 className="font-medium leading-[0.88] tracking-[-0.025em] mb-10"
            style={{ fontFamily: serif, fontSize: "clamp(72px,9vw,132px)", color: ink }}>
            Bringing<br />
            Design into<br />
            Product Development.
          </h1>
          <div className="flex items-end gap-16 flex-wrap">
            <p className="text-base leading-relaxed max-w-[384px]" style={{ color: muted }}>
              Product designer specialising in B2B sales applications and digital transformation — decoding legacy processes and rebuilding them as products that advance both the business and the people using them.
            </p>
            <button
              className="flex items-center gap-3 border px-6 py-4 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity shrink-0"
              style={{ borderColor: "rgba(28,20,16,0.25)", fontFamily: mono, letterSpacing: "0.135em" }}
            >
              VIEW WORK
              <img src={imgArrow} alt="" className="w-3 h-3" />
            </button>
          </div>
        </div>
        {/* right border line */}
        <div className="absolute top-0 right-0 bottom-0 w-px" style={{ background: border }} />
      </section>

      {/* ── About me ───────────────────────────────────────────────── */}
      <section className="px-12 py-24">
        <div className="border-t mb-16 pt-8 flex items-end justify-between" style={{ borderColor: border }}>
          <h2 className="text-5xl font-medium" style={{ fontFamily: serif }}>About me</h2>
          <span className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: mono, color: faint }}>Background</span>
        </div>
        <div className="grid gap-20" style={{ gridTemplateColumns: "465px 1fr" }}>
          {/* Photo */}
          <div className="bg-[#e6dcc8] overflow-hidden">
            <img src={imgPortfolioPhoto} alt="Pankhuri Bedi" className="w-full h-full object-cover" style={{ maxHeight: 575 }} />
          </div>
          {/* Bio */}
          <div className="flex flex-col gap-7">
            <h3 className="text-3xl font-normal leading-snug" style={{ fontFamily: serif }}>
              I bridge the gap between users, engineering, and business strategy.
            </h3>
            <div className="text-base leading-relaxed space-y-4" style={{ color: muted }}>
              <p>I have over 10 years of industry experience. I came into UX four years ago from a security consulting background — which means I'm comfortable with complex systems, stakeholder ambiguity, and problems that don't come with a brief.</p>
              <p>I started with a deep passion for minimalist, intuitive design — and that's still there. But over time I've found discovery and problem solving just as satisfying as the craft of the interface itself. The two are inseparable for me now.</p>
              <p>I follow the Double Diamond — discovery with stakeholders, mapping process workflows, and helping build products that align with user needs, business goals, and what's technically possible. I'm also comfortable building front-end, which means I can take an idea from whiteboard to working prototype without a handoff in between.</p>
              <p>Outside of work, you can call me a craft mom, i have a three old daughter who i try to keep busy with different craft projects — which, if I'm honest, I enjoy just as much as she does.</p>
            </div>
            {/* Location + Philosophy */}
            <div className="border-t pt-6 grid grid-cols-2 gap-6" style={{ borderColor: border }}>
              <div>
                <p className="text-2xl font-normal" style={{ fontFamily: serif }}>Location</p>
                <p className="text-base mt-1" style={{ color: muted }}>Stuttgart</p>
              </div>
              <div>
                <p className="text-2xl font-normal" style={{ fontFamily: serif }}>Philosophy</p>
                <p className="text-base mt-1" style={{ color: muted }}>Empathy + Logic + Reality</p>
              </div>
            </div>
            {/* Tools */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: mono, color: faint }}>Tools</p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "VS Code", "Framer", "Maze", "Notion", "Linear", "Zeplin"].map((t) => (
                  <Tag key={t} label={t} large />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── A peek into how I work ──────────────────────────────────── */}
      <section className="px-12 py-24">
        <div className="border-t mb-16 pt-8" style={{ borderColor: border }}>
          <h2 className="text-5xl font-medium" style={{ fontFamily: serif }}>A peek into how i work</h2>
        </div>
        <div className="flex gap-11 overflow-x-auto pb-2">

          {/* Card 1 — Opportunity mapping */}
          <button
            onClick={onOpenOpportunityMapping}
            className="border shrink-0 w-[400px] overflow-hidden text-left group hover:shadow-lg transition-shadow"
            style={{ borderColor: border }}
          >
            <div className="bg-[#e6dcc8] h-[306px] overflow-hidden">
              <img src={imgClearance} alt="Opportunity mapping" className="w-full h-full object-cover" />
            </div>
            <div className="border-l p-8 flex flex-col gap-4" style={{ borderColor: border }}>
              <h3 className="text-3xl font-medium group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif }}>Opportunity mapping</h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Here is an insight to a workflow i used to help define the product goals, identify requirements via opportunities, facilitated solutioning workshops to define features of the product we were building.
              </p>
              <div className="border-t pt-5 flex gap-2" style={{ borderColor: border }}>
                  {["Strategy", "Double-Diamond", "Facilitation"].map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          </button>

          {/* Card 2 — Design refactoring (navigates to Design Refactoring app) */}
          <button
            onClick={onOpenDesignRefactoring}
            className="border shrink-0 w-[400px] overflow-hidden text-left group hover:shadow-lg transition-shadow"
            style={{ borderColor: border }}
          >
            <div className="bg-[#e6dcc8] h-[306px] overflow-hidden">
              <img src={imgDeals} alt="Design refactoring" className="w-full h-full object-cover" />
            </div>
            <div className="border-l p-8 flex flex-col gap-4" style={{ borderColor: border }}>
              <h3 className="text-3xl font-medium group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif }}>Design refactoring</h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Design, like code also requires refactoring. You always start with some rules and these work well when your application is 5 page wide, but as new functionalities keep adding, the design load often requires refactoring. Here is an insight to how i did it and managed to define guidelines which helped developers and avoided long refinements.
              </p>
              <div className="border-t pt-5 flex gap-2" style={{ borderColor: border }}>
                {["PROTOTYPING", "UI GUIDELINES"].map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          </button>

          {/* Card 3 — Data validation */}
          <button
            onClick={onOpenDataValidation}
            className="border shrink-0 w-[400px] overflow-hidden text-left group hover:shadow-lg transition-shadow"
            style={{ borderColor: border }}
          >
            <div className="bg-[#e6dcc8] h-[284px] overflow-hidden">
              <img src={imgWaypoint} alt="Data validation" className="w-full h-full object-cover" />
            </div>
            <div className="border-l p-8 flex flex-col gap-4" style={{ borderColor: border }}>
              <h3 className="text-3xl font-medium group-hover:text-[#8c1a2c] transition-colors" style={{ fontFamily: serif }}>Data validation</h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Defining usability KPIs for a product to map and measure its usability over time — giving the team a shared language for quality and a baseline to design against.
              </p>
              <div className="border-t pt-5 flex gap-2" style={{ borderColor: border }}>
                {["User Research", "Usability testing"].map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          </button>

        </div>
      </section>

      {/* ── Core competency and services ───────────────────────────── */}
      <section className="px-12 py-24">
        <div className="border-t mb-16 pt-8" style={{ borderColor: border }}>
          <h2 className="text-5xl font-medium" style={{ fontFamily: serif }}>Core competency and services</h2>
        </div>
        <div className="grid grid-cols-3 gap-px" style={{ background: border }}>
          {[
            {
              n: "01", title: "Discovery and validation",
              body: "I aim towards aligning business goals with user needs and technical solutions.\n\nFor active research i rely on interviews, workshops, but i also use AI for passive discovery which enables me with across product/timelines knowledge which helps further in active discovery.\n\nI also look for data to validate problem definitions to design decisions."
            },
            {
              n: "02", title: "Prototyping and design",
              body: "I believe in quick prototyping to visualise ideas out of discovery phase.\n\nFor defining features, i use Figma make to help with ideation. This also help me audit my designs for edge cases and usability issues."
            },
            {
              n: "03", title: "Design thinking",
              body: "Many of the deliverables from designers are workshops or journey or documentation which often get lost in Confluence.\n\nI try my best to define tangible goals from all the activities and try to integrate them into product development so in the end its not just the designs which get picked up but the whole design thinking is integrated into product development."
            },
          ].map((s) => (
            <div key={s.n} className="p-7 flex flex-col gap-5" style={{ background: bg }}>
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: mono, color: crimson }}>{s.n}</p>
              <h3 className="text-xl font-medium" style={{ fontFamily: serif }}>{s.title}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#52525b" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Work history and resume ─────────────────────────────────── */}
      <section className="px-12 py-24">
        <div className="border-t mb-16 pt-8" style={{ borderColor: border }}>
          <h2 className="text-5xl font-medium" style={{ fontFamily: serif }}>Work history and resume</h2>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: "#d8d1c7" }}>
          {[
            {
              dates: "2022 - Present",
              role: "UX/Product Designer",
              company: "Mercedes Benz Tech Innovation",
              body: "Worked in digital transformations project for sales department, touching topics like order validation, stock allocation, discount management. Worked as a UX designer collaboratively with product owner to help refine product requirements to completed design prototypes for dev handoffs."
            },
            {
              dates: "May 2019 - Aug 2022",
              role: "Penetration Tester",
              company: "Mercedes Benz Tech Innovation",
              body: "Worked as a penetration tester testing internal applications to look for security vulnerabilities."
            },
            {
              dates: "Aug 2016 - Aug 2018",
              role: "Security Auditer",
              company: "Sutherland",
              body: "Worked as internal security auditor for ISO 27001, PCI DSS compliance."
            },
          ].map((j) => (
            <div key={j.role} className="flex gap-12 py-8 border-b" style={{ borderColor: "#d8d1c7" }}>
              <p className="shrink-0 w-52 text-base" style={{ fontFamily: mono, color: "#8f8f9b" }}>{j.dates}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold whitespace-nowrap" style={{ fontFamily: serif, color: "#111112" }}>{j.role}</p>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: crimson }} />
                  <p className="text-base whitespace-nowrap" style={{ fontFamily: mono, color: crimson }}>{j.company}</p>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "#52525b" }}>{j.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA footer ─────────────────────────────────────────────── */}
      <section className="border-t flex flex-col items-center text-center py-32 px-12" style={{ borderColor: border }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontFamily: mono, color: crimson }}>
          Get in touch
        </p>
        <h2 className="font-medium leading-none tracking-tight mb-12" style={{ fontFamily: serif, fontSize: "clamp(56px,8vw,111px)", color: ink }}>
          Let's make<br />something together.
        </h2>
        <a
          href="mailto:pankhubedi90@gmail.com"
          className="flex items-center gap-3 border px-8 py-4 text-xs tracking-widest uppercase mb-14 hover:opacity-70 transition-opacity"
          style={{ borderColor: border, fontFamily: mono, letterSpacing: "0.18em" }}
        >
          pankhubedi90@gmail.com
          <img src={imgArrowOut} alt="" className="w-3 h-3" />
        </a>
        <div className="flex gap-8">
          {["LinkedIn", "Dribbble", "Read.cv"].map((l) => (
            <button key={l} className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ fontFamily: mono, color: faint, letterSpacing: "0.15em" }}>
              {l}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
