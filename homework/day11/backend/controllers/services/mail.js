import { getWelcomeTemplate, sendEmail } from '../../email.js';

export class Mail{
    createTemplate = (userName, userPhoneNumber, userPreferSite) => {
        return getWelcomeTemplate({userName, userPhoneNumber, userPreferSite});
    }
    
    sendEmailToUser = (userEmail, template) => {
        sendEmail(userEmail, template);
    }
}