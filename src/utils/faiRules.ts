/**
 * FAI Grassroots Development & Club Mark Rules Engine
 * Redeemer Celtic FC - Noel Gorman Park, Dundalk
 */

export interface AgeCategoryRule {
  ageGroup: string;
  format: string; // e.g., '4v4', '5v5', '7v7', '9v9', '11v11'
  ballSize: number; // 3, 4, or 5
  pitchLengthYards: [number, number];
  pitchWidthYards: [number, number];
  goalSizeFeet: string;
  hasRetreatLine: boolean;
  equalPlayingTimeMandatory: boolean; // Mandatory up to U12 in FAI PDP
  offsideRuleApplies: boolean;
  matchDurationMinutes: number;
  periodFormat: string;
}

export const FAI_PDP_RULES: Record<string, AgeCategoryRule> = {
  'U8 Academy (4v4)': {
    ageGroup: 'U8 Academy (4v4)',
    format: '4v4',
    ballSize: 3,
    pitchLengthYards: [30, 35],
    pitchWidthYards: [20, 25],
    goalSizeFeet: 'Mini pop-up / 8x5 ft',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    offsideRuleApplies: false,
    matchDurationMinutes: 40,
    periodFormat: '4 x 10 mins (4 quarters)'
  },
  'U10 Academy (5v5)': {
    ageGroup: 'U10 Academy (5v5)',
    format: '5v5',
    ballSize: 3,
    pitchLengthYards: [35, 40],
    pitchWidthYards: [25, 30],
    goalSizeFeet: '12x6 ft',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    offsideRuleApplies: false,
    matchDurationMinutes: 50,
    periodFormat: '2 x 25 mins'
  },
  'U12 Boys & Girls (7v7)': {
    ageGroup: 'U12 Boys & Girls (7v7)',
    format: '7v7',
    ballSize: 4,
    pitchLengthYards: [55, 65],
    pitchWidthYards: [35, 45],
    goalSizeFeet: '16x6 ft',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    offsideRuleApplies: false,
    matchDurationMinutes: 60,
    periodFormat: '2 x 30 mins'
  },
  'U14 Boys & Girls (9v9)': {
    ageGroup: 'U14 Boys & Girls (9v9)',
    format: '9v9',
    ballSize: 4,
    pitchLengthYards: [70, 80],
    pitchWidthYards: [45, 55],
    goalSizeFeet: '16x7 ft or 21x7 ft',
    hasRetreatLine: false,
    equalPlayingTimeMandatory: false, // Recommended fair game time, competitive offside begins
    offsideRuleApplies: true,
    matchDurationMinutes: 70,
    periodFormat: '2 x 35 mins'
  },
  'U16 & Senior (11v11)': {
    ageGroup: 'U16 & Senior (11v11)',
    format: '11v11',
    ballSize: 5,
    pitchLengthYards: [100, 110],
    pitchWidthYards: [60, 70],
    goalSizeFeet: '24x8 ft',
    hasRetreatLine: false,
    equalPlayingTimeMandatory: false,
    offsideRuleApplies: true,
    matchDurationMinutes: 80,
    periodFormat: '2 x 40 mins (U16) / 2 x 45 mins (Senior)'
  }
};

/**
 * Membership Fee Calculator with Family Cap & Sibling Tier Discounts
 */
export interface PricingConfig {
  child1: number;
  child2: number;
  child3: number;
  familyCap: number;
}

export function calculateMembershipFee(childrenCount: number, pricing: PricingConfig): number {
  const count = Math.max(0, Math.floor(childrenCount));
  if (count === 0) return 0;
  if (count === 1) return Number(pricing.child1);
  if (count === 2) return Math.min(Number(pricing.familyCap), Number(pricing.child1) + Number(pricing.child2));
  
  const rawTotal = Number(pricing.child1) + Number(pricing.child2) + (count - 2) * Number(pricing.child3);
  return Math.min(Number(pricing.familyCap), rawTotal);
}

/**
 * Grass Pitch Condition Adaptation Engine
 * Calibrates coaching setup for natural turf at Noel Gorman Park, Dundalk
 */
export type PitchConditionType = 'firm_dry' | 'greasy_wet' | 'heavy_mud' | 'frost_frozen';

export interface GrassPitchAdaptation {
  condition: PitchConditionType;
  label: string;
  coneRecommendation: string;
  footwearRecommendation: string;
  ballPressurePsi: string;
  drillPacingModifier: string;
  safetyChecklist: string[];
}

export function getGrassPitchAdaptation(condition: PitchConditionType): GrassPitchAdaptation {
  switch (condition) {
    case 'greasy_wet':
      return {
        condition,
        label: 'Greasy / Wet Rain Turf',
        coneRecommendation: 'Tall 9-inch fluorescent orange / yellow cones (flat discs slide on wet grass)',
        footwearRecommendation: 'Mixed soft-ground (SG) or moulded studs with deep rubber grips; avoid smooth turf trainers',
        ballPressurePsi: '8.5 - 9.0 PSI (slightly softer to prevent heavy skidding on wet grass blades)',
        drillPacingModifier: 'Increase drill width by 15% to compensate for sliding ball velocity; emphasize cushioning first touches into body shape',
        safetyChecklist: [
          'Inspect goalmouths for standing water puddles',
          'Check touchlines for slippery mud patches before sprint duels',
          'Ensure dry towel is stationed at kit bag for balls and goalkeeping gloves'
        ]
      };
    case 'heavy_mud':
      return {
        condition,
        label: 'Heavy / Churned Winter Mud',
        coneRecommendation: 'Weighted corner cones and dome cones with turf spikes so they stay upright in churned soil',
        footwearRecommendation: 'Soft-Ground (SG) studs with aluminium or hybrid studs for traction (strictly inspect for sharp edges)',
        ballPressurePsi: '8.0 - 8.5 PSI (prevents heavy mud-coated ball from stinging young players)',
        drillPacingModifier: 'Shorten passing distances to 6–10 yards; ball will stick in mud. Focus on aerial sets and quick feet',
        safetyChecklist: [
          'Rotate training grid to virgin grass outside penalty area to protect Noel Gorman Park main pitch',
          'Check for deep studs holes or loose sods that could twist ankles',
          'Mandatory warm-down and dry clothes protocol post-session'
        ]
      };
    case 'frost_frozen':
      return {
        condition,
        label: 'Hard Frost / Frozen Pitch',
        coneRecommendation: 'Flat heavy rubber marker discs (spike cones cannot penetrate frozen soil)',
        footwearRecommendation: 'Moulded rubber studs (FG) or astro trainers; metal studs strictly prohibited on frozen ground',
        ballPressurePsi: '8.0 PSI (prevents rock-hard ball impact)',
        drillPacingModifier: 'Strictly non-contact, low-velocity ball mastery and footwork; no slide tackles or high aerial duels',
        safetyChecklist: [
          'Perform bounce and sole-dig test 45 minutes prior to session',
          'If ground fails thumb-pressure test across 3 key pitch areas, immediately call off or move to indoor hall',
          'Inspect goalpost anchor integrity in frozen soil'
        ]
      };
    case 'firm_dry':
    default:
      return {
        condition: 'firm_dry',
        label: 'Firm / Dry Summer & Autumn Grass',
        coneRecommendation: 'Standard flexible low-profile saucer cones; dual colours for gates',
        footwearRecommendation: 'Firm-Ground (FG) moulded plastic or rubber studs',
        ballPressurePsi: '9.0 - 9.5 PSI standard FAI pressure',
        drillPacingModifier: 'True roll and high bounce; optimal for high-tempo 1v1 duels, overlaps, and quick give-and-gos',
        safetyChecklist: [
          'Inspect pitch for dry divots or stones displaced by lawnmower',
          'Ensure hydration breaks every 15–20 minutes in warm weather',
          'Check corner flags and portable goalpost ground anchors'
        ]
      };
  }
}

/**
 * Equal Playing Time Compliance Checker (FAI PDP Rule for U8 to U12)
 * Ensures every registered player gets at least 50% match time, regardless of ability or scoreline.
 */
export interface PlayerMinuteAllocation {
  playerId: string | number;
  playerName: string;
  minutesPlayed: number;
}

export interface PlayingTimeAuditResult {
  isPdpCompliant: boolean;
  minAllowedMinutesPerPlayer: number;
  totalMatchMinutes: number;
  failedPlayers: { playerName: string; minutes: number }[];
  complianceScorePercent: number;
  notes: string;
}

export function auditPlayingTime(
  ageGroup: string,
  totalMatchMinutes: number,
  allocations: PlayerMinuteAllocation[]
): PlayingTimeAuditResult {
  const rule = FAI_PDP_RULES[ageGroup];
  const isMandatory = rule ? rule.equalPlayingTimeMandatory : false;
  const minAllowedMinutesPerPlayer = isMandatory ? Math.floor(totalMatchMinutes * 0.5) : 0;

  if (allocations.length === 0) {
    return {
      isPdpCompliant: true,
      minAllowedMinutesPerPlayer,
      totalMatchMinutes,
      failedPlayers: [],
      complianceScorePercent: 100,
      notes: 'No players rostered.'
    };
  }

  const failedPlayers = allocations
    .filter(p => p.minutesPlayed < minAllowedMinutesPerPlayer)
    .map(p => ({ playerName: p.playerName, minutes: p.minutesPlayed }));

  const compliantCount = allocations.length - failedPlayers.length;
  const complianceScorePercent = Math.round((compliantCount / allocations.length) * 100);

  const isPdpCompliant = !isMandatory || failedPlayers.length === 0;

  return {
    isPdpCompliant,
    minAllowedMinutesPerPlayer,
    totalMatchMinutes,
    failedPlayers,
    complianceScorePercent,
    notes: isMandatory
      ? isPdpCompliant
        ? 'Full FAI PDP Compliance: All players received at least 50% equal playing time.'
        : `Non-compliant with FAI PDP: ${failedPlayers.length} player(s) played under 50% (${minAllowedMinutesPerPlayer} mins).`
      : 'U14+ / Competitive tier: Equal playing time is recommended but not mandatory under FAI league regulations.'
  };
}

/**
 * FAI Club Mark Audit Scoring Engine
 * Evaluates Entry Level & One Star Player Development Centre criteria
 */
export interface ClubMarkCriterion {
  id: string;
  tier: 'Entry Mark' | 'One Star PDC';
  category: 'Governance' | 'Safeguarding' | 'Coach Education' | 'Player Development';
  title: string;
  mandatory: boolean;
  status: 'Compliant' | 'In Progress' | 'Pending Verification';
  evidenceDoc: string;
}

export function calculateClubMarkProgress(criteria: ClubMarkCriterion[]): {
  entryMarkCompliant: boolean;
  oneStarEligible: boolean;
  totalPercent: number;
  entryPercent: number;
  oneStarPercent: number;
} {
  const entryItems = criteria.filter(c => c.tier === 'Entry Mark');
  const oneStarItems = criteria.filter(c => c.tier === 'One Star PDC');

  const entryCompliantCount = entryItems.filter(c => c.status === 'Compliant').length;
  const oneStarCompliantCount = oneStarItems.filter(c => c.status === 'Compliant').length;
  const totalCompliantCount = criteria.filter(c => c.status === 'Compliant').length;

  const entryPercent = entryItems.length > 0 ? Math.round((entryCompliantCount / entryItems.length) * 100) : 100;
  const oneStarPercent = oneStarItems.length > 0 ? Math.round((oneStarCompliantCount / oneStarItems.length) * 100) : 100;
  const totalPercent = criteria.length > 0 ? Math.round((totalCompliantCount / criteria.length) * 100) : 100;

  const entryMandatoryFailed = entryItems.some(c => c.mandatory && c.status !== 'Compliant');
  const oneStarMandatoryFailed = oneStarItems.some(c => c.mandatory && c.status !== 'Compliant');

  return {
    entryMarkCompliant: !entryMandatoryFailed && entryPercent === 100,
    oneStarEligible: !entryMandatoryFailed && !oneStarMandatoryFailed && entryPercent === 100 && oneStarPercent >= 80,
    totalPercent,
    entryPercent,
    oneStarPercent
  };
}
