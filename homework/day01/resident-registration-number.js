
import {getValidation, getMosaic} from './personal.js';

function customRegistrationNumber(personalNumber){
    const isValid = getValidation(personalNumber);

    if(isValid) {
        const result = getMosaic(personalNumber);
        console.log(result);
    }
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");