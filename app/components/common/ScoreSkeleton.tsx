import React from "react";

const ScoreSkeleton = () => {
  return (
    <div className="border p-3 mb-4 rounded-xl bg-black bg-opacity-40 border-gray-600 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-700/50" />
          <div className="h-3 w-10 bg-gray-700/50 rounded" />
        </div>

        <div className="h-3 w-6 bg-gray-700/50 rounded" />

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-700/50" />
          <div className="h-3 w-10 bg-gray-700/50 rounded" />
        </div>
      </div>

      <div className="flex justify-between text-xs mb-2">
        <div className="h-3 w-16 bg-gray-700/50 rounded" />
        <div className="h-3 w-16 bg-gray-700/50 rounded" />
      </div>

      <div className="h-2 w-24 bg-gray-700/50 rounded mt-2" />
    </div>
  );
};

export default ScoreSkeleton;
