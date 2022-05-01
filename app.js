const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

// Schema export

const schema = require("./schema/schema");

const app = express();

// Single route for all the requests, no need to specify the path for each request (e.g. /graphql/query) as it is the default path for all the requests.
// graphqlHTTP is a function that takes a single argument, an object/schema.

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/grapql-test");
    console.log("Database connection has been created");
  } catch (error) {
    console.error(error.message);
  }
})();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen("8000", () => {
  console.log("GraphQL server started on port 8000");
});

// Schema : Describe how the graph/data will look?
