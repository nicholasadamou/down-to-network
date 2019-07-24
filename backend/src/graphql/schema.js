const { gql } = require('apollo-server-express');

const schema = gql`
  type User {
    name: String,
    role: String,
    eduction: String,
    location: String,
    bio: String,
    experiences: String,
    fun_facts: String
  }
  type Query {
    users: [User]
  }
`;

export default schema;