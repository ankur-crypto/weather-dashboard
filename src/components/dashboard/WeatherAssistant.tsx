"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
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

export default function WeatherAssistant({
  weather,
}: Props) {
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `👋 Hello! I'm your AI Weather Assistant.

Ask me anything about today's weather.

I can help with:
• Clothing suggestions 👕
• Umbrella advice ☔
• Travel conditions 🚗
• Outdoor activities 🏃
• Air quality 🌿
• Weather explanation 🌦️`,
    },
  ]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const suggestions = [
    "Should I carry an umbrella?",
    "Can I go jogging?",
    "What should I wear?",
    "Can I travel today?",
    "Is air quality good?",
    "Can I ride my bike?",
  ];

  const sendQuestion = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setTyping(true);

    setTimeout(() => {
      const response =
        askWeatherAssistant(
          text,
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

  const handleAsk = () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setQuestion("");

    sendQuestion(currentQuestion);
  };

  const handleSuggestion = (
    item: string
  ) => {
    sendQuestion(item);
  };

  return (
    <section
      className="
        mt-8
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

      <div className="flex items-center gap-4 border-b border-slate-200 p-6 dark:border-slate-700">
        <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Bot
            size={28}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Weather Assistant
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ask questions about today's weather
          </p>
        </div>

        <Sparkles
          className="text-yellow-500"
          size={24}
        />
      </div>

      {/* Chat Area */}

      <div className="h-[430px] overflow-y-auto p-6">
        <div className="space-y-5">
          {messages.map(
            (message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] gap-3 ${
                    message.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
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
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>

                  <div
                    className={`rounded-3xl px-5 py-4 text-sm leading-7 shadow-md transition-all ${
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

          {typing && (
            <div className="flex">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-100 px-5 py-4 shadow dark:bg-slate-800">
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
            {/* Suggestions */}

      <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-700">
        <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          Quick Questions
        </h3>

        <div className="flex flex-wrap gap-3">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() =>
                handleSuggestion(item)
              }
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
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-slate-200
                dark:hover:border-blue-500
                dark:hover:bg-blue-600
              "
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}

      <div className="border-t border-slate-200 p-6 dark:border-slate-700">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
            placeholder="Ask anything about today's weather..."
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
              dark:border-slate-600
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:ring-blue-900/40
            "
          />

          <button
            onClick={handleAsk}
            disabled={!question.trim()}
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
              Send
            </span>
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Responses are generated using the current weather conditions for{" "}
          <span className="font-semibold">
            {weather.location.name}
          </span>
          .
        </p>
      </div>
    </section>
  );
}