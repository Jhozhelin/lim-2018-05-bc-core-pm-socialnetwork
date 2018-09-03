//***********Función writeUserData */
window.writeUserData = (userId, name, email, imageUrl) => {
  // console.log(userId, name, email, imageUrl)

  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  }).then(result => {
    location.href = 'muro.html'
  })
}
//**********Función para registrar usuario*************
window.register = (userName, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result)
      writeUserData(result.user.uid, userName, result.user.email, null)
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // ...
    })
}

//**********Función para loguear usuario**********
window.signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result)

      location.href = 'muro.html'
    })
    .catch(function (error) {
      console.log(error)

      // Handle Errors here.
      let errorCode = error.code
      if (errorCode === 'auth/wrong-pass') {
        alert('La contraseña es incorrecta')
      }
      else {
        alert('Usuario y contraseña incorectos')
      }
      // const errorMessage = error.message
      // ...
    })
}

//**********Función para loguearse con google**********

window.google = () => {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      console.log(error)
      // ...
    })
}

//**********Función para loguearse con facebook**********
window.facebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log(result)
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      // ...
      writeUserData(user.uid, user.displayName, user.email, user.photoURL)

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      // ...
      console.log(error)

    })
}

//**********Función para salir de la app**********
window.logout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log('Cerro Sesión')
    }).catch(function (error) {
      console.log('Error al cerrar Sesión')
    })
}

//**********Función para crear post***********/
window.writeNewPost = (postData) => {
  console.log(postData)
  // A post entry.
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key
  // Write the new post's data simultaneously in the posts list and the user's post list.
  postData.id = newPostKey

  const updates = {}
  updates['/posts/' + newPostKey] = postData
  updates['/user-posts/' + postData.uid + '/' + newPostKey] = postData
  firebase.database().ref().update(updates)
  return newPostKey
}

//**********Función para traers posts**********
window.getPost = () => firebase.database().ref('/posts/').once('value')


//**********Función para editar post**********
window.editPost = (userId, text, postId) => {
  console.log(userId, text, postId)

  firebase.database().ref('user-posts/' + userId + '/' + postId)
    .update({
      body: text
    })

  firebase.database().ref('posts/' + postId)
    .update({
      body: text
    })
}

//**********Función para eliminar post**********
window.deletePost = (userId, postId) => {
  let deleteCont = confirm('Se eliminara la publicación');

  if (deleteCont) {
    firebase.database().ref().child('/user-posts/' + userId + '/' + postId)
      .remove()
    firebase.database().ref().child('posts/' + postId)
      .remove()
  }

}


// ****************funcion de likes ***************
window.likePost = (userId, postId) => {
  console.log(postId)
  let contLike = null
  firebase.database().ref(`/posts/${postId}`).once('value').then(result => {
    contLike = result.val().starCount + 1

    console.log(contLike)



    firebase.database().ref('user-posts/' + userId + postId)
      .update({
        starCount: contLike
      })
    firebase.database().ref('posts/' + postId)
      .update({
        starCount: contLike
      })


  }).catch(error => {
    console.log(error)

  })

  console.log(contLike)


}