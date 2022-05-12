// import * as express from "express";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import schema from "./schema";
import getErrorCode from "./utils/getErrorCode";
import { getPayload } from "./utils/isAuth";

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@todo-list.tz8jn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
);

let db = mongoose.connection;

db.on("error", () => {
  console.error("Error while connecting to DB");
});
const app = express();

const PORT: number = 5000;

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(getPayload);
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: schema,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message);
      return { message: error.message, statusCode: error.statusCode };
    },
  })
);

app.listen(PORT, () => {
  console.log("Server started on localhost:5000");
});
