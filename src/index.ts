type TimeUnit = "seconds" | "minutes" | "hours" | "days";

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
    return `0 0 0 */${value} * *`;
  }
}
const handlers: Record<TimeUnit, TimeUnitHandler> = {
  seconds: new SecondsHandler(),
  minutes: new MinutesHandler(),
  hours: new HoursHandler(),
  days: new DaysHandler(),
};

export function timeToCron(value: number, unit: TimeUnit = "seconds"): string {
  if (value <= 0 || !Number.isInteger(value)) {
    throw new Error("Value must be a positive integer");
  }

  const handler = handlers[unit as keyof typeof handlers];
  if (!handler) {
    throw new Error("Invalid time unit");
  }

  return handler.handle(value);
}
