"use client";

import { Mic } from "lucide-react";

interface Props {
  onResult: (city: string) => void;
}

export default function VoiceSearch({
  onResult,
}: Props) {
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (
      event: any
    ) => {
      const city =
        event.results[0][0].transcript;

      onResult(city);
    };

    recognition.onerror = () => {
      alert(
        "Unable to recognize your voice."
      );
    };
  };

  return (
    <button
      onClick={startListening}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      <Mic size={18} />
      Voice Search
    </button>
  );
}