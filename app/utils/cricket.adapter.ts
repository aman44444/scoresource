import type { Article } from "@/types/news";

interface CricbuzzCoverImage {
  id: string;
  caption?: string;
  source?: string;
}

interface CricbuzzStory {
  id: number;
  hline: string;
  intro: string;
  pubTime: string;
  source: string;
  storyType: string;
  imageId?: number;
  seoHeadline: string;
  context?: string;
  coverImage?: CricbuzzCoverImage;
}

interface CricbuzzAd {
  name: string;
  layout: string;
  position: number;
}

interface CricbuzzStoryListEntry {
  story?: CricbuzzStory;
  ad?: CricbuzzAd;
}

interface CricbuzzNewsResponse {
  storyList: Record<string, CricbuzzStoryListEntry>;
  lastUpdatedTime?: string;
  seoTitle?: string;
  webURL?: string;
}

function buildImageUrl(imageId?: number): string {
  if (!imageId) return "";
  return `https://www.cricbuzz.com/a/img/v1/152x86/i1/c${imageId}/photo.jpg`;
}

function buildArticleUrl(id: number, seoHeadline: string): string {
  const slug = seoHeadline
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `https://www.cricbuzz.com/cricket-news/${id}/${slug}`;
}

export function adaptCricbuzzNews(raw: CricbuzzNewsResponse): Article[] {
  if (!raw?.storyList) return [];

  return Object.values(raw.storyList)
    .filter((entry): entry is { story: CricbuzzStory } => !!entry.story)
    .map(({ story }) => ({
      id: String(story.id),
      title: story.hline,
      excerpt: story.intro,
      url: buildArticleUrl(story.id, story.seoHeadline),
      thumbnail: buildImageUrl(story.imageId),
      date: new Date(Number(story.pubTime)).toISOString(),
      source: story.source,
    }));
}