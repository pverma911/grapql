// Schema : Describe how the graph/data will look?

const graphql = require("graphql");

// GraphQL object

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

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
    author: {
      // relationship/ref
      type: AuthorType,
      resolve(parent, args) {
        // parent will contain all details of the book object
        // return Author.findById(parent.authorId);
      },
    },
  }),
});
// e.g query:

// book(id:2){
//     genre
//     author{
//         name
//     }
// }

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// The RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // like req.params/query
      resolve(parent, args) {
        // code to get data from db/other source or to perform some function on query hit
        // args param will give us access to all the args passed in the query
        // return find(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source or to perform some function on query hit
        // args param will give us access to all the args passed in the query
        // return find(args.id)
      },
    },
  },
});

// call from frontend with args e.g:

// book(id:'xyz'){
//     name
//     genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
});
