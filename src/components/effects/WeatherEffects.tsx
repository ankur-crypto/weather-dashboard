"use client";

import RainEffect from "./RainEffect";
import SnowEffect from "./SnowEffect";
import CloudEffect from "./CloudEffect";
import SunEffect from "./SunEffect";
import ThunderEffect from "./ThunderEffect";

interface Props {
  condition: string;
}

export default function WeatherEffects({
  condition,
}: Props) {
  const text = condition.toLowerCase();

  if (text.includes("thunder")) {
    return <ThunderEffect />;
  }

  if (
    text.includes("rain") ||
    text.includes("drizzle")
  ) {
    return <RainEffect />;
  }

  if (text.includes("snow")) {
    return <SnowEffect />;
  }

  if (text.includes("cloud")) {
    return <CloudEffect />;
  }

  if (
    text.includes("sun") ||
    text.includes("clear")
  ) {
    return <SunEffect />;
  }

  return null;
}