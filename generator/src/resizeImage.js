import sharp  from "sharp";
import config from "./config.js";

export const resizeImg = async (path, height, metadata ) => {    
    const s = sharp(path);
    
    await s.metadata().then( met => {
        Object.assign(metadata, met);
    });  
    
    const ratio = height / metadata.height;
    const width = Math.round(metadata.width * ratio);
    metadata.resized_width = width;

    return s.png()
        .resize( { height, width } )
        .extend({
            top: config.IMAGE_BORDER,
            bottom: config.IMAGE_BORDER,
            left: config.IMAGE_BORDER,
            right: config.IMAGE_BORDER,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
        .toBuffer();
        
};