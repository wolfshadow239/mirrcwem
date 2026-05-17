"use client";

import React from "react";

const basinData = [
  {
    basin: "Pune Metropolitan Basin",
    rivers: "Mula, Mutha, Pavana, Indrayani",
    issues:
      "Severe sewage inflow, urban runoff, encroachments, untreated discharge",
    interventions:
      "Deep interceptor tunnels, mega STPs, wastewater corridors",
    capacity: "1750+ MLD",
  },
  {
    basin: "Mumbai Metropolitan Basin",
    rivers: "Mithi, Dahisar, Poisar, Ulhas",
    issues:
      "Tidal contamination, industrial discharge, stormwater congestion",
    interventions:
      "Coastal mega STPs, tidal ecological channels, smart drainage",
    capacity: "2200+ MLD",
  },
  {
    basin: "Nashik-Godavari Basin",
    rivers: "Godavari, Kadva",
    issues:
      "Religious waste, municipal sewage, seasonal contamination",
    interventions:
      "Sacred river zones, treated water reuse, ecological restoration",
    capacity: "700+ MLD",
  },
  {
    basin: "Nagpur & Vidarbha Basin",
    rivers: "Nag River, Kanhan, Wainganga",
    issues:
      "Industrial contamination, sewage discharge",
    interventions:
      "Reuse-based water grids, reclaimed-water supply",
    capacity: "900+ MLD",
  },
];

const investmentData = [
  {
    title: "Interceptor Tunnel Network",
    value: "₹1.5–2 Lakh Crore",
  },
  {
    title: "Mega STP Infrastructure",
    value: "₹1–1.3 Lakh Crore",
  },
  {
    title: "Reuse Infrastructure",
    value: "₹80,000 Crore",
  },
  {
    title: "Wetlands & Ecology",
    value: "₹20,000 Crore",
  },
  {
    title: "Smart Monitoring Systems",
    value: "₹15,000 Crore",
  },
];

const timeline = [
  {
    phase: "Phase 1 (0–5 Years)",
    title: "Pollution Interception",
    desc:
      "Interceptor tunnel systems, pilot STPs, emergency river protection infrastructure",
  },
  {
    phase: "Phase 2 (5–10 Years)",
    title: "Circular Water Infrastructure",
    desc:
      "Industrial reuse systems, recharge projects, ecological wetland corridors",
  },
  {
    phase: "Phase 3 (10–20 Years)",
    title: "Statewide Circular Economy",
    desc:
      "Near-potable river systems, biodiversity restoration, smart river ecosystems",
  },
];

export default function MaharashtraRiverMission() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl"></div>

        <h1 className="text-5xl md:text-8xl font-black leading-tight max-w-6xl z-10">
          Maharashtra Integrated
          <span className="block text-cyan-400">
            River Restoration &
          </span>
          Circular Water Economy Mission
        </h1>

        <p className="max-w-4xl mt-10 text-xl md:text-2xl text-slate-300 leading-relaxed z-10">
          A transformational ₹3–4 lakh crore public infrastructure mission
          designed to restore Maharashtra’s rivers through deep interceptor
          sewer systems, mega-regional wastewater treatment infrastructure,
          ecological restoration, AI monitoring and treated-water reuse
          ecosystems.
        </p>

        <div className="flex flex-wrap gap-6 mt-12 z-10">
          <button className="px-10 py-5 bg-cyan-400 text-black rounded-2xl font-black hover:scale-105 transition-all">
            Explore DPR
          </button>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                "https://riverfuturemaharashtra.org"
              )
            }
            className="px-10 py-5 border border-cyan-400 text-cyan-400 rounded-2xl font-black hover:bg-cyan-400 hover:text-black transition-all"
          >
            Copy Project Link
          </button>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12">
            Executive Summary
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                Mission Vision
              </h3>

              <p className="text-slate-300 text-lg leading-relaxed">
                Maharashtra faces one of India’s largest urban river pollution
                crises due to untreated sewage discharge, industrial effluents,
                floodplain encroachment and fragmented wastewater governance.
                This mission proposes integrated long-term infrastructure
                transformation through river restoration and circular treated
                water economies.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                Core Objectives
              </h3>

              <ul className="space-y-4 text-lg text-slate-300">
                <li>• Eliminate untreated sewage discharge</li>
                <li>• Develop regional mega STPs</li>
                <li>• Restore river biodiversity</li>
                <li>• Build wastewater reuse ecosystems</li>
                <li>• Improve flood resilience</li>
                <li>• Recharge groundwater systems</li>
                <li>• Create AI-driven river monitoring systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-24 bg-slate-950 px-6 md:px-16">
        <h2 className="text-center text-5xl font-black mb-20">
          Infrastructure Investment Architecture
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">
          {investmentData.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all"
            >
              <h3 className="text-xl font-bold mb-6">
                {item.title}
              </h3>

              <p className="text-3xl font-black text-cyan-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BASINS */}
      <section className="py-28 px-6 md:px-16">
        <h2 className="text-center text-5xl font-black mb-20">
          Basin-Wise Strategic Analysis
        </h2>

        <div className="space-y-10">
          {basinData.map((basin, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-10"
            >
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
                <div>
                  <h3 className="text-4xl font-black text-cyan-400">
                    {basin.basin}
                  </h3>

                  <p className="mt-4 text-slate-400 text-lg">
                    Rivers: {basin.rivers}
                  </p>
                </div>

                <div className="text-4xl font-black">
                  {basin.capacity}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                    Major Issues
                  </h4>

                  <p className="text-slate-300 text-lg leading-relaxed">
                    {basin.issues}
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold mb-4">
                    Proposed Interventions
                  </h4>

                  <p className="text-slate-300 text-lg leading-relaxed">
                    {basin.interventions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-28 bg-slate-950 px-6 md:px-16">
        <h2 className="text-center text-5xl font-black mb-20">
          Smart Infrastructure & AI Monitoring
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {[
            "AI Pollution Monitoring",
            "IoT Sensor Networks",
            "GIS River Dashboards",
            "SCADA Automation",
          ].map((tech, index) => (
            <div
              key={index}
              className="bg-black border border-cyan-400/20 rounded-3xl p-10 hover:border-cyan-400 transition-all"
            >
              <div className="text-5xl mb-6">💧</div>

              <h3 className="text-2xl font-bold">
                {tech}
              </h3>

              <p className="mt-4 text-slate-400 leading-relaxed">
                Advanced statewide environmental intelligence systems for
                real-time river quality monitoring and predictive pollution
                analytics.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-28 px-6 md:px-16">
        <h2 className="text-center text-5xl font-black mb-20">
          20-Year Mission Timeline
        </h2>

        <div className="space-y-10 max-w-6xl mx-auto">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-10"
            >
              <div className="text-cyan-400 font-black text-xl">
                {item.phase}
              </div>

              <h3 className="text-4xl font-black mt-4">
                {item.title}
              </h3>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNATIONAL */}
      <section className="py-28 bg-slate-950 px-6 md:px-16">
        <h2 className="text-center text-5xl font-black mb-20">
          International Benchmark Models
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">
          {[
            "Singapore Deep Tunnel Sewer System",
            "Netherlands Floodplain Restoration",
            "Israel Wastewater Reuse",
            "Japan Smart Drainage",
            "South Korea Urban River Restoration",
          ].map((country, index) => (
            <div
              key={index}
              className="bg-black border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {country}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/10 text-center">
        <h3 className="text-3xl font-black">
          RiverFuture Maharashtra Initiative
        </h3>

        <p className="mt-6 text-slate-400 max-w-3xl mx-auto text-lg">
          Public Infrastructure Vision for Sustainable River Restoration,
          Circular Water Economy and Climate-Resilient Urban Water Systems.
        </p>
      </footer>
    </main>
  );
}