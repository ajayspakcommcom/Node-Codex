import { isDeepStrictEqual } from "node:util";

type TestFn = () => void | Promise<void>;

interface TestCase {
  readonly name: string;
  readonly test: TestFn;
}

const suites: string[] = [];
let tests: TestCase[] = [];

export function reset(): void {
  suites.length = 0;
  tests = [];
}

export function describe(name: string, build: () => void): void {
  suites.push(name);
  build();
  suites.pop();
}

export function it(name: string, test: TestFn): void {
  tests.push({
    name: [...suites, name].join(" > "),
    test,
  });
}

function formatValue(value: unknown): string {
  return JSON.stringify(value, null, 2) ?? String(value);
}

export function expect<T>(actual: T) {
  return {
    toBe(expected: T): void {
      if (!Object.is(actual, expected)) {
        throw new Error(`Expected ${formatValue(actual)} to be ${formatValue(expected)}`);
      }
    },
    toEqual(expected: unknown): void {
      if (!isDeepStrictEqual(actual, expected)) {
        throw new Error(`Expected ${formatValue(actual)} to equal ${formatValue(expected)}`);
      }
    },
    toHaveLength(expected: number): void {
      const length = (actual as { length?: number }).length;
      if (length !== expected) {
        throw new Error(`Expected length ${length} to be ${expected}`);
      }
    },
    toContain(expected: unknown): void {
      if (!Array.isArray(actual) && typeof actual !== "string") {
        throw new Error("toContain supports arrays and strings only");
      }

      if (!actual.includes(expected as never)) {
        throw new Error(`Expected ${formatValue(actual)} to contain ${formatValue(expected)}`);
      }
    },
  };
}

export async function run(): Promise<void> {
  let passed = 0;

  for (const test of tests) {
    try {
      await test.test();
      passed += 1;
      console.log(`PASS ${test.name}`);
    } catch (error) {
      console.error(`FAIL ${test.name}`);
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
      throw error;
    }
  }

  console.log(`\n${passed}/${tests.length} test database examples passed`);
  reset();
}
