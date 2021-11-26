

import config from "./config.js";

export function createMasterSlide(pptx) {

    const objects = [
            
        {
            placeholder: {
                options: {
                    name: "name_placeholder", type: "body",
                    ...config.PPTX_NAME_POSITION,
                    color: config.TEXT_COLOR,
                    //fill: { color: "0000FF" }, 
                    valign: "middle", align: "center", 
                    isTextBox: true, autoFit: true,
                    fontFace: config.FONT_FACE,
                    fontSize: config.FONT_SIZE,
                    text: "(add name here)",
                },
            },
        }];
     if(config.USE_PLACE_HOLDER_FOR_IMAGES){   
        const slideTotalWidth = config.SLIDE_LAYOUT_WIDTH;
        const centeringFactor = config.IMAGE_CENTERING_FACTOR;
    
        const center1 = slideTotalWidth / centeringFactor;
        const center2 = (centeringFactor - 1.0)*slideTotalWidth / centeringFactor;   

        objects.push(        
        {
            placeholder: {
                options: {
                    name: 'prep_image_placeholder', type: 'image',
                    y: config.PPTX_IMAGE_VERTICAL_OFFSET,
                    h: config.PPTX_IMAGE_HEIGHT,
                    w: config.PPTX_IMAGE_WIDTH, 
                    x: ( center1 - config.PPTX_IMAGE_WIDTH /2), 
                }
            }
        },
        {
            placeholder: {
                options: {
                    name: 'image_placeholder', type: 'image',
                    y: config.PPTX_IMAGE_VERTICAL_OFFSET,
                    h: config.PPTX_IMAGE_HEIGHT,
                    w: config.PPTX_IMAGE_WIDTH,
                    x: ( center2 - config.PPTX_IMAGE_WIDTH /2), 
                }
            }
        });
    }

    pptx.defineSlideMaster({
        title: "MASTER_SLIDE",
        //background : { color: "0b0b61" }, // Solid color
        objects
    });

}