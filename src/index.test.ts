import { timeToCron } from "./index";

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
  });
});
