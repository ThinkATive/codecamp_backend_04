//const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

// The GraphQL schema
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn => 객체 1개를 의미
    fetchBoards: [MyReturn] # => 배열 안에 객체 여러개를 의미
  }

  type Mutation {
    # createBoard( writer: String, title: String, contents: String ): String
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(phoneNumber: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
      fetchBoards: (parent, args, context, info) => {
        // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기.
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
        // 2. 꺼내온 결과 응답 주기.
        return result;
      },
    },
    // parent : api끼리 정보를 주고 받기
    // args : 외부에서 정보 받아오기
    Mutation: {
      createBoard: (_, args) => {
        console.log(args.createBoardInput.writer);
        console.log(args.createBoardInput.title);
        console.log(args.createBoardInput.contents);
        // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기.


        // 2. 저장 결과 응답 주기.
        return "게시물 등록에 성공하였습니다!!";
      },

      createTokenOfPhone: (_, args) => {
        //1. 휴대폰 번호 자릿수 맞는지 확인하기
        const phone = args.phoneNumber;
        const isValid = checkValidationPhone(phone);

        if(!isValid) {
            return;
        }

        //2. 핸드폰 토큰 6자리 만들기
        const token = getToken(6);

        //3. 핸드폰 번호에 토큰 전송하기
        sendTokenToSMS(phone, token);
        return "인증완료!!!";
      }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
});

// The `listen` method launches a web server.
server.listen(3000).then(() => {
    console.log("프로그램을 켜는데 성공했어요!!!");
});