// Schema : Describe how the graph/data will look?

const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

// Important notes:

// #) GraphQL is a query language, not a database.
// #) fields can also be object but we specifically make it a function due to the order in which the objects are created can be random.

// GraphQL object

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList, // for arrays
  GraphQLNonNull, // for non-nullable fields, user must provide the input
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
    books: {
      type: new GraphQLList(BookType), // array of Books as authors can have multiple books
      resolve(parent, args) {},
    },
  }),
});

// The RootQuery, NOTE: The book and author here are for fetching single data only but to get all the books and authors we are using books and authors(GraphQLList)

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
    books: {
      type: new GraphQLList(BookType),
      args: { id: { type: GraphQLID } }, // like req.params/query
      resolve(parent, args) {
        // return all the books from db
        // return books
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: { id: { type: GraphQLID } }, // like req.params/query
      resolve(parent, args) {
        // return all the authors from db
        // return authors
      },
    },
  },
});

// call from frontend with args e.g:

// {
//   book(id:'xyz'){
//     name
//     genre
// }
// }

// Mutations(setup is like RootQuery): They are used for performing CRUD operations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      // Mutation to Create/Add an author
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // should not be null
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        // Save Author to DB
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
  },
});

// Mutation syntax:

// mutation{ // when using mutation, the keyword needs to be added
//   addAuthor(name:"xyz",age:20){ // name of mutation and it's args
//     name    // these 2 are basically the fields that you want back after creating the author
//     age
//   }
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
