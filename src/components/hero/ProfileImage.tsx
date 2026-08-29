'use client';

import React from 'react';
import Image from 'next/image';
import personalInfo from '@/data/personal-info.json';

interface ProfileImageProps {
  size?: 'small' | 'large';
}

/**
 * Detection-box treatment:
 *
 * BOX is expressed as % of the container. These values are calibrated to
 * sit tight against the visible person outline (head top → mid-torso) with
 * objectPosition: center 30%.
 *
 *  top:    4%   – just above the crown of the head
 *  left:   6%   – left shoulder edge
 *  width: 86%   – to right shoulder / arm edge
 *  height:93%   – down to just past the waistline
 *
 * Signal green (#39FF14) is ONLY used here — deliberate contrast from site teal.
 */
const BOX = { top: '4%', left: '6%', width: '86%', height: '93%' };
const BRACKET = 16;   // px — tick length
const STROKE = 1.8;  // px — stroke width
const GREEN = '#39FF14';   // signal / detection green — used ONLY on this element
const GREEN_BG = 'rgba(57,255,20,0.06)';

const DetectionBox: React.FC = () => (
  <div
    className="absolute pointer-events-none"
    style={{ top: BOX.top, left: BOX.left, width: BOX.width, height: BOX.height }}
  >
    {/* Very subtle fill inside box */}
    <div className="absolute inset-0" style={{ background: GREEN_BG }} />

    {/* ── Corner brackets — Top-Left ── */}
    <svg className="absolute top-0 left-0" width={BRACKET} height={BRACKET} style={{ overflow: 'visible' }}>
      <line x1="0" y1="0" x2={BRACKET} y2="0" stroke={GREEN} strokeWidth={STROKE} />
      <line x1="0" y1="0" x2="0" y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
    </svg>

    {/* ── Corner brackets — Top-Right ── */}
    <svg className="absolute top-0 right-0" width={BRACKET} height={BRACKET} style={{ overflow: 'visible' }}>
      <line x1={BRACKET} y1="0" x2="0" y2="0" stroke={GREEN} strokeWidth={STROKE} />
      <line x1={BRACKET} y1="0" x2={BRACKET} y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
    </svg>

    {/* ── Corner brackets — Bottom-Left ── */}
    <svg className="absolute bottom-0 left-0" width={BRACKET} height={BRACKET} style={{ overflow: 'visible' }}>
      <line x1="0" y1={BRACKET} x2={BRACKET} y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
      <line x1="0" y1="0" x2="0" y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
    </svg>

    {/* ── Corner brackets — Bottom-Right ── */}
    <svg className="absolute bottom-0 right-0" width={BRACKET} height={BRACKET} style={{ overflow: 'visible' }}>
      <line x1={BRACKET} y1={BRACKET} x2="0" y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
      <line x1={BRACKET} y1="0" x2={BRACKET} y2={BRACKET} stroke={GREEN} strokeWidth={STROKE} />
    </svg>

    {/* ── Label: BURHAN · 0.99 above top-left corner ── */}
    <div
      className="absolute font-mono uppercase font-bold tracking-wider"
      style={{
        top: '-1.5rem',
        left: 0,
        fontSize: '0.82rem',
        lineHeight: 1,
        color: GREEN,
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        textShadow: `0 0 12px ${GREEN}99`,
      }}
    >
      BURHAN&nbsp;·&nbsp;0.99
    </div>
  </div>
);

const ProfileImage: React.FC<ProfileImageProps> = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  const imgSrc = personalInfo.personal.profileImage;

  // clip-path inset(top right bottom left) — mirrors BOX percentages
  const right = `calc(100% - (${BOX.left} + ${BOX.width}))`;
  const bottom = `calc(100% - (${BOX.top} + ${BOX.height}))`;
  const clipPath = `inset(${BOX.top} ${right} ${bottom} ${BOX.left})`;

  return (
    <div
      className={`relative profile-roi overflow-visible border border-primary/70 ${isLarge ? 'w-64 h-80 lg:w-80 lg:h-[390px] xl:w-[350px] xl:h-[425px]' : 'w-44 h-56'
        }`}
    >
      {/* ── Layer 1: Full grayscale base ── */}
      <Image
        src={imgSrc}
        alt={`${personalInfo.personal.name} — AI Engineer`}
        fill
        sizes={isLarge ? '320px' : '180px'}
        unoptimized
        className="object-cover"
        style={{
          objectPosition: 'center 30%',
          filter: 'grayscale(100%) contrast(1.08) brightness(0.96)',
        }}
        priority
      />

      {/* ── Layer 2: Full-color layer clipped to bounding box ── */}
      <Image
        src={imgSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={isLarge ? '320px' : '180px'}
        unoptimized
        className="object-cover"
        style={{
          objectPosition: 'center 30%',
          clipPath,
          filter: 'saturate(1.2) contrast(1.05)',
        }}
      />

      {/* ── Detection bounding box overlay ── */}
      <DetectionBox />

      {/* ── Thin teal accent line at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'hsl(174 61% 50% / 0.9)' }}
      />
    </div>
  );
};

export default ProfileImage;
