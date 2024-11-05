import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const walk = async (dirPath, rec) =>
  Promise.all(
    await readdir(dirPath, { withFileTypes: true }).then(async (entries) =>
      entries.map(async (entry) => {
        const childPath = join(dirPath, entry.name);
        const info = parse(childPath);
        if (!entry.isDirectory()) {
          const s = await stat(childPath);
          info.size = s.size;
        }
        return rec && entry.isDirectory() ? walk(childPath, rec) : info;
      })
    )
  );

export const findAllFiles = async (dirPath, recursive) => {
  const rec = recursive ?? true;
  const allFiles = await walk(dirPath, rec);
  return allFiles.flat(Number.POSITIVE_INFINITY);
};
