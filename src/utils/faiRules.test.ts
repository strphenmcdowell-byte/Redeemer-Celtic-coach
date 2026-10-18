import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMembershipFee,
  getGrassPitchAdaptation,
  auditPlayingTime,
  calculateClubMarkProgress,
  FAI_PDP_RULES
} from './faiRules.ts';
import type { ClubMarkCriterion } from './faiRules.ts';

test('FAI PDP rules correctly specify ball sizes and equal playing time mandates', () => {
  assert.equal(FAI_PDP_RULES['U8 Academy (4v4)'].ballSize, 3);
  assert.equal(FAI_PDP_RULES['U8 Academy (4v4)'].equalPlayingTimeMandatory, true);
  assert.equal(FAI_PDP_RULES['U8 Academy (4v4)'].hasRetreatLine, true);

  assert.equal(FAI_PDP_RULES['U10 Academy (5v5)'].ballSize, 3);
  assert.equal(FAI_PDP_RULES['U10 Academy (5v5)'].equalPlayingTimeMandatory, true);

  assert.equal(FAI_PDP_RULES['U12 Boys & Girls (7v7)'].ballSize, 4);
  assert.equal(FAI_PDP_RULES['U12 Boys & Girls (7v7)'].equalPlayingTimeMandatory, true);

  assert.equal(FAI_PDP_RULES['U14 Boys & Girls (9v9)'].ballSize, 4);
  assert.equal(FAI_PDP_RULES['U14 Boys & Girls (9v9)'].offsideRuleApplies, true);

  assert.equal(FAI_PDP_RULES['U16 & Senior (11v11)'].ballSize, 5);
});

test('Membership fee calculator respects sibling discounts and family maximum cap', () => {
  const pricing = { child1: 120, child2: 100, child3: 80, familyCap: 280 };

  assert.equal(calculateMembershipFee(0, pricing), 0);
  assert.equal(calculateMembershipFee(1, pricing), 120);
  assert.equal(calculateMembershipFee(2, pricing), 220); // 120 + 100
  assert.equal(calculateMembershipFee(3, pricing), 280); // 120 + 100 + 80 = 300, capped at 280
  assert.equal(calculateMembershipFee(5, pricing), 280); // capped at 280
});

test('Grass pitch adaptation handles variable pitch conditions at Noel Gorman Park', () => {
  const wet = getGrassPitchAdaptation('greasy_wet');
  assert.match(wet.coneRecommendation, /Tall 9-inch fluorescent/i);
  assert.match(wet.ballPressurePsi, /8.5 - 9.0 PSI/i);

  const mud = getGrassPitchAdaptation('heavy_mud');
  assert.match(mud.footwearRecommendation, /Soft-Ground/i);

  const frost = getGrassPitchAdaptation('frost_frozen');
  assert.match(frost.footwearRecommendation, /metal studs strictly prohibited/i);

  const dry = getGrassPitchAdaptation('firm_dry');
  assert.match(dry.footwearRecommendation, /Firm-Ground/i);
});

test('Equal playing time audit strictly verifies >= 50% for U8-U12 PDP squads', () => {
  const u10Players = [
    { playerId: 'p1', playerName: 'Liam B', minutesPlayed: 30 },
    { playerId: 'p2', playerName: 'Aoife M', minutesPlayed: 25 },
    { playerId: 'p3', playerName: 'Callum O', minutesPlayed: 15 } // Less than 50% of 50m (25m)
  ];

  const resultFail = auditPlayingTime('U10 Academy (5v5)', 50, u10Players);
  assert.equal(resultFail.isPdpCompliant, false);
  assert.equal(resultFail.minAllowedMinutesPerPlayer, 25);
  assert.equal(resultFail.failedPlayers.length, 1);
  assert.equal(resultFail.failedPlayers[0].playerName, 'Callum O');

  // Compliant squad
  const compliantPlayers = [
    { playerId: 'p1', playerName: 'Liam B', minutesPlayed: 25 },
    { playerId: 'p2', playerName: 'Aoife M', minutesPlayed: 25 },
    { playerId: 'p3', playerName: 'Callum O', minutesPlayed: 25 }
  ];
  const resultPass = auditPlayingTime('U10 Academy (5v5)', 50, compliantPlayers);
  assert.equal(resultPass.isPdpCompliant, true);
  assert.equal(resultPass.failedPlayers.length, 0);
  assert.equal(resultPass.complianceScorePercent, 100);
});

test('Club Mark scoring computes progress for Entry and One Star tiers', () => {
  const mockCriteria: ClubMarkCriterion[] = [
    {
      id: 'cm1',
      tier: 'Entry Mark',
      category: 'Governance',
      title: 'Club Constitution & AGM Minutes',
      mandatory: true,
      status: 'Compliant',
      evidenceDoc: 'Constitution_2026.pdf'
    },
    {
      id: 'cm2',
      tier: 'Entry Mark',
      category: 'Safeguarding',
      title: 'Child Safeguarding Statement & Risk Assessment',
      mandatory: true,
      status: 'Compliant',
      evidenceDoc: 'Safeguarding_2026.1.pdf'
    },
    {
      id: 'cm3',
      tier: 'One Star PDC',
      category: 'Player Development',
      title: 'Equal Playing Time Monitoring in U8-U12',
      mandatory: true,
      status: 'Compliant',
      evidenceDoc: 'PDP_Tracker_Log.pdf'
    },
    {
      id: 'cm4',
      tier: 'One Star PDC',
      category: 'Coach Education',
      title: 'All Coaches holding minimum FAI PDP 1 or UEFA C',
      mandatory: true,
      status: 'In Progress',
      evidenceDoc: 'Coach_License_Tracker.xlsx'
    }
  ];

  const evalResult = calculateClubMarkProgress(mockCriteria);
  assert.equal(evalResult.entryMarkCompliant, true);
  assert.equal(evalResult.entryPercent, 100);
  assert.equal(evalResult.oneStarEligible, false); // Because cm4 is In Progress
});
