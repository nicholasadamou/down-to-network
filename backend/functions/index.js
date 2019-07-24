// index.js
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

admin.initializeApp();

const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    name: string,
    role: string,
    eduction: string,
    location: string,
    bio: string,
    experiences: string,
    fun_facts: string
  }
  type Query {
    users: [User]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: () =>
      admin
        .database()
        .ref("users")
        .once("value")
        .then(snap => snap.val())
        .then(val => Object.keys(val).map(key => val[key]))
  }
};

// setup express cloud function
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);
