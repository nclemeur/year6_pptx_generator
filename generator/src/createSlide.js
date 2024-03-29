import { basename } from "path";

import config from "./config_2022.js";
import { findPrep } from "./extraName.js";
import { resizeImg } from "./resizeImage.js";

export async function createSlide(allFilesInfo, fileInfo, pptx) {
  const photosFolder = config.PHOTOS_FOLDER;
  const imgName = fileInfo.img;
  //console.log(`Creating slide for ${imgName}...`);
  const slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
  //slide.background = { color: "0b0b61" }; // Solid color
  const img = imgName; //jpgFiles[0];
  const path = photosFolder + "\\" + img;

  let imgData = {};

  const height = config.IMAGE_RESIZE_HEIGHT;
  const width = config.IMAGE_RESIZE_HEIGHT;

  let metadata = {};
  await resizeImg(path, metadata).then(({ data, info }) => {
    imgData.img = data;
    imgData.resized_width = info.width;
    imgData.resized_height = info.height;
  });

  const pptxHeight = config.PPTX_IMAGE_HEIGHT;
  const pptxRatio = pptxHeight / height;
  const slideTotalWidth = config.SLIDE_LAYOUT_WIDTH;
  const centeringFactor = config.IMAGE_CENTERING_FACTOR;

  const center1 = slideTotalWidth / centeringFactor;
  const center2 = ((centeringFactor - 1.0) * slideTotalWidth) / centeringFactor;

  const prepInfo = findPrep(allFilesInfo, fileInfo);
  if (prepInfo) {
    const prepImg = prepInfo.img;
    const prepPath = photosFolder + "\\" + prepImg;
    let prepMetadata = {};
    await resizeImg(prepPath, prepMetadata).then(({ data, info }) => {
      imgData.prepImg = data;
      imgData.prep_resized_width = info.width;
      imgData.prep_resized_height = info.height;
    });

    const prepResizedPptxWidth = imgData.prep_resized_width * pptxRatio;
    const prepResizedPptxHeight = imgData.prep_resized_height * pptxRatio;

    //console.log(`prep: ${prepResizedPptxWidth} x ${prepResizedPptxHeight}`);

    let prepPlaceholderCfg = {};
    if (config.USE_PLACE_HOLDER_FOR_IMAGES) {
      prepPlaceholderCfg = { placeholder: "prep_image_placeholder" };
    }
    slide.addImage({
      data: "data:image/png;base64," + imgData.prepImg.toString("base64"),
      type: "contain",
      ...prepPlaceholderCfg,
      x: center1 - prepResizedPptxWidth / 2,
      y: config.PPTX_IMAGE_VERTICAL_OFFSET,
      h: prepResizedPptxHeight,
      w: prepResizedPptxWidth,
      altText: prepImg,
    });
  }

  const resizedPptxWidth = imgData.resized_width * pptxRatio;
  const resizedPptxHeight = imgData.resized_height * pptxRatio;

  let placeholderCfg = {};
  if (config.USE_PLACE_HOLDER_FOR_IMAGES) {
    placeholderCfg = { placeholder: "image_placeholder" };
  }

  //console.log(`y6: ${resizedPptxWidth} x ${resizedPptxHeight}`);
  slide.addImage({
    data: "data:image/png;base64," + imgData.img.toString("base64"),
    type: "contain",
    ...placeholderCfg,
    x: center2 - resizedPptxWidth / 2,
    y: config.PPTX_IMAGE_VERTICAL_OFFSET,
    h: resizedPptxHeight,
    w: resizedPptxWidth,
    altText: img,
  });

  slide.addText(fileInfo.firstname + " " + fileInfo.surname, {
    placeholder: "name_placeholder",
  });

  console.log(`Created slide for ${imgName}!`);
}
