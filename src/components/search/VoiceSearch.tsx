"use client";

import { Loader2, Mic } from "lucide-react";
import { useState } from "react";

interface Props {
  onResult: (city: string) => void;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionResultList {
  0: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;

  start(): void;
  stop(): void;

  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function VoiceSearch({
  onResult,
}: Props) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const city = event.results[0][0].transcript;

      setListening(false);
      onResult(city);
    };

    recognition.onerror = () => {
      setListening(false);

      alert("Unable to recognize your voice.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button
      onClick={startListening}
      disabled={listening}
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-blue-600
        px-5
        py-3.5
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-blue-700
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:bg-blue-400
        disabled:shadow-none
      "
    >
      {listening ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Listening...
        </>
      ) : (
        <>
          <Mic size={18} />
          Voice Search
        </>
      )}
    </button>
  );
}