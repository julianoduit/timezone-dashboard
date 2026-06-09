import { Dashboard } from "@/components/Dashboard";
import type { TimezoneLocation } from "@/types/timezone";

function buildTimezoneList(): TimezoneLocation[] {
  return Intl.supportedValuesOf("timeZone").map((tz) => {
    const [region, ...cityParts] = tz.split("/");
    const city = cityParts.join(" ").replace(/_/g, " ") || region;
    return { name: city, country: region, timezone: tz };
  });
}

export default function Home() {
  const initialData = buildTimezoneList();
  return <Dashboard initialData={initialData} />;
}
