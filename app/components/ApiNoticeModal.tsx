"use client";

import { useEffect, useState } from "react";

export default function ApiNoticeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("api-notice");

    if (!hasSeen) {
      setOpen(true);
    }
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("api-notice", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-xl p-5">

      {/* Background Glow */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />

      {/* Glass Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

        {/* Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-80" />

        {/* Top Shine */}
        <div className="absolute left-6 right-6 top-0 h-px bg-white/60" />

        {/* Floating Glow */}
        <div className="absolute -left-20 top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative z-10 p-8">

          {/* Header */}
          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/20 bg-white/15 text-3xl backdrop-blur-2xl shadow-lg">
              ⚠️
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Data Availability Notice
              </h2>

              <p className="mt-1 text-sm text-white/70">
                Live scores and news are powered by external APIs.
              </p>
            </div>

          </div>

          {/* Description */}

          <p className="mt-8 leading-8 text-white/80">
            ScoreSource relies on trusted third-party sports and news providers
            to deliver real-time scores, fixtures, standings and headlines.
          </p>

          <p className="mt-4 leading-8 text-white/80">
            Occasionally, you may notice delayed updates or unavailable content
            due to API rate limits, maintenance, or temporary outages from the
            data provider.
          </p>

          {/* Features */}

          <div className="mt-8 space-y-3">

            {[
              "Live scores may be delayed",
              "Some matches may not appear",
              "News articles may be temporarily unavailable",
              "API providers can enforce request limits",
              "Temporary maintenance may affect updates",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
              >
                <div className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}

          </div>

          {/* Footer */}

          <p className="mt-8 text-sm text-white/60">
            These limitations are temporary and outside the control of
            ScoreSource.
          </p>

          {/* Button */}

          <button
            onClick={closeModal}
            className="group mt-8 w-full rounded-2xl border border-white/20 bg-white/15 py-4 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/25 active:scale-95"
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  );
}