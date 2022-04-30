// Schema : Describe how the graph/data will look?

const graphql = require("graphql");

// GraphQL object

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

// Define the schema
// const schema = new graphql.GraphQLSchema({
//     query: new graphql.GraphQLObjectType({
//         name: "Query",
//         fields: {
//             // The name of the field is the name of the query
//             // The type of the field is the type of the query
//             // The resolve function is the function that will be called when the query is executed
//             // The resolve function takes two arguments, the root object and the arguments
//             // The root object is the object that is the root of the query
//             // The arguments is the arguments that were passed to the query
//             // The resolve function should return the data that should be returned to the client
//         }
//     })
// });

// Steps to create a Schema:
// 1) Defining types in GraphQL: BookType
// 2) Creating Root Querys
// 3) Defining Relationships between types

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
  }),
});

// The RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // like req.params/query
    },
  },
});

// call from frontend with args e.g:

// book(id:'xyz'){
//     name,
//     genre
// }
