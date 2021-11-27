
import fs from 'fs';
import sharp  from "sharp";
import PDFDocument from 'pdfkit';

export default async () => {

    var blurp = fs.readFileSync('./images/names.txt', 'utf8');
    var names = blurp.split('\r\n');
    names.forEach( n => {
        //console.log('===' + n.trim() + '!!!');
    });

    const doc = new PDFDocument({autoFirstPage: false});
    doc.font('./fonts/arial.ttf');

    const FONT_SIZE = 18;
    doc.fontSize(FONT_SIZE);

    const MARGIN_LEFT = 23.75;
    const MARGIN_TOP = 31;
    const IMG_WIDTH = 195;
    const IMG_HEIGHT = 136.5;
    const IMG_PATH = './images/templett_9826135.jpg';

    let imgbuffer = null;
    await sharp(IMG_PATH).png().toBuffer({ resolveWithObject: true }).then(({data, info}) => {             
        imgbuffer = data;
    });

    const imgData = 'data:image/png;base64,' + imgbuffer.toString('base64');

    const totPages = Math.ceil(names.length / 16.0);
    let imageNo = -1;
    let yOffset = -1;
    for(let pageNo = 0; pageNo < totPages; pageNo++ ){

        doc.addPage({ layout: 'landscape', size: 'A4', margins: {
            left: MARGIN_LEFT,
            right: MARGIN_LEFT,
            top: MARGIN_TOP,
            botttom: MARGIN_TOP
          } });
        //doc.text('Hello world!', 0, 0);
    
        
        for(let i = 0; i < 4; i++){
            const y = i*IMG_HEIGHT + MARGIN_TOP;        
            for(let j = 0; j < 4; j++){

                const x = j*IMG_WIDTH + MARGIN_LEFT;
                doc.image(imgData, x, y, {width: IMG_WIDTH, height: IMG_HEIGHT });
                imageNo++;

                if(imageNo < names.length){
                    let txt = names[imageNo].trim().split(' ');
                    let name = txt.slice(0, txt.length - 1).join(' ');
                    
                    let clazz = txt[txt.length - 1];
                    //console.log(name, clazz);
                    let newLines = [];
                    let fontSize = FONT_SIZE;
                    
                    while(true){                        
                        doc.fontSize(fontSize);                                                
                        const ht = doc.heightOfString(name);
                        const wt = doc.widthOfString(name);
                        if(yOffset < 0){
                            yOffset = ht / 2.0;
                            console.log(yOffset);
                        }
                        if(wt <= ( IMG_WIDTH - 30)){
                            const cx = x + IMG_WIDTH/2;
                            const cy = y + IMG_HEIGHT/2;
                            doc.text(name, cx - wt/2, cy - yOffset);
                            {
                                const extraTxt = clazz;
                                const eht = doc.heightOfString(extraTxt);
                                const ewt = doc.widthOfString(extraTxt);
                                doc.text(extraTxt, cx - ewt/2, cy - yOffset + 20);                                
                            }
                            break;
                        } else {
                            fontSize--;
                            if(fontSize < 5){
                                console.log(`${name}: ${clazz}, ${fontSize}`);
                                break;

                            }
                        }
                    }
                        
                        
                    
                }
            }
        }

    }

    
    



    doc.pipe(fs.createWriteStream('../test.pdf'));
    doc.end();

    

}