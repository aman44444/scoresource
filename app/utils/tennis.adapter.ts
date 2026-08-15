import type { Article } from "@/types/news";

interface AllScoresNewsArticle {
  id: number;
  publishDate: string;
  sourceId: number;
  title: string;
  image?: string;
  url: string;
  isMagazine?: boolean;
}

interface AllScoresNewsSource {
  id: number;
  name: string;
  imageVersion?: number;
}

interface AllScoresResponse {
  news?: AllScoresNewsArticle[];
  newsSources?: AllScoresNewsSource[];
}

export function adaptTennisNews(raw: AllScoresResponse): Article[] {
  return (raw.news ?? []).map((article) => ({
    id: String(article.id),
    title: article.title,
    excerpt: "",
    url: article.url,
    thumbnail: article.image,
    date: article.publishDate,
    source:
      raw.newsSources?.find((source) => source.id === article.sourceId)?.name ??
      "AllScores",
  }));
}