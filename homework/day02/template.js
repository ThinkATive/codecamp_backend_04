
import {checkInfoValidation, mosaicNumber, getWelcomeTemplate, sendWelcomeEmail} from './checkAndchange.js';

function createUser({name, email, residentNumber, phoneNumber, favSite}){
    const isValid = checkInfoValidation({email, residentNumber, phoneNumber});

    if(!isValid) return;

    let mosaicResidentNumber = mosaicNumber(residentNumber, 8);
    let mosaicPhoneNumber = mosaicNumber(phoneNumber, 9);
    
    const result = getWelcomeTemplate({name, email, favSite}, mosaicResidentNumber, mosaicPhoneNumber);
    sendWelcomeEmail(result);
}

const name = "코드캠프";
const email = "support@codebootcamp.co.kr";
const residentNumber = "210510-1054328";
const phoneNumber = "010-2345-9682";
const favSite = "codebootcamp.co.kr";

createUser({name, email, residentNumber, phoneNumber, favSite});