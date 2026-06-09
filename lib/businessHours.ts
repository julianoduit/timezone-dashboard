export function isLocalBusinessHours(tz: string): boolean {
  try {
    const now = new Date();
    const hour = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "numeric",
        hour12: false,
      }).format(now),
      10,
    );
    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
    }).format(now);

    let startHour = 8;
    let endHour = 18;

    if (tz.startsWith("Asia/")) {
      startHour = 9;
      endHour = 18;
    } else if (tz.startsWith("Europe/")) {
      startHour = 9;
      endHour = 17;
    }

    const middleEastTzs = ["Asia/Riyadh", "Asia/Dubai", "Asia/Qatar", "Asia/Kuwait"];
    if (middleEastTzs.some((me) => tz.includes(me))) {
      if (day === "Fri" || day === "Sat") return false;
    } else {
      if (day === "Sat" || day === "Sun") return false;
    }

    return hour >= startHour && hour < endHour;
  } catch {
    return false;
  }
}
