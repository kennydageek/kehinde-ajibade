import React, { useState, useEffect } from "react";
import { Sliders, Sun, Zap, Database, TrendingUp, CheckCircle2 } from "lucide-react";

interface SolarDashboardProps {
  isDay: boolean;
}

export const SolarDashboard: React.FC<SolarDashboardProps> = ({ isDay }) => {
  const [activeTab, setActiveTab] = useState<"ami" | "billing" | "wallet">("ami");
  const [selectedGrid, setSelectedGrid] = useState<string>("Main Community");
  const [solarPoints, setSolarPoints] = useState<number[]>([45, 52, 48, 60, 55, 72, 84, 78, 92, 88, 100, 94, 108, 115]);
  const [bldgs, setBldgs] = useState<number>(14);
  const [kwhRate, setKwhRate] = useState<number>(240);
  const [walletBalance, setWalletBalance] = useState<number>(342500);
  const [txs, setTxs] = useState([
    { id: "tx-12", type: "inflow", desc: "Payout detail reviewed - TX 428", amount: 12500, time: "2 mins ago" },
    { id: "tx-11", type: "outflow", desc: "Disbursement configuration update", amount: 3500, time: "1 hour ago" },
    { id: "tx-10", type: "inflow", desc: "Billing table reconciliation", amount: 24000, time: "4 hours ago" }
  ]);

  // Simulate evolving electricity telemetry data points
  useEffect(() => {
    const timer = setInterval(() => {
      setSolarPoints((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const variance = (Math.random() - 0.48) * 15;
        const clipt = Math.max(20, Math.min(140, Math.round(last + variance)));
        next.push(clipt);
        return next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const triggerPayout = () => {
    const amount = Math.floor(Math.random() * 15000 + 5000);
    setWalletBalance((b) => b + amount);
    setTxs((prev) => [
      {
        id: `tx-${Math.floor(Math.random() * 1000)}`,
        type: "inflow",
        desc: "Split transaction action simulated",
        amount,
        time: "Just now"
      },
      ...prev.slice(0, 4)
    ]);
  };

  const getSvgPath = (points: number[]) => {
    const w = 450;
    const h = 140;
    const pad = 10;
    const maxVal = 150;
    const step = (w - pad * 2) / (points.length - 1);
    return points
      .map((p, i) => {
        const x = pad + i * step;
        const y = h - pad - (p / maxVal) * (h - pad * 2);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const monthlyEst = bldgs * 350 * kwhRate;

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-500 ${
      isDay ? "bg-white/90 border-black/12 text-neutral-900 shadow-lg" : "bg-[#0b0c0d]/82 border-white/10 text-white shadow-2xl"
    } backdrop-blur-md`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4 transition-colors duration-500 ${
        isDay ? "border-black/5" : "border-white/10"
      }`}>
        <div>
          <div className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${
            isDay ? "text-neutral-800 font-bold" : "text-primary"
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-2xl font-serif italic font-normal tracking-tight">Iobotech Operations Workflow Demo</h3>
        </div>

        {/* Tab Controls */}
        <div className="flex p-0.5 rounded-full liquid-glass self-start">
          <button
            onClick={() => setActiveTab("ami")}
            aria-pressed={activeTab === "ami"}
            className={`focus-ring px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "ami" 
                ? (isDay ? "bg-neutral-900 text-white" : "bg-white text-black") 
                : (isDay ? "text-neutral-700 hover:text-neutral-950" : "text-neutral-100 hover:text-white")
            }`}
          >
            Meters
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            aria-pressed={activeTab === "billing"}
            className={`focus-ring px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "billing" 
                ? (isDay ? "bg-neutral-900 text-white" : "bg-white text-black") 
                : (isDay ? "text-neutral-700 hover:text-neutral-950" : "text-neutral-100 hover:text-white")
            }`}
          >
            Billing Setup
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            aria-pressed={activeTab === "wallet"}
            className={`focus-ring px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "wallet" 
                ? (isDay ? "bg-neutral-900 text-white" : "bg-white text-black") 
                : (isDay ? "text-neutral-700 hover:text-neutral-950" : "text-neutral-100 hover:text-white")
            }`}
          >
            Support
          </button>
        </div>
      </div>

      {activeTab === "ami" && (
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <span className={`text-xs font-semibold transition-colors duration-500 ${
              isDay ? "text-neutral-700 font-semibold" : "text-neutral-200"
            }`}>COMMUNITY CONTEXT: {selectedGrid}</span>
            <div className="flex gap-1">
              {["Main Community", "West-End B", "Mainland"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrid(g)}
                  aria-pressed={selectedGrid === g}
                  className={`focus-ring px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    selectedGrid === g
                      ? (isDay ? "bg-neutral-900 text-white font-bold" : "bg-primary text-black font-bold")
                      : (isDay 
                          ? "bg-black/5 hover:bg-black/10 text-neutral-800" 
                          : "bg-white/8 hover:bg-white/12 text-neutral-100")
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className={`h-36 w-full flex items-end justify-center rounded-lg relative p-2 overflow-hidden border transition-colors duration-500 ${
            isDay ? "bg-neutral-950 border-black/10" : "bg-black/40 border-white/5"
          }`}>
            <svg viewBox="0 0 450 140" className={`w-full h-full drop-shadow-[0_2px_8px_rgba(222,219,200,0.2)] ${
              isDay ? "text-emerald-400" : "text-primary"
            }`}>
              <path
                d={getSvgPath(solarPoints)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold">
              <Zap size={10} className="text-yellow-400" />
              <span>LIVE DEMO: {solarPoints[solarPoints.length - 1]} meter events</span>
            </div>
          </div>

          <p className={`text-xs leading-relaxed font-light transition-colors duration-500 ${
            isDay ? "text-neutral-700" : "text-neutral-200"
          }`}>
            Simulates meter-management activity from the CV: check-meter-balance, clear-credit, switch-meter, token resend, and bulk manual vending flows with API-driven feedback.
          </p>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className={`transition-colors duration-500 ${isDay ? "text-neutral-700" : "text-neutral-200"}`}>Dashboard Sections</span>
                <span className={`font-bold transition-colors duration-500 ${isDay ? "text-neutral-950" : "text-primary"}`}>{bldgs} Sections</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                value={bldgs}
                onChange={(e) => setBldgs(parseInt(e.target.value))}
                className={`w-full h-1 rounded cursor-pointer transition-all duration-500 ${
                  isDay ? "accent-neutral-900 bg-black/10" : "accent-primary bg-white/10"
                }`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className={`transition-colors duration-500 ${isDay ? "text-neutral-700" : "text-neutral-200"}`}>Billing Rule Value</span>
                <span className={`font-bold transition-colors duration-500 ${isDay ? "text-neutral-950" : "text-primary"}`}>₦{kwhRate}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                value={kwhRate}
                step="10"
                onChange={(e) => setKwhRate(parseInt(e.target.value))}
                className={`w-full h-1 rounded cursor-pointer transition-all duration-500 ${
                  isDay ? "accent-neutral-900 bg-black/10" : "accent-primary bg-white/10"
                }`}
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl grid grid-cols-2 gap-4 text-center border transition-colors duration-500 ${
            isDay ? "bg-white/80 border-black/12 text-neutral-900" : "bg-white/8 border-white/10 text-white"
          }`}>
            <div>
              <div className={`text-xs font-semibold ${isDay ? "text-neutral-700" : "text-neutral-200"}`}>Workflow Items</div>
              <div className={`text-lg font-bold font-mono mt-1 transition-colors duration-500 ${isDay ? "text-neutral-950" : "text-white"}`}>{(bldgs * 350).toLocaleString()}</div>
            </div>
            <div>
              <div className={`text-xs font-semibold ${isDay ? "text-neutral-700" : "text-neutral-200"}`}>Estimated Billing Revenue</div>
              <div className={`text-lg font-bold font-mono mt-1 transition-colors duration-500 ${isDay ? "text-neutral-950" : "text-primary"}`}>₦{monthlyEst.toLocaleString()}</div>
            </div>
          </div>

          <p className={`text-xs leading-relaxed font-light transition-colors duration-500 ${
            isDay ? "text-neutral-700" : "text-neutral-200"
          }`}>
            Simulates the finance and billing workflows from the CV: payout details, split-transaction views, disbursement configuration, and billing table logic.
          </p>
        </div>
      )}

      {activeTab === "wallet" && (
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-500 ${
            isDay ? "bg-white/80 border-black/12" : "bg-white/8 border-white/10"
          }`}>
            <div>
              <div className={`text-xs font-semibold transition-colors duration-500 ${isDay ? "text-neutral-700" : "text-neutral-300"}`}>Support & Admin Activity</div>
              <div className={`text-2xl font-bold font-mono mt-0.5 ${isDay ? "text-neutral-950" : "text-white"}`}>₦{walletBalance.toLocaleString()}</div>
            </div>
            <button
              onClick={triggerPayout}
              className={`focus-ring px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                isDay ? "bg-neutral-900 hover:bg-neutral-800 text-white" : "bg-primary text-black hover:bg-primary/90"
              }`}
            >
              Simulate Action
            </button>
          </div>

          <div className="space-y-2">
            <span className={`text-xs font-semibold transition-colors duration-500 ${isDay ? "text-neutral-700" : "text-neutral-300"}`}>Simulated transaction / support logs</span>
            <div className="space-y-1.5 max-h-[110px] overflow-y-auto w-full">
              {txs.map((t) => (
                <div 
                  key={t.id} 
                  className={`flex justify-between items-center text-xs p-2 rounded border transition-colors duration-500 ${
                    isDay ? "bg-white/78 border-black/12 text-neutral-900" : "bg-black/35 border-white/10 text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={11} className="text-emerald-500" />
                    <span className={isDay ? "text-neutral-800" : "text-neutral-100"}>{t.desc}</span>
                  </div>
                  <div className="font-mono text-right">
                    <div className={`font-bold transition-colors duration-500 ${isDay ? "text-emerald-600 font-extrabold" : "text-primary"}`}>+₦{t.amount.toLocaleString()}</div>
                    <div className={`text-xs ${isDay ? "text-neutral-600" : "text-neutral-200"}`}>{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
