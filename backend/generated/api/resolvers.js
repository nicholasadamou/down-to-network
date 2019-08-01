
    const updateUserByKey = async (obj, { input }, { firebase }) => {
      
      const key = input.key
      delete input.key
      
      const ref = firebase.database().ref(`/users/${key}`)
      const result = (await ref.once('value')).val()
      const infoToUpdate = Object.assign({}, result, input)

      firebase.database().ref(`/users/${key}`).set(infoToUpdate)

      const data = Object.assign({ key }, infoToUpdate)

      return data
    
    }
  

    const updateSuccessMessageByKey = async (obj, { input }, { firebase }) => {
      
      const key = input.key
      delete input.key
      
      const ref = firebase.database().ref(`/successmessages/${key}`)
      const result = (await ref.once('value')).val()
      const infoToUpdate = Object.assign({}, result, input)

      firebase.database().ref(`/successmessages/${key}`).set(infoToUpdate)

      const data = Object.assign({ key }, infoToUpdate)

      return data
    
    }
  

    const signup = async (obj, { input }, { firebase }) => {
      
      const ref = firebase.database().ref().child('users').push({ ...input })

      const result = Object.assign({ key: ref.key }, input)
      return result
    
    }
  

    const signin = async (obj, { input }, { firebase }) => {
      
      const ref = firebase.database().ref().child('users').push({ ...input })

      const result = Object.assign({ key: ref.key }, input)
      return result
    
    }
  

    const signout = async (obj, { input }, { firebase }) => {
      
      const ref = firebase.database().ref().child('successmessages').push({ ...input })

      const result = Object.assign({ key: ref.key }, input)
      return result
    
    }
  

    const getUserByKey = async (obj, args, { firebase }) => {
      const { key } = args
      
      const ref = firebase.database().ref(`/users/${key}`)
      const result = (await ref.once('value')).val()
      const data = Object.assign({ key }, result)

      return data
    
    }
  

    const me = async (obj, args, { firebase }) => {
      
      
      const ref = firebase.database().ref('users')
      const result = await new Promise(resolve => {
        ref.orderByChild('undefined').equalTo(undefined).on('child_added', function(snapshot) {
          const key = snapshot.key;
          const data = snapshot.val();
            
          resolve(Object.assign({ key }, data))
        })
      });
      return result
    
    }
  

    const users = async (obj, args, { firebase }) => {
      
      
      const ref = firebase.database().ref('users')
      const result = []
      await ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          
          const data = Object.assign({ key: childKey }, childData)
          result.push(data)
        });
      });
      return result
    
    }
  

    module.exports = {
      Query: {
        getUserByKey,
me,
users
      },
      Mutation: {
        updateUserByKey,
updateSuccessMessageByKey,
signup,
signin,
signout
      }
    }
  