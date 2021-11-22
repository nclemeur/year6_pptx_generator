import sharp  from "sharp";


export const resizeImg = async (path, height, metadata ) => {    
    const s = sharp(path);
    
    await s.metadata().then( met => {
        Object.assign(metadata, met);
    });  
    
    const ratio = height / metadata.height;
    const width = Math.round(metadata.width * ratio);
    metadata.resized_width = width;

    return s.png()
        .resize( { height: 400, width } )
        .extend({
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
        .toBuffer();
        
};