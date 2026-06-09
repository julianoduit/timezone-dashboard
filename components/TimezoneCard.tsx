"use client";

import { useState, useEffect } from "react";
import type { TimezoneLocation } from "@/types/timezone";

interface TimezoneCardProps {
  location: TimezoneLocation;
}

export function TimezoneCard({ location }: TimezoneCardProps) {
  const [time, setTime] = useState("--:--:--");
  const [date, setDate] = useState("--/--/----");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      try {
        setTime(
          new Intl.DateTimeFormat("pt-BR", {
            timeZone: location.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(now),
        );
        setDate(
          new Intl.DateTimeFormat("pt-BR", {
            timeZone: location.timezone,
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(now),
        );
      } catch {
        setTime("Inválido");
      }
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [location.timezone]);

  const regionText =
    location.admin1 && location.admin1 !== location.name
      ? `${location.country} - ${location.admin1}`
      : location.country || "Global";

  return (
    <div className="flex flex-col gap-2 rounded-xl border p-6 transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: isHovered ? "var(--accent)" : "var(--border-color)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
        title={regionText}
      >
        {regionText}
      </span>
      <h2
        className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold mb-2"
        title={location.name}
      >
        {location.name}
      </h2>
      <div
        className="text-4xl font-bold tabular-nums"
        style={{ color: "var(--accent)" }}
      >
        {time}
      </div>
      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
        {date}
      </div>
    </div>
  );
}
