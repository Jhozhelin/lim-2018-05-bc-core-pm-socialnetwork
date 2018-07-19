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
const initSecion = document.getElementById('initSecion');
const userImg = document.getElementById('userImg');
const userName = document.getElementById('userName');


/*Link para iniciar seción*/
initSecion.addEventListener('click', () =>{
  const boxRegister = document.getElementById('boxRegister');
  const boxLogin = document.getElementById('boxLogin');
  boxLogin.style.display = 'block';
  boxRegister.style.display = 'none';
})

/*Link para Crear cuenta nueva*/
createCuenta.addEventListener('click', () =>{
  const boxRegister = document.getElementById('boxRegister');
  boxRegister.style.display = 'block';
  boxLogin.style.display = 'none';
})


/*Registro de nuevos usuarios*/
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

/*Inicio de seción con correo*/

login.addEventListener('click', () => {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;
  
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(response => {
      const containerLogin = document.getElementById('containerLogin');
      containerLogin.style.display = 'none';
      document.getElementById('containerPost').innerHTML = window.location.href = 'post.html';
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


/*Inicio de seción con google*/

btnGoogle.addEventListener('click', ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    
    // ...
  })
  .then(response => {
    const containerLogin = document.getElementById('containerLogin');
    containerLogin.style.display = 'none';
    document.getElementById('containerPost').innerHTML = window.location.href = 'post.html';
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
})

/*Inicio de seción con facebook*/

btnFacebook.addEventListener('click', ()=>{
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .then(response => {
    const containerLogin = document.getElementById('containerLogin');
    containerLogin.style.display = 'none';
    document.getElementById('containerPost').innerHTML = window.location.href = 'post.html';
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
})



/*const buttonPost = document.getElementById('buttonPost');

buttonPost.addEventListener('click', ()=>{
  const postValue = document.getElementById('postArea').value;
  const newPostKey = firebase.database().ref().child('post').push().key;
  const loginUsers = firebase.auth().currentUser;
  firebase.database().href(`post/${newPostKey}`).set({
    postURL : postValue,
    creatorName: currentUser.displayName,
    creator : currentUser.uid,
})
})*/


