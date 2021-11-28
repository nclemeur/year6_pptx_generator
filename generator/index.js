

import mainPptx  from "./mainPptx.js";
import mainPdfLabels from "./mainPdfLabels.js";

const pptx = true;

if(pptx){
    await mainPptx();
} else {
    await mainPdfLabels();
}