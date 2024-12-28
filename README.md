# @aquarela/time-to-cron

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/13aba93ef2784b3288a28561bce307da)](https://app.codacy.com/gh/aquarela-io/time-to-cron/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CodeFactor](https://www.codefactor.io/repository/github/aquarela-io/time-to-cron/badge)](https://www.codefactor.io/repository/github/aquarela-io/time-to-cron)
![Test](https://github.com/aquarela-io/time-to-cron/actions/workflows/test.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40aquarela%2Ftime-to-cron)
![NPM Downloads](https://img.shields.io/npm/dt/%40aquarela%2Ftime-to-cron)
![NPM License](https://img.shields.io/npm/l/%40aquarela%2Ftime-to-cron)

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
    - [Using Predefined Schedules](#using-predefined-schedules)
- [API](#api)
- [Validation Rules](#validation-rules)
- [Testing](#testing)
- [Contributing](#contributing)
- [Repository](#repository)
- [License](#license)
- [Author](#author)

## Installation

Install the package using npm:

```sh
npm install @aquarela/time-to-cron
```

You can also use it directly in the browser via jsDelivr:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@aquarela/time-to-cron"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@aquarela/time-to-cron@2.1.1"></script>

<!-- ES Module version -->
<script type="module">
  import { timeToCron } from "https://cdn.jsdelivr.net/npm/@aquarela/time-to-cron/dist/index.esm.js";
</script>
```

When using via jsDelivr in the browser with a script tag, the function is available globally as `timeToCron`.

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
const cronExpression = timeToCron(15, "minutes");
console.log(cronExpression); // "0 */15 * * * *"
```

#### Convert Hours

Convert a number of hours to a cron expression. The value must be less than 24 or a multiple of 24.

```typescript
const cronExpression = timeToCron(4, "hours");
console.log(cronExpression); // "0 0 */4 * * *"
```

#### Convert Days

Convert a number of days to a cron expression. The value is the number of days between executions.

```typescript
const cronExpression = timeToCron(2, "days");
console.log(cronExpression); // "0 0 0 */2 * *"
```

#### Using Predefined Schedules

You can also use predefined schedule expressions for common time patterns:

```typescript
// Common time intervals
timeToCron("@hourly"); // "0 0 * * * *"
timeToCron("@daily"); // "0 0 0 * * *"
timeToCron("@weekly"); // "0 0 0 * * 0"
timeToCron("@monthly"); // "0 0 0 1 * *"
timeToCron("@yearly"); // "0 0 0 1 1 *"

// Additional schedules
timeToCron("@midnight"); // "0 0 0 * * *" (same as @daily)
timeToCron("@annually"); // "0 0 0 1 1 *" (same as @yearly)
timeToCron("@every12hours"); // "0 0 0/12 * * *"
timeToCron("@biweekly"); // "0 0 0 * * 0/2"
```

## API

### `timeToCron(value: number | PredefinedSchedule, unit?: TimeUnit): string`

Converts a time value or predefined schedule to a cron expression.

- **value**: Either a numeric time value or a predefined schedule string. When using a number, it must be a positive integer. When using a predefined schedule, it must be one of the supported schedule expressions.
- **unit**: The unit of the time value (only used when `value` is a number). Can be `"seconds"`, `"minutes"`, `"hours"`, or `"days"`. Default is `"seconds"`.

Supported predefined schedules:

- `@yearly` or `@annually`: Run once a year at midnight of January 1
- `@monthly`: Run once a month at midnight of the first day
- `@weekly`: Run once a week at midnight on Sunday
- `@daily` or `@midnight`: Run once a day at midnight
- `@hourly`: Run once an hour at the beginning of the hour
- `@every12hours`: Run every 12 hours
- `@biweekly`: Run every two weeks

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

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Add your changes.
4. Run `npm test` to ensure all tests pass.
5. Submit a pull request.

## Repository

For more information and to contribute, visit the [GitHub repository](https://github.com/aquarela-io/time-to-cron).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/aquarela-io/time-to-cron/blob/main/LICENSE) file for details.

## Author

Diego Peixoto - [@diegopeixoto on GitHub](https://github.com/diegopeixoto)
