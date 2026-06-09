"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { TimezoneGrid } from "./TimezoneGrid";
import type { TimezoneLocation } from "@/types/timezone";

interface DashboardProps {
  initialData: TimezoneLocation[];
}

export function Dashboard({ initialData }: DashboardProps) {
  const [currentData, setCurrentData] = useState<TimezoneLocation[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [businessHoursActive, setBusinessHoursActive] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      businessHoursActive ? "light" : "dark",
    );
  }, [businessHoursActive]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (searchQuery.trim() === "") {
      setCurrentData(initialData);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=100&language=pt&format=json`,
        );
        const data = await res.json();
        setCurrentData((data.results as TimezoneLocation[]) ?? []);
      } catch {
        // keep current data on network error
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, initialData]);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        businessHoursActive={businessHoursActive}
        onBusinessHoursToggle={() => setBusinessHoursActive((v) => !v)}
      />
      <TimezoneGrid
        locations={currentData}
        selectedRegion={selectedRegion}
        businessHoursActive={businessHoursActive}
      />
    </div>
  );
}
