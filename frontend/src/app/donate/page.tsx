'use client';

import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, Award, Sparkles, CreditCard } from 'lucide-react';

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Vedic Education & Pathashala');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000];
  const causes = ['Vedic Education & Pathashala', 'Senior Elder Care', 'Heritage Cultural Preservation', 'Youth Vidya Scholarship'];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D96C8F]/15 text-[#D96C8F]">
          <Heart className="h-6 w-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F]">Bhandhavya Seva Donation</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Every contribution directly supports Vedic scholars, community elder care, and cultural preservation programs. Contributions are open to guests and members alike.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Donation Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          {donationSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Thank You for Your Sacred Contribution!</h2>
              <p className="text-xs text-gray-600">
                Your donation of <strong>₹{customAmount || amount}</strong> towards <em>{selectedCause}</em> has been recorded. A receipt has been issued.
              </p>
              <button
                onClick={() => setDonationSuccess(false)}
                className="glass-button-primary rounded-full px-6 py-2.5 text-xs font-bold"
              >
                Make Another Contribution
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="space-y-6">
              {/* Select Cause */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1E3A5F]">Select Seva Cause</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {causes.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCause(c)}
                      className={`p-3 rounded-2xl text-xs font-semibold text-left border transition-all ${
                        selectedCause === c
                          ? 'bg-[#234E70] text-white border-[#234E70]'
                          : 'bg-white/50 text-[#1E3A5F] border-gray-200 hover:bg-white/80'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Amount */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1E3A5F]">Select Amount (INR)</label>
                <div className="grid grid-cols-4 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        amount === amt && !customAmount
                          ? 'bg-[#D96C8F] text-white border-[#D96C8F]'
                          : 'bg-white/50 text-[#1E3A5F] border-gray-200'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="pt-1">
                  <input
                    type="number"
                    placeholder="Or enter custom amount in ₹"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(e.target.value);
                    }}
                    className="glass-input w-full px-4 py-2.5 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Donor Details */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-[#1E3A5F]">Donor Information (Optional for Guests)</label>
                <input
                  type="text"
                  placeholder="Full Name / Family Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 text-xs font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Address for Receipt"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="glass-button-primary w-full rounded-full py-3.5 text-sm font-bold shadow-xl flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Proceed to Secure Contribution (₹{customAmount || amount})</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Transparency & Trust */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-4 border-t-4 border-t-[#8FAF88]">
            <div className="flex items-center space-x-2 text-[#1E3A5F]">
              <ShieldCheck className="h-5 w-5 text-[#8FAF88]" />
              <h3 className="text-sm font-bold">100% Financial Transparency</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bhandhavya Seva Trust publishes quarterly audited financial reports. Every rupee received is allocated directly to Vedic stipends and elder healthcare.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3">
            <h4 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider">Impact Breakdown</h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#D96C8F]" />
                <span><strong>₹500</strong>: Textbooks for 1 Vedic student</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#234E70]" />
                <span><strong>₹1,000</strong>: Monthly stipend for youth scholar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#F4A300]" />
                <span><strong>₹2,500</strong>: Elder medical health checkups</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#1F7A8C]" />
                <span><strong>₹5,000</strong>: Annual Vidya Sambhavana grant</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
