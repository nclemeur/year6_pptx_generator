import readline from "readline";
import events from "events";
import fs from "fs/promises";
import {
  CLASS_LISTS_CSV,
  PREP_PHOTOS_FOLDER,
  PHOTOS_FOLDER,
} from "./config_2023.js";
import LAYOUT from "./config_2022.js";
import { parse } from "csv-parse/sync";
import { findAllFiles } from "./util.js";

export const PHOTOS_FOLDER_MSP =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\Year 6 MSP";

function key(name) {
  //name does not include extension, but prossiby suffix - P for preps
  //also removing ' P;
  let str = name.trim().toLowerCase().replaceAll(" ", "");
  if (str.endsWith("-p")) {
    str = str.substring(0, str.length - 2);
  }
  return str;
}

async function loadPhotos(dir, prop) {
  const files = await findAllFiles(dir);
  const allFiles = {};

  for (const info of files) {
    if (info.name.toLowerCase() === "thumbs") {
      continue;
    }
    const k = key(info.name);
    if (allFiles[k]) {
      throw Error("Duplicate key " + k);
    }
    const obj = {};
    obj[prop] = info;
    allFiles[k] = obj;
  }
  return allFiles;
}

const expectedMismatch = [
  "abdelhalim,ahmed",
  "chen,lillian",
  "fan,jaden-not_used1",
  "fan,jaden-not_used",
  "gamlakshagedon,nethayanot_used",
];

export async function loadStudents(classes) {
  const allYear6Files = await loadPhotos(PHOTOS_FOLDER, "year6");
  const allPrepFiles = {};
  let prepOnly = 0;
  for (const prepDir of PREP_PHOTOS_FOLDER) {
    const prepFiles = await loadPhotos(prepDir, "prep");
    for (const [key, value] of Object.entries(prepFiles)) {
      if (allPrepFiles[key]) {
        throw Error("Duplicate photos? " + value);
      }
      allPrepFiles[key] = value;

      let o = allYear6Files[key];
      if (!o) {
        prepOnly++;
        if (!expectedMismatch.includes(key)) {
          console.log(
            `${key} + " not found in year 6? ${prepOnly}`,
            value.prep
          );
        }
        o = {};
        allYear6Files[key] = o;
      }
      o["prep"] = value.prep;
    }
  }

  //console.log(allYear6Files);

  const content = await fs.readFile(CLASS_LISTS_CSV);

  const allStudents = parse(content, {
    columns: true,
    columns: (header) => ["fullName", null, "class"],
    skip_empty_lines: true,
  });

  let a = true;
  if (a) {
    return;
  }

  const ctxByClass = {};
  const allYear6Missing = [];
  const allPrepMissing = [];
  for (let cl of classes) {
    const students = allStudents.filter((s) => s.class === cl);
    const ctx = await readClass(cl, students);
    allYear6Missing.push(...ctx.missing_year6);
    allPrepMissing.push(...ctx.missing_prep);
    ctxByClass[cl] = ctx;
  }

  allYear6Missing.sort();
  console.log(
    "====== Missing year 6 photos: " + allYear6Missing.length + " ===== "
  );
  allYear6Missing.forEach((s) => console.log(s));

  allPrepMissing.sort();
  console.log(
    "====== Missing prep photos: " + allPrepMissing.length + " ===== "
  );
  allPrepMissing.forEach((s) => console.log(s));

  return ctxByClass;
}

async function readClass(cl, students) {
  const ctx = { year: cl, students, missing_year6: [], missing_prep: [] };
  for (const s of students) {
    extractStudentInfo(ctx, s, cl);
  }
  return ctx;
}

function extractStudentInfo(ctx, student, cl) {
  const info = {};
  const nameStr = student.fullName;
  const nameParts = nameStr.trim().split(", ");
  if (nameParts.length !== 2) {
    log.error("Invalid student info format", nameStr);
  }
  info.lastName = nameParts[0].trim();
  info.firstName = nameParts[1].trim();

  const fileName = info.lastName + ", " + info.firstName + ".jpg";

  const path = cl + "\\" + fileName;

  const year6Path = LAYOUT.PHOTOS_FOLDER + path;

  if (fs.existsSync(year6Path)) {
    info.year6Name = fileName;
    info.year6Path = year6Path;
  } else {
    ctx.missing_year6.push(info.lastName + ", " + info.firstName + " " + cl);
  }

  let prepExistings = [];
  let prepFileNameExisting = [];
  PREP_PHOTOS_FOLDER.forEach((f) => {
    const prepFileName = info.lastName + ", " + info.firstName + " - P.jpg";
    const prepPath = f + prepFileName;
    if (fs.existsSync(prepPath)) {
      prepExistings.push(prepPath);
      prepFileNameExisting.push(prepFileName);
    }
  });

  if (prepExistings.length === 1) {
    info.prepPath = prepExistings[0];
    info.prepFileName = prepFileNameExisting[0];
  } else if (prepExistings.length > 1) {
    console.warn(
      "Multiple prep photo for " +
        info.lastName +
        ", " +
        info.firstName +
        " " +
        cl
    );
  } else {
    ctx.missing_prep.push(info.lastName + ", " + info.firstName + " " + cl);
  }

  return info;
}
