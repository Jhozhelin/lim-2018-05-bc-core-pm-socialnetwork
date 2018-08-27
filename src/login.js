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
initSesion.addEventListener('click', () => {
  const boxRegister = document.getElementById('boxRegister');
  const boxLogin = document.getElementById('boxLogin');
  boxLogin.style.display = 'block';
  boxRegister.style.display = 'none';
})

/**Link para crear cuenta**/
createCuenta.addEventListener('click', () => {
  const boxRegister = document.getElementById('boxRegister');
  const boxLogin = document.getElementById('boxLogin');
  boxRegister.style.display = 'block';
  boxLogin.style.display = 'none';
})

/*Registro de nuevos usuarios*/
btnRegister.addEventListener('click', () => {
  const userName = document.getElementById('userName').value
  const emailRegister = document.getElementById('email').value;
  const createPassword = document.getElementById('createPassword').value;
  register(userName, emailRegister, createPassword)
  console.log('usuario registrado')
})

/*Inicio de sesión con correo*/
btnLogin.addEventListener('click', () => {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;
  signIn(loginEmail, loginPassword)
})


/*Inicio de seción con google*/
btnGoogle.addEventListener('click', () => {
  google()
})

/*Inicio de seción con facebook*/

btnFacebook.addEventListener('click', () => {
  console.log("aaqquiiii")
  facebook()
});


//validación correo en iniciar sesión 
document.getElementById('loginEmail').addEventListener('input', () => {
  campo = event.target
  console.log(event.target);
  
  valido = document.getElementById('loginAlert');

  loginRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (loginRegex.test(campo.value)) {
    valido.innerText = "Correo correcto";
  } else {
    valido.innerText = "Ingrese un correo con @ y .com";
  }
})


//validación de  la contraseña para iniciar sesión
document.getElementById('loginPassword').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('passwordAlert');

  emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,10})$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Contraseña correcta";
  } else {
    valido.innerText = "Mínimo 6 digitos entre letras y números"
  }
})


//validación correo en iniciar sesión 
document.getElementById('email').addEventListener('input', () => {
  campo = event.target
  console.log(event.target);
  
  valido = document.getElementById('signInAlert')

  loginRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

  if (loginRegex.test(campo.value)) {
    valido.innerText = "Correo correcto"
  } else {
    valido.innerText = "Ingrese un correo con @ y .com"
  }
})


//validación de  la contraseña para iniciar sesión
document.getElementById('createPassword').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('signInPassword');

  emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,10})$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Contraseña correcta"
  } else {
    valido.innerText = "Mínimo 6 digitos entre letras y números"
  }
})