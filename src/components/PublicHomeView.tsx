import React, { useState } from 'react';
import {
  Shield, Users, MapPin, Mail, FileText, CheckCircle, ExternalLink,
  BookOpen, Award, ChevronRight, Share2
} from 'lucide-react';
import { ClubCrest } from './ClubCrest.tsx';
import { AGE_CONFIGS, OFFICIAL_SPONSORS } from '../data/clubData.ts';
import { StaffMember, PlayerRegistration, ViewMode } from '../types.ts';
import { PricingConfig, calculateMembershipFee } from '../utils/faiRules.ts';

interface PublicHomeViewProps {
  pricing: PricingConfig;
  staffList: StaffMember[];
  onRegisterSubmit: (reg: PlayerRegistration) => void;
  onNavigate: (view: ViewMode) => void;
  customLogoUrl?: string | null;
  onNotify: (msg: string) => void;
}

export const PublicHomeView: React.FC<PublicHomeViewProps> = ({
  pricing,
  staffList,
  onRegisterSubmit,
  onNavigate,
  customLogoUrl,
  onNotify
}) => {
  const [regForm, setRegForm] = useState({
    playerName: '',
    dob: '',
    ageGroup: 'U8 Academy (4v4)',
    childrenCount: 1,
    parentName: '',
    phone: '',
    socialHandle: '',
    medical: '',
    docFileName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: PlayerRegistration = {
      id: Date.now(),
      playerName: regForm.playerName,
      dob: regForm.dob,
      ageGroup: regForm.ageGroup,
      parentName: regForm.parentName,
      phone: regForm.phone,
      socialHandle: regForm.socialHandle || '@parent_unlisted',
      medical: regForm.medical || 'None',
      docFileName: regForm.docFileName || `${regForm.playerName.replace(/\s+/g, '_')}_ProofOfAge_FAI.pdf`,
      docUploadDate: new Date().toLocaleDateString('en-IE'),
      docVerified: true,
      present: true
    };
    onRegisterSubmit(newEntry);
    setRegForm({
      playerName: '',
      dob: '',
      ageGroup: 'U8 Academy (4v4)',
      childrenCount: 1,
      parentName: '',
      phone: '',
      socialHandle: '',
      medical: '',
      docFileName: ''
    });
  };

  const calculatedFee = calculateMembershipFee(regForm.childrenCount, pricing);

  return (
    <div className="space-y-10">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-black relative overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">
              <Shield className="w-3.5 h-3.5 text-yellow-300" /> FAI Club Mark Accredited • DSL & NEFL Affiliated
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
              Redeemer Celtic FC
            </h1>
            <p className="text-sm sm:text-base font-bold text-red-100 max-w-2xl leading-relaxed">
              Founded in 1971 in Cox’s Demesne, Dundalk, Co. Louth. Proudly developing over 250 youth and senior players at Noel Gorman Park in a safe, child-first, FAI Player Development Plan (PDP) community environment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#register-section"
                className="px-5 py-3 bg-white text-red-700 font-black rounded-xl text-xs sm:text-sm uppercase shadow-lg hover:bg-slate-100 transition-all border-2 border-black"
              >
                Register Player (2026/27) &rarr;
              </a>
              <button
                onClick={() => onNavigate('coaches_app')}
                className="px-5 py-3 bg-red-600 text-white font-black rounded-xl text-xs sm:text-sm uppercase border-2 border-white hover:bg-red-700 flex items-center gap-2 transition-all shadow"
              >
                <BookOpen className="w-4 h-4" /> Launch Coaches App &rarr;
              </button>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/?app=coaches`;
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(url);
                    onNotify('Copied Standalone Coaches App link: ' + url);
                  }
                }}
                className="px-4 py-3 bg-white/20 text-white font-black rounded-xl text-xs sm:text-sm uppercase border border-white hover:bg-white/30 flex items-center gap-2 transition-all shadow"
                title="Copy shareable link for coaches"
              >
                <Share2 className="w-4 h-4 text-yellow-300" /> Copy Coaches Link
              </button>
              <button
                onClick={() => onNavigate('clubmark')}
                className="px-5 py-3 bg-black/40 text-white font-black rounded-xl text-xs sm:text-sm uppercase border border-white/40 hover:bg-black/60 flex items-center gap-2 transition-all shadow"
              >
                <Award className="w-4 h-4 text-yellow-300" /> FAI Club Mark Audit
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white/10 p-6 rounded-2xl border-2 border-white/20 shadow-inner">
            <ClubCrest className="w-28 h-32 mb-3" customLogoUrl={customLogoUrl} />
            <div className="grid grid-cols-3 gap-2 w-full text-center pt-2 border-t border-white/20">
              <div>
                <div className="text-xl font-black">1971</div>
                <div className="text-[10px] uppercase font-bold text-red-200">Founded</div>
              </div>
              <div>
                <div className="text-xl font-black">250+</div>
                <div className="text-[10px] uppercase font-bold text-red-200">Players</div>
              </div>
              <div>
                <div className="text-xl font-black">32 Wk</div>
                <div className="text-[10px] uppercase font-bold text-red-200">Curriculum</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FEATURE TILES */}
      <section className="grid sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('coaches_app')}
          className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-red-600 hover:border-blue-800 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase text-red-600">Standalone App</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-black text-[10px]">Share Link</span>
            </div>
            <h3 className="text-base font-black text-blue-900 group-hover:text-red-600 mt-0.5">
              Dedicated Coaches App
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Independent mobile-ready app with 32-week drills, pitch-side equal playing time logger, and Noel Gorman Park EAP.
            </p>
          </div>
          <div className="mt-3 text-xs font-black text-red-600 flex items-center gap-1">
            Open Standalone App <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('clubmark')}
          className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-blue-800 hover:border-red-600 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-blue-800">Governance Accreditation</span>
            <h3 className="text-base font-black text-blue-900 group-hover:text-red-600 mt-0.5">
              FAI Club Mark & One Star PDC
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Interactive criteria audit matrix, Player Development Plan compliance tracking, and FAI report exports.
            </p>
          </div>
          <div className="mt-3 text-xs font-black text-red-600 flex items-center gap-1">
            View Audit Matrix <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('documents')}
          className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-slate-900 hover:border-red-600 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-slate-500">Statutory Welfare</span>
            <h3 className="text-base font-black text-blue-900 group-hover:text-red-600 mt-0.5">
              Policy & Governance Library
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Child Safeguarding Statement 2026.1, Positive Sidelines Code, Concussion protocols, and GDPR policies.
            </p>
          </div>
          <div className="mt-3 text-xs font-black text-slate-800 flex items-center gap-1">
            Explore Policies <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* HERITAGE & SINGLE SOURCE OF TRUTH STAFF DIRECTORY */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 space-y-4">
          <h2 className="text-xl font-black text-blue-900 uppercase">
            Our Club Heritage (Est. 1971) & FAI Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
            For more than half a century, Redeemer Celtic FC has been an anchor of community and youth sports development at Noel Gorman Park, Cox’s Demesne, Dundalk. Every mentor completes statutory National Vetting Bureau (NVB) Garda Vetting and FAI Safeguarding 1 certification before taking sessions on the grass pitch.
          </p>
          <div className="bg-blue-50 border-2 border-blue-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase text-red-600">Official Club Mark Policies</div>
              <div className="text-sm font-black text-blue-900">
                Child Safeguarding, Codes of Conduct, Anti-Bullying, and Concussion Policies
              </div>
            </div>
            <button
              onClick={() => onNavigate('documents')}
              className="shrink-0 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-lg shadow"
            >
              Policy Library &rarr;
            </button>
          </div>
        </div>

        {/* Dynamic Staff Directory */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-700 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-blue-900 uppercase flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-red-600" /> Verified Club Staff
            </h3>
            <p className="text-[11px] font-bold text-slate-500 mb-3">
              Single Source of Truth Directory (Managed via Admin Panel)
            </p>
            {staffList.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 text-center">
                <div className="text-xs font-black text-slate-700">Assigned via Master Admin Panel</div>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">
                  Zero fake placeholder names. Add coaches in Master Admin to display them automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {staffList.map(m => (
                  <div key={m.id} className="p-2.5 bg-slate-50 rounded-lg border flex justify-between items-center text-xs">
                    <div>
                      <div className="font-black text-slate-900">{m.name}</div>
                      <div className="text-[11px] font-bold text-blue-700">{m.role} • {m.ageGroup}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-black text-[10px]">
                      NVB Vetted
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Club Email:</span>
            <a href="mailto:redeemerceltic@gmail.com" className="text-red-600 font-black hover:underline">
              redeemerceltic@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="register-section" className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-blue-800">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-wider">2026/2027 Season Signups</span>
            <h2 className="text-2xl font-black text-blue-900 uppercase">FAI & GDPR Player Registration</h2>
          </div>
          <div className="bg-red-50 border-2 border-red-600 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] font-black uppercase text-red-700">Calculated Membership Fee</div>
            <div className="text-2xl font-black text-slate-900">€{calculatedFee}</div>
            <div className="text-[10px] font-bold text-slate-600">
              1st: €{pricing.child1} | 2nd: +€{pricing.child2} | Family Cap: €{pricing.familyCap}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Player Full Name *</label>
            <input
              type="text"
              required
              value={regForm.playerName}
              onChange={e => setRegForm({ ...regForm, playerName: e.target.value })}
              placeholder="Enter player full name"
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              required
              value={regForm.dob}
              onChange={e => setRegForm({ ...regForm, dob: e.target.value })}
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Squad / Age Group *</label>
            <select
              value={regForm.ageGroup}
              onChange={e => setRegForm({ ...regForm, ageGroup: e.target.value })}
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold bg-white focus:border-blue-700 outline-none"
            >
              {Object.keys(AGE_CONFIGS).map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Parent / Guardian Name *</label>
            <input
              type="text"
              required
              value={regForm.parentName}
              onChange={e => setRegForm({ ...regForm, parentName: e.target.value })}
              placeholder="Parent / Guardian full name"
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Emergency Phone *</label>
            <input
              type="tel"
              required
              value={regForm.phone}
              onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
              placeholder="087 000 0000"
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-blue-800 mb-1">
              Parent Social Handle (Optional Auto-@Tag)
            </label>
            <input
              type="text"
              value={regForm.socialHandle}
              onChange={e => setRegForm({ ...regForm, socialHandle: e.target.value })}
              placeholder="@parent_social"
              className="w-full border-2 border-blue-300 bg-blue-50/40 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">Number of Children</label>
            <select
              value={regForm.childrenCount}
              onChange={e => setRegForm({ ...regForm, childrenCount: Number(e.target.value) })}
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold bg-white"
            >
              <option value={1}>1 Child (€{pricing.child1})</option>
              <option value={2}>2 Children (€{pricing.child1 + pricing.child2})</option>
              <option value={3}>3+ Children (Family Cap €{pricing.familyCap})</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-black uppercase text-slate-700 mb-1">
              Medical Conditions / Allergies (Strictly Confidential)
            </label>
            <input
              type="text"
              value={regForm.medical}
              onChange={e => setRegForm({ ...regForm, medical: e.target.value })}
              placeholder="State any asthma, allergies, or 'None'"
              className="w-full border-2 border-slate-300 rounded-lg p-2.5 text-xs font-bold focus:border-blue-700 outline-none"
            />
          </div>

          {/* FAI Proof of Age Upload */}
          <div className="sm:col-span-2 lg:col-span-3 bg-slate-50 p-4 rounded-xl border-2 border-dashed border-blue-700">
            <label className="block text-xs font-black uppercase text-blue-900 mb-1">
              Upload FAI Proof of Age / Passport / Birth Cert (Required for FAI COMET Registration) *
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              required
              onChange={e => {
                const file = e.target.files && e.target.files[0];
                if (file) setRegForm({ ...regForm, docFileName: file.name });
              }}
              className="text-xs font-bold text-slate-700 w-full"
            />
          </div>

          {/* GDPR Agreement */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-2 text-xs font-bold text-slate-700 bg-slate-50 p-3.5 rounded-xl border">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-red-600" />
              <span>
                I consent to Redeemer Celtic FC storing this registration & medical data in compliance with GDPR and FAI COMET regulations, and I agree to the Positive Sidelines Code of Conduct.
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-blue-700" />
              <span>
                I consent to team-oriented photography (no underage names paired with pictures) and social media fixture updates.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-3 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-xl shadow-lg text-sm border-2 border-black"
          >
            Complete FAI Registration (€{calculatedFee})
          </button>
        </form>
      </section>

      {/* OFFICIAL CLUB SPONSORS (NO MONETARY AMOUNTS PUBLICLY) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-t-4 border-red-600">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-black uppercase text-red-600 tracking-widest">
            Supporting Dundalk Grassroots Football
          </span>
          <h2 className="text-2xl font-black text-blue-900 uppercase mt-1">Official Club Partners</h2>
          <p className="text-xs font-bold text-slate-600 mt-1">
            Click any partner below to visit their official website. Interested in sponsoring Redeemer Celtic FC? Email{' '}
            <a href="mailto:redeemerceltic@gmail.com" className="text-red-600 underline">redeemerceltic@gmail.com</a>.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {OFFICIAL_SPONSORS.map(sponsor => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-50 hover:bg-blue-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase rounded">
                    {sponsor.tier}
                  </span>
                  <ExternalLink className="w-4 h-4 text-blue-700 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h3 className="text-lg font-black text-blue-900 group-hover:text-red-600">{sponsor.name}</h3>
                <p className="text-xs font-semibold text-slate-600 mt-1">{sponsor.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-black text-blue-800">
                <span>Visit {sponsor.name}</span>
                <span>{sponsor.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* VOLUNTEER FUNNEL & BOOT ROOM */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-800">
          <span className="text-[11px] font-black uppercase text-red-600">FAI Safe Recruitment Standard</span>
          <h3 className="text-lg font-black text-blue-900 uppercase mt-0.5 mb-3">
            5-Step Volunteer & Coach Onboarding Funnel
          </h3>
          <div className="space-y-2 text-xs font-bold text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-lg border-l-4 border-red-600">
              <strong>1. Application & Role Profile:</strong> Standard volunteer interest form and club values sign-off.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border-l-4 border-blue-700">
              <strong>2. Reference Verification:</strong> Two independent references validated by CCO.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border-l-4 border-red-600">
              <strong>3. Garda Vetting (NVB):</strong> Mandatory clearance via FAI Connect prior to coaching.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border-l-4 border-blue-700">
              <strong>4. Safeguarding 1 Course:</strong> FAI Child Welfare Basic Awareness certification verified.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border-l-4 border-red-600">
              <strong>5. Induction & Shadowing:</strong> Orientation with CCO and shadowing a lead coach on pitch.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-red-600 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-black uppercase text-blue-800">Community Recycling</span>
            <h3 className="text-lg font-black text-blue-900 uppercase mt-0.5 mb-3">
              Redeemer Boot Room & Club Gear Swap
            </h3>
            <p className="text-xs font-semibold text-slate-600 mb-4">
              Pass on outgrown football boots, shin guards, and official training gear to younger Academy players at Noel Gorman Park.
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex justify-between items-center font-bold">
                <span>Adidas Moulded Studs (Child Size 13) — Clean</span>
                <span className="px-2 py-1 bg-blue-800 text-white rounded text-[10px] font-black">
                  AVAILABLE AT CLUBHOUSE
                </span>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex justify-between items-center font-bold">
                <span>Redeemer Celtic Half-Zip Top (Age 9–10)</span>
                <span className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-black">
                  AVAILABLE
                </span>
              </div>
            </div>
          </div>
          <a
            href="mailto:redeemerceltic@gmail.com?subject=Volunteer%20or%20Boot%20Room%20Donation"
            className="mt-4 w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-black text-xs uppercase rounded-xl text-center block shadow"
          >
            Email redeemerceltic@gmail.com to Volunteer or Donate Gear
          </a>
        </div>
      </section>

      {/* LOCATION & GOOGLE MAP */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-red-600 grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-full">
            Find Us in Dundalk, Co. Louth
          </div>
          <h2 className="text-2xl font-black uppercase">Contact & Pitch Location</h2>
          <div className="space-y-2.5 text-xs sm:text-sm font-bold text-slate-200">
            <p className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-red-500 shrink-0" />
              <span>Noel Gorman Park, Cox’s Demesne, Dundalk, Co. Louth (Eircode: A91 XD26)</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <a href="mailto:redeemerceltic@gmail.com" className="underline hover:text-red-400">
                redeemerceltic@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-red-500 shrink-0" />
              <span>Tusla Louth: 042 935 3800 • Dundalk Garda Station: 042 938 8400</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Noel+Gorman+Park+Avenue+Road+Dundalk+Louth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl flex items-center gap-1.5 shadow"
            >
              <MapPin className="w-4 h-4" /> Open Directions in Google Maps
            </a>
            <a
              href="https://www.facebook.com/p/Redeemer-Celtic-100089078711126/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-black text-xs uppercase rounded-xl flex items-center gap-1.5 shadow"
            >
              <ExternalLink className="w-4 h-4" /> Official Facebook Page
            </a>
          </div>
        </div>

        <div className="h-64 w-full bg-slate-800 rounded-2xl overflow-hidden border-2 border-white">
          <iframe
            title="Redeemer Celtic FC Noel Gorman Park Map"
            src="https://maps.google.com/maps?q=Noel+Gorman+Park,+Avenue+Road,+Dundalk,+Louth&t=&z=15&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
