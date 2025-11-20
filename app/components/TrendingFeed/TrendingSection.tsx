"use client";

import React from "react";
import PlayerItem from "./PlayerItem";
import { TrendingPlayer } from "../types";
import TrendingSkeleton from "./TrendingSkeleton";

interface TrendingSectionProps {
  topic: string;
  players: TrendingPlayer[];
  color: string;
  textColor: string;
  loading: boolean;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ topic, loading,players, color, textColor }) => (
  <div className="mb-4 border border-gray-500 rounded-md p-3">
    <div className={`p-2 rounded-md bg-${color}`}>
      <p className={`text-xs sm:text-sm ${textColor}`}>Trending in {topic}</p>
    </div>
   
  {loading ? (
    <TrendingSkeleton />
    ) : players.length === 0 ? (
     <p className="text-xs text-gray-500">No trending players</p>
    ) : (
       <div className="ml-4 mr-4">
      <ul>
        {players.map(player => (
          <PlayerItem key={player.name} player={player} />
        ))}
      </ul>
    </div>
     )}
  </div>
);

export default TrendingSection;
