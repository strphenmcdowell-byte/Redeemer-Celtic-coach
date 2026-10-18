# Implementation Plan - Football Terminology & Sayings Explainer

## User Requirement
Provide an easy way for volunteer grassroots coaches to understand and explain football sayings and terminology (such as "Retreat Line", "Build-up Play", "Overload", "Third Man Run", "Pressing Trigger", etc.) so they can explain them clearly to kids and parents.
- Accessible via interactive tooltips inside the 32-week curriculum viewer.
- Includes simple definitions, tactical context, and kid-friendly analogies/coaching tips.
- Also includes a searchable "Coach's Football Dictionary" tab for quick lookup.

## Proposed Changes

### 1. New Glossary Data & Component (`src/data/footballGlossary.ts` & `src/components/FootballGlossaryModal.ts`)
- Create a comprehensive dictionary of common FAI & grassroots football terminology (Retreat Line, Build-up Play, Overload, Third Man Run, Pressing Trigger, Half-Spaces, Rest Defence, Switching Play, Goal Kick Build, etc.).
- Each entry includes:
  - Term Name
  - Category (Tactical, Technical, Laws of the Game, Grassroots Coaching)
  - Simple Definition for Coaches
  - Kid-Friendly Explanation / Analogy (how to explain it to children)
  - Coaching Tip / Key Cue for training sessions.

### 2. Update Curriculum Viewer (`src/components/CurriculumViewer.tsx` or main curriculum component)
- Automatically highlight or make football terms clickable/hoverable in the 32-week curriculum text.
- Clicking any term opens a quick explanation popup with the coach definition and kid-friendly analogy.
- Add a "Football Sayings Dictionary" button at the top of the curriculum viewer so coaches can browse all terms instantly.

### 3. Integration into Main Navigation (`src/App.tsx`)
- Ensure smooth access to the Football Dictionary from the main navigation or header.

## Verification Plan
- **Automated Build & Lint**: Run `compile_applet` and `lint_applet` to ensure zero compilation or TypeScript errors.
- **Manual Verification**: Verify that clicking curriculum text terms opens the dictionary popup, and search works across terms.
