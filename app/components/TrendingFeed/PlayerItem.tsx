"use client";

import React, { memo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TrendingPlayer } from "../types";

interface PlayerItemProps {
  player: TrendingPlayer;
}

const PlayerItem = memo(function PlayerItem({ player }: PlayerItemProps)  {
return (
  <li className="flex justify-between items-center mt-2 text-xs sm:text-sm">
    <span className="truncate">{player.name}</span>

    <div className="relative group flex items-center">
      <IoInformationCircleOutline className="cursor-pointer text-gray-400 hover:text-white" />

      <div className="absolute right-full top-1/2 mr-2 -translate-y-1/2 w-44 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-50 pointer-events-none">
        <div className=" absolute right-[-6px] top-1/2 -translate-y-1/2
                        w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent
                        border-l-[6px] border-l-neutral-900/50 pointer-events-none z-0" />
        <div className="relative rounded-md bg-neutral-900/50  text-white text-[11px] p-2 shadow-lg z-10">
          <p className="font-medium mb-0.5 text-gray-300">Why trending</p>
          <p className="line-clamp-2 text-gray-200">{player.reason}</p>
        </div>
      </div>
    </div>
  </li>
)})

export default PlayerItem;
