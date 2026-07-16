import { NewsArticle, NewsResponse } from "@/types/news";

const API_KEY =
  process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function getWeatherNews(
  city: string
): Promise<NewsArticle[]> {
  const url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      city + " weather"
    )}&pageSize=6&sortBy=publishedAt&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch news.");
  }

  const data: NewsResponse =
    await response.json();

  return data.articles;
}