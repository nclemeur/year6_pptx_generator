import { join } from "node:path";
import fs from "fs";
import { key } from "./loadStudents2023.js";
import { findAllFiles } from "./util.js";
import sharp from "sharp";

export const fixPrep2023 = async () => {
  const dir =
    "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\2017 Prep\\";
  async function fixPrep() {
    const files = await findAllFiles(dir);
    const allFiles = {};

    for (const info of files) {
      if (info.name.toLowerCase() === "thumbs") {
        continue;
      }
      const k = key(info.name);
      const obj = allFiles[k] ?? { files: [] };
      obj.files.push(info);
      allFiles[k] = obj;
    }
    return allFiles;
  }
  const allFiles = await fixPrep();
  for (const k in allFiles) {
    const obj = allFiles[k];
    if (obj.files.length > 1) {
      const files = obj.files;
      files.sort((a, b) => {
        if (true) {
          return a.size > b.zize ? 1 : -1;
        }
      });
      for (let i = 0; i < files.length; i++) {
        if (i == 0) {
          continue;
        }
        const f = files[i];
        const fullPath = join(dir, f.base);
        console.log("Deleting file " + fullPath);
        await fs.unlink(fullPath);
      }
    }
  }
  console.log("Done!");
};

export const cropPrep2023 = async () => {
  const dir =
    "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\2017 Prep Originals\\";
  const destDir =
    "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\2017 Prep\\";

  const files = await findAllFiles(dir, false);
  const allFiles = {};

  for (const info of files) {
    if (info.name.toLowerCase() === "thumbs") {
      continue;
    }
    const k = key(info.name);
    const obj = allFiles[k] ?? { files: [] };
    obj.files.push(info);
    allFiles[k] = obj;
  }
  for (const k in allFiles) {
    const obj = allFiles[k];
    if (obj.files.length > 1) {
      throw Error("Multiple files with same key ");
    }

    const fileInfo = obj.files[0];
    const fullPath = join(fileInfo.dir, fileInfo.base);

    if (!fileInfo.ext) {
      //probably folder
      continue;
    }

    const _sharp = sharp(fullPath);
    const met = await _sharp.metadata();
    let crop = true;
    if (met.width < 1000 || met.height < 1000) {
      crop = false;
      console.log(`Skipping file ${fullPath}: too small!`, {
        width: met.width,
        height: met.height,
      });
    }
    const IMG_SIZE = { width: 3024, height: 4032 };
    if (
      crop &&
      (met.width != IMG_SIZE.width || met.height != IMG_SIZE.height)
    ) {
      console.log(`Skipping file ${fullPath}: invalide size!`, {
        width: met.width,
        height: met.height,
      });
      continue;
    }
    const DEST_WIDTH = 2600;
    const DEST_HEIGHT = Math.round((DEST_WIDTH * 4) / 3); //3467
    const destPath = join(destDir, fileInfo.base);
    const extractedSharp = crop
      ? _sharp.extract({
          left: 280,
          top: 400,
          width: DEST_WIDTH,
          height: DEST_HEIGHT,
        })
      : _sharp;

    if (crop) {
      await extractedSharp.toFile(destPath);
    } else {
      fs.copyFileSync(fullPath, destPath);
    }
    //console.log(fullPath, met);
  }
  console.log("Done!");
};
