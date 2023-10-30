import { readdir } from "node:fs/promises";
import { join, parse } from "node:path";

const walk = async (dirPath) =>
  Promise.all(
    await readdir(dirPath, { withFileTypes: true }).then((entries) =>
      entries.map((entry) => {
        const childPath = join(dirPath, entry.name);
        const info = parse(childPath);
        return entry.isDirectory() ? walk(childPath) : info;
      })
    )
  );

export const findAllFiles = async (dirPath) => {
  const allFiles = await walk(dirPath);

  return allFiles.flat(Number.POSITIVE_INFINITY);
};
