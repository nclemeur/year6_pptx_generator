import { readdirSync } from "fs";
import sharp  from "sharp";
import { extname, basename } from "path";
import pptxgen from "pptxgenjs";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";
//import fs 
// 1. Create a Presentationlet

const photosFolder = 'D:\\2021 Final Slideshow Photos\\2021 All Year 6 & Prep';

const allFiles = readdirSync(photosFolder);
const jpgFiles = allFiles.filter(function (file) {
    return extname(file) === ".jpg";
  });


console.log(jpgFiles[0]);
const genPptx = true;

const resizeImg = async (path, height, metadata ) => {    
    const s = sharp(path);
    
    await s.metadata().then( met => {
        Object.assign(metadata, met);
    });  
    
    const ratio = height / metadata.height;
    const width = Math.round(metadata.width * ratio);
    metadata.resized_width = width;

    return s.png()
        .resize( { height: 400, width } )
        .toBuffer();
        
};

const addSlide = async (imgName, pres) => {
    console.log(`Creating slide for ${imgName}...`);
    const slide = pres.addSlide();
    slide.background = { color: "0b0b61" }; // Solid color
    const img = imgName; //jpgFiles[0];
    const path = photosFolder + '\\' + img;

    let imgData = {};    
    let metadata = {};

    const height = 400;

    await resizeImg(path, height, metadata).then( data =>  imgData.img = data)
    
    const prepImg = basename(img, '.jpg') + ' - P.jpg';
    const prepPath = photosFolder + '\\' + prepImg;

    let prepMetadata = {};
    await resizeImg(prepPath, height, prepMetadata).then( data =>  imgData.prepImg = data);

    const pptxHeight = 4;
    const pptxRatio = pptxHeight/height;
    const width = prepMetadata.resized_width * pptxRatio;

    const slideTotalWidth = 10.0;
    const centeringFactor = 3.5;
    const center1 = slideTotalWidth / centeringFactor;
    const center2 = (centeringFactor - 1.0)*slideTotalWidth / centeringFactor;   

    slide.addImage( { data: 'data:image/png;base64,' + imgData.prepImg.toString('base64'), type: 'contain',
    x: ( center1 - width /2), y: 1.0, h: pptxHeight, w: width, altText: prepImg});    
    
    const width2 = metadata.resized_width * pptxRatio;
    slide.addImage( { data: 'data:image/png;base64,' + imgData.img.toString('base64'), type: 'contain',
    x: ( center2 - width2 /2), y: 1.0, h: pptxHeight, w: metadata.resized_width /100.0,  altText: img});

    console.log(`Creating slide for ${imgName}...Done!`);
}

const images = ['65H Campbell, Calum.jpg', '65H Clavera Agard, Amelia.jpg', '65H Coombes, Sam.jpg'];


if(genPptx){
    const pres = new pptxgen();

    for (const imageName of images) {    
        await addSlide(imageName, pres);
    }
    console.log(`All slides (${images.length}) created`);
    pres.writeFile({ fileName: "..\\Testing.pptx" }, { compression: false});
}
