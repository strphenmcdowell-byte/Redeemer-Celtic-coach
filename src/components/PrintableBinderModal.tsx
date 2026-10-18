import React, { useState } from 'react';
import { X, Printer, Download, Copy, FileText } from 'lucide-react';
import { ClubCrest } from './ClubCrest.tsx';
import { AgeHandbookConfig } from '../types.ts';

interface PrintableBinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageConfig?: AgeHandbookConfig;
  customLogoUrl?: string | null;
  onNotify?: (msg: string) => void;
}

export type TemplateType = 'pitch_inspection' | 'eap' | 'concussion' | 'session_plan' | 'full_handbook';

export const PrintableBinderModal: React.FC<PrintableBinderModalProps> = ({
  isOpen,
  onClose,
  ageConfig,
  customLogoUrl,
  onNotify
}) => {
  const [template, setTemplate] = useState<TemplateType>('pitch_inspection');

  if (!isOpen) return null;

  const currentAge = ageConfig ? ageConfig.ageGroup : 'U10 Academy (5v5)';

  const notify = (msg: string) => {
    if (onNotify) onNotify(msg);
  };

  const getMarkdownContent = (type: TemplateType): string => {
    switch (type) {
      case 'pitch_inspection':
        return `# REDEEMER CELTIC FC — GRASS PITCH & GOALPOST SAFETY CHECKLIST
**Facility:** Noel Gorman Park, Cox's Demesne, Dundalk
**Pitch:** Main Grass Pitch 1 / Academy Pitch 2 | **Inspection Time:** 30 Mins Before Kick-Off

| Check Area | Inspection Criteria | Status | Action Taken / Notes |
|------------|---------------------|--------|----------------------|
| **1. Turf Condition** | Pitch firm, grass cut, free of waterlogging or deep puddles | [ ] Pass [ ] Fail | ____________________ |
| **2. Surface Hazards** | Free from broken glass, stones, sharp litter, dog foul | [ ] Pass [ ] Fail | Swept & cleared |
| **3. Goalpost Stability**| Portable goals anchored firmly with sandbags/pegs (IS EN 748/16579)| [ ] Pass [ ] Fail | Push-pull test verified |
| **4. Goal Nets & Pegs**| Nets secured to posts, no loose hanging metal hooks | [ ] Pass [ ] Fail | Checked corner pegs |
| **5. Line Markings** | Pitch touchlines, penalty box & retreat lines clearly visible | [ ] Pass [ ] Fail | Cones positioned |
| **6. Spectator Buffer**| 1-meter spectator barrier line demarcated from grass edge | [ ] Pass [ ] Fail | Respect buffer set |
| **7. Weather Check** | Frost/ice absent; ground passes thumb-pressure test | [ ] Pass [ ] Fail | Surface safe to play |

**Inspector Decision:** [ ] PITCH APPROVED FOR PLAY  [ ] MOVE GRID TO REPLACEMENT GRASS  [ ] MATCH POSTPONED
**Lead Pitch Officer:** ______________________________ **Signature:** ______________________________`;

      case 'eap':
        return `# REDEEMER CELTIC FC — EMERGENCY ACTION PLAN (EAP)
**Location:** Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth
**Emergency Services Dispatch:** Call 999 or 112 | **Eircode:** A91 XD26 (Clubhouse Gate)

| Role / Asset | Contact Person / Detail | Contact Number | Location on Site |
|--------------|-------------------------|----------------|------------------|
| **Ambulance Access** | Double security gates at Noel Gorman Park | Gate Key: Clubhouse Box | Access directly to grass pitch |
| **Automated Defibrillator (AED)** | External Heated Green Cabinet | PIN: 1971 | Clubhouse Wall beside Main Entrance |
| **First Aid Officer** | On-Duty Matchday Lead Coach | See Team Sheet | Red Grab-Bag at Dugout |
| **Club Children's Officer (CCO)**| Brenda O'Hanlon | 087 123 4567 | Noel Gorman Park |
| **Designated Liaison Person** | Gerry McCourt (Club Chair) | 086 987 6543 | Noel Gorman Park |
| **Tusla Child & Family Agency** | Louth Local Area Office | 042 935 3800 | Dundalk Office |
| **Dundalk Garda Station** | The Crescent, Dundalk | 042 938 8400 | 1.8 km from Ground |
| **Nearest Emergency Dept (A&E)**| Our Lady of Lourdes Hospital | 041 983 7601 | Drogheda (25 mins via M1) |
| **Minor Injury Unit** | Louth County Hospital | 042 938 5433 | Dublin Road, Dundalk (9am-8pm) |

### 5-Step Crisis Protocol:
1. **Assess & Protect:** Stop play immediately. Do not move injured player if spinal/head injury suspected.
2. **Call 999/112:** State: "Medical emergency at Redeemer Celtic FC, Noel Gorman Park, Dundalk."
3. **Dispatch Gate Marshall:** Send coach/volunteer to entrance gates with high-vis vest to guide ambulance.
4. **Deploy AED if Cardiac Event:** Send runner for AED cabinet (PIN: 1971). Follow voice prompts immediately.
5. **Notify Family & CCO:** Contact parents from COMET emergency sheet and complete FAI Incident Report form.`;

      case 'concussion':
        return `# REDEEMER CELTIC FC — CONCUSSION RECOGNITION & SAFETY CARD
**Policy:** Statutory "IF IN DOUBT, SIT THEM OUT" — Mandatory Immediate Removal
**Scope:** Applicable to all training, matches, and blitzes at Noel Gorman Park.

| Category | Immediate Red Flags (CALL 999 / 112 IMMEDIATELY) |
|----------|--------------------------------------------------|
| **RED FLAGS** | • Neck pain or spine tenderness<br>• Repeated vomiting<br>• Deteriorating conscious state or seizure<br>• Double vision or unequal pupils<br>• Severe or increasing headache<br>• Weakness or tingling in arms/legs |

### On-Pitch Concussion Symptom Checklist
- [ ] Dazed, stunned, or confused look
- [ ] Balance problems, dizziness, or unsteadiness on grass
- [ ] Slurred speech or slow to answer questions
- [ ] Sensitivity to light or sideline noise
- [ ] Loss of memory of recent plays or score
**IF ANY OF THE ABOVE ARE PRESENT: PLAYER MUST BE REMOVED IMMEDIATELY.**
*They CANNOT return to play on the same day under any circumstances.*

### Graduated 6-Stage Return-to-Play Protocol (Youth Minimum: 14 Days)
1. **Stage 1:** Minimum 48-72 hours complete physical and cognitive rest.
2. **Stage 2:** Light aerobic activity (walking, stationary cycling, no resistance).
3. **Stage 3:** Football-specific running and light ball drills (strictly non-contact).
4. **Stage 4:** Non-contact training drills (passing triangles, shooting, tactical walking).
5. **Stage 5:** Full contact training following formal GP/Medical Doctor sign-off.
6. **Stage 6:** Return to competitive match play.`;

      case 'session_plan':
        return `# REDEEMER CELTIC FC — GRASSROOTS SESSION PLANNER
**Age Group:** ${currentAge} | **Duration:** 60 Mins | **Pitch:** Grass Pitch 1
**Pitch Condition:** [ ] Firm / Dry  [ ] Greasy / Wet  [ ] Heavy Mud

| Phase | Time | Practice Description | Grass Pitch Adaptations & Coaching Cues |
|-------|------|----------------------|-----------------------------------------|
| **1. Arrival Activity** | 5-10m | 2v2 Mini-Gates / Ball Mastery | Soft sole touches, high repetitions on grass |
| **2. Technical Drill** | 15m | Directional First Touch & 1-2 Pass | Open hips, receive on back foot, firm instep pass |
| **3. Skill Progression**| 15m | 2v1 Attacking Overload vs Passive Def | Commit defender before passing; 45° support angle |
| **4. Small-Sided Game** | 20m | Directional SSG with Conditioned Bonus| Double goals for executing this week's combination |
| **5. Cool Down & Review**| 5m | Debrief in circle, collect cones | Ask players: "What was our trigger to switch play?" |

**Equipment Required:** 12 size-${ageConfig ? ageConfig.ballSize : 3} balls, 16 tall orange cones, 8 flat yellow markers, 2 mini-goals, 8 bibs.`;

      case 'full_handbook':
      default:
        return `# REDEEMER CELTIC FC — OFFICIAL COACH HANDBOOK
## Age Tier: ${currentAge}
**Accreditation Alignment:** Entry FAI Club Mark & FAI One Star Player Development Centre
**Home Ground:** Noel Gorman Park, Dundalk, Co. Louth

### 1. Age-Specific FAI PDP Match Specifications
- **Match Format:** ${ageConfig?.matchFormat || '5v5'}
- **Official Ball Size:** Size ${ageConfig?.ballSize || 3}
- **Grass Pitch Dimensions:** ${ageConfig?.pitchSize || '40x25 yards'}
- **Goal Sizes:** ${ageConfig?.goalSize || '12x6 ft'}
- **Retreat Line Active:** ${ageConfig?.hasRetreatLine ? 'YES (Opposition retreats to halfway/retreat line on goal restarts)' : 'NO (Regulation restarts)'}
- **Equal Playing Time Mandate:** ${ageConfig?.equalPlayingTimeMandatory ? 'STRICTLY MANDATORY (100% of rostered players must play >= 50% match minutes)' : 'Recommended fair game time'}
- **Match Duration:** ${ageConfig?.matchDuration || '2 x 25 mins'}

### 2. Grass Pitch Coaching Principles
- **Wet Weather Turf:** Dundalk rain makes grass slippery. Instruct players to cushion the ball with an open instep. Use 9" tall cones for visibility.
- **Muddy / Heavy Ground:** Move drills away from goalmouths to virgin turf. Shorten passing distances to 8 yards.
- **Equal Opportunity:** Prioritize development, ball mastery, and fun over winning match trophies.`;
    }
  };

  const handleCopyMarkdown = () => {
    const md = getMarkdownContent(template);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(md);
      notify('Copied clean Markdown template to clipboard!');
    }
  };

  const handleDownloadHtml = () => {
    const md = getMarkdownContent(template);
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${template.toUpperCase()} - Redeemer Celtic FC</title>
<style>
  @media print {
    body { padding: 0; background: #fff; font-size: 11pt; }
    .no-print { display: none; }
    .sheet { border: none !important; box-shadow: none !important; padding: 0 !important; }
  }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 24px; background: #f1f5f9; color: #0f172a; line-height: 1.5; }
  .sheet { max-width: 820px; margin: 0 auto; background: #ffffff; border: 3px solid #1d4ed8; border-top: 10px solid #dc2626; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #dc2626; padding-bottom: 16px; margin-bottom: 20px; }
  .club-name { font-size: 22px; font-weight: 900; color: #dc2626; margin: 0; letter-spacing: -0.5px; }
  .club-sub { font-size: 11px; font-weight: 700; color: #1d4ed8; margin-top: 4px; }
  .badge { background: #dc2626; color: #fff; padding: 6px 12px; border-radius: 6px; font-weight: 900; font-size: 11px; text-transform: uppercase; }
  h1 { font-size: 20px; color: #1e3a8a; margin: 16px 0 8px; }
  h2 { font-size: 16px; color: #dc2626; margin: 16px 0 6px; }
  h3 { font-size: 14px; color: #0f172a; margin: 14px 0 6px; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
  th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
  th { background: #1e293b; color: #ffffff; font-weight: 800; font-size: 11px; text-transform: uppercase; }
  tr:nth-child(even) { background: #f8fafc; }
  ul { padding-left: 20px; margin: 8px 0; }
  li { margin-bottom: 4px; font-size: 13px; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 2px solid #1d4ed8; font-size: 11px; font-weight: bold; color: #475569; text-align: center; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div>
        <div class="club-name">REDEEMER CELTIC FC (EST. 1971)</div>
        <div class="club-sub">Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth • redeemerceltic@gmail.com</div>
      </div>
      <div class="badge">OFFICIAL COACHING BINDER</div>
    </div>
    <pre style="white-space: pre-wrap; font-family: inherit; font-size: 13px; line-height: 1.6;">${md}</pre>
    <div class="footer">
      Redeemer Celtic FC • FAI Club Mark Accredited Coaching Resource • Dundalk, Co. Louth
    </div>
  </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template}_Redeemer_Celtic_Binder.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify(`Downloaded ${template} printable template in Club Colours!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border-4 border-red-600 shadow-2xl">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white p-4 sm:p-5 flex items-center justify-between gap-4 border-b-4 border-black shrink-0">
          <div className="flex items-center gap-3">
            <ClubCrest className="w-10 h-12" customLogoUrl={customLogoUrl} />
            <div>
              <span className="text-[10px] font-black uppercase text-yellow-300">
                Redeemer Celtic FC • Coaching Binder & Operational Forms
              </span>
              <h2 className="text-lg sm:text-xl font-black">
                Printable Form Templates (PDF / Paper Binders)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-black rounded-full text-white"
            title="Close Binder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector Navigation Tabs */}
        <div className="bg-slate-100 p-3 border-b flex flex-wrap gap-1.5 shrink-0">
          {[
            { id: 'pitch_inspection' as TemplateType, label: '1. Grass Pitch & Goal Safety Checklist' },
            { id: 'eap' as TemplateType, label: '2. Noel Gorman Park EAP (Ambulance & AED)' },
            { id: 'concussion' as TemplateType, label: '3. Concussion "Sit Them Out" Protocol' },
            { id: 'session_plan' as TemplateType, label: '4. Grassroots Session Planner' },
            { id: 'full_handbook' as TemplateType, label: '5. Full Age Handbook Summary' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                template === t.id
                  ? 'bg-blue-800 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Action Controls Bar */}
        <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="text-xs font-bold text-blue-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-600" />
            <span>Ready for export to physical coaching binders or official pitch-side folders</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-black rounded-lg flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Markdown
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Printable HTML
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-black rounded-lg flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* Scrollable Printable Sheet View */}
        <div className="p-6 overflow-y-auto bg-slate-200 flex-grow">
          <div className="sheet max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-red-600 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <ClubCrest className="w-12 h-14" customLogoUrl={customLogoUrl} />
                <div>
                  <div className="text-xl font-black text-red-600 leading-tight">REDEEMER CELTIC FC</div>
                  <div className="text-xs font-bold text-blue-800">
                    Est. 1971 • Noel Gorman Park, Cox's Demesne, Dundalk • FAI Club Mark
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded">
                  Official Coach Resource
                </span>
                <div className="text-[10px] font-bold text-slate-500 mt-1">Season 2026/2027</div>
              </div>
            </div>

            {/* Template Specific Content */}
            {template === 'pitch_inspection' && (
              <div className="space-y-4 text-xs font-semibold text-slate-800">
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                  <span className="font-black text-sm text-red-800 block">
                    Noel Gorman Park Grass Pitch & Goalpost Inspection
                  </span>
                  <span>Conducted 30 minutes prior to training sessions or DSL/NEFL fixtures.</span>
                </div>

                <div className="overflow-x-auto border rounded-xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white font-black text-[11px] uppercase">
                      <tr>
                        <th className="p-2.5">Check Item</th>
                        <th className="p-2.5">Safety Criterion</th>
                        <th className="p-2.5 text-center">Status</th>
                        <th className="p-2.5">Grounds Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-bold">
                      {[
                        { item: '1. Turf Surface', crit: 'Even grass, no severe waterlogged puddles or ruts', status: 'PASS' },
                        { item: '2. Debris & Glass', crit: 'Pitch swept clear of stones, litter, and dog foul', status: 'PASS' },
                        { item: '3. Goalpost Stability', crit: 'Portable goals anchored firmly per IS EN 748/16579 (Push-pull test)', status: 'PASS' },
                        { item: '4. Nets & Pegs', crit: 'Nets secured tightly; no protruding metal ground hooks', status: 'PASS' },
                        { item: '5. Line Markings', crit: 'Touchlines and retreat lines clearly marked or coned', status: 'PASS' },
                        { item: '6. Spectator Line', crit: '1-meter spectator barrier buffer in place for parents', status: 'PASS' },
                        { item: '7. Weather / Frost', crit: 'Ground passes thumb-pressure test; non-frozen turf', status: 'PASS' }
                      ].map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2 font-black text-blue-900">{c.item}</td>
                          <td className="p-2 text-slate-700">{c.crit}</td>
                          <td className="p-2 text-center text-green-700 font-black">[✓] {c.status}</td>
                          <td className="p-2 text-slate-500 font-normal">________________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
                  <div>
                    <span className="font-black text-slate-900 block">Inspection Decision:</span>
                    <span className="text-slate-600">[✓] PITCH DECLARED SAFE FOR PLAY   [ ] MOVE SQUAD TO SECONDARY GRASS</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-700">Inspector: ____________________</span>
                  </div>
                </div>
              </div>
            )}

            {template === 'eap' && (
              <div className="space-y-4 text-xs font-semibold text-slate-800">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-800 flex justify-between items-center">
                  <div>
                    <span className="font-black text-sm text-blue-900 block">
                      Emergency Action Plan (EAP) — Noel Gorman Park
                    </span>
                    <span>Cox's Demesne, Dundalk | Eircode: A91 XD26</span>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-red-600 text-white font-black text-xs rounded">CALL 999 / 112</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="font-black text-red-600 uppercase block mb-1">Automated External Defibrillator (AED)</span>
                    <p className="text-slate-700">
                      Located in heated external green cabinet on the main clubhouse wall beside entrance door.
                      <br /><strong>Cabinet PIN Code: 1971</strong>
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="font-black text-blue-800 uppercase block mb-1">Ambulance Vehicle Access Gate</span>
                    <p className="text-slate-700">
                      Double metal gates at main entrance. Gate key located in clubhouse master key box.
                      Send designated runner in high-vis vest to guide ambulance crew onto grass pitch.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto border rounded-xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white font-black text-[11px] uppercase">
                      <tr>
                        <th className="p-2">Emergency Contact</th>
                        <th className="p-2">Role / Hospital</th>
                        <th className="p-2">Telephone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-bold">
                      <tr>
                        <td className="p-2 font-black text-blue-900">Dundalk Garda Station</td>
                        <td className="p-2">The Crescent, Dundalk</td>
                        <td className="p-2 text-red-600">042 938 8400</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">Tusla Child & Family Agency</td>
                        <td className="p-2">Louth Local Office</td>
                        <td className="p-2 text-red-600">042 935 3800</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">Louth County Hospital (Minor Injury Unit)</td>
                        <td className="p-2">Dublin Road, Dundalk (Open 9am–8pm)</td>
                        <td className="p-2 text-red-600">042 938 5433</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">Our Lady of Lourdes Hospital (A&E)</td>
                        <td className="p-2">Drogheda (24-Hour Emergency Dept)</td>
                        <td className="p-2 text-red-600">041 983 7601</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {template === 'concussion' && (
              <div className="space-y-4 text-xs font-semibold text-slate-800">
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                  <span className="font-black text-sm text-red-800 block">
                    Concussion Assessment & "IF IN DOUBT, SIT THEM OUT" Protocol
                  </span>
                  <span>Mandatory FAI Player Welfare Standard — Immediate Pitch Removal Required</span>
                </div>

                <div className="p-3 bg-red-100 rounded-lg border-2 border-red-300">
                  <span className="font-black text-red-800 uppercase block mb-1">
                    🚨 RED FLAGS (Call 999 / 112 Immediately):
                  </span>
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                    <li>Neck pain or tenderness along spine</li>
                    <li>Repeated vomiting or severe deteriorating headache</li>
                    <li>Seizure, convulsion, or loss of consciousness</li>
                    <li>Double vision, unequal pupils, or slurred speech</li>
                    <li>Weakness, tingling, or burning in arms or legs</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="font-black text-blue-900 uppercase block mb-1">
                    Graduated 6-Stage Return-to-Play Summary (Youth Minimum 14 Days):
                  </span>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                    <li><strong>Stage 1:</strong> Relative physical and cognitive rest (minimum 48 hours symptom-free).</li>
                    <li><strong>Stage 2:</strong> Light aerobic exercise (walking/light stationary cycling).</li>
                    <li><strong>Stage 3:</strong> Football-specific non-contact drills (dribbling & passing).</li>
                    <li><strong>Stage 4:</strong> Non-contact team training drills.</li>
                    <li><strong>Stage 5:</strong> Full contact training following formal GP medical clearance.</li>
                    <li><strong>Stage 6:</strong> Return to competitive match play.</li>
                  </ol>
                </div>
              </div>
            )}

            {template === 'session_plan' && (
              <div className="space-y-4 text-xs font-semibold text-slate-800">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-800">
                  <span className="font-black text-sm text-blue-900 block">
                    Grassroots Weekly Session Planner — {currentAge}
                  </span>
                  <span>Format: 60-Minute Structure on Grass Pitch with Weather Adjustments</span>
                </div>

                <div className="overflow-x-auto border rounded-xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white font-black text-[11px] uppercase">
                      <tr>
                        <th className="p-2">Phase</th>
                        <th className="p-2">Time</th>
                        <th className="p-2">Practice Focus</th>
                        <th className="p-2">Grass Pitch Advice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-bold">
                      <tr>
                        <td className="p-2 font-black text-blue-900">1. Arrival Activity</td>
                        <td className="p-2">5-10m</td>
                        <td className="p-2">2v2 Cone Gates & Fun Ball Touches</td>
                        <td className="p-2 text-slate-600">Soft touches on turf; get players active immediately</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">2. Technical Practice</td>
                        <td className="p-2">15m</td>
                        <td className="p-2">Directional First Touch & 1-2 Combination</td>
                        <td className="p-2 text-slate-600">Receive on back foot; firm passes into stride</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">3. Skill Progression</td>
                        <td className="p-2">15m</td>
                        <td className="p-2">2v1 Overload with Passive-to-Active Defender</td>
                        <td className="p-2 text-slate-600">Commit defender before pass; 45° angle support</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">4. Small-Sided Game</td>
                        <td className="p-2">20m</td>
                        <td className="p-2">Directional Game (Double Goal Condition)</td>
                        <td className="p-2 text-slate-600">Executing week's combination awards 2 pts</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-black text-blue-900">5. Debrief & Cool Down</td>
                        <td className="p-2">5m</td>
                        <td className="p-2">Circle Q&A with players + High Fives</td>
                        <td className="p-2 text-slate-600">Reinforce positive effort and equal participation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {template === 'full_handbook' && (
              <div className="space-y-4 text-xs font-semibold text-slate-800">
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                  <span className="font-black text-sm text-red-800 block">
                    Official Coach Handbook Summary — {currentAge}
                  </span>
                  <span>Accreditation: FAI Entry Club Mark & One Star Player Development Centre</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="font-black text-blue-900 block mb-1">Match & Ball Specifications:</span>
                    <ul className="space-y-0.5 text-slate-700">
                      <li>• Format: <strong>{ageConfig?.matchFormat}</strong></li>
                      <li>• Ball Size: <strong>Size {ageConfig?.ballSize}</strong></li>
                      <li>• Pitch Dimensions: <strong>{ageConfig?.pitchSize}</strong></li>
                      <li>• Goal Size: <strong>{ageConfig?.goalSize}</strong></li>
                      <li>• Retreat Line: <strong>{ageConfig?.hasRetreatLine ? 'Active' : 'No'}</strong></li>
                    </ul>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="font-black text-red-600 block mb-1">FAI PDP Compliance Mandate:</span>
                    <p className="text-slate-700 leading-relaxed">
                      {ageConfig?.equalPlayingTimeMandatory
                        ? 'Mandatory equal playing time strictly recommended for every child on the match card. No win-at-all-costs coaching.'
                        : 'Youth competitive development with fair game time to ensure retention and sportsmanship.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-black text-blue-900 block mb-1">Grass Pitch Operational Setup:</span>
                  <p className="text-slate-700">{ageConfig?.grassPitchAdvice}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t flex flex-wrap gap-2 justify-between items-center shrink-0">
          <span className="text-xs font-bold text-slate-600">
            Noel Gorman Park, Dundalk • redeemerceltic@gmail.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-black uppercase rounded-xl"
          >
            Close Binder
          </button>
        </div>
      </div>
    </div>
  );
};
