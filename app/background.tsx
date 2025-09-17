'use client';

import { useState, useEffect } from 'react';

export default function Background() {
  const [isMounted, setIsMounted] = useState(false);
  const [GrainGradient, setGrainGradient] = useState<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      
      // Dynamically import the shader component only after mounting
      import('@paper-design/shaders-react')
        .then((mod) => {
          setGrainGradient(() => mod.GrainGradient);
        })
        .catch((error) => {
          console.warn('Failed to load shader:', error);
          // Keep GrainGradient as null to show fallback
        });
    }
  }, []);

  // Always show animated fallback gradient during SSR and initial load
  if (!isMounted || !GrainGradient) {
    return (
      <div className="fixed inset-0 -z-10 animated-gradient" />
    );
  }

  // Render the shader component only after everything is ready
  return (
    <div className="fixed inset-0 -z-10">
      <GrainGradient
        style={{ height: '100vh', width: '100vw' }}
        colors={["#7300ff","#eba8ff","#dbc5e2"]}
        colorBack="#002329"
        softness={0.26}
        intensity={0.58}
        noise={0.14}
        shape="corners"
        offsetX={0.04}
        offsetY={-0.64}
        scale={1.68}
        rotation={120}
        speed={1}
      />
    </div>
  );
}