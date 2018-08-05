//***********Función writeUserData */
window.writeUserData = (userId, name, email, imageUrl) => {
  // console.log(userId, name, email, imageUrl);

  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  }).then(result => {
    location.href = 'muro.html'
  });
}
//**********Función para registrar usuario*************
window.register = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result);
      writeUserData(result.user.uid, null, result.user.email, null)

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

//**********Función para loguear usuario**********
window.signIn = (email, password) => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(result =>{ 
    console.log(result);
       
  location.href = 'muro.html'
  })
  .catch(function(error) {
    console.log(error);
    
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

//**********Función para loguearse con google**********

window.google = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });
}

//**********Función para loguearse con facebook**********
window.facebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log(result)
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    writeUserData(user.uid, user.displayName, user.email, user.photoURL)

  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(error);

  });
}

//**********Función para salir de la app**********
window.logout = () => {
  firebase.auth().signOut().then(function () {
    console.log('Cerro Sesión');
  }).catch(function (error) {
    console.log('Error al cerrar Sesión');
  });
}

//**********Función para crear post**********
window.writeNewPost = (postData) => {
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
    author: null,
    state: null,
    starCount: 0
  };

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;


  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);

  console.log(uid, body)
  return newPostKey;
}
//**********Función para editar post**********

window.editPost = (postId, postData) => {
  const updates = {};
  updates['/posts/' + postId] = postData;
  //updates['/user-posts/' + postData.uid + '/' + postId] = postData;
  return firebase.database().ref().update(updates);
}

//Esta funcion permite eliminar posts
window.deletePost = (postId, uid) => {
  firebase.database().ref('/posts/').child(postId).remove();
  //firebase.database().ref('/user-posts/' + uid + '/').child(postId).remove();
}
