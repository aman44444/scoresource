import type { Article, TrendingPlayer } from "@/components/types";

export const extractTrending = (
  articles: Article[],
  playerList: string[]
): TrendingPlayer[] => {
  const playerMap: Record<string, string[]> = {};

  articles.forEach((article) => {
    const text = `${article.title} ${article.excerpt ?? ""}`;

    playerList.forEach((player) => {
      const escapedPlayer = player.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(`\\b${escapedPlayer}\\b`, "i");

      if (regex.test(text)) {
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
      reason:
        titles.length > 1
          ? `${titles.length} recent articles mention ${name}`
          : titles[0],
    }));
};