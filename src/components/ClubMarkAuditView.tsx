import React, { useState } from 'react';
import { Award, CheckCircle, Clock, AlertTriangle, FileText, Download, Printer, Shield, CheckSquare } from 'lucide-react';
import { CLUB_MARK_CRITERIA } from '../data/clubData.ts';
import { ClubMarkCriterion, calculateClubMarkProgress } from '../utils/faiRules.ts';

interface ClubMarkAuditViewProps {
  onNotify: (msg: string) => void;
  customLogoUrl?: string | null;
}

export const ClubMarkAuditView: React.FC<ClubMarkAuditViewProps> = ({ onNotify, customLogoUrl }) => {
  const [criteria, setCriteria] = useState<ClubMarkCriterion[]>(CLUB_MARK_CRITERIA);
  const [filterTier, setFilterTier] = useState<'All' | 'Entry Mark' | 'One Star PDC'>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const stats = calculateClubMarkProgress(criteria);

  const toggleStatus = (id: string) => {
    setCriteria(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Compliant'
              ? 'In Progress'
              : item.status === 'In Progress'
              ? 'Pending Verification'
              : 'Compliant';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    onNotify('Updated FAI Club Mark criterion status.');
  };

  const filteredCriteria = criteria.filter(item => {
    if (filterTier !== 'All' && item.tier !== filterTier) return false;
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    return true;
  });

  const handleExportDossier = () => {
    const markdownContent = `# REDEEMER CELTIC FC — FAI CLUB MARK ACCREDITATION AUDIT REPORT
**Club:** Redeemer Celtic FC (Est. 1971)
**Affiliation:** Football Association of Ireland (FAI), Dundalk Schoolboys & Girls League (DSL), North East Football League (NEFL)
**Facility:** Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth
**Date Generated:** ${new Date().toLocaleDateString('en-IE')}
**Official Contact:** redeemerceltic@gmail.com

---

## 1. Executive Accreditation Summary
- **Entry FAI Club Mark Status:** ${stats.entryMarkCompliant ? 'ACCREDITED & COMPLIANT (100%)' : `IN PROGRESS (${stats.entryPercent}%)`}
- **FAI One Star Player Development Centre Status:** ${stats.oneStarEligible ? 'ELIGIBLE FOR INSPECTION' : `PROGRESSING (${stats.oneStarPercent}%)`}
- **Overall Audit Progress:** ${stats.totalPercent}%

---

## 2. Accreditation Criteria & Evidence Matrix

| Tier | Category | Criteria Title | Mandatory? | Compliance Status | Verified Evidence Document |
|------|----------|----------------|------------|-------------------|----------------------------|
${criteria
  .map(
    c =>
      `| ${c.tier} | ${c.category} | ${c.title} | ${c.mandatory ? 'YES' : 'NO'} | ${c.status} | ${c.evidenceDoc} |`
  )
  .join('\n')}

---

## 3. Statutory & Player Development Foundations (PDP)
- **Equal Playing Time Policy:** Enforced for all U8, U10, and U12 squads (minimum 50% match time recorded on FAI sheets).
- **Vetting & Safeguarding:** 100% of coaches cleared through FAI Connect / National Vetting Bureau (NVB).
- **Grass Pitch Safety:** Pre-session pitch and goalpost inspections logged at Noel Gorman Park.

---
**Auditor / Club Sign-Off:**
Redeemer Celtic FC Executive Committee & FAI Grassroots Development Auditor
Email: redeemerceltic@gmail.com`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Redeemer_Celtic_FAI_Club_Mark_Audit_${new Date().getFullYear()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify('Exported FAI Club Mark Audit Dossier!');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-black flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
            <Award className="w-3.5 h-3.5 text-yellow-300" /> FAI Accreditation Pathway
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            FAI Club Mark & One Star PDC Audit Centre
          </h1>
          <p className="text-xs sm:text-sm font-bold text-red-100 leading-relaxed">
            Aligning Redeemer Celtic FC strictly with Entry FAI Club Mark criteria while establishing robust governance, coach education, and Player Development Plan (PDP) foundations for the FAI One Star Player Development Centre award.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportDossier}
            className="px-4 py-3 bg-white text-red-700 font-black text-xs uppercase rounded-xl shadow-lg hover:bg-slate-100 flex items-center justify-center gap-2 border-2 border-black"
          >
            <Download className="w-4 h-4" /> Export FAI Audit Report
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-3 bg-blue-800 text-white font-black text-xs uppercase rounded-xl shadow-lg hover:bg-blue-900 flex items-center justify-center gap-2 border-2 border-white"
          >
            <Printer className="w-4 h-4" /> Print Audit Matrix
          </button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Entry Mark Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-red-600 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-red-600">Level 1 Pathway</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-black text-[10px]">
                {stats.entryPercent}% Complete
              </span>
            </div>
            <h3 className="text-lg font-black text-blue-900">Entry FAI Club Mark</h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Core statutory compliance: Club constitution, AGM minutes, dual-signatory banking, Child Safeguarding Statement, and 100% NVB Garda Vetting.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t">
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.entryPercent}%` }}
              ></div>
            </div>
            <span className="text-xs font-black text-slate-800">
              {stats.entryMarkCompliant ? '✓ 100% Compliant — Accredited' : `${stats.entryPercent}% Statutory Completed`}
            </span>
          </div>
        </div>

        {/* One Star PDC Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-blue-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-blue-800">Level 2 Pathway</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-black text-[10px]">
                {stats.oneStarPercent}% Complete
              </span>
            </div>
            <h3 className="text-lg font-black text-blue-900">FAI One Star PDC</h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Player Development Centre foundations: Strict equal playing time up to U12, structured 32-week coaching curriculum, coach badges & published EAP.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t">
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-blue-800 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.oneStarPercent}%` }}
              ></div>
            </div>
            <span className="text-xs font-black text-slate-800">
              {stats.oneStarEligible ? '✓ Eligible for FAI PDC Audit' : `${stats.oneStarPercent}% Completed (Target: 80%+)`}
            </span>
          </div>
        </div>

        {/* Auditor Guidance Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-slate-500">Facility Context</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-black text-[10px]">
                Grass Pitch Standard
              </span>
            </div>
            <h3 className="text-lg font-black text-blue-900">Noel Gorman Park</h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Natural turf operations: pre-match goalpost anchorage inspections (IS EN 748/16579), wet weather protocols, and pitch maintenance schedules.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Ground Location:</span>
            <span className="text-blue-800 font-black">Cox's Demesne, Dundalk</span>
          </div>
        </div>
      </div>

      {/* Filter and Interactive Criteria Matrix */}
      <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div>
            <h3 className="text-lg font-black text-blue-900 uppercase">
              Accreditation Criteria & Verification Matrix ({filteredCriteria.length} Items)
            </h3>
            <p className="text-xs font-bold text-slate-500">
              Click the status button on any row to toggle between Compliant, In Progress, and Pending Verification.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-black">
              <span className="px-2 text-slate-500">Tier:</span>
              {(['All', 'Entry Mark', 'One Star PDC'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setFilterTier(tier)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    filterTier === tier ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="border-2 border-slate-300 rounded-lg px-3 py-1 text-xs font-bold bg-white outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Governance">Governance</option>
              <option value="Safeguarding">Safeguarding</option>
              <option value="Coach Education">Coach Education</option>
              <option value="Player Development">Player Development</option>
            </select>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase font-black text-[11px]">
              <tr>
                <th className="p-3">Accreditation Tier</th>
                <th className="p-3">Category</th>
                <th className="p-3">Requirement Title</th>
                <th className="p-3 text-center">Mandatory</th>
                <th className="p-3">Evidence File / Document</th>
                <th className="p-3 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-bold">
              {filteredCriteria.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        item.tier === 'Entry Mark' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.tier}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{item.category}</td>
                  <td className="p-3">
                    <div className="font-black text-slate-900">{item.title}</div>
                    <div className="text-[10px] text-slate-500">ID: {item.id}</div>
                  </td>
                  <td className="p-3 text-center">
                    {item.mandatory ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-black text-[10px]">
                        REQUIRED
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Recommended</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="text-blue-800 underline flex items-center gap-1 font-mono text-[11px]">
                      <FileText className="w-3.5 h-3.5 shrink-0 text-red-600" />
                      {item.evidenceDoc}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all shadow-sm ${
                        item.status === 'Compliant'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : item.status === 'In Progress'
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                      title="Click to toggle status"
                    >
                      {item.status === 'Compliant' && '✓ Compliant'}
                      {item.status === 'In Progress' && '⏳ In Progress'}
                      {item.status === 'Pending Verification' && '🔍 Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
