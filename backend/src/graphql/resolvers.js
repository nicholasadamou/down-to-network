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

export default resolvers;