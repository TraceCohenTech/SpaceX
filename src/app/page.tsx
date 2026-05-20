"use client";

import {
  BarChart, Bar, Line, AreaChart, Area, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ComposedChart, ReferenceLine,
} from "recharts";

// ─── ACTUAL S-1 DATA (filed May 20, 2026) ──────────────────────────────

const pnlData = [
  { period: "2023", revenue: 10387, cogs: 6110, grossProfit: 4277, rd: 2105, sga: 1665, restructuring: 237, impairment: 3775, operatingIncome: -3505, netIncome: -4628, grossMargin: 41.2 },
  { period: "2024", revenue: 14015, cogs: 7996, grossProfit: 6019, rd: 3464, sga: 1813, restructuring: 213, impairment: 63, operatingIncome: 466, netIncome: 791, grossMargin: 42.9 },
  { period: "2025", revenue: 18674, cogs: 9451, grossProfit: 9223, rd: 8643, sga: 2644, restructuring: 487, impairment: 38, operatingIncome: -2589, netIncome: -4937, grossMargin: 49.4 },
];

const segmentRevenue = [
  { year: "2023", space: 3557, connectivity: 3869, ai: 2961 },
  { year: "2024", space: 3796, connectivity: 7599, ai: 2620 },
  { year: "2025", space: 4086, connectivity: 11387, ai: 3201 },
  { year: "Q1 '26", space: 619, connectivity: 3257, ai: 818 },
];

const segmentEBITDA = [
  { year: "2023", space: 997, connectivity: 1602, ai: 1222 },
  { year: "2024", space: 1154, connectivity: 3849, ai: 347 },
  { year: "2025", space: 653, connectivity: 7168, ai: -1237 },
  { year: "Q1 '26", space: -351, connectivity: 2087, ai: -609 },
];

const capexData = [
  { year: "2023", space: 1497, connectivity: 2455, ai: 463 },
  { year: "2024", space: 2032, connectivity: 3498, ai: 5633 },
  { year: "2025", space: 3832, connectivity: 4178, ai: 12727 },
  { year: "Q1 '26", space: 1052, connectivity: 1332, ai: 7723 },
];

const cashFlowData = [
  { year: "2023", operating: 4520, investing: -4867, financing: 422 },
  { year: "2024", operating: 5776, investing: -10796, financing: 11830 },
  { year: "2025", operating: 6785, investing: -19575, financing: 26350 },
  { year: "Q1 '26", operating: 1047, investing: -16724, financing: 7125 },
];

const balanceSheet = [
  { period: "Dec '24", cash: 11385, ppe: 21147, totalAssets: 57062, totalLiabilities: 31258, equity: 4863 },
  { period: "Dec '25", cash: 24747, ppe: 42602, totalAssets: 92079, totalLiabilities: 50754, equity: 2573 },
  { period: "Mar '26", cash: 15852, ppe: 53879, totalAssets: 102094, totalLiabilities: 60512, equity: 34533 },
];

const starlinkMetrics = [
  { year: "2023", subscribers: 2.3, arpu: 99, revenue: 3869 },
  { year: "2024", subscribers: 4.4, arpu: 91, revenue: 7599 },
  { year: "2025", subscribers: 8.9, arpu: 81, revenue: 11387 },
  { year: "Q1 '26", subscribers: 10.3, arpu: 66, revenue: 3257 },
];

const launchMassData = [
  { year: "2023", launches: 98, massToOrbit: 1210 },
  { year: "2024", launches: 138, massToOrbit: 1699 },
  { year: "2025", launches: 170, massToOrbit: 2213 },
  { year: "Q1 '26", launches: 40, massToOrbit: 556 },
];

const revenueDetail2025 = [
  { name: "Consumer Broadband", value: 7208, pct: 38.6, segment: "connectivity" },
  { name: "Enterprise & Gov", value: 4179, pct: 22.4, segment: "connectivity" },
  { name: "Launch Services", value: 2576, pct: 13.8, segment: "space" },
  { name: "Advertising (X)", value: 1844, pct: 9.9, segment: "ai" },
  { name: "Launch & Development", value: 1510, pct: 8.1, segment: "space" },
  { name: "AI Solutions & Infra", value: 1357, pct: 7.3, segment: "ai" },
];

const rdExpansion = [
  { year: "2023", rd: 2105, rdPct: 20.3, capexAi: 463 },
  { year: "2024", rd: 3464, rdPct: 24.7, capexAi: 5633 },
  { year: "2025", rd: 8643, rdPct: 46.3, capexAi: 12727 },
];

const ppeBreakdown = [
  { name: "Servers & Networking", value: 22694, color: "#f97316" },
  { name: "Satellites", value: 11949, color: "#22d3ee" },
  { name: "Machinery & Equipment", value: 6343, color: "#3b82f6" },
  { name: "Construction-in-Progress", value: 4604, color: "#eab308" },
  { name: "Data Center Infra", value: 2960, color: "#10b981" },
  { name: "Launch Sites", value: 2404, color: "#60a5fa" },
  { name: "Land & Buildings", value: 1876, color: "#94a3b8" },
  { name: "Flight Hardware", value: 1689, color: "#fb7185" },
];

const aiSegmentData = [
  { year: "2023", revenue: 2961, adsRevenue: 2323, aiSolutions: 638, opLoss: -3973, adjEBITDA: 1222, computeGW: 0 },
  { year: "2024", revenue: 2620, adsRevenue: 1728, aiSolutions: 892, opLoss: -1561, adjEBITDA: 347, computeGW: 0.3 },
  { year: "2025", revenue: 3201, adsRevenue: 1844, aiSolutions: 1357, opLoss: -6355, adjEBITDA: -1237, computeGW: 0.8 },
  { year: "Q1 '26", revenue: 818, adsRevenue: 0, aiSolutions: 818, opLoss: -2469, adjEBITDA: -609, computeGW: 1.0 },
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
  { name: "SpaceX", launches2024: 138, launches2025: 170, revenue: 18.7, valuation: 1500, reuse: 95 },
  { name: "Rocket Lab", launches2024: 16, launches2025: 20, revenue: 0.5, valuation: 12, reuse: 10 },
  { name: "Blue Origin", launches2024: 2, launches2025: 5, revenue: 0.3, valuation: 15, reuse: 5 },
  { name: "ULA", launches2024: 3, launches2025: 5, revenue: 3.0, valuation: 0, reuse: 0 },
  { name: "Arianespace", launches2024: 4, launches2025: 6, revenue: 1.5, valuation: 0, reuse: 0 },
];

const ipoCompsData = [
  { name: "SpaceX", multiple: 94, type: "target" },
  { name: "Rivian", multiple: 90, type: "ipo" },
  { name: "Palantir", multiple: 55, type: "current" },
  { name: "RKLB", multiple: 28, type: "current" },
  { name: "Aramco", multiple: 18, type: "ipo" },
  { name: "Uber", multiple: 8, type: "ipo" },
];

const valuationScenarios = [
  { scenario: "Low", valuation: 1250, revenueMultiple: 67 },
  { scenario: "Target", valuation: 1750, revenueMultiple: 94 },
  { scenario: "High", valuation: 2000, revenueMultiple: 107 },
  { scenario: "Extreme Bull", valuation: 2500, revenueMultiple: 134 },
];

const tamBreakdown = [
  { segment: "AI (Infrastructure + Apps)", value: 26500, color: "#f97316" },
  { segment: "Connectivity (Broadband + Mobile)", value: 1600, color: "#22d3ee" },
  { segment: "Space (Launch Services)", value: 370, color: "#3b82f6" },
];

const tamDetail = [
  { name: "Enterprise AI Apps", value: 22700, parent: "AI" },
  { name: "AI Infrastructure", value: 2400, parent: "AI" },
  { name: "Consumer AI Subs", value: 760, parent: "AI" },
  { name: "Digital Advertising", value: 600, parent: "AI" },
  { name: "Starlink Broadband", value: 870, parent: "Connectivity" },
  { name: "Starlink Mobile", value: 740, parent: "Connectivity" },
  { name: "Space / Launch", value: 370, parent: "Space" },
];

const debtStructure = [
  { name: "Bridge Loan (Goldman)", value: 20000, due: "Sep 2027", urgent: true },
  { name: "AI Infra Financing (failed sale-leaseback)", value: 9105, due: "Ongoing", urgent: false },
  { name: "SpaceX Credit Facility (BofA)", value: 0, due: "2031", urgent: false },
  { name: "X Notes (2027/2030)", value: 27, due: "2027/2030", urgent: false },
];

const strategicDeals = [
  { name: "Anthropic Compute", value: 15000, note: "$1.25B/month, through May 2029 — Anthropic trains on Colossus", color: "#22d3ee" },
  { name: "EchoStar Spectrum", value: 19600, note: "$19.6B for AWS-3/4 + H-Block spectrum (65 MHz, FCC approved May 12)", color: "#f97316" },
  { name: "Cursor (Anysphere)", value: 60000, note: "$60B implied equity — GPU compute + Grok model integration", color: "#10b981" },
];

// starshipTests defined after C (needs color references)

const internalVsCustomer = [
  { year: "2023", internal: 63, customer: 33, total: 98 },
  { year: "2024", internal: 89, customer: 45, total: 138 },
  { year: "2025", internal: 122, customer: 43, total: 170 },
  { year: "Q1 '26", internal: 33, customer: 7, total: 40 },
];

const xPlatformMetrics = [
  { metric: "Monthly Active Users", value: "550M", note: "Q1 2026" },
  { metric: "Registered Accounts", value: "1.3B+", note: "Last 12 months" },
  { metric: "Daily Posts", value: "350M", note: "Avg, Q1 2026" },
  { metric: "Grok AI MAUs", value: "117M", note: "Q1 2026" },
  { metric: "AI-Generated Images", value: "~10B/month", note: "Q1 2026 avg" },
  { metric: "AI-Generated Videos", value: "~2B/month", note: "Q1 2026 avg" },
];

const boosterReuse = [
  { booster: "B1067", flights: 34 },
  { booster: "B1061", flights: 26 },
  { booster: "B1062", flights: 24 },
  { booster: "B1060", flights: 23 },
  { booster: "B1058", flights: 22 },
  { booster: "B1069", flights: 21 },
];

const radarData = [
  { subject: "Launch Rate", SpaceX: 100, BlueOrigin: 5, RocketLab: 12 },
  { subject: "Reusability", SpaceX: 95, BlueOrigin: 20, RocketLab: 15 },
  { subject: "Revenue", SpaceX: 100, BlueOrigin: 2, RocketLab: 3 },
  { subject: "Payload", SpaceX: 100, BlueOrigin: 35, RocketLab: 2 },
  { subject: "Crew", SpaceX: 100, BlueOrigin: 15, RocketLab: 0 },
  { subject: "Satellites", SpaceX: 100, BlueOrigin: 5, RocketLab: 0 },
];

const govContracts = [
  { name: "Commercial Crew", value: 4.9, agency: "NASA" },
  { name: "Artemis HLS", value: 4.0, agency: "NASA" },
  { name: "NSSL Phase 2", value: 4.0, agency: "Space Force" },
  { name: "CRS Cargo", value: 3.0, agency: "NASA" },
  { name: "Starshield", value: 1.8, agency: "DoD" },
];

const vehicleFleet = [
  { name: "Falcon 9", type: "Medium-Lift", height: "70m", payload: "23,000 kg", engines: "9 Merlin", reuses: "34x record", launches: "620+", color: "#3b82f6" },
  { name: "Falcon Heavy", type: "Heavy-Lift", height: "70m", payload: "64,000 kg", engines: "27 Merlin", reuses: "Side boosters", launches: "14", color: "#22d3ee" },
  { name: "Starship", type: "Super Heavy-Lift", height: "121m", payload: "150,000+ kg", engines: "33 Raptor", reuses: "Full (goal)", launches: "7 IFTs", color: "#f97316" },
  { name: "Dragon", type: "Crew & Cargo", height: "8.1m", payload: "6,000 kg", engines: "SuperDraco", reuses: "Multi-flight", launches: "60+", color: "#10b981" },
];

const milestones = [
  { year: "2002", event: "Founded", desc: "Elon Musk invests $100M to start SpaceX in El Segundo, CA" },
  { year: "2008", event: "First Orbit", desc: "Falcon 1 — first private liquid rocket to reach orbit" },
  { year: "2012", event: "ISS Docking", desc: "Dragon docks with the International Space Station" },
  { year: "2015", event: "First Landing", desc: "Falcon 9 booster lands upright for the first time" },
  { year: "2017", event: "First Reflight", desc: "Orbital-class booster reused — proving reuse economics" },
  { year: "2020", event: "Crew to ISS", desc: "Demo-2: First commercial crewed orbital flight to ISS" },
  { year: "2023", event: "Starship Flies", desc: "Most powerful rocket ever lifts off from Starbase, Texas" },
  { year: "2024", event: "Tower Catch", desc: "Super Heavy caught by Mechazilla chopstick arms (IFT-5)" },
  { year: "2025", event: "170 Launches", desc: "Record cadence — a launch every 2.1 days. 80%+ of global mass to orbit." },
  { year: "Feb 2026", event: "xAI Merger", desc: "SpaceX acquires xAI (Grok) and X Holdings (Twitter)" },
  { year: "May 2026", event: "S-1 Filed", desc: "SpaceX files for IPO — targeting the largest public offering in history" },
];

const C = {
  blue: "#3b82f6", cyan: "#22d3ee", orange: "#f97316", green: "#10b981",
  red: "#ef4444", yellow: "#eab308", muted: "#94a3b8", dim: "#475569",
  grid: "rgba(59,130,246,0.08)",
};

const starshipTests = [
  { f: "IFT-1", d: "Apr 2023", r: "FAILURE", c: C.red, detail: "FTS activated at T+4 min — vehicle tumbled after liftoff" },
  { f: "IFT-2", d: "Nov 2023", r: "PARTIAL", c: C.yellow, detail: "First successful stage separation achieved" },
  { f: "IFT-3", d: "Mar 2024", r: "PARTIAL", c: C.yellow, detail: "Reached space — valuable re-entry data collected" },
  { f: "IFT-4", d: "Jun 2024", r: "SUCCESS", c: C.green, detail: "Both stages survived — first full-profile flight" },
  { f: "IFT-5", d: "Oct 2024", r: "HISTORIC", c: C.cyan, detail: "Super Heavy caught by Mechazilla tower arms" },
  { f: "IFT-6", d: "Nov 2024", r: "SUCCESS", c: C.green, detail: "Ship orbited, in-space Raptor relight, controlled splashdown" },
  { f: "IFT-7", d: "Jan 2025", r: "FAILURE", c: C.red, detail: "Propellant leak — Ship lost over Turks & Caicos, booster catch aborted" },
  { f: "IFT-8", d: "2025", r: "SUCCESS", c: C.green, detail: "Upper stage catch demonstrated; booster recovery refined" },
  { f: "IFT-9", d: "2025", r: "SUCCESS", c: C.green, detail: "Continued full-profile testing, reentry improvements" },
  { f: "IFT-10", d: "2025–2026", r: "SUCCESS", c: C.green, detail: "Back-to-back successful flights; operational profile established" },
  { f: "IFT-11", d: "2026", r: "SUCCESS", c: C.cyan, detail: "Final test ahead of commercial payload operations (H2 2026)" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900/95 border border-blue-500/20 rounded-lg px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="text-white font-medium text-sm mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{ color: e.color }} className="text-xs">
          {e.name}: <span className="font-bold">{e.value?.toLocaleString?.() ?? e.value}</span>
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

function fmt(n: number, suffix = "") {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B${suffix}`;
  return `$${n}M${suffix}`;
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
            <span className="tag mb-6 sm:mb-8 inline-block">SPCX · Nasdaq · S-1 Filed May 20, 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 sm:mb-6 fade-in-up delay-2 text-glow">
            <span className="gradient-text">SPACEX</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light tracking-wide mb-2 fade-in-up delay-3">
            THE ROAD TO
          </p>
          <p className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 fade-in-up delay-4">
            <span className="gradient-text">$1.75 TRILLION</span>
          </p>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto fade-in-up delay-5">
            The largest IPO in history. $18.7B in 2025 revenue. 10.3M Starlink subscribers. xAI, X, and a $28.5T TAM.
          </p>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 z-10 fade-in-up delay-6">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-cyan-400/40 mx-auto mb-2" />
          <p className="text-[9px] text-cyan-400/50 tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </div>

      {/* ══════ KEY METRICS ══════ */}
      <div className="border-y border-blue-500/10 bg-slate-950/60 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            { value: "$18.7B", label: "2025 Revenue", color: C.cyan },
            { value: "$9.2B", label: "2025 Gross Profit", color: C.green },
            { value: "10.3M", label: "Starlink Subs (Q1 '26)", color: C.blue },
            { value: "170", label: "2025 Launches", color: C.orange },
            { value: "$28.4B", label: "Contracted Backlog", color: C.cyan },
            { value: "22K+", label: "Employees (Mar '26)", color: C.yellow },
          ].map((s, i) => (
            <div key={i} className="stat-card pulse-glow p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.12em] text-slate-500 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ IPO OVERVIEW ══════ */}
      <Section title="IPO Overview" sub="SpaceX filed its S-1 with the SEC in May 2026. Key facts from the actual filing.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "IPO Target Valuation", value: "$1.75T", desc: "Ticker: SPCX on Nasdaq. Targeting $75B raise at ~$1.75T valuation. Range: $1.25T–$2.5T. 5:1 stock split completed May 4, 2026.", color: C.cyan },
            { label: "2025 Revenue", value: "$18.7B", desc: "Three segments: Connectivity $11.4B (61%), Space $4.1B (22%), AI — xAI + X $3.2B (17%). Revenue CAGR 2023–2025: 34%.", color: C.green },
            { label: "2025 Net Loss", value: "$(4.9B)", desc: "GAAP loss driven by $8.6B R&D (46% of revenue) — primarily xAI GPU buildout. Connectivity alone earned $4.4B operating income.", color: C.red },
            { label: "Connectivity Adj. EBITDA", value: "$7.2B", desc: "Starlink segment: 63% Adj. EBITDA margin on $11.4B revenue. The profit engine funding all other investments.", color: C.orange },
            { label: "Total Assets (Mar '26)", value: "$102B", desc: "Assets grew from $57B (Dec 2024) to $102B (Mar 2026) in 15 months. Servers & networking alone: $22.7B.", color: C.yellow },
            { label: "$28.5T TAM", value: "AI: $26.5T", desc: "AI accounts for 93% of SpaceX's stated $28.5T TAM. Space is only $370B. The real bet is orbital AI and terrestrial compute.", color: C.blue },
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

      {/* ══════ FULL P&L ══════ */}
      <Section title="Profit & Loss" sub="Official financials from the S-1. Revenue is growing fast — but so is R&D spend as SpaceX pours capital into xAI compute infrastructure.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Revenue vs. Gross Profit ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Gross margin expanded from 41.2% → 42.9% → 49.4% as Connectivity (Starlink) became a larger share of the business. Gross profit nearly doubled 2023–2025.</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={pnlData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="period" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis yAxisId="right" orientation="right" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v: number) => `${v}%`} domain={[0, 80]} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue ($M)" fill={C.blue} radius={[3, 3, 0, 0]} opacity={0.7} />
                <Bar yAxisId="left" dataKey="grossProfit" name="Gross Profit ($M)" fill={C.cyan} radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="grossMargin" name="Gross Margin %" stroke={C.orange} strokeWidth={2.5} dot={{ fill: C.orange, r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>Revenue: 2023 $10.4B → 2024 $14.0B → 2025 $18.7B (+33% YoY). Gross profit: 2023 $4.3B → 2025 $9.2B (+115% in 2 years).</ChartNote>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Operating Cost Breakdown ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">R&D exploded from $2.1B to $8.6B (2023–2025) as xAI scaled its GPU infrastructure. This single line item is why 2025 swung from operating profit to a $2.6B operating loss.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pnlData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="period" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="cogs" name="Cost of Revenue" stackId="a" fill={C.blue} />
                <Bar dataKey="rd" name="R&D" stackId="a" fill={C.orange} />
                <Bar dataKey="sga" name="SG&A" stackId="a" fill={C.cyan} />
                <Bar dataKey="restructuring" name="Restructuring" stackId="a" fill={C.yellow} />
                <Bar dataKey="impairment" name="Impairment" stackId="a" fill={C.red} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>2023 had $3.8B in impairment charges (X/Twitter write-down). 2025 R&D spike is entirely xAI GPU cluster buildout: Colossus.</ChartNote>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Operating Income & Net Income (Loss) ($M)</h3>
          <p className="text-xs text-slate-600 mb-4">SpaceX was profitable in 2024 ($791M net income) but swung to a $4.9B loss in 2025 as AI infrastructure spend accelerated. The core Space + Connectivity business is highly profitable — AI is a strategic bet.</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={pnlData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis dataKey="period" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <Bar dataKey="operatingIncome" name="Operating Income ($M)" fill={C.blue}>
                {pnlData.map((d, i) => <Cell key={i} fill={d.operatingIncome >= 0 ? C.green : C.red} />)}
              </Bar>
              <Line type="monotone" dataKey="netIncome" name="Net Income ($M)" stroke={C.cyan} strokeWidth={2.5} dot={{ fill: C.cyan, r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartNote>Source: SpaceX S-1, audited consolidated financial statements. All figures in millions.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ THREE SEGMENTS ══════ */}
      <Section title="Three Business Segments" sub="The S-1 reveals SpaceX as a three-segment company: Space (rockets), Connectivity (Starlink), and AI (xAI + X). Connectivity is the dominant and most profitable segment.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Revenue by Segment ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Connectivity (Starlink) went from $3.9B to $11.4B in two years — a 194% increase. Space grew steadily. AI (X + Grok) is a distant third.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="connectivity" name="Connectivity (Starlink)" stackId="a" fill={C.cyan} />
                <Bar dataKey="space" name="Space (Launches)" stackId="a" fill={C.blue} />
                <Bar dataKey="ai" name="AI (xAI + X)" stackId="a" fill={C.orange} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Q1 2026: Connectivity $3.26B, AI $818M, Space $619M. Connectivity now 69% of total revenue.</ChartNote>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Segment Adjusted EBITDA ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Connectivity is the cash machine: $7.2B Adj. EBITDA in 2025 (63% margin). AI turned negative in 2025 as Colossus GPU buildout ramped. Space EBITDA compressed on higher Starship R&D.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentEBITDA}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <Bar dataKey="connectivity" name="Connectivity" fill={C.cyan} radius={[3, 3, 0, 0]} />
                <Bar dataKey="space" name="Space" fill={C.blue} />
                <Bar dataKey="ai" name="AI" fill={C.orange}>
                  {segmentEBITDA.map((d, i) => <Cell key={i} fill={d.ai >= 0 ? C.orange : C.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Segment Adjusted EBITDA is non-GAAP. Connectivity alone ($7.2B) would make it one of the most profitable companies in the S&P 500.</ChartNote>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">2025 Revenue Mix — Detailed Breakdown</h3>
          <p className="text-xs text-slate-600 mb-4">Consumer broadband (Starlink residential) is the largest single product at 38.6% of total revenue. Launch Services is only 13.8% — the rocket business funds everything else but isn&apos;t the growth story.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {revenueDetail2025.map((item, i) => {
              const segColor = item.segment === "connectivity" ? C.cyan : item.segment === "space" ? C.blue : C.orange;
              return (
                <div key={i} className="p-4 rounded-lg bg-slate-900/50 border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-white">{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ color: segColor, background: `${segColor}18` }}>
                      {item.segment}
                    </span>
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: segColor }}>{fmt(item.value)}</div>
                  <div className="flex items-center gap-2">
                    <div className="prog-bar flex-1"><div className="h-full rounded-full" style={{ width: `${item.pct * 2.5}%`, background: segColor }} /></div>
                    <span className="text-xs text-slate-500">{item.pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          <ChartNote>Total 2025 revenue: $18,674M. Enterprise & Government connectivity includes Starlink Mobile service offerings.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STARLINK ══════ */}
      <div className="relative">
        <img src="https://live.staticflickr.com/65535/53378726498_e55a2b2f9e_k.jpg" alt="Starlink" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
        <div className="relative">
          <Section title="Starlink" sub="The world's largest satellite internet network: 9,600 satellites, 10.3M subscribers, 164 countries. Starlink generated $11.4B revenue in 2025 — growing 50% YoY.">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { val: "10.3M", label: "Subscribers (Q1 '26)", sub: "vs 2.3M in 2023", color: C.green },
                { val: "$11.4B", label: "2025 Revenue", sub: "50% YoY growth", color: C.cyan },
                { val: "$7.2B", label: "2025 Adj. EBITDA", sub: "63% EBITDA margin", color: C.orange },
                { val: "164", label: "Countries & Territories", sub: "Including Direct-to-Cell", color: C.blue },
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
                <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Subscriber Growth</h3>
                <p className="text-xs text-slate-600 mb-4">Active Service Lines grew from 2.3M (2023) to 10.3M (Q1 2026) — 4.5x in 2+ years. Each data point is year-end except Q1 2026.</p>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={starlinkMetrics}>
                    <defs>
                      <linearGradient id="gSubs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.cyan} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={C.cyan} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                    <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                    <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={C.cyan} fill="url(#gSubs)" strokeWidth={2.5} dot={{ fill: C.cyan, r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="card bg-black/50 backdrop-blur-md p-4 sm:p-6">
                <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">ARPU Declining — By Design</h3>
                <p className="text-xs text-slate-600 mb-4">Monthly average revenue per user fell from $99 (2023) to $66 (Q1 2026). This is intentional: SpaceX is penetrating lower-income markets and adding mobile/wholesale plans. Volume growth more than offsets the ARPU decline.</p>
                <ResponsiveContainer width="100%" height={280}>
                  <ComposedChart data={starlinkMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                    <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                    <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                    <YAxis yAxisId="right" orientation="right" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                    <Tooltip content={<Tip />} />
                    <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                    <Bar yAxisId="right" dataKey="revenue" name="Connectivity Revenue ($M)" fill={C.blue} opacity={0.5} radius={[3, 3, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="arpu" name="ARPU ($/month)" stroke={C.orange} strokeWidth={2.5} dot={{ fill: C.orange, r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
                <ChartNote>Revenue growing strongly even as ARPU declines — subscriber growth is outpacing price compression. 2023 revenue in consumer broadband was $2.8B, 2025 was $7.2B (+156%).</ChartNote>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <div className="accent-rule" />

      {/* ══════ AI SEGMENT ══════ */}
      <Section title="AI Segment: xAI + X" sub="The S-1 reveals SpaceX as the parent of xAI (Grok) and X (formerly Twitter). The AI segment is a massive bet — $6.4B operating loss in 2025, funded by Starlink's cash flows.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { val: "$3.2B", label: "2025 AI Revenue", sub: "Advertising + Grok subscriptions", color: C.orange },
            { val: "$(6.4B)", label: "2025 Operating Loss", sub: "Colossus GPU buildout", color: C.red },
            { val: "1.0 GW", label: "Compute (Q1 '26)", sub: "Nameplate compute draw", color: C.yellow },
            { val: "$12.7B", label: "2025 AI CapEx", sub: "61% of total company CapEx", color: C.orange },
          ].map((s, i) => (
            <div key={i} className="stat-card p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[9px] tracking-[0.12em] text-slate-400 uppercase mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-600">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">AI Segment Revenue Breakdown ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">AI segment revenue comes from two sources: X advertising ($1.8B in 2025) and AI Solutions & Infrastructure — Grok subscriptions, xAI API, and compute services ($1.4B). Ad revenue stabilized after 2023 Twitter chaos.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={aiSegmentData.filter(d => d.year !== "Q1 '26")}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="adsRevenue" name="X Advertising ($M)" stackId="a" fill={C.dim} />
                <Bar dataKey="aiSolutions" name="AI Solutions & Infra ($M)" stackId="a" fill={C.orange} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">AI Segment Operating Loss vs. Compute Scale ($M / GW)</h3>
            <p className="text-xs text-slate-600 mb-4">Compute capacity (nameplate draw in gigawatts) grew 0→0.3→0.8→1.0 GW across 2023–Q1 2026. Operating losses scaled with compute investment. The Colossus cluster in Memphis is the primary driver.</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={aiSegmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
                <YAxis yAxisId="right" orientation="right" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v} GW`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <ReferenceLine yAxisId="left" y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <Bar yAxisId="left" dataKey="opLoss" name="Operating Loss ($M)" fill={C.red} opacity={0.7} radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="computeGW" name="Compute (GW)" stroke={C.yellow} strokeWidth={2.5} dot={{ fill: C.yellow, r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>AI Adj. EBITDA was positive in 2023 ($1.2B) and 2024 ($347M) driven by Twitter cash flows, but turned negative in 2025 as GPU capex outpaced cash generation.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ CAPEX EXPLOSION ══════ */}
      <Section title="CapEx & Investment" sub="SpaceX spent $20.7B in capital expenditures in 2025 — nearly 111% of revenue. The AI segment alone consumed $12.7B. This is the highest absolute CapEx spend of any private company ever.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">CapEx by Segment ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">AI CapEx went from $463M (2023) to $12.7B (2025) — a 27x increase in 2 years. In Q1 2026 alone, AI CapEx was $7.7B, suggesting a $30B+ full-year 2026 pace.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capexData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="ai" name="AI (xAI Compute)" stackId="a" fill={C.orange} />
                <Bar dataKey="connectivity" name="Connectivity (Satellites)" stackId="a" fill={C.cyan} />
                <Bar dataKey="space" name="Space (Launch Infra)" stackId="a" fill={C.blue} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total 2025 CapEx: $20.7B. AI: $12.7B (61%), Connectivity: $4.2B (20%), Space: $3.8B (19%).</ChartNote>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">R&D Explosion ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">R&D as a % of revenue went from 20% to 46% in two years — unprecedented for a company at this scale. This is the primary reason for the 2025 operating loss despite strong gross profits.</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={rdExpansion}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis yAxisId="right" orientation="right" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="rd" name="R&D Spend ($M)" fill={C.orange} radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="rdPct" name="R&D % of Revenue" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>R&D grew $2.1B → $3.5B → $8.6B. For comparison, Microsoft spends ~15% of revenue on R&D. SpaceX is at 46% — investing heavily in future platforms.</ChartNote>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">PP&E Breakdown as of Dec 31, 2025 — What SpaceX Owns ($M)</h3>
          <p className="text-xs text-slate-600 mb-4">Servers & networking ($22.7B) now exceeds satellites ($11.9B) as the largest asset class. The xAI GPU buildout has transformed SpaceX from a rocket company into one of the world&apos;s largest AI infrastructure operators.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ppeBreakdown.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/40 border border-white/5">
                <div className="text-xs text-slate-500 mb-1">{item.name}</div>
                <div className="text-lg font-bold mb-2" style={{ color: item.color }}>{fmt(item.value)}</div>
                <div className="prog-bar w-full">
                  <div className="h-full rounded-full" style={{ width: `${(item.value / 22694) * 100}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <ChartNote>Total gross PP&E: $55.3B as of Dec 31, 2025 (net of $12.7B accumulated depreciation = $42.6B). As of March 31, 2026, net PP&E reached $53.9B.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ CASH FLOWS ══════ */}
      <Section title="Cash Flows & Balance Sheet" sub="SpaceX is generating strong operating cash flows, but investing aggressively — requiring significant external financing. The balance sheet is growing rapidly.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Cash Flow Statement ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Operating cash flow is strong and growing ($6.8B in 2025). But investing outflows ($19.6B in 2025) require massive financing. In Q1 2026, SpaceX invested $16.7B in a single quarter — an annualized $67B pace.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <Bar dataKey="operating" name="Operating Cash Flow" fill={C.green} radius={[3, 3, 0, 0]} />
                <Bar dataKey="investing" name="Investing (Outflows)" fill={C.red} />
                <Bar dataKey="financing" name="Financing Inflows" fill={C.blue} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>2025 financing inflows of $26.4B funded the massive AI CapEx program. IPO proceeds will replenish the balance sheet and fund continued expansion.</ChartNote>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Balance Sheet Snapshot ($B)</h3>
            <p className="text-xs text-slate-600 mb-4">Total assets nearly doubled from $57B (Dec 2024) to $102B (Mar 2026) in just 15 months. Cash peaked at $24.7B end of 2025 then drew down to $15.9B by Q1 2026 as AI investment accelerated.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={balanceSheet}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="period" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="cash" name="Cash & Equivalents ($M)" fill={C.green} />
                <Bar dataKey="ppe" name="PP&E, net ($M)" fill={C.cyan} />
                <Bar dataKey="totalLiabilities" name="Total Liabilities ($M)" fill={C.red} opacity={0.6} />
                <Bar dataKey="equity" name="Shareholders&apos; Equity ($M)" fill={C.orange} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Post-IPO preferred stock conversion (6.7B shares) will dramatically increase shareholders&apos; equity on a pro forma basis. Total assets: $102B as of March 31, 2026.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ LAUNCHES & MASS TO ORBIT ══════ */}
      <Section title="Launch Operations" sub="SpaceX conducted 170 orbital launches in 2025 — a new world record. More critically, they delivered 2,213 metric tons to orbit, representing 80%+ of all mass humanity sent to space that year.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart data={launchMassData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}`} />
              <YAxis yAxisId="right" orientation="right" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `${v}t`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="launches" name="Orbital Launches" fill={C.blue} radius={[3, 3, 0, 0]} opacity={0.8} />
              <Line yAxisId="right" type="monotone" dataKey="massToOrbit" name="Mass to Orbit (metric tons)" stroke={C.cyan} strokeWidth={2.5} dot={{ fill: C.cyan, r: 4, strokeWidth: 2, stroke: "#000" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartNote>S-1 data: 2023: 98 launches / 1,210t | 2024: 138 / 1,699t | 2025: 170 / 2,213t | Q1 2026: 40 / 556t. SpaceX has an over 99% mission success rate across 650+ orbital launches. As of March 31, 2026: ~7,400 metric tons total delivered to orbit.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ VEHICLE FLEET ══════ */}
      <Section title="Vehicle Fleet" sub="Four vehicles powering humanity's expansion into space. Falcon 9 has now demonstrated 34 reuses on a single booster. Starship is the future.">
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
      <Section title="Reuse Leaderboard" sub="B1067 now holds the record at 34 flights — a single rocket booster reflown like an aircraft. As of March 31, 2026, over 540 of 650+ total launches used a flight-proven booster.">
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
          <ChartNote>Every reflight amortizes the ~$60M booster cost. The S-1 notes Falcon 9&apos;s LEO cost dropped 85% from the historical average of $18,500/kg (in 2010) to approximately $2,700/kg. Starship targets $67/kg.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ COST ══════ */}
      <Section title="Cost Revolution" sub="Starship at $67/kg to LEO would be a 100x+ reduction from the Space Shuttle era. SpaceX's cost advantage is structural — rooted in vertical integration, software-first design, and reusability.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Cost Per Launch ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">Internal cost for SpaceX (reusable). List price for competitors. Starship target is $10M fully reusable.</p>
            <ResponsiveContainer width="100%" height={300}>
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
            <p className="text-xs text-slate-600 mb-4">The metric that matters for satellite economics and AI compute in orbit. Starship at $67/kg unlocks orbital data centers.</p>
            <ResponsiveContainer width="100%" height={300}>
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
      <Section title="Competitive Landscape" sub="SpaceX conducted 170 launches in 2025. The next closest competitor launched 20. SpaceX isn't just winning — it's operating in a different dimension.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-2">Capability Index (SpaceX = 100)</h3>
            <p className="text-xs text-slate-600 mb-4">Six dimensions indexed to SpaceX. No competitor is even close on any dimension.</p>
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
            <ChartNote>SpaceX revenue per the S-1 ($18.7B). Competitors are estimates. ULA is a Boeing/Lockheed JV. Reuse % reflects demonstrated orbital-class booster reuse.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ GOV CONTRACTS ══════ */}
      <Section title="Government Contracts" sub="The U.S. government (NASA, DoD, Space Force) is SpaceX's anchor customer, representing 20.9% of 2025 revenue. SpaceX launched 11 of 12 NSSL missions in 2025.">
        <div className="card p-4 sm:p-6 md:p-8">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={govContracts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
              <YAxis type="category" dataKey="name" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} width={120} />
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
          <ChartNote>S-1 discloses Customer A (U.S. federal government) = 20.9% of 2025 revenue (~$3.9B). SpaceX also launched all 5 U.S. crew and cargo missions to ISS in 2025.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ IPO COMPS ══════ */}
      <Section title="Valuation Comps" sub="At a $1.5T target valuation on $18.7B in 2025 revenue, SpaceX would carry a ~97x revenue multiple — the richest for any mega-IPO in history.">
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
          <ChartNote>At ~94x revenue ($1.75T / $18.7B), SpaceX would carry the richest multiple of any mega-IPO in history. Justified by: Starlink&apos;s 63% EBITDA margin, hyper-growth trajectory, xAI AI platform optionality, Anthropic compute revenue ($15B/yr), and Starship unlocking orbital AI compute. Aramco and Uber multiples at IPO date.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ VALUATION SCENARIOS ══════ */}
      <Section title="Valuation Scenarios" sub="SpaceX's $1.75T target valuation implies a 94x revenue multiple on 2025 revenue. The range of analyst scenarios and their implied revenue multiples.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Valuation Scenarios ($T)</h3>
            <p className="text-xs text-slate-600 mb-4">Four scenarios from analyst consensus. At $1.75T (target), SpaceX would surpass Saudi Aramco&apos;s 2019 IPO peak as the highest-valued company ever listed. At $2.5T, it would rival Apple and Nvidia.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={valuationScenarios} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${v}T`} domain={[0, 2800]} />
                <YAxis type="category" dataKey="scenario" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} width={80} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="valuation" name="Valuation ($B)" radius={[0, 4, 4, 0]}>
                  {valuationScenarios.map((s, i) => (
                    <Cell key={i} fill={i === 1 ? C.cyan : i === 0 ? C.dim : i === 2 ? C.blue : C.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 content-start">
            {valuationScenarios.map((s, i) => {
              const colors = [C.dim, C.cyan, C.blue, C.orange];
              return (
                <div key={i} className="ipo-card" style={{ borderColor: `${colors[i]}25` }}>
                  <div className="text-[9px] tracking-[0.15em] uppercase mb-1" style={{ color: colors[i] }}>{s.scenario}</div>
                  <div className="text-2xl font-bold text-white mb-1">${(s.valuation / 1000).toFixed(2)}T</div>
                  <div className="text-xs text-slate-500">{s.revenueMultiple}x 2025 revenue</div>
                </div>
              );
            })}
            <div className="col-span-2 p-4 rounded-lg bg-slate-900/40 border border-white/5 text-sm text-slate-500 leading-relaxed">
              At the $1.75T target: SpaceX would be larger than Amazon ($2.2T) at today&apos;s prices. Connectivity alone at 63% EBITDA margins and 50% growth would justify ~$500B as a standalone. The remainder prices in AI, Starship, and optionality.
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ TAM BREAKDOWN ══════ */}
      <Section title="Total Addressable Market" sub="SpaceX claims a $28.5T TAM (ex China, ex Russia). The surprise: 93% of it is AI. The rocket business is $370B — just 1.3% of total TAM.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">TAM by Segment ($B)</h3>
            <p className="text-xs text-slate-600 mb-4">The S-1 frames SpaceX as an AI company that happens to own a rocket and satellite business. AI infrastructure alone ($2.4T) is 6.5x the entire connectivity TAM.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={tamBreakdown} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}T` : `$${v}B`} />
                <YAxis type="category" dataKey="segment" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} width={160} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" name="TAM ($B)" radius={[0, 4, 4, 0]}>
                  {tamBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total TAM: $28.5T. AI: $26.5T (93%). Connectivity: $1.6T (5.6%). Space: $370B (1.3%). This framing justifies the premium multiple.</ChartNote>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">AI TAM Sub-Breakdown ($B)</h3>
            <p className="text-xs text-slate-600 mb-4">Enterprise AI applications ($22.7T) dwarf every other category. SpaceX&apos;s play is to be the compute backbone — via Colossus clusters, the Grok API, and eventually orbital AI infrastructure.</p>
            <div className="space-y-3 mt-2">
              {tamDetail.map((item, i) => {
                const segColor = item.parent === "AI" ? C.orange : item.parent === "Connectivity" ? C.cyan : C.blue;
                const maxVal = 22700;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs text-slate-500 w-36 flex-shrink-0">{item.name}</div>
                    <div className="flex-1 prog-bar">
                      <div className="h-full rounded-full" style={{ width: `${(item.value / maxVal) * 100}%`, background: segColor }} />
                    </div>
                    <div className="text-xs font-bold w-14 text-right" style={{ color: segColor }}>
                      {item.value >= 1000 ? `$${(item.value / 1000).toFixed(1)}T` : `$${item.value}B`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STRATEGIC DEALS ══════ */}
      <Section title="Strategic Deals" sub="Three major deals disclosed in the S-1 — totaling over $94B in value. The Anthropic compute contract alone is $15B/year, instantly making SpaceX one of the largest AI cloud providers.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {strategicDeals.map((deal, i) => (
            <div key={i} className="ipo-card" style={{ borderColor: `${deal.color}25` }}>
              <div className="text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: deal.color }}>Strategic Deal</div>
              <div className="text-lg font-bold text-white mb-1">{deal.name}</div>
              <div className="text-2xl font-bold mb-2" style={{ color: deal.color }}>
                {deal.value >= 1000 ? `$${(deal.value / 1000).toFixed(0)}B` : `$${deal.value}M`}
                {deal.name === "Anthropic Compute" ? "/yr" : ""}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{deal.note}</p>
            </div>
          ))}
        </div>
        <div className="card p-4 sm:p-6">
          <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-3">Anthropic Compute Deal — The $45B Contract</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Monthly Fee", value: "$1.25B", desc: "Anthropic pays SpaceX to train on Colossus/Colossus II" },
              { label: "Annualized", value: "$15B/yr", desc: "One of the largest AI cloud contracts in history" },
              { label: "Total Contract", value: "$45B", desc: "Through May 2029 — 3 year term, 90-day termination" },
              { label: "Infrastructure", value: "~220K GPUs", desc: "Colossus (H100) + Colossus II (GB200/GB300) combined" },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/10">
                <div className="text-[9px] tracking-[0.12em] text-slate-500 uppercase mb-1">{s.label}</div>
                <div className="text-xl font-bold text-cyan-400 mb-1">{s.value}</div>
                <div className="text-xs text-slate-600">{s.desc}</div>
              </div>
            ))}
          </div>
          <ChartNote>Anthropic retains all IP. SpaceX provides infrastructure only. The deal validates Colossus as world-class AI compute — and generates significant cash flow to offset AI segment losses.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ DEBT & GOVERNANCE ══════ */}
      <Section title="Debt Structure & Governance" sub="SpaceX has $29.1B in total debt — including a $20B bridge loan due September 2027 that must be refinanced (or repaid with IPO proceeds). Musk holds 10:1 supervoting Class B shares.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Debt Breakdown ($M)</h3>
            <p className="text-xs text-slate-600 mb-4">The $20B Goldman Sachs bridge loan (signed March 2, 2026) is the critical near-term item — due September 2027. IPO proceeds or debt refinancing must address it.</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={debtStructure} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis type="number" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis type="category" dataKey="name" stroke={C.dim} tick={{ fill: C.muted, fontSize: 10 }} width={190} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" name="Outstanding ($M)" radius={[0, 4, 4, 0]}>
                  {debtStructure.map((d, i) => <Cell key={i} fill={d.urgent ? C.red : C.blue} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total principal: $29.1B. SpaceX Credit Facility ($5B capacity) is currently undrawn. $9.1B AI infra financing reflects failed AI asset sale-leaseback that converted to debt.</ChartNote>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-3">Share Structure & Governance</h3>
            <div className="space-y-3">
              {[
                { label: "Class A (1 vote/share)", detail: "2,882M outstanding. Public float. No special rights.", color: C.blue },
                { label: "Class B (10 votes/share)", detail: "2,421M outstanding. Musk controlled. Elects 51%+ of board. Converts to Class A on transfer.", color: C.orange },
                { label: "Class C (→ Class A at IPO)", detail: "494M shares reclassified to Class A upon IPO completion.", color: C.dim },
                { label: "Preferred Stock (→ Class A + B)", detail: "$7B book value. Converts upon IPO (Preferred Conversion). ~6.7B new shares pro forma.", color: C.yellow },
                { label: "Controlled Company", detail: "Musk's Class B shares give effective voting control. Board need not have independent majority.", color: C.red },
                { label: "Mandatory Arbitration", detail: "No jury trials, no class actions, 3% derivative threshold. Governance concerns cited as top risk.", color: C.red },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-900/40 border border-white/5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                  <div>
                    <div className="text-xs font-medium text-white mb-0.5">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ INTERNAL VS CUSTOMER LAUNCHES ══════ */}
      <Section title="Launch Economics" sub="Of SpaceX's 170 launches in 2025, only 43 (25%) were for paying customers. The majority — 122 — were internal Starlink constellation deployments, which generate no Space segment revenue but directly power the $11.4B Connectivity business.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-1">Internal vs. Customer Launches</h3>
            <p className="text-xs text-slate-600 mb-4">SpaceX doesn&apos;t recognize inter-segment revenue for Starlink deployments. The rocket business looks smaller than it is — but internally it&apos;s the enabler of a $11.4B revenue stream.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={internalVsCustomer}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis stroke={C.dim} tick={{ fill: C.muted, fontSize: 11 }} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: C.muted, fontSize: 12 }} />
                <Bar dataKey="internal" name="Internal (Starlink)" stackId="a" fill={C.cyan} />
                <Bar dataKey="customer" name="Customer Launches" stackId="a" fill={C.blue} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Customer launches drive Space segment revenue ($4.1B in 2025). Internal launches fund Connectivity growth. Both are essential — but only customer launches appear in the P&L.</ChartNote>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs tracking-[0.12em] text-slate-500 uppercase mb-3">X Platform Metrics (AI Segment)</h3>
            <p className="text-xs text-slate-600 mb-4">X is the distribution and data engine for Grok — 350M daily posts create a proprietary real-time training stream. X + Grok form a flywheel no other AI company can replicate.</p>
            <div className="space-y-3">
              {xPlatformMetrics.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-slate-400">{item.metric}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{item.value}</div>
                    <div className="text-[10px] text-slate-600">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STARSHIP TESTS ══════ */}
      <Section title="Starship Flight Tests" sub="Eleven Integrated Flight Tests across 2023–2026. From total failure to commercial payload readiness in under 3 years — the fastest development timeline for a super-heavy launch vehicle in history.">
        <div className="card overflow-x-auto">
          <table className="w-full sx-table min-w-[480px]">
            <thead><tr>{["Flight", "Date", "Result", "Milestone"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {starshipTests.map((fl, i) => (
                <tr key={i}>
                  <td className="font-mono text-white font-semibold">{fl.f}</td>
                  <td>{fl.d}</td>
                  <td><span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: fl.c, background: `${fl.c}18` }}>{fl.r}</span></td>
                  <td className="text-slate-400">{fl.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ChartNote>Starship produces 16.7M lbf of thrust — ~2x Saturn V. The S-1 confirms 11 flight tests as of filing. Commercial payload operations expected H2 2026. Target cost: $67/kg to LEO (Falcon 9 today: $2,700/kg; historical avg: $18,500/kg).</ChartNote>
        </div>
      </Section>


      <div className="accent-rule" />

      {/* ══════ TIMELINE ══════ */}
      <Section title="The SpaceX Story" sub="Key milestones across 24 years — from a startup with three failed launches to the most valuable company to ever file for IPO.">
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
      <Section title="By The Numbers" sub="Official figures from the SpaceX S-1 filing.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { val: "$18.7B", unit: "", label: "2025 Revenue (S-1 actual)" },
            { val: "49.4", unit: "%", label: "2025 Gross Margin" },
            { val: "170", unit: "", label: "2025 orbital launches (record)" },
            { val: "2,213", unit: "t", label: "Mass to orbit 2025 (metric tons)" },
            { val: "10.3M", unit: "", label: "Starlink subscribers (Q1 '26)" },
            { val: "$7.2B", unit: "", label: "Connectivity Adj. EBITDA (2025)" },
            { val: "11", unit: "", label: "Starship flight tests to date" },
            { val: "650+", unit: "", label: "Total orbital launches ever" },
            { val: "$1.25B", unit: "/mo", label: "Anthropic compute contract" },
            { val: "$29.1B", unit: "", label: "Total debt outstanding" },
            { val: "550M", unit: "", label: "X Monthly Active Users (Q1 '26)" },
            { val: "$102B", unit: "", label: "Total assets (Mar 31, 2026)" },
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
      <Section title="IPO Risk / Reward" sub="The bull and bear cases investors must weigh before the largest public offering in history.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { tag: "BULL", title: "Starlink: $7.2B EBITDA Machine", desc: "63% Adjusted EBITDA margin on $11.4B revenue. Doubling subscribers every 18 months. Enterprise, government, and mobile are all still early innings.", color: C.green },
            { tag: "BULL", title: "Structural Launch Monopoly", desc: "170 launches in 2025 — more than every other entity on Earth combined. Falcon 9&apos;s 34-reuse record means each marginal launch costs ~$15M vs. $100M+ for competitors.", color: C.green },
            { tag: "BULL", title: "Starship + Orbital AI Compute", desc: "At $67/kg, Starship makes orbital data centers economically viable. SpaceX already has the satellite manufacturing, in-orbit engineering, and launch cadence to execute.", color: C.green },
            { tag: "BEAR", title: "$4.9B Net Loss in 2025", desc: "GAAP losses driven by $8.6B in R&D (46% of revenue). AI segment lost $6.4B from operations. Requires sustained conviction that AI infrastructure investment will generate returns.", color: C.red },
            { tag: "BEAR", title: "97x Revenue Multiple", desc: "The richest multiple in mega-IPO history. Requires Starlink to continue growing at 50%+, xAI to monetize at scale, and Starship to achieve full reusability. Any slip compounds the premium risk.", color: C.red },
            { tag: "BEAR", title: "Key-Person & Regulatory Risk", desc: "Elon Musk leads SpaceX, xAI, X, Tesla, and DOGE simultaneously. Spectrum regulation (FCC, international) can throttle Starlink growth. Government customer concentration at 20.9% of revenue.", color: C.red },
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
            All financial data sourced directly from Space Exploration Technologies Corp. S-1 Registration Statement filed with the SEC (May 2026). Revenue, loss, and EBITDA figures reflect the combined company including xAI and X Holdings Corp. Not investment advice.
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
