const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect(DB);
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Databse");
});

const _ = require("lodash");
const fs = require("fs");
const adminTypeDefs = fs.readFileSync(
  "./schemas/employee_schema_graphql",
  "utf-8"
);

const adminResolvers = require("./resolvers/admin_resolvers");

const resolvers = _.merge({}, adminResolvers);

const { ApolloServer } = require("apollo-server-express");
const server = new ApolloServer({
  typeDefs: [adminTypeDefs],
  resolvers,
});

const port = process.env.PORT || 4000;
const enableCors = (process.env.ENABLE_CORS || true) === true;
server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.json("server started");
});
