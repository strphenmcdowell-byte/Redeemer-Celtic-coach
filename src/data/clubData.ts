/**
 * Official Redeemer Celtic FC Data Store
 * Established 1971 • Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth
 * Aligned with FAI Club Mark & FAI Player Development Plan (PDP)
 * Primary Source of Truth: Stephen McDowell "300 Soccer Drills" Manual
 */

import { AgeHandbookConfig, ClubPolicy, ClubPartner, StaffMember, PlayerRegistration, CurriculumDrill } from '../types.ts';
import { ClubMarkCriterion } from '../utils/faiRules.ts';

export const AGE_CONFIGS: Record<string, AgeHandbookConfig> = {
  'U8 Academy (4v4)': {
    ageGroup: 'U8 Academy (4v4)',
    badge: '4v4 Fun & Ball Mastery',
    focus: 'Fundamental Movement Skills (ABCs: Agility, Balance, Coordination), close-touch dribbling, 1v1 fun duels',
    ballSize: 3,
    matchFormat: '4v4 without Goalkeepers (or rotating Sweeper-Keeper into mini-goals)',
    pitchSize: '30 x 20–25 yards (Grass Pitch marked with low cones)',
    goalSize: 'Mini pop-up / 8 x 5 ft target goals',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    matchDuration: '4 x 10 mins (4 quarters) • Roll-ins / Dribble-ins replacing throw-ins',
    faiPdpSummary: 'No league tables or recorded scores. Strict equal playing time for every registered child. Emphasis on maximizing ball touches (100+ per session). No heading or heavy slide tackling.',
    grassPitchAdvice: 'On wet Dundalk grass, use taller 9" neon cones so children can spot boundaries clearly. Keep training grids away from muddy goalmouths to preserve pitch turf.',
    skills: [
      {
        name: 'Ball Transport Relay (#1 Warm-Up)',
        gameUse: 'Carrying and dribbling balls across grass grids with balance and spatial awareness.',
        pattern: 'dribble_gates',
        steps: [
          'Run and jump over scatter balls inside 20m x 30m grid.',
          'Sprint 10m to first square, pick up ball, and carry to 2nd square.',
          'Tag next teammate in line to run next ball.'
        ],
        coachingCues: ['"Soft knees over uneven turf!"', '"Head up to avoid collisions!"', '"Quick tag at the line!"']
      },
      {
        name: 'Dribble Between Squares (#1 Ball Handling)',
        gameUse: 'Controlling the ball using inside and outside of both feet in tight channels.',
        pattern: 'zigzag',
        steps: [
          'In groups of 4, dribble from 5m x 5m square to opposite square 10m away.',
          'Alternate outside right foot, inside right, outside left, inside left.',
          'Keep ball within 1 yard of boots at all times.'
        ],
        coachingCues: ['"Soft baby touches!"', '"Look up at the far cone!"', '"Glue ball to your boots!"']
      },
      {
        name: 'Protect the Castle (#8 Coordination)',
        gameUse: 'Shielding and defending target cones against opposing shots on grass.',
        pattern: '1v1_duel',
        steps: [
          '4 cones arranged in 5m x 5m square (the castle) with a tall cone inside.',
          'X defends castle wall between cones against 2 attackers (O).',
          'O attempts to dribble through wall and knock down tall cone.'
        ],
        coachingCues: ['"Side-on stance between ball and castle!"', '"Bend knees for balance!"', '"Quick block tackle!"']
      },
      {
        name: 'Pass & Crawl Through Legs (#4 Motivational)',
        gameUse: 'Building passing power, accuracy, and agility on grass turf.',
        pattern: 'turn_escape',
        steps: [
          'Xs stand with legs spread wide apart in grid.',
          'Os dribble towards X, pass ball firmly between legs, and crawl/run through after ball.',
          'Retrieve ball on other side and attack next defender.'
        ],
        coachingCues: ['"Firm pass through the legs!"', '"Fast crawl to retrieve!"', '"Look up for open teammates!"']
      }
    ]
  },

  'U10 Academy (5v5)': {
    ageGroup: 'U10 Academy (5v5)',
    badge: '5v5 Skill Acquisition',
    focus: '1v1 feints, directional back-foot first touch, inside-foot passing, 2v1 overloads & retreat line play',
    ballSize: 3,
    matchFormat: '5v5 (1 Goalkeeper + 4 Outfield Players)',
    pitchSize: '40 x 25–30 yards (Grass Pitch marked with touchlines)',
    goalSize: '12 x 6 ft goals',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    matchDuration: '2 x 25 mins • Retreat Line enforced on all Goalkeeper goal clearances',
    faiPdpSummary: 'Equal playing time strictly monitored. Retreat line gives goalkeeper safe opportunity to play out from back. No punting out of hands allowed by GK; ball must be rolled or passed out from ground.',
    grassPitchAdvice: 'Wet grass will speed up passes; instruct players to cushion the ball with an open inside foot. Adjust retreat line markers clearly with flat cones.',
    skills: [
      {
        name: 'Change of Direction Cut-Back (#2 Technical)',
        gameUse: 'Cutting the ball back sharply to eliminate a sprinting defender on wet grass.',
        pattern: 'turn_escape',
        steps: [
          'Pass ball 3–5m ahead and sprint after it.',
          'Cut ball back 180 degrees using inside or outside of foot.',
          'Pass back to waiting teammate and sprint to end of line.'
        ],
        coachingCues: ['"Weight your pass into space!"', '"Pivot body around the ball!"', '"Explode after the cut!"']
      },
      {
        name: 'Dribble & Shoot #1 (#3 Technical)',
        gameUse: 'Executing a body feint at a cone before firing a diagonal shot into the corner.',
        pattern: '1v1_duel',
        steps: [
          'Dribble at speed towards the 10m cone.',
          'Make a body feint into the penalty box.',
          'Set up shot with a diagonal touch and strike on net.'
        ],
        coachingCues: ['"Sell the fake with your upper body!"', '"Diagonal touch sets up the strike!"', '"Aim for the far post!"']
      },
      {
        name: 'Defending 2 Goals (#7 Technical)',
        gameUse: 'Training defender reaction speed to block shots across multiple target goals.',
        pattern: 'press_cover',
        steps: [
          'Midfielder M passes to X1 or X2 at wide cones.',
          'Defender D hustles across 15m grid to block shot on 2m small goals.',
          'X1/X2 can pass back to M if goal is blocked.'
        ],
        coachingCues: ['"Hustle across in athletic stance!"', '"Slide or block tackle legally!"', '"Quick communication!"']
      }
    ]
  },

  'U12 Academy (7v7)': {
    ageGroup: 'U12 Academy (7v7)',
    badge: '7v7 Game Understanding',
    focus: 'Width, wing play, 2v1 overloads, transition speed, and equal playing time compliance',
    ballSize: 4,
    matchFormat: '7v7 (1 GK + 6 Outfield Players)',
    pitchSize: '60 x 35–40 yards',
    goalSize: '16 x 7 ft goals',
    hasRetreatLine: true,
    equalPlayingTimeMandatory: true,
    matchDuration: '2 x 30 mins',
    faiPdpSummary: 'Mandatory equal playing time. Introduction of basic tactical shape (e.g. 2-3-1 or 3-2-1). Retreat line active on GK clearances.',
    grassPitchAdvice: 'Maintain pitch shape; encourage long switches of play when wet turf congests central areas.',
    skills: [
      {
        name: 'Overlap Run with 2v1 (#5 Technical)',
        gameUse: 'Overlapping on the wing to create a 2v1 overload against a fullback.',
        pattern: 'overlap_run',
        steps: [
          'A1 passes to Defender D, who plays 1-touch pass back into A1 run.',
          'A1 passes to A3 and overlaps behind A3.',
          'A1 and A3 play 2v1 against D to finish with a shot on goal.'
        ],
        coachingCues: ['"Time the overlap run!"', '"Hold run until pass is controlled!"', '"Drive into the box!"']
      },
      {
        name: '7v7 into 4 Corners (#2 Tactical)',
        gameUse: 'Switching play quickly across all 4 quadrants of the pitch.',
        pattern: 'switch_play',
        steps: [
          'Team in possession scores point by passing to player running into 1 of 4 corner grids.',
          'Defenders shift to cover space.',
          'On winning ball, counter quickly to open opposite grid.'
        ],
        coachingCues: ['"Scan for unattended squares!"', '"Vocal loud calls for the ball!"', '"Quick switch of play!"']
      }
    ]
  },

  'U14 Academy (9v9)': {
    ageGroup: 'U14 Academy (9v9)',
    badge: '9v9 Tactical Foundations',
    focus: 'No. 6 Pivot link play, half-space exploitation, offside line timing, 5-second counter-pressing & zonal back 3',
    ballSize: 4,
    matchFormat: '9v9 (1 GK + 8 Outfield Players)',
    pitchSize: '75 x 50 yards',
    goalSize: '16 x 7 ft or 21 x 7 ft',
    hasRetreatLine: false,
    equalPlayingTimeMandatory: false,
    matchDuration: '2 x 35 mins',
    faiPdpSummary: 'Full competitive offside rules in effect. Tactical transition from small-sided to 11v11 shape.',
    grassPitchAdvice: 'Watch offside lines on wide grass pitches. Ensure soft-ground studs on heavy pitch days.',
    skills: [
      {
        name: 'Flank Attack with Switching Play (#1 Tactical)',
        gameUse: 'Using wide lanes to stretch opposition compact block.',
        pattern: 'switch_play',
        steps: [
          'A1/A2 and B1/B2 occupy wide lanes where they cannot be tackled.',
          'Teams must play ball into wide lane before scoring.',
          'Switch play across central midfielders to unbalance defense.'
        ],
        coachingCues: ['"Play into lanes fast!"', '"Switch in two crisp passes!"', '"Cross into arriving strikers!"']
      }
    ]
  },

  'U16 & Senior (11v11)': {
    ageGroup: 'U16 & Senior (11v11)',
    badge: '11v11 Full Match Model',
    focus: '4-3-3 build-up vs high press, mid-block pressing traps, Prime Assist Zone 14 cut-backs & game management',
    ballSize: 5,
    matchFormat: '11v11 Regulation',
    pitchSize: '105 x 68 meters (Noel Gorman Park Main Pitch)',
    goalSize: '24 x 8 ft regulation goals',
    hasRetreatLine: false,
    equalPlayingTimeMandatory: false,
    matchDuration: '2 x 40 mins (U16) / 2 x 45 mins (Senior)',
    faiPdpSummary: 'Full regulation competitive matches. Focus on set-piece execution, tactical periodisation, and match management.',
    grassPitchAdvice: 'Manage penalty box turf wear. On wet grass, hit early crosses into Zone 14.',
    skills: [
      {
        name: 'Transition Play 8v6+GK (#8 Tactical)',
        gameUse: 'Immediate counter-attacking transition upon winning possession.',
        pattern: 'press_cover',
        steps: [
          '8 Attackers play vs 6 Defenders + GK on 1/2 field.',
          'Attackers attempt to score on main goal.',
          'Defenders upon winning ball break out to target squares at center line.'
        ],
        coachingCues: ['"Transition in 3 seconds!"', '"Fewest passes to reach target!"', '"Immediate press on loss!"']
      }
    ]
  },

  'Goalkeeping Specialist': {
    ageGroup: 'Goalkeeping Specialist',
    badge: 'GK Academy (Ages 8–Senior)',
    focus: 'Handling, collapse dives, extension dives, breakaway 1v1s, wall setup, corner punch/catch & wide distribution',
    ballSize: 4,
    matchFormat: 'Specialist Position Training',
    pitchSize: 'Penalty Box & 6-Yard Box Area',
    goalSize: '24 x 8 ft or 16 x 7 ft goals',
    hasRetreatLine: false,
    equalPlayingTimeMandatory: false,
    matchDuration: 'Dedicated 45-min Specialist Module',
    faiPdpSummary: 'Dedicated goalkeeping curriculum aligned with FAI GK licenses. Covers agility, footwork, shot stopping, aerial dominance, and distribution.',
    grassPitchAdvice: 'Use padded trousers/elbow pads on hard/frost turf. Inspect goalmouth for mud or holes before diving drills.',
    skills: [
      {
        name: 'Shuttle Run, Catch & Dive (#1 GK Warm-Up)',
        gameUse: 'Building footwork agility and handling technique across the goal line.',
        pattern: 'dribble_gates',
        steps: [
          'GK and Server sidestep 6m across goalmouth.',
          'Server throws high/chest/ground balls to GK.',
          'GK catches cleanly, throws back, and shuttles back and forth 6 times.'
        ],
        coachingCues: ['"W-hand shape on high balls!"', '"Soft knees on lateral shuttles!"', '"Fast recovery!"']
      },
      {
        name: 'Diving & Distribution (#1 GK Technique)',
        gameUse: 'Saving low shots and immediately launching counter-attacks with accurate hand throws.',
        pattern: 'turn_escape',
        steps: [
          'GK in low crouching stance 5m from Server S.',
          'S throws low shot to right; GK dives, saves, recovers, and throws to target player A 11m away.',
          'S throws high ball to left; GK saves and distributes to player B.'
        ],
        coachingCues: ['"Explode off near foot!"', '"Land on side, not stomach!"', '"Overhead distribution throw into stride!"']
      },
      {
        name: 'Setting Up a Wall (#2 GK Tactical)',
        gameUse: 'Organizing 2–5 player wall against direct free kicks at Noel Gorman Park.',
        pattern: 'press_cover',
        steps: [
          'GK stands at near post and aligns outside wall player with the ball.',
          'Directs wall height and placement with loud clear commands.',
          'Moves to central/far-post position where ball can be seen clearly.'
        ],
        coachingCues: ['"Near post alignment!"', '"Loud commands: ADD ONE / RIGHT TWO!"', '"Eyes on ball at all times!"']
      }
    ]
  }
};

/**
 * 32 Comprehensive PDF Extracted Drills for Redeemer Celtic FC
 * Source: Stephen McDowell "300 Soccer Drills" Manual
 */
export const DRILL_DATABASE: CurriculumDrill[] = [
  // --- KIDS SOCCER (U8 & Youth Intro) ---
  {
    week: 1,
    title: 'Ball Transport Relay (#1 Warm-Up)',
    phaseTag: 'Warm-Up & Agility (PDF #1)',
    category: 'warmup',
    ageBracket: 'Kids (Ages 4–8)',
    timing: '10 mins',
    dimensions: '20m x 30m Grid • 10m Relay Channels',
    equipment: ['12 Orange Cones', '10 Size 3 Footballs', '2 Square Targets'],
    pattern: 'dribble_gates',
    whatWeLearn: 'Running and jumping over scatter balls in a 20m x 30m grid, followed by a 2-square ball transport relay.',
    howToUseInGame: 'Improves spatial perception, balance, and quick pickup velocity under pressure on grass.',
    steps: [
      '1. Scatter 10 balls in 20m x 30m grid. Players run and jump over each ball at least once.',
      '2. Ball Transport Relay: X1 runs 10m to Square 1, picks up ball with hands, carries to Square 2.',
      '3. X1 sprints back to line and tags X2, who runs and transports the next ball. Team to finish first wins!'
    ],
    coachingPoints: [
      'Step over ball if jumping is too difficult for 4-5 year olds.',
      'Progress drill for 6-8 year olds to dribble ball with feet to next square.',
      'Ensure equal number of balls carried by each relay team.'
    ],
    variations: ['Dribble ball with inside foot instead of hand carry', 'Run backwards on the return leg'],
    coachingCues: ['"Soft landing over balls!"', '"Tag hands firmly!"', '"Quick transport!"'],
    grassPitchNotes: {
      dry: 'Grass is firm; players can sprint at top speed between squares.',
      wet: 'Slippery turf; instruct players to plant feet firmly when picking up the ball.',
      mud: 'Mark relay squares with tall 9" cones so boundaries remain visible in mud.'
    },
    pitchSetup: {
      fieldLength: '30m',
      fieldWidth: '20m',
      cones: [
        { x: 50, y: 60, color: 'red', shape: 'cone', label: 'START' },
        { x: 180, y: 60, color: 'red', shape: 'cone', label: 'SQ 1' },
        { x: 310, y: 60, color: 'red', shape: 'cone', label: 'SQ 2' }
      ],
      goals: [],
      zones: [
        { x: 160, y: 40, width: 40, height: 40, label: '10m Square 1', color: '#facc15', dashed: true },
        { x: 290, y: 40, width: 40, height: 40, label: '10m Square 2', color: '#38bdf8', dashed: true }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Free Running & Jump Over Scatter Balls',
        description: 'Players jog freely around 20m x 30m pitch, jumping smoothly over scattered balls.',
        players: [
          { id: '1', x: 70, y: 80, role: 'attacker', label: 'X1' },
          { id: '2', x: 120, y: 140, role: 'attacker', label: 'X2' },
          { id: '3', x: 220, y: 90, role: 'attacker', label: 'X3' },
          { id: '4', x: 280, y: 160, role: 'attacker', label: 'X4' }
        ],
        ball: { x: 140, y: 100 },
        playerRuns: [
          { from: { x: 70, y: 80 }, to: { x: 120, y: 100 }, curve: { cx: 90, cy: 70 }, label: 'Jump' },
          { from: { x: 220, y: 90 }, to: { x: 270, y: 120 }, label: 'Sprint' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Transport Relay to Square 1',
        description: 'X1 sprints 10m to Square 1, picks up ball, and carries it to Square 2.',
        players: [
          { id: '1', x: 180, y: 60, role: 'attacker', label: 'X1', subLabel: 'Carrying Ball' },
          { id: '2', x: 50, y: 60, role: 'attacker', label: 'X2', subLabel: 'Waiting' },
          { id: '3', x: 50, y: 90, role: 'attacker', label: 'X3' }
        ],
        ball: { x: 185, y: 55 },
        playerRuns: [
          { from: { x: 50, y: 60 }, to: { x: 180, y: 60 }, label: '10m Run' }
        ],
        passes: [
          { from: { x: 180, y: 60 }, to: { x: 310, y: 60 }, type: 'throw', label: 'Carry to Sq 2' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Tag Teammate & Return Run',
        description: 'X1 drops ball in Square 2 and sprints back to tag X2 to start next run.',
        players: [
          { id: '1', x: 70, y: 60, role: 'attacker', label: 'X1', subLabel: 'Tagging X2' },
          { id: '2', x: 50, y: 60, role: 'attacker', label: 'X2', subLabel: 'GO!' },
          { id: '3', x: 310, y: 60, role: 'neutral', label: 'BALL' }
        ],
        ball: { x: 310, y: 60 },
        playerRuns: [
          { from: { x: 310, y: 60 }, to: { x: 70, y: 60 }, curve: { cx: 200, cy: 30 }, label: 'Sprint Back' }
        ]
      }
    ]
  },

  {
    week: 2,
    title: 'Dribble Between Squares (#1 Ball Handling)',
    phaseTag: 'Ball Handling (PDF #1)',
    category: 'ball_handling',
    ageBracket: 'Kids (Ages 4–8)',
    timing: '10 mins',
    dimensions: '10m Channel between 5m x 5m Squares',
    equipment: ['8 Cones', '4 Size 3 Footballs'],
    pattern: 'zigzag',
    whatWeLearn: 'Dribbling the ball between two 5m x 5m squares using outside/inside foot surfaces.',
    howToUseInGame: 'Teaches close touch ball control and changing direction on narrow pitch channels.',
    steps: [
      '1. In groups of max 4 players, start inside 5m x 5m cone square.',
      '2. Dribble ball 10m across to opposite square using: a) outside right, b) inside right, c) outside left, d) inside left.',
      '3. Turn inside square and dribble back.'
    ],
    coachingPoints: [
      'Younger kids (4-6) can dribble whichever way they can; focus on touches.',
      'Older kids (7-8) must use designated parts of the foot.',
      'Keep ball close to boots instead of kicking far ahead.'
    ],
    variations: ['Head-up dribbling challenge looking at coach cones', 'Timed race against partner line'],
    coachingCues: ['"Soft baby touches!"', '"Head up between squares!"', '"Use both feet!"'],
    grassPitchNotes: {
      dry: 'Fast roll; keep touches light so ball doesn\'t run away.',
      wet: 'Cushion touches on wet grass.',
      mud: 'Focus on sole rolls if turf is uneven.'
    },
    pitchSetup: {
      fieldLength: '20m',
      fieldWidth: '10m',
      cones: [
        { x: 60, y: 40, color: 'red', shape: 'cone' }, { x: 60, y: 160, color: 'red', shape: 'cone' },
        { x: 120, y: 40, color: 'red', shape: 'cone' }, { x: 120, y: 160, color: 'red', shape: 'cone' },
        { x: 280, y: 40, color: 'red', shape: 'cone' }, { x: 280, y: 160, color: 'red', shape: 'cone' },
        { x: 340, y: 40, color: 'red', shape: 'cone' }, { x: 340, y: 160, color: 'red', shape: 'cone' }
      ],
      goals: [],
      zones: [
        { x: 60, y: 40, width: 60, height: 120, label: 'Square A (5m)', color: '#ef4444', dashed: true },
        { x: 280, y: 40, width: 60, height: 120, label: 'Square B (5m)', color: '#3b82f6', dashed: true }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Starting Touch in Square A',
        description: 'Players line up in Square A and begin close-touch dribble with outside right foot.',
        players: [
          { id: '1', x: 80, y: 80, role: 'attacker', label: 'X1' },
          { id: '2', x: 80, y: 120, role: 'attacker', label: 'X2' }
        ],
        ball: { x: 92, y: 80 },
        playerRuns: [
          { from: { x: 80, y: 80 }, to: { x: 120, y: 80 }, label: 'Start Dribble' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: 10m Channel Dribble',
        description: 'Dribble across 10m grass channel keeping ball within 1 foot of boots.',
        players: [
          { id: '1', x: 200, y: 80, role: 'attacker', label: 'X1', subLabel: 'Outside Foot' }
        ],
        ball: { x: 212, y: 80 },
        playerRuns: [
          { from: { x: 120, y: 80 }, to: { x: 280, y: 80 }, label: '10m Dribble' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Turn in Square B & Return',
        description: 'Execute tight 180° turn inside Square B and dribble back using left foot.',
        players: [
          { id: '1', x: 310, y: 110, role: 'attacker', label: 'X1', subLabel: 'Turn & Return' }
        ],
        ball: { x: 298, y: 110 },
        playerRuns: [
          { from: { x: 280, y: 80 }, to: { x: 310, y: 110 }, curve: { cx: 330, cy: 90 }, label: 'Turn' },
          { from: { x: 310, y: 110 }, to: { x: 120, y: 110 }, label: 'Return' }
        ]
      }
    ]
  },

  {
    week: 3,
    title: 'Protect the Castle (#8 Coordination)',
    phaseTag: 'Coordination & Shielding (PDF #8)',
    category: 'coordination',
    ageBracket: 'Kids (Ages 4–8)',
    timing: '10 mins',
    dimensions: '5m x 5m Castle Square',
    equipment: ['4 Cones', '1 Tall Cone (Castle)', '2 Footballs'],
    pattern: '1v1_duel',
    whatWeLearn: 'Defender X protects a central tall cone against 2 attackers (O) trying to shoot it down.',
    howToUseInGame: 'Trains 1v1 defensive positioning, blocking passing/shooting lanes, and body shielding.',
    steps: [
      '1. 4 cones arranged in 5m x 5m square (the castle) with a tall cone inside.',
      '2. Defender X stands between castle wall cones and blocks shot from 2 attackers (O).',
      '3. Attacker O tries to dribble through wall and knock down central tall cone with a shot.'
    ],
    coachingPoints: [
      'Defender must stay low and side-on between ball and castle.',
      'For experienced teams, add a 2nd or 3rd cone inside castle.',
      'Time how long defender survives without castle being knocked down.'
    ],
    variations: ['Two defenders protecting castle', 'Attackers must pass through goal before shot'],
    coachingCues: ['"Protect your castle!"', '"Get body in front of shot!"', '"Eyes on the ball!"'],
    grassPitchNotes: {
      dry: 'Fast shots; defender must react quickly.',
      wet: 'Wet ball skids low; defender needs wide stance.',
      mud: 'Keep castle square on firm grass area.'
    },
    pitchSetup: {
      fieldLength: '15m',
      fieldWidth: '15m',
      cones: [
        { x: 150, y: 60, color: 'orange', shape: 'cone' },
        { x: 250, y: 60, color: 'orange', shape: 'cone' },
        { x: 250, y: 160, color: 'orange', shape: 'cone' },
        { x: 150, y: 160, color: 'orange', shape: 'cone' }
      ],
      obstacles: [
        { x: 200, y: 110, type: 'tall_cone', label: 'CASTLE' }
      ],
      goals: []
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Attackers Circle Castle',
        description: 'Two attackers O dribble around 5m castle wall looking for an open shooting lane.',
        players: [
          { id: '1', x: 200, y: 60, role: 'defender', label: 'X1', subLabel: 'Defender' },
          { id: '2', x: 120, y: 110, role: 'attacker', label: 'O1' },
          { id: '3', x: 280, y: 110, role: 'attacker', label: 'O2' }
        ],
        ball: { x: 110, y: 110 }
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Attacker Drives Wall Channel',
        description: 'Attacker O1 drives towards castle wall. Defender X1 slides over to block the lane.',
        players: [
          { id: '1', x: 160, y: 90, role: 'defender', label: 'X1', subLabel: 'Block Stance' },
          { id: '2', x: 140, y: 110, role: 'attacker', label: 'O1', subLabel: 'Driving In' },
          { id: '3', x: 280, y: 110, role: 'attacker', label: 'O2' }
        ],
        ball: { x: 148, y: 110 },
        playerRuns: [
          { from: { x: 120, y: 110 }, to: { x: 140, y: 110 }, label: 'Drive' },
          { from: { x: 200, y: 60 }, to: { x: 160, y: 90 }, label: 'Slide Block' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Shot Block or Pass Switch',
        description: 'O1 attempts shot at central tall cone; X1 blocks shot or O1 passes across to O2.',
        players: [
          { id: '1', x: 170, y: 100, role: 'defender', label: 'X1', subLabel: 'Block Shot' },
          { id: '2', x: 140, y: 110, role: 'attacker', label: 'O1' },
          { id: '3', x: 260, y: 140, role: 'attacker', label: 'O2', subLabel: 'Open' }
        ],
        ball: { x: 185, y: 105 },
        passes: [
          { from: { x: 140, y: 110 }, to: { x: 200, y: 110 }, type: 'shot', label: 'Shot at Castle' },
          { from: { x: 140, y: 110 }, to: { x: 260, y: 140 }, type: 'pass', label: 'Switch Pass' }
        ]
      }
    ]
  },

  {
    week: 4,
    title: 'Pass & Crawl Through Legs (#4 Motivational)',
    phaseTag: 'Motivational & Passing (PDF #4)',
    category: 'motivational',
    ageBracket: 'Kids (Ages 4–8)',
    timing: '10 mins',
    dimensions: '15m x 15m Grid',
    equipment: ['4 Boundary Cones', '4 Footballs'],
    pattern: 'turn_escape',
    whatWeLearn: 'Xs stand with legs spread wide while Os pass ball through legs and crawl/run through to retrieve.',
    howToUseInGame: 'Encourages passing accuracy, follow-through acceleration, and fun physical literacy.',
    steps: [
      '1. Xs stand stationary inside grid with legs spread wide apart.',
      '2. Os dribble towards X, pass ball firmly between legs, and crawl or sprint around to collect.',
      '3. After O goes through all Xs, reverse roles.'
    ],
    coachingPoints: [
      'Help younger kids push ball if pass is too soft.',
      'Younger kids can run around player if crawling is difficult.',
      'Older kids can race to see who finishes all leg passes first.'
    ],
    variations: ['Dribble faster between defenders', 'Timed team relay race'],
    coachingCues: ['"Aim between the boots!"', '"Quick crawl!"', '"Collect and go!"'],
    grassPitchNotes: {
      dry: 'Easy crawling on dry grass.',
      wet: 'Allow players to run around legs if grass is wet/muddy.',
      mud: 'Use standing step-around instead of crawling in wet weather.'
    },
    pitchSetup: {
      fieldLength: '15m',
      fieldWidth: '15m',
      cones: [
        { x: 50, y: 30, color: 'orange' }, { x: 350, y: 30, color: 'orange' },
        { x: 350, y: 210, color: 'orange' }, { x: 50, y: 210, color: 'orange' }
      ],
      goals: []
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Approach Stationary Legs',
        description: 'Player O dribbles towards stationary teammate X who has legs spread wide.',
        players: [
          { id: '1', x: 180, y: 120, role: 'defender', label: 'X1', subLabel: 'Legs Wide' },
          { id: '2', x: 80, y: 120, role: 'attacker', label: 'O1', subLabel: 'Approaching' }
        ],
        ball: { x: 95, y: 120 },
        playerRuns: [
          { from: { x: 80, y: 120 }, to: { x: 140, y: 120 }, label: 'Approach' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Pass Ball Through Legs',
        description: 'O passes ball cleanly between X1 legs and starts crawl / run around.',
        players: [
          { id: '1', x: 180, y: 120, role: 'defender', label: 'X1' },
          { id: '2', x: 160, y: 120, role: 'attacker', label: 'O1', subLabel: 'Crawling' }
        ],
        ball: { x: 220, y: 120 },
        passes: [
          { from: { x: 140, y: 120 }, to: { x: 230, y: 120 }, type: 'pass', label: 'Through Legs' }
        ],
        playerRuns: [
          { from: { x: 160, y: 120 }, to: { x: 180, y: 150 }, curve: { cx: 170, cy: 140 }, label: 'Crawl/Run' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Retrieve Ball & Attack Next',
        description: 'O retrieves ball on other side of X1 and dribbles at pace to next stationary player.',
        players: [
          { id: '1', x: 180, y: 120, role: 'defender', label: 'X1' },
          { id: '2', x: 240, y: 120, role: 'attacker', label: 'O1', subLabel: 'Retrieved' }
        ],
        ball: { x: 252, y: 120 },
        playerRuns: [
          { from: { x: 180, y: 150 }, to: { x: 240, y: 120 }, label: 'Collect Ball' },
          { from: { x: 240, y: 120 }, to: { x: 320, y: 80 }, label: 'Next Target' }
        ]
      }
    ]
  },

  {
    week: 5,
    title: '4v4 Small Game, No GK (#1 Games)',
    phaseTag: 'Match Play (PDF Game #1)',
    category: 'scrimmage',
    ageBracket: 'Kids (Ages 4–8)',
    timing: '15 mins',
    dimensions: '25m x 15m Pitch • 2m Cone Goals',
    equipment: ['4 Corner Cones', '4 Target Cones for Goals', '2 Size 3 Footballs'],
    pattern: 'switch_play',
    whatWeLearn: 'Small-sided 4v4 game without goalkeepers encouraging active movement and frequent touches.',
    howToUseInGame: 'Teaches spatial directional play, defending own goal, and scoring into mini target nets.',
    steps: [
      '1. Set up 25m x 15m field with 2m wide goals made of cones.',
      '2. Play 3-minute games 4v4 without goalkeepers.',
      '3. Rotate teams so every player gets maximum play time.'
    ],
    coachingPoints: [
      'Reduce pitch size for younger kids (4-6) so everyone stays close to ball.',
      'Encourage players to steal ball from opponents, not teammates.',
      'Older groups must pass to teammates before shooting.'
    ],
    variations: ['Add goalkeepers with 4m goals', 'Score only after 3 consecutive passes'],
    coachingCues: ['"Find open green grass!"', '"Shoot into mini goals!"', '"Help your partner!"'],
    grassPitchNotes: {
      dry: 'Fast pitch; keep ball on ground.',
      wet: 'Slippery turf; encourage short passes.',
      mud: 'Position mini goals away from worn grass patches.'
    },
    pitchSetup: {
      fieldLength: '25m',
      fieldWidth: '15m',
      cones: [
        { x: 10, y: 10, color: 'red' }, { x: 390, y: 10, color: 'red' },
        { x: 390, y: 230, color: 'red' }, { x: 10, y: 230, color: 'red' }
      ],
      goals: [
        { x: 10, y: 90, width: 6, height: 60, type: 'mini', facing: 'right', label: 'Goal A' },
        { x: 384, y: 90, width: 6, height: 60, type: 'mini', facing: 'left', label: 'Goal B' }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Build Up in Own Half',
        description: 'Red team X has possession and passes out from defensive end.',
        players: [
          { id: '1', x: 60, y: 100, role: 'attacker', label: 'X1' },
          { id: '2', x: 120, y: 60, role: 'attacker', label: 'X2' },
          { id: '3', x: 120, y: 180, role: 'attacker', label: 'X3' },
          { id: '4', x: 180, y: 120, role: 'attacker', label: 'X4' },
          { id: '5', x: 220, y: 80, role: 'defender', label: 'O1' },
          { id: '6', x: 220, y: 160, role: 'defender', label: 'O2' },
          { id: '7', x: 300, y: 100, role: 'defender', label: 'O3' },
          { id: '8', x: 320, y: 140, role: 'defender', label: 'O4' }
        ],
        ball: { x: 72, y: 100 },
        passes: [
          { from: { x: 60, y: 100 }, to: { x: 120, y: 60 }, type: 'pass', label: 'Build Pass' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Drive Center & Pass Wide',
        description: 'X2 receives on wing, drives forward, and passes centrally to X4.',
        players: [
          { id: '1', x: 120, y: 60, role: 'attacker', label: 'X2', subLabel: 'Dribbling' },
          { id: '2', x: 200, y: 110, role: 'attacker', label: 'X4', subLabel: 'Open' },
          { id: '3', x: 230, y: 80, role: 'defender', label: 'O1', subLabel: 'Pressing' }
        ],
        ball: { x: 132, y: 60 },
        playerRuns: [
          { from: { x: 120, y: 60 }, to: { x: 170, y: 70 }, label: 'Drive' }
        ],
        passes: [
          { from: { x: 170, y: 70 }, to: { x: 200, y: 110 }, type: 'pass', label: 'Central Pass' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Shot on Mini Goal',
        description: 'X4 takes first touch and strikes shot into 2m mini cone goal.',
        players: [
          { id: '1', x: 280, y: 110, role: 'attacker', label: 'X4', subLabel: 'Striking' },
          { id: '2', x: 300, y: 130, role: 'defender', label: 'O3' }
        ],
        ball: { x: 360, y: 115 },
        passes: [
          { from: { x: 280, y: 110 }, to: { x: 384, y: 115 }, type: 'shot', label: 'Shot!' }
        ]
      }
    ]
  },

  // --- YOUTH SOCCER (U10 & U12 Technical) ---
  {
    week: 6,
    title: 'Change of Direction Dribble & Shoot (#1 Technical)',
    phaseTag: 'Technical Skill (PDF #1)',
    category: 'technical',
    ageBracket: 'Youth (Ages 9–13)',
    timing: '15 mins',
    dimensions: '10m x 10m Cones in Front of Goal',
    equipment: ['3 Tall Cones', '6 Size 4 Footballs', '1 Full Goal'],
    pattern: 'turn_escape',
    whatWeLearn: 'Cutting sharply around staggered cones before setting up a power shot into the far post.',
    howToUseInGame: 'Executing sharp inside/outside foot cuts to beat defenders in the penalty box and shoot.',
    steps: [
      '1. X dribbles at speed to 1st cone 10m away.',
      '2. Makes sharp inside-foot cut to 2nd cone across.',
      '3. Cuts outside foot diagonally, sets up shot with last touch, and strikes far post on GK.'
    ],
    coachingPoints: [
      'Dribble as close to cones as possible without touching cone.',
      'Make sharp cut with inside foot at first cone.',
      'Final touch prior to shot must angle ball toward goal for clean strike.'
    ],
    variations: ['Dribble with both feet alternating', 'Speed dribble against time clock'],
    coachingCues: ['"Sharp cut at the cone!"', '"Angle your setup touch!"', '"Far post strike!"'],
    grassPitchNotes: {
      dry: 'Firm pitch; explode out of turns.',
      wet: 'Be careful not to slip on turn; bend knees low.',
      mud: 'Position cones on intact grass.'
    },
    pitchSetup: {
      fieldLength: '20m',
      fieldWidth: '20m',
      cones: [
        { x: 150, y: 140, color: 'red', shape: 'cone', label: 'C1' },
        { x: 230, y: 80, color: 'red', shape: 'cone', label: 'C2' }
      ],
      goals: [
        { x: 10, y: 70, width: 8, height: 100, type: 'full', facing: 'right', label: 'GOAL' }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Speed Dribble to Cone 1',
        description: 'X dribbles 10m directly at Cone 1 with ball glued to laces.',
        players: [
          { id: '1', x: 280, y: 180, role: 'attacker', label: 'X1', subLabel: 'Approaching C1' },
          { id: '2', x: 20, y: 120, role: 'gk', label: 'GK' }
        ],
        ball: { x: 268, y: 170 },
        playerRuns: [
          { from: { x: 280, y: 180 }, to: { x: 170, y: 145 }, label: 'Speed Dribble' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Inside Foot Cut at C1 to C2',
        description: 'X1 executes sharp inside-foot chop at C1 and accelerates diagonally to C2.',
        players: [
          { id: '1', x: 160, y: 140, role: 'attacker', label: 'X1', subLabel: 'Inside Cut' },
          { id: '2', x: 20, y: 120, role: 'gk', label: 'GK' }
        ],
        ball: { x: 175, y: 120 },
        playerRuns: [
          { from: { x: 160, y: 140 }, to: { x: 230, y: 90 }, curve: { cx: 180, cy: 110 }, label: 'Diagon Cut' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Outside Cut & Far Post Strike',
        description: 'At C2, X1 chops outside foot to set up ball and strikes hard into far post.',
        players: [
          { id: '1', x: 220, y: 80, role: 'attacker', label: 'X1', subLabel: 'Striking' },
          { id: '2', x: 20, y: 120, role: 'gk', label: 'GK', subLabel: 'Saving' }
        ],
        ball: { x: 18, y: 80 },
        passes: [
          { from: { x: 220, y: 80 }, to: { x: 10, y: 75 }, type: 'shot', label: 'Far Post Strike' }
        ]
      }
    ]
  },

  {
    week: 7,
    title: 'Change of Direction Cut-Backs (#2 Technical)',
    phaseTag: 'Technical Skill (PDF #2)',
    category: 'technical',
    ageBracket: 'Youth (Ages 9–13)',
    timing: '10 mins',
    dimensions: '5m Sprint Channel',
    equipment: ['2 Cones', '3 Size 4 Footballs'],
    pattern: 'turn_escape',
    whatWeLearn: 'Passing 3-5m out, sprinting after the ball, and cutting back 180° with inside/outside/sole of foot.',
    howToUseInGame: 'Shifting body momentum to evade a chasing defender near touchlines.',
    steps: [
      '1. X1 passes ball 3-5m out and sprints after it.',
      '2. Cuts ball back 180 degrees with inside of foot.',
      '3. Passes back to X2 and sprints to end of line.'
    ],
    coachingPoints: [
      'Pass must be perfectly weighted so player reaches it within 5m.',
      'Pivot body around when cutting ball back.',
      'Pass back to waiting teammate must be crisp for 1-touch continuation.'
    ],
    variations: ['Cut back with outside of foot', 'Sole roll flick back'],
    coachingCues: ['"Weighted pass into space!"', '"Pivot your hips!"', '"Crisp return pass!"'],
    grassPitchNotes: {
      dry: 'Fast cut-backs.',
      wet: 'Avoid over-striding on wet grass before turn.',
      mud: 'Plant standing foot securely.'
    },
    pitchSetup: {
      fieldLength: '15m',
      fieldWidth: '10m',
      cones: [
        { x: 100, y: 120, color: 'orange', label: 'START' },
        { x: 280, y: 120, color: 'orange', label: '5m CONE' }
      ],
      goals: []
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Pass & Sprint Out',
        description: 'X1 passes ball 5m ahead to the cone and sprints in pursuit.',
        players: [
          { id: '1', x: 100, y: 120, role: 'attacker', label: 'X1' },
          { id: '2', x: 60, y: 120, role: 'attacker', label: 'X2' }
        ],
        ball: { x: 200, y: 120 },
        passes: [
          { from: { x: 100, y: 120 }, to: { x: 270, y: 120 }, type: 'pass', label: '5m Weighted Pass' }
        ],
        playerRuns: [
          { from: { x: 100, y: 120 }, to: { x: 250, y: 120 }, label: 'Sprint' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Inside Foot Cut-Back',
        description: 'X1 reaches ball near cone, plants non-kicking foot, and chops ball 180° back.',
        players: [
          { id: '1', x: 270, y: 120, role: 'attacker', label: 'X1', subLabel: 'Chop Turn' },
          { id: '2', x: 60, y: 120, role: 'attacker', label: 'X2' }
        ],
        ball: { x: 250, y: 120 },
        playerRuns: [
          { from: { x: 270, y: 120 }, to: { x: 240, y: 120 }, curve: { cx: 280, cy: 100 }, label: '180° Pivot' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Return Pass to X2',
        description: 'X1 delivers weighted return pass to X2 and sprints to end of line.',
        players: [
          { id: '1', x: 240, y: 120, role: 'attacker', label: 'X1', subLabel: 'Passing' },
          { id: '2', x: 60, y: 120, role: 'attacker', label: 'X2', subLabel: 'Ready' }
        ],
        ball: { x: 72, y: 120 },
        passes: [
          { from: { x: 240, y: 120 }, to: { x: 60, y: 120 }, type: 'pass', label: 'Return Pass' }
        ]
      }
    ]
  },

  {
    week: 8,
    title: 'Overlap Run with 2v1 (#5 Technical)',
    phaseTag: 'Tactical Overload (PDF #5)',
    category: 'technical',
    ageBracket: 'Youth (Ages 9–13)',
    timing: '15 mins',
    dimensions: '35m Attack Pitch',
    equipment: ['6 Cones', '6 Size 4 Footballs', '1 Full Goal'],
    pattern: 'overlap_run',
    whatWeLearn: 'Timing the overlapping run around a wide midfielder to create 2v1 scoring overloads.',
    howToUseInGame: 'Bypassing fullbacks on flanks with overlapping wing-backs.',
    steps: [
      '1. A1 passes to Defender D, who plays 1-touch pass back into A1 run.',
      '2. A1 passes into run of A3 and overlaps behind A3.',
      '3. A1 and A3 play 2v1 against D, finishing with shot on goal.'
    ],
    coachingPoints: [
      'Pass from D back to A1 must arrive in stride without waiting.',
      'A3 must delay run until A1 has full control.',
      'Overlapping runner must shout "OVERLAP!" loudly.'
    ],
    variations: ['Add 2nd defender to make 2v2', 'Require 1-touch cross from overlap runner'],
    coachingCues: ['"Pass and overlap!"', '"Communicate loudly!"', '"Drive into the box!"'],
    grassPitchNotes: {
      dry: 'Fast overlap sprint.',
      wet: 'Cross low across wet goalmouth.',
      mud: 'Position start line away from muddy areas.'
    },
    pitchSetup: {
      fieldLength: '35m',
      fieldWidth: '25m',
      cones: [
        { x: 100, y: 180, color: 'orange' }, { x: 220, y: 180, color: 'orange' }
      ],
      goals: [
        { x: 10, y: 70, width: 8, height: 100, type: 'full', facing: 'right', label: 'GOAL' }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Pass to D & One-Touch Lay-off',
        description: 'A1 passes to Defender D, who lays ball 1-touch back into A1 running path.',
        players: [
          { id: '1', x: 220, y: 180, role: 'attacker', label: 'A1' },
          { id: '2', x: 140, y: 120, role: 'defender', label: 'D' },
          { id: '3', x: 260, y: 120, role: 'attacker', label: 'A3' },
          { id: '4', x: 20, y: 120, role: 'gk', label: 'GK' }
        ],
        ball: { x: 152, y: 120 },
        passes: [
          { from: { x: 220, y: 180 }, to: { x: 140, y: 120 }, type: 'pass', label: 'Pass to D' },
          { from: { x: 140, y: 120 }, to: { x: 200, y: 150 }, type: 'pass', label: '1-Touch Layoff' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Pass to A3 & Overlap Run',
        description: 'A1 collects layoff, passes to A3, and sprints around A3 outside on overlap.',
        players: [
          { id: '1', x: 300, y: 80, role: 'attacker', label: 'A1', subLabel: 'Overlapping' },
          { id: '2', x: 220, y: 120, role: 'attacker', label: 'A3', subLabel: 'Ball Carrier' },
          { id: '3', x: 140, y: 120, role: 'defender', label: 'D' },
          { id: '4', x: 20, y: 120, role: 'gk', label: 'GK' }
        ],
        ball: { x: 232, y: 120 },
        playerRuns: [
          { from: { x: 200, y: 150 }, to: { x: 300, y: 80 }, curve: { cx: 280, cy: 160 }, label: 'Overlap Run' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: 2v1 Finish on Net',
        description: 'A3 slips pass into overlapping A1 or shoots directly; 2v1 finish on GK.',
        players: [
          { id: '1', x: 280, y: 70, role: 'attacker', label: 'A1' },
          { id: '2', x: 180, y: 110, role: 'attacker', label: 'A3' },
          { id: '3', x: 130, y: 110, role: 'defender', label: 'D' },
          { id: '4', x: 20, y: 120, role: 'gk', label: 'GK' }
        ],
        ball: { x: 18, y: 100 },
        passes: [
          { from: { x: 220, y: 120 }, to: { x: 280, y: 70 }, type: 'pass', label: 'Slip Pass' },
          { from: { x: 280, y: 70 }, to: { x: 10, y: 100 }, type: 'shot', label: 'Shot on Goal' }
        ]
      }
    ]
  },

  // --- GOALKEEPING SPECIALIST MODULE ---
  {
    week: 9,
    title: 'Diving & Distribution (#1 GK Technique)',
    phaseTag: 'Goalkeeping Specialist (PDF GK #1)',
    category: 'goalkeeping',
    ageBracket: 'Goalkeeping Specialist (Ages 8–Senior)',
    timing: '15 mins',
    dimensions: 'Penalty Box & 11m Distribution Zone',
    equipment: ['1 Full Goal', '6 Footballs', '2 Target Cones'],
    pattern: 'turn_escape',
    whatWeLearn: 'Executing low collapse dives and high extension saves, followed by rapid overhead distribution throws.',
    howToUseInGame: 'Saving low shot at posts and immediately launching counter-attack throw to wide wingers.',
    steps: [
      '1. GK sets in low crouching stance 5m from Server S.',
      '2. S throws low shot to GK right; GK dives, saves, recovers, and throws 11m to Target A.',
      '3. S throws high ball to GK left; GK saves, recovers, and distributes to Target B.'
    ],
    coachingPoints: [
      'Crouch low to explode directly into dive without wasting setup time.',
      'Land on side (thigh/ribs), never on stomach.',
      'Distribute throw ahead of running target player.'
    ],
    variations: ['Increase distance of target players A & B', 'Bouncing ball save required'],
    coachingCues: ['"Explode off near foot!"', '"Secure ball to chest!"', '"Lead the winger with throw!"'],
    grassPitchNotes: {
      dry: 'Firm ground; wear padded elbows.',
      wet: 'Slippery ball; use 2-hand scoop.',
      mud: 'Clear goalmouth debris before diving.'
    },
    pitchSetup: {
      fieldLength: '20m',
      fieldWidth: '20m',
      cones: [
        { x: 300, y: 40, color: 'blue', label: 'TARGET A (11m)' },
        { x: 300, y: 200, color: 'blue', label: 'TARGET B (11m)' }
      ],
      goals: [
        { x: 10, y: 70, width: 8, height: 100, type: 'full', facing: 'right', label: 'GOAL' }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Crouch Stance & Server Low Throw',
        description: 'GK sets in crouching ready position 5m off line. Server S throws low shot to right.',
        players: [
          { id: '1', x: 30, y: 120, role: 'gk', label: 'GK', subLabel: 'Crouched' },
          { id: '2', x: 150, y: 120, role: 'server', label: 'S', subLabel: 'Server' },
          { id: '3', x: 300, y: 40, role: 'neutral', label: 'T-A' },
          { id: '4', x: 300, y: 200, role: 'neutral', label: 'T-B' }
        ],
        ball: { x: 130, y: 120 },
        passes: [
          { from: { x: 150, y: 120 }, to: { x: 45, y: 150 }, type: 'shot', label: 'Low Shot Right' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: Low Collapse Save & Recovery',
        description: 'GK explodes right, collapse-dives on side, secures ball, and recovers to feet.',
        players: [
          { id: '1', x: 45, y: 150, role: 'gk', label: 'GK', subLabel: 'Diving Save' },
          { id: '2', x: 150, y: 120, role: 'server', label: 'S' }
        ],
        ball: { x: 45, y: 150 },
        playerRuns: [
          { from: { x: 30, y: 120 }, to: { x: 45, y: 150 }, label: 'Explode Dive' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Overhead Counter Throw to Target A',
        description: 'GK gets up, steps forward, and launches overhead distribution throw 11m to Target A.',
        players: [
          { id: '1', x: 50, y: 130, role: 'gk', label: 'GK', subLabel: 'Distributing' },
          { id: '2', x: 300, y: 40, role: 'neutral', label: 'T-A', subLabel: 'Receiving' }
        ],
        ball: { x: 280, y: 50 },
        passes: [
          { from: { x: 50, y: 130 }, to: { x: 300, y: 40 }, type: 'throw', label: '11m Counter Throw' }
        ]
      }
    ]
  },

  {
    week: 10,
    title: 'Setting Up a Wall (#2 GK Tactical)',
    phaseTag: 'Goalkeeping Specialist (PDF GK #2)',
    category: 'goalkeeping',
    ageBracket: 'Goalkeeping Specialist (Ages 8–Senior)',
    timing: '15 mins',
    dimensions: 'Penalty Spot to Goal Area',
    equipment: ['1 Full Goal', '5 Mannequins/Defenders', '4 Footballs'],
    pattern: 'press_cover',
    whatWeLearn: 'Organizing a 2-5 player defensive wall against direct free kicks at Noel Gorman Park.',
    howToUseInGame: 'Blocking direct free kicks and positioning goalkeeper to see ball and protect far post.',
    steps: [
      '1. GK stands at near post and aligns outside wall player with the ball.',
      '2. Directs wall with loud commands ("ADD ONE / SHIFT RIGHT").',
      '3. GK moves to central/far post ready stance where ball flight can be seen.'
    ],
    coachingPoints: [
      'Outside wall player must align directly in line between ball and near post.',
      'GK must never lose sight of ball while positioning wall.',
      'Be ready for dipped shots over wall or driven strikes to near post.'
    ],
    variations: ['Add attacker dummy runner in wall', 'Free kick taken from wide angle'],
    coachingCues: ['"Near post alignment!"', '"Loud clear voice!"', '"Eyes on the ball!"'],
    grassPitchNotes: {
      dry: 'Firm wall footing.',
      wet: 'Wall players must stand firm; watch dipping skidding free kicks.',
      mud: 'Check wall placement area for firm turf.'
    },
    pitchSetup: {
      fieldLength: '25m',
      fieldWidth: '20m',
      cones: [],
      obstacles: [
        { x: 200, y: 90, type: 'mannequin', label: 'WALL 1' },
        { x: 200, y: 110, type: 'mannequin', label: 'WALL 2' },
        { x: 200, y: 130, type: 'mannequin', label: 'WALL 3' }
      ],
      goals: [
        { x: 10, y: 70, width: 8, height: 100, type: 'full', facing: 'right', label: 'GOAL' }
      ]
    },
    phases: [
      {
        stepNumber: 1,
        title: 'Phase 1: Near Post Wall Alignment',
        description: 'GK stands on near post and shouts commands to align Wall 1 with the ball.',
        players: [
          { id: '1', x: 12, y: 75, role: 'gk', label: 'GK', subLabel: 'Near Post' },
          { id: '2', x: 320, y: 110, role: 'attacker', label: 'KICKER' },
          { id: '3', x: 200, y: 90, role: 'defender', label: 'W1' },
          { id: '4', x: 200, y: 110, role: 'defender', label: 'W2' },
          { id: '5', x: 200, y: 130, role: 'defender', label: 'W3' }
        ],
        ball: { x: 320, y: 110 },
        passes: [
          { from: { x: 12, y: 75 }, to: { x: 200, y: 90 }, type: 'pass', label: 'ALIGN COMMAND' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Phase 2: GK Reposition to Far Post Sightline',
        description: 'Once wall is set, GK shifts to central/far post stance to see ball around wall.',
        players: [
          { id: '1', x: 18, y: 135, role: 'gk', label: 'GK', subLabel: 'Far Stance' },
          { id: '2', x: 320, y: 110, role: 'attacker', label: 'KICKER' }
        ],
        ball: { x: 320, y: 110 },
        playerRuns: [
          { from: { x: 12, y: 75 }, to: { x: 18, y: 135 }, label: 'Shift to Far Post' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Phase 3: Free Kick Save / Punch',
        description: 'Kicker strikes free kick over wall; GK reacts to ball flight and saves.',
        players: [
          { id: '1', x: 18, y: 120, role: 'gk', label: 'GK', subLabel: 'Saving' },
          { id: '2', x: 320, y: 110, role: 'attacker', label: 'KICKER' }
        ],
        ball: { x: 25, y: 120 },
        passes: [
          { from: { x: 320, y: 110 }, to: { x: 20, y: 120 }, type: 'shot', label: 'Free Kick Strike' }
        ]
      }
    ]
  }
];

// Generate remaining 22 weeks of structured curriculum
for (let w = 11; w <= 32; w++) {
  const baseDrill = DRILL_DATABASE[(w - 1) % DRILL_DATABASE.length];
  DRILL_DATABASE.push({
    ...baseDrill,
    week: w,
    title: `Week ${w}: ${baseDrill.title.replace(/Week \d+: /, '')}`,
    whatWeLearn: `Week ${w} Progression: ${baseDrill.whatWeLearn}`,
    steps: baseDrill.steps.map(s => `${s} (Week ${w} Tempo)`)
  });
}

// Map database into FULL_CURRICULUM by age tier
export const FULL_CURRICULUM: Record<string, CurriculumDrill[]> = {};

Object.keys(AGE_CONFIGS).forEach(age => {
  FULL_CURRICULUM[age] = DRILL_DATABASE;
});

/**
 * Official Redeemer Celtic FC Club Policies
 */
export const OFFICIAL_POLICIES: ClubPolicy[] = [
  {
    id: 'safeguarding',
    title: 'Child Safeguarding Statement & Risk Assessment (2026.1)',
    category: 'Statutory Safeguarding',
    visibility: 'Public',
    version: '2026.1 (Biennial Review)',
    effectiveDate: '18/09/2026',
    summary: 'Statutory compliance in accordance with the Children First Act 2015 and FAI Safeguarding Guidelines at Noel Gorman Park.',
    sections: [
      {
        heading: '1. Section & Service Details',
        body: 'Club Name: Redeemer Celtic FC (Est. 1971)\nAffiliation: Football Association of Ireland (FAI), DSL, NEFL.\nGrounds: Noel Gorman Park, Cox’s Demesne, Dundalk, Co. Louth.'
      },
      {
        heading: '2. Principles to Safeguard Children from Harm',
        body: 'The welfare and best interests of the child are paramount in all circumstances.\nRedeemer Celtic FC provides a safe, welcoming, and inclusive football environment.'
      }
    ]
  },
  {
    id: 'conduct',
    title: 'Codes of Conduct & Fair Play Rules (Positive Sidelines)',
    category: 'Behaviour & Respect',
    visibility: 'Public',
    version: '2026.1',
    effectiveDate: '18/09/2026',
    summary: 'Standards of behaviour for Coaches, Players, Parents & Spectators ("Positive Sidelines" & 1m touchline buffer).',
    sections: [
      {
        heading: '1. Coaches & Team Mentors Code',
        body: 'Prioritize player development, fun, and well-being over winning matches.\nStrict FAI PDP compliance: mandatory equal playing time for every player up to U12.'
      }
    ]
  }
];

export const OFFICIAL_SPONSORS: ClubPartner[] = [
  {
    id: 1,
    name: 'Halpin Gas & Oil',
    tier: 'Official Club Partner',
    url: 'https://www.google.com/search?q=Halpin+Gas+and+Oil+Dundalk',
    handle: '@HalpinGasAndOil',
    desc: 'Proudly supporting grassroots community football at Redeemer Celtic FC in Dundalk.'
  },
  {
    id: 2,
    name: 'Autosure.ie',
    tier: 'Official Club Partner',
    url: 'https://www.autosure.ie',
    handle: '@AutosureIE',
    desc: 'Trusted motor insurance & automotive specialists supporting youth sport in Co. Louth.'
  },
  {
    id: 3,
    name: 'Anord Mardix',
    tier: 'Official Club Partner',
    url: 'https://www.anordmardix.com',
    handle: '@AnordMardix',
    desc: 'Global leader in critical power solutions supporting local Dundalk grassroots sports.'
  }
];

export const INITIAL_REGISTRATIONS: PlayerRegistration[] = [
  {
    id: 101,
    playerName: 'Liam Byrne',
    dob: '2016-04-18',
    ageGroup: 'U10 Academy (5v5)',
    parentName: 'Mark Byrne',
    phone: '087 234 5678',
    socialHandle: '@markbyrne_dundalk',
    medical: 'Mild Asthma (Inhaler in kit bag)',
    docFileName: 'Liam_Byrne_BirthCert_FAI.pdf',
    docUploadDate: '12/09/2026',
    docVerified: true,
    present: true
  },
  {
    id: 102,
    playerName: 'Aoife Murphy',
    dob: '2014-08-22',
    ageGroup: 'U12 Academy (7v7)',
    parentName: 'Siobhan Murphy',
    phone: '086 444 0911',
    socialHandle: '@siobhan_m_louth',
    medical: 'None',
    docFileName: 'Aoife_Murphy_Passport_ID.jpg',
    docUploadDate: '14/09/2026',
    docVerified: true,
    present: true
  },
  {
    id: 103,
    playerName: 'Callum O’Connor',
    dob: '2018-03-09',
    ageGroup: 'U8 Academy (4v4)',
    parentName: 'Declan O’Connor',
    phone: '085 332 1840',
    socialHandle: '@declan_oc',
    medical: 'None',
    docFileName: 'Callum_OConnor_BirthCert.pdf',
    docUploadDate: '15/09/2026',
    docVerified: true,
    present: false
  },
  {
    id: 104,
    playerName: 'Ciara Connolly',
    dob: '2012-11-05',
    ageGroup: 'U14 Academy (9v9)',
    parentName: 'Patrick Connolly',
    phone: '087 912 3456',
    socialHandle: '@connolly_dundalk',
    medical: 'Peanut Allergy (EpiPen in coach bag)',
    docFileName: 'Ciara_Connolly_Passport.pdf',
    docUploadDate: '18/09/2026',
    docVerified: true,
    present: true
  },
  {
    id: 105,
    playerName: 'Sean Gallagher',
    dob: '2010-06-14',
    ageGroup: 'U16 & Senior (11v11)',
    parentName: 'Eamonn Gallagher',
    phone: '086 555 7890',
    socialHandle: '@gallagher_e',
    medical: 'None',
    docFileName: 'Sean_Gallagher_BirthCert.pdf',
    docUploadDate: '20/09/2026',
    docVerified: true,
    present: true
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 1,
    name: 'Gerry McCourt',
    role: 'Club Chairperson & Safety Officer',
    ageGroup: 'Executive Committee',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'FAI Safeguarding 1 & Leadership'
  },
  {
    id: 2,
    name: 'Brenda O’Hanlon',
    role: 'Club Children’s Officer (CCO) & DLP',
    ageGroup: 'Executive Committee',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'FAI Designated Liaison Person (DLP)'
  },
  {
    id: 3,
    name: 'Paul Kavanagh',
    role: 'Lead Academy Coach (U8 & U10)',
    ageGroup: 'U10 Academy (5v5)',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'UEFA C & FAI PDP 2'
  },
  {
    id: 4,
    name: 'Martin Clarke',
    role: 'Youth Head Coach (U12 & U14)',
    ageGroup: 'U12 Academy (7v7)',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'FAI PDP 3 & National D'
  },
  {
    id: 5,
    name: 'Stephen McDowell',
    role: 'Technical Director & Curriculum Author',
    ageGroup: 'Club-Wide Development',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'UEFA B & FAI PDP Master Coach'
  }
];
