window.onload = () =>{
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