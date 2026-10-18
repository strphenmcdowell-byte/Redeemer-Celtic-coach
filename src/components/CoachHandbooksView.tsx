import React, { useState } from 'react';
import {
  Shield, BookOpen, ChevronLeft, ChevronRight, Play, Printer,
  FileText, Droplets, Sun, CloudRain, CheckCircle, Users, Award,
  Sparkles, HelpCircle
} from 'lucide-react';
import { AGE_CONFIGS, FULL_CURRICULUM } from '../data/clubData.ts';
import { TacticsBoard } from './TacticsBoard.tsx';
import { PitchConditionType } from '../types.ts';
import { getGrassPitchAdaptation } from '../utils/faiRules.ts';
import { FootballGlossaryModal } from './FootballGlossaryModal.tsx';

interface CoachHandbooksViewProps {
  onOpenBinder: (ageKey: string) => void;
  onNotify: (msg: string) => void;
  customLogoUrl?: string | null;
}

export const CoachHandbooksView: React.FC<CoachHandbooksViewProps> = ({
  onOpenBinder,
  onNotify,
  customLogoUrl
}) => {
  const [selectedAge, setSelectedAge] = useState<string>('U10 Academy (5v5)');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [pitchCondition, setPitchCondition] = useState<PitchConditionType>('firm_dry');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  const ageConfig = AGE_CONFIGS[selectedAge];
  const curriculum = FULL_CURRICULUM[selectedAge] || [];
  const currentDrill = curriculum[selectedWeek - 1] || curriculum[0];
  const pitchAdapt = getGrassPitchAdaptation(pitchCondition);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-black flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-yellow-300" /> Modular Age-Specific Coach Handbooks
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            FAI Coach Handbooks & Grass Pitch Curriculum
          </h1>
          <p className="text-xs sm:text-sm font-bold text-red-100 leading-relaxed">
            Calibrated specifically for grass pitch conditions at Noel Gorman Park, Dundalk. Adhering to the FAI Player Development Plan (PDP) and Entry & One Star Club Mark standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenBinder(selectedAge)}
            className="px-5 py-3.5 bg-white text-red-700 font-black text-xs uppercase rounded-xl shadow-lg hover:bg-slate-100 flex items-center gap-2 border-2 border-black"
          >
            <Printer className="w-4 h-4" /> Printable Coaching Binder &rarr;
          </button>
        </div>
      </div>

      {/* 1. Age Tier Selector */}
      <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-blue-800">
        <div className="text-xs font-black uppercase text-slate-500 mb-2">
          1. Select Age Group & Formation Tier (Modular Curriculum):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {Object.keys(AGE_CONFIGS).map(age => (
            <button
              key={age}
              onClick={() => {
                setSelectedAge(age);
                setSelectedWeek(1);
                onNotify(`Loaded ${age} Coach Handbook & 32-Week Curriculum`);
              }}
              className={`p-3 rounded-xl text-left border-2 transition-all ${
                selectedAge === age
                  ? 'bg-red-600 text-white border-black shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-blue-900 border-slate-200 hover:border-blue-600'
              }`}
            >
              <div className="text-xs font-black">{age}</div>
              <div className={`text-[10px] font-bold mt-1 ${selectedAge === age ? 'text-red-100' : 'text-slate-500'}`}>
                {AGE_CONFIGS[age].badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Age-Specific Handbook Overview & FAI PDP Standards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <div>
              <span className="text-[11px] font-black uppercase text-red-600 tracking-wider">
                FAI PDP Match Model
              </span>
              <h2 className="text-xl font-black text-blue-900 uppercase">{selectedAge} Handbook</h2>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-black text-xs uppercase">
              {ageConfig.badge}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs font-bold">
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Match Format:</span>
              <span className="text-sm text-slate-900 font-black">{ageConfig.matchFormat}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Official Ball Size:</span>
              <span className="text-sm text-blue-800 font-black">Size {ageConfig.ballSize}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Grass Pitch Size:</span>
              <span className="text-sm text-slate-900 font-black">{ageConfig.pitchSize}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Goal Dimension:</span>
              <span className="text-sm text-slate-900 font-black">{ageConfig.goalSize}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Retreat Line Active:</span>
              <span className={`text-sm font-black ${ageConfig.hasRetreatLine ? 'text-green-700' : 'text-slate-600'}`}>
                {ageConfig.hasRetreatLine ? 'YES (Halfway / Box retreat)' : 'NO (Regulation restarts)'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <span className="text-slate-500 uppercase text-[10px] block">Equal Playing Time:</span>
              <span
                className={`text-sm font-black ${
                  ageConfig.equalPlayingTimeMandatory ? 'text-red-600' : 'text-blue-800'
                }`}
              >
                {ageConfig.equalPlayingTimeMandatory
                  ? 'MANDATORY (>= 50% min per player)'
                  : 'Recommended Fair Time'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-600 text-xs font-semibold text-slate-800 leading-relaxed">
            <span className="font-black text-red-700 uppercase block mb-1">FAI Player Development Plan Focus:</span>
            {ageConfig.faiPdpSummary}
          </div>
        </div>

        {/* Grass Pitch Adaptation Engine */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-blue-800">Noel Gorman Park Turf</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-black text-[10px]">Grass Engine</span>
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase">Grass Pitch Condition Setup</h3>
            <p className="text-xs font-bold text-slate-500 mt-1 mb-3">
              Select pitch condition to adapt cone layout, footwear, and passing distances:
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { id: 'firm_dry' as PitchConditionType, label: 'Firm / Dry', icon: Sun },
                { id: 'greasy_wet' as PitchConditionType, label: 'Greasy / Wet', icon: Droplets },
                { id: 'heavy_mud' as PitchConditionType, label: 'Heavy Mud', icon: CloudRain },
                { id: 'frost_frozen' as PitchConditionType, label: 'Hard Frost', icon: Sparkles }
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setPitchCondition(opt.id);
                      onNotify(`Adapted drills for ${opt.label} turf.`);
                    }}
                    className={`p-2 rounded-lg text-xs font-black flex items-center gap-1.5 border transition-all ${
                      pitchCondition === opt.id
                        ? 'bg-blue-800 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-700 bg-slate-50 p-3.5 rounded-xl border">
              <div>
                <span className="text-blue-900 block font-black">Cones & Layout:</span>
                <span className="text-slate-600 font-semibold">{pitchAdapt.coneRecommendation}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="text-blue-900 block font-black">Footwear / Studs:</span>
                <span className="text-slate-600 font-semibold">{pitchAdapt.footwearRecommendation}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="text-blue-900 block font-black">Ball Pressure:</span>
                <span className="text-slate-600 font-semibold">{pitchAdapt.ballPressurePsi}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenBinder(selectedAge)}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase rounded-xl flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-red-500" /> Print Pitch Safety Checklist
          </button>
        </div>
      </div>

      {/* 3. 32-Week Curriculum Selector */}
      <div className="bg-white p-5 rounded-2xl shadow-md border space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase text-blue-900">
              2. Select Training Week (Weeks 1 to 32 Progressive Plan):
            </span>
            <div className="text-[11px] font-bold text-slate-500">
              Structured four-phase progression: Technique &rarr; Passive Pressure &rarr; 100% Match Speed &rarr; Conditioned SSG.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg font-black text-xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <span className="text-xs font-black text-red-600 px-2">Week {selectedWeek} of 32</span>
            <button
              onClick={() => setSelectedWeek(w => Math.min(32, w + 1))}
              className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-black text-xs flex items-center gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
          {Array.from({ length: 32 }, (_, i) => i + 1).map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`py-2 rounded-lg text-xs font-black border transition-all ${
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

      {/* 4. Drill Card + Interactive Tactics Board */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Drill Explanation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-600 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 bg-blue-800 text-white text-[11px] font-black uppercase rounded-full">
              {selectedAge}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-[11px] font-black uppercase rounded-full">
              {currentDrill.phaseTag}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-blue-900">{currentDrill.title}</h2>

          <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-600">
            <div className="text-xs font-black uppercase text-red-700 mb-1">
              🎯 What We Are Learning Today (Child & Coach Guide):
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {currentDrill.whatWeLearn}
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-700">
            <div className="text-xs font-black uppercase text-blue-800 mb-1">
              ⚽ How to Use This in a Real Match:
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {currentDrill.howToUseInGame}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border space-y-2.5">
            <div className="text-xs font-black uppercase text-slate-900">
              📋 1-2-3 Step-by-Step Instructions:
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

          {/* Coaching Cues */}
          {currentDrill.coachingCues && currentDrill.coachingCues.length > 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                🗣️ Coaching Cues (What to shout to praise & guide):
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

          {/* Grass Condition Advice for this specific week */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-950">
            <span className="font-black uppercase block mb-0.5">🌱 Grass Pitch Weather Tip:</span>
            {pitchCondition === 'greasy_wet'
              ? currentDrill.grassPitchNotes?.wet || pitchAdapt.drillPacingModifier
              : pitchCondition === 'heavy_mud'
              ? currentDrill.grassPitchNotes?.mud || pitchAdapt.drillPacingModifier
              : currentDrill.grassPitchNotes?.dry || pitchAdapt.drillPacingModifier}
          </div>
        </div>

        {/* Tactics Board */}
        <TacticsBoard
          drill={currentDrill}
          pitchCondition={pitchCondition}
          onConditionChange={setPitchCondition}
        />

        {/* Football Sayings Dictionary Button Under Tactics Board */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-center">
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="w-full sm:w-auto px-6 py-4 bg-yellow-300 text-slate-900 font-black text-sm uppercase rounded-xl shadow-lg hover:bg-yellow-400 flex items-center justify-center gap-3 border-2 border-black transition-transform hover:scale-105"
          >
            <HelpCircle className="w-5 h-5 text-blue-900" /> Need help explaining football sayings? Open Football Sayings Dictionary &rarr;
          </button>
        </div>
      </div>

      <FootballGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};
