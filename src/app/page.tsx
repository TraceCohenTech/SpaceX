"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────

const launchData = [
  { year: "'06", launches: 1, landings: 0 },
  { year: "'07", launches: 1, landings: 0 },
  { year: "'08", launches: 2, landings: 0 },
  { year: "'09", launches: 1, landings: 0 },
  { year: "'10", launches: 2, landings: 0 },
  { year: "'12", launches: 2, landings: 0 },
  { year: "'13", launches: 3, landings: 0 },
  { year: "'14", launches: 6, landings: 0 },
  { year: "'15", launches: 7, landings: 1 },
  { year: "'16", launches: 8, landings: 5 },
  { year: "'17", launches: 18, landings: 14 },
  { year: "'18", launches: 21, landings: 17 },
  { year: "'19", launches: 13, landings: 11 },
  { year: "'20", launches: 26, landings: 23 },
  { year: "'21", launches: 31, landings: 29 },
  { year: "'22", launches: 61, landings: 58 },
  { year: "'23", launches: 98, landings: 88 },
  { year: "'24", launches: 134, landings: 126 },
  { year: "'25", launches: 30, landings: 28 },
];

const revenueData = [
  { year: "2020", total: 2.0, starlink: 0.05, launch: 1.95 },
  { year: "2021", total: 3.0, starlink: 1.0, launch: 2.0 },
  { year: "2022", total: 4.6, starlink: 2.5, launch: 2.1 },
  { year: "2023", total: 8.7, starlink: 5.5, launch: 3.2 },
  { year: "2024", total: 14.0, starlink: 8.0, launch: 6.0 },
  { year: "2025", total: 16.0, starlink: 10.6, launch: 5.4 },
  { year: "2026E", total: 22.0, starlink: 15.0, launch: 7.0 },
];

const valuationData = [
  { date: "2012", valuation: 2.4 },
  { date: "2015", valuation: 12 },
  { date: "2019", valuation: 33 },
  { date: "2020", valuation: 46 },
  { date: "2021", valuation: 100 },
  { date: "2022", valuation: 137 },
  { date: "H1 '23", valuation: 150 },
  { date: "H2 '23", valuation: 180 },
  { date: "H1 '24", valuation: 210 },
  { date: "H2 '24", valuation: 350 },
  { date: "IPO '26", valuation: 1500 },
];

const starlinkGrowth = [
  { year: "2020", satellites: 1020, subscribers: 0.01 },
  { year: "2021", satellites: 2040, subscribers: 0.15 },
  { year: "2022", satellites: 3900, subscribers: 1.0 },
  { year: "2023", satellites: 5700, subscribers: 2.3 },
  { year: "2024", satellites: 7500, subscribers: 4.0 },
  { year: "2025", satellites: 8500, subscribers: 9.2 },
  { year: "2026E", satellites: 12000, subscribers: 18.4 },
];

const marketShareData = [
  { year: "2020", spacex: 23, rest: 77 },
  { year: "2021", spacex: 21, rest: 79 },
  { year: "2022", spacex: 33, rest: 67 },
  { year: "2023", spacex: 44, rest: 56 },
  { year: "2024", spacex: 52, rest: 48 },
];

const costComparison = [
  { vehicle: "Starship (Target)", cost: 10, costPerKg: 67 },
  { vehicle: "Falcon 9", cost: 28, costPerKg: 1228 },
  { vehicle: "Falcon Heavy", cost: 97, costPerKg: 1520 },
  { vehicle: "Ariane 6", cost: 96, costPerKg: 4444 },
  { vehicle: "Vulcan", cost: 115, costPerKg: 4228 },
  { vehicle: "New Glenn", cost: 100, costPerKg: 2222 },
];

const competitorData = [
  { name: "SpaceX", launches: 134, revenue: 16, valuation: 1500, reuse: 95 },
  { name: "Rocket Lab", launches: 16, revenue: 0.4, valuation: 11, reuse: 10 },
  { name: "Blue Origin", launches: 1, revenue: 0.1, valuation: 13, reuse: 5 },
  { name: "ULA", launches: 3, revenue: 3.0, valuation: 0, reuse: 0 },
  { name: "Arianespace", launches: 4, revenue: 1.5, valuation: 0, reuse: 0 },
];

const ipoCompsData = [
  { name: "SpaceX (Target)", multiple: 94 },
  { name: "Saudi Aramco (IPO)", multiple: 18 },
  { name: "Rivian (IPO)", multiple: 90 },
  { name: "Palantir (Current)", multiple: 55 },
  { name: "Rocket Lab", multiple: 28 },
];

const boosterReuse = [
  { booster: "B1062", flights: 23 },
  { booster: "B1061", flights: 22 },
  { booster: "B1060", flights: 21 },
  { booster: "B1058", flights: 20 },
  { booster: "B1069", flights: 19 },
  { booster: "B1067", flights: 18 },
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
  { year: "2002", event: "Founded", desc: "Elon Musk invests $100M to start SpaceX in El Segundo, CA" },
  { year: "2008", event: "First Orbit", desc: "Falcon 1 becomes first privately-funded liquid rocket to reach orbit" },
  { year: "2012", event: "ISS Docking", desc: "Dragon becomes first commercial spacecraft to berth with the ISS" },
  { year: "2015", event: "First Landing", desc: "Falcon 9 booster lands upright for the first time — rewriting spaceflight" },
  { year: "2017", event: "First Reflight", desc: "First orbital-class booster reused — proving the economics of reuse" },
  { year: "2018", event: "Falcon Heavy", desc: "Most powerful operational rocket launches a Tesla Roadster toward Mars" },
  { year: "2020", event: "Crew to ISS", desc: "Demo-2: First crewed orbital flight by a commercial company" },
  { year: "2021", event: "Inspiration4", desc: "First all-civilian orbital mission — 4 private citizens circle Earth" },
  { year: "2023", event: "Starship Flies", desc: "Most powerful rocket ever built lifts off from Starbase, Texas" },
  { year: "2024", event: "Tower Catch", desc: "Super Heavy booster caught mid-air by Mechazilla tower arms" },
  { year: "2024", event: "134 Launches", desc: "More orbital launches than every other entity on Earth combined" },
  { year: "2026", event: "IPO", desc: "Targeting $1.5T valuation — the largest IPO in history" },
];

const vehicleFleet = [
  { name: "FALCON 9", type: "Medium-Lift", height: "70m", payload: "22,800 kg", engines: "9 Merlin", reuses: "23x record", launches: "370+" },
  { name: "FALCON HEAVY", type: "Heavy-Lift", height: "70m", payload: "63,800 kg", engines: "27 Merlin", reuses: "Side boosters", launches: "11" },
  { name: "STARSHIP", type: "Super Heavy-Lift", height: "121m", payload: "150,000+ kg", engines: "33 Raptor", reuses: "Full (goal)", launches: "7 IFTs" },
  { name: "DRAGON", type: "Crew & Cargo", height: "8.1m", payload: "6,000 kg", engines: "SuperDraco", reuses: "Multi-flight", launches: "50+" },
];

const govContracts = [
  { name: "NSSL Phase 2", value: 5.6, agency: "Space Force" },
  { name: "CRS Cargo", value: 4.6, agency: "NASA" },
  { name: "Artemis HLS", value: 4.0, agency: "NASA" },
  { name: "Commercial Crew", value: 2.6, agency: "NASA" },
  { name: "Starshield", value: 1.8, agency: "DoD" },
];

const W = {
  100: "rgba(255,255,255,1)",
  90: "rgba(255,255,255,0.9)",
  70: "rgba(255,255,255,0.7)",
  50: "rgba(255,255,255,0.5)",
  35: "rgba(255,255,255,0.35)",
  25: "rgba(255,255,255,0.25)",
  15: "rgba(255,255,255,0.15)",
  10: "rgba(255,255,255,0.1)",
};

// ─── TOOLTIP ─────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function ChartTip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-black border border-white/20 px-4 py-3 text-sm">
      <p className="text-white/90 font-medium mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{ color: e.color }} className="text-xs">
          {e.name}: <span className="font-semibold">{e.value}</span>
        </p>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── SECTION HEADER ──────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{title}</h2>
        {subtitle && <p className="text-white/50 text-sm md:text-base max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────

export default function SpaceXDashboard() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ══════ HERO ══════ */}
      <div className="hero-section">
        <img
          src="https://live.staticflickr.com/65535/54098952498_5c8ec2a1e5_k.jpg"
          alt="Starship launch"
          className="hero-bg"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="fade-in delay-1">
            <span className="tag mb-8 inline-block">June 2026 — IPO Filing Imminent</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 fade-in delay-2">
            SPACEX
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide mb-2 fade-in delay-3">
            THE ROAD TO
          </p>
          <p className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 fade-in delay-4">
            $1.5 TRILLION
          </p>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto fade-in delay-5">
            The largest IPO in history. From a garage in El Segundo to the most valuable company to ever go public.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 z-10 fade-in delay-6">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30 mx-auto mb-2" />
          <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </div>

      {/* ══════ KEY METRICS BAR ══════ */}
      <div className="bg-white/[0.03] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { value: "$1.5T", label: "IPO VALUATION" },
            { value: "$75B", label: "TARGET RAISE" },
            { value: "400+", label: "ORBITAL LAUNCHES" },
            { value: "9.2M", label: "STARLINK SUBS" },
            { value: "$16B", label: "2025 REVENUE" },
            { value: "98%", label: "LANDING RATE" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="stat-value text-3xl md:text-4xl text-white mb-1">{s.value}</div>
              <div className="text-[10px] tracking-[0.15em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ IPO DETAILS ══════ */}
      <Section title="IPO Overview" subtitle="SpaceX is preparing to file for the largest public offering in history, targeting a June 2026 listing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {[
            { label: "TARGET VALUATION", value: "$1.5 — $1.75T", desc: "Would make it the most valuable IPO ever, surpassing Saudi Aramco ($1.7T)" },
            { label: "CAPITAL RAISE", value: "$50 — $75B", desc: "Floating ~3.3% of equity. Funds earmarked for Starship, Starlink, and space-based data centers" },
            { label: "TIMELINE", value: "June 2026", desc: "Musk targeting mid-June when Jupiter and Venus align — just weeks before his 55th birthday" },
            { label: "2025 REVENUE", value: "$16.0B", desc: "Starlink drove $10.6B (67% of total) with 54% EBITDA margins" },
            { label: "2025 EBITDA", value: "$7.5B", desc: "Company-wide EBITDA reflecting Starlink profitability and launch services" },
            { label: "STARLINK SUBS", value: "9.2M", desc: "Doubled subscriber base two years running. On track to reach 18.4M in 2026" },
          ].map((item, i) => (
            <div key={i} className="bg-black p-8">
              <div className="text-[10px] tracking-[0.15em] text-white/40 mb-3">{item.label}</div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">{item.value}</div>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ LAUNCH HISTORY ══════ */}
      <Section title="Launch History" subtitle="From 1 failed launch in 2006 to 134 in 2024 — more than every other entity on Earth combined">
        <div className="card p-6 md:p-8">
          <ResponsiveContainer width="100%" height={420}>
            <ComposedChart data={launchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
              <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
              <Tooltip content={<ChartTip />} />
              <Legend wrapperStyle={{ color: W[50], fontSize: 12 }} />
              <Bar dataKey="launches" name="Total Launches" fill={W[25]} radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="landings" name="Successful Landings" stroke={W[90]} strokeWidth={2} dot={{ fill: W[90], r: 2.5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ REVENUE ══════ */}
      <Section title="Revenue Trajectory" subtitle="Starlink now drives 67% of total revenue — the engine behind the IPO">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">REVENUE BREAKDOWN ($B)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
                <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<ChartTip />} />
                <Legend wrapperStyle={{ color: W[50], fontSize: 12 }} />
                <Area type="monotone" dataKey="starlink" name="Starlink" stackId="1" stroke={W[90]} fill="rgba(255,255,255,0.15)" />
                <Area type="monotone" dataKey="launch" name="Launch Services" stackId="1" stroke={W[50]} fill="rgba(255,255,255,0.05)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">VALUATION GROWTH ($B)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="valG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="95%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke={W[35]} tick={{ fill: W[50], fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="valuation" name="Valuation ($B)" stroke={W[90]} strokeWidth={2} fill="url(#valG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ STARLINK ══════ */}
      <div className="relative">
        <img
          src="https://live.staticflickr.com/65535/53378726498_e55a2b2f9e_k.jpg"
          alt="Starlink satellites"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="relative">
          <Section title="Starlink" subtitle="The world's largest satellite constellation — 9.2M subscribers across 150+ countries, doubling annually">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-8">
              {[
                { val: "9.2M", label: "SUBSCRIBERS", sub: "Doubling every year" },
                { val: "$10.6B", label: "2025 REVENUE", sub: "67% of SpaceX total" },
                { val: "54%", label: "EBITDA MARGIN", sub: "$5.8B in 2025" },
                { val: "150+", label: "COUNTRIES", sub: "Direct-to-cell coming" },
              ].map((s, i) => (
                <div key={i} className="bg-black/80 backdrop-blur-sm p-6 md:p-8 text-center">
                  <div className="stat-value text-3xl md:text-4xl text-white mb-1">{s.val}</div>
                  <div className="text-[10px] tracking-[0.15em] text-white/40 mb-1">{s.label}</div>
                  <div className="text-xs text-white/25">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-black/60 backdrop-blur-sm p-6 md:p-8">
                <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">CONSTELLATION SIZE</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={starlinkGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
                    <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="satellites" name="Satellites in Orbit" fill={W[25]} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="card bg-black/60 backdrop-blur-sm p-6 md:p-8">
                <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">SUBSCRIBER GROWTH (MILLIONS)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={starlinkGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
                    <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
                    <Tooltip content={<ChartTip />} />
                    <Line type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={W[100]} strokeWidth={2.5} dot={{ fill: W[100], r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <div className="spacex-rule" />

      {/* ══════ VEHICLE FLEET ══════ */}
      <Section title="Vehicle Fleet" subtitle="Four vehicles. One mission. Making life multiplanetary.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {vehicleFleet.map((v, i) => (
            <div key={i} className="bg-black p-8">
              <h3 className="text-lg font-bold tracking-wider text-white mb-1">{v.name}</h3>
              <p className="text-xs text-white/35 mb-6">{v.type}</p>
              <div className="space-y-3 text-sm">
                {([
                  ["Height", v.height],
                  ["Payload (LEO)", v.payload],
                  ["Engines", v.engines],
                  ["Reusability", v.reuses],
                  ["Missions", v.launches],
                ] as [string, string][]).map(([label, val], j) => (
                  <div key={j} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/35">{label}</span>
                    <span className="text-white/80 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ BOOSTER REUSE ══════ */}
      <Section title="Reuse Leaderboard" subtitle="A single Falcon 9 booster has flown 23 times — the economics that make the IPO possible">
        <div className="card p-6 md:p-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boosterReuse} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
              <YAxis type="category" dataKey="booster" stroke={W[35]} tick={{ fill: W[50], fontSize: 12 }} width={55} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="flights" name="Flights" radius={[0, 2, 2, 0]}>
                {boosterReuse.map((_, i) => (
                  <Cell key={i} fill={`rgba(255,255,255,${0.7 - i * 0.08})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ COST REVOLUTION ══════ */}
      <Section title="Cost Revolution" subtitle="SpaceX has slashed launch costs by 10x. Starship aims for 100x.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">COST PER LAUNCH ($M)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="vehicle" stroke={W[35]} tick={{ fill: W[50], fontSize: 9 }} angle={-25} textAnchor="end" height={70} />
                <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="cost" name="Cost ($M)" radius={[2, 2, 0, 0]}>
                  {costComparison.map((entry, i) => (
                    <Cell key={i} fill={entry.vehicle.includes("SpaceX") || entry.vehicle.includes("Falcon") || entry.vehicle.includes("Starship") ? W[70] : W[25]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">COST PER KG TO LEO ($)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="vehicle" stroke={W[35]} tick={{ fill: W[50], fontSize: 9 }} angle={-25} textAnchor="end" height={70} />
                <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="costPerKg" name="$/kg to LEO" radius={[2, 2, 0, 0]}>
                  {costComparison.map((entry, i) => (
                    <Cell key={i} fill={entry.vehicle.includes("SpaceX") || entry.vehicle.includes("Falcon") || entry.vehicle.includes("Starship") ? W[70] : W[25]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ COMPETITIVE DOMINANCE ══════ */}
      <Section title="Competitive Landscape" subtitle="There is no close second">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">GLOBAL LAUNCH MARKET SHARE (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} />
                <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip content={<ChartTip />} />
                <Legend wrapperStyle={{ color: W[50], fontSize: 12 }} />
                <Area type="monotone" dataKey="spacex" name="SpaceX" stackId="1" stroke={W[90]} fill="rgba(255,255,255,0.15)" />
                <Area type="monotone" dataKey="rest" name="Everyone Else" stackId="1" stroke={W[25]} fill="rgba(255,255,255,0.03)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6 md:p-8">
            <h3 className="text-xs tracking-[0.15em] text-white/40 mb-6">CAPABILITY INDEX (NORMALIZED)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} outerRadius={100}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke={W[35]} tick={{ fill: W[50], fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="SpaceX" dataKey="SpaceX" stroke={W[90]} fill="rgba(255,255,255,0.15)" />
                <Radar name="Blue Origin" dataKey="BlueOrigin" stroke={W[35]} fill="rgba(255,255,255,0.03)" />
                <Radar name="Rocket Lab" dataKey="RocketLab" stroke={W[25]} fill="rgba(255,255,255,0.02)" />
                <Legend wrapperStyle={{ color: W[50], fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full spacex-table">
            <thead>
              <tr>
                {["Company", "2024 Launches", "Revenue", "Valuation", "Reusability"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitorData.map((c, i) => (
                <tr key={i}>
                  <td className={`font-medium ${i === 0 ? "text-white" : ""}`}>{c.name}</td>
                  <td>{c.launches}</td>
                  <td>${c.revenue}B</td>
                  <td>{c.valuation > 0 ? `$${c.valuation}B` : "JV"}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="progress-bar w-20">
                        <div className="progress-fill" style={{ width: `${c.reuse}%` }} />
                      </div>
                      <span className="text-white/40 text-xs">{c.reuse > 0 ? `${c.reuse}%` : "None"}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ GOVERNMENT CONTRACTS ══════ */}
      <Section title="Government Contracts" subtitle="$18.6B in combined NASA, DoD, and Space Force contract value">
        <div className="card p-6 md:p-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={govContracts} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
              <YAxis type="category" dataKey="name" stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} width={110} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="value" name="Contract Value ($B)" radius={[0, 2, 2, 0]}>
                {govContracts.map((entry, i) => (
                  <Cell key={i} fill={entry.agency === "NASA" ? W[50] : W[25]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-8 mt-4 justify-center">
            {[["NASA", W[50]], ["DoD / Space Force", W[25]]].map(([label, color]) => (
              <span key={label} className="flex items-center gap-2 text-xs text-white/40">
                <span className="w-3 h-[2px]" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ IPO COMPS ══════ */}
      <Section title="Valuation Comps" subtitle="At ~94x revenue, SpaceX would carry the richest multiple of any mega-IPO in history">
        <div className="card p-6 md:p-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ipoCompsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke={W[35]} tick={{ fill: W[50], fontSize: 10 }} />
              <YAxis stroke={W[35]} tick={{ fill: W[50], fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="multiple" name="Revenue Multiple" radius={[2, 2, 0, 0]}>
                {ipoCompsData.map((entry, i) => (
                  <Cell key={i} fill={entry.name.includes("SpaceX") ? W[90] : W[15]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ STARSHIP TESTS ══════ */}
      <Section title="Starship Flight Tests" subtitle="The most powerful rocket ever built — 33 engines, 16.7 million lbf of thrust, rapid iteration">
        <div className="card overflow-x-auto">
          <table className="w-full spacex-table">
            <thead>
              <tr>
                {["Flight", "Date", "Result", "Milestone"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { f: "IFT-1", d: "Apr 20, 2023", r: "FAILURE", detail: "FTS activated at T+4 min — vehicle tumbled after liftoff" },
                { f: "IFT-2", d: "Nov 18, 2023", r: "PARTIAL", detail: "First successful stage separation" },
                { f: "IFT-3", d: "Mar 14, 2024", r: "PARTIAL", detail: "Reached space — valuable re-entry data collected" },
                { f: "IFT-4", d: "Jun 6, 2024", r: "SUCCESS", detail: "Both stages survived — first full-profile flight" },
                { f: "IFT-5", d: "Oct 13, 2024", r: "HISTORIC", detail: "Super Heavy caught by Mechazilla tower arms" },
                { f: "IFT-6", d: "Nov 19, 2024", r: "PARTIAL", detail: "Ship reached orbit — deployed 10 test satellites" },
                { f: "IFT-7", d: "Jan 16, 2025", r: "SUCCESS", detail: "Ship in orbit — booster caught by tower again" },
              ].map((flight, i) => (
                <tr key={i}>
                  <td className="font-mono text-white font-medium">{flight.f}</td>
                  <td>{flight.d}</td>
                  <td>
                    <span className={`text-xs tracking-wider font-medium ${
                      flight.r === "SUCCESS" || flight.r === "HISTORIC" ? "text-white" :
                      flight.r === "PARTIAL" ? "text-white/50" : "text-white/30"
                    }`}>
                      {flight.r}
                    </span>
                  </td>
                  <td className="text-white/50">{flight.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ TIMELINE ══════ */}
      <Section title="The SpaceX Story" subtitle="22 years from startup to the largest IPO in history">
        <div className="relative">
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className={`relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 w-[15px] h-[15px] border border-white/30 bg-black rounded-full transform md:-translate-x-[7px] mt-3 z-10">
                  <div className="w-[5px] h-[5px] bg-white/70 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                  <div className={`flex items-center gap-3 mb-1 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                    <span className="text-xs font-mono text-white/35">{m.year}</span>
                    <span className="text-white font-semibold text-sm">{m.event}</span>
                  </div>
                  <p className="text-sm text-white/35">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="spacex-rule" />

      {/* ══════ BY THE NUMBERS ══════ */}
      <Section title="By The Numbers">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
          {[
            { val: "22", unit: "years", label: "Founding to largest IPO ever" },
            { val: "134", unit: "", label: "Launches in 2024 alone" },
            { val: "33", unit: "", label: "Raptor engines on Super Heavy" },
            { val: "23", unit: "x", label: "Single booster reuse record" },
            { val: "2.8", unit: "days", label: "Avg time between launches" },
            { val: "~70", unit: "", label: "Humans launched to orbit" },
            { val: "121", unit: "m", label: "Starship — tallest rocket ever" },
            { val: "16.7M", unit: "lbf", label: "Super Heavy liftoff thrust" },
            { val: "13K", unit: "+", label: "SpaceX employees" },
            { val: "52", unit: "%", label: "Global launch market share" },
            { val: "$67", unit: "/kg", label: "Starship target cost to LEO" },
            { val: "1st", unit: "", label: "Private company to send crew to orbit" },
          ].map((stat, i) => (
            <div key={i} className="bg-black p-6 md:p-8 text-center">
              <div className="stat-value text-3xl md:text-4xl text-white mb-1">
                {stat.val}<span className="text-base text-white/35 ml-0.5">{stat.unit}</span>
              </div>
              <div className="text-[10px] tracking-[0.1em] text-white/30 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════ IPO OUTLOOK CARDS ══════ */}
      <Section title="IPO Risk/Reward" subtitle="What investors need to know before the largest public offering in history">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {[
            { tag: "BULL", title: "Starlink Dominance", desc: "9.2M subscribers, 54% EBITDA margins, doubling annually. Direct-to-cell partnership with T-Mobile expands TAM to billions." },
            { tag: "BULL", title: "Monopoly on Reuse", desc: "No competitor has demonstrated orbital-class reuse at scale. Falcon 9 margins widen with every reflight." },
            { tag: "BULL", title: "Starship Unlocks Everything", desc: "Space-based data centers, Mars missions, point-to-point transport. Starship makes $67/kg to LEO possible." },
            { tag: "BEAR", title: "Key-Person Risk", desc: "Musk simultaneously leads two $1T+ companies. \"Most divisive stock to join the market\" — AJ Bell analyst." },
            { tag: "BEAR", title: "94x Revenue Multiple", desc: "At $1.5T, SpaceX trades richer than any mega-IPO in history. Requires sustained hypergrowth to justify." },
            { tag: "BEAR", title: "Macro & Regulatory", desc: "Tariff threats, rate uncertainty, unfiled S-1, global roadshow logistics, and international spectrum regulation." },
          ].map((card, i) => (
            <div key={i} className="bg-black p-8">
              <span className={`text-[10px] tracking-[0.2em] font-medium mb-4 inline-block ${card.tag === "BULL" ? "text-white/70" : "text-white/35"}`}>
                {card.tag}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-white/10 py-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/25 text-xs text-center max-w-xl leading-relaxed">
            Data from public filings, analyst estimates, Bloomberg, Financial Times, and official SpaceX announcements.
            Revenue and valuation figures are estimates for a private company. This is not investment advice.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white transition-colors">
              @Trace_Cohen
            </a>
            <span className="text-white/10">|</span>
            <a href="mailto:t@nyvp.com" className="text-white/35 hover:text-white transition-colors">
              t@nyvp.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
