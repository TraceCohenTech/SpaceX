"use client";

import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ComposedChart,
} from "recharts";

// ─── DATA (fact-checked March 2026) ──────────────────────────────────

const launchData = [
  { year: "'06", launches: 1, landings: 0 }, { year: "'07", launches: 1, landings: 0 },
  { year: "'08", launches: 2, landings: 0 }, { year: "'09", launches: 1, landings: 0 },
  { year: "'10", launches: 2, landings: 0 }, { year: "'12", launches: 2, landings: 0 },
  { year: "'13", launches: 3, landings: 0 }, { year: "'14", launches: 6, landings: 0 },
  { year: "'15", launches: 7, landings: 1 }, { year: "'16", launches: 8, landings: 5 },
  { year: "'17", launches: 18, landings: 14 }, { year: "'18", launches: 21, landings: 17 },
  { year: "'19", launches: 13, landings: 11 }, { year: "'20", launches: 26, landings: 23 },
  { year: "'21", launches: 31, landings: 29 }, { year: "'22", launches: 61, landings: 58 },
  { year: "'23", launches: 98, landings: 88 }, { year: "'24", launches: 134, landings: 126 },
  { year: "'25", launches: 167, landings: 160 },
];

const revenueData = [
  { year: "2020", starlink: 0.05, launch: 1.95 },
  { year: "2021", starlink: 0.5, launch: 1.8 },
  { year: "2022", starlink: 2.5, launch: 2.1 },
  { year: "2023", starlink: 5.5, launch: 3.2 },
  { year: "2024", starlink: 7.5, launch: 5.6 },
  { year: "2025", starlink: 10.6, launch: 4.9 },
  { year: "2026E", starlink: 15.0, launch: 5.0 },
];

const valuationData = [
  { date: "2012", valuation: 2.4 }, { date: "2015", valuation: 12 },
  { date: "2019", valuation: 33 }, { date: "2020", valuation: 46 },
  { date: "2021", valuation: 100 }, { date: "Q1 '23", valuation: 137 },
  { date: "H1 '23", valuation: 150 }, { date: "H2 '23", valuation: 180 },
  { date: "H1 '24", valuation: 210 }, { date: "H2 '24", valuation: 350 },
  { date: "IPO '26", valuation: 1500 },
];

const starlinkGrowth = [
  { year: "2020", satellites: 1020, subscribers: 0.01 },
  { year: "2021", satellites: 2040, subscribers: 0.15 },
  { year: "2022", satellites: 3900, subscribers: 1.0 },
  { year: "2023", satellites: 5700, subscribers: 2.3 },
  { year: "2024", satellites: 7500, subscribers: 4.6 },
  { year: "2025", satellites: 10000, subscribers: 9.2 },
  { year: "2026E", satellites: 14000, subscribers: 17 },
];

const marketShareData = [
  { year: "2020", spacex: 23, rest: 77 }, { year: "2021", spacex: 21, rest: 79 },
  { year: "2022", spacex: 33, rest: 67 }, { year: "2023", spacex: 44, rest: 56 },
  { year: "2024", spacex: 52, rest: 48 },
];

const costComparison = [
  { vehicle: "Starship", cost: 10, costPerKg: 67 },
  { vehicle: "Falcon 9", cost: 28, costPerKg: 1228 },
  { vehicle: "F. Heavy", cost: 97, costPerKg: 1520 },
  { vehicle: "Ariane 6", cost: 100, costPerKg: 4630 },
  { vehicle: "Vulcan", cost: 110, costPerKg: 4044 },
  { vehicle: "New Glenn", cost: 75, costPerKg: 1667 },
];

const competitorData = [
  { name: "SpaceX", launches2024: 134, launches2025: 167, revenue: 15.5, valuation: 1500, reuse: 95 },
  { name: "Rocket Lab", launches2024: 16, launches2025: 20, revenue: 0.5, valuation: 12, reuse: 10 },
  { name: "Blue Origin", launches2024: 1, launches2025: 4, revenue: 0.2, valuation: 15, reuse: 5 },
  { name: "ULA", launches2024: 3, launches2025: 5, revenue: 3.0, valuation: 0, reuse: 0 },
  { name: "Arianespace", launches2024: 4, launches2025: 6, revenue: 1.5, valuation: 0, reuse: 0 },
];

const ipoCompsData = [
  { name: "SpaceX", multiple: 97, type: "target" },
  { name: "Rivian", multiple: 90, type: "ipo" },
  { name: "Palantir", multiple: 55, type: "current" },
  { name: "RKLB", multiple: 28, type: "current" },
  { name: "Aramco", multiple: 18, type: "ipo" },
  { name: "Uber", multiple: 8, type: "ipo" },
];

const boosterReuse = [
  { booster: "B1067", flights: 33 },
  { booster: "B1061", flights: 25 },
  { booster: "B1062", flights: 23 },
  { booster: "B1060", flights: 22 },
  { booster: "B1058", flights: 21 },
  { booster: "B1069", flights: 20 },
];

const radarData = [
  { subject: "Launch Rate", SpaceX: 100, BlueOrigin: 5, RocketLab: 12 },
  { subject: "Reusability", SpaceX: 95, BlueOrigin: 20, RocketLab: 15 },
  { subject: "Revenue", SpaceX: 100, BlueOrigin: 2, RocketLab: 5 },
  { subject: "Payload", SpaceX: 100, BlueOrigin: 35, RocketLab: 2 },
  { subject: "Crew", SpaceX: 100, BlueOrigin: 15, RocketLab: 0 },
  { subject: "Satellites", SpaceX: 100, BlueOrigin: 5, RocketLab: 0 },
];

const milestones = [
  { year: "2002", event: "Founded", desc: "Elon Musk invests $100M to start SpaceX" },
  { year: "2008", event: "First Orbit", desc: "Falcon 1 — first private liquid rocket to orbit" },
  { year: "2012", event: "ISS Docking", desc: "Dragon docks with the International Space Station" },
  { year: "2015", event: "First Landing", desc: "Falcon 9 booster lands upright for the first time" },
  { year: "2017", event: "First Reflight", desc: "Orbital-class booster reused — proving reuse economics" },
  { year: "2018", event: "Falcon Heavy", desc: "Tesla Roadster launched toward Mars orbit" },
  { year: "2020", event: "Crew to ISS", desc: "Demo-2: First commercial crewed orbital flight" },
  { year: "2021", event: "Inspiration4", desc: "First all-civilian orbital mission in history" },
  { year: "2023", event: "Starship Flies", desc: "Most powerful rocket ever lifts off from Starbase" },
  { year: "2024", event: "Tower Catch", desc: "Super Heavy caught by Mechazilla chopstick arms" },
  { year: "2025", event: "167 Launches", desc: "Shatters own record — a launch every 2.2 days" },
  { year: "2026", event: "IPO", desc: "Targeting $1.5T — the largest IPO in history" },
];

const vehicleFleet = [
  { name: "Falcon 9", type: "Medium-Lift", height: "70m", payload: "22,800 kg", engines: "9 Merlin", reuses: "33x record", launches: "430+", color: "#3b82f6" },
  { name: "Falcon Heavy", type: "Heavy-Lift", height: "70m", payload: "63,800 kg", engines: "27 Merlin", reuses: "Side boosters", launches: "12", color: "#22d3ee" },
  { name: "Starship", type: "Super Heavy-Lift", height: "121m", payload: "150,000+ kg", engines: "33 Raptor", reuses: "Full (goal)", launches: "7 IFTs", color: "#f97316" },
  { name: "Dragon", type: "Crew & Cargo", height: "8.1m", payload: "6,000 kg", engines: "SuperDraco", reuses: "Multi-flight", launches: "55+", color: "#10b981" },
];

const govContracts = [
  { name: "Commercial Crew", value: 4.9, agency: "NASA" },
  { name: "Artemis HLS", value: 4.0, agency: "NASA" },
  { name: "NSSL Phase 2", value: 4.0, agency: "Space Force" },
  { name: "CRS Cargo", value: 3.0, agency: "NASA" },
  { name: "Starshield", value: 1.8, agency: "DoD" },
];

const C = {
  blue: "#3b82f6", cyan: "#22d3ee", orange: "#f97316", green: "#10b981",
  red: "#ef4444", yellow: "#eab308", muted: "#94a3b8", dim: "#475569",
  grid: "rgba(59,130,246,0.08)",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function Tip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-slate-900/95 border border-blue-500/20 rounded-lg px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="text-white font-medium text-sm mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{ color: e.color }} className="text-xs">
          {e.name}: <span className="font-bold">{e.value}</span>
        </p>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function Section({ title, sub, children, id }: { title: string; sub?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{title}</h2>
        {sub && <p className="text-slate-400 text-sm md:text-base max-w-2xl">{sub}</p>}
        <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>
      {children}
    </section>
  );
}

function ChartNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-slate-500 mt-3 leading-relaxed">{children}</p>;
}

// ─── MAIN ────────────────────────────────────────────────────────────

export default function SpaceXDashboard() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <div className="hero-section">
        <img src="https://i.redd.it/2r38gq2b2bg31.jpg" alt="SpaceX rocket launch" className="hero-bg" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
          <div className="fade-in-up delay-1">
            <span className="tag mb-6 sm:mb-8 inline-block">June 2026 — IPO Filing Imminent</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 sm:mb-6 fade-in-up delay-2 text-glow">
            <span className="gradient-text">SPACEX</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light tracking-wide mb-2 fade-in-up delay-3">
            THE ROAD TO
          </p>
          <p className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 fade-in-up delay-4">
            <span className="gradient-text">$1.5 TRILLION</span>
          </p>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto fade-in-up delay-5">
            The largest IPO in history. From a garage in El Segundo to the most valuable company to ever go public.
          </p>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 z-10 fade-in-up delay-6">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-cyan-400/40 mx-auto mb-2" />
          <p className="text-[9px] text-cyan-400/50 tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </div>

      {/* ══════ KEY METRICS ══════ */}
      <div className="border-y border-blue-500/10 bg-slate-950/60 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            { value: "$1.5T", label: "IPO Valuation", color: C.cyan },
            { value: "$75B", label: "Target Raise", color: C.blue },
            { value: "530+", label: "Orbital Launches", color: C.blue },
            { value: "9.2M", label: "Starlink Subs", color: C.green },
            { value: "$15.5B", label: "2025 Revenue", color: C.orange },
            { value: "550+", label: "Booster Landings", color: C.cyan },
          ].map((s, i) => (
            <div key={i} className="stat-card pulse-glow p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.12em] text-slate-500 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ IPO OVERVIEW ══════ */}
      <Section title="IPO Overview" sub="SpaceX is preparing to file for the largest public offering in history, targeting a June 2026 listing">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Target Valuation", value: "$1.5 — $1.75T", desc: "Most valuable IPO ever, surpassing Saudi Aramco's $1.7T debut in 2019", color: C.cyan },
            { label: "Capital Raise", value: "$50 — $75B", desc: "Floating ~3.3% of equity. Funding Starship scale-up, Starlink expansion, and space-based data centers", color: C.blue },
            { label: "Timeline", value: "June 2026", desc: "Mid-June target when Jupiter and Venus align — weeks before Musk turns 55", color: C.green },
            { label: "2025 Revenue", value: "$15.5B", desc: "Starlink drove $10.6B (68% of total) with 54% EBITDA margins", color: C.orange },
            { label: "2025 EBITDA", value: "$7.5B", desc: "Company-wide profitability driven by Starlink's $5.8B EBITDA contribution", color: C.yellow },
            { label: "Starlink Subs", value: "9.2M", desc: "Doubled subscriber base two consecutive years. Analysts project 17M+ by end of 2026", color: C.cyan },
          ].map((item, i) => (
            <div key={i} className="ipo-card">
              <div className="text-[10px] tracking-[0.12em] uppercase mb-3" style={{ color: item.color }}>{item.label}</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">{item.value}</div>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ LAUNCHES ══════ */}
      <Section title="Launch History" sub="SpaceX's exponential launch cadence is the clearest proof of its operational dominance. The blue bars show total orbital launches per year, while the cyan line tracks successful booster landings — note how tightly the two converge as landing reliability approaches 98%.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart data={launchData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} interval={0} />
              <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
              <Bar dataKey="launches" name="Total Launches" fill={C.blue} radius={[3, 3, 0, 0]} />
              <Line type="monotone" dataKey="landings" name="Successful Landings" stroke={C.cyan} strokeWidth={2.5} dot={{ fill: C.cyan, r: 2.5 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartNote>2025 reflects 167 launches (full year) — a new record and a launch every ~2.2 days. SpaceX now conducts more orbital launches than every other country and company on Earth combined.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ REVENUE ══════ */}
      <Section title="Revenue Trajectory" sub="Two charts tell the IPO story: Starlink's takeover of revenue (left) and the parabolic valuation growth leading to the $1.5T target (right).">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Revenue Breakdown ($B)</h3>
            <p className="text-xs text-slate-600 mb-4">Stacked area chart: cyan shows Starlink revenue, blue shows launch services. Starlink surpassed launch revenue in 2023 and now drives 68% of the total.</p>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="gStar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.cyan} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.cyan} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLaunch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Area type="monotone" dataKey="starlink" name="Starlink" stackId="1" stroke={C.cyan} fill="url(#gStar)" strokeWidth={2} />
                <Area type="monotone" dataKey="launch" name="Launch Services" stackId="1" stroke={C.blue} fill="url(#gLaunch)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <ChartNote>Revenue estimates from Bloomberg, Sacra, and Payload Space. 2026E based on Quilty Space forecast of ~$20B.</ChartNote>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Valuation Growth ($B)</h3>
            <p className="text-xs text-slate-600 mb-4">Each point represents a funding round or tender offer. Note the hockey-stick from $350B (Dec 2024) to the $1.5T IPO target — a 4.3x jump.</p>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="gVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.orange} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={C.orange} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="date" stroke={C.dim} tick={{ fill: C.muted, fontSize: 9 }} angle={-35} textAnchor="end" height={55} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="valuation" name="Valuation ($B)" stroke={C.orange} strokeWidth={2.5} fill="url(#gVal)" />
              </AreaChart>
            </ResponsiveContainer>
            <ChartNote>Valuation based on secondary tender offers and reported round pricing. IPO target per Bloomberg/FT reporting.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STARLINK ══════ */}
      <div className="relative">
        <img src="https://live.staticflickr.com/65535/53378726498_e55a2b2f9e_k.jpg" alt="Starlink" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
        <div className="relative">
          <Section title="Starlink" sub="The world's largest satellite constellation and the primary revenue engine behind the IPO. Starlink has doubled its subscriber base for two consecutive years and shows no signs of slowing.">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { val: "9.2M", label: "Subscribers", sub: "Doubled 2 years running", color: C.green },
                { val: "$10.6B", label: "2025 Revenue", sub: "68% of SpaceX total", color: C.cyan },
                { val: "54%", label: "EBITDA Margin", sub: "$5.8B in 2025", color: C.orange },
                { val: "150+", label: "Countries", sub: "Direct-to-cell coming", color: C.blue },
              ].map((s, i) => (
                <div key={i} className="stat-card pulse-glow p-4 sm:p-6 text-center bg-black/60 backdrop-blur-md">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.12em] text-slate-400 uppercase mb-0.5">{s.label}</div>
                  <div className="text-xs text-slate-600">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="card bg-black/50 backdrop-blur-md p-4 sm:p-6">
                <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Constellation Size</h3>
                <p className="text-xs text-slate-600 mb-4">Total Starlink satellites launched per year. SpaceX surpassed 10,000 satellites in orbit in October 2025 — more than all other operators combined.</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={starlinkGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                    <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                    <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="satellites" name="Satellites" fill={C.cyan} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="card bg-black/50 backdrop-blur-md p-4 sm:p-6">
                <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Subscriber Growth (Millions)</h3>
                <p className="text-xs text-slate-600 mb-4">Active paying subscribers. The curve doubled from 4.6M (end 2024) to 9.2M (end 2025). Analysts project 17M+ by end of 2026.</p>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={starlinkGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                    <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                    <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
                    <Tooltip content={<Tip />} />
                    <Line type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={C.green} strokeWidth={3} dot={{ fill: C.green, r: 4, strokeWidth: 2, stroke: "#000" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <div className="accent-rule" />

      {/* ══════ VEHICLE FLEET ══════ */}
      <Section title="Vehicle Fleet" sub="Four vehicles powering humanity's expansion into space. Hover each card for details. Falcon 9 is the workhorse; Starship is the future.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {vehicleFleet.map((v, i) => (
            <div key={i} className="card p-5 sm:p-6 group" style={{ borderColor: `${v.color}15` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{v.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ color: v.color, background: `${v.color}18` }}>{v.type}</span>
              </div>
              <div className="space-y-2.5 text-sm">
                {([["Height", v.height], ["Payload", v.payload], ["Engines", v.engines], ["Reuse", v.reuses], ["Missions", v.launches]] as [string, string][]).map(([label, val], j) => (
                  <div key={j} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-300 font-medium">{val}</span>
                  </div>
                ))}
              </div>
              <div className="h-[2px] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, ${v.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ BOOSTER REUSE ══════ */}
      <Section title="Reuse Leaderboard" sub="Each bar represents the number of times a single Falcon 9 first-stage booster has flown and landed. B1067 holds the record at 33 flights — proving that orbital-class rockets can be reflown like aircraft.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boosterReuse} layout="vertical" margin={{ left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis type="category" dataKey="booster" stroke={C.dim} tick={{ fill: C.muted, fontSize: 12 }} width={50} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="flights" name="Flights" radius={[0, 4, 4, 0]}>
                {boosterReuse.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? C.cyan : i === 1 ? C.blue : `rgba(59,130,246,${0.6 - i * 0.08})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ChartNote>Every reflight amortizes the ~$60M booster cost further, driving Falcon 9 marginal launch costs to an estimated $15M — a fraction of any competitor.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ COST ══════ */}
      <Section title="Cost Revolution" sub="These charts show why SpaceX dominates: cost per launch (left) and cost per kilogram to low Earth orbit (right). Green bars are SpaceX vehicles, blue are SpaceX legacy, orange/red are competitors.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Cost Per Launch ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Internal cost for SpaceX (reusable). List price for competitors. Starship target is $10M fully reusable.</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="vehicle" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="cost" name="Cost ($M)" radius={[3, 3, 0, 0]}>
                  {costComparison.map((e, i) => (
                    <Cell key={i} fill={e.vehicle.includes("Starship") ? C.green : e.vehicle.includes("Falcon") || e.vehicle.includes("F.") ? C.blue : C.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Cost Per kg to LEO ($)</h3>
            <p className="text-xs text-slate-600 mb-4">The metric that matters for satellite economics. Starship at $67/kg would be a 100x reduction from the Space Shuttle era.</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="vehicle" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="costPerKg" name="$/kg to LEO" radius={[3, 3, 0, 0]}>
                  {costComparison.map((e, i) => (
                    <Cell key={i} fill={e.vehicle.includes("Starship") ? C.green : e.vehicle.includes("Falcon") || e.vehicle.includes("F.") ? C.cyan : C.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ COMPETITIVE ══════ */}
      <Section title="Competitive Landscape" sub="The area chart (left) shows SpaceX's growing share of global orbital launches. The radar chart (right) indexes six capability dimensions on a 0\u2013100 scale, with SpaceX normalized to 100.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Global Launch Market Share (%)</h3>
            <p className="text-xs text-slate-600 mb-4">Percentage of all orbital launches worldwide. SpaceX crossed 50% in 2024 — more launches than every other entity on Earth combined.</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={marketShareData}>
                <defs>
                  <linearGradient id="gMs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Area type="monotone" dataKey="spacex" name="SpaceX" stackId="1" stroke={C.blue} fill="url(#gMs)" strokeWidth={2} />
                <Area type="monotone" dataKey="rest" name="Everyone Else" stackId="1" stroke={C.dim} fill="rgba(71,85,105,0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Capability Index (Normalized to SpaceX = 100)</h3>
            <p className="text-xs text-slate-600 mb-4">Comparing launch rate, reusability, revenue, payload capacity, crewed flights, and satellite network scale.</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} outerRadius={90}>
                <PolarGrid stroke="rgba(59,130,246,0.12)" />
                <PolarAngleAxis dataKey="subject" stroke={C.dim} tick={{ fill: C.muted, fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="SpaceX" dataKey="SpaceX" stroke={C.blue} fill={C.blue} fillOpacity={0.2} />
                <Radar name="Blue Origin" dataKey="BlueOrigin" stroke={C.orange} fill={C.orange} fillOpacity={0.08} />
                <Radar name="Rocket Lab" dataKey="RocketLab" stroke={C.green} fill={C.green} fillOpacity={0.08} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full sx-table min-w-[540px]">
            <thead><tr>
              {["Company", "'24 Launches", "'25 Launches", "Revenue", "Valuation", "Reuse"].map((h) => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {competitorData.map((c, i) => (
                <tr key={i}>
                  <td className={`font-medium ${i === 0 ? "text-cyan-400" : ""}`}>{c.name}</td>
                  <td>{c.launches2024}</td>
                  <td>{c.launches2025}</td>
                  <td>${c.revenue}B</td>
                  <td>{c.valuation > 0 ? `$${c.valuation}B` : "JV"}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="prog-bar w-16 sm:w-20">
                        <div className="h-full rounded-full" style={{ width: `${c.reuse}%`, background: c.reuse > 50 ? C.green : c.reuse > 0 ? C.yellow : C.red }} />
                      </div>
                      <span className="text-slate-500 text-xs">{c.reuse > 0 ? `${c.reuse}%` : "None"}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ChartNote>Revenue and valuation are estimates. ULA is a Boeing/Lockheed JV (no public valuation). Reuse % reflects demonstrated orbital-class booster reuse capability.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ GOV CONTRACTS ══════ */}
      <Section title="Government Contracts" sub="SpaceX holds over $17.7B in major government contract value. Blue bars are NASA contracts; orange bars are Department of Defense and Space Force.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={govContracts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
              <YAxis type="category" dataKey="name" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="Value ($B)" radius={[0, 4, 4, 0]}>
                {govContracts.map((e, i) => (
                  <Cell key={i} fill={e.agency === "NASA" ? C.blue : C.orange} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 justify-center">
            {([["NASA", C.blue], ["DoD / Space Force", C.orange]] as [string, string][]).map(([l, c]) => (
              <span key={l} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-2 rounded-sm" style={{ background: c }} />{l}
              </span>
            ))}
          </div>
          <ChartNote>Commercial Crew includes contract extensions through 2030. NSSL Phase 2 ceiling is shared with ULA; SpaceX allocation estimated at ~$4B. Starshield is classified NRO satellite work.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ IPO COMPS ══════ */}
      <Section title="Valuation Comps" sub="This chart compares SpaceX's implied revenue multiple at its $1.5T IPO target against other notable tech and mega-IPOs. The cyan bar is SpaceX; grey bars are comparables.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ipoCompsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis dataKey="name" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="multiple" name="Revenue Multiple" radius={[3, 3, 0, 0]}>
                {ipoCompsData.map((e, i) => (
                  <Cell key={i} fill={e.name === "SpaceX" ? C.cyan : C.dim} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ChartNote>At ~97x revenue ($1.5T / $15.5B), SpaceX would carry the richest multiple of any mega-IPO in history. The premium reflects Starlink&apos;s growth trajectory and Starship&apos;s optionality. Aramco and Uber multiples are at IPO date; Palantir and RKLB are current market values.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STARSHIP TESTS ══════ */}
      <Section title="Starship Flight Tests" sub="Each row tracks a Starship Integrated Flight Test (IFT). Color-coded results show SpaceX's iterate-fast approach — progressing from total failure to orbital flight and booster catch in under two years.">
        <div className="card overflow-x-auto">
          <table className="w-full sx-table min-w-[480px]">
            <thead><tr>{["Flight", "Date", "Result", "Milestone"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                { f: "IFT-1", d: "Apr 2023", r: "FAILURE", c: C.red, detail: "FTS activated at T+4 min — vehicle tumbled after liftoff" },
                { f: "IFT-2", d: "Nov 2023", r: "PARTIAL", c: C.yellow, detail: "First successful stage separation achieved" },
                { f: "IFT-3", d: "Mar 2024", r: "PARTIAL", c: C.yellow, detail: "Reached space — valuable re-entry data collected" },
                { f: "IFT-4", d: "Jun 2024", r: "SUCCESS", c: C.green, detail: "Both stages survived — first full-profile flight" },
                { f: "IFT-5", d: "Oct 2024", r: "HISTORIC", c: C.cyan, detail: "Super Heavy caught by Mechazilla tower arms" },
                { f: "IFT-6", d: "Nov 2024", r: "SUCCESS", c: C.green, detail: "Ship orbited, in-space Raptor relight, controlled splashdown" },
                { f: "IFT-7", d: "Jan 2025", r: "FAILURE", c: C.red, detail: "Propellant leak — Ship lost over Turks & Caicos, booster catch aborted" },
              ].map((fl, i) => (
                <tr key={i}>
                  <td className="font-mono text-white font-semibold">{fl.f}</td>
                  <td>{fl.d}</td>
                  <td><span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: fl.c, background: `${fl.c}18` }}>{fl.r}</span></td>
                  <td className="text-slate-400">{fl.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ChartNote>Starship is the most powerful rocket ever built: 33 Raptor engines producing 16.7 million lbf of thrust at liftoff — roughly 2x the Saturn V. The rapid test cadence reflects SpaceX&apos;s hardware-rich development philosophy.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ TIMELINE ══════ */}
      <Section title="The SpaceX Story" sub="Key milestones across 24 years — from a startup with three failed launches to the most valuable private company on Earth. Hover over each milestone for details.">
        <div className="relative">
          <div className="absolute left-[5px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent md:-translate-x-px" />
          <div className="space-y-5 sm:space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className={`tl-item relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 md:-translate-x-[6px] mt-1 z-10">
                  <div className="tl-dot" />
                </div>
                <div className={`ml-7 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                  <div className={`flex items-center gap-2 mb-0.5 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                    <span className="text-xs font-mono text-cyan-400/70">{m.year}</span>
                    <span className="text-white font-semibold text-sm">{m.event}</span>
                  </div>
                  <p className="text-sm text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ BY THE NUMBERS ══════ */}
      <Section title="By The Numbers" sub="The headline stats that define SpaceX's extraordinary scale and trajectory.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { val: "24", unit: "years", label: "Founding to largest IPO ever" },
            { val: "167", unit: "", label: "Launches in 2025 (new record)" },
            { val: "33", unit: "x", label: "Single booster reuse record" },
            { val: "550+", unit: "", label: "Successful booster landings" },
            { val: "2.2", unit: "days", label: "Avg between launches (2025)" },
            { val: "~70", unit: "", label: "Humans launched to orbit" },
            { val: "121", unit: "m", label: "Starship — tallest rocket ever" },
            { val: "16.7M", unit: "lbf", label: "Super Heavy liftoff thrust" },
            { val: "17K", unit: "+", label: "SpaceX employees" },
            { val: "52", unit: "%", label: "Global launch market share" },
            { val: "$67", unit: "/kg", label: "Starship target cost to LEO" },
            { val: "1st", unit: "", label: "Commercial crew to orbit" },
          ].map((s, i) => (
            <div key={i} className="stat-card p-4 sm:p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {s.val}<span className="text-sm text-cyan-400 ml-0.5">{s.unit}</span>
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ RISK/REWARD ══════ */}
      <Section title="IPO Risk/Reward" sub="The bull and bear cases investors are weighing ahead of the largest public offering in history.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { tag: "BULL", title: "Starlink Dominance", desc: "9.2M subs, 54% EBITDA margins, doubling annually. T-Mobile direct-to-cell expands TAM to billions of potential users.", color: C.green },
            { tag: "BULL", title: "Monopoly on Reuse", desc: "No competitor has demonstrated orbital-class reuse at scale. 33 flights on one booster. Margins widen every reflight.", color: C.green },
            { tag: "BULL", title: "Starship Unlocks Everything", desc: "Space data centers, Mars missions, point-to-point transport, mega-constellation deployment. $67/kg to LEO changes the economics of space.", color: C.green },
            { tag: "BEAR", title: "Key-Person Risk", desc: "Musk simultaneously leads two $1T+ companies plus DOGE. &apos;Most divisive stock to join the market&apos; — AJ Bell.", color: C.red },
            { tag: "BEAR", title: "97x Revenue Multiple", desc: "Richest multiple of any mega-IPO in history. Requires sustained hypergrowth and flawless Starship execution to justify.", color: C.red },
            { tag: "BEAR", title: "Macro & Regulatory", desc: "Unfiled S-1, global roadshow logistics, tariff uncertainty, rate jitters, and international spectrum regulation challenges.", color: C.red },
          ].map((card, i) => (
            <div key={i} className="ipo-card" style={{ borderColor: `${card.color}20` }}>
              <span className="text-[10px] tracking-[0.15em] font-semibold mb-3 inline-block" style={{ color: card.color }}>{card.tag}</span>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-blue-500/10 py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-600 text-xs text-center max-w-xl leading-relaxed">
            Data sourced from Bloomberg, Financial Times, Sacra, Payload Space, Quilty Space, SpaceNews, and official SpaceX announcements.
            Revenue and valuation are estimates for a private company. Not investment advice. Last updated March 2026.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
              @Trace_Cohen
            </a>
            <span className="text-slate-800">|</span>
            <a href="mailto:t@nyvp.com" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
              t@nyvp.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
