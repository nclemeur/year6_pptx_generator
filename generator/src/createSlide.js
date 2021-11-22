import { basename } from "path";

import config from "./config.js";
import { resizeImg } from "./resizeImage.js";

export async function createSlide(imgName, pptx) {
    const photosFolder = config.PHOTOS_FOLDER;
    console.log(`Creating slide for ${imgName}...`);
    const slide = pptx.addSlide( { masterName: 'MASTER_SLIDE' });
    //slide.background = { color: "0b0b61" }; // Solid color
    const img = imgName; //jpgFiles[0];
    const path = photosFolder + '\\' + img;

    let imgData = {};    
    let metadata = {};

    const height = config.IMAGE_RESIZE_HEIGHT;

    await resizeImg(path, height, metadata).then( data =>  imgData.img = data)
    
    const prepImg = basename(img, '.jpg') + ' - P.jpg';
    const prepPath = photosFolder + '\\' + prepImg;

    let prepMetadata = {};
    await resizeImg(prepPath, height, prepMetadata).then( data =>  imgData.prepImg = data);

    const pptxHeight = config.PPTX_IMAGE_HEIGHT;
    const pptxRatio = pptxHeight/height;
    const width = prepMetadata.resized_width * pptxRatio;

    const slideTotalWidth = config.SLIDE_LAYOUT_WIDTH;
    const centeringFactor = config.IMAGE_CENTERING_FACTOR;

    const center1 = slideTotalWidth / centeringFactor;
    const center2 = (centeringFactor - 1.0)*slideTotalWidth / centeringFactor;   

    slide.addImage( { data: 'data:image/png;base64,' + imgData.prepImg.toString('base64'), type: 'contain',
    //placeholder: 'image_placeholder1',
    x: ( center1 - width /2), y: config.PPTX_IMAGE_VERTICAL_OFFSET, h: pptxHeight, w: width, altText: prepImg});    
    
    const width2 = metadata.resized_width * pptxRatio;
    slide.addImage( { data: 'data:image/png;base64,' + imgData.img.toString('base64'), type: 'contain',
    //placeholder: 'image_placeholder2',
    x: ( center2 - width2 /2), y: config.PPTX_IMAGE_VERTICAL_OFFSET, h: pptxHeight, w: width2,  altText: img});

    const parts = img.split(' ');
    const surname = parts[1].replaceAll(',','');
    const firstName = parts[2].split('.')[0];

    slide.addText(firstName + ' ' + surname, { placeholder: "name_placeholder" });

    console.log(`Creating slide for ${imgName}...Done!`);
}
