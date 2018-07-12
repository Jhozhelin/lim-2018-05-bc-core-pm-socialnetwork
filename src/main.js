/*Elementos*/
const login = document.getElementById('buttonEnter');
const register = document.getElementById('buttonregister');


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
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
  .then(response=>{
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