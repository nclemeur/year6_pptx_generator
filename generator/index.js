import { readdirSync } from "fs";
import { extname, basename } from "path";
import pptxgen from "pptxgenjs";

import config from "./src/config.js";
import { createSlide } from "./src/createSlide.js";



const allFiles = readdirSync(config.PHOTOS_FOLDER);
const jpgFiles = allFiles.filter(function (file) {
    return extname(file) === ".jpg";
  });


console.log(jpgFiles[0]);
const genPptx = true;

const images = ['65H Campbell, Calum.jpg', '65H Clavera Agard, Amelia.jpg', '65H Coombes, Sam.jpg'];


if(genPptx){
    const pres = new pptxgen();

    for (const imageName of images) {    
        await createSlide(imageName, pres);
    }
    console.log(`All slides (${images.length}) created`);
    pres.writeFile({ fileName: "..\\..\\Testing.pptx" }, { compression: false});
}
