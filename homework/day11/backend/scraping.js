import axios from 'axios';
import cheerio from 'cheerio';

export async function getOpenGraph(fromUrl){
    if(fromUrl.substring(0, 4) !== "http") return; // http로 시작하지 않으면 리턴
    // 1. 해당 문장을 axios.get으로 요청해서 html 코드 받아오기 => 스크래핑
    const result = await axios.get(fromUrl);

    // 2. 스크래핑 결과에서 OG (Open Graph) 코드 골라내서 변수에 저장하기
    let ogInfo = {};
    const $ = cheerio.load(result.data);
    $('meta').each((_, ele) => {
        if($(ele).attr("property")?.includes("og:")){ // ? <= *** optional chaining ***
            const key = $(ele).attr("property").substring(3); // og:title, og:image ...
            const val = $(ele).attr("content");
            ogInfo[key] = val;
        }
    });
    return ogInfo;
}