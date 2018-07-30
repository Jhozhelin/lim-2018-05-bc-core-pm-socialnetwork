const config = {
  apiKey: "AIzaSyDI-aVXfUHJ1AbWbag7vv5NcVR6nm3xH5s",
  authDomain: "login-red-social-d1b3e.firebaseapp.com",
  databaseURL: "https://login-red-social-d1b3e.firebaseio.com",
  projectId: "login-red-social-d1b3e",
  storageBucket: "login-red-social-d1b3e.appspot.com",
  messagingSenderId: "786540325191"
};
firebase.initializeApp(config);

// declarar la viable de tu cuadro de texto entrante, crear en tu html un contenedor
const contenedorPost=document.getElementById("contentPost");
const postArea=document.getElementById("postArea")
const cuadroTexto=document.createElement("div")
const textoPost= document.createElement("textarea");
const btnEdit=document.createElement("button");
const btnRemove=document.createElement("button");
const buttonPost = document.getElementById('buttonPost');


  
const crearPost=(valor)=>{
// conun appenchild vaas a crear donde se va a mostrar tu tecto --- textarea(muestra tu texto), dos botones,editar y eliminar

textoPost.textContent=valor;
textoPost.className='boxPost';

btnEdit.textContent='Editar';
btnEdit.className='btnEdit';

btnRemove.textContent='Eliminar';
btnRemove.className='btnRemove';

cuadroTexto.appendChild(textoPost);
cuadroTexto.appendChild(btnEdit); /*boton para editar*/
cuadroTexto.appendChild(btnRemove); /*boton para eliminar*/
contenedorPost.appendChild(cuadroTexto); /*caja de contenido de post*/

}
buttonPost.addEventListener('click', ()=>{   console.log('diste click');    
crearPost(postArea.value)
  firebase.database().ref('users/').set({
    text : postArea.value,
    // userId : userId ,
    // email: email,

})

firebase.database().ref('/users/').once('value').then(function(snapshot) {    
    console.log(snapshot.val());
    
});



btnEdit.addEventListener('click', ()=>{
  console.log('disteclick');
});

btnRemove.addEventListener('click', ()=>{
console.log('borreste todos yea');
});


$(btnRemove).ready(function(){
  $("button").click(function(){
      $("boxPost").remove();
  });
});


})
