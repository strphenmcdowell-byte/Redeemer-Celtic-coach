import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, Sparkles, X, HelpCircle, Shield } from 'lucide-react';
import { FOOTBALL_GLOSSARY, GlossaryTerm } from '../data/footballGlossary.ts';

interface FootballGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export const FootballGlossaryModal: React.FC<FootballGlossaryModalProps> = ({
  isOpen,
  onClose,
  initialSearch = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Tactical', 'Technical', 'Rules & Formations', 'Coaching Method'];

  const filteredTerms = FOOTBALL_GLOSSARY.filter(item => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kidFriendlyExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-4 border-black overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-red-700 to-red-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <HelpCircle className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-yellow-300">
                Redeemer Celtic FC Coach Support
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Football Sayings & Terminology Explainer
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader & Search */}
        <div className="p-6 bg-slate-50 border-b space-y-4">
          <p className="text-xs font-bold text-slate-700 leading-relaxed">
            Need help explaining tactical terms or football sayings to kids or parents? Search or browse terms below for simple definitions, kid-friendly analogies, and coaching cues.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search term (e.g. Retreat Line, Overload, Build-up)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl font-bold text-xs text-slate-900 focus:outline-none focus:border-blue-800"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white shadow'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-bold text-xs">
              No matching football sayings found. Try searching for another term!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTerms.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm hover:border-blue-800 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-blue-900 uppercase">
                        {item.term}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      <span className="font-black text-slate-900">Coach Definition: </span>
                      {item.definition}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900">
                      <div className="flex items-center gap-1.5 font-black uppercase text-amber-800 text-[10px] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> How to Explain to Kids / Analogy:
                      </div>
                      "{item.kidFriendlyExplanation}"
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-semibold text-blue-900">
                      <div className="flex items-center gap-1.5 font-black uppercase text-blue-800 text-[10px] mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" /> Coaching Cue / Tip:
                      </div>
                      {item.coachingCue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Showing {filteredTerms.length} football terms</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-black uppercase rounded-xl hover:bg-black transition-colors"
          >
            Close Dictionary
          </button>
        </div>

      </div>
    </div>
  );
};
