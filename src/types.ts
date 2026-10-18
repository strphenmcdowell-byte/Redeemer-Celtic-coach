/**
 * TypeScript types for Redeemer Celtic FC Platform
 * Est. 1971 • Noel Gorman Park, Dundalk
 */

export type ViewMode = 'home' | 'handbooks' | 'clubmark' | 'documents' | 'coaches' | 'admin' | 'coaches_app';

export type PitchConditionType = 'firm_dry' | 'greasy_wet' | 'heavy_mud' | 'frost_frozen';

export type DrillCategory =
  | 'warmup'
  | 'ball_handling'
  | 'coordination'
  | 'motivational'
  | 'technical'
  | 'fitness'
  | 'tactical'
  | 'scrimmage'
  | 'goalkeeping';

export interface TacticalPlayer {
  id: string;
  x: number; // 0 to 400 SVG scale
  y: number; // 0 to 240 SVG scale
  role: 'attacker' | 'defender' | 'neutral' | 'gk' | 'coach' | 'server';
  label: string;
  subLabel?: string;
}

export interface TacticalArrow {
  from: { x: number; y: number };
  to: { x: number; y: number };
  curve?: { cx: number; cy: number };
  label?: string;
  color?: string;
  type?: 'run' | 'pass' | 'shot' | 'cross' | 'throw';
}

export interface DrillPhase {
  stepNumber: number;
  title: string;
  description: string;
  players: TacticalPlayer[];
  ball: { x: number; y: number };
  playerRuns?: TacticalArrow[];
  passes?: TacticalArrow[];
}

export interface TacticalCone {
  x: number;
  y: number;
  color?: 'orange' | 'red' | 'yellow' | 'blue';
  shape?: 'cone' | 'gate' | 'tall';
  label?: string;
}

export interface TacticalGoal {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'full' | 'mini' | 'cone' | 'wide';
  facing?: 'left' | 'right' | 'top' | 'bottom';
  label?: string;
}

export interface TacticalObstacle {
  x: number;
  y: number;
  type: 'hurdle' | 'bag' | 'mannequin' | 'tall_cone';
  label?: string;
}

export interface TacticalZone {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color?: string;
  dashed?: boolean;
}

export interface PitchSetupConfig {
  fieldLength?: string;
  fieldWidth?: string;
  cones: TacticalCone[];
  goals: TacticalGoal[];
  obstacles?: TacticalObstacle[];
  zones?: TacticalZone[];
}

export interface CurriculumDrill {
  week: number;
  title: string;
  phaseTag: string;
  pattern: string;
  timing: string;
  category: DrillCategory;
  ageBracket: string;
  dimensions: string;
  equipment: string[];
  whatWeLearn: string;
  howToUseInGame: string;
  steps: string[];
  coachingPoints: string[];
  variations: string[];
  coachingCues: string[];
  grassPitchNotes: {
    dry: string;
    wet: string;
    mud: string;
  };
  pitchSetup: PitchSetupConfig;
  phases: DrillPhase[];
}

export interface AgeHandbookConfig {
  ageGroup: string;
  badge: string;
  focus: string;
  ballSize: number;
  matchFormat: string;
  pitchSize: string;
  goalSize: string;
  hasRetreatLine: boolean;
  equalPlayingTimeMandatory: boolean;
  matchDuration: string;
  faiPdpSummary: string;
  grassPitchAdvice: string;
  skills: {
    name: string;
    gameUse: string;
    pattern: string;
    steps: string[];
    coachingCues: string[];
  }[];
}

export interface PolicySection {
  heading: string;
  body: string;
}

export interface ClubPolicy {
  id: string;
  title: string;
  category: string;
  visibility: 'Public' | 'Admin' | 'Coaches';
  version: string;
  effectiveDate: string;
  summary: string;
  sections: PolicySection[];
}

export interface PlayerRegistration {
  id: number | string;
  playerName: string;
  dob: string;
  ageGroup: string;
  parentName: string;
  phone: string;
  socialHandle: string;
  medical: string;
  docFileName: string;
  docUploadDate: string;
  docVerified: boolean;
  present?: boolean;
}

export interface StaffMember {
  id: number | string;
  name: string;
  role: string;
  ageGroup: string;
  vetted: boolean;
  safeguardingCert: boolean;
  coachingBadge: string;
}

export interface ClubPartner {
  id: number;
  name: string;
  tier: string;
  url: string;
  handle: string;
  desc: string;
}
