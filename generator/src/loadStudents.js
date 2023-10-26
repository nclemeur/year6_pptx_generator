import readline from "readline";
import events from "events";
import fs from "fs";
import { CLASS_LISTS_FOLDER, PREP_PHOTOS_FOLDER } from "./config_2022.js";
import LAYOUT from "./config_2022.js";

export default async function loadStudents(classes) {
  const ctxByClass = {};
  const allYear6Missing = [];
  const allPrepMissing = [];
  for (let cl of classes) {
    const ctx = await readClass(cl);
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

async function readClass(cl) {
  const students = [];
  const ctx = { year: cl, students, missing_year6: [], missing_prep: [] };
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(CLASS_LISTS_FOLDER + cl + ".txt"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      let str = line.trim();
      if (str.toLowerCase().startsWith("number of students:")) {
        const expectedTotal = parseInt(str.split(":")[1].trim());
        if (expectedTotal === students.length) {
          console.log(`Loaded ${expectedTotal} students in class ${cl}`);
        } else {
          console.error(
            `Error! Loaded ${students.length} students in class ${cl}, was expecting ${expectedTotal}`
          );
        }
      } else {
        students.push(extractStudentInfo(ctx, str, cl));
      }
    });

    await events.once(rl, "close");

    return ctx;
  } catch (err) {
    console.error(err);
  }
}

function extractStudentInfo(ctx, str, cl) {
  const info = { fullInfo: str };
  if (str.endsWith(" F 06 " + cl)) {
    info.gender = "F";
  } else if (str.endsWith(" M 06 " + cl)) {
    info.gender = "M";
  } else {
    log.error("Invalid student info format", str);
    return;
  }
  const nameStr = str.substr(0, str.length - (" F 06 " + cl).length);
  const nameParts = nameStr.trim().split(", ");
  if (nameParts.length !== 2) {
    log.error("Invalid student info format", str);
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
