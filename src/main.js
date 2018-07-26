 // Initialize Firebase
 const config = {
  apiKey: "AIzaSyDI-aVXfUHJ1AbWbag7vv5NcVR6nm3xH5s",
  authDomain: "login-red-social-d1b3e.firebaseapp.com",
  databaseURL: "https://login-red-social-d1b3e.firebaseio.com",
  projectId: "login-red-social-d1b3e",
  storageBucket: "login-red-social-d1b3e.appspot.com",
  messagingSenderId: "786540325191"
};
firebase.initializeApp(config);

/*Elementos*/
const login = document.getElementById('buttonEnter');
const register = document.getElementById('buttonregister');
const btnGoogle = document.getElementById('btnGoogle');
const createCuenta = document.getElementById('createCuenta');
const btnFacebook = document.getElementById('btnFacebook');
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

// Link para Crear cuenta nueva
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
  console.log("aaqquiiii")
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    
    // ...
  })
  .then(response => {
    console.log("567576576565")
    const containerLogin = document.getElementById('containerLogin');
    containerLogin.style.display = 'none';
    window.location.href = 'post.html';
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
 });
  /*firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .then(response => {
    const containerLogin = document.getElementById('containerLogin');
    containerLogin.style.display = 'none';
    console.log('aqui')
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
  });*/
})

