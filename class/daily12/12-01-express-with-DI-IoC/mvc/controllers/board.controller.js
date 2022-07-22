export class BoardController{
    fetchBoard = (req, res) => {
        const result = [
            { number : 1,
              writer : "철수",
              title : "제목",
              contents : "내용" },
            
            { number : 2,
              writer : "짱구",
              title : "제목 짱구",
              contents : "내용 짱구" },
            
            { number : 3,
              writer : "훈이",
              title : "제목 훈이",
              contents : "내용 훈이" }
            
        ];

        res.send(result);
    }

    createBoard = (req, res) => {
        console.log(req.body.writer);
        console.log(req.body.title);
        console.log(req.body.contents);
        // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기.
        
        // 2. 저장 결과 응답 주기.
        res.send("게시물 등록에 성공하였습니다!!");
    }
}