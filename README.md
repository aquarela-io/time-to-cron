# @aquarela/time-to-cron

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/13aba93ef2784b3288a28561bce307da)](https://app.codacy.com/gh/aquarela-io/time-to-cron/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

`@aquarela/time-to-cron` is a utility library designed to convert time intervals into cron expressions. This package is particularly useful for developers looking to schedule tasks in environments that require cron syntax, providing a simple interface to generate accurate cron schedules.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing the Function](#importing-the-function)
  - [Examples](#examples)
    - [Convert Seconds](#convert-seconds)
    - [Convert Minutes](#convert-minutes)
    - [Convert Hours](#convert-hours)
    - [Convert Days](#convert-days)
    - [Disable Repeat on Same Day](#disable-repeat-on-same-day)
- [API](#api)
- [Validation Rules](#validation-rules)
- [Testing](#testing)
- [Repository](#repository)
- [License](#license)
- [Author](#author)

## Installation

Install the package using npm:

```sh
npm install @aquarela/time-to-cron
```

## Usage

Use the `timeToCron` function to convert time values into cron expressions. Below are some examples of how to utilize this function effectively.

### Importing the Function

First, import the `timeToCron` function:

```typescript
import { timeToCron } from "@aquarela/time-to-cron";
```

### Examples

#### Convert Seconds

Convert a number of seconds to a cron expression. The value can be less than 60 or a multiple of 60.

```typescript
const cronExpression = timeToCron(30);
console.log(cronExpression); // "*/30 * * * * *"
```

#### Convert Minutes

Convert a number of minutes to a cron expression. The value can be less than 60 or a multiple of 60.

```typescript
const cronExpression = timeToCron(60, "minutes");
console.log(cronExpression); // "0 0 */1 * * *"
```

#### Convert Hours

Convert a number of hours to a cron expression. The value must be less than 24 or a multiple of 24.

```typescript
const cronExpression = timeToCron(2, "hours");
console.log(cronExpression); // "0 0 */2 * * *"
```

#### Convert Days

Convert a number of days to a cron expression. The value is the number of days between executions.

```typescript
const cronExpression = timeToCron(2, "days");
console.log(cronExpression); // "0 0 0 */2 * *"
```

#### Disable Repeat on Same Day

Disable repeating the cron job on the same day when the interval is equal to or greater than one day. This is useful for scenarios where you want the task to run at a specific interval starting at midnight.

```typescript
const cronExpression = timeToCron(60, "minutes", false);
console.log(cronExpression); // "0 0 0/1 * * *"
```

## API

### `timeToCron(value: number, unit: TimeUnit = "seconds", repeatSameDay: boolean = true): string`

Converts a time value to a cron expression.

- **value**: The time value to convert. Must be a positive integer.
- **unit**: The unit of the time value. Can be `"seconds"`, `"minutes"`, `"hours"`, or `"days"`. Default is `"seconds"`.
- **repeatSameDay**: (Optional) Whether to repeat the cron job on the same day when the interval is greater than or equal to one day. Default is `true`.

Returns the corresponding cron expression as a string.

Throws an error if the value is not a positive integer, does not meet the unit constraints (such as being a multiple of 60 for minutes), or if an invalid time unit is provided.

## Validation Rules

- **Seconds**: Must be less than 60 or a multiple of 60.
- **Minutes**: Must be less than 60 or a multiple of 60.
- **Hours**: Must be less than 24 or a multiple of 24.
- **Days**: Any positive integer value is valid.

## Testing

To run the tests, execute the following command:

```sh
npm test
```

## Repository

For more information and to contribute, visit the [GitHub repository](https://github.com/aquarela-io/time-to-cron).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/aquarela-io/time-to-cron/blob/main/LICENSE) file for details.

## Author

Diego Peixoto - [@diegopeixoto on GitHub](https://github.com/diegopeixoto)
