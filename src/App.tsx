import React, { useState } from 'react';
import {
  Shield, BookOpen, FileText, CheckCircle,
  Printer, Copy, Share2, ChevronLeft, ChevronRight,
  X, Menu
} from 'lucide-react';
import { PitchConditionType } from './types.ts';
import { AGE_CONFIGS, FULL_CURRICULUM } from './data/clubData.ts';
import { ClubCrest } from './components/ClubCrest.tsx';
import { TacticsBoard } from './components/TacticsBoard.tsx';
import { PrintableBinderModal } from './components/PrintableBinderModal.tsx';

export default function App() {
  // Active Navigation Mode: 'curriculum' | 'pitch_check' | 'eap' | 'concussion'
  const [activeTab, setActiveTab] = useState<string>('curriculum');
  
  // Squad & Session State
  const [selectedAge, setSelectedAge] = useState<string>('U10 Academy (5v5)');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [pitchCondition, setPitchCondition] = useState<PitchConditionType>('firm_dry');

  // Pitch Safety Checklist state
  const [pitchChecks, setPitchChecks] = useState<Record<string, boolean>>({
    turf: true,
    glass: true,
    goalpost: true,
    nets: true,
    lines: true,
    spectator: true,
    weather: true
  });
  const [inspectorName, setInspectorName] = useState('');

  // UI Modals & Notifications
  const [binderOpen, setBinderOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [notice, setNotice] = useState<string>('');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Custom Logo Persistence
  const [customLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('redeemer_custom_logo') || null;
    } catch {
      return null;
    }
  });

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  const ageConfig = AGE_CONFIGS[selectedAge] || AGE_CONFIGS['U10 Academy (5v5)'];
  const curriculum = FULL_CURRICULUM[selectedAge] || [];
  const currentDrill = curriculum[selectedWeek - 1] || curriculum[0];

  const handleCopyAppUrl = () => {
    const url = window.location.href.split('?')[0];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      notify('Copied Standalone Coach Portal link to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {notice && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 bg-red-600 text-white px-4 py-3 rounded-xl shadow-2xl border-2 border-white font-black text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Top Banner: Standalone Coach Portal Announcement */}
      <div className="bg-slate-950 text-white px-4 py-2 border-b-2 border-red-600 text-xs font-bold">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-black uppercase tracking-wider text-yellow-300">
              REDEEMER CELTIC FC — STANDALONE COACH BACKEND & OPERATIONAL HUB
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              • Noel Gorman Park, Dundalk • FAI Club Mark Accredited
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5" /> Share App Link
            </button>
          </div>
        </div>
      </div>

      {/* App Header & Navigation */}
      <header className="bg-white shadow-md border-b-4 border-red-600 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 min-h-[4.5rem] sm:min-h-[5rem] flex items-center justify-between gap-2 sm:gap-4">
          {/* Club Crest & Title Block */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <ClubCrest className="w-10 h-12 sm:w-12 sm:h-14 shrink-0" customLogoUrl={customLogoUrl} />
            <div className="min-w-0 flex flex-col justify-center">
              <h1 className="text-base sm:text-xl md:text-2xl font-black text-red-600 tracking-tight leading-tight truncate sm:overflow-visible sm:whitespace-normal">
                REDEEMER CELTIC FC
              </h1>
              <p className="text-[10px] sm:text-[11px] font-black text-blue-900 uppercase tracking-tight sm:tracking-wider leading-tight mt-0.5 line-clamp-1 sm:line-clamp-none">
                Official Coach Portal & Pitch-Side Operational Hub
              </p>
            </div>
          </div>

          {/* Desktop Action Controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setBinderOpen(true)}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase rounded-xl flex items-center gap-1.5 shadow-sm border border-black"
            >
              <Printer className="w-4 h-4" /> Printable Binder Forms
            </button>
            <button
              onClick={handleCopyAppUrl}
              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 font-black text-xs uppercase rounded-xl flex items-center gap-1.5"
            >
              <Copy className="w-4 h-4" /> Copy Coach Link
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase shadow-sm transition-all"
              aria-label="Toggle Coach Tools Menu"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[11px]">Menu</span>
              {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary Coach Tool Navigation Tabs - Visible on Desktop, Hidden on Mobile */}
        <div className="hidden md:block bg-slate-900 px-4 py-2 border-t border-slate-800">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-1.5 text-xs font-black">
            {[
              { id: 'curriculum', label: '1. 32-Wk Curriculum & Tactics Board' },
              { id: 'pitch_check', label: '2. Pitch & Goalpost Inspection' },
              { id: 'eap', label: '3. Noel Gorman Park EAP (AED Pin: 1971)' },
              { id: 'concussion', label: '4. Concussion "Sit Them Out" Tool' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenu(false);
                }}
                className={`px-3.5 py-2 rounded-lg uppercase transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown Menu with 4 Coach Tools */}
        {mobileMenu && (
          <div className="md:hidden bg-slate-950 text-white px-4 py-3 space-y-2 border-t border-slate-800 shadow-2xl">
            <div className="text-[10px] font-black uppercase text-yellow-400 tracking-wider px-1">
              Select Coach Operational Tool:
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'curriculum', label: '1. 32-Wk Curriculum & Tactics Board' },
                { id: 'pitch_check', label: '2. Pitch & Goalpost Inspection' },
                { id: 'eap', label: '3. Noel Gorman Park EAP (AED Pin: 1971)' },
                { id: 'concussion', label: '4. Concussion "Sit Them Out" Tool' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenu(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-xl font-black text-xs uppercase flex items-center justify-between transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black">
                      ACTIVE
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <button
                onClick={() => { setBinderOpen(true); setMobileMenu(false); }}
                className="w-full text-left py-2.5 px-3 rounded-lg font-black text-xs uppercase bg-blue-900 text-white flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Open Printable Coaching Binder
              </button>
              <button
                onClick={() => { handleCopyAppUrl(); setMobileMenu(false); }}
                className="w-full text-left py-2.5 px-3 rounded-lg font-black text-xs uppercase bg-slate-800 text-slate-200 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copy Coach Link for WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-grow space-y-6">

        {/* Squad Selection Quick Banner */}
        {activeTab === 'curriculum' && (
          <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-red-600 tracking-wider block">
                Active Squad Tier:
              </span>
              <h2 className="text-xl font-black text-blue-900 uppercase">
                {selectedAge} — {ageConfig.badge}
              </h2>
              <div className="text-xs font-bold text-slate-600 mt-0.5">
                Ball Size: <strong>Size {ageConfig.ballSize}</strong> | Format: <strong>{ageConfig.matchFormat}</strong> | Retreat Line: <strong>{ageConfig.hasRetreatLine ? 'Active' : 'No'}</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {Object.keys(AGE_CONFIGS).map(age => (
                <button
                  key={age}
                  onClick={() => {
                    setSelectedAge(age);
                    setSelectedWeek(1);
                    notify(`Switched to ${age}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${
                    selectedAge === age
                      ? 'bg-red-600 text-white border-black shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  {age.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TOOL 1: 32-WEEK CURRICULUM & TACTICS BOARD
        ========================================================= */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Week & Category Selector Bar */}
            <div className="bg-white p-4 rounded-2xl shadow border space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-blue-900">
                  Select Training Week (32-Week PDF Extracted Curriculum):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
                    className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 rounded font-black text-xs flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                  <span className="text-xs font-black text-red-600">Week {selectedWeek} of 32</span>
                  <button
                    onClick={() => setSelectedWeek(w => Math.min(32, w + 1))}
                    className="px-2.5 py-1 bg-blue-900 hover:bg-blue-950 text-white rounded font-black text-xs flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 32 Week Pills */}
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                {Array.from({ length: 32 }, (_, i) => i + 1).map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeek(w)}
                    className={`py-1.5 rounded-lg text-xs font-black border ${
                      selectedWeek === w
                        ? 'bg-red-600 text-white border-black shadow'
                        : 'bg-slate-50 text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    W{w}
                  </button>
                ))}
              </div>
            </div>

            {/* Drill Instructions + Interactive Grass Pitch Tactics Board */}
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-600 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 bg-blue-900 text-white text-[11px] font-black uppercase rounded-full">
                      {selectedAge}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase rounded-full">
                      {currentDrill.timing || '15 mins'}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-[11px] font-black uppercase rounded-full">
                    {currentDrill.phaseTag}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-blue-950">
                  {currentDrill.title}
                </h2>

                <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-600">
                  <div className="text-xs font-black uppercase text-red-700 mb-1">
                    🎯 Primary Learning Objective (Redeemer Celtic Drill Guide):
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    {currentDrill.whatWeLearn}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-800">
                  <div className="text-xs font-black uppercase text-blue-900 mb-1">
                    ⚽ In-Game Match Trigger:
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    {currentDrill.howToUseInGame}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border space-y-2.5">
                  <div className="text-xs font-black uppercase text-slate-900">
                    📋 Step-by-Step Drill Sequence:
                  </div>
                  {currentDrill.steps.map((s: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {currentDrill.coachingPoints && currentDrill.coachingPoints.length > 0 && (
                  <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                    <span className="text-xs font-black uppercase text-slate-900 block mb-1">
                      🧠 Key Coaching Points & Corrections:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs font-bold text-slate-700">
                      {currentDrill.coachingPoints.map((cp: string, cIdx: number) => (
                        <li key={cIdx}>{cp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentDrill.coachingCues && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                      🗣️ Verbal Coaching Cues:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentDrill.coachingCues.map((cue: string, cIdx: number) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 bg-white border border-amber-300 text-amber-950 font-black text-xs rounded-lg shadow-sm"
                        >
                          {cue}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Grass Pitch Tactics Board */}
              <TacticsBoard
                drill={currentDrill}
                pitchCondition={pitchCondition}
                onConditionChange={setPitchCondition}
              />
            </div>
          </div>
        )}

        {/* =========================================================
            TOOL 2: PITCH & GOALPOST SAFETY INSPECTION CHECKLIST
        ========================================================= */}
        {activeTab === 'pitch_check' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-slate-900 space-y-4">
            <div className="border-b pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-red-600">Noel Gorman Park Grass Care</span>
                <h3 className="text-lg font-black text-blue-900 uppercase">
                  Pre-Training & Matchday Grass Pitch Inspection
                </h3>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-black text-xs">
                Standard: IS EN 748 / 16579
              </span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'turf', title: '1. Turf Surface Condition', desc: 'Even grass, no standing water pools or deep churned ruts.' },
                { id: 'glass', title: '2. Debris & Glass Sweep', desc: 'Pitch surface swept clear of sharp debris, litter, and animal foul.' },
                { id: 'goalpost', title: '3. Goalpost Ground Anchors', desc: 'Portable goals anchored firmly per IS EN 748/16579 (Push-pull test).' },
                { id: 'nets', title: '4. Nets & Peg Safety', desc: 'Nets secured to frame; no protruding metal ground hooks or dangerous pegs.' },
                { id: 'lines', title: '5. Line Markings & Retreat Line', desc: 'Touchlines and retreat lines clearly demarcated with bright cones.' },
                { id: 'spectator', title: '6. Spectator 1-Meter Buffer', desc: 'Designated 1-meter barrier respected by visiting parents.' },
                { id: 'weather', title: '7. Frost & Ground Test', desc: 'Surface passes thumb-pressure test; non-frozen natural turf.' }
              ].map(item => (
                <label
                  key={item.id}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={pitchChecks[item.id] || false}
                    onChange={e => setPitchChecks({ ...pitchChecks, [item.id]: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-red-600 rounded"
                  />
                  <div>
                    <span className="font-black text-xs text-slate-900 block">{item.title}</span>
                    <span className="text-xs text-slate-600 font-semibold">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="p-4 bg-slate-100 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-700">Lead Inspector Name:</span>
                <input
                  type="text"
                  placeholder="Enter Coach Name"
                  value={inspectorName}
                  onChange={e => setInspectorName(e.target.value)}
                  className="border-2 border-slate-300 rounded-lg p-1.5 text-xs font-bold bg-white"
                />
              </div>

              <button
                onClick={() => {
                  notify(`Pitch Inspection certified by ${inspectorName || 'Coach'}!`);
                }}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-black text-xs uppercase rounded-xl"
              >
                Sign Off & Approve Pitch
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TOOL 3: NOEL GORMAN PARK EMERGENCY ACTION PLAN (EAP)
        ========================================================= */}
        {activeTab === 'eap' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-600 space-y-4">
            <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-yellow-300">
                  EMERGENCY ACTION PLAN (EAP)
                </span>
                <h3 className="text-lg font-black uppercase">Noel Gorman Park, Dundalk</h3>
                <span className="text-xs text-red-100">Eircode for Ambulance Dispatch: A91 XD26</span>
              </div>
              <a
                href="tel:999"
                className="px-4 py-2 bg-white text-red-700 font-black text-xs uppercase rounded-xl shadow border-2 border-black"
              >
                CALL 999 / 112
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-600">
                <span className="font-black text-green-900 uppercase text-xs block mb-1">
                  Automated Defibrillator (AED) Location
                </span>
                <p className="text-xs font-bold text-slate-800">
                  External heated green cabinet mounted on the main clubhouse wall directly beside entrance door.
                </p>
                <div className="mt-2 p-2 bg-white rounded-lg border text-center font-black text-red-600 text-sm">
                  CABINET PIN CODE: 1971
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-600">
                <span className="font-black text-blue-900 uppercase text-xs block mb-1">
                  Ambulance Pitch Access Gate
                </span>
                <p className="text-xs font-bold text-slate-800">
                  Double security gates at Noel Gorman Park. Send designated high-vis vest runner to entrance to guide paramedics straight to the injured player.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-left text-xs font-bold">
                <thead className="bg-slate-900 text-white uppercase font-black text-[11px]">
                  <tr>
                    <th className="p-2.5">Authority / Asset</th>
                    <th className="p-2.5">Address</th>
                    <th className="p-2.5">Contact Dial</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-2.5 font-black text-blue-900">Dundalk Garda Station</td>
                    <td className="p-2.5">The Crescent, Dundalk</td>
                    <td className="p-2.5">
                      <a href="tel:0429388400" className="text-red-600 font-black underline">042 938 8400</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-blue-900">Tusla Child & Family Agency</td>
                    <td className="p-2.5">Louth Office, Dundalk</td>
                    <td className="p-2.5">
                      <a href="tel:0429353800" className="text-red-600 font-black underline">042 935 3800</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-blue-900">Louth County Hospital (Minor Injuries)</td>
                    <td className="p-2.5">Dublin Road, Dundalk (9am–8pm)</td>
                    <td className="p-2.5">
                      <a href="tel:0429385433" className="text-red-600 font-black underline">042 938 5433</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-blue-900">Our Lady of Lourdes Hospital (A&E)</td>
                    <td className="p-2.5">Drogheda (24-Hour Emergency Dept)</td>
                    <td className="p-2.5">
                      <a href="tel:0419837601" className="text-red-600 font-black underline">041 983 7601</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TOOL 4: CONCUSSION "SIT THEM OUT" TOOL
        ========================================================= */}
        {activeTab === 'concussion' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-600 space-y-4">
            <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-600">
              <span className="font-black text-sm text-red-800 uppercase block">
                Statutory "IF IN DOUBT, SIT THEM OUT" Concussion Protocol
              </span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                Any player with suspected head trauma must be removed immediately. No return to play on matchday.
              </p>
            </div>

            <div className="p-4 bg-red-100 rounded-xl border-2 border-red-300">
              <span className="font-black text-red-800 uppercase text-xs block mb-1">
                🚨 RED FLAGS (Call 999 / 112 Immediately):
              </span>
              <ul className="list-disc pl-5 space-y-1 text-xs font-bold text-slate-900">
                <li>Neck pain or spinal tenderness</li>
                <li>Repeated vomiting or seizures</li>
                <li>Loss of consciousness or worsening headache</li>
                <li>Double vision, unequal pupils, slurred speech</li>
                <li>Weakness, numbness, or tingling in arms/legs</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border text-xs font-bold space-y-2">
              <span className="font-black text-blue-900 uppercase block">
                Graduated Return-to-Play Timeline (Youth Minimum: 14 Days):
              </span>
              <p className="text-slate-700">
                Stage 1 (48h complete rest) &rarr; Stage 2 (Light aerobic walking) &rarr; Stage 3 (Non-contact dribbling) &rarr; Stage 4 (Team passing) &rarr; Stage 5 (Full contact training following GP sign-off) &rarr; Stage 6 (Match play).
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Direct Link Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-red-600 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <ClubCrest className="w-10 h-12" customLogoUrl={customLogoUrl} />
                <div>
                  <span className="text-[10px] font-black uppercase text-red-600">Standalone App Link</span>
                  <h3 className="text-base font-black text-blue-900">Direct Coach Access URL</h3>
                </div>
              </div>
              <button onClick={() => setShowShareModal(false)} className="p-1 text-slate-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-600">
              Share this URL directly with Redeemer Celtic volunteer coaches via WhatsApp, SMS, or email for instant pitch-side access:
            </p>

            <div className="p-3 bg-slate-100 rounded-xl border text-xs font-mono font-bold text-blue-900 break-all select-all">
              {window.location.href.split('?')[0]}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  handleCopyAppUrl();
                  setShowShareModal(false);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <Copy className="w-4 h-4" /> Copy Direct Link to Clipboard
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Coaching Binder Modal */}
      <PrintableBinderModal
        isOpen={binderOpen}
        onClose={() => setBinderOpen(false)}
        ageConfig={ageConfig}
        customLogoUrl={customLogoUrl}
        onNotify={notify}
      />

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-white border-t-4 border-red-600 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-3">
            <ClubCrest className="w-8 h-10" customLogoUrl={customLogoUrl} />
            <div>
              <div className="font-black text-white">REDEEMER CELTIC FC • EST. 1971</div>
              <div className="text-slate-400">
                Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth • Eircode: A91 XD26
              </div>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <a href="mailto:redeemerceltic@gmail.com" className="text-red-400 font-black hover:underline block">
              redeemerceltic@gmail.com
            </a>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Affiliated with the Football Association of Ireland (FAI), DSL & NEFL
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
