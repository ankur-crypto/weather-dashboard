"use client";

import { useMemo } from "react";

import CloudEffect from "./CloudEffect";
import RainEffect from "./RainEffect";
import SnowEffect from "./SnowEffect";
import SunEffect from "./SunEffect";
import ThunderEffect from "./ThunderEffect";

interface Props {
  condition: string;
}

export default function WeatherEffects({
  condition,
}: Props) {
  const effect = useMemo(() => {
    const text = condition.trim().toLowerCase();

    if (
      text.includes("thunder") ||
      text.includes("storm")
    ) {
      return <ThunderEffect />;
    }

    if (
      text.includes("rain") ||
      text.includes("drizzle") ||
      text.includes("shower")
    ) {
      return <RainEffect />;
    }

    if (
      text.includes("snow") ||
      text.includes("blizzard") ||
      text.includes("sleet") ||
      text.includes("ice")
    ) {
      return <SnowEffect />;
    }

    if (
      text.includes("cloud") ||
      text.includes("overcast") ||
      text.includes("mist") ||
      text.includes("fog") ||
      text.includes("haze")
    ) {
      return <CloudEffect />;
    }

    if (
      text.includes("clear") ||
      text.includes("sun") ||
      text.includes("sunny")
    ) {
      return <SunEffect />;
    }

    return null;
  }, [condition]);

  return effect;
}