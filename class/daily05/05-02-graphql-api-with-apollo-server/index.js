//const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  
  type Query {
    aaa: String
  }
`;

const resolvers = {
    Query: {
      aaa: () => {
        return 'Hello World! 반가워요!'
      }
    },
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// The `listen` method launches a web server.
server.listen(3000).then(() => {
    console.log("프로그램을 켜는데 성공했어요!!!");
});