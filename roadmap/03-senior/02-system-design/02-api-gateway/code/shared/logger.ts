export const logger = {
  section(title: string): void {
    console.log(`\n=== ${title} ===`);
  },

  line(message: string): void {
    console.log(message);
  },

  json(label: string, value: unknown): void {
    console.log(`${label}: ${JSON.stringify(value, null, 2)}`);
  },
};
