"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, Line, AreaChart, Area, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ComposedChart, ReferenceLine,
} from "recharts";

// ─── ACTUAL S-1 DATA (filed May 20, 2026) ──────────────────────────────────

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
  blue:   "#3b82f6",
  sky:    "#06b6d4",
  green:  "#22c55e",
  orange: "#f97316",
  red:    "#ef4444",
  yellow: "#eab308",
  violet: "#a855f7",
  slate:  "#64748b",
  muted:  "#94a3b8",
  dim:    "#94a3b8",
  grid:   "rgba(15,23,42,0.04)",
};

const starshipTests = [
  { f: "IFT-1", d: "Apr 2023", r: "FAILURE", c: C.red, detail: "FTS activated at T+4 min — vehicle tumbled after liftoff" },
  { f: "IFT-2", d: "Nov 2023", r: "PARTIAL", c: C.yellow, detail: "First successful stage separation achieved" },
  { f: "IFT-3", d: "Mar 2024", r: "PARTIAL", c: C.yellow, detail: "Reached space — valuable re-entry data collected" },
  { f: "IFT-4", d: "Jun 2024", r: "SUCCESS", c: C.green, detail: "Both stages survived — first full-profile flight" },
  { f: "IFT-5", d: "Oct 2024", r: "HISTORIC", c: C.sky, detail: "Super Heavy caught by Mechazilla tower arms" },
  { f: "IFT-6", d: "Nov 2024", r: "SUCCESS", c: C.green, detail: "Ship orbited, in-space Raptor relight, controlled splashdown" },
  { f: "IFT-7", d: "Jan 2025", r: "FAILURE", c: C.red, detail: "Propellant leak — Ship lost over Turks & Caicos, booster catch aborted" },
  { f: "IFT-8", d: "2025", r: "SUCCESS", c: C.green, detail: "Upper stage catch demonstrated; booster recovery refined" },
  { f: "IFT-9", d: "2025", r: "SUCCESS", c: C.green, detail: "Continued full-profile testing, reentry improvements" },
  { f: "IFT-10", d: "2025–2026", r: "SUCCESS", c: C.green, detail: "Back-to-back successful flights; operational profile established" },
  { f: "IFT-11", d: "2026", r: "SUCCESS", c: C.sky, detail: "Final test ahead of commercial payload operations (H2 2026)" },
];

const NAV_LINKS = [
  { id: "overview",    label: "Overview" },
  { id: "pnl",         label: "P&L" },
  { id: "segments",    label: "Segments" },
  { id: "starlink",    label: "Starlink" },
  { id: "ai",          label: "AI" },
  { id: "capex",       label: "CapEx" },
  { id: "launches",    label: "Launches" },
  { id: "valuation",   label: "Valuation" },
  { id: "deals",       label: "Deals" },
  { id: "risks",       label: "Risks" },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function fmtTip(name: string, value: number): string {
  if (value == null) return "—";
  const n = name.toLowerCase();
  if (n.includes("margin") || n.includes(" %") || n.includes("pct") || n.endsWith("%")) {
    return `${value.toFixed(1)}%`;
  }
  if (n.includes("gw")) return `${value} GW`;
  if (n.includes("multiple")) return `${value}x`;
  if (n.includes("subscriber") || n.endsWith("(m)")) return `${value.toFixed(1)}M`;
  if (
    n.includes("launch") || n.includes("flight") ||
    n.includes("mission") || n.includes("booster") ||
    n.includes("metric ton") || n.includes("mass to orbit") ||
    n.includes("$/kg")
  ) {
    return value.toLocaleString();
  }
  // Dollar millions → B/M
  const abs = Math.abs(value);
  if (abs >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  if (abs > 0 || value === 0) return `$${value.toLocaleString()}M`;
  return String(value);
}

function fmt(n: number, suffix = "") {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B${suffix}`;
  return `$${n}M${suffix}`;
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: 14,
      padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(15,23,42,0.14)",
      minWidth: 170,
      fontFamily: "inherit",
    }}>
      <p style={{ color: "#0f172a", fontWeight: 700, fontSize: 12, marginBottom: 8, paddingBottom: 7, borderBottom: "1px solid #f1f5f9" }}>
        {label}
      </p>
      {payload.map((e: any, i: number) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginTop: i > 0 ? 5 : 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 11 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: e.color, display: "inline-block", flexShrink: 0 }} />
            {e.name}
          </span>
          <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 12 }}>
            {fmtTip(e.name, e.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function AnimNum({ target, fmt: fmtFn }: { target: number; fmt: (n: number) => string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1400;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className="kpi-number">{fmtFn(val)}</span>;
}

function Nav({ active }: { active: string }) {
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <span className="nav-brand">SPCX</span>
        <div className="nav-links">
          {NAV_LINKS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`nav-link${active === s.id ? " active" : ""}`}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Section({ title, sub, children, id }: { title: string; sub?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
        <div className="section-bar" />
      </div>
      {children}
    </section>
  );
}

function ChartNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-slate-400 mt-4 leading-relaxed">{children}</p>;
}

const AXIS = { stroke: C.dim, tick: { fill: "#94a3b8", fontSize: 11 } };
const GRID = { strokeDasharray: "3 3", stroke: C.grid };

// ─── KPI DATA ────────────────────────────────────────────────────────────────

const kpis = [
  { target: 18.7, fmt: (n: number) => `$${n.toFixed(1)}B`, label: "2025 Revenue",          color: "#06b6d4" },
  { target: 9.2,  fmt: (n: number) => `$${n.toFixed(1)}B`, label: "2025 Gross Profit",     color: "#22c55e" },
  { target: 10.3, fmt: (n: number) => `${n.toFixed(1)}M`,  label: "Starlink Subs Q1 '26", color: "#60a5fa" },
  { target: 170,  fmt: (n: number) => `${Math.round(n)}`,  label: "2025 Orbital Launches", color: "#f97316" },
  { target: 28.4, fmt: (n: number) => `$${n.toFixed(1)}B`, label: "Contracted Backlog",    color: "#a78bfa" },
  { target: 22,   fmt: (n: number) => `${Math.round(n)}K+`,label: "Employees (Mar '26)",   color: "#fbbf24" },
];

const byTheNumbers = [
  { target: 18.7, fmt: (n: number) => `$${n.toFixed(1)}B`, unit: "",    label: "2025 Revenue",              color: "#3b82f6" },
  { target: 49.4, fmt: (n: number) => `${n.toFixed(1)}`,   unit: "%",   label: "2025 Gross Margin",         color: "#22c55e" },
  { target: 170,  fmt: (n: number) => `${Math.round(n)}`,  unit: "",    label: "2025 Orbital Launches",     color: "#f97316" },
  { target: 2213, fmt: (n: number) => `${Math.round(n).toLocaleString()}`, unit: "t", label: "Metric Tons to Orbit 2025", color: "#06b6d4" },
  { target: 10.3, fmt: (n: number) => `${n.toFixed(1)}M`,  unit: "",    label: "Starlink Subscribers Q1'26",color: "#10b981" },
  { target: 7.2,  fmt: (n: number) => `$${n.toFixed(1)}B`, unit: "",    label: "Connectivity Adj. EBITDA",  color: "#eab308" },
  { target: 11,   fmt: (n: number) => `${Math.round(n)}`,  unit: "",    label: "Starship Flight Tests",     color: "#ef4444" },
  { target: 650,  fmt: (n: number) => `${Math.round(n)}+`, unit: "",    label: "Total Orbital Launches",    color: "#a855f7" },
  { target: 1.25, fmt: (n: number) => `$${n.toFixed(2)}B`, unit: "/mo", label: "Anthropic Contract/Month",  color: "#06b6d4" },
  { target: 29.1, fmt: (n: number) => `$${n.toFixed(1)}B`, unit: "",    label: "Total Debt Outstanding",    color: "#f43f5e" },
  { target: 550,  fmt: (n: number) => `${Math.round(n)}M`, unit: "",    label: "X Monthly Active Users",    color: "#3b82f6" },
  { target: 102,  fmt: (n: number) => `$${Math.round(n)}B`,unit: "",    label: "Total Assets (Mar '26)",    color: "#22c55e" },
];

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function SpaceXDashboard() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const ids = NAV_LINKS.map(s => s.id);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#f1f5f9] text-slate-900 overflow-x-hidden">

      <Nav active={active} />

      {/* ══════ HERO ══════ */}
      <div className="hero-section">
        <div className="hero-stars" />
        <img src="https://i.redd.it/2r38gq2b2bg31.jpg" alt="SpaceX rocket launch" className="hero-bg" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
          <div className="fade-in-up delay-1">
            <span className="tag mb-6 sm:mb-8 inline-block">SPCX · Nasdaq · S-1 Filed May 20, 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 sm:mb-6 fade-in-up delay-2">
            <span className="gradient-text">SPACEX</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/55 font-light tracking-[0.18em] uppercase mb-2 fade-in-up delay-3">
            The road to
          </p>
          <p className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-7 sm:mb-9 fade-in-up delay-4">
            <span className="gradient-text">$1.75 Trillion</span>
          </p>
          <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed fade-in-up delay-5">
            The largest IPO in history. $18.7B in 2025 revenue. 10.3M Starlink subscribers. xAI, X, and a $28.5T TAM.
          </p>
        </div>
        <div className="absolute bottom-7 sm:bottom-9 z-10 fade-in-up delay-6 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/25" />
          <p className="text-[9px] text-white/35 tracking-[0.35em] uppercase">Scroll</p>
        </div>
      </div>

      {/* ══════ KPI STRIP ══════ */}
      <div className="kpi-strip">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-9 sm:py-11 grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {kpis.map((s, i) => (
            <div key={i} className="kpi-card text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 kpi-number" style={{ color: s.color }}>
                <AnimNum target={s.target} fmt={s.fmt} />
              </div>
              <div className="text-white/60 text-[10px] uppercase tracking-widest leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ BY THE NUMBERS ══════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-12 pb-4">
        <div className="mb-7">
          <h2 className="section-title">By The Numbers</h2>
          <p className="section-sub">Official figures from the SpaceX S-1 filing. Numbers animate as you scroll.</p>
          <div className="section-bar" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {byTheNumbers.map((s, i) => (
            <div key={i} className="rounded-2xl p-4 sm:p-5 text-center border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                background: `linear-gradient(145deg, ${s.color}14 0%, #fff 70%)`,
                borderColor: `${s.color}35`,
                borderTopWidth: 3,
                borderTopColor: s.color,
              }}>
              <div className="text-2xl sm:text-3xl font-extrabold mb-1 kpi-number tracking-tight" style={{ color: s.color }}>
                <AnimNum target={s.target} fmt={s.fmt} />
                {s.unit && <span className="text-sm font-bold ml-0.5" style={{ color: s.color, opacity: 0.75 }}>{s.unit}</span>}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 leading-tight font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="accent-rule mt-10" />

      {/* ══════ IPO OVERVIEW ══════ */}
      <Section id="overview" title="IPO Overview" sub="SpaceX filed its S-1 with the SEC in May 2026. Key facts from the actual filing.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "IPO Target Valuation", value: "$1.75T", desc: "Ticker: SPCX on Nasdaq. Targeting $75B raise at ~$1.75T valuation. Range: $1.25T–$2.5T. 5:1 stock split completed May 4, 2026.", color: C.sky },
            { label: "2025 Revenue", value: "$18.7B", desc: "Three segments: Connectivity $11.4B (61%), Space $4.1B (22%), AI — xAI + X $3.2B (17%). Revenue CAGR 2023–2025: 34%.", color: C.green },
            { label: "2025 Net Loss", value: "$(4.9B)", desc: "GAAP loss driven by $8.6B R&D (46% of revenue) — primarily xAI GPU buildout. Connectivity alone earned $4.4B operating income.", color: C.red },
            { label: "Connectivity Adj. EBITDA", value: "$7.2B", desc: "Starlink segment: 63% Adj. EBITDA margin on $11.4B revenue. The profit engine funding all other investments.", color: C.orange },
            { label: "Total Assets (Mar '26)", value: "$102B", desc: "Assets grew from $57B (Dec 2024) to $102B (Mar 2026) in 15 months. Servers & networking alone: $22.7B.", color: C.yellow },
            { label: "$28.5T TAM", value: "AI: $26.5T", desc: "AI accounts for 93% of SpaceX's stated $28.5T TAM. Space is only $370B. The real bet is orbital AI and terrestrial compute.", color: C.blue },
          ].map((item, i) => (
            <div key={i} className="ipo-card">
              <div className="text-[10px] tracking-[0.14em] uppercase mb-3 font-semibold" style={{ color: item.color }}>{item.label}</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">{item.value}</div>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ FULL P&L ══════ */}
      <Section id="pnl" title="Profit & Loss" sub="Official financials from the S-1. Revenue is growing fast — but so is R&D spend as SpaceX pours capital into xAI compute infrastructure.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          <div className="card p-4 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Revenue vs. Gross Profit</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Gross margin expanded from 41.2% → 42.9% → 49.4% as Connectivity (Starlink) became a larger share of the business.</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={pnlData}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="period" {...AXIS} />
                <YAxis yAxisId="left" {...AXIS} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis yAxisId="right" orientation="right" {...AXIS} tickFormatter={(v: number) => `${v}%`} domain={[0, 80]} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue ($M)" fill={C.blue} radius={[4, 4, 0, 0]} opacity={0.75} />
                <Bar yAxisId="left" dataKey="grossProfit" name="Gross Profit ($M)" fill={C.sky} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="grossMargin" name="Gross Margin %" stroke={C.orange} strokeWidth={2.5} dot={{ fill: C.orange, r: 5, strokeWidth: 2, stroke: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>Revenue: 2023 $10.4B → 2024 $14.0B → 2025 $18.7B (+33% YoY). Gross profit nearly doubled 2023–2025.</ChartNote>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Operating Cost Breakdown</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">R&D exploded from $2.1B to $8.6B as xAI scaled its GPU infrastructure. This single line item swung 2025 from operating profit to a $2.6B loss.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pnlData}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="period" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="cogs" name="Cost of Revenue ($M)" stackId="a" fill={C.blue} />
                <Bar dataKey="rd" name="R&D ($M)" stackId="a" fill={C.orange} />
                <Bar dataKey="sga" name="SG&A ($M)" stackId="a" fill={C.sky} />
                <Bar dataKey="restructuring" name="Restructuring ($M)" stackId="a" fill={C.yellow} />
                <Bar dataKey="impairment" name="Impairment ($M)" stackId="a" fill={C.red} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>2023 had $3.8B in impairment charges (X/Twitter write-down). 2025 R&D spike is entirely xAI GPU cluster buildout.</ChartNote>
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Operating Income & Net Income (Loss)</h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">SpaceX was profitable in 2024 ($791M net income) but swung to a $4.9B loss in 2025 as AI infrastructure spend accelerated.</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={pnlData}>
              <CartesianGrid {...GRID} />
              <XAxis dataKey="period" {...AXIS} />
              <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="4 4" />
              <Bar dataKey="operatingIncome" name="Operating Income ($M)">
                {pnlData.map((d, i) => <Cell key={i} fill={d.operatingIncome >= 0 ? C.green : C.red} />)}
              </Bar>
              <Line type="monotone" dataKey="netIncome" name="Net Income ($M)" stroke={C.sky} strokeWidth={2.5} dot={{ fill: C.sky, r: 5, strokeWidth: 2, stroke: "#fff" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartNote>Source: SpaceX S-1, audited consolidated financial statements. All figures in millions.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ THREE SEGMENTS ══════ */}
      <Section id="segments" title="Three Business Segments" sub="The S-1 reveals SpaceX as a three-segment company: Space (rockets), Connectivity (Starlink), and AI (xAI + X). Connectivity is the dominant and most profitable segment.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Revenue by Segment</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Connectivity (Starlink) went from $3.9B to $11.4B in two years — a 194% increase. Now 69% of total revenue.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentRevenue}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="connectivity" name="Connectivity ($M)" stackId="a" fill={C.sky} />
                <Bar dataKey="space" name="Space ($M)" stackId="a" fill={C.blue} />
                <Bar dataKey="ai" name="AI (xAI + X) ($M)" stackId="a" fill={C.orange} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Q1 2026: Connectivity $3.26B, AI $818M, Space $619M. Connectivity now 69% of total revenue.</ChartNote>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Segment Adjusted EBITDA</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Connectivity is the cash machine: $7.2B Adj. EBITDA in 2025 (63% margin). AI turned negative as Colossus GPU buildout ramped.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentEBITDA}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="4 4" />
                <Bar dataKey="connectivity" name="Connectivity ($M)" fill={C.sky} radius={[4, 4, 0, 0]} />
                <Bar dataKey="space" name="Space ($M)" fill={C.blue} />
                <Bar dataKey="ai" name="AI ($M)">
                  {segmentEBITDA.map((d, i) => <Cell key={i} fill={d.ai >= 0 ? C.orange : C.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Connectivity alone ($7.2B) would make it one of the most profitable companies in the S&P 500.</ChartNote>
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">2025 Revenue Mix — Detailed Breakdown</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">Consumer broadband (Starlink residential) is the largest single product at 38.6% of total revenue. Launch Services is only 13.8% — the rocket business isn&apos;t the growth story.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {revenueDetail2025.map((item, i) => {
              const segColor = item.segment === "connectivity" ? C.sky : item.segment === "space" ? C.blue : C.orange;
              return (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize font-medium" style={{ color: segColor, background: `${segColor}18` }}>
                      {item.segment}
                    </span>
                  </div>
                  <div className="text-2xl font-bold mb-2" style={{ color: segColor }}>{fmt(item.value)}</div>
                  <div className="flex items-center gap-2">
                    <div className="prog-bar flex-1">
                      <div style={{ width: `${item.pct * 2.5}%`, background: segColor }} />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{item.pct}%</span>
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
      <Section id="starlink" title="Starlink" sub="The world's largest satellite internet network: 9,600 satellites, 10.3M subscribers, 164 countries. Starlink generated $11.4B revenue in 2025 — growing 50% YoY.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {[
            { val: 10.3, fmtFn: (n: number) => `${n.toFixed(1)}M`, label: "Subscribers (Q1 '26)", sub: "vs 2.3M in 2023", color: C.green },
            { val: 11.4, fmtFn: (n: number) => `$${n.toFixed(1)}B`, label: "2025 Revenue", sub: "50% YoY growth", color: C.sky },
            { val: 7.2, fmtFn: (n: number) => `$${n.toFixed(1)}B`, label: "2025 Adj. EBITDA", sub: "63% EBITDA margin", color: C.orange },
            { val: 164, fmtFn: (n: number) => `${Math.round(n)}`, label: "Countries & Territories", sub: "Including Direct-to-Cell", color: C.blue },
          ].map((s, i) => (
            <div key={i} className="stat-card p-4 sm:p-5 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1" style={{ color: s.color }}>
                <AnimNum target={s.val} fmt={s.fmtFn} />
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.12em] text-slate-400 uppercase mb-1">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Subscriber Growth</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Active Service Lines grew from 2.3M (2023) to 10.3M (Q1 2026) — 4.5x in 2+ years.</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={starlinkMetrics}>
                <defs>
                  <linearGradient id="gSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.sky} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.sky} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `${v}M`} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={C.sky} fill="url(#gSubs)" strokeWidth={2.5} dot={{ fill: C.sky, r: 5, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7, strokeWidth: 2, stroke: "#fff" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">ARPU Declining — By Design</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Monthly ARPU fell from $99 (2023) to $66 (Q1 2026). Volume growth more than offsets price compression.</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={starlinkMetrics}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis yAxisId="left" {...AXIS} tickFormatter={(v) => `$${v}`} />
                <YAxis yAxisId="right" orientation="right" {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar yAxisId="right" dataKey="revenue" name="Connectivity Revenue ($M)" fill={C.blue} opacity={0.5} radius={[4, 4, 0, 0]} />
                <Line yAxisId="left" type="monotone" dataKey="arpu" name="ARPU ($/month)" stroke={C.orange} strokeWidth={2.5} dot={{ fill: C.orange, r: 5, strokeWidth: 2, stroke: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>Revenue growing strongly even as ARPU declines — subscriber growth is outpacing price compression. Consumer broadband: $2.8B (2023) → $7.2B (2025) +156%.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ AI SEGMENT ══════ */}
      <Section id="ai" title="AI Segment: xAI + X" sub="The S-1 reveals SpaceX as the parent of xAI (Grok) and X (formerly Twitter). The AI segment is a massive bet — $6.4B operating loss in 2025, funded by Starlink's cash flows.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
          {[
            { val: 3.2,   fmtFn: (n: number) => `$${n.toFixed(1)}B`, label: "2025 AI Revenue",    sub: "Advertising + Grok subscriptions", color: C.orange },
            { val: -6.4,  fmtFn: (n: number) => `$(${Math.abs(n).toFixed(1)}B)`, label: "2025 Operating Loss", sub: "Colossus GPU buildout", color: C.red },
            { val: 1.0,   fmtFn: (n: number) => `${n.toFixed(1)} GW`, label: "Compute (Q1 '26)",  sub: "Nameplate compute draw", color: C.yellow },
            { val: 12.7,  fmtFn: (n: number) => `$${n.toFixed(1)}B`, label: "2025 AI CapEx",      sub: "61% of total company CapEx", color: C.orange },
          ].map((s, i) => (
            <div key={i} className="stat-card p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1" style={{ color: s.color }}>
                <AnimNum target={Math.abs(s.val)} fmt={(n) => s.val < 0 ? `$(${n.toFixed(1)}B)` : s.fmtFn(n)} />
              </div>
              <div className="text-[9px] tracking-[0.12em] text-slate-400 uppercase mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">AI Segment Revenue Breakdown</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">X advertising ($1.8B in 2025) and AI Solutions & Infrastructure — Grok subscriptions, xAI API, and compute services ($1.4B).</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={aiSegmentData.filter(d => d.year !== "Q1 '26")}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="adsRevenue" name="X Advertising ($M)" stackId="a" fill="#94a3b8" />
                <Bar dataKey="aiSolutions" name="AI Solutions & Infra ($M)" stackId="a" fill={C.orange} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Operating Loss vs. Compute Scale</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Compute capacity grew 0→0.3→0.8→1.0 GW across 2023–Q1 2026. Losses scaled with compute. Colossus in Memphis is the primary driver.</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={aiSegmentData}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis yAxisId="left" {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`} />
                <YAxis yAxisId="right" orientation="right" {...AXIS} tickFormatter={(v) => `${v} GW`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <ReferenceLine yAxisId="left" y={0} stroke="#cbd5e1" strokeDasharray="4 4" />
                <Bar yAxisId="left" dataKey="opLoss" name="Operating Loss ($M)" fill={C.red} opacity={0.75} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="computeGW" name="Compute (GW)" stroke={C.yellow} strokeWidth={2.5} dot={{ fill: C.yellow, r: 5, strokeWidth: 2, stroke: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>AI Adj. EBITDA was positive in 2023–24 (Twitter cash flows) but turned negative in 2025 as GPU capex outpaced cash generation.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ CAPEX EXPLOSION ══════ */}
      <Section id="capex" title="CapEx & Investment" sub="SpaceX spent $20.7B in capital expenditures in 2025 — nearly 111% of revenue. The AI segment alone consumed $12.7B. The highest absolute CapEx spend of any private company ever.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">CapEx by Segment</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">AI CapEx went from $463M (2023) to $12.7B (2025) — a 27x increase in 2 years. Q1 2026 AI CapEx: $7.7B, implying $30B+ annualized pace.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capexData}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="ai" name="AI (xAI Compute) ($M)" stackId="a" fill={C.orange} />
                <Bar dataKey="connectivity" name="Connectivity (Satellites) ($M)" stackId="a" fill={C.sky} />
                <Bar dataKey="space" name="Space (Launch Infra) ($M)" stackId="a" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total 2025 CapEx: $20.7B. AI: $12.7B (61%), Connectivity: $4.2B (20%), Space: $3.8B (19%).</ChartNote>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">R&D Explosion</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">R&D as a % of revenue went from 20% to 46% in two years — unprecedented for a company at this scale.</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={rdExpansion}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis yAxisId="left" {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis yAxisId="right" orientation="right" {...AXIS} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="rd" name="R&D Spend ($M)" fill={C.orange} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="rdPct" name="R&D % of Revenue" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 5, strokeWidth: 2, stroke: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <ChartNote>R&D grew $2.1B → $3.5B → $8.6B. Microsoft spends ~15% of revenue on R&D. SpaceX is at 46%.</ChartNote>
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">PP&E Breakdown as of Dec 31, 2025 — What SpaceX Owns</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">Servers & networking ($22.7B) now exceeds satellites ($11.9B) as the largest asset class. The xAI GPU buildout has transformed SpaceX into one of the world&apos;s largest AI infrastructure operators.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ppeBreakdown.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="text-xs text-slate-500 mb-1">{item.name}</div>
                <div className="text-lg font-bold mb-2" style={{ color: item.color }}>{fmt(item.value)}</div>
                <div className="prog-bar w-full">
                  <div style={{ width: `${(item.value / 22694) * 100}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <ChartNote>Total gross PP&E: $55.3B as of Dec 31, 2025 (net of $12.7B accumulated depreciation = $42.6B). As of March 31, 2026, net PP&E reached $53.9B.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ CASH FLOWS ══════ */}
      <Section id="cashflows" title="Cash Flows & Balance Sheet" sub="SpaceX is generating strong operating cash flows, but investing aggressively — requiring significant external financing. The balance sheet is growing rapidly.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Cash Flow Statement</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Operating cash flow: $6.8B in 2025. Investing outflows: $19.6B. Q1 2026: $16.7B invested in a single quarter — $67B annualized pace.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="4 4" />
                <Bar dataKey="operating" name="Operating Cash Flow ($M)" fill={C.green} radius={[4, 4, 0, 0]} />
                <Bar dataKey="investing" name="Investing (Outflows) ($M)" fill={C.red} />
                <Bar dataKey="financing" name="Financing Inflows ($M)" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>2025 financing inflows of $26.4B funded the massive AI CapEx program. IPO proceeds will replenish the balance sheet.</ChartNote>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Balance Sheet Snapshot</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Total assets nearly doubled from $57B (Dec 2024) to $102B (Mar 2026) in just 15 months. Cash peaked at $24.7B end of 2025.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={balanceSheet}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="period" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="cash" name="Cash & Equivalents ($M)" fill={C.green} />
                <Bar dataKey="ppe" name="PP&E, net ($M)" fill={C.sky} />
                <Bar dataKey="totalLiabilities" name="Total Liabilities ($M)" fill={C.red} opacity={0.65} />
                <Bar dataKey="equity" name="Shareholders' Equity ($M)" fill={C.orange} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Post-IPO preferred stock conversion (6.7B shares) will dramatically increase shareholders&apos; equity. Total assets: $102B as of March 31, 2026.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ LAUNCHES & MASS TO ORBIT ══════ */}
      <Section id="launches" title="Launch Operations" sub="SpaceX conducted 170 orbital launches in 2025 — a new world record. More critically, they delivered 2,213 metric tons to orbit, representing 80%+ of all mass humanity sent to space that year.">
        <div className="card p-5 sm:p-7">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart data={launchMassData}>
              <CartesianGrid {...GRID} />
              <XAxis dataKey="year" {...AXIS} />
              <YAxis yAxisId="left" {...AXIS} />
              <YAxis yAxisId="right" orientation="right" {...AXIS} tickFormatter={(v) => `${v}t`} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="launches" name="Orbital Launches" fill={C.blue} radius={[4, 4, 0, 0]} opacity={0.85} />
              <Line yAxisId="right" type="monotone" dataKey="massToOrbit" name="Mass to Orbit (metric tons)" stroke={C.sky} strokeWidth={2.5} dot={{ fill: C.sky, r: 5, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartNote>2023: 98 launches / 1,210t | 2024: 138 / 1,699t | 2025: 170 / 2,213t | Q1 2026: 40 / 556t. SpaceX has a 99%+ mission success rate across 650+ orbital launches.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ VEHICLE FLEET ══════ */}
      <Section id="fleet" title="Vehicle Fleet" sub="Four vehicles powering humanity's expansion into space. Falcon 9 has now demonstrated 34 reuses on a single booster. Starship is the future.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicleFleet.map((v, i) => (
            <div key={i} className="card p-5 sm:p-6 group" style={{ borderColor: `${v.color}25` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{v.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ color: v.color, background: `${v.color}18` }}>{v.type}</span>
              </div>
              <div className="space-y-2.5 text-sm">
                {([["Height", v.height], ["Payload", v.payload], ["Engines", v.engines], ["Reuse", v.reuses], ["Missions", v.launches]] as [string, string][]).map(([label, val], j) => (
                  <div key={j} className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-slate-700 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
              <div className="h-0.5 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, ${v.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ BOOSTER REUSE ══════ */}
      <Section id="reuse" title="Reuse Leaderboard" sub="B1067 holds the record at 34 flights — a single booster reflown like a commercial aircraft. Over 540 of 650+ total launches used a flight-proven booster.">
        <div className="card p-5 sm:p-7">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boosterReuse} layout="vertical" margin={{ left: 5 }}>
              <CartesianGrid {...GRID} />
              <XAxis type="number" {...AXIS} />
              <YAxis type="category" dataKey="booster" {...AXIS} width={52} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="flights" name="Flights" radius={[0, 6, 6, 0]}>
                {boosterReuse.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? C.sky : i === 1 ? C.blue : `rgba(37,99,235,${0.65 - i * 0.07})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ChartNote>Every reflight amortizes the ~$60M booster cost. Falcon 9&apos;s LEO cost dropped 85% from $18,500/kg (2010) to ~$2,700/kg. Starship targets $67/kg.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ COST ══════ */}
      <Section id="cost" title="Cost Revolution" sub="Starship at $67/kg to LEO would be a 100x+ reduction from the Space Shuttle era. SpaceX's cost advantage is structural — rooted in vertical integration, software-first design, and reusability.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-2">Cost Per Launch ($M)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Internal cost for SpaceX (reusable). List price for competitors. Starship target is $10M fully reusable.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="vehicle" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="cost" name="Cost ($M)" radius={[4, 4, 0, 0]}>
                  {costComparison.map((e, i) => (
                    <Cell key={i} fill={e.vehicle.includes("Starship") ? C.green : e.vehicle.includes("Falcon") || e.vehicle.includes("F.") ? C.blue : C.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-2">Cost Per kg to LEO ($)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">The metric that matters for satellite economics and orbital AI compute. Starship at $67/kg unlocks orbital data centers.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="vehicle" {...AXIS} />
                <YAxis {...AXIS} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="costPerKg" name="$/kg to LEO" radius={[4, 4, 0, 0]}>
                  {costComparison.map((e, i) => (
                    <Cell key={i} fill={e.vehicle.includes("Starship") ? C.green : e.vehicle.includes("Falcon") || e.vehicle.includes("F.") ? C.sky : C.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ COMPETITIVE ══════ */}
      <Section id="competitive" title="Competitive Landscape" sub="SpaceX conducted 170 launches in 2025. The next closest competitor launched 20. SpaceX isn't just winning — it's operating in a different dimension.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-2">Capability Index (SpaceX = 100)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Six dimensions indexed to SpaceX. No competitor is close on any single dimension.</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} outerRadius={90}>
                <PolarGrid stroke="rgba(15,23,42,0.07)" />
                <PolarAngleAxis dataKey="subject" stroke={C.dim} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="SpaceX" dataKey="SpaceX" stroke={C.blue} fill={C.blue} fillOpacity={0.18} strokeWidth={2} />
                <Radar name="Blue Origin" dataKey="BlueOrigin" stroke={C.orange} fill={C.orange} fillOpacity={0.08} strokeWidth={1.5} />
                <Radar name="Rocket Lab" dataKey="RocketLab" stroke={C.green} fill={C.green} fillOpacity={0.08} strokeWidth={1.5} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
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
                    <td className={`font-semibold ${i === 0 ? "text-blue-600" : "text-slate-700"}`}>{c.name}</td>
                    <td>{c.launches2024}</td>
                    <td>{c.launches2025}</td>
                    <td>${c.revenue}B</td>
                    <td>{c.valuation > 0 ? `$${c.valuation}B` : "JV"}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="prog-bar w-16 sm:w-20">
                          <div style={{ width: `${c.reuse}%`, background: c.reuse > 50 ? C.green : c.reuse > 0 ? C.yellow : C.red }} />
                        </div>
                        <span className="text-slate-500 text-xs">{c.reuse > 0 ? `${c.reuse}%` : "None"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ChartNote>SpaceX revenue per the S-1 ($18.7B). Competitors are estimates. ULA is a Boeing/Lockheed JV.</ChartNote>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ GOV CONTRACTS ══════ */}
      <Section id="govcontracts" title="Government Contracts" sub="The U.S. government (NASA, DoD, Space Force) is SpaceX's anchor customer, representing 20.9% of 2025 revenue. SpaceX launched 11 of 12 NSSL missions in 2025.">
        <div className="card p-5 sm:p-7">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={govContracts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid {...GRID} />
              <XAxis type="number" {...AXIS} tickFormatter={(v) => `$${v}B`} />
              <YAxis type="category" dataKey="name" {...AXIS} width={130} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="Value ($B)" radius={[0, 6, 6, 0]}>
                {govContracts.map((e, i) => (
                  <Cell key={i} fill={e.agency === "NASA" ? C.blue : C.orange} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 justify-center">
            {([["NASA", C.blue], ["DoD / Space Force", C.orange]] as [string, string][]).map(([l, c]) => (
              <span key={l} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: c }} />{l}
              </span>
            ))}
          </div>
          <ChartNote>Customer A (U.S. federal government) = 20.9% of 2025 revenue (~$3.9B). SpaceX also launched all 5 U.S. crew and cargo missions to ISS in 2025.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ IPO COMPS ══════ */}
      <Section id="comps" title="Valuation Comps" sub="At a $1.75T target valuation on $18.7B in 2025 revenue, SpaceX would carry a ~94x revenue multiple — the richest for any mega-IPO in history.">
        <div className="card p-5 sm:p-7">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ipoCompsData}>
              <CartesianGrid {...GRID} />
              <XAxis dataKey="name" {...AXIS} />
              <YAxis {...AXIS} tickFormatter={(v) => `${v}x`} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="multiple" name="Revenue Multiple" radius={[4, 4, 0, 0]}>
                {ipoCompsData.map((e, i) => (
                  <Cell key={i} fill={e.name === "SpaceX" ? C.blue : "#cbd5e1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ChartNote>At ~94x revenue ($1.75T / $18.7B), SpaceX carries the richest multiple of any mega-IPO in history. Justified by Starlink&apos;s 63% EBITDA margin, Anthropic compute revenue ($15B/yr), and Starship optionality.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ VALUATION SCENARIOS ══════ */}
      <Section id="valuation" title="Valuation Scenarios" sub="SpaceX's $1.75T target valuation implies a 94x revenue multiple on 2025 revenue. The range of analyst scenarios and their implied revenue multiples.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Valuation Scenarios ($T)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">At $1.75T, SpaceX would surpass Saudi Aramco&apos;s 2019 IPO peak as the highest-valued company ever listed.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={valuationScenarios} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid {...GRID} />
                <XAxis type="number" {...AXIS} tickFormatter={(v) => `$${v / 1000}T`} domain={[0, 2800]} />
                <YAxis type="category" dataKey="scenario" {...AXIS} width={90} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="valuation" name="Valuation ($B)" radius={[0, 6, 6, 0]}>
                  {valuationScenarios.map((s, i) => (
                    <Cell key={i} fill={i === 1 ? C.sky : i === 0 ? "#cbd5e1" : i === 2 ? C.blue : C.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 content-start">
            {valuationScenarios.map((s, i) => {
              const colors = ["#cbd5e1", C.sky, C.blue, C.orange];
              return (
                <div key={i} className="ipo-card" style={{ borderColor: `${colors[i]}30` }}>
                  <div className="text-[10px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: colors[i] }}>{s.scenario}</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">${(s.valuation / 1000).toFixed(2)}T</div>
                  <div className="text-xs text-slate-500">{s.revenueMultiple}x 2025 revenue</div>
                </div>
              );
            })}
            <div className="col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-500 leading-relaxed">
              At the $1.75T target: SpaceX would be larger than Amazon ($2.2T) at today&apos;s prices. Connectivity alone at 63% EBITDA margins and 50% growth would justify ~$500B as a standalone.
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ TAM BREAKDOWN ══════ */}
      <Section id="tam" title="Total Addressable Market" sub="SpaceX claims a $28.5T TAM (ex China, ex Russia). The surprise: 93% of it is AI. The rocket business is $370B — just 1.3% of total TAM.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">TAM by Segment ($B)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">The S-1 frames SpaceX as an AI company that owns a rocket and satellite business. AI infrastructure alone ($2.4T) is 6.5x the entire connectivity TAM.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={tamBreakdown} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid {...GRID} />
                <XAxis type="number" {...AXIS} tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}T` : `$${v}B`} />
                <YAxis type="category" dataKey="segment" {...AXIS} width={170} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" name="TAM ($B)" radius={[0, 6, 6, 0]}>
                  {tamBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total TAM: $28.5T. AI: $26.5T (93%). Connectivity: $1.6T (5.6%). Space: $370B (1.3%). This framing justifies the premium multiple.</ChartNote>
          </div>
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">AI TAM Sub-Breakdown</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Enterprise AI applications ($22.7T) dwarf every other category. SpaceX&apos;s play: be the compute backbone via Colossus clusters, the Grok API, and eventually orbital AI infrastructure.</p>
            <div className="space-y-3 mt-2">
              {tamDetail.map((item, i) => {
                const segColor = item.parent === "AI" ? C.orange : item.parent === "Connectivity" ? C.sky : C.blue;
                const maxVal = 22700;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs text-slate-500 w-40 flex-shrink-0">{item.name}</div>
                    <div className="flex-1 prog-bar">
                      <div style={{ width: `${(item.value / maxVal) * 100}%`, background: segColor }} />
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
      <Section id="deals" title="Strategic Deals" sub="Three major deals disclosed in the S-1 — totaling over $94B in value. The Anthropic compute contract alone is $15B/year, instantly making SpaceX one of the largest AI cloud providers.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {strategicDeals.map((deal, i) => (
            <div key={i} className="ipo-card" style={{ borderColor: `${deal.color}30` }}>
              <div className="text-[10px] tracking-[0.15em] uppercase mb-2 font-semibold" style={{ color: deal.color }}>Strategic Deal</div>
              <div className="text-lg font-bold text-slate-900 mb-1">{deal.name}</div>
              <div className="text-2xl font-bold mb-2" style={{ color: deal.color }}>
                {deal.value >= 1000 ? `$${(deal.value / 1000).toFixed(0)}B` : `$${deal.value}M`}
                {deal.name === "Anthropic Compute" ? "/yr" : ""}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{deal.note}</p>
            </div>
          ))}
        </div>
        <div className="card p-5 sm:p-6">
          <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-4">Anthropic Compute Deal — The $45B Contract</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Monthly Fee", value: "$1.25B", desc: "Anthropic pays SpaceX to train on Colossus/Colossus II" },
              { label: "Annualized", value: "$15B/yr", desc: "One of the largest AI cloud contracts in history" },
              { label: "Total Contract", value: "$45B", desc: "Through May 2029 — 3 year term, 90-day termination" },
              { label: "Infrastructure", value: "~220K GPUs", desc: "Colossus (H100) + Colossus II (GB200/GB300) combined" },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] tracking-[0.12em] text-slate-400 uppercase mb-1 font-semibold">{s.label}</div>
                <div className="text-xl font-bold mb-1" style={{ color: C.sky }}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.desc}</div>
              </div>
            ))}
          </div>
          <ChartNote>Anthropic retains all IP. SpaceX provides infrastructure only. The deal validates Colossus as world-class AI compute — and generates significant cash flow to offset AI segment losses.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ DEBT & GOVERNANCE ══════ */}
      <Section id="debt" title="Debt Structure & Governance" sub="SpaceX has $29.1B in total debt — including a $20B bridge loan due September 2027 that must be refinanced or repaid with IPO proceeds. Musk holds 10:1 supervoting Class B shares.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Debt Breakdown</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">The $20B Goldman Sachs bridge loan (signed March 2, 2026) is the critical near-term item — due September 2027.</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={debtStructure} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid {...GRID} />
                <XAxis type="number" {...AXIS} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
                <YAxis type="category" dataKey="name" {...AXIS} width={195} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" name="Outstanding ($M)" radius={[0, 6, 6, 0]}>
                  {debtStructure.map((d, i) => <Cell key={i} fill={d.urgent ? C.red : C.blue} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Total principal: $29.1B. SpaceX Credit Facility ($5B capacity) is currently undrawn. $9.1B AI infra financing reflects failed AI asset sale-leaseback that converted to debt.</ChartNote>
          </div>
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-4">Share Structure & Governance</h3>
            <div className="space-y-3">
              {[
                { label: "Class A (1 vote/share)", detail: "2,882M outstanding. Public float. No special rights.", color: C.blue },
                { label: "Class B (10 votes/share)", detail: "2,421M outstanding. Musk controlled. Elects 51%+ of board. Converts to Class A on transfer.", color: C.orange },
                { label: "Class C (→ Class A at IPO)", detail: "494M shares reclassified to Class A upon IPO completion.", color: "#94a3b8" },
                { label: "Preferred Stock (→ Class A + B)", detail: "$7B book value. Converts upon IPO (Preferred Conversion). ~6.7B new shares pro forma.", color: C.yellow },
                { label: "Controlled Company", detail: "Musk's Class B shares give effective voting control. Board need not have independent majority.", color: C.red },
                { label: "Mandatory Arbitration", detail: "No jury trials, no class actions, 3% derivative threshold. Governance concerns cited as top risk.", color: C.red },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 mb-0.5">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ LAUNCH ECONOMICS ══════ */}
      <Section id="economics" title="Launch Economics" sub="Of SpaceX's 170 launches in 2025, only 43 (25%) were for paying customers. The majority — 122 — were internal Starlink constellation deployments.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-1">Internal vs. Customer Launches</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">SpaceX doesn&apos;t recognize inter-segment revenue for Starlink deployments. Internally, the rocket business is the enabler of an $11.4B revenue stream.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={internalVsCustomer}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="year" {...AXIS} />
                <YAxis {...AXIS} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ color: "#64748b", fontSize: 11 }} />
                <Bar dataKey="internal" name="Internal (Starlink)" stackId="a" fill={C.sky} />
                <Bar dataKey="customer" name="Customer Launches" stackId="a" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ChartNote>Customer launches drive Space segment revenue ($4.1B in 2025). Internal launches fund Connectivity growth. Both are essential.</ChartNote>
          </div>
          <div className="card p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.12em] text-slate-400 uppercase font-semibold mb-3">X Platform Metrics (AI Segment)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">X is the distribution and data engine for Grok — 350M daily posts create a proprietary real-time training stream no other AI company can replicate.</p>
            <div className="space-y-3">
              {xPlatformMetrics.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100">
                  <span className="text-sm text-slate-500">{item.metric}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">{item.value}</div>
                    <div className="text-[10px] text-slate-400">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ STARSHIP TESTS ══════ */}
      <Section id="starship" title="Starship Flight Tests" sub="Eleven Integrated Flight Tests across 2023–2026. From total failure to commercial payload readiness in under 3 years — the fastest development timeline for a super-heavy launch vehicle in history.">
        <div className="card overflow-x-auto">
          <table className="w-full sx-table min-w-[480px]">
            <thead><tr>{["Flight", "Date", "Result", "Milestone"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {starshipTests.map((fl, i) => (
                <tr key={i}>
                  <td className="font-mono text-slate-900 font-bold">{fl.f}</td>
                  <td>{fl.d}</td>
                  <td><span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: fl.c, background: `${fl.c}18` }}>{fl.r}</span></td>
                  <td className="text-slate-500">{fl.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ChartNote>Starship produces 16.7M lbf of thrust — ~2x Saturn V. 11 flight tests confirmed in S-1. Commercial payload operations expected H2 2026. Target cost: $67/kg to LEO.</ChartNote>
        </div>
      </Section>

      <div className="accent-rule" />

      {/* ══════ TIMELINE ══════ */}
      <Section id="timeline" title="The SpaceX Story" sub="Key milestones across 24 years — from a startup with three failed launches to the most valuable company to ever file for IPO.">
        <div className="relative">
          <div className="absolute left-[5px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/35 to-transparent md:-translate-x-px" />
          <div className="space-y-5 sm:space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className={`tl-item relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 md:-translate-x-[6px] mt-1 z-10">
                  <div className="tl-dot" />
                </div>
                <div className={`ml-7 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                  <div className={`flex items-center gap-2 mb-0.5 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                    <span className="text-xs font-mono text-blue-500/80 font-semibold">{m.year}</span>
                    <span className="text-slate-900 font-semibold text-sm">{m.event}</span>
                  </div>
                  <p className="text-sm text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      <div className="accent-rule" />

      {/* ══════ RISK/REWARD ══════ */}
      <Section id="risks" title="IPO Risk / Reward" sub="The bull and bear cases investors must weigh before the largest public offering in history.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tag: "BULL", title: "Starlink: $7.2B EBITDA Machine", desc: "63% Adjusted EBITDA margin on $11.4B revenue. Doubling subscribers every 18 months. Enterprise, government, and mobile are all still early innings.", color: C.green },
            { tag: "BULL", title: "Structural Launch Monopoly", desc: "170 launches in 2025 — more than every other entity on Earth combined. Falcon 9's 34-reuse record means each marginal launch costs ~$15M vs. $100M+ for competitors.", color: C.green },
            { tag: "BULL", title: "Starship + Orbital AI Compute", desc: "At $67/kg, Starship makes orbital data centers economically viable. SpaceX already has the satellite manufacturing, in-orbit engineering, and launch cadence to execute.", color: C.green },
            { tag: "BEAR", title: "$4.9B Net Loss in 2025", desc: "GAAP losses driven by $8.6B in R&D (46% of revenue). AI segment lost $6.4B from operations. Requires sustained conviction that AI infrastructure investment will generate returns.", color: C.red },
            { tag: "BEAR", title: "94x Revenue Multiple", desc: "The richest multiple in mega-IPO history. Requires Starlink to continue growing at 50%+, xAI to monetize at scale, and Starship to achieve full reusability. Any slip compounds the premium risk.", color: C.red },
            { tag: "BEAR", title: "Key-Person & Regulatory Risk", desc: "Elon Musk leads SpaceX, xAI, X, Tesla, and DOGE simultaneously. Spectrum regulation (FCC, international) can throttle Starlink growth. Government customer concentration at 20.9% of revenue.", color: C.red },
          ].map((card, i) => (
            <div key={i} className="ipo-card" style={{ borderColor: `${card.color}22` }}>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: card.color }} />
                <span style={{ color: card.color }}>{card.tag}</span>
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-slate-200 py-10 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-400 text-xs text-center max-w-xl leading-relaxed">
            All financial data sourced directly from Space Exploration Technologies Corp. S-1 Registration Statement filed with the SEC (May 2026). Revenue, loss, and EBITDA figures reflect the combined company including xAI and X Holdings Corp. Not investment advice.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors font-medium">
              @Trace_Cohen
            </a>
            <span className="text-slate-300">|</span>
            <a href="mailto:t@nyvp.com" className="text-slate-400 hover:text-blue-600 transition-colors font-medium">
              t@nyvp.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
