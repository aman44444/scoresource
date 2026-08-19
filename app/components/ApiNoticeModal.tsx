"use client";

import { useEffect, useRef, useState } from "react";

// Sequence timings (ms), all relative to the Continue click.
const TIMING = {
  shine: 0, // shine sweep starts
  impact: 1050, // shine reaches the badge
  blue: 1200, // badge turns dark blue
  holding: 1700, // badge fully settled, start 1s hold
  closing: 2700, // hold done, modal fades out
  done: 3200, // modal fully closed -> page opens
};

export default function ApiNoticeModal() {
  const [open, setOpen] = useState(false);
  // idle -> shine -> impact -> blue -> holding -> closing
  const [phase, setPhase] = useState("idle");
  const timers = useRef([]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("api-notice");
    if (!hasSeen) setOpen(true);
  }, []);

  // Clear any pending timers on unmount so we never call setState after unmount.
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("api-notice", "true");
    setOpen(false);
  };

  const handleContinue = () => {
    if (phase !== "idle") return; // ignore clicks mid-animation
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setPhase("shine"), TIMING.shine),
      setTimeout(() => setPhase("impact"), TIMING.impact),
      setTimeout(() => setPhase("blue"), TIMING.blue),
      setTimeout(() => setPhase("holding"), TIMING.holding),
      setTimeout(() => setPhase("closing"), TIMING.closing),
      setTimeout(closeModal, TIMING.done),
    ];
  };

  if (!open) return null;

  const isClosing = phase === "closing";
  const isBlue = phase === "blue" || phase === "holding" || phase === "closing";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-500 ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes ss-shine {
          0%   { transform: translateX(-120%) skewX(-16deg); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(520%) skewX(-16deg); opacity: 0; }
        }
        @keyframes ss-impact {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          30%  { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
        @keyframes ss-pulse {
          0%   { opacity: 0; transform: scale(0.7); }
          40%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 0.9; transform: scale(1); }
        }
        .ss-shine-run  { animation: ss-shine 1050ms ease-in-out forwards; will-change: transform, opacity; }
        .ss-impact-run { animation: ss-impact 420ms ease-out forwards; will-change: transform, opacity; }
        .ss-pulse-run  { animation: ss-pulse 900ms ease-out forwards; will-change: transform, opacity; }
      `}</style>

      <div
        className={`w-[92%] max-w-md rounded-2xl bg-black/70 backdrop-blur-sm border border-zinc-700 p-6 shadow-2xl transition-transform duration-500 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-white">
          ⚠️ Data Availability Notice
        </h2>

        <p className="mt-4 text-gray-300 leading-7">
          ScoreSource relies on third-party sports and news APIs to deliver live
          scores, fixtures, standings, and news.
        </p>

        <p className="mt-4 text-gray-300">You may occasionally experience:</p>

        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
          <li>Missing live scores</li>
          <li>Delayed match updates</li>
          <li>Unavailable news articles</li>
          <li>Temporary API outages</li>
          <li>Rate limit restrictions from data providers</li>
        </ul>

        <div className="mt-6 flex w-full items-center gap-2">
          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={phase !== "idle"}
            className="
              relative w-full py-2.5 rounded-xl overflow-hidden
              font-medium text-white
              border border-white/30
              shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
              before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px
              before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
  
              active:translate-y-[1px]
              transition-[transform,background-color] duration-150
              disabled:cursor-default  
               hover:bg-black/5
               hover:scale-[0.98]

               hover:shadow-[
                inset_0_1px_2px_rgba(255,255,255,0.45),
                 inset_0_-2px_3px_rgba(0,0,0,0.5),
                0_3px_0_rgba(255,255,255,0.08),
                0_7px_0_rgba(0,0,0,0.4),
                0_14px_25px_rgba(0,0,0,0.4)
              ]

              active:translate-y-[2px]
              active:scale-[0.97]

              transition-all
              duration-200
            "
          >
            Continue
            {phase === "shine" && (
              <span
                className="ss-shine-run pointer-events-none absolute top-0 left-0 h-full w-1/5"
                style={{
                  background:
                    "linear-gradient(75deg, transparent 0%, rgba(37,99,235,0.15) 35%, rgba(96,165,250,0.85) 47%, rgba(219,234,254,1) 50%, rgba(96,165,250,0.85) 53%, rgba(37,99,235,0.15) 65%, transparent 100%)",
                }}
              />
            )}
          </button>

          {/* SS badge */}
          <div
            className={`
              relative h-[47px] w-[47px] shrink-0 rounded-full overflow-hidden
              flex items-center justify-center text-sm font-semibold tracking-wide text-white
              border border-white/30
              shadow-[0_8px_20px_rgba(0,0,0,0.18)]
              transition-colors duration-500
              ${isBlue ? "bg-[#0b1f5c]" : "bg-black/10"}
               before:content-['']
              before:absolute
              before:inset-[0.1px]
              before:rounded-full
              before:border-t
              before:border-white/60

              after:content-['']
              after:absolute
              after:top-1
              after:left-0
              after:w-px
              after:h-4/5
              after:bg-gradient-to-b
              after:from-white/50
              after:via-transparent
              after:to-transparent
            `}
          >
            {phase === "impact" && (
              <span
                className="ss-impact-run pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(96,165,250,0.85), rgba(29,78,216,0.55), transparent 70%)",
                }}
              />
            )}

            {phase === "blue" && (
              <span
                className="ss-pulse-run pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.55), transparent 70%)",
                }}
              />
            )}

            <span className="relative z-10">SS</span>
          </div>
        </div>
      </div>
    </div>
  );
}