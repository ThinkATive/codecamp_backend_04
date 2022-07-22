// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

import puppeteer from "puppeteer";
import mongoose from 'mongoose';
import { Starbucks } from "./models/starbucksSchema.js";

// 몽고DB 접속!
mongoose.connect("mongodb://localhost:27017/mydocker04");

async function getStarBucksMenuInfo(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
    await page.waitForTimeout(1000);

    for(let category = 2; category < 20; category += 2){
        // 커피의 종류 부분 ex) 콜드브루, 에스프레소, 프라푸치노
        // 나중에 메뉴 공간에 넣을 공간을 만들기,,,
        // const title = await page.$eval(
        //     `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dt:nth-child(${category - 1}) > a`,
        //     (ele) => ele.textContent
        // )
        // console.log(title);
        const len = await page.$eval(
            `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${category})`,
            (ele) => ele.getElementsByClassName("menuDataSet").length
        );
        for(let i=1; i <= len; i++){
            const name = await page.$eval(
                `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${category}) > ul > li:nth-child(${i}) > dl > dd`,
                (ele) => ele.textContent
            )
            const image = await page.$eval(
                `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${category}) > ul > li:nth-child(${i}) > dl > dt > a > img`,
                (ele) => ele.getAttribute("src")
            )
            const starbucks = new Starbucks({
                name: name,
                image: image
            })
    
            await starbucks.save();
        }
    }

    await browser.close();
}

getStarBucksMenuInfo();