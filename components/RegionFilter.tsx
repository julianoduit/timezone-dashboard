"use client";

const REGIONS = [
  { value: "all", label: "Todas as Regiões" },
  { value: "America", label: "América" },
  { value: "Europe", label: "Europa" },
  { value: "Asia", label: "Ásia" },
  { value: "Africa", label: "África" },
  { value: "Australia", label: "Austrália" },
  { value: "Pacific", label: "Pacífico" },
  { value: "Atlantic", label: "Atlântico" },
  { value: "Indian", label: "Oceano Índico" },
  { value: "Antarctica", label: "Antártica" },
];

interface RegionFilterProps {
  value: string;
  onChange: (v: string) => void;
}

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-w-[180px] cursor-pointer rounded-lg border px-4 py-3 outline-none transition-colors"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-main)",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
    >
      {REGIONS.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
