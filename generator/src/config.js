
const LAYOUT_16x9 = {
    LAYOUT: 'LAYOUT_16x9',
    IMAGE_RESIZE_HEIGHT : 400,
    PPTX_IMAGE_HEIGHT: 4, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
                        // in LAYOUT_4x3 10 x 7.5 inches
    SLIDE_LAYOUT_WIDTH : 10.0, //inches;
    PPTX_IMAGE_VERTICAL_OFFSET: 1,
    IMAGE_BORDER: 7,    
    IMAGE_CENTERING_FACTOR :3.5,
    PHOTOS_FOLDER : 'D:\\2021 Final Slideshow Photos\\2021 All Year 6 & Prep',
    FONT_FACE: 'Segoe Script',
    PPTX_NAME_POSITION: { x: 1, w: 8, y: 0.125, h: 0.75,}
}

const LAYOUT_A4 = {
    LAYOUT: 'LAYOUT_A4', //width:11.7, height:8.25
    IMAGE_RESIZE_HEIGHT : 400,
    PPTX_IMAGE_HEIGHT: 5, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
                        // in LAYOUT_4x3 10 x 7.5 inches
    SLIDE_LAYOUT_WIDTH : 11.75, //inches;
    PPTX_IMAGE_VERTICAL_OFFSET: 1.75,
    IMAGE_BORDER: 7,    
    IMAGE_CENTERING_FACTOR :3.5,
    PHOTOS_FOLDER : 'D:\\2021 Final Slideshow Photos\\2021 All Year 6 & Prep',
    FONT_FACE: 'Lucida Calligraphy',
    PPTX_NAME_POSITION: { x: 1.5, w: 8.7, y: 6.8, h: 0.75,}
}


export default LAYOUT_A4;