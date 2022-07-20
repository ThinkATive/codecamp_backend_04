import { getOpenGraph } from "../../scraping.js";

export class UserInfo{
    getData = async (req) => {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userPersonalNumber = (req.body.personal);
        const userPreferSite = req.body.prefer;
        const userPassword = req.body.pwd;
        const userPhoneNumber = req.body.phone;
        const preferSiteOGInfo = await getOpenGraph(userPreferSite);
        const userPersonalNumberMosaic = userPersonalNumber.substr(0, 7).padEnd(14, '*');
 
        return {
            og: preferSiteOGInfo,
            name: userName,
            email: userEmail,
            personal: userPersonalNumberMosaic,
            prefer: userPreferSite,
            pwd: userPassword,
            phone: userPhoneNumber
        }
    }
}