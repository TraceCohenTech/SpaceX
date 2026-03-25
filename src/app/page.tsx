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
  { year: "2006", launches: 1, landings: 0 },
  { year: "2007", launches: 1, landings: 0 },
  { year: "2008", launches: 2, landings: 0 },
  { year: "2009", launches: 1, landings: 0 },
  { year: "2010", launches: 2, landings: 0 },
  { year: "2012", launches: 2, landings: 0 },
  { year: "2013", launches: 3, landings: 0 },
  { year: "2014", launches: 6, landings: 0 },
  { year: "2015", launches: 7, landings: 1 },
  { year: "2016", launches: 8, landings: 5 },
  { year: "2017", launches: 18, landings: 14 },
  { year: "2018", launches: 21, landings: 17 },
  { year: "2019", launches: 13, landings: 11 },
  { year: "2020", launches: 26, landings: 23 },
  { year: "2021", launches: 31, landings: 29 },
  { year: "2022", launches: 61, landings: 58 },
  { year: "2023", launches: 98, landings: 88 },
  { year: "2024", launches: 134, landings: 126 },
  { year: "2025*", launches: 30, landings: 28 },
];

const revenueData = [
  { year: "2020", total: 2.0, starlink: 0.05, launch: 1.95 },
  { year: "2021", total: 3.0, starlink: 1.0, launch: 2.0 },
  { year: "2022", total: 4.6, starlink: 2.5, launch: 2.1 },
  { year: "2023", total: 8.7, starlink: 5.5, launch: 3.2 },
  { year: "2024", total: 14.0, starlink: 8.0, launch: 6.0 },
  { year: "2025E", total: 20.0, starlink: 13.5, launch: 6.5 },
];

const valuationData = [
  { date: "2012", valuation: 2.4 },
  { date: "2015", valuation: 12 },
  { date: "2019", valuation: 33 },
  { date: "2020", valuation: 46 },
  { date: "2021", valuation: 100 },
  { date: "2022", valuation: 137 },
  { date: "2023 H1", valuation: 150 },
  { date: "2023 H2", valuation: 180 },
  { date: "2024 H1", valuation: 210 },
  { date: "2024 H2", valuation: 350 },
];

const starlinkGrowth = [
  { year: "2020", satellites: 1020, subscribers: 0.01 },
  { year: "2021", satellites: 2040, subscribers: 0.15 },
  { year: "2022", satellites: 3900, subscribers: 1.0 },
  { year: "2023", satellites: 5700, subscribers: 2.3 },
  { year: "2024", satellites: 7500, subscribers: 4.0 },
  { year: "2025E", satellites: 8500, subscribers: 5.5 },
];

const marketShareData = [
  { year: "2020", spacex: 23, rest: 77 },
  { year: "2021", spacex: 21, rest: 79 },
  { year: "2022", spacex: 33, rest: 67 },
  { year: "2023", spacex: 44, rest: 56 },
  { year: "2024", spacex: 52, rest: 48 },
];

const costComparison = [
  { vehicle: "Starship (Target)", cost: 10, payload: 150000, costPerKg: 67 },
  { vehicle: "Falcon 9", cost: 28, payload: 22800, costPerKg: 1228 },
  { vehicle: "Falcon Heavy", cost: 97, payload: 63800, costPerKg: 1520 },
  { vehicle: "Ariane 6", cost: 96, payload: 21600, costPerKg: 4444 },
  { vehicle: "Vulcan", cost: 115, payload: 27200, costPerKg: 4228 },
  { vehicle: "New Glenn", cost: 100, payload: 45000, costPerKg: 2222 },
];

const competitorData = [
  { name: "SpaceX", launches: 134, revenue: 14, valuation: 350, reuse: 95 },
  { name: "Rocket Lab", launches: 16, revenue: 0.4, valuation: 11, reuse: 10 },
  { name: "Blue Origin", launches: 0, revenue: 0.1, valuation: 13, reuse: 5 },
  { name: "ULA", launches: 3, revenue: 3.0, valuation: 0, reuse: 0 },
  { name: "Arianespace", launches: 4, revenue: 1.5, valuation: 0, reuse: 0 },
];

const ipoCompsData = [
  { name: "SpaceX (Est.)", revenueMultiple: 23 },
  { name: "Rocket Lab", revenueMultiple: 28 },
  { name: "Palantir", revenueMultiple: 55 },
  { name: "Uber (IPO)", revenueMultiple: 8 },
  { name: "Rivian (IPO)", revenueMultiple: 90 },
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
  { subject: "Payload Cap.", SpaceX: 100, BlueOrigin: 35, RocketLab: 2 },
  { subject: "Crew Flights", SpaceX: 100, BlueOrigin: 15, RocketLab: 0 },
  { subject: "Sat. Network", SpaceX: 100, BlueOrigin: 5, RocketLab: 0 },
];

const milestones = [
  { year: "2002", event: "SpaceX Founded", desc: "Elon Musk founds SpaceX with $100M of his own money" },
  { year: "2006", event: "First Launch Attempt", desc: "Falcon 1 Flight 1 fails at T+25 seconds" },
  { year: "2008", event: "First Orbit", desc: "Falcon 1 becomes first privately-funded liquid rocket to orbit" },
  { year: "2010", event: "Falcon 9 Debuts", desc: "First Falcon 9 launch and first Dragon orbital test" },
  { year: "2012", event: "Dragon Docks with ISS", desc: "First commercial spacecraft to berth with the ISS" },
  { year: "2015", event: "First Booster Landing", desc: "Falcon 9 booster lands upright \u2014 changes spaceflight forever" },
  { year: "2017", event: "First Reflown Booster", desc: "Orbital-class booster reused for the first time (SES-10)" },
  { year: "2018", event: "Falcon Heavy Debut", desc: "World\u2019s most powerful rocket launches a Tesla to Mars orbit" },
  { year: "2020", event: "First Crew to ISS", desc: "Demo-2: First crewed orbital flight by a commercial company" },
  { year: "2021", event: "Inspiration4", desc: "First all-civilian orbital mission in history" },
  { year: "2023", event: "Starship Takes Flight", desc: "Most powerful rocket ever built lifts off from Starbase" },
  { year: "2024", event: "Booster Caught by Tower", desc: "Super Heavy caught mid-air by Mechazilla chopstick arms" },
  { year: "2024", event: "134 Launches in One Year", desc: "More orbital launches than every other entity on Earth combined" },
  { year: "2025-26", event: "Starlink IPO?", desc: "The most anticipated tech IPO \u2014 est. $150-250B valuation" },
];

const vehicleFleet = [
  { name: "Falcon 9", type: "Medium-Lift", height: "70m", payload: "22,800 kg", engines: "9 Merlin", reusable: "Yes (23x record)", status: "Workhorse", launches: "370+" },
  { name: "Falcon Heavy", type: "Heavy-Lift", height: "70m", payload: "63,800 kg", engines: "27 Merlin", reusable: "Partial", status: "Active", launches: "11" },
  { name: "Starship", type: "Super Heavy-Lift", height: "121m", payload: "150,000+ kg", engines: "33 Raptor", reusable: "Fully (goal)", status: "Testing", launches: "7 IFTs" },
  { name: "Dragon", type: "Crew & Cargo", height: "8.1m", payload: "6,000 kg", engines: "Draco/SuperDraco", reusable: "Yes", status: "Active", launches: "50+" },
];

const govContracts = [
  { name: "Commercial Crew", value: 2.6, agency: "NASA" },
  { name: "CRS Cargo", value: 4.6, agency: "NASA" },
  { name: "Artemis HLS", value: 4.0, agency: "NASA" },
  { name: "NSSL Phase 2", value: 5.6, agency: "Space Force" },
  { name: "Starshield", value: 1.8, agency: "DoD" },
];

const COLORS = {
  blue: "#3b82f6",
  cyan: "#22d3ee",
  orange: "#f97316",
  green: "#10b981",
  red: "#ef4444",
  yellow: "#eab308",
  pink: "#ec4899",
  white: "#f1f5f9",
  muted: "#94a3b8",
  dim: "#475569",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────

function HeroStat({ value, label, suffix, delay }: { value: string; label: string; suffix?: string; delay: number }) {
  return (
    <div className="stat-card card p-6 text-center fade-in-up" style={{ animationDelay: `${delay}s`, opacity: 0 }}>
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {value}
        {suffix && <span className="text-lg text-cyan-400">{suffix}</span>}
      </div>
      <div className="text-sm text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      <div className="h-0.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mt-3 rounded-full" />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-medium mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────

export default function SpaceXDashboard() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-12 max-w-[1400px] mx-auto">
      {/* ── HERO ── */}
      <header className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium bg-cyan-400/10 px-4 py-1.5 rounded-full border border-cyan-400/20">
            IPO Watch 2025-2026
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow">
          <span className="gradient-text">SpaceX</span>
          <span className="text-white"> IPO</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-2">
          The comprehensive tracker for the most anticipated IPO in history
        </p>
        <p className="text-sm text-slate-500">
          22 years from a garage in El Segundo to the most valuable private company on Earth
        </p>
      </header>

      {/* ── HERO STATS ── */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
        <HeroStat value="$350B" label="Valuation" delay={0.1} />
        <HeroStat value="400+" label="Orbital Launches" delay={0.15} />
        <HeroStat value="370+" label="Booster Landings" delay={0.2} />
        <HeroStat value="7,000+" label="Starlink Satellites" delay={0.25} />
        <HeroStat value="$14B" label="2024 Revenue" suffix="+" delay={0.3} />
        <HeroStat value="98%" label="Landing Rate" delay={0.35} />
      </section>

      {/* ── LAUNCH HISTORY ── */}
      <section className="mb-20">
        <SectionTitle title="Launch History" subtitle="From 1 launch in 2006 to 134 in 2024 \u2014 more than the rest of the world combined" />
        <div className="card p-6 glow-blue">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={launchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
              <XAxis dataKey="year" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
              <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ color: COLORS.muted, fontSize: 13 }} />
              <Bar dataKey="launches" name="Total Launches" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="landings" name="Successful Landings" stroke={COLORS.cyan} strokeWidth={2.5} dot={{ fill: COLORS.cyan, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── REVENUE ── */}
      <section className="mb-20">
        <SectionTitle title="Revenue Trajectory" subtitle="Starlink has become the dominant revenue engine \u2014 now exceeding launch services" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Revenue Breakdown ($B)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="year" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ color: COLORS.muted, fontSize: 13 }} />
                <Area type="monotone" dataKey="starlink" name="Starlink" stackId="1" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.3} />
                <Area type="monotone" dataKey="launch" name="Launch Services" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Valuation Growth ($B)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="valGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="date" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 11 }} angle={-30} textAnchor="end" height={60} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="valuation" name="Valuation" stroke={COLORS.orange} strokeWidth={2.5} fill="url(#valGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── STARLINK EMPIRE ── */}
      <section className="mb-20">
        <SectionTitle title="The Starlink Empire" subtitle="The world\u2019s largest satellite constellation \u2014 and the likely IPO candidate" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: "7,500+", label: "Satellites Launched" },
            { val: "4-5M", label: "Subscribers" },
            { val: "100+", label: "Countries" },
            { val: "$8B+", label: "2024 Revenue" },
          ].map((s, i) => (
            <div key={i} className="card p-5 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">{s.val}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Constellation Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={starlinkGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="year" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="satellites" name="Satellites in Orbit" fill={COLORS.cyan} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Subscriber Growth (Millions)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={starlinkGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="year" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={COLORS.green} strokeWidth={3} dot={{ fill: COLORS.green, r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── VEHICLE FLEET ── */}
      <section className="mb-20">
        <SectionTitle title="Vehicle Fleet" subtitle="From Falcon 9 workhorse to the most powerful rocket ever built" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicleFleet.map((v, i) => (
            <div key={i} className="card p-6 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{v.name}</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">{v.status}</span>
              </div>
              <div className="space-y-2 text-sm">
                {([["Type", v.type], ["Height", v.height], ["Payload (LEO)", v.payload], ["Engines", v.engines], ["Reusable", v.reusable], ["Launches", v.launches]] as [string, string][]).map(([label, val], j) => (
                  <div key={j} className="flex justify-between">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-300 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOSTER REUSE LEADERS ── */}
      <section className="mb-20">
        <SectionTitle title="Booster Reuse Leaderboard" subtitle="SpaceX has redefined what\u2019s possible \u2014 one booster has flown 23 times" />
        <div className="card p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boosterReuse} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
              <XAxis type="number" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
              <YAxis type="category" dataKey="booster" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} width={60} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="flights" name="Total Flights" radius={[0, 6, 6, 0]}>
                {boosterReuse.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? COLORS.cyan : i === 1 ? COLORS.blue : `rgba(59,130,246,${0.7 - i * 0.1})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── COST PER LAUNCH ── */}
      <section className="mb-20">
        <SectionTitle title="Cost Revolution" subtitle="SpaceX has slashed launch costs by 10x \u2014 Starship aims for 100x" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Cost Per Launch ($M)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="vehicle" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 10 }} angle={-20} textAnchor="end" height={70} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="cost" name="Cost ($M)" radius={[4, 4, 0, 0]}>
                  {costComparison.map((entry, i) => (
                    <Cell key={i} fill={entry.vehicle.includes("Starship") ? COLORS.green : entry.vehicle.includes("Falcon") ? COLORS.blue : COLORS.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Cost Per kg to LEO ($)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="vehicle" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 10 }} angle={-20} textAnchor="end" height={70} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="costPerKg" name="$/kg to LEO" radius={[4, 4, 0, 0]}>
                  {costComparison.map((entry, i) => (
                    <Cell key={i} fill={entry.vehicle.includes("Starship") ? COLORS.green : entry.vehicle.includes("Falcon") ? COLORS.cyan : COLORS.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── COMPETITIVE DOMINANCE ── */}
      <section className="mb-20">
        <SectionTitle title="Competitive Dominance" subtitle="SpaceX vs the field \u2014 there is no close second" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">Global Launch Market Share (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
                <XAxis dataKey="year" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ color: COLORS.muted, fontSize: 13 }} />
                <Area type="monotone" dataKey="spacex" name="SpaceX" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.4} />
                <Area type="monotone" dataKey="rest" name="Everyone Else" stackId="1" stroke={COLORS.dim} fill={COLORS.dim} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4">SpaceX vs Competitors (Indexed)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} outerRadius={100}>
                <PolarGrid stroke="rgba(71,85,105,0.4)" />
                <PolarAngleAxis dataKey="subject" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: COLORS.dim, fontSize: 9 }} />
                <Radar name="SpaceX" dataKey="SpaceX" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.3} />
                <Radar name="Blue Origin" dataKey="BlueOrigin" stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.15} />
                <Radar name="Rocket Lab" dataKey="RocketLab" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.15} />
                <Legend wrapperStyle={{ color: COLORS.muted, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor table */}
        <div className="card p-6 mt-6 overflow-x-auto">
          <h3 className="text-white font-semibold mb-4">2024 Competitor Snapshot</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {["Company", "2024 Launches", "Revenue (Est.)", "Valuation", "Reusability"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-slate-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitorData.map((c, i) => (
                <tr key={i} className={`border-b border-slate-800 ${i === 0 ? "bg-blue-500/5" : ""}`}>
                  <td className="py-3 px-4 text-white font-medium">{c.name}</td>
                  <td className="py-3 px-4 text-slate-300">{c.launches}</td>
                  <td className="py-3 px-4 text-slate-300">${c.revenue}B</td>
                  <td className="py-3 px-4 text-slate-300">{c.valuation > 0 ? `$${c.valuation}B` : "N/A (JV)"}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.reuse}%`, background: c.reuse > 50 ? COLORS.green : c.reuse > 0 ? COLORS.yellow : COLORS.red }} />
                      </div>
                      <span className="text-slate-400 text-xs">{c.reuse > 0 ? `${c.reuse}%` : "None"}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── GOVERNMENT CONTRACTS ── */}
      <section className="mb-20">
        <SectionTitle title="Government Contracts" subtitle="Over $18B in combined NASA and DoD contract value" />
        <div className="card p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={govContracts} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
              <XAxis type="number" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
              <YAxis type="category" dataKey="name" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 11 }} width={120} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" name="Contract Value ($B)" radius={[0, 6, 6, 0]}>
                {govContracts.map((entry, i) => (
                  <Cell key={i} fill={entry.agency === "NASA" ? COLORS.blue : COLORS.orange} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-4 justify-center text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.blue }} />
              NASA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.orange }} />
              DoD / Space Force
            </span>
          </div>
        </div>
      </section>

      {/* ── IPO VALUATION COMPS ── */}
      <section className="mb-20">
        <SectionTitle title="IPO Valuation Comps" subtitle="How SpaceX\u2019s revenue multiple stacks up against comparable IPOs" />
        <div className="card p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ipoCompsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
              <XAxis dataKey="name" stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 11 }} />
              <YAxis stroke={COLORS.muted} tick={{ fill: COLORS.muted, fontSize: 12 }} tickFormatter={(v) => `${v}x`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenueMultiple" name="Revenue Multiple" radius={[4, 4, 0, 0]}>
                {ipoCompsData.map((entry, i) => (
                  <Cell key={i} fill={entry.name.includes("SpaceX") ? COLORS.blue : COLORS.dim} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-slate-500 mt-3">Based on price-to-revenue multiples at time of IPO or current secondary market pricing</p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="mb-20">
        <SectionTitle title="The SpaceX Story" subtitle="Key milestones in the 22-year journey from startup to $350B giant" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900 transform -translate-x-1.5 mt-2 z-10" />
                <div className="ml-10 md:ml-0 md:w-1/2 card p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono">{m.year}</span>
                    <span className="text-white font-semibold text-sm">{m.event}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IPO OUTLOOK ── */}
      <section className="mb-20">
        <SectionTitle title="IPO Outlook" subtitle="What we know about the most anticipated public offering in tech history" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Most Likely Structure", content: "Starlink spinoff IPO \u2014 separating the satellite business from launch operations", tag: "Structure", color: COLORS.blue },
            { title: "Expected Valuation", content: "$150-250B for Starlink standalone, based on analyst estimates and secondary pricing", tag: "Valuation", color: COLORS.cyan },
            { title: "Timeline", content: "Musk has pointed to 2025-2026 \u2014 Starlink hit cash-flow positive in late 2023", tag: "When", color: COLORS.green },
            { title: "Revenue Multiple", content: "At $350B / ~$14B revenue, SpaceX trades at ~25x on secondary markets", tag: "Multiple", color: COLORS.orange },
            { title: "Key Catalyst", content: "Starlink achieving sustained profitability + 4M+ subscribers with direct-to-cell expanding TAM", tag: "Bull Case", color: COLORS.green },
            { title: "Key Risk", content: "Dual-class share structure, regulatory complexity, Musk key-person risk, and competition from Kuiper", tag: "Bear Case", color: COLORS.red },
          ].map((card, i) => (
            <div key={i} className="card p-6">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium mb-3 inline-block" style={{ color: card.color, background: `${card.color}20` }}>
                {card.tag}
              </span>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STARSHIP TESTS ── */}
      <section className="mb-20">
        <SectionTitle title="Starship Test Flights" subtitle="The most powerful rocket ever built \u2014 rapid iteration in real time" />
        <div className="card p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {["Flight", "Date", "Outcome", "Key Achievement"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-slate-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { flight: "IFT-1", date: "Apr 20, 2023", outcome: "Failure", color: COLORS.red, detail: "Vehicle tumbled, FTS activated at T+4 min" },
                { flight: "IFT-2", date: "Nov 18, 2023", outcome: "Partial", color: COLORS.yellow, detail: "First stage separation achieved" },
                { flight: "IFT-3", date: "Mar 14, 2024", outcome: "Partial", color: COLORS.yellow, detail: "Reached space, collected re-entry data" },
                { flight: "IFT-4", date: "Jun 6, 2024", outcome: "Success", color: COLORS.green, detail: "Both stages survived \u2014 first full-profile flight" },
                { flight: "IFT-5", date: "Oct 13, 2024", outcome: "Historic", color: COLORS.cyan, detail: "Booster caught by Mechazilla chopstick arms" },
                { flight: "IFT-6", date: "Nov 19, 2024", outcome: "Partial", color: COLORS.yellow, detail: "Ship reached orbit, deployed test sats" },
                { flight: "IFT-7", date: "Jan 16, 2025", outcome: "Success", color: COLORS.green, detail: "Ship reached orbit, booster caught again" },
              ].map((f, i) => (
                <tr key={i} className="border-b border-slate-800">
                  <td className="py-3 px-4 text-white font-mono font-medium">{f.flight}</td>
                  <td className="py-3 px-4 text-slate-300">{f.date}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: f.color, background: `${f.color}20` }}>
                      {f.outcome}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{f.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="mb-20">
        <SectionTitle title="By The Numbers" subtitle="The stats that make SpaceX the most extraordinary company in aerospace history" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { val: "22", unit: "years", label: "From founding to dominance" },
            { val: "134", unit: "", label: "Launches in 2024 alone" },
            { val: "33", unit: "", label: "Raptor engines on Super Heavy" },
            { val: "23", unit: "flights", label: "Single booster record" },
            { val: "2.8", unit: "days", label: "Avg between launches (2024)" },
            { val: "~70", unit: "", label: "Humans launched to orbit" },
            { val: "121", unit: "meters", label: "Starship height" },
            { val: "16.7M", unit: "lbf", label: "Super Heavy thrust" },
            { val: "13K", unit: "+", label: "SpaceX employees" },
            { val: "52", unit: "%", label: "Global launch market share" },
            { val: "$67", unit: "/kg", label: "Starship target cost to LEO" },
            { val: "1", unit: "st", label: "Commercial crew to orbit" },
          ].map((stat, i) => (
            <div key={i} className="card p-5 text-center group">
              <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                {stat.val}<span className="text-sm text-cyan-400 ml-0.5">{stat.unit}</span>
              </div>
              <div className="text-xs text-slate-400 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-center py-12 border-t border-slate-800">
        <p className="text-slate-500 text-sm mb-3">
          Data sourced from public filings, analyst estimates, and official SpaceX announcements. Revenue and valuation figures are estimates for a private company.
        </p>
        <p className="text-slate-600 text-xs mb-4">Built with Next.js, Tailwind CSS, and Recharts</p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
            @Trace_Cohen
          </a>
          <span className="text-slate-700">|</span>
          <a href="mailto:t@nyvp.com" className="text-slate-400 hover:text-blue-400 transition-colors">
            t@nyvp.com
          </a>
        </div>
      </footer>
    </main>
  );
}
