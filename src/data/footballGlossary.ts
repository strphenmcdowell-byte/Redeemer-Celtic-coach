export interface GlossaryTerm {
  term: string;
  category: 'Tactical' | 'Technical' | 'Rules & Formations' | 'Coaching Method';
  definition: string;
  kidFriendlyExplanation: string;
  coachingCue: string;
}

export const FOOTBALL_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Retreat Line',
    category: 'Rules & Formations',
    definition: 'A marked line (usually at the halfway or 1/3 mark) where the opposing team must drop back during a goal kick in small-sided games to allow the team in possession to play out cleanly.',
    kidFriendlyExplanation: 'Like a game of tag where the other team has to run back to their own half to give you space to take your kick and pass out from the back!',
    coachingCue: 'Coach defenders to split wide and offer passing angles while opponents retreat.'
  },
  {
    term: 'Build-Up Play',
    category: 'Tactical',
    definition: 'Passing the ball systematically from the goalkeeper and defenders through the midfield to create an attacking opportunity, rather than kicking it long blindly.',
    kidFriendlyExplanation: 'Building a lego tower step-by-step instead of knocking it all down. We pass short, keep possession, and move up together like a team!',
    coachingCue: 'Encourage calm passing under pressure; praise keeping possession over clearing long.'
  },
  {
    term: 'Overload',
    category: 'Tactical',
    definition: 'Creating a numerical advantage in a specific area of the pitch (e.g., 2v1 or 3v2) by moving players over to outnumber the opponents.',
    kidFriendlyExplanation: 'Bringing two friends to help you in a playground game against one person so you can easily pass around them!',
    coachingCue: 'Recognise when we have more players on one side and quickly switch or combine.'
  },
  {
    term: 'Third Man Run',
    category: 'Tactical',
    definition: 'A movement where Player A passes to Player B, drawing defenders towards B, while Player C makes a run into space behind the defenders to receive the next pass.',
    kidFriendlyExplanation: 'A magic trick! Player 1 looks at Player 2, the defender gets tricked looking at Player 2, and Player 3 sneaks behind them to score!',
    coachingCue: 'Encourage off-the-ball movement: "Pass, move, and look for the next option."'
  },
  {
    term: 'Pressing Trigger',
    category: 'Tactical',
    definition: 'A specific signal or moment (such as a heavy touch by the opponent or passing towards the sideline) that tells your team to attack the ball and win it back immediately.',
    kidFriendlyExplanation: 'Like a game of musical statues where the second the music stops, everyone pounces on the ball!',
    coachingCue: 'Teach kids to press together when the opponent takes a loose touch or looks down.'
  },
  {
    term: 'Half-Spaces',
    category: 'Tactical',
    definition: 'The tactical channels on the pitch between the central corridor and the wide wings, very valuable for creating scoring chances.',
    kidFriendlyExplanation: 'The secret hallways on the pitch between the middle and the wings where defenders get confused about who should guard you.',
    coachingCue: 'Find players in pockets of space between opponent midfielders and defenders.'
  },
  {
    term: 'Switching Play',
    category: 'Tactical',
    definition: 'Passing the ball quickly from one side of the pitch (where defenders are crowded) to the open space on the other side.',
    kidFriendlyExplanation: 'Throwing a surprise party on the quiet side of the pitch while everyone is looking at the other side!',
    coachingCue: 'Look up and scan: "Can we switch it to the open player on the far wing?"'
  },
  {
    term: 'Rondo',
    category: 'Coaching Method',
    definition: 'A small-sided practice where one or more players chase the ball while the rest keep possession in a circle or grid using 1-2 touches.',
    kidFriendlyExplanation: 'Monkey in the middle! Quick passing with your friends before the defender can tag the ball.',
    coachingCue: 'Emphasize body shape, open shoulders, and quick one-touch passing.'
  },
  {
    term: 'Rest Defence',
    category: 'Tactical',
    definition: 'The defensive players remaining positioned behind the ball while your team is attacking to prevent sudden counter-attacks.',
    kidFriendlyExplanation: 'Leaving a goalie or defender watching the back door while everyone else goes up to score so nobody sneaks past us!',
    coachingCue: 'Ensure at least one or two players stay alert behind the play during attacks.'
  },
  {
    term: 'Flying Changes',
    category: 'Technical',
    definition: 'A high-energy transition drill or tag game used in grassroots warm-ups to improve agility, speed, and changing direction.',
    kidFriendlyExplanation: 'A lightning-fast game of tag and changing direction like superhero superheroes flying across the pitch!',
    coachingCue: 'Keep the intensity high and celebrate quick turns and agile footwork.'
  },
  {
    term: 'Equal Playing Time',
    category: 'Rules & Formations',
    definition: 'An FAI Club Mark and PDP rule ensuring every player on the squad gets at least 50% playing time in every match regardless of ability.',
    kidFriendlyExplanation: 'Everyone gets an equal turn on the pitch to play, smile, and have fun—no sitting on the bench the whole match!',
    coachingCue: 'Plan rolling substitutions in advance so every child feels valued.'
  },
  {
    term: 'DFV (Development First)',
    category: 'Coaching Method',
    definition: 'Prioritizing skill mastery, decision-making, and enjoyment over winning trophies in youth academy football.',
    kidFriendlyExplanation: 'Learning new skills and having fun with your mates is way more important than the scoreboard!',
    coachingCue: 'Praise effort, courage on the ball, and trying new skills over the final score.'
  }
];
