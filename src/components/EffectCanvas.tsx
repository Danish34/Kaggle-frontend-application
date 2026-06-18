import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake } from 'lucide-react';
import { EffectType, SnowflakeParticle, BalloonParticle } from '../types';

interface EffectCanvasProps {
  activeEffect: EffectType;
  generatorActive: boolean;
  onParticleCountChange: (count: number) => void;
}

// Predefined elegant gradient-rich colors for a formal look (gold, slate-silver, imperial-rose, sapphire, emerald)
const BALLOON_GRADIET_SETS = [
  {
    id: 'gold',
    background: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #ca8a04 70%, #854d0e 100%)',
    highlight: '#ffffff',
  },
  {
    id: 'silver',
    background: 'radial-gradient(circle at 35% 30%, #f8fafc 0%, #64748b 70%, #334155 100%)',
    highlight: '#ffffff',
  },
  {
    id: 'ruby',
    background: 'radial-gradient(circle at 35% 30%, #fecdd3 0%, #be123c 70%, #9f1239 100%)',
    highlight: '#ffffff',
  },
  {
    id: 'sapphire',
    background: 'radial-gradient(circle at 35% 30%, #dbeafe 0%, #1d4ed8 70%, #1e3a8a 100%)',
    highlight: '#ffffff',
  },
  {
    id: 'emerald',
    background: 'radial-gradient(circle at 35% 30%, #d1fae5 0%, #047857 70%, #064e3b 100%)',
    highlight: '#ffffff',
  },
];

export default function EffectCanvas({ activeEffect, generatorActive, onParticleCountChange }: EffectCanvasProps) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeParticle[]>([]);
  const [balloons, setBalloons] = useState<BalloonParticle[]>([]);
  const particleIdCounter = useRef(0);

  // Clear all particles when effect shifts
  useEffect(() => {
    setSnowflakes([]);
    setBalloons([]);
  }, [activeEffect]);

  // Report particle count up
  useEffect(() => {
    onParticleCountChange(snowflakes.length + balloons.length);
  }, [snowflakes.length, balloons.length, onParticleCountChange]);

  // Handle particle spawning during the active generation phrase (5 seconds)
  useEffect(() => {
    if (!generatorActive || activeEffect === EffectType.None) return;

    let intervalId: NodeJS.Timeout;

    if (activeEffect === EffectType.Snowflakes) {
      intervalId = setInterval(() => {
        const id = `flake-${++particleIdCounter.current}-${Math.random()}`;
        const newFlake: SnowflakeParticle = {
          id,
          x: Math.random() * 92 + 4, // 4vw to 96vw to stay within margins
          size: Math.floor(Math.random() * 7) + 16, // Size 16px to 22px (Medium weight)
          duration: Math.random() * 1.5 + 3.5, // 3.5s to 5.0s to fall
          rotation: Math.random() * 360,
          wobbleSpeed: Math.random() * 2 + 1,
          wobbleRange: Math.random() * 4 + 2, // horizontal drift amplitude (2vw to 6vw)
        };
        setSnowflakes((prev) => [...prev, newFlake]);
      }, 120); // dense, luxury falling speed
    } else if (activeEffect === EffectType.Balloons) {
      intervalId = setInterval(() => {
        const id = `balloon-${++particleIdCounter.current}-${Math.random()}`;
        const gradient = BALLOON_GRADIET_SETS[Math.floor(Math.random() * BALLOON_GRADIET_SETS.length)];
        const newBalloon: BalloonParticle = {
          id,
          x: Math.random() * 90 + 5, // 5vw to 95vw
          width: Math.floor(Math.random() * 6) + 38, // 38px to 44px (medium size)
          height: Math.floor(Math.random() * 8) + 48, // 48px to 56px (medium shape)
          duration: Math.random() * 2.0 + 4.5, // 4.5s to 6.5s to float upwards
          color: gradient.background,
          rotation: Math.random() * 20 - 10, // -10deg to 10deg subtle tilt
          swaySpeed: Math.random() * 1.5 + 1.0,
          swayRange: Math.random() * 3 + 2, // 2vw to 5vw sway
        };
        setBalloons((prev) => [...prev, newBalloon]);
      }, 200); // classy release cadence
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [activeEffect, generatorActive]);

  // Handlers for deleting individual particles once out of viewport boundary
  const handleSnowflakeComplete = (id: string) => {
    setSnowflakes((prev) => prev.filter((s) => s.id !== id));
  };

  const handleBalloonComplete = (id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
      {/* Snowflakes Layer */}
      <AnimatePresence>
        {activeEffect === EffectType.Snowflakes &&
          snowflakes.map((flake) => (
            <motion.div
              key={flake.id}
              initial={{
                y: -40,
                x: `${flake.x}vw`,
                rotate: flake.rotation,
                opacity: 0,
              }}
              animate={{
                y: '105vh',
                rotate: flake.rotation + 240,
                opacity: [0, 1, 1, 0.8, 0],
                x: [
                  `${flake.x}vw`,
                  `${flake.x + flake.wobbleRange}vw`,
                  `${flake.x - flake.wobbleRange}vw`,
                  `${flake.x + flake.wobbleRange * 0.5}vw`,
                ],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: flake.duration,
                ease: 'linear',
              }}
              onAnimationComplete={() => handleSnowflakeComplete(flake.id)}
              className="absolute"
              style={{
                width: flake.size,
                height: flake.size,
              }}
            >
              {/* Premium snowflake SVG representation with subtle ambient drop-shadow */}
              <Snowflake
                size={flake.size}
                className="text-cyan-200/95 drop-shadow-[0_2px_8px_rgba(186,230,253,0.6)] saturate-[1.1] stroke-[1.5]"
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Balloons Layer */}
      <AnimatePresence>
        {activeEffect === EffectType.Balloons &&
          balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{
                y: '105vh',
                x: `${balloon.x}vw`,
                rotate: balloon.rotation,
                opacity: 0,
              }}
              animate={{
                y: -120, // disappear above screen
                rotate: [balloon.rotation, balloon.rotation + 6, balloon.rotation - 6, balloon.rotation],
                opacity: [0, 0.95, 0.95, 0.9, 0],
                x: [
                  `${balloon.x}vw`,
                  `${balloon.x + balloon.swayRange}vw`,
                  `${balloon.x - balloon.swayRange}vw`,
                  `${balloon.x + balloon.swayRange * 0.3}vw`,
                ],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: balloon.duration,
                ease: 'easeInOut',
              }}
              onAnimationComplete={() => handleBalloonComplete(balloon.id)}
              className="absolute flex flex-col items-center"
              style={{
                width: balloon.width,
                height: balloon.height + 60, // Extra space for string
              }}
            >
              {/* Classic elegant Balloon design using inline vector nodes */}
              <div
                className="relative rounded-full shadow-[inset_-3px_-4px_8px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.15)]"
                style={{
                  width: balloon.width,
                  height: balloon.height,
                  background: balloon.color,
                }}
              >
                {/* Visual shiny reflection spot (for three-dimensional glassiness) */}
                <span
                  className="absolute left-[20%] top-[15%] w-[25%] h-[25%] rounded-full opacity-60 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                  }}
                />

                {/* Balloon knot at base */}
                <div
                  className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px]"
                  style={{
                    borderBottomColor: balloon.color.includes('#ca8a04') ? '#854d0e' : balloon.color.includes('#64748b') ? '#334155' : balloon.color.includes('#be123c') ? '#9f1239' : balloon.color.includes('#1d4ed8') ? '#1e3a8a' : '#064e3b',
                    filter: 'brightness(0.9)',
                  }}
                />
              </div>

              {/* Hanging thread basket line swaying below */}
              <svg
                width="16"
                height="45"
                viewBox="0 0 16 45"
                fill="none"
                className="overflow-visible opacity-70"
              >
                <path
                  d="M8,0 C6,15 10,30 8,45"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
