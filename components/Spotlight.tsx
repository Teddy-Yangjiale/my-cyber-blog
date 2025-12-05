'use client';
import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;
      // 实时更新 CSS 变量，性能最高
      divRef.current.style.setProperty('--x', `${e.clientX}px`);
      divRef.current.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--x) var(--y), rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
}