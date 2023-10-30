import mainPptx from "./mainPptx.js";
import mainPptx2023 from "./mainPptx2023.js";
import mainPptx2022 from "./mainPptx2022.js";
import mainPdfLabels from "./mainPdfLabels.js";

const pptx = true;
const use2022 = false;
const use2023 = true;

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
