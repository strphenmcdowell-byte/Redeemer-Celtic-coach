import React, { useState, useEffect } from 'react';

interface ClubCrestProps {
  className?: string;
  customLogoUrl?: string | null;
}

export const ClubCrest: React.FC<ClubCrestProps> = ({
  className = 'w-12 h-14',
  customLogoUrl = null
}) => {
  const [imgError, setImgError] = useState(false);
  const activeLogo = customLogoUrl || '/logo.svg';

  useEffect(() => {
    setImgError(false);
  }, [activeLogo]);

  return (
    <div className={`${className} shrink-0 relative flex items-center justify-center select-none`}>
      {!imgError ? (
        <img
          src={activeLogo}
          alt="Redeemer Celtic FC Crest"
          className="w-full h-full object-contain drop-shadow-md"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Pixel-perfect inline SVG of official Redeemer Celtic FC Crest */
        <svg viewBox="0 0 400 420" className="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id="crestRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="crestBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <radialGradient id="crestParchment" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <clipPath id="innerShieldClip">
              <path d="M 200,30 C 238,54 305,54 345,70 C 332,142 322,216 308,254 C 280,312 238,345 200,360 C 162,345 120,312 92,254 C 78,216 68,142 55,70 C 95,54 162,54 200,30 Z" />
            </clipPath>
          </defs>

          {/* Outer Heraldic Shield */}
          <path
            d="M 200,22 C 240,48 310,48 355,65 C 340,140 330,220 315,260 C 285,320 240,355 200,370 C 160,355 115,320 85,260 C 70,220 60,140 45,65 C 90,48 160,48 200,22 Z"
            fill="url(#crestGold)"
            stroke="#78350f"
            strokeWidth="3"
          />

          {/* Red Top & Blue Bottom */}
          <g clipPath="url(#innerShieldClip)">
            <rect x="30" y="20" width="340" height="175" fill="url(#crestRed)" />
            <rect x="30" y="195" width="340" height="180" fill="url(#crestBlue)" />
          </g>

          {/* White Parchment Heart */}
          <path
            d="M 200,58 C 232,74 278,75 310,88 C 300,145 292,205 280,238 C 255,282 225,308 200,322 C 175,308 145,282 120,238 C 108,205 100,145 90,88 C 122,75 168,74 200,58 Z"
            fill="url(#crestParchment)"
            stroke="url(#crestGold)"
            strokeWidth="5"
          />

          {/* Celtic Cross & Monogram R */}
          <path d="M 196,78 L 204,78 L 204,92 L 204,260 L 196,260 Z" fill="#09090b" />
          <path d="M 136,112 L 264,112 L 264,120 L 136,120 Z" fill="#09090b" />
          <circle cx="200" cy="116" r="30" fill="none" stroke="#09090b" strokeWidth="4" />
          <path
            d="M 174,102 C 170,118 170,165 174,205 C 174,222 165,236 150,242 C 162,244 176,238 184,226 C 188,212 188,175 188,140 C 196,140 236,140 236,118 C 236,100 200,98 184,102 Z"
            fill="#09090b"
          />
          <path d="M 198,154 C 210,170 228,204 246,238 L 230,240 C 216,210 204,180 190,162 Z" fill="#09090b" />

          {/* Black Banner Ribbon */}
          <path
            d="M 55,310 C 120,295 280,295 345,310 C 335,340 310,345 200,352 C 90,345 65,340 55,310 Z"
            fill="#111827"
            stroke="url(#crestGold)"
            strokeWidth="3.5"
          />
          <text
            x="200"
            y="333"
            fill="#ffffff"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="5"
            textAnchor="middle"
          >
            REDEEMER
          </text>
        </svg>
      )}
    </div>
  );
};
