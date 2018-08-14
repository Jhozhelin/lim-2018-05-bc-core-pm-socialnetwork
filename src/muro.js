/* MANIPULACIÓN DEL DOM */
const posts = document.getElementById('divPosts'),
  //Acá se almacenará el valor del boby del post
  post = document.getElementById('card-text'),
  btnlogout = document.getElementById('logout'),
  btnSave = document.getElementById('btnSave'),
  btnPublic = document.querySelector('#btn-public'),
  btnPrivate = document.querySelector('#btn-private'),
  nameUser = document.querySelector('.card-title'),
  profileDiv = document.getElementById('profile')


let postData = {
  uid: null,
  body: null,
  author: null,
  state: 'public',
  starCount: 0
};



window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      postData.uid = user.uid;
      postData.author = user.displayName;
      nameUser.textContent = postData.author



    } else {
      location.href = 'index.html'
    }
  });

  getPost()
    .then(result => {
      //const postsList = unitPost
      const postsList = result.val();
      for (let unitPost in postsList) {





        let draw = `<div id='${unitPost}'>
        <h6>${postsList[unitPost].author}</h6>
        <textarea id='text-${unitPost}'>${postsList[unitPost].body}</textarea>
          <br>
          <button id='${unitPost}'>Editar</button>
          <button id='${unitPost}'>Eliminar</button></div>`

        posts.innerHTML += draw;


      }

    });
  btnPublic.checked = true;

}



//divPost escuchando el evento para llamr a las funciones eliminar y editar
posts.addEventListener('click', (event) => {
  //console.log(document.getElementById(`text-${event.target.id}`).textContent);
  
   const idPost = event.target.id
  console.log(idPost);
  
  const idUser = postData.uid
    console.log(idUser);

  if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Editar') {
    console.log('llamar a la función de editar posts') 
    //console.log(postId)
    const textPost = document.getElementById(`text-${event.target.id}`).value;
    //console.log(postData.uid );
    const idUser = postData.uid
    console.log(idUser);
    

    editPost(idUser, textPost, idPost)
    alert('Se edito correctamente')
    reload_page()    
    

  }
  else if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Eliminar') {
  console.log('llamar a la función de eliminar posts');
  
  deletePost(idUser, idPost)
  alert('Se elimino correctamente')
  reload_page()

  }
})

// const btnEdit = document.getElementById(`btn-edit-${unitPost}`)

// btnEdit.addEventListener('click', () => {


//   // let newUpdate = document.getElementById(newPost);
//   let textoNuevo = document.getElementById(`cuerpoPost-${unitPost}`).value
//   const nuevoPost = {
//     body: textoNuevo,
//   };

//   const updatesUser = {};
//   const updatesPost = {};

//   updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
//   updatesPost['/posts/' + newPost] = nuevoPost;

//   firebase.database().ref().update(updatesUser);
//   firebase.database().ref().update(updatesPost);

// });

//*********función de publicar//**********

btnSave.addEventListener('click', () => {
  const userId = firebase.auth().currentUser.uid;
  postData.body = post.value
  const newPost = writeNewPost(postData);




  reload_page();
  //const contPost = document.createElement('div');
  //const textPost = document.createElement('textarea')
  //textPost.setAttribute("id", newPost);

  //textPost.innerHTML = post.value;

  // btnDelete.addEventListener('click', () => {
  //   // deletePost(postId, uid) 




  //   // while (contPost.firstChild) contPost.removeChild(contPost.firstChild);

  //   // alert('Eliminar posts!');
  //   reload_page();

  // });


})

btnlogout.addEventListener('click', () => {
  logout()
  window.location = 'index.html'
})

function reload_page() {
  window.location.reload();
}


btnPublic.addEventListener('click', () => {
  postData.state = 'public'

})


btnPrivate.addEventListener('click', () => {
  postData.state = 'private'

})