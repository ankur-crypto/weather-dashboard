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
  const [question, setQuestion] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        text: "👋 Hi! I'm your AI Weather Assistant. Ask me anything about today's weather.",
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

  const handleAsk = () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    setTyping(true);

    setTimeout(() => {
      const response =
        askWeatherAssistant(
          userQuestion,
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
    }, 800);
  };

  const handleSuggestion = (
    item: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: item,
      },
    ]);

    setTyping(true);

    setTimeout(() => {
      const response =
        askWeatherAssistant(
          item,
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

  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <Bot
          size={28}
          className="text-blue-400"
        />

        <div>

          <h2 className="text-2xl font-bold text-white">
            AI Weather Assistant
          </h2>

          <p className="text-sm text-slate-400">
            Ask questions about today's weather
          </p>

        </div>

      </div>

      {/* Chat */}

      <div className="h-[350px] space-y-5 overflow-y-auto rounded-2xl bg-slate-900 p-5">

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
                className={`flex max-w-[80%] gap-3 ${
                  message.role === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    message.role === "assistant"
                      ? "bg-blue-600"
                      : "bg-slate-700"
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
                  className={`rounded-2xl px-4 py-3 ${
                    message.role ===
                    "assistant"
                      ? "bg-slate-800 text-slate-100"
                      : "bg-blue-600 text-white"
                  }`}
                >

                  {message.text}

                </div>

              </div>

            </div>

          )
        )}

        {typing && (

          <div className="flex">

            <div className="rounded-2xl bg-slate-800 px-4 py-3 text-slate-300">

              🤖 Thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* Suggestions */}

      <div className="mt-6 flex flex-wrap gap-3">

        {suggestions.map((item) => (

          <button
            key={item}
            onClick={() =>
              handleSuggestion(item)
            }
            className="rounded-full bg-slate-700 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
          >

            {item}

          </button>

        ))}

      </div>

      {/* Input */}

      <div className="mt-6 flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              handleAsk();
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAsk}
          className="rounded-xl bg-blue-600 px-5 text-white transition hover:bg-blue-700"
        >

          <Send size={20} />

        </button>

      </div>

    </div>
  );
}