import { getConfig } from "./config_2023.js";

export function createMasterSlide(pptx) {
  const config = getConfig();
  const objects = [
    {
      placeholder: {
        options: {
          name: "name_placeholder",
          type: "title",
          ...config.PPTX_NAME_POSITION,
          color: config.TEXT_COLOR,
          //fill: { color: "0000FF" },
          valign: "middle",
          align: "center",
          margin: [0, 0, 0, 0.08], //LRBT
          isTextBox: true,
          autoFit: true,
          fontFace: config.FONT_FACE,
          fontSize: config.FONT_SIZE,
          text: "(add name here)",
        },
      },
    },
    ...config.master_images,
  ];

  if (config.USE_PLACE_HOLDER_FOR_IMAGES) {
    const slideTotalWidth = config.SLIDE_LAYOUT_WIDTH;
    const centeringFactor = config.IMAGE_CENTERING_FACTOR;

    const center1 = slideTotalWidth / centeringFactor;
    const center2 =
      ((centeringFactor - 1.0) * slideTotalWidth) / centeringFactor;
    const borderPptx =
      config.IMAGE_BORDER *
      (config.PPTX_IMAGE_HEIGHT / config.IMAGE_RESIZE_HEIGHT);
    const totalWidth = config.PPTX_IMAGE_WIDTH + 2 * borderPptx;
    const totalHeight = config.PPTX_IMAGE_HEIGHT + 2 * borderPptx;

    //console.log(`Place holder image: ${totalWidth} x ${totalHeight}`);

    objects.push(
      {
        placeholder: {
          options: {
            name: "prep_image_placeholder",
            type: "image",
            y: config.PPTX_IMAGE_VERTICAL_OFFSET,
            h: totalHeight,
            w: totalWidth,
            x: center1 - totalWidth / 2,
          },
        },
      },
      {
        placeholder: {
          options: {
            name: "image_placeholder",
            type: "image",
            y: config.PPTX_IMAGE_VERTICAL_OFFSET,
            h: totalHeight,
            w: totalWidth,
            x: center2 - totalWidth / 2,
          },
        },
      }
    );
  }

  pptx.defineSlideMaster({
    title: "MASTER_SLIDE",
    //background : { color: "0b0b61" }, // Solid color
    objects,
  });
}
