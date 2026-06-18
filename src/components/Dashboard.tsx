import { useEffect, useState, useRef } from 'react';
import { Snowflake, Sparkles, AlertCircle, Timer, Activity, Gauge, RefreshCw, Compass } from 'lucide-react';
import { EffectType } from '../types';

interface DashboardProps {
  activeEffect: EffectType;
  generatorActive: boolean;
  particleCount: number;
  triggerEffect: (type: EffectType) => void;
  resetAll: () => void;
}

export default function Dashboard({
  activeEffect,
  generatorActive,
  particleCount,
  triggerEffect,
  resetAll,
}: DashboardProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize dynamic timer states
  useEffect(() => {
    if (generatorActive) {
      setTimeLeft(5.0);
      const intervalMs = 20; // 50 updates per second for beautiful smooth deciseconds

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.02) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return parseFloat((prev - 0.02).toFixed(2));
        });
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [generatorActive, activeEffect]);

  const activeProgressPercentage = (timeLeft / 5.0) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto z-20 px-4">
      {/* Upper Brand Area */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
          <span className={`w-2 h-2 rounded-full ${generatorActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase font-bold">
            {generatorActive ? 'Simulation In Progress' : 'Atmospheric System Ready'}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          System Simulation Interface
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-slate-600 font-light mx-auto leading-relaxed">
          Choose a particle physics module to render within the viewport environment. Each simulation runs for a duration of <span className="font-semibold text-slate-950">5.0 seconds</span>.
        </p>
      </div>

      {/* Main Command Console Deck */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        
        {/* Left Side: Buttons & Core Interaction */}
        <div className="md:col-span-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Interactive Trigger Station
            </h2>
            
            {/* Horizontal Split Button Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Snowflake Trigger Button */}
              <button
                id="btn-snowflakes"
                onClick={() => triggerEffect(EffectType.Snowflakes)}
                disabled={activeEffect === EffectType.Snowflakes && generatorActive}
                className={`group relative overflow-hidden bg-white border px-6 py-5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-between text-center cursor-pointer min-h-[140px] ${
                  activeEffect === EffectType.Snowflakes
                    ? 'border-sky-300 bg-sky-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className={`p-2.5 rounded-lg ${activeEffect === EffectType.Snowflakes ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600'} transition-all`}>
                    <Snowflake className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <span className="text-slate-800 font-bold tracking-wide uppercase text-xs mt-2">
                    Snowflakes
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                  Medium-sized crystals descending top to bottom.
                </div>
                {/* Sleek Theme Sliding bottom highlight */}
                <div className={`absolute bottom-0 left-0 h-1 bg-sky-400 transition-all duration-300 ${activeEffect === EffectType.Snowflakes ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>

              {/* Balloons Trigger Button */}
              <button
                id="btn-balloons"
                onClick={() => triggerEffect(EffectType.Balloons)}
                disabled={activeEffect === EffectType.Balloons && generatorActive}
                className={`group relative overflow-hidden bg-white border px-6 py-5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-between text-center cursor-pointer min-h-[140px] ${
                  activeEffect === EffectType.Balloons
                    ? 'border-rose-300 bg-rose-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className={`p-2.5 rounded-lg ${activeEffect === EffectType.Balloons ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600'} transition-all`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-slate-800 font-bold tracking-wide uppercase text-xs mt-2">
                    Balloons
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                  Fluid helium structures floating from coordinates.
                </div>
                {/* Sleek Theme Sliding bottom highlight */}
                <div className={`absolute bottom-0 left-0 h-1 bg-rose-400 transition-all duration-300 ${activeEffect === EffectType.Balloons ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>

            </div>
          </div>

          {/* Active Progress Readout */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono flex items-center gap-1.5 font-semibold">
                <Timer className="w-3.5 h-3.5 text-slate-400" />
                EMISSION LIFESPAN
              </span>
              <span className="font-mono text-slate-800 font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">
                {activeEffect !== EffectType.None && generatorActive ? `${timeLeft.toFixed(2)}s` : '0.00s'}
              </span>
            </div>
            
            {/* Luxury sleek progress bar */}
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-75 rounded-full ${
                  activeEffect === EffectType.Snowflakes
                    ? 'bg-sky-500 shadow-[0_0_8px_#38bdf8]'
                    : activeEffect === EffectType.Balloons
                    ? 'bg-amber-500 shadow-[0_0_8px_#fbbf24]'
                    : 'bg-slate-300'
                }`}
                style={{ width: `${generatorActive ? activeProgressPercentage : 0}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Particle generation halts automatically after 5 elapsed seconds.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Diagnostics & Telemetry Dashboard */}
        <div className="md:col-span-5 bg-slate-900 rounded-xl p-5 text-slate-300 flex flex-col justify-between border border-slate-950 shadow-inner">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-extrabold flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                SYSTEM STATUS
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                ONLINE
              </span>
            </div>

            {/* Metrics lists */}
            <div className="space-y-3.5">
              
              {/* Active Stream type */}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Active Sequence
                </span>
                <span className="block font-mono text-xs font-bold mt-0.5 text-white">
                  {activeEffect === EffectType.Snowflakes && 'SNOWFLAKES CASCADE'}
                  {activeEffect === EffectType.Balloons && 'BALLOONS FLOTATION'}
                  {activeEffect === EffectType.None && 'STANDBY SEQUENCE'}
                </span>
              </div>

              {/* Spawner State */}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Emitter State
                </span>
                <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  generatorActive 
                    ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${generatorActive ? 'bg-amber-400 animate-ping' : 'bg-slate-500'}`} />
                  {generatorActive ? 'ACTIVE EMISSION (5s Limit)' : 'IDLE'}
                </span>
              </div>

              {/* Live DOM Particle Count */}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Active Vector Particles
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-2xl font-bold tracking-tight text-white">
                    {particleCount}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">units</span>
                </div>
              </div>

              {/* Standard Dimensions Scale */}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Particle Spec Scale
                </span>
                <span className="block font-mono text-[11px] text-slate-400 mt-0.5">
                  {activeEffect === EffectType.Snowflakes && 'Medium (16px - 22px)'}
                  {activeEffect === EffectType.Balloons && 'Medium (38px - 56px)'}
                  {activeEffect === EffectType.None && 'N/A (No active specimen)'}
                </span>
              </div>

            </div>
          </div>

          {/* Reset / Clean console trigger */}
          <div className="pt-4 mt-6 border-t border-slate-800">
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700/85 text-slate-200 hover:text-white font-mono text-xs uppercase font-semibold rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-all active:scale-[0.98]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Console Array
            </button>
          </div>

        </div>

      </div>

      {/* Decorative corporate footer details */}
      <div className="mt-8 text-center text-xs text-slate-400">
        <p className="font-mono text-[10px] tracking-wider uppercase">
          Precision atmospheric animation module • ISO-8601 compliant
        </p>
      </div>
    </div>
  );
}
