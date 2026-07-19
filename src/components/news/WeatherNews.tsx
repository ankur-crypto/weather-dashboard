"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  CalendarDays,
  ExternalLink,
  Loader2,
  Newspaper,
} from "lucide-react";

interface Props {
  city: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  image: string | null;
  publishedAt: string | null;
}

interface NewsResponse {
  city: string;
  articles: NewsArticle[];
}

export default function WeatherNews({
  city,
}: Props) {
  const [articles, setArticles] =
    useState<NewsArticle[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    /*
     * City normally comes directly
     * from WeatherAPI.
     *
     * If city is empty, simply skip
     * the request. We don't call
     * setState synchronously here.
     */
    if (!city.trim()) {
      return;
    }

    /*
     * Abort previous request
     * when city changes or
     * component unmounts.
     */
    const controller =
      new AbortController();

    async function fetchNews() {
      try {
        /*
         * These updates happen inside
         * the async request function.
         */
        setLoading(true);

        setError("");

        const response =
          await fetch(
            `/api/weather-news?city=${encodeURIComponent(
              city
            )}`,
            {
              signal:
                controller.signal,
            }
          );

        /*
         * Parse server response.
         */
        const data:
          | NewsResponse
          | {
              message?: string;
            } =
          await response.json();

        /*
         * Handle server/API errors.
         */
        if (!response.ok) {
          const message =
            "message" in data
              ? data.message
              : undefined;

          throw new Error(
            message ||
              "Unable to fetch weather news."
          );
        }

        /*
         * Don't update state if
         * request was cancelled.
         */
        if (
          controller.signal
            .aborted
        ) {
          return;
        }

        /*
         * Save articles.
         */
        if ("articles" in data) {
          setArticles(
            data.articles
          );
        }
      } catch (err) {
        /*
         * Ignore cancelled request.
         */
        if (
          err instanceof
            DOMException &&
          err.name ===
            "AbortError"
        ) {
          return;
        }

        console.error(
          "Weather news error:",
          err
        );

        /*
         * Only update error state
         * if request is still active.
         */
        if (
          !controller.signal
            .aborted
        ) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch weather news."
          );

          setArticles([]);
        }
      } finally {
        /*
         * Stop loader only when
         * request is still active.
         */
        if (
          !controller.signal
            .aborted
        ) {
          setLoading(false);
        }
      }
    }

    /*
     * Start API request.
     */
    fetchNews();

    /*
     * Cancel old request when
     * city changes.
     */
    return () => {
      controller.abort();
    };
  }, [city]);

  /*
   * Format article date.
   */
  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return "Recently";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <section
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-lg
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Newspaper
            size={26}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Weather News
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Latest weather
            updates for{" "}
            <span className="font-semibold">
              {city}
            </span>
          </p>
        </div>
      </div>

      {/* Loading State */}

      {loading && (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-4">
          <Loader2
            size={36}
            className="animate-spin text-blue-500"
          />

          <p className="text-slate-500 dark:text-slate-400">
            Loading latest
            weather news...
          </p>
        </div>
      )}

      {/* Error State */}

      {!loading && error && (
        <div
          className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-5
            dark:border-red-500/30
            dark:bg-red-900/10
          "
        >
          <AlertCircle
            size={24}
            className="shrink-0 text-red-500"
          />

          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">
              Unable to load
              weather news
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}

      {!loading &&
        !error &&
        articles.length === 0 && (
          <div
            className="
              rounded-3xl
              border-2
              border-dashed
              border-slate-300
              py-14
              text-center
              dark:border-slate-700
            "
          >
            <Newspaper
              size={40}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No Weather News Found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No recent weather
              articles were found
              for {city}.
            </p>
          </div>
        )}

      {/* News Articles */}

      {!loading &&
        !error &&
        articles.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            {articles.map(
              (news) => (
                <article
                  key={news.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-slate-50
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-400
                    hover:shadow-lg
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:hover:border-blue-500
                  "
                >
                  {/* Article Image */}

                  {news.image && (
                    <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <img
                        src={
                          news.image
                        }
                        alt={
                          news.title
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>
                  )}

                  {/* Content */}

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      {/* Source */}

                      <span
                        className="
                          rounded-full
                          bg-blue-100
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-blue-700
                          dark:bg-blue-900/30
                          dark:text-blue-300
                        "
                      >
                        {news.source}
                      </span>

                      {/* Date */}

                      <span className="flex shrink-0 items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <CalendarDays
                          size={14}
                        />

                        {formatDate(
                          news.publishedAt
                        )}
                      </span>
                    </div>

                    {/* Title */}

                    <h3 className="mt-4 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {news.title}
                    </h3>

                    {/* Description */}

                    {news.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {
                          news.description
                        }
                      </p>
                    )}

                    {/* Article Link */}

                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-blue-700
                        hover:shadow-lg
                      "
                    >
                      Read Article

                      <ExternalLink
                        size={16}
                      />
                    </a>
                  </div>
                </article>
              )
            )}
          </div>
        )}
    </section>
  );
}