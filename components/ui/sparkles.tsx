"use client";
import React, { useId, Suspense, useRef } from "react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

// Type imports (these are lightweight)
import type { Container } from "@tsparticles/engine";

interface LoadedComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ParticlesComponent: React.ComponentType<any>;
  MotionComponent: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: React.ComponentType<any>;
  };
}

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  
  // All hooks at the top level with consistent order
  const [init, setInit] = useState(false);
  const [loadedComponents, setLoadedComponents] = useState<LoadedComponents | null>(null);
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  // local visible state used for a CSS-based fade-in (keeps hooks stable)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Dynamically load all heavy components
    const loadComponents = async () => {
      try {
        const [particlesMod, motionMod, slimMod] = await Promise.all([
          import("@tsparticles/react"),
          import("framer-motion"),
          import("@tsparticles/slim")
        ]);

        const components: LoadedComponents = {
          ParticlesComponent: particlesMod.Particles,
          MotionComponent: motionMod.motion,
        };

        setLoadedComponents(components);

        // Initialize particles engine
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await particlesMod.initParticlesEngine(async (engine: any) => {
          await slimMod.loadSlim(engine);
        });
        
        setInit(true);
      } catch (error) {
        console.error("Failed to load components:", error);
      }
    };

    loadComponents();
  }, []);

  // Early return if components aren't loaded yet
  if (!loadedComponents) {
    return (
      <div ref={containerRef} className={cn("h-full w-full", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const { ParticlesComponent /*, MotionComponent */ } = loadedComponents;

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      // trigger CSS fade-in
      setVisible(true);
    }
  };
  
  return (
    <Suspense fallback={
      <div ref={containerRef} className={cn("h-full w-full", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    }>
      <div
        ref={containerRef}
        className={cn(
          // start hidden, then transition to visible when `visible` becomes true
          visible ? "opacity-100 transition-opacity duration-700" : "opacity-0",
          className
        )}
      >
        {init && (
          <ParticlesComponent
            id={id || generatedId}
            className={cn("h-full w-full")}
            particlesLoaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: background || "#0d47a1",
                },
              },
              fullScreen: {
                enable: false,
                zIndex: 1,
              },

              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: false,
                    mode: "repulse",
                  },
                  resize: {enable:true},
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                collisions: {
                  enable: true,
                  mode: "bounce",
                },
                color: {
                  value: particleColor || "#ffffff",
                },
                move: {
                  direction: "none",
                  distance: 0,
                  duration: 1,
                  enable: true,
                  offset: 0,
                  outModes: {
                    default: "out",
                  },
                  random: false,
                  speed: speed || 1,
                  straight: false,
                  trail: {
                    enable: false,
                    fill: { color: "#000" },
                    length: 10,
                  },
                },
                number: {
                  density: {
                    enable: particleDensity ? true : false,
                    area: particleDensity || 800,
                  },
                  limit: 0,
                  value: particleDensity || 100,
                },
                opacity: {
                  animation: {
                    enable: true,
                    speed: 0.05,
                    sync: false,
                  },
                  mode: "random",
                  random: {
                    enable: true,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  animation: {
                    enable: true,
                    speed: 2,
                    sync: false,
                  },
                  mode: "random",
                  random: {
                    enable: true,
                    minimumValue: minSize || 1,
                  },
                  value: maxSize || 3,
                },
                twinkle: {
                  lines: {
                    enable: false,
                    frequency: 0.005,
                    opacity: 1,
                  },
                  particles: {
                    enable: false,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        )}
  </div>
    </Suspense>
  );
};
