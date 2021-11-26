


export const extractNamesInfo =  (imgwithExt) => {    
    const img = imgwithExt.substr(0, imgwithExt.lastIndexOf('.'));
    const parts = img.split(',');
    const leftParts = parts[0].split(' ');
    const rightParts = parts[1].trim().split(' ');
        

    const year = leftParts[0].trim().toUpperCase();
    const surname = leftParts.slice(1).join(' ').trim();    
    let firstname = rightParts[0].trim();

    let foundDash = false;
    let foundP = false;
    
    rightParts.slice(1).forEach(el => {
        if(el==='-'){
            foundDash = true;
        }
        if(el.toUpperCase()==='P'){
            foundP = true;
        }
        if(!foundP && foundDash && el.trim().length > 0){
            firstname += ' ' + el.trim();
        }
    });
    let isPrep = false;
    if(foundDash && foundP){
        isPrep = true;
    } else if(foundDash || foundP){
        console.warn(imgwithExt + " maybe prep image?")
    }
    
    const key = (year.toLowerCase()+'_'+surname.trim().toLowerCase() + '_' + firstname.trim().toLowerCase()).replaceAll(/\W/g, '');

    return {
        img: imgwithExt,
        year,
        surname,
        firstname,
        prep: isPrep,
        key: year.toLowerCase()+'_'+surname.trim().toLowerCase() + '_' + firstname.trim().toLowerCase()
    }
}

export const findYear6 = (allInfo, prepInfo) => {
    return allInfo.find(info =>     !info.prep && info.key === prepInfo.key  );
}

export const findPrep = (allInfo, year6Info) => {
    return allInfo.find(info =>     info.prep && info.key === year6Info.key  );
}

export const checkMissing = (allInfo) => {
    const prepToAdd = [];
    allInfo.forEach(elt => {
        if(elt.prep){
            const t = findYear6(allInfo, elt);
            if(!t){
                console.warn("Found Prep but no Year 6 for ", elt);
                //elt.prep = false;
            }
        }

    })
}

