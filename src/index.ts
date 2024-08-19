/**
 * Converts a time value to a cron expression.
 *
 * @param {number} value - The time value to convert. Must be a positive integer.
 *                         For "seconds", values must be less than 60 or multiples of 60.
 *                         For "minutes", values must be less than 60 or multiples of 60.
 *                         For "hours", values must be less than 24 or multiples of 24.
 * @param {TimeUnit} [unit="seconds"] - The unit of the time value. Can be "seconds", "minutes", "hours", or "days".
 * @param {boolean} [repeatSameDay=true] - Whether to repeat the cron job on the same day when the interval is greater than or equal to one day.
 * @returns {string} The corresponding cron expression.
 * @throws {Error} If the value is not a positive integer, if the value does not meet the unit constraints, or if an invalid time unit is provided.
 *
 * @example
 * // Returns "*\/30 * * * * *"
 * timeToCron(30);
 *
 * @example
 * // Returns "0 *\/6 * * * *"
 * timeToCron(360, "seconds");
 *
 * @example
 * // Returns "0 0 *\/1 * * *"
 * timeToCron(3600, "seconds");
 *
 * @example
 * // Returns "0 0 *\/2 * * *"
 * timeToCron(120, "minutes");
 *
 * @example
 * // Returns "0 0 0 *\/2 * *"
 * timeToCron(2, "days");
 *
 * @copyright 2024 aquarela.io
 * @author Diego Peixoto <@diegopeixoto on GitHub>
 * @license MIT
 */

type TimeUnit = "seconds" | "minutes" | "hours" | "days";

export function timeToCron(
  value: number,
  unit: TimeUnit = "seconds",
  repeatSameDay: boolean = true
): string {
  if (value <= 0 || !Number.isInteger(value)) {
    throw new Error("Value must be a positive integer");
  }

  switch (unit) {
    case "seconds":
      if (value < 60) {
        return `*/${value} * * * * *`;
      } else if (value % 60 === 0) {
        const minutes = value / 60;
        if (minutes < 60) {
          return `0 */${minutes} * * * *`;
        } else if (minutes % 60 === 0) {
          const hours = minutes / 60;
          return `0 0 */${hours} * * *`;
        } else {
          return `0 ${minutes % 60} */${Math.floor(minutes / 60)} * * *`;
        }
      } else {
        throw new Error(
          "Seconds value must be less than 60 or a multiple of 60"
        );
      }

    case "minutes":
      if (value < 60) {
        return `0 */${value} * * * *`;
      } else if (value % 60 === 0) {
        const hours = value / 60;
        if (hours < 24) {
          return `0 0 */${hours} * * *`;
        } else if (hours % 24 === 0) {
          const days = hours / 24;
          return `0 0 0 */${days} * *`;
        } else {
          return `0 0 ${hours % 24} */${Math.floor(hours / 24)} * *`;
        }
      } else {
        throw new Error(
          "Minutes value must be less than 60 or a multiple of 60"
        );
      }

    case "hours":
      if (value < 24) {
        return `0 0 */${value} * * *`;
      } else if (value % 24 === 0) {
        const days = value / 24;
        return `0 0 0 */${days} * *`;
      } else {
        throw new Error("Hours value must be less than 24 or a multiple of 24");
      }

    case "days":
      return `0 0 0 */${value} * *`;

    default:
      throw new Error("Invalid time unit");
  }
}
