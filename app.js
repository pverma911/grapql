const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

// Single route for all the requests, no need to specify the path for each request (e.g. /graphql/query) as it is the default path for all the requests.
// graphqlHTTP is a function that takes a single argument, an object/schema.
app.use("/graphql", graphqlHTTP({}));

app.listen("8000", () => {
  console.log("GraphQL server started on port 8000");
});

// Schema : Describe how the graph/data will look?
