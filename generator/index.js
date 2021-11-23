import { readdirSync } from "fs";
import { basename, extname } from "path";
import pptxgen from "pptxgenjs";

import config from "./src/config.js";
import { createMasterSlide } from "./src/createMasterSlide.js";
import { createSlide } from "./src/createSlide.js";
import { checkMissing, extractNamesInfo } from "./src/extraName.js";



const allFiles = readdirSync(config.PHOTOS_FOLDER);
const jpgFiles = allFiles.filter(function (file) {
    return extname(file) === ".jpg";
  });

const allFilesInfos = []; 
jpgFiles.forEach(f => {
    allFilesInfos.push(extractNamesInfo(basename(f)));
});
checkMissing(allFilesInfos);

//console.log(allFilesInfos[0]);
const genPptx = true;

const images = ['65H Campbell, Calum.jpg', '65H Clavera Agard, Amelia.jpg', '65H Coombes, Sam.jpg'];
const years = ['6A', '6B', '6C', '6D', '6E', '6F', '6G', '65H'];

if(genPptx){

    for(const year of years){
        //if(year!=='6A'){
        //    continue;
        //}
        console.log(`Creating presentation for year ${year}`);
        let nbrSlides = 0;
        const pres = new pptxgen();
        //pres.layout = 'LAYOUT_4x3';
        createMasterSlide(pres);
        for(const fileInfo of allFilesInfos){
            if(year!==fileInfo.year){
                continue;
            }
            if(!fileInfo.prep){
                nbrSlides++;
                await createSlide(allFilesInfos, fileInfo, pres);
            }
        }       
        pres.writeFile({ fileName: `..\\..\\Testing_${year}.pptx` }, { compression: false});
        console.log(`Creating presentation for year ${year}...Done, ${nbrSlides} slides generated.`);
   }
    
    
    
}
