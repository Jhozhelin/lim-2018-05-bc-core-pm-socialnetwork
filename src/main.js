/*Elementos*/
const box = document.getElementById('containerLogin');
const button = document.getElementById('buttonEnter');
const logininput = document.getElementById('loginEmail').value;
const loginpassword = document.getElementById('loginEmail').value;
const register = document.getElementById('buttonregister');
const boxWellcome = document.getElementById('wellcome');

register.addEventListener('click', register =()=>{
  const createUser = document.getElementById('createEmail').value;
  const createPassword = document.getElementById('createPassword').value;
  firebase.auth().createUserWithEmailAndPassword(createUser, createPassword)
    .then(register => {
      boxWellcome.style = "display:block";
    })
  .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })
})
