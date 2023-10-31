export const CLASS_LISTS_CSV =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\Year 6 Students by Class.csv";

export const PREP_PHOTOS_FOLDER = [
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\2017 Prep\\",
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\Prep - Supplied Photos\\",
];

export const PHOTOS_FOLDER =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\2023 Year 6 Graduation\\Class Photos";

//const USB_TEST_PHOTO =
//  "D:\\2021 Final Slideshow Photos\\2021 All Year 6 & Prep";

const testing = true;
const use16x9 = false;

const LAYOUT_16x9 = {
  TESTING: testing,
  FILENAME_PREFIX: "Presentation",
  LAYOUT: "LAYOUT_16x9",
  IMAGE_RESIZE_HEIGHT: 400,
  PPTX_IMAGE_HEIGHT: 4, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
  // in LAYOUT_4x3 10 x 7.5 inches
  PPTX_IMAGE_WIDTH: 3,
  SLIDE_LAYOUT_WIDTH: 10.0, //inches;
  PPTX_IMAGE_VERTICAL_OFFSET: 1,
  IMAGE_BORDER: 7,
  IMAGE_CENTERING_FACTOR: 3.5,
  PHOTOS_FOLDER: PHOTOS_FOLDER,
  FONT_FACE: "Lucida Calligraphy",
  FONT_SIZE: 32,
  TEXT_COLOR: "#1F4E79",
  IMAGE_DENSITY: 96,
  PPTX_NAME_POSITION: { x: 1, w: 8, y: 0.125, h: 0.75 },
  USE_PLACE_HOLDER_FOR_IMAGES: true,
};

const LAYOUT_A4 = {
  TESTING: testing,
  LAYOUT: "LAYOUT_4x3", //width:11.7, height:8.25
  FILENAME_PREFIX: "Print",
  IMAGE_RESIZE_HEIGHT: 400,
  PPTX_IMAGE_HEIGHT: 5, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
  // in LAYOUT_4x3 10 x 7.5 inches
  PPTX_IMAGE_WIDTH: 0,
  SLIDE_LAYOUT_WIDTH: 11.75, //inches;
  PPTX_IMAGE_VERTICAL_OFFSET: 1.85,
  IMAGE_BORDER: 0,
  IMAGE_CENTERING_FACTOR: 3.5,
  PHOTOS_FOLDER: PHOTOS_FOLDER,
  FONT_FACE: "Lucida Calligraphy",
  TEXT_COLOR: "#1F4E79",
  FONT_SIZE: 28,
  IMAGE_DENSITY: 300, //for print
  PPTX_NAME_POSITION: { x: 1.5, w: 11.75, y: 6.8, h: 0.75 },
  USE_PLACE_HOLDER_FOR_IMAGES: false,
};

const LAYOUT = use16x9 ? LAYOUT_16x9 : LAYOUT_A4;

export default LAYOUT;
