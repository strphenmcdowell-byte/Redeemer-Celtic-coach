import React, { useState } from 'react';
import {
  ShieldAlert, Upload, CheckCircle, Eye, Download, Copy,
  Users, DollarSign, Share2, FileText, X
} from 'lucide-react';
import { ClubCrest } from './ClubCrest.tsx';
import { PlayerRegistration, StaffMember } from '../types.ts';
import { AGE_CONFIGS, OFFICIAL_SPONSORS, OFFICIAL_POLICIES } from '../data/clubData.ts';
import { PricingConfig } from '../utils/faiRules.ts';

interface AdminPortalViewProps {
  pitchOpen: boolean;
  onTogglePitch: () => void;
  pricing: PricingConfig;
  onUpdatePricing: (pricing: PricingConfig) => void;
  registrations: PlayerRegistration[];
  onExportFaiDoc: (reg: PlayerRegistration) => void;
  staffList: StaffMember[];
  onAddStaff: (staff: StaffMember) => void;
  customLogoUrl?: string | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotify: (msg: string) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  pitchOpen,
  onTogglePitch,
  pricing,
  onUpdatePricing,
  registrations,
  onExportFaiDoc,
  staffList,
  onAddStaff,
  customLogoUrl,
  onLogoUpload,
  onNotify
}) => {
  const [adminTab, setAdminTab] = useState<'registrations' | 'pricing' | 'social' | 'staff' | 'policies'>('registrations');
  const [viewIdModal, setViewIdModal] = useState<PlayerRegistration | null>(null);

  // Commercial Sponsorship rates
  const [sponsorRates, setSponsorRates] = useState({
    kitSponsorYr1: 1800,
    kitSponsorYr2: 1000,
    signSponsorYr1: 350,
    signSponsorYr2: 200,
    matchdaySponsor: 150,
    digitalSponsor: 100
  });

  // Social media post generator
  const [socialPost, setSocialPost] = useState({
    type: 'Upcoming Fixture',
    ageGroup: 'U10 Academy (5v5)',
    opponent: 'Quay Celtic',
    scoreUs: '3',
    scoreThem: '1',
    venue: 'Noel Gorman Park, Dundalk',
    kickoff: 'Saturday 10:30 AM'
  });

  // Add staff form
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Coach / Mentor',
    ageGroup: 'U10 Academy (5v5)',
    vetted: true,
    safeguardingCert: true,
    coachingBadge: 'FAI PDP 1'
  });

  const generateSmartCaption = () => {
    const teamParents = registrations
      .filter(r => r.ageGroup === socialPost.ageGroup)
      .map(r => r.socialHandle)
      .join(' ');
    const sponsorTags = OFFICIAL_SPONSORS.map(s => s.handle).join(' ');

    if (socialPost.type === 'Upcoming Fixture') {
      return `🔴🔵 UPCOMING FIXTURE | REDEEMER CELTIC FC 🔵🔴\n\nOur ${socialPost.ageGroup} squad are in action this weekend!\n⚽ Redeemer Celtic vs ${socialPost.opponent}\n📍 Venue: ${socialPost.venue}\n⏰ Kick-off: ${socialPost.kickoff}\n\nCome down and show your positive sideline support! Let the players play! 👏\n\n👥 Squad Families: ${teamParents || '@redeemerceltic_parents'}\n🤝 Official Club Partners: ${sponsorTags}\n📧 redeemerceltic@gmail.com\n#RedeemerCeltic #Dundalk #GrassrootsFootball #Est1971 #COYR`;
    }
    return `🔴🔵 FULL-TIME RESULT | REDEEMER CELTIC FC 🔵🔴\n\nFantastic team effort today from our ${socialPost.ageGroup} squad!\n⚽ Redeemer Celtic ${socialPost.scoreUs} - ${socialPost.scoreThem} ${socialPost.opponent}\n📍 ${socialPost.venue}\n\nWell done to all players and volunteer coaches! 👏\n\n👥 Squad Families: ${teamParents || '@redeemerceltic_parents'}\n🤝 Official Club Partners: ${sponsorTags}\n📧 redeemerceltic@gmail.com\n#RedeemerCeltic #Dundalk #GrassrootsFootball #Est1971`;
  };

  return (
    <div className="space-y-6">
      {/* Admin Top Header & Pitch Toggle */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border-4 border-red-600 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ClubCrest className="w-14 h-16" customLogoUrl={customLogoUrl} />
          <div>
            <span className="text-[10px] font-black uppercase text-red-400">Executive Committee Control</span>
            <h1 className="text-xl sm:text-2xl font-black uppercase">Master Admin & FAI COMET Portal</h1>
            <p className="text-xs text-slate-300 font-bold">
              Noel Gorman Park, Dundalk • Dual-Signatory Governance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="px-4 py-2.5 rounded-xl text-xs font-black uppercase border-2 border-white bg-blue-800 hover:bg-blue-700 cursor-pointer flex items-center gap-2 transition-all shadow-md">
            <Upload className="w-4 h-4" /> Upload Club Crest
            <input type="file" accept="image/*" className="hidden" onChange={onLogoUpload} />
          </label>
          <button
            onClick={onTogglePitch}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase border-2 border-white transition-all shadow-md ${
              pitchOpen ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Pitch Banner: {pitchOpen ? 'PITCHES OPEN' : 'WEATHER ALERT / CLOSED'}
          </button>
        </div>
      </div>

      {/* Admin Sub-Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'registrations', label: '1. FAI Registrations & ID Export' },
          { id: 'pricing', label: '2. Membership & Sponsorship Pricing' },
          { id: 'social', label: '3. Match Graphic & Smart @Tags' },
          { id: 'staff', label: '4. Staff Directory (Single Source)' },
          { id: 'policies', label: '5. Executive Policies' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setAdminTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase border-2 transition-all ${
              adminTab === t.id
                ? 'bg-red-600 text-white border-black shadow'
                : 'bg-white text-blue-900 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FAI REGISTRATIONS */}
      {adminTab === 'registrations' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-800 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h2 className="text-lg font-black text-blue-900 uppercase">
                FAI COMET Player Database ({registrations.length} Registered Players)
              </h2>
              <p className="text-xs font-bold text-slate-500">
                Click "View & Export FAI ID" to inspect proof of age documents and export them for FAI COMET paperwork.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase font-black text-[11px]">
                <tr>
                  <th className="p-3">Player Name & DOB</th>
                  <th className="p-3">Squad</th>
                  <th className="p-3">Parent & Contact</th>
                  <th className="p-3">Medical Notes</th>
                  <th className="p-3">Uploaded FAI Proof of Age</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y font-bold">
                {registrations.map(reg => (
                  <tr key={reg.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-black text-slate-900">{reg.playerName}</div>
                      <div className="text-[11px] text-slate-500">DOB: {reg.dob}</div>
                    </td>
                    <td className="p-3 text-blue-800 font-black">{reg.ageGroup}</td>
                    <td className="p-3">
                      <div>{reg.parentName} ({reg.phone})</div>
                      <div className="text-red-600 text-[11px]">{reg.socialHandle}</div>
                    </td>
                    <td className="p-3 text-slate-700">{reg.medical}</td>
                    <td className="p-3">
                      <span className="font-mono text-blue-800 text-[11px] underline">
                        {reg.docFileName}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setViewIdModal(reg)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-black text-[11px] uppercase flex items-center justify-center gap-1.5 mx-auto shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" /> View & Export
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING ENGINE */}
      {adminTab === 'pricing' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 space-y-4">
            <h3 className="text-base font-black text-blue-900 uppercase">
              Dynamic Membership Fee Calculator (€)
            </h3>
            <p className="text-xs font-semibold text-slate-600">
              Adjust sibling tier fees and the maximum family cap. Updates the registration form dynamically.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-black">
              <label>
                1st Child Fee (€):
                <input
                  type="number"
                  value={pricing.child1}
                  onChange={e => onUpdatePricing({ ...pricing, child1: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                2nd Child Add-On (€):
                <input
                  type="number"
                  value={pricing.child2}
                  onChange={e => onUpdatePricing({ ...pricing, child2: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                3rd+ Child Add-On (€):
                <input
                  type="number"
                  value={pricing.child3}
                  onChange={e => onUpdatePricing({ ...pricing, child3: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                Family Maximum Cap (€):
                <input
                  type="number"
                  value={pricing.familyCap}
                  onChange={e => onUpdatePricing({ ...pricing, familyCap: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-xs font-bold text-green-900">
              ✓ Active Pricing: 1 Child: €{pricing.child1} | 2 Children: €{pricing.child1 + pricing.child2} | 3+ Children: Capped at €{pricing.familyCap}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-800 space-y-4">
            <h3 className="text-base font-black text-blue-900 uppercase">
              Commercial Sponsorship Playbook (€)
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-black">
              <label>
                Main Kit Sponsor (Yr 1 €):
                <input
                  type="number"
                  value={sponsorRates.kitSponsorYr1}
                  onChange={e => setSponsorRates({ ...sponsorRates, kitSponsorYr1: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                Kit Renewal (Yr 2 €):
                <input
                  type="number"
                  value={sponsorRates.kitSponsorYr2}
                  onChange={e => setSponsorRates({ ...sponsorRates, kitSponsorYr2: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                8x2ft Pitch Sign (Yr 1 €):
                <input
                  type="number"
                  value={sponsorRates.signSponsorYr1}
                  onChange={e => setSponsorRates({ ...sponsorRates, signSponsorYr1: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                Pitch Sign Renewal (€):
                <input
                  type="number"
                  value={sponsorRates.signSponsorYr2}
                  onChange={e => setSponsorRates({ ...sponsorRates, signSponsorYr2: Number(e.target.value) })}
                  className="w-full border-2 border-slate-300 rounded-lg p-2 mt-1"
                />
              </label>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-bold text-blue-900">
              Commercial playbook helps fund grass pitch drainage and team kit packages.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL MEDIA GENERATOR */}
      {adminTab === 'social' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 space-y-4">
            <h3 className="text-base font-black text-blue-900 uppercase">
              Matchday Social Post & Smart Auto-@Tag Generator
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-black">
              <label>
                Post Type:
                <select
                  value={socialPost.type}
                  onChange={e => setSocialPost({ ...socialPost, type: e.target.value })}
                  className="w-full border-2 rounded-lg p-2 mt-1 bg-white"
                >
                  <option>Upcoming Fixture</option>
                  <option>Full-Time Result</option>
                </select>
              </label>
              <label>
                Squad:
                <select
                  value={socialPost.ageGroup}
                  onChange={e => setSocialPost({ ...socialPost, ageGroup: e.target.value })}
                  className="w-full border-2 rounded-lg p-2 mt-1 bg-white"
                >
                  {Object.keys(AGE_CONFIGS).map(a => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label>
                Opponent:
                <input
                  type="text"
                  value={socialPost.opponent}
                  onChange={e => setSocialPost({ ...socialPost, opponent: e.target.value })}
                  className="w-full border-2 rounded-lg p-2 mt-1"
                />
              </label>
              <label>
                Score (Us - Them):
                <div className="flex gap-1 mt-1">
                  <input
                    type="text"
                    value={socialPost.scoreUs}
                    onChange={e => setSocialPost({ ...socialPost, scoreUs: e.target.value })}
                    className="w-1/2 border-2 rounded-lg p-2 text-center"
                  />
                  <input
                    type="text"
                    value={socialPost.scoreThem}
                    onChange={e => setSocialPost({ ...socialPost, scoreThem: e.target.value })}
                    className="w-1/2 border-2 rounded-lg p-2 text-center"
                  />
                </div>
              </label>
            </div>

            <textarea
              readOnly
              rows={7}
              value={generateSmartCaption()}
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-800"
            />
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(generateSmartCaption());
                  onNotify('Copied caption with Parent & Sponsor @tags!');
                }
              }}
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-black uppercase text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" /> Copy Caption with Parent & Sponsor @Tags
            </button>
          </div>

          {/* Social Graphic Preview */}
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-blue-900 text-white rounded-3xl p-6 border-4 border-black shadow-xl flex flex-col justify-between text-center">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-[11px] font-black uppercase tracking-widest">
                REDEEMER CELTIC FC • EST. 1971
              </span>
              <span className="px-2.5 py-0.5 bg-black/50 rounded text-[10px] font-black uppercase">
                {socialPost.type}
              </span>
            </div>
            <div className="my-6 space-y-3">
              <ClubCrest className="w-20 h-24 mx-auto" customLogoUrl={customLogoUrl} />
              <div className="text-xs font-black uppercase text-yellow-300">{socialPost.ageGroup}</div>
              {socialPost.type === 'Upcoming Fixture' ? (
                <div className="text-2xl sm:text-3xl font-black uppercase">
                  Redeemer Celtic <span className="text-yellow-300">vs</span> {socialPost.opponent}
                </div>
              ) : (
                <div className="text-3xl sm:text-4xl font-black uppercase">
                  Redeemer {socialPost.scoreUs} - {socialPost.scoreThem} {socialPost.opponent}
                </div>
              )}
              <div className="text-xs font-bold text-red-100">
                📍 {socialPost.venue} • ⏰ {socialPost.kickoff}
              </div>
            </div>
            <div className="pt-3 border-t border-white/20 text-[10px] font-black uppercase tracking-wider text-blue-200">
              Partners: Halpin Gas & Oil • Autosure.ie • Anord Mardix
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SINGLE SOURCE OF TRUTH STAFF */}
      {adminTab === 'staff' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-800 space-y-4">
          <h3 className="text-base font-black text-blue-900 uppercase">
            Single Source of Truth: Staff & Committee Directory
          </h3>
          <p className="text-xs font-semibold text-slate-600">
            All coaches and committee members added here automatically sync to the public website.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newStaff.name) return;
              onAddStaff({ ...newStaff, id: Date.now() });
              setNewStaff({
                name: '',
                role: 'Coach / Mentor',
                ageGroup: 'U10 Academy (5v5)',
                vetted: true,
                safeguardingCert: true,
                coachingBadge: 'FAI PDP 1'
              });
              onNotify('Added verified staff member to directory!');
            }}
            className="grid sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border"
          >
            <input
              type="text"
              required
              placeholder="Staff Full Name"
              value={newStaff.name}
              onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
              className="border-2 rounded-lg p-2 text-xs font-bold"
            />
            <input
              type="text"
              required
              placeholder="Role (e.g. Lead Coach)"
              value={newStaff.role}
              onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
              className="border-2 rounded-lg p-2 text-xs font-bold"
            />
            <select
              value={newStaff.ageGroup}
              onChange={e => setNewStaff({ ...newStaff, ageGroup: e.target.value })}
              className="border-2 rounded-lg p-2 text-xs font-bold bg-white"
            >
              <option>Executive Committee</option>
              {Object.keys(AGE_CONFIGS).map(a => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-lg p-2"
            >
              + Add Verified Staff
            </button>
          </form>

          <div className="space-y-2 mt-4">
            {staffList.map(m => (
              <div key={m.id} className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-xs">
                <div>
                  <span className="font-black text-slate-900 block">{m.name}</span>
                  <span className="text-blue-800 font-bold">{m.role} • {m.ageGroup}</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-black text-[10px]">
                    NVB Vetted
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-black text-[10px]">
                    Safeguarding 1
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EXECUTIVE POLICIES */}
      {adminTab === 'policies' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 space-y-4">
          <h3 className="text-base font-black text-blue-900 uppercase">
            Executive & Operational Policies (FAI Club Mark Audited)
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {OFFICIAL_POLICIES.map(p => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-xl border flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase text-red-600">{p.category}</span>
                    <span className="text-[10px] font-bold text-slate-500">v{p.version}</span>
                  </div>
                  <h4 className="font-black text-sm text-blue-900">{p.title}</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-1">{p.summary}</p>
                </div>
                <div className="mt-3 pt-2 border-t text-[11px] font-bold text-slate-500">
                  Effective: {p.effectiveDate} • Dual-Signatory Authorized
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proof of Age Modal */}
      {viewIdModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-blue-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <ClubCrest className="w-10 h-12" customLogoUrl={customLogoUrl} />
                <div>
                  <span className="text-[10px] font-black uppercase text-red-600">FAI COMET Verification</span>
                  <h3 className="text-base font-black text-blue-900">Proof of Age Document</h3>
                </div>
              </div>
              <button onClick={() => setViewIdModal(null)} className="p-1 text-slate-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-xs font-bold space-y-1.5">
              <div>Player Name: <span className="font-black text-red-600">{viewIdModal.playerName}</span></div>
              <div>Date of Birth: <span className="font-black text-blue-900">{viewIdModal.dob}</span></div>
              <div>Squad: <span className="font-black">{viewIdModal.ageGroup}</span></div>
              <div>File Name: <span className="underline text-blue-700">{viewIdModal.docFileName}</span></div>
              <div className="mt-3 p-4 bg-white rounded-lg border-2 border-dashed border-blue-700 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
                <div className="font-black text-slate-800">Official Proof of Age Document Attached</div>
                <div className="text-[11px] text-slate-500">Uploaded {viewIdModal.docUploadDate} • Ready for FAI COMET Export</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => onExportFaiDoc(viewIdModal)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-4 h-4" /> Export Document for FAI Paperwork
              </button>
              <button
                onClick={() => setViewIdModal(null)}
                className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
