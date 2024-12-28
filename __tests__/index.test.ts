import { timeToCron } from "../src/index";
import { isValidCron } from "cron-validator";

describe("@aquarela/timeToCron", () => {
  test("converts seconds correctly", () => {
    expect(timeToCron(30)).toBe("*/30 * * * * *");
    expect(timeToCron(60)).toBe("0 */1 * * * *");
    expect(timeToCron(120)).toBe("0 */2 * * * *");
    expect(timeToCron(3600)).toBe("0 0 */1 * * *");
  });

  test("throws error for invalid seconds input", () => {
    expect(() => timeToCron(75)).toThrow(
      "Seconds value must be less than 60 or a multiple of 60"
    );
  });

  test("converts minutes correctly", () => {
    expect(timeToCron(30, "minutes")).toBe("0 */30 * * * *");
    expect(timeToCron(60, "minutes")).toBe("0 0 */1 * * *");
    expect(timeToCron(120, "minutes")).toBe("0 0 */2 * * *");
  });

  test("throws error for invalid minutes input", () => {
    expect(() => timeToCron(90, "minutes")).toThrow(
      "Minutes value must be less than 60 or a multiple of 60"
    );
  });

  test("converts hours correctly", () => {
    expect(timeToCron(2, "hours")).toBe("0 0 */2 * * *");
    expect(timeToCron(24, "hours")).toBe("0 0 0 */1 * *");
    expect(timeToCron(48, "hours")).toBe("0 0 0 */2 * *");
  });

  test("throws error for invalid hours input", () => {
    expect(() => timeToCron(25, "hours")).toThrow(
      "Hours value must be less than 24 or a multiple of 24"
    );
  });

  test("converts days correctly", () => {
    expect(timeToCron(1, "days")).toBe("0 0 0 */1 * *");
    expect(timeToCron(7, "days")).toBe("0 0 0 */7 * *");
  });

  test("throws error for invalid input", () => {
    expect(() => timeToCron(0)).toThrow("Value must be a positive integer");
    expect(() => timeToCron(-1)).toThrow("Value must be a positive integer");
    expect(() => timeToCron(1.5)).toThrow("Value must be a positive integer");
  });

  test("throws error for invalid time unit", () => {
    // @ts-expect-error: Expected Invalid Time Unit Error
    expect(() => timeToCron(1, "invalid")).toThrow("Invalid time unit");
    // @ts-expect-error: Testing invalid time units
    expect(() => timeToCron(60, "minute")).toThrow("Invalid time unit");
    // @ts-expect-error: Testing invalid time units
    expect(() => timeToCron(60, "hrs")).toThrow("Invalid time unit");
  });

  test("handles boundary values correctly", () => {
    expect(timeToCron(59)).toBe("*/59 * * * * *");
    expect(() => timeToCron(60)).not.toThrow();
    expect(() => timeToCron(61)).toThrow();
  });

  test("handles large values correctly", () => {
    expect(timeToCron(86400)).toBe("0 0 0 */1 * *");
    expect(timeToCron(172800)).toBe("0 0 0 */2 * *");
    expect(timeToCron(864000)).toBe("0 0 0 */10 * *");
  });

  test("throws error for invalid input types", () => {
    // @ts-expect-error: Expected Wrong Type Error
    expect(() => timeToCron("60")).toThrow(
      "Invalid input: must be a integer or a predefined schedule"
    );
    expect(() => timeToCron(NaN)).toThrow("Value must be a positive integer");
    expect(() => timeToCron(Infinity)).toThrow(
      "Value must be a positive integer"
    );
  });

  test("throws error for null or undefined values", () => {
    // @ts-expect-error: Expected Wrong Type Error
    expect(() => timeToCron(null)).toThrow(
      "Invalid input: must be a integer or a predefined schedule"
    );
    // @ts-expect-error: Expected Wrong Type Error
    expect(() => timeToCron(undefined)).toThrow(
      "Invalid input: must be a integer or a predefined schedule"
    );
  });
  test("throws error when conversion results in fractions", () => {
    expect(() => timeToCron(90, "seconds")).toThrow(
      "Seconds value must be less than 60 or a multiple of 60"
    );
  });

  test("throws error for days greater than 31", () => {
    expect(() => timeToCron(32, "days")).toThrow(
      "Days value must be 31 or less"
    );
    expect(() => timeToCron(45, "days")).toThrow(
      "Days value must be 31 or less"
    );
  });

  describe("predefined schedules", () => {
    test("handles yearly schedules", () => {
      expect(timeToCron("@yearly")).toBe("0 0 0 1 1 *");
      expect(timeToCron("@annually")).toBe("0 0 0 1 1 *");
    });

    test("handles monthly and weekly schedules", () => {
      expect(timeToCron("@monthly")).toBe("0 0 0 1 * *");
      expect(timeToCron("@weekly")).toBe("0 0 0 * * 0");
    });

    test("handles daily schedules", () => {
      expect(timeToCron("@daily")).toBe("0 0 0 * * *");
      expect(timeToCron("@midnight")).toBe("0 0 0 * * *");
    });

    test("handles hourly and custom intervals", () => {
      expect(timeToCron("@hourly")).toBe("0 0 * * * *");
      expect(timeToCron("@every12hours")).toBe("0 0 0/12 * * *");
      expect(timeToCron("@biweekly")).toBe("0 0 0 * * 0/2");
    });

    test("throws error for invalid predefined schedule", () => {
      // @ts-expect-error: Testing invalid predefined schedule
      expect(() => timeToCron("@invalid")).toThrow(
        "Invalid predefined schedule"
      );
    });
  });
});

describe("cron-validator validation", () => {
  test("validates seconds expressions", () => {
    const expressions = [
      timeToCron(30),
      timeToCron(60),
      timeToCron(120),
      timeToCron(3600),
    ];
    expressions.forEach((expr) => {
      expect(isValidCron(expr, { seconds: true })).toBe(true);
    });
  });

  test("validates minutes expressions", () => {
    const expressions = [
      timeToCron(30, "minutes"),
      timeToCron(60, "minutes"),
      timeToCron(120, "minutes"),
    ];
    expressions.forEach((expr) => {
      expect(isValidCron(expr, { seconds: true })).toBe(true);
    });
  });

  test("validates hours expressions", () => {
    const expressions = [
      timeToCron(2, "hours"),
      timeToCron(24, "hours"),
      timeToCron(48, "hours"),
    ];
    expressions.forEach((expr) => {
      expect(isValidCron(expr, { seconds: true })).toBe(true);
    });
  });

  test("validates days expressions", () => {
    const expressions = [
      timeToCron(1, "days"),
      timeToCron(7, "days"),
      timeToCron(15, "days"),
      timeToCron(31, "days"),
    ];
    expressions.forEach((expr) => {
      expect(isValidCron(expr, { seconds: true })).toBe(true);
    });
  });

  test("validates predefined schedules", () => {
    const expressions = [
      timeToCron("@yearly"),
      timeToCron("@annually"),
      timeToCron("@monthly"),
      timeToCron("@weekly"),
      timeToCron("@daily"),
      timeToCron("@midnight"),
      timeToCron("@hourly"),
      timeToCron("@every12hours"),
      timeToCron("@biweekly"),
    ];
    expressions.forEach((expr) => {
      expect(isValidCron(expr, { seconds: true })).toBe(true);
    });
  });
});
