"use client";

import React, { useState, useEffect } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { soccerPlayers, cricketPlayers, tennisPlayers } from "../utils/player";

interface Article {
  title: string;
  excerpt: string;
}

interface TrendingPlayer {
  name: string;
  reason: string;
}

const TrendingFeed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [trendingSoccer, setTrendingSoccer] = useState<TrendingPlayer[]>([]);
  const [trendingCricket, setTrendingCricket] = useState<TrendingPlayer[]>([]);
  const [trendingTennis, setTrendingTennis] = useState<TrendingPlayer[]>([]);

  const extractTrending = (
    articles: Article[],
    playerList: string[]
  ): TrendingPlayer[] => {
    const playerMap: Record<string, string[]> = {};

    articles.forEach((article) => {
      playerList.forEach((player) => {
        const regex = new RegExp(`\\b${player}\\b`, "i");
        if (regex.test(article.title)) {
          if (!playerMap[player]) {
            playerMap[player] = [];
          }
          playerMap[player].push(article.title);
        }
      });
    });

    return Object.entries(playerMap)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 3)
      .map(([name, titles]) => ({
        name,
        reason: titles[0],
      }));
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const currentDate = getCurrentDate();

      const url = `https://news-api14.p.rapidapi.com/v2/trendings?date=${currentDate}&topic=Sports&language=en&limit=50`;

      try {
        const response = await fetch(url, {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY || "",
            "x-rapidapi-host": "news-api14.p.rapidapi.com",
          },
        });

        const data = await response.json();

        const articles: Article[] = data.data.map((item: Article) => ({
          title: item.title,
          excerpt: item.excerpt,
        }));

        setTrendingSoccer(extractTrending(articles, soccerPlayers));
        setTrendingCricket(extractTrending(articles, cricketPlayers));
        setTrendingTennis(extractTrending(articles, tennisPlayers));
      } catch (err) {
        console.error("News fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const PlayerItem = ({ player }: { player: TrendingPlayer }) => (
    <li className="flex justify-between items-center mt-2 text-xs sm:text-sm">
      <span>{player.name}</span>

      {/* Icon + Tooltip */}
      <div className="relative group">
        <IoInformationCircleOutline className="cursor-pointer text-gray-400" />
        
        {/* Tooltip */}
        <div
          className="
          absolute right-full top-1/2 mr-2 -translate-y-1/2
          w-44 opacity-0 scale-95
          group-hover:opacity-100 group-hover:scale-100
          transition-all duration-150 z-50
          overflow-visible
        "
        >
          <div
            className="
            absolute right-[-5px] top-1/2 -translate-y-1/2
            w-0 h-0
            border-t-[6px] border-t-transparent
             border-b-[6px] border-b-transparent
                 border-l-[6px] border-l-neutral-900/50
             z-10 pointer-events-none
            "
          />

          <div className=" relative rounded-md z-10 bg-neutral-900/50 backdrop-blur-sm  text-white text-[11px] p-2 shadow-lg">
            <p className="font-medium mb-0.5 text-gray-300">Why trending</p>
            <p className="line-clamp-2 text-gray-200">{player.reason}</p>
          </div>
        </div>
      </div>
    </li>
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-3 rounded-md h-full">
      <p className="text-sm text-gray-500 border-b border-gray-500 mb-4 p-4">
        Trending
      </p>

      {/* Football */}
      <div className="mb-4 border border-gray-500 rounded-md p-3">
        <div className="bg-blue-400/20 p-2 rounded-md">
          <p className="text-xs sm:text-sm text-blue-300">
            Trending in Football
          </p>
        </div>
        <div className="ml-4 mr-4">
          <ul>
            {trendingSoccer.map((p) => (
              <PlayerItem key={p.name} player={p} />
            ))}
          </ul>
        </div>
      </div>

      {/* Cricket */}
      <div className="mb-4 border border-gray-500 rounded-md p-3">
        <div className="bg-green-400/20 p-2 rounded-md">
          <p className="text-xs sm:text-sm text-green-300">
            Trending in Cricket
          </p>
        </div>
        <div className="ml-4 mr-4">
          <ul>
            {trendingCricket.map((p) => (
              <PlayerItem key={p.name} player={p} />
            ))}
          </ul>
        </div>
      </div>

      {/* Tennis */}
      <div className="border border-gray-500 rounded-md p-3">
        <div className="bg-red-400/20 p-2 rounded-md">
          <p className="text-xs sm:text-sm text-red-300">Trending in Tennis</p>
        </div>
        <div className="ml-4 mr-4">
          <ul>
            {trendingTennis.map((p) => (
              <PlayerItem key={p.name} player={p} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendingFeed;

