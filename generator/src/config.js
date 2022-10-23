export const CLASS_LISTS_FOLDER =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\classes\\";

export const PREP_PHOTOS_FOLDER = [
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\photos\\2016 Prep - Supplied by Parents\\",
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\photos\\2016 Prep Students - Current\\",
];

const TEST_PHOTO_FOLDER =
  "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\photos\\Year 6 - Sorted by Class (High Res)\\";
const USB_TEST_PHOTO =
  "D:\\2021 Final Slideshow Photos\\2021 All Year 6 & Prep";

const testing = true;
const use16x9 = true;

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
  PHOTOS_FOLDER: testing ? TEST_PHOTO_FOLDER : USB_TEST_PHOTO,
  FONT_FACE: "Segoe Script",
  FONT_SIZE: 32,
  TEXT_COLOR: "#000000",
  IMAGE_DENSITY: 96,
  PPTX_NAME_POSITION: { x: 1, w: 8, y: 0.125, h: 0.75 },
  USE_PLACE_HOLDER_FOR_IMAGES: true,
};

const LAYOUT_A4 = {
  TESTING: testing,
  LAYOUT: "LAYOUT_A4", //width:11.7, height:8.25
  FILENAME_PREFIX: "Print",
  IMAGE_RESIZE_HEIGHT: 400,
  PPTX_IMAGE_HEIGHT: 5, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
  // in LAYOUT_4x3 10 x 7.5 inches
  PPTX_IMAGE_WIDTH: 0,
  SLIDE_LAYOUT_WIDTH: 11.75, //inches;
  PPTX_IMAGE_VERTICAL_OFFSET: 1.85,
  IMAGE_BORDER: 0,
  IMAGE_CENTERING_FACTOR: 3.5,
  PHOTOS_FOLDER: testing ? TEST_PHOTO_FOLDER : USB_TEST_PHOTO,
  FONT_FACE: "Lucida Calligraphy",
  TEXT_COLOR: "#1F4E79",
  FONT_SIZE: 28,
  IMAGE_DENSITY: 300, //for print
  PPTX_NAME_POSITION: { x: 1.5, w: 8.7, y: 6.8, h: 0.75 },
  USE_PLACE_HOLDER_FOR_IMAGES: false,
};

const LAYOUT = use16x9 ? LAYOUT_16x9 : LAYOUT_A4;

export default LAYOUT;
