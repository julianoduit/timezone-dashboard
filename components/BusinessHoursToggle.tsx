"use client";

interface BusinessHoursToggleProps {
  active: boolean;
  onToggle: () => void;
}

export function BusinessHoursToggle({
  active,
  onToggle,
}: BusinessHoursToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="cursor-pointer whitespace-nowrap rounded-lg border px-4 py-3 font-semibold transition-colors"
      style={
        active
          ? {
              backgroundColor: "var(--accent)",
              borderColor: "var(--accent)",
              color: "#ffffff",
            }
          : {
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-main)",
            }
      }
    >
      Horário Comercial
    </button>
  );
}
