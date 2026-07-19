"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
} from "lucide-react";

import { WeatherData } from "@/types/weather";
import { askWeatherAssistant } from "@/utils/weatherAssistant";

interface Props {
  weather: WeatherData;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

/*
 * Creates the initial assistant message.
 */
const createWelcomeMessage = (
  city: string,
  country: string
): Message => ({
  role: "assistant",

  text: `👋 Hello! I'm your AI Weather Assistant.

I'm currently using live weather information for ${city}, ${country}.

Ask me anything about today's weather.

I can help with:
• Clothing suggestions 👕
• Umbrella advice ☔
• Travel conditions 🚗
• Outdoor activities 🏃
• Cycling conditions 🚴
• Air quality 🌿
• UV levels ☀️
• Temperature 🌡️
• Wind conditions 💨
• Humidity 💧
• Sunrise and sunset 🌅`,
});

export default function WeatherAssistant({
  weather,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>(() => [
      createWelcomeMessage(
        weather.location.name,
        weather.location.country
      ),
    ]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  /*
   * Automatically scroll to latest message.
   *
   * We keep this useEffect because it interacts
   * with the DOM instead of resetting React state.
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  /*
   * Quick question suggestions.
   */
  const suggestions = [
    "Should I carry an umbrella?",
    "Can I go jogging?",
    "What should I wear?",
    "Can I travel today?",
    "Is air quality good?",
    "Can I ride my bike?",
    "What is the temperature?",
    "How strong is the wind?",
  ];

  /*
   * Send question to local weather assistant.
   */
  const sendQuestion = (
    text: string
  ) => {
    const cleanText =
      text.trim();

    if (!cleanText) {
      return;
    }

    if (typing) {
      return;
    }

    /*
     * Add user message.
     */
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: cleanText,
      },
    ]);

    setTyping(true);

    /*
     * Small delay to simulate assistant typing.
     */
    setTimeout(() => {
      const response =
        askWeatherAssistant(
          cleanText,
          weather
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response,
        },
      ]);

      setTyping(false);
    }, 700);
  };

  /*
   * Handle Send button.
   */
  const handleAsk = () => {
    if (
      !question.trim() ||
      typing
    ) {
      return;
    }

    const currentQuestion =
      question;

    setQuestion("");

    sendQuestion(
      currentQuestion
    );
  };

  /*
   * Handle quick suggestion.
   */
  const handleSuggestion = (
    item: string
  ) => {
    if (typing) {
      return;
    }

    sendQuestion(item);
  };

  /*
   * Clear chat.
   */
  const handleClearChat = () => {
    if (typing) {
      return;
    }

    setMessages([
      {
        role: "assistant",

        text: `👋 Chat cleared!

I'm ready to help with the current weather in ${weather.location.name}, ${weather.location.country}.

What would you like to know?`,
      },
    ]);

    setQuestion("");
  };

  return (
    <section
      className="
        mt-8
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        shadow-lg
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          p-6
          dark:border-slate-700
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              rounded-2xl
              bg-blue-100
              p-3
              dark:bg-blue-900/30
            "
          >
            <Bot
              size={28}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                AI Weather Assistant
              </h2>

              <Sparkles
                size={20}
                className="text-yellow-500"
              />
            </div>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Live weather assistant
              for{" "}

              <span className="font-semibold">
                {weather.location.name}
              </span>
            </p>
          </div>
        </div>

        {/* Clear Chat */}

        <button
          type="button"
          onClick={handleClearChat}
          disabled={typing}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition-all
            duration-300
            hover:border-red-300
            hover:bg-red-50
            hover:text-red-500
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300
            dark:hover:border-red-500/40
            dark:hover:bg-red-900/20
            dark:hover:text-red-400
          "
        >
          <Trash2 size={16} />

          <span>
            Clear Chat
          </span>
        </button>
      </div>

      {/* Chat Area */}

      <div
        className="
          h-[430px]
          overflow-y-auto
          p-6
        "
      >
        <div className="space-y-5">
          {messages.map(
            (
              message,
              index
            ) => (
              <div
                key={index}
                className={`flex ${
                  message.role ===
                  "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[90%] gap-3 sm:max-w-[85%] ${
                    message.role ===
                    "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      message.role ===
                      "assistant"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-white dark:bg-slate-600"
                    }`}
                  >
                    {message.role ===
                    "assistant" ? (
                      <Bot
                        size={18}
                      />
                    ) : (
                      <User
                        size={18}
                      />
                    )}
                  </div>

                  {/* Message */}

                  <div
                    className={`rounded-3xl px-5 py-4 text-sm leading-7 shadow-md ${
                      message.role ===
                      "assistant"
                        ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Typing Indicator */}

          {typing && (
            <div className="flex">
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-3xl
                  bg-slate-100
                  px-5
                  py-4
                  shadow
                  dark:bg-slate-800
                "
              >
                <Bot
                  size={18}
                  className="text-blue-500"
                />

                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                    style={{
                      animationDelay:
                        "0.15s",
                    }}
                  />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                    style={{
                      animationDelay:
                        "0.3s",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick Questions */}

      <div
        className="
          border-t
          border-slate-200
          px-6
          py-5
          dark:border-slate-700
        "
      >
        <h3
          className="
            mb-3
            text-sm
            font-semibold
            text-slate-600
            dark:text-slate-300
          "
        >
          Quick Questions
        </h3>

        <div className="flex flex-wrap gap-3">
          {suggestions.map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  handleSuggestion(
                    item
                  )
                }
                disabled={typing}
                className="
                  rounded-full
                  border
                  border-slate-300
                  bg-slate-100
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-blue-400
                  hover:bg-blue-600
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-600
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:border-blue-500
                  dark:hover:bg-blue-600
                "
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Input */}

      <div
        className="
          border-t
          border-slate-200
          p-6
          dark:border-slate-700
        "
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleAsk();
              }
            }}
            disabled={typing}
            placeholder={
              typing
                ? "Assistant is responding..."
                : `Ask about weather in ${weather.location.name}...`
            }
            className="
              flex-1
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              text-slate-900
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-200
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-600
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:ring-blue-900/40
            "
          />

          <button
            type="button"
            onClick={handleAsk}
            disabled={
              !question.trim() ||
              typing
            }
            aria-label="Send message"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >
            <Send size={20} />

            <span className="hidden md:inline">
              {typing
                ? "Thinking..."
                : "Send"}
            </span>
          </button>
        </div>

        <p
          className="
            mt-3
            text-xs
            text-slate-500
            dark:text-slate-400
          "
        >
          Responses are generated
          using the current weather
          conditions for{" "}

          <span className="font-semibold">
            {weather.location.name}
          </span>
          .
        </p>
      </div>
    </section>
  );
}