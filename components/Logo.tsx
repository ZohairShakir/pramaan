import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background/Shadow Circle (Optional, keeping it clean for now) */}
      
      {/* The "प्र" character in Olive Green */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#3D541D"
        style={{
          fontFamily: "'Noto Sans Devanagari', 'Sanskrit Text', sans-serif",
          fontSize: '280px',
          fontWeight: '900',
        }}
      >
        प्र
      </text>

      {/* The "MAAN" text in Terracotta */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#A6634B"
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: '70px',
          fontWeight: '400',
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(255,255,255,0.8)'
        }}
      >
        MAAN
      </text>
    </svg>
  );
};
