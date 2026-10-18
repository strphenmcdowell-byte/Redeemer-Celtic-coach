import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Sun, CloudRain, Snowflake, CheckCircle2, Box, Info } from 'lucide-react';
import { PitchConditionType, CurriculumDrill, DrillPhase } from '../types.ts';

interface TacticsBoardProps {
  drill: CurriculumDrill;
  pitchCondition?: PitchConditionType;
  onConditionChange?: (condition: PitchConditionType) => void;
}

export const TacticsBoard: React.FC<TacticsBoardProps> = ({
  drill,
  pitchCondition = 'firm_dry',
  onConditionChange
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAllPhases, setShowAllPhases] = useState<boolean>(false);
  const [localCondition, setLocalCondition] = useState<PitchConditionType>(pitchCondition);

  const activeCondition = onConditionChange ? pitchCondition : localCondition;
  const setCondition = (cond: PitchConditionType) => {
    setLocalCondition(cond);
    if (onConditionChange) onConditionChange(cond);
  };

  // Reset to step 1 when drill changes
  useEffect(() => {
    setActiveStep(1);
    setIsPlaying(false);
    setShowAllPhases(false);
  }, [drill.week, drill.title]);

  // Auto-play timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= (drill.phases?.length || 3)) {
            return 1;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, drill.phases]);

  const phases = drill.phases || [];
  const currentPhase: DrillPhase = phases.find(p => p.stepNumber === activeStep) || phases[0] || {
    stepNumber: 1,
    title: 'Phase 1: Setup & Starting Stance',
    description: drill.steps[0] || 'Initial setup and player positioning.',
    players: [
      { id: '1', x: 80, y: 120, role: 'attacker', label: 'A1' },
      { id: '2', x: 200, y: 120, role: 'defender', label: 'D1' },
      { id: '3', x: 320, y: 120, role: 'gk', label: 'GK' }
    ],
    ball: { x: 95, y: 120 }
  };

  // Pitch Theme Styling
  const getPitchColors = (cond: PitchConditionType) => {
    switch (cond) {
      case 'greasy_wet':
        return {
          bg: '#15803d',
          stripe: '#16a34a',
          mudOverlay: false,
          icon: <Droplets className="w-3.5 h-3.5 text-blue-300" />,
          label: '🌧️ Greasy / Wet Turf (Slick ball roll)'
        };
      case 'heavy_mud':
        return {
          bg: '#3f6212',
          stripe: '#4d7c0f',
          mudOverlay: true,
          icon: <CloudRain className="w-3.5 h-3.5 text-amber-200" />,
          label: '🌾 Churned Winter Mud (Shorten pass range)'
        };
      case 'frost_frozen':
        return {
          bg: '#334155',
          stripe: '#475569',
          mudOverlay: false,
          icon: <Snowflake className="w-3.5 h-3.5 text-cyan-200" />,
          label: '❄️ Frost / Hard Ground (No slide tackles)'
        };
      case 'firm_dry':
      default:
        return {
          bg: '#16a34a',
          stripe: '#22c55e',
          mudOverlay: false,
          icon: <Sun className="w-3.5 h-3.5 text-yellow-300" />,
          label: '☀️ Firm / Dry Grass (True bounce & roll)'
        };
    }
  };

  const pitchTheme = getPitchColors(activeCondition);

  // Helper for role fill colors
  const getRoleFill = (role: string) => {
    switch (role) {
      case 'attacker': return '#dc2626'; // Redeemer Crimson
      case 'defender': return '#0f172a'; // Dark Navy
      case 'neutral': return '#7c3aed';  // Purple
      case 'gk': return '#eab308';       // Neon Gold/Yellow
      case 'coach':
      case 'server': return '#0284c7';   // Cyan/Blue
      default: return '#1d4ed8';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-blue-900 space-y-4">
      {/* Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-red-600">
              Interactive Grass Pitch Tactics Board
            </span>
          </div>
          <div className="text-sm font-black text-blue-950 mt-0.5 flex items-center gap-1.5">
            <span>{drill.title}</span>
            <span className="text-xs font-bold text-slate-500">• {drill.dimensions}</span>
          </div>
        </div>

        {/* Phase Scrubber & Auto-Play Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm transition-all ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlaying ? 'Pause Demo' : 'Auto-Play Run'}
          </button>

          <button
            onClick={() => {
              setActiveStep(1);
              setIsPlaying(false);
              setShowAllPhases(false);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grass Condition Selector */}
      <div className="bg-slate-50 p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-black text-slate-800">
          {pitchTheme.icon}
          <span>{pitchTheme.label}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setCondition('firm_dry')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black ${
              activeCondition === 'firm_dry' ? 'bg-green-700 text-white' : 'bg-white text-slate-700 border hover:bg-slate-100'
            }`}
          >
            Firm Dry
          </button>
          <button
            onClick={() => setCondition('greasy_wet')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black ${
              activeCondition === 'greasy_wet' ? 'bg-blue-700 text-white' : 'bg-white text-slate-700 border hover:bg-slate-100'
            }`}
          >
            Wet Rain
          </button>
          <button
            onClick={() => setCondition('heavy_mud')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black ${
              activeCondition === 'heavy_mud' ? 'bg-amber-800 text-white' : 'bg-white text-slate-700 border hover:bg-slate-100'
            }`}
          >
            Mud / Heavy
          </button>
          <button
            onClick={() => setCondition('frost_frozen')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black ${
              activeCondition === 'frost_frozen' ? 'bg-slate-700 text-white' : 'bg-white text-slate-700 border hover:bg-slate-100'
            }`}
          >
            Frost Turf
          </button>
        </div>
      </div>

      {/* Interactive Step / Phase Scrubber Buttons */}
      <div className="grid grid-cols-4 gap-1.5">
        {phases.map((p, idx) => (
          <button
            key={p.stepNumber}
            onClick={() => {
              setActiveStep(p.stepNumber);
              setShowAllPhases(false);
              setIsPlaying(false);
            }}
            className={`py-2 px-2 rounded-xl text-xs font-black border transition-all text-center ${
              activeStep === p.stepNumber && !showAllPhases
                ? 'bg-blue-900 text-white border-black shadow-md scale-[1.02]'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Step {p.stepNumber}
          </button>
        ))}
        <button
          onClick={() => {
            setShowAllPhases(true);
            setIsPlaying(false);
          }}
          className={`py-2 px-2 rounded-xl text-xs font-black border transition-all text-center ${
            showAllPhases
              ? 'bg-red-600 text-white border-black shadow-md scale-[1.02]'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          All Paths 🔄
        </button>
      </div>

      {/* SVG Grass Pitch Canvas */}
      <div className="relative">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto rounded-2xl border-2 border-slate-900 shadow-2xl select-none"
          style={{ backgroundColor: pitchTheme.bg }}
        >
          <defs>
            {/* Markers for Arrows */}
            <marker id="arrowRun" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ffffff" />
            </marker>
            <marker id="arrowPass" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#facc15" />
            </marker>
            <marker id="arrowShot" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#ef4444" />
            </marker>

            {/* Net Pattern for Goals */}
            <pattern id="netPattern" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 0 3 L 6 3 M 3 0 L 3 6" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
            </pattern>
          </defs>

          {/* Grass Field Mowing Stripes */}
          <rect x="0" y="0" width="80" height="240" fill={pitchTheme.stripe} opacity="0.35" />
          <rect x="160" y="0" width="80" height="240" fill={pitchTheme.stripe} opacity="0.35" />
          <rect x="320" y="0" width="80" height="240" fill={pitchTheme.stripe} opacity="0.35" />

          {/* Heavy Mud Patch Overlay if selected */}
          {pitchTheme.mudOverlay && (
            <>
              <ellipse cx="40" cy="120" rx="30" ry="45" fill="#78350f" opacity="0.35" />
              <ellipse cx="360" cy="120" rx="30" ry="45" fill="#78350f" opacity="0.35" />
              <ellipse cx="200" cy="120" rx="40" ry="30" fill="#78350f" opacity="0.25" />
            </>
          )}

          {/* Outer Boundary Markings */}
          <rect x="10" y="10" width="380" height="220" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.85" />
          <line x1="200" y1="10" x2="200" y2="230" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />
          <circle cx="200" cy="120" r="32" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />
          <circle cx="200" cy="120" r="3" fill="#ffffff" />

          {/* Penalty Boxes */}
          <rect x="10" y="60" width="48" height="120" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
          <rect x="342" y="60" width="48" height="120" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />

          {/* Render Delineated Grid Zones if defined */}
          {drill.pitchSetup?.zones?.map((z, zIdx) => (
            <g key={zIdx}>
              <rect
                x={z.x}
                y={z.y}
                width={z.width}
                height={z.height}
                fill={z.color || '#facc15'}
                fillOpacity="0.12"
                stroke={z.color || '#facc15'}
                strokeWidth="1.5"
                strokeDasharray={z.dashed ? '4,4' : 'none'}
              />
              {z.label && (
                <text
                  x={z.x + z.width / 2}
                  y={z.y + 14}
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="900"
                  textAnchor="middle"
                  opacity="0.9"
                >
                  {z.label}
                </text>
              )}
            </g>
          ))}

          {/* Render Goals */}
          {drill.pitchSetup?.goals?.map((g, gIdx) => (
            <g key={gIdx}>
              <rect
                x={g.x}
                y={g.y}
                width={g.width}
                height={g.height}
                fill="url(#netPattern)"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <rect
                x={g.x}
                y={g.y}
                width={g.width}
                height={g.height}
                fill="none"
                stroke={g.type === 'full' ? '#dc2626' : '#eab308'}
                strokeWidth="2"
              />
              {g.label && (
                <text
                  x={g.x + g.width / 2}
                  y={g.y - 3}
                  fill="#ffffff"
                  fontSize="7"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {g.label}
                </text>
              )}
            </g>
          ))}

          {/* Render Obstacles / Hurdles / Bags */}
          {drill.pitchSetup?.obstacles?.map((obs, oIdx) => (
            <g key={oIdx} transform={`translate(${obs.x}, ${obs.y})`}>
              {obs.type === 'hurdle' && (
                <path d="M -8,5 L -8,-5 L 8,-5 L 8,5" fill="none" stroke="#f87171" strokeWidth="2.5" />
              )}
              {obs.type === 'bag' && (
                <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              )}
              {obs.type === 'mannequin' && (
                <g>
                  <circle cx="0" cy="-6" r="3" fill="#38bdf8" />
                  <path d="M -6,4 L 0,-2 L 6,4 M 0,-2 L 0,8" fill="none" stroke="#38bdf8" strokeWidth="2" />
                </g>
              )}
              {obs.label && (
                <text x="0" y="14" fill="#ffffff" fontSize="6.5" fontWeight="900" textAnchor="middle">
                  {obs.label}
                </text>
              )}
            </g>
          ))}

          {/* Render Training Cones */}
          {drill.pitchSetup?.cones?.map((c, cIdx) => (
            <g key={cIdx} transform={`translate(${c.x}, ${c.y})`}>
              <polygon
                points="0,-8 -6,6 6,6"
                fill={
                  c.color === 'red' ? '#ef4444' :
                  c.color === 'yellow' ? '#facc15' :
                  c.color === 'blue' ? '#3b82f6' : '#f97316'
                }
                stroke="#ffffff"
                strokeWidth="1"
              />
              {c.label && (
                <text x="0" y="12" fill="#ffffff" fontSize="6.5" fontWeight="900" textAnchor="middle">
                  {c.label}
                </text>
              )}
            </g>
          ))}

          {/* Render Player Runs (Dashed Arrows) */}
          {(showAllPhases ? phases.flatMap(p => p.playerRuns || []) : currentPhase.playerRuns || []).map((run, rIdx) => (
            <path
              key={rIdx}
              d={
                run.curve
                  ? `M ${run.from.x},${run.from.y} Q ${run.curve.cx},${run.curve.cy} ${run.to.x},${run.to.y}`
                  : `M ${run.from.x},${run.from.y} L ${run.to.x},${run.to.y}`
              }
              fill="none"
              stroke={run.color || '#ffffff'}
              strokeWidth="2"
              strokeDasharray="4,4"
              markerEnd="url(#arrowRun)"
              opacity="0.9"
            />
          ))}

          {/* Render Pass & Shot Vectors (Solid Arrows) */}
          {(showAllPhases ? phases.flatMap(p => p.passes || []) : currentPhase.passes || []).map((pass, pIdx) => (
            <g key={pIdx}>
              <path
                d={
                  pass.curve
                    ? `M ${pass.from.x},${pass.from.y} Q ${pass.curve.cx},${pass.curve.cy} ${pass.to.x},${pass.to.y}`
                    : `M ${pass.from.x},${pass.from.y} L ${pass.to.x},${pass.to.y}`
                }
                fill="none"
                stroke={pass.type === 'shot' ? '#ef4444' : '#facc15'}
                strokeWidth={pass.type === 'shot' ? '3' : '2.5'}
                markerEnd={pass.type === 'shot' ? 'url(#arrowShot)' : 'url(#arrowPass)'}
                opacity="0.95"
              />
              {pass.label && (
                <text
                  x={(pass.from.x + pass.to.x) / 2}
                  y={(pass.from.y + pass.to.y) / 2 - 4}
                  fill="#facc15"
                  fontSize="7.5"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {pass.label}
                </text>
              )}
            </g>
          ))}

          {/* Render Player Nodes */}
          {currentPhase.players?.map(player => (
            <g
              key={player.id}
              style={{ transition: 'all 0.5s ease-in-out' }}
              transform={`translate(${player.x}, ${player.y})`}
            >
              <circle
                cx="0"
                cy="0"
                r={player.label === 'YOU' ? '14' : '11'}
                fill={getRoleFill(player.role)}
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              <text
                x="0"
                y="3.5"
                fill="#ffffff"
                fontSize={player.label === 'YOU' ? '8.5' : '7.5'}
                fontWeight="900"
                textAnchor="middle"
              >
                {player.label}
              </text>
            </g>
          ))}

          {/* Moving Football Indicator */}
          <g
            style={{ transition: 'all 0.5s ease-in-out' }}
            transform={`translate(${currentPhase.ball?.x || 200}, ${currentPhase.ball?.y || 120})`}
          >
            <circle cx="0" cy="0" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2" fill="#000000" />
          </g>
        </svg>

        {/* Phase Action Badge Overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur text-white px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-black uppercase shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span>{showAllPhases ? 'Viewing Full Movement Map' : `Phase ${activeStep}: ${currentPhase.title}`}</span>
        </div>
      </div>

      {/* Phase Action Detail Box */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-red-600 rounded-r-xl space-y-1">
        <div className="text-[11px] font-black uppercase text-red-600 flex items-center justify-between">
          <span>Active Drill Phase — Step {activeStep} of {phases.length || 3}:</span>
          <span className="text-[10px] text-slate-500 font-bold">{drill.timing}</span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
          {currentPhase.description}
        </p>
      </div>

      {/* Equipment Checklist & Dimensions Banner */}
      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
          <div className="font-black text-slate-900 uppercase flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-blue-800" />
            <span>Equipment Needed:</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {drill.equipment?.map((eq, eIdx) => (
              <span key={eIdx} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold text-slate-700">
                {eq}
              </span>
            )) || <span className="text-slate-500 font-bold">Standard Cones & Footballs</span>}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
          <div className="font-black text-slate-900 uppercase flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-red-600" />
            <span>Pitch & Grid Setup:</span>
          </div>
          <p className="text-xs font-bold text-slate-700 mt-0.5">
            Dimensions: <strong>{drill.dimensions}</strong>
          </p>
        </div>
      </div>

      {/* Visual Legend */}
      <div className="pt-2 border-t flex flex-wrap gap-3 justify-center text-[10px] sm:text-[11px] font-bold text-slate-700">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full border border-black"></span> Attacker (Red)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-black"></span> Defender (Navy)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-purple-600 rounded-full border border-black"></span> Neutral (Purple)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full border border-black"></span> Goalkeeper
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-yellow-400"></span> Pass/Shot Vector
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-white border-b border-dashed"></span> Player Run
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-500 inline-block rotate-45"></span> Cone Marker
        </span>
      </div>
    </div>
  );
};
