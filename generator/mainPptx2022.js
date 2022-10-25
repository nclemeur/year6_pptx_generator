import { readdirSync } from "fs";
import { basename, extname } from "path";
import pptxgen from "pptxgenjs";

import config from "./src/config.js";
import { createMasterSlide } from "./src/createMasterSlide.js";
import { createSlide2022 } from "./src/createSlide2022.js";
import { checkMissing, extractNamesInfo } from "./src/extraName.js";
import loadStudents from "./src/loadStudents.js";

export default async () => {
  const genPptx = true;

  const years = ["6A", "6B", "6C", "6D", "6E", "6F", "6G"];
  //const years = ["6D"];
  const byYearInfo = await loadStudents(years);

  if (!genPptx) {
    return;
  }

  for (const year of years) {
    console.log(`Creating presentation for year ${year}`);
    let nbrSlides = 0;
    const pres = new pptxgen();
    pres.defineLayout({ name: "LAYOUT_A4", width: 11.7, height: 8.25 });
    pres.layout = config.LAYOUT;
    createMasterSlide(pres);
    const thisYearInfo = byYearInfo[year];

    for (const student of thisYearInfo.students) {
      nbrSlides++;
      await createSlide2022(student, pres);
    }
    pres.writeFile(
      { fileName: `..\\..\\${config.FILENAME_PREFIX}_${year}.pptx` },
      { compression: true }
    );
    console.log(
      `Creating presentation for year ${year}...Done, ${nbrSlides} slides generated.`
    );
  }
};
