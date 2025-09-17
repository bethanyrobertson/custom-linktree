'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-pink-300 to-purple-200" />
    )
  }
);

export default function Background() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show fallback gradient until component is mounted
  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-pink-300 to-purple-200" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-pink-300 to-purple-200" />}>
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
      </Suspense>
    </div>
  );
}