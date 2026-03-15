import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const templatePath = resolve(rootDir, "public", "config.template.js");
const outputPath = resolve(rootDir, "public", "config.js");

const defaults = {
  LOVED_ONE_NAME: "Iris",
  BIRTHDAY_MONTH: "3",
  BIRTHDAY_DAY: "19",
};

const template = await readFile(templatePath, "utf8");

const values = {
  LOVED_ONE_NAME: process.env.LOVED_ONE_NAME || defaults.LOVED_ONE_NAME,
  BIRTHDAY_MONTH: process.env.BIRTHDAY_MONTH || defaults.BIRTHDAY_MONTH,
  BIRTHDAY_DAY: process.env.BIRTHDAY_DAY || defaults.BIRTHDAY_DAY,
};

const content = template.replace(
  /\$\{(LOVED_ONE_NAME|BIRTHDAY_MONTH|BIRTHDAY_DAY)\}/g,
  (_, key) => values[key]
);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, content, "utf8");

console.log(`Generated ${outputPath}`);
