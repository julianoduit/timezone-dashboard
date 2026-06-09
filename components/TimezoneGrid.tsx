"use client";

import { TimezoneCard } from "./TimezoneCard";
import { isLocalBusinessHours } from "@/lib/businessHours";
import type { TimezoneLocation } from "@/types/timezone";

interface TimezoneGridProps {
  locations: TimezoneLocation[];
  selectedRegion: string;
  businessHoursActive: boolean;
}

export function TimezoneGrid({
  locations,
  selectedRegion,
  businessHoursActive,
}: TimezoneGridProps) {
  const filtered = locations.filter((loc) => {
    if (!loc.timezone) return false;
    if (selectedRegion !== "all" && !loc.timezone.startsWith(selectedRegion))
      return false;
    if (businessHoursActive && !isLocalBusinessHours(loc.timezone)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div
        className="py-8 text-center text-lg"
        style={{ color: "var(--text-muted)" }}
      >
        Nenhum local encontrado para os filtros atuais.
      </div>
    );
  }

  return (
    <main
      className="grid gap-6 mx-auto"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        maxWidth: "1400px",
      }}
    >
      {filtered.map((loc, index) => (
        <TimezoneCard key={`${loc.timezone}-${loc.name}-${index}`} location={loc} />
      ))}
    </main>
  );
}
