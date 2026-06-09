"use client";

import { SearchInput } from "./SearchInput";
import { RegionFilter } from "./RegionFilter";
import { BusinessHoursToggle } from "./BusinessHoursToggle";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedRegion: string;
  onRegionChange: (v: string) => void;
  businessHoursActive: boolean;
  onBusinessHoursToggle: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  businessHoursActive,
  onBusinessHoursToggle,
}: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Global Timezones</h1>
      <div className="flex w-full max-w-3xl flex-wrap gap-4">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <RegionFilter value={selectedRegion} onChange={onRegionChange} />
        <BusinessHoursToggle
          active={businessHoursActive}
          onToggle={onBusinessHoursToggle}
        />
      </div>
    </header>
  );
}
