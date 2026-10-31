import { OpeningHours } from "@/types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** ISO weekday (1 = Mon … 7 = Sun) and minutes since midnight in `timeZone`. */
export function zonedNow(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return {
    weekday: WEEKDAYS.indexOf(get("weekday")) + 1,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export type OpeningStatus =
  | { isOpen: true; today: number; closes: string }
  | {
      isOpen: false;
      today: number;
      /** 0 = later today, 1 = tomorrow, … */
      nextOpenInDays: number;
      nextOpenWeekday: number;
      opens: string;
    };

export function getOpeningStatus(date: Date, hours: OpeningHours): OpeningStatus {
  const { weekday, minutes } = zonedNow(date, hours.timeZone);
  const opens = toMinutes(hours.opens);
  const closes = toMinutes(hours.closes);
  const openToday = hours.days.includes(weekday);

  if (openToday && minutes >= opens && minutes < closes) {
    return { isOpen: true, today: weekday, closes: hours.closes };
  }

  if (openToday && minutes < opens) {
    return {
      isOpen: false,
      today: weekday,
      nextOpenInDays: 0,
      nextOpenWeekday: weekday,
      opens: hours.opens,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = ((weekday - 1 + offset) % 7) + 1;
    if (hours.days.includes(day)) {
      return {
        isOpen: false,
        today: weekday,
        nextOpenInDays: offset,
        nextOpenWeekday: day,
        opens: hours.opens,
      };
    }
  }

  // No opening days configured.
  return { isOpen: false, today: weekday, nextOpenInDays: -1, nextOpenWeekday: -1, opens: hours.opens };
}
