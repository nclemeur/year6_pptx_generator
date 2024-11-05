import mainPptx from "./mainPptx.js";
import mainPptx2023 from "./mainPptx2023.js";
import mainPptx2022 from "./mainPptx2022.js";
import mainPdfLabels from "./mainPdfLabels.js";

import { cropPrep2023, fixPrep2023 } from "./src/util2003.js";

const pptx = true;
const use2022 = false;
const use2023 = true;

const fixPrep = false;
const cropPrep = false;
if (fixPrep) {
  await fixPrep2023();
}
if (cropPrep) {
  await cropPrep2023();
}

if (!fixPrep && !cropPrep) {
  if (pptx) {
    if (use2023) {
      await mainPptx2023();
    } else if (use2022) {
      await mainPptx2022();
    } else {
      await mainPptx();
    }
  } else {
    await mainPdfLabels();
  }
}
