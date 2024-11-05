import readline from "readline";
import events from "events";
import fs from "fs/promises";
import {
  CLASS_LISTS_CSV,
  PREP_PHOTOS_FOLDER,
  PHOTOS_FOLDER,
} from "./config_2023.js";
import { parse } from "csv-parse/sync";
import { findAllFiles } from "./util.js";

export const PHOTOS_FOLDER_MSP =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\Year 6 MSP";

export function key(name) {
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

const expectedPrepMismatch = [
  "abdelhalim,ahmed",
  "chen,lillian",
  "fan,jaden-not_used1",
  "fan,jaden-not_used",
  "gamlakshagedon,nethayanot_used",
  "huang,yiyi",
  "liu,mike",
  "nithyanand,shivaniunused",
  "park,seawoo",
  "raj,neil",
  "wong,hayley",
  "yoon,dohyun",
  "abdelhalim,ahmed-p2",
  "abdeyazdan,mohammad-p2",
  "ahmed,mohammed-p2",
  "ahuja,kanushi-p2",
];

export async function loadStudents(classes) {
  const allYear6Files = await loadPhotos(PHOTOS_FOLDER, "year6");
  const allPrepFiles = {};
  let prepOnly = 0;
  let displayedErrors = 0;
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
        if (
          !key.endsWith("-p2") &&
          !key.endsWith("-p0") &&
          !key.endsWith("-punused") &&
          !key.endsWith("-p3") &&
          !expectedPrepMismatch.includes(key)
        ) {
          displayedErrors++;
          console.log(
            `${key} + " not found in year 6? ${displayedErrors}/${prepOnly}`,
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

  const ctxByClass = {};
  const allYear6Missing = [];
  const allPrepMissing = [];
  for (let cl of classes) {
    const students = allStudents.filter((s) => s.class === cl);
    const ctx = await readClass(cl, students, allYear6Files);
    allYear6Missing.push(...ctx.missing_year6);
    allPrepMissing.push(...ctx.missing_prep);
    ctxByClass[cl] = ctx;
  }

  allYear6Missing.sort();
  let missingInfo =
    "====== Missing year 6 photos: " + allYear6Missing.length + " ===== ";

  allYear6Missing.forEach((s) => (missingInfo += "\r\n" + s));

  allPrepMissing.sort();
  missingInfo +=
    "\r\n====== Missing prep photos: " + allPrepMissing.length + " ===== ";
  allPrepMissing.forEach((s) => (missingInfo += "\r\n" + s));

  try {
    await fs.writeFile("..\\..\\missing.txt", missingInfo);
  } catch (err) {
    console.error(err);
  }

  return ctxByClass;
}

async function readClass(cl, students, allYear6Files) {
  const ctx = { year: cl, missing_year6: [], missing_prep: [] };
  const studentInfos = [];
  for (const s of students) {
    const info = extractStudentInfo(ctx, s, cl, allYear6Files);
    studentInfos.push(info);
  }
  ctx.students = studentInfos;
  return ctx;
}

function extractStudentInfo(ctx, student, cl, allYear6Files) {
  const info = { ...student };
  const nameStr = student.fullName;
  const nameParts = nameStr.trim().split(", ");
  if (nameParts.length !== 2) {
    log.error("Invalid student info format", nameStr);
  }

  info.lastName = nameParts[0].trim();
  info.firstName = nameParts[1].trim();
  const k = key(student.fullName);
  const fileInfos = allYear6Files[k] ?? {};

  if (fileInfos.year6) {
    info.year6 = fileInfos.year6;
  } else {
    ctx.missing_year6.push(nameStr + " " + cl);
  }
  if (fileInfos.prep) {
    info.prep = fileInfos.prep;
  } else {
    ctx.missing_prep.push(nameStr + " " + cl);
  }

  return info;
}
