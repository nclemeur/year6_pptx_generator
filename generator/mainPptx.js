import { readdirSync } from "fs";
import { basename, extname } from "path";
import pptxgen from "pptxgenjs";

import config from "./src/config.js";
import { createMasterSlide } from "./src/createMasterSlide.js";
import { createSlide } from "./src/createSlide.js";
import { checkMissing, extractNamesInfo } from "./src/extraName.js";

export default async () => {

const allFiles = readdirSync(config.PHOTOS_FOLDER);
const jpgFiles = allFiles.filter(function (file) {
    const ext = extname(file).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg";
  });


const allFilesInfos = []; 
jpgFiles.forEach(f => {
    allFilesInfos.push(extractNamesInfo(basename(f)));
});
allFilesInfos.sort((a,b) => a.key.localeCompare(b.key));
checkMissing(allFilesInfos);

const genPptx = true;
const years = ['6A', '6B', '6C', '6D', '6E', '6F', '6G', '65H'];

for(const year of years){
    if(year!=='65H'){
        continue;
    }
    console.log(`Creating presentation for year ${year}`);
    let nbrSlides = 0;
    const pres = new pptxgen();
    pres.defineLayout({ name:'LAYOUT_A4', width:11.7, height:8.25 });
    pres.layout = config.LAYOUT;
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
    pres.writeFile({ fileName: `..\\..\\${config.FILENAME_PREFIX}_${year}.pptx` }, { compression: true});
    console.log(`Creating presentation for year ${year}...Done, ${nbrSlides} slides generated.`);
}
    
}
    
    

