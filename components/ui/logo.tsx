import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-6 w-6" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Connections (Lines) */}
      <line x1="50" y1="68" x2="20" y2="40" stroke="#8c8c8c" strokeWidth="6.5" />
      <line x1="50" y1="68" x2="80" y2="40" stroke="#8c8c8c" strokeWidth="6.5" />
      <line x1="50" y1="68" x2="50" y2="28" stroke="#13b1a8" strokeWidth="6.5" />
      <line x1="50" y1="28" x2="34" y2="12" stroke="#8c8c8c" strokeWidth="6.5" />
      <line x1="50" y1="28" x2="66" y2="12" stroke="#13b1a8" strokeWidth="6.5" />

      {/* Nodes (Circles) */}
      <circle cx="50" cy="68" r="8.5" fill="#8c8c8c" />
      <circle cx="20" cy="40" r="8.5" fill="#8c8c8c" />
      <circle cx="80" cy="40" r="8.5" fill="#8c8c8c" />
      <circle cx="50" cy="28" r="8.5" fill="#13b1a8" />
      <circle cx="34" cy="12" r="8.5" fill="#8c8c8c" />
      <circle cx="66" cy="12" r="8.5" fill="#13b1a8" />
    </svg>
  );
}
