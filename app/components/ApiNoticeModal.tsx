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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[92%] max-w-md rounded-2xl bg-black/45 border border-zinc-700 p-6 shadow-2xl">
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

        <p>
          ScoreSource relies on trusted third-party providers to deliver
          today&apos;s live scores.
        </p>
        {/* <button
          onClick={closeModal}
          className="relative mt-6 w-full py-2.5 rounded-xl overflow-hidden
                     font-medium text-white bg-black/10 border border-white/30
                     shadow-[
                     0_8px_32px_rgba(0,0,0,0.1),
                     inset_0_1px_0_rgba(255,255,255,0.5),
                     inset_0_-1px_0_rgba(255,255,255,0.1),
                     inset_0_0_4px_2px_rgba(255,255,255,0.2)
                     ]
                     before:content-['']
                     before:absolute
                     before:top-0
                     before:left-0
                     before:right-0
                     before:h-px
                     before:bg-gradient-to-r
                     before:from-transparent
                   before:via-white/80
                     before:to-transparent

                     after:content-['']
                     after:absolute
                     after:top-0
                     after:left-0
                     after:w-px
                     after:h-full
                     after:bg-gradient-to-b
                   after:from-white/80
                     after:via-transparent
                   after:to-white/30

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
                     duration-200 "
        >
          Continue
        </button> */}
        <div className="mt-6 flex w-full items-center gap-2">
          {/* Continue Button */}
          <button
            onClick={closeModal}
            className="
      relative
      w-full
      py-2.5
      rounded-xl
      overflow-hidden

      font-medium
      text-white

    
      border border-white/30

      shadow-[
        0_8px_32px_rgba(0,0,0,0.1),
        inset_0_1px_0_rgba(255,255,255,0.5),
        inset_0_-1px_0_rgba(255,255,255,0.1),
        inset_0_0_4px_2px_rgba(255,255,255,0.2)
      ]

      before:content-['']
      before:absolute
      before:top-0
      before:left-0
      before:right-0
      before:h-px
      before:bg-gradient-to-r
      before:from-transparent
      before:via-white/80
      before:to-transparent

      after:content-['']
      after:absolute
      after:top-0
      after:left-0
      after:w-px
      after:h-full
      after:bg-gradient-to-b
      after:from-white/80
      after:via-transparent
      after:to-white/30

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
          </button>

          <div
            className="
    relative
    h-[42px]
    w-[42px]
    shrink-0
    rounded-full
    overflow-hidden

    flex
    items-center
    justify-center

    text-xs
    font-semibold
    tracking-wide
    text-white

    bg-black/10
    border border-white/30

    shadow-[
      0_8px_20px_rgba(0,0,0,0.18),
      inset_0_1px_0_rgba(255,255,255,0.5),
      inset_0_-1px_0_rgba(255,255,255,0.1),
      inset_0_0_4px_2px_rgba(255,255,255,0.18)
    ]

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
  "
          >
            <span className="relative z-10">SS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
