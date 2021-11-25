

import config from "./config.js";

export function createMasterSlide(pptx) {

    pptx.defineSlideMaster({
        title: "MASTER_SLIDE",
        //background : { color: "0b0b61" }, // Solid color
        objects: [
            
            {
                placeholder: {
                    options: {
                        name: "name_placeholder", type: "body",
                        ...config.PPTX_NAME_POSITION,
                        //color: "FFFFFF", 
                        //fill: { color: "0000FF" }, 
                        valign: "middle", align: "center", 
                        isTextBox: true, autoFit: true,
                        fontFace: config.FONT_FACE,
                        fontSize: 32,
                        text: "(add name here)",
                    },
                },
            },
            /*
            {
                placeholder: {
                    options: {
                        name: 'image_placeholder1', type: 'image',
                        y: config.PPTX_IMAGE_VERTICAL_OFFSET,
                        h: config.PPTX_IMAGE_HEIGHT,
                        //x: "25%", 
                        //w: "15%", 
                    }
                }
            },
            {
                placeholder: {
                    options: {
                        name: 'image_placeholder2', type: 'image',
                        y: config.PPTX_IMAGE_VERTICAL_OFFSET,
                        h: config.PPTX_IMAGE_HEIGHT,
                        //x: "25%", 
                        //w: "15%", 
                    }
                }
            }*/
        ],
    });

}