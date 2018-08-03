window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      console.log('Usuario Logeado')
    
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      console.log('No existe usuario')
    }
  });
}


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

//**********Función para registrar usuario*************
window.register = (emailRegister, createPassword) => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister, createPassword)
  .then((result) => {
    user = firebase.auth().currentUser;
  })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode)
      console.log(errorMessage)
    })
}

//**********Función para loguear usuario**********
window.signIn = (loginEmail, loginPassword) => {
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(response => {
      const containerLogin = document.getElementById('containerLogin');
      containerLogin.style.display = 'none';
      document.getElementById('containerPost').innerHTML = window.location.href = 'muro.html';
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ...
    })
}

//***********Función writeUserData */
window.writeUserData = (userId, name, email, imageUrl) => {
  firebase
  .database
  .ref('users/' + userId).set({
    username: user.displayName,
    email: email,
    profile_picture : imageUrl
  })
}

//**********Función para loguearse con google**********

window.google = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    console.log(result)

    writeUserData()
    
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

//**********Función para loguearse con facebook**********
window.facebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    
    writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email, 
      profile_picture : imageUrl
    });
    
    // ...
  })
  .then(response => {
    console.log("567576576565")
    const containerLogin = document.getElementById('containerLogin');
    //bcontainerLogin.style.display = 'none';
    // window.location.href = 'muro.html';
  })

  .catch(function(error) {
    console.log("errrr", error.message)
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
})
}