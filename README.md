# @aquarela/time-to-cron (Canary Version)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/13aba93ef2784b3288a28561bce307da)](https://app.codacy.com/gh/aquarela-io/time-to-cron/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CodeFactor](https://www.codefactor.io/repository/github/aquarela-io/time-to-cron/badge)](https://www.codefactor.io/repository/github/aquarela-io/time-to-cron)

`@aquarela/time-to-cron` is a utility library designed to convert time intervals
into cron expressions. This package is particularly useful for developers
looking to schedule tasks in environments that require cron syntax, providing a
simple interface to generate accurate cron schedules.

**Note:** This is a **canary** version of `@aquarela/time-to-cron`. Canary
versions are pre-release versions that may contain experimental features or
changes. Please use with caution in production environments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing the Function](#importing-the-function)
  - [Examples](#examples)
    - [Convert Seconds](#convert-seconds)
    - [Convert Minutes](#convert-minutes)
    - [Convert Hours](#convert-hours)
    - [Convert Days](#convert-days)
- [API](#api)
- [Validation Rules](#validation-rules)
- [Publishing and Using Canary Versions](#publishing-and-using-canary-versions)
  - [Using the Canary Version](#using-the-canary-version)
  - [Versioning Convention in `package.json`](#versioning-convention-in-packagejson)
- [Testing](#testing)
- [Repository](#repository)
- [License](#license)
- [Author](#author)

## Installation

Install the package using npm. Since this is a canary version, you need to
specify the `canary` tag:

```sh
npm install @aquarela/time-to-cron@canary
```

Alternatively, you can specify the exact canary version:

```sh
npm install @aquarela/time-to-cron@1.0.0-canary.0
```

## Usage

Use the `timeToCron` function to convert time values into cron expressions.
Below are some examples of how to utilize this function effectively.

### Importing the Function

First, import the `timeToCron` function:

```typescript
import { timeToCron } from "@aquarela/time-to-cron";
```

### Examples

#### Convert Seconds

Convert a number of seconds to a cron expression. The value can be less than 60
or a multiple of 60.

```typescript
const cronExpression = timeToCron(30);
console.log(cronExpression); // "*/30 * * * * *"
```

#### Convert Minutes

Convert a number of minutes to a cron expression. The value can be less than 60
or a multiple of 60.

```typescript
const cronExpression = timeToCron(15, "minutes");
console.log(cronExpression); // "0 */15 * * * *"
```

#### Convert Hours

Convert a number of hours to a cron expression. The value must be less than 24
or a multiple of 24.

```typescript
const cronExpression = timeToCron(4, "hours");
console.log(cronExpression); // "0 0 */4 * * *"
```

#### Convert Days

Convert a number of days to a cron expression. The value is the number of days
between executions.

```typescript
const cronExpression = timeToCron(2, "days");
console.log(cronExpression); // "0 0 0 */2 * *"
```

## API

### `timeToCron(value: number, unit: TimeUnit = "seconds"): string`

Converts a time value to a cron expression.

- **value**: The time value to convert. Must be a positive integer.
- **unit**: The unit of the time value. Can be `"seconds"`, `"minutes"`,
  `"hours"`, or `"days"`. Default is `"seconds"`.

Returns the corresponding cron expression as a string.

Throws an error if the value is not a positive integer, does not meet the unit
constraints (such as being a multiple of 60 for minutes), or if an invalid time
unit is provided.

## Validation Rules

- **Seconds**: Must be less than 60 or a multiple of 60.
- **Minutes**: Must be less than 60 or a multiple of 60.
- **Hours**: Must be less than 24 or a multiple of 24.
- **Days**: Any positive integer value is valid.

## Using Canary Versions

To use the canary version of this package, you need to specify the `canary` tag
when installing:

```sh
npm install @aquarela/time-to-cron@canary
```

Alternatively, you can specify the exact canary version, for example:

```sh
npm install @aquarela/time-to-cron@1.0.0-canary.0
```

## Testing

To run the tests, execute the following command:

```sh
npm test
```

## Repository

For more information and to contribute, visit the
[GitHub repository](https://github.com/aquarela-io/time-to-cron).

## License

This project is licensed under the MIT License. See the
[LICENSE](https://github.com/aquarela-io/time-to-cron/blob/main/LICENSE) file
for details.

## Author

Diego Peixoto - [@diegopeixoto on GitHub](https://github.com/diegopeixoto)
