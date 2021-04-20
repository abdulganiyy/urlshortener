const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { mongoUrl } = require("./config");
const resolvers = require("./graphql/resolvers");

const typeDefs = gql`
  type Url {
    urlCode: String!
    shortUrl: String!
    longUrl: String!
  }
  type Mutation {
    shortenURL(longUrl: String!): Url!
  }
  type Query {
    getLongUrl(urlCode: String!): String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoDB connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server listen at ${res.url}`));
