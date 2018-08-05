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
   const emailRegister = document.getElementById('email').value;
   const createPassword = document.getElementById('createPassword').value;
   register(emailRegister, createPassword)
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
