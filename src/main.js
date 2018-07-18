// Initialize Firebase
var config = {
  apiKey: "AIzaSyAyf_oyKwPWoDgRXxskVnPxYKGCwGbVANA",
  authDomain: "login-red-social.firebaseapp.com",
  databaseURL: "https://login-red-social.firebaseio.com",
  projectId: "login-red-social",
  storageBucket: "login-red-social.appspot.com",
  messagingSenderId: "870954229021"
};
firebase.initializeApp(config);

/*Elementos*/
const login = document.getElementById('buttonEnter');
const register = document.getElementById('buttonregister');
const btnGoogle = document.getElementById('btnGoogle');
const createCuenta = document.getElementById('createCuenta');


createCuenta.addEventListener('click', () =>{
  const boxRegister = document.getElementById('boxRegister');
  boxRegister.style.display = 'block';
  boxLogin.style.display = 'none';
})



register.addEventListener('click', () => {
  const emailRegister = document.getElementById('email').value;
  const createPassword = document.getElementById('createPassword').value;
  firebase.auth().createUserWithEmailAndPassword(emailRegister, createPassword)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      /*console.log(errorCode)
      console.log(errorMessage)*/
    });
})

login.addEventListener('click', () => {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;
  const boxMessage = document.getElementById('message');
  const boxLogin = document.getElementById('boxLogin');
  const imglogin = document.getElementById('imglogin');
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(response => {
      imglogin.style.display = 'none';
      boxLogin.style.display = 'none';
      boxMessage.style.display = 'block';
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ...
    });
})


const observ = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Existe usuario')
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
observ();


btnGoogle.addEventListener('click', ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
})


btnFacebook.addEventListener('click', ()=>{
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
})

const buttonPost = document.getElementById('buttonPost');

buttonPost.addEventListener('click', ()=>{
  const postValue = document.getElementById('postArea').value;
  const newPostKey = firebase.database().ref().child('post').push().key;
  const loginUsers = firebase.auth().currentUser;
  firebase.database().href(`post/${newPostKey}`).set({
    postURL : postValue,
    creatorName: currentUser.displayName,
    creator : currentUser.uid,
})
})


