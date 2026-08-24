"use client";

import { useEffect, useRef, useState } from "react";

const TIMING = {
  shine: 0,
  blue: 1400, // Must match ss-border-shine duration below
  holding: 2200,
  closing: 2700,
  done: 3200,
};

export default function ApiNoticeModal() {
  const [open, setOpen] = useState(false);
  // idle -> shine -> blue -> holding -> closing
  const [phase, setPhase] = useState("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("api-notice");

    if (!hasSeen) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("api-notice", "true");
    setOpen(false);
  };

  const handleContinue = () => {
    if (phase !== "idle") return;

    timers.current.forEach(clearTimeout);

    timers.current = [
      setTimeout(() => setPhase("shine"), TIMING.shine),
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
        isClosing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes ss-border-shine {
          from {
            transform: rotate(0deg) translate(-50%, -50%);
          }

          to {
            transform: rotate(360deg) translate(-50%, -50%);
          }
        }

        @keyframes ss-badge-pop {
          0% {
            transform: scale(0.92);
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }

          55% {
            transform: scale(1.06);
            box-shadow:
              0 0 20px rgba(59, 130, 246, 0.9),
              0 0 32px rgba(96, 165, 250, 0.45),
              0 8px 20px rgba(0, 0, 0, 0.18);
          }

          100% {
            transform: scale(1);
            box-shadow:
              0 0 12px rgba(59, 130, 246, 0.55),
              0 8px 20px rgba(0, 0, 0, 0.18);
          }
        }

        /*
          Masks the center of the button.
          Therefore the animation is visible only inside the existing 1px border.
        */
        .ss-border-mask {
          position: absolute;
          inset: 0;
          z-index: 10;
          overflow: hidden;
          border-radius: inherit;
          padding: 1px;
          pointer-events: none;

          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;

          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
        }

        /*
          A short blue conic-gradient segment rotates clockwise.
          The mask ensures it appears only on the button border.
        */
        .ss-border-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 460px;
          height: 460px;
          transform-origin: 0 0;

          background: conic-gradient(
            from 120deg,
            transparent 0deg,
            transparent 290deg,
            rgba(59, 130, 246, 0.2) 310deg,
            #3b82f6 332deg,
            #60a5fa 345deg,
            #3b82f6 358deg,
            transparent 360deg
          );

          animation: ss-border-shine 1400ms linear forwards;
        }

        .ss-badge-pop {
          animation: ss-badge-pop 500ms ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .ss-border-glow,
          .ss-badge-pop {
            animation-duration: 1ms;
          }
        }
      `}</style>

      <div
        className={`w-[92%] max-w-md rounded-2xl border border-zinc-700 bg-black/70 p-6 shadow-2xl backdrop-blur-sm transition-transform duration-500 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-white">
          ⚠️ Data Availability Notice
        </h2>

        <p className="mt-4 leading-7 text-gray-300">
          ScoreSource relies on third-party sports and news APIs to deliver live
          scores, fixtures, standings, and news.
        </p>

        <p className="mt-4 text-gray-300">You may occasionally experience:</p>

        <ul className="mt-3 list-inside list-disc space-y-2 text-gray-400">
          <li>Missing live scores</li>
          <li>Delayed match updates</li>
          <li>Unavailable news articles</li>
          <li>Temporary API outages</li>
          <li>Rate limit restrictions from data providers</li>
        </ul>

        <div className="mt-6 flex w-full items-center gap-2">
          <button
            type="button"
            onClick={handleContinue}
            disabled={phase !== "idle"}
            className="
              relative w-full overflow-hidden rounded-xl border border-white/30
              py-2.5 font-medium text-white
              shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
              before:absolute before:left-0 before:right-0 before:top-0 before:h-px
              before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
              before:content-['']
              transition-all duration-200
              hover:scale-[0.98] hover:bg-black/5
              active:translate-y-[2px] active:scale-[0.97]
              disabled:cursor-default disabled:hover:scale-100
            "
          >
            <span className="relative z-20">Continue</span>

            {phase === "shine" && (
              <span className="ss-border-mask" aria-hidden="true">
                <span className="ss-border-glow" />
              </span>
            )}
          </button>

          <div
            className={`
              relative flex h-[47px] w-[47px] shrink-0 items-center justify-center
              overflow-hidden rounded-full border border-white/30
              text-sm font-semibold tracking-wide text-white
              shadow-[0_8px_20px_rgba(0,0,0,0.18)]
              transition-colors duration-500
              ${isBlue ? "bg-blue-700" : "bg-black/10"}
              ${phase === "blue" ? "ss-badge-pop" : ""}
              before:absolute
              before:inset-[0.1px]
              before:rounded-full
              before:border-t
              before:border-white/60
              before:content-['']
              after:absolute
              after:left-0
              after:top-1
              after:h-4/5
              after:w-px
              after:bg-gradient-to-b
              after:from-white/50
              after:via-transparent
              after:to-transparent
              after:content-['']
            `}
          >
            <span className="relative z-10">SS</span>
          </div>
        </div>
      </div>
    </div>
  );
}