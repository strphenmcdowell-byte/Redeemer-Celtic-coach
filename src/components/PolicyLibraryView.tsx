import React, { useState } from 'react';
import { FileText, Eye, Download, Printer, X, Shield, Lock } from 'lucide-react';
import { OFFICIAL_POLICIES } from '../data/clubData.ts';
import { ClubPolicy } from '../types.ts';
import { ClubCrest } from './ClubCrest.tsx';

interface PolicyLibraryViewProps {
  onNotify: (msg: string) => void;
  customLogoUrl?: string | null;
}

export const PolicyLibraryView: React.FC<PolicyLibraryViewProps> = ({ onNotify, customLogoUrl }) => {
  const [activeDoc, setActiveDoc] = useState<ClubPolicy | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Statutory Safeguarding', 'Behaviour & Respect', 'Disciplinary & Welfare', 'Data Privacy', 'Medical & Safety', 'Facility Management', 'Governance & Audit'];

  const filteredDocs = OFFICIAL_POLICIES.filter(doc => {
    if (categoryFilter !== 'All' && doc.category !== categoryFilter) return false;
    return true;
  });

  const handleDownloadPolicy = (doc: ClubPolicy) => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${doc.title} - Redeemer Celtic FC</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 32px; background: #f8fafc; color: #0f172a; line-height: 1.6; }
  .sheet { max-width: 820px; margin: 0 auto; background: #ffffff; border: 4px solid #1d4ed8; border-top: 12px solid #dc2626; border-radius: 12px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #dc2626; padding-bottom: 16px; margin-bottom: 24px; }
  .club-title { font-size: 24px; font-weight: 900; color: #dc2626; margin: 0; }
  .club-sub { font-size: 11px; font-weight: 700; color: #1d4ed8; margin-top: 4px; }
  h1 { font-size: 22px; color: #1d4ed8; margin-bottom: 8px; }
  .meta { font-size: 12px; font-weight: bold; background: #eff6ff; color: #1e3a8a; padding: 10px; border-radius: 6px; margin-bottom: 20px; }
  h2 { font-size: 15px; color: #dc2626; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px; }
  p { font-size: 13.5px; white-space: pre-line; color: #334155; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 2px solid #1d4ed8; font-size: 11px; font-weight: bold; color: #475569; text-align: center; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div>
        <div class="club-title">REDEEMER CELTIC FC (EST. 1971)</div>
        <div class="club-sub">Noel Gorman Park, Cox's Demesne, Dundalk, Co. Louth • redeemerceltic@gmail.com</div>
      </div>
      <div style="background:#dc2626;color:#fff;padding:8px 14px;border-radius:8px;font-weight:900;font-size:12px;">OFFICIAL FAI & CLUB POLICY</div>
    </div>
    <h1>${doc.title}</h1>
    <div class="meta">Effective Date: ${doc.effectiveDate} | Version: ${doc.version} | Contact: redeemerceltic@gmail.com</div>
    ${doc.sections.map(s => `<h2>${s.heading}</h2><p>${s.body}</p>`).join('')}
    <div class="footer">Redeemer Celtic FC Official Governance Document • Valid 2026/2027 Season • Noel Gorman Park, Dundalk</div>
  </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}_Redeemer_Celtic_FC.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify(`Downloaded ${doc.title} in Club Colours!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-black flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
            <Shield className="w-3.5 h-3.5 text-yellow-300" /> FAI Club Mark Governance Standards
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Club Governance & Policy Library
          </h1>
          <p className="text-xs sm:text-sm font-bold text-blue-100 leading-relaxed">
            Statutory policies in accordance with the Children First Act 2015, FAI Safeguarding Guidelines, and GDPR compliance at Noel Gorman Park.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5 bg-white p-3 rounded-2xl shadow-sm border">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
              categoryFilter === cat
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Policy Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-5 shadow-md border-2 border-slate-200 hover:border-red-600 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase rounded">
                  {doc.category}
                </span>
                <span className="text-[10px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  v{doc.version}
                </span>
              </div>
              <h3 className="text-base font-black text-blue-900 mb-1.5 leading-snug">{doc.title}</h3>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">{doc.summary}</p>
            </div>

            <div className="mt-4 pt-3 border-t flex gap-2">
              <button
                onClick={() => setActiveDoc(doc)}
                className="flex-1 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Read Policy
              </button>
              <button
                onClick={() => handleDownloadPolicy(doc)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1"
                title="Download Official Club Document"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Reader Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border-4 border-red-600 shadow-2xl">
            <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white p-5 flex items-center justify-between gap-4 border-b-4 border-black">
              <div className="flex items-center gap-3">
                <ClubCrest className="w-12 h-14" customLogoUrl={customLogoUrl} />
                <div>
                  <span className="text-[10px] font-black uppercase text-yellow-300">
                    Redeemer Celtic FC • Official Statutory Document
                  </span>
                  <h2 className="text-lg sm:text-xl font-black">{activeDoc.title}</h2>
                  <div className="text-[11px] font-bold text-red-100">
                    Effective: {activeDoc.effectiveDate} • Version: {activeDoc.version} • redeemerceltic@gmail.com
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-2 bg-black/40 hover:bg-black rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 bg-slate-50 flex-grow">
              {activeDoc.sections.map((sec, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-blue-700 shadow-sm">
                  <h3 className="text-sm font-black text-red-600 uppercase mb-1">{sec.heading}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 whitespace-pre-line leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t-2 flex flex-wrap gap-3 justify-between items-center">
              <span className="text-xs font-black text-slate-600">
                Noel Gorman Park, Dundalk • redeemerceltic@gmail.com
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPolicy(activeDoc)}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download Official Document
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
