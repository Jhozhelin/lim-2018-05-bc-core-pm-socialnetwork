 //Aquí conecto este proyecto con firebase
 const config = {
  apiKey: "AIzaSyDI-aVXfUHJ1AbWbag7vv5NcVR6nm3xH5s",
  authDomain: "login-red-social-d1b3e.firebaseapp.com",
  databaseURL: "https://login-red-social-d1b3e.firebaseio.com",
  projectId: "login-red-social-d1b3e",
  storageBucket: "login-red-social-d1b3e.appspot.com",
  messagingSenderId: "786540325191"
};
firebase.initializeApp(config);

//**************DOM con index.html**************

//Variables que me conectan con index.html
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');

/*Elementos*/
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
//Acá vincularé el login al register
const createCuenta = document.getElementById('createCuenta');
//Acá vincularé el register al login
const initSesion = document.getElementById('initSesion');

/**Link para iniciar sesión**/
initSesion.addEventListener('click', () =>{
  const boxRegister = document.getElementById('boxRegister');
  const boxLogin = document.getElementById('boxLogin');
  boxLogin.style.display = 'block';
  boxRegister.style.display = 'none';
})

/**Link para crear cuenta**/
createCuenta.addEventListener('click', () =>{
  const boxRegister = document.getElementById('boxRegister');
  const boxLogin = document.getElementById('boxLogin');
  boxRegister.style.display = 'block';
  boxLogin.style.display = 'none';
})

/*Registro de nuevos usuarios*/
btnRegister.addEventListener('click', () => {
  const emailRegister = document.getElementById('email').value;
  const createPassword = document.getElementById('createPassword').value;
  register(emailRegister, createPassword )
  console.log('usuario registrado')
})

/*Inicio de sesión con correo*/
btnLogin.addEventListener('click', () => {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value; 
  signIn(loginEmail,loginPassword)
})


/*Inicio de seción con google*/
btnGoogle.addEventListener('click', ()=>{
google()
})

/*Inicio de seción con facebook*/

btnFacebook.addEventListener('click', ()=>{
  console.log("aaqquiiii")
  facebook()
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

