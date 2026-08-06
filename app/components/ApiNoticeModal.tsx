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
          ScoreSource relies on third-party sports and news APIs to deliver
          live scores, fixtures, standings, and news.
        </p>

        <p className="mt-4 text-gray-300">
          You may occasionally experience:
        </p>

        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
          <li>Missing live scores</li>
          <li>Delayed match updates</li>
          <li>Unavailable news articles</li>
          <li>Temporary API outages</li>
          <li>Rate limit restrictions from data providers</li>
        </ul>

        <p>
           ScoreSource relies on trusted third-party providers to deliver today&apos;s live scores.
        </p>
   
        <button
          onClick={closeModal}
          className="mt-6 w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}