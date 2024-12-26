type TimeUnit = "seconds" | "minutes" | "hours" | "days";
type PredefinedSchedule =
  | "@yearly"
  | "@annually"
  | "@monthly"
  | "@weekly"
  | "@daily"
  | "@midnight"
  | "@hourly"
  | "@every12hours"
  | "@biweekly";

interface TimeUnitHandler {
  handle(value: number): string;
}
class SecondsHandler implements TimeUnitHandler {
  handle(value: number): string {
    if (value < 60) {
      return `*/${value} * * * * *`;
    } else if (value % 60 === 0) {
      const minutes = value / 60;
      return new MinutesHandler().handle(minutes);
    } else {
      throw new Error("Seconds value must be less than 60 or a multiple of 60");
    }
  }
}
class MinutesHandler implements TimeUnitHandler {
  handle(value: number): string {
    if (value < 60) {
      return `0 */${value} * * * *`;
    } else if (value % 60 === 0) {
      const hours = value / 60;
      return new HoursHandler().handle(hours);
    } else {
      throw new Error("Minutes value must be less than 60 or a multiple of 60");
    }
  }
}
class HoursHandler implements TimeUnitHandler {
  handle(value: number): string {
    if (value < 24) {
      return `0 0 */${value} * * *`;
    } else if (value % 24 === 0) {
      const days = value / 24;
      return new DaysHandler().handle(days);
    } else {
      throw new Error("Hours value must be less than 24 or a multiple of 24");
    }
  }
}
class DaysHandler implements TimeUnitHandler {
  handle(value: number): string {
    if (value > 31) {
      throw new Error("Days value must be 31 or less");
    }
    return `0 0 0 */${value} * *`;
  }
}
const handlers: Record<TimeUnit, TimeUnitHandler> = {
  seconds: new SecondsHandler(),
  minutes: new MinutesHandler(),
  hours: new HoursHandler(),
  days: new DaysHandler(),
};

function handlePredefinedSchedule(schedule: PredefinedSchedule): string {
  switch (schedule) {
    case "@yearly":
    case "@annually":
      return "0 0 0 1 1 *";
    case "@monthly":
      return "0 0 0 1 * *";
    case "@weekly":
      return "0 0 0 * * 0";
    case "@daily":
    case "@midnight":
      return "0 0 0 * * *";
    case "@hourly":
      return "0 0 * * * *";
    case "@every12hours":
      return "0 0 0/12 * * *";
    case "@biweekly":
      return "0 0 0 * * 0/2";
    default:
      throw new Error("Invalid predefined schedule");
  }
}

export function timeToCron(
  value: number | PredefinedSchedule,
  unit: TimeUnit = "seconds"
): string {
  if (typeof value === "string" && value.startsWith("@")) {
    return handlePredefinedSchedule(value as PredefinedSchedule);
  }

  if (typeof value === "number") {
    if (value <= 0 || !Number.isInteger(value)) {
      throw new Error("Value must be a positive integer");
    }

    const handler = handlers[unit];
    if (!handler) {
      throw new Error("Invalid time unit");
    }

    return handler.handle(value);
  }

  throw new Error("Invalid input: must be a integer or a predefined schedule");
}
