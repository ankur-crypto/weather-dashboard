import {
  NextRequest,
  NextResponse,
} from "next/server";

const NEWS_API_KEY =
  process.env.NEWS_API_KEY;

const NEWS_API_URL =
  "https://newsapi.org/v2/everything";

/*
 * Type for raw NewsAPI article
 */
interface NewsApiArticle {
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: {
    name?: string;
  };
}

/*
 * Fetch articles from NewsAPI
 */
async function fetchNews(
  query: string
): Promise<NewsApiArticle[]> {
  if (!NEWS_API_KEY) {
    return [];
  }

  const apiUrl =
    `${NEWS_API_URL}` +
    `?q=${encodeURIComponent(query)}` +
    `&language=en` +
    `&sortBy=publishedAt` +
    `&pageSize=10`;

  const response =
    await fetch(apiUrl, {
      headers: {
        "X-Api-Key":
          NEWS_API_KEY,
      },

      /*
       * Cache results for
       * 10 minutes
       */
      next: {
        revalidate: 600,
      },
    });

  if (!response.ok) {
    const errorData =
      await response.json();

    throw new Error(
      errorData.message ||
        "Unable to fetch weather news."
    );
  }

  const data =
    await response.json();

  return data.articles ?? [];
}

/*
 * Remove invalid articles
 * and convert NewsAPI data
 * into our frontend format.
 */
function normalizeArticles(
  articles: NewsApiArticle[]
) {
  return articles
    .filter(
      (article) =>
        article.title &&
        article.url &&
        article.title !==
          "[Removed]"
    )
    .map(
      (article, index) => ({
        id:
          `${index}-${article.publishedAt ?? Date.now()}`,

        title:
          article.title!,

        description:
          article.description &&
          article.description !==
            "[Removed]"
            ? article.description
            : "",

        source:
          article.source?.name ??
          "Weather News",

        url:
          article.url!,

        image:
          article.urlToImage ??
          null,

        publishedAt:
          article.publishedAt ??
          null,
      })
    );
}

export async function GET(
  request: NextRequest
) {
  try {
    /*
     * Read city from URL
     *
     * Example:
     * /api/weather-news?city=Agartala
     */
    const { searchParams } =
      new URL(request.url);

    const city =
      searchParams.get("city");

    /*
     * Validate city
     */
    if (!city?.trim()) {
      return NextResponse.json(
        {
          message:
            "City is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Check API key
     */
    if (!NEWS_API_KEY) {
      console.error(
        "NEWS_API_KEY is missing."
      );

      return NextResponse.json(
        {
          message:
            "News API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * STEP 1
     *
     * Search selected city.
     *
     * Example:
     * Agartala AND
     * (weather OR rain OR...)
     */
    const cityQuery =
      `"${city}" AND (` +
      `weather OR ` +
      `rain OR ` +
      `rainfall OR ` +
      `temperature OR ` +
      `climate OR ` +
      `storm OR ` +
      `flood OR ` +
      `cyclone` +
      `)`;

    let articles =
      await fetchNews(
        cityQuery
      );

    let searchLevel =
      "city";

    /*
     * STEP 2
     *
     * If no city-specific news
     * is available, search Tripura.
     *
     * This is useful for Agartala
     * because many news articles
     * mention "Tripura" instead.
     */
    if (
      articles.length === 0
    ) {
      const stateQuery =
        `"Tripura" AND (` +
        `weather OR ` +
        `rain OR ` +
        `rainfall OR ` +
        `temperature OR ` +
        `climate OR ` +
        `storm OR ` +
        `flood OR ` +
        `cyclone` +
        `)`;

      articles =
        await fetchNews(
          stateQuery
        );

      searchLevel =
        "state";
    }

    /*
     * STEP 3
     *
     * Final fallback:
     * search India weather news.
     */
    if (
      articles.length === 0
    ) {
      const indiaQuery =
        `"India" AND (` +
        `weather OR ` +
        `rainfall OR ` +
        `heatwave OR ` +
        `monsoon OR ` +
        `storm OR ` +
        `flood OR ` +
        `cyclone` +
        `)`;

      articles =
        await fetchNews(
          indiaQuery
        );

      searchLevel =
        "country";
    }

    /*
     * Normalize articles
     */
    const normalizedArticles =
      normalizeArticles(
        articles
      );

    /*
     * Return response
     */
    return NextResponse.json({
      city,

      /*
       * Lets us know whether
       * articles came from
       * city/state/country search.
       */
      searchLevel,

      articles:
        normalizedArticles,
    });
  } catch (error) {
    console.error(
      "Weather news route error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching weather news.",
      },
      {
        status: 500,
      }
    );
  }
}