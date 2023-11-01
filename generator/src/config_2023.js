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

const LAYOUT_PRES = {
  TESTING: testing,
  FILENAME_PREFIX: "Presentation",
  LAYOUT: "LAYOUT_4x3",
  IMAGE_RESIZE_HEIGHT: 400,
  PPTX_IMAGE_HEIGHT: 6.08,
  //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
  // in LAYOUT_4x3 10 x 7.5 inches
  PPTX_IMAGE_WIDTH: 4.57,
  SLIDE_LAYOUT_WIDTH: 10.0, //inches;
  PPTX_IMAGE_VERTICAL_OFFSET: 1.12,
  IMAGE_BORDER: 2,
  IMAGE_CENTERING_FACTOR: 3.75, //3.5,
  PHOTOS_FOLDER: PHOTOS_FOLDER,
  FONT_FACE: "Poppins SemiBold",
  FONT_SIZE: 36,
  TEXT_COLOR: "#FFFFFF",
  IMAGE_DENSITY: 96,
  PPTX_NAME_POSITION: { x: 0, w: 10, y: 0.0, h: 0.7 },
  USE_PLACE_HOLDER_FOR_IMAGES: true,
  master_images: [
    {
      image: {
        x: 0,
        y: 0,
        w: 10,
        h: 0.93,
        path: "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\Templates\\Pres_Header.svg",
      },
    },
  ],
};

const LAYOUT_PRINT = {
  TESTING: testing,
  LAYOUT: "LAYOUT_4x3", //width:11.7, height:8.25
  FILENAME_PREFIX: "Print",
  IMAGE_RESIZE_HEIGHT: 400,
  PPTX_IMAGE_HEIGHT: 4.88, //inches total pptx height in LAYOUT_16x9: 10 x 5.625 inches
  // in LAYOUT_4x3 10 x 7.5 inches
  PPTX_IMAGE_WIDTH: 3.66,
  SLIDE_LAYOUT_WIDTH: 10.0, //inches;
  PPTX_IMAGE_VERTICAL_OFFSET: 1.02,
  IMAGE_BORDER: 0,
  IMAGE_CENTERING_FACTOR: 3.75,
  PHOTOS_FOLDER: PHOTOS_FOLDER,
  FONT_FACE: "Poppins SemiBold",
  TEXT_COLOR: "#FFFFFF",
  FONT_SIZE: 36,
  IMAGE_DENSITY: 300, //for print
  PPTX_NAME_POSITION: { x: 0, w: 10, y: 0.0, h: 0.7 },
  USE_PLACE_HOLDER_FOR_IMAGES: true,
  master_images: [
    {
      image: {
        x: 0,
        y: 0,
        w: 10,
        h: 0.93,
        path: "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\Templates\\Print_Header.svg",
      },
    },
    {
      image: {
        x: 0,
        y: 6,
        w: 10,
        h: 1.52,
        path: "C:\\Users\\nclemeur.DAESIM\\Documents\\dev\\year6\\2023\\Templates\\Print_Footer.svg",
      },
    },
  ],
};

const _config = { initialised: false };

export const initConfig = (usePrint) => {
  if (usePrint) {
    Object.assign(_config, LAYOUT_PRINT);
  } else {
    Object.assign(_config, LAYOUT_PRES);
  }
  _config.initialised = true;
};

export const getConfig = () => {
  if (!_config.initialised) {
    throw new Error("Should be initialised");
  }
  return _config;
};
