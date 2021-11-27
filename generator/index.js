

import mainPptx  from "./mainPptx.js";
import mainPdfLabels from "./mainPdfLabels.js";

const pptx = false;

if(pptx){
    await mainPptx();
} else {
    await mainPdfLabels();
}