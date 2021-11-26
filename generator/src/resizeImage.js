import sharp  from "sharp";
import config from "./config.js";

export const resizeImg = async (path, metadata ) => {
    
    const height = config.IMAGE_RESIZE_HEIGHT;

    const s = sharp(path);
    
    await s.metadata().then( met => {
        Object.assign(metadata, met);
    });  
    
    const ratio = height / metadata.height;
    const width = Math.round(metadata.width * ratio);
    const pptxWidth = config.PPTX_IMAGE_WIDTH;
    const pptxRatio = config.PPTX_IMAGE_HEIGHT/height;

    let transparentPaddingWidth = 0;
    if(pptxWidth){
        const targetWidth = pptxWidth / pptxRatio;
        //console.log(`PPTX W:${pptxWidth}", target: ${targetWidth}, current: ${width}, ratio: ${ratio}`)
        transparentPaddingWidth = Math.round((targetWidth - width)/2.0);

        if(transparentPaddingWidth < 0){
            console.error(`Image ${path} might need cropping? negative padding ${transparentPaddingWidth}`);
        }
    }

    let a = s.png()
        .resize( { height, width } );


    if(config.IMAGE_BORDER > 0){
        a.extend({
            top: config.IMAGE_BORDER,
            bottom: config.IMAGE_BORDER,
            left: config.IMAGE_BORDER,
            right: config.IMAGE_BORDER,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
    }
    if(transparentPaddingWidth > 0){

        if(config.IMAGE_BORDER > 0){
            let tmpData = null;
            await a.withMetadata({ density: config.IMAGE_DENSITY }).toBuffer({ resolveWithObject: true }).then(({data, info}) => {             
                tmpData = data;
            });
            a = sharp(tmpData);
        } 
        
        let transparentPaddingColor = { r: 255, g: 255, b: 255, alpha: 0 };
        if(true){
            transparentPaddingColor = { r: 255, g: 0, b: 0, alpha: 1 };
        }

        a.extend({
            top: 0,
            bottom: 0,
            left: transparentPaddingWidth,
            right: transparentPaddingWidth,
            background: transparentPaddingColor
          });
    }
    
    return a.withMetadata({ density: config.IMAGE_DENSITY }).toBuffer({ resolveWithObject: true });
        
};