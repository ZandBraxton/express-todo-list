// import * as express from "express";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import "dotenv/config";
import cors from "cors";
// import schema from "./schema";
const app = express();

const PORT: number = 5000;

const schema = buildSchema(`
    type Query {
        hello: String
    }`);

const root = {
  hello: () => {
    return "hello world";
  },
};

console.log(PORT);
console.log("hi");

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema: schema,
  })
);

app.listen(PORT, () => {
  console.log("Server started on localhost:5000");
});
