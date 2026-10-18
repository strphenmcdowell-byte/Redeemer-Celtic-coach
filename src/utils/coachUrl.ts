/**
 * URL and Deep-linking helpers for Redeemer Celtic Standalone Coaches App
 */

export interface CoachAppUrlParams {
  isCoachApp: boolean;
  ageGroup?: string;
  week?: number;
  tool?: 'curriculum' | 'roster' | 'equal_time' | 'pitch_check' | 'eap' | 'concussion';
}

export function parseCoachAppParams(search: string): CoachAppUrlParams {
  const params = new URLSearchParams(search);
  const appParam = params.get('app');
  const portalParam = params.get('portal');
  const roleParam = params.get('role');

  const isCoachApp =
    appParam === 'coaches' ||
    appParam === 'coach' ||
    portalParam === 'coaches' ||
    roleParam === 'coach';

  const rawAge = params.get('age');
  let ageGroup: string | undefined;
  if (rawAge) {
    const lower = rawAge.toLowerCase();
    if (lower.includes('u8') || lower.includes('4v4')) ageGroup = 'U8 Academy (4v4)';
    else if (lower.includes('u10') || lower.includes('5v5')) ageGroup = 'U10 Academy (5v5)';
    else if (lower.includes('u12') || lower.includes('7v7')) ageGroup = 'U12 Boys & Girls (7v7)';
    else if (lower.includes('u14') || lower.includes('9v9')) ageGroup = 'U14 Boys & Girls (9v9)';
    else if (lower.includes('u16') || lower.includes('senior') || lower.includes('11v11')) ageGroup = 'U16 & Senior (11v11)';
  }

  const rawWeek = params.get('week');
  const week = rawWeek ? Math.max(1, Math.min(32, parseInt(rawWeek, 10) || 1)) : undefined;

  const rawTool = params.get('tool') as any;
  let tool: CoachAppUrlParams['tool'];
  if (['curriculum', 'roster', 'equal_time', 'pitch_check', 'eap', 'concussion'].includes(rawTool)) {
    tool = rawTool;
  }

  return { isCoachApp, ageGroup, week, tool };
}

export function buildCoachShareUrl(baseUrl: string, options?: { age?: string; week?: number; tool?: string }): string {
  const origin = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://redeemer-celtic.fc';
  const url = new URL(baseUrl, origin);
  url.searchParams.set('app', 'coaches');
  if (options?.age) {
    const shortAge = options.age.includes('U8')
      ? 'u8'
      : options.age.includes('U10')
      ? 'u10'
      : options.age.includes('U12')
      ? 'u12'
      : options.age.includes('U14')
      ? 'u14'
      : 'u16';
    url.searchParams.set('age', shortAge);
  }
  if (options?.week) {
    url.searchParams.set('week', options.week.toString());
  }
  if (options?.tool) {
    url.searchParams.set('tool', options.tool);
  }
  return url.toString();
}
