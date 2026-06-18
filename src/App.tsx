/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EffectType } from './types';
import EffectCanvas from './components/EffectCanvas';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeEffect, setActiveEffect] = useState<EffectType>(EffectType.None);
  const [generatorActive, setGeneratorActive] = useState<boolean>(false);
  const [particleCount, setParticleCount] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any pending timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Primary function to initiate the Snowflake or Balloon sequence
  const handleTriggerEffect = (type: EffectType) => {
    // Clear any active spawner timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset current active states immediately
    setGeneratorActive(false);

    // Short state separation tick to trigger fresh React renders
    setTimeout(() => {
      setActiveEffect(type);
      setGeneratorActive(true);

      // Start the strict 5.0 seconds generator limit timer
      timerRef.current = setTimeout(() => {
        setGeneratorActive(false);
        timerRef.current = null;
      }, 5000);
    }, 50);
  };

  // Reset helper
  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setGeneratorActive(false);
    setActiveEffect(EffectType.None);
    setParticleCount(0);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-slate-50 overflow-hidden font-sans select-none antialiased">
      {/* Header Section */}
      <header className="w-full h-20 border-b border-slate-200 bg-white flex items-center justify-between px-6 md:px-12 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="text-slate-900 font-semibold tracking-tight text-xl">Atmosphere.io</span>
        </div>
        <nav className="hidden sm:flex gap-8 text-sm font-medium text-slate-500">
          <span className="text-slate-900 font-semibold border-b-2 border-slate-900 pb-1 cursor-default">Environment Control</span>
          <span className="hover:text-slate-800 transition-colors cursor-pointer">Visual Logs</span>
          <span className="hover:text-slate-800 transition-colors cursor-pointer">Configuration</span>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center py-10 relative z-20">
        
        {/* Structural Minimalist Grid Overlay for the "Formal" aesthetic */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(#000 1px, transparent 0)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative Blueprint Corner Weights */}
        <div className="absolute top-6 left-6 font-mono text-[9px] text-slate-400 tracking-wider hidden sm:block">
          SYS.LOC // TERMINAL_ACTIVE
        </div>
        <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-400 tracking-wider hidden sm:block">
          REVISION 12.A
        </div>

        {/* Dynamic Background Atmospheric Vignettes */}
        <AnimatePresence mode="wait">
          {activeEffect === EffectType.Snowflakes && (
            <motion.div
              key="chill-vignette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top, rgba(186, 230, 253, 0.45) 0%, rgba(248, 250, 252, 0) 70%), inset 0 0 100px rgba(186, 230, 253, 0.25)',
              }}
            />
          )}

          {activeEffect === EffectType.Balloons && (
            <motion.div
              key="warmth-vignette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at bottom, rgba(254, 240, 138, 0.35) 0%, rgba(248, 250, 252, 0) 75%), inset 0 0 100px rgba(254, 240, 138, 0.15)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Dynamic Atmosphere VFX Canvas Layer */}
        <EffectCanvas
          activeEffect={activeEffect}
          generatorActive={generatorActive}
          onParticleCountChange={setParticleCount}
        />

        {/* Clean elegant Controller Card and telemetries */}
        <Dashboard
          activeEffect={activeEffect}
          generatorActive={generatorActive}
          particleCount={particleCount}
          triggerEffect={handleTriggerEffect}
          resetAll={handleReset}
        />

      </main>
    </div>
  );
}
