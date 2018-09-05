/* MANIPULACIÓN DEL DOM */
const posts = document.getElementById('divPosts'),
  //Acá se almacenará el valor del boby del post
  post = document.getElementById('card-text'),
  btnlogout = document.getElementById('logout'),
  btnToPost = document.getElementById('btnSave'),
  btnPublic = document.querySelector('#btn-public'),
  btnPrivate = document.querySelector('#btn-private'),
  nameUser = document.querySelector('.card-title'),
  profileDiv = document.getElementById('profile'),
  reloadPage = document.getElementsByClassName('reloadPage'),
  wallTab = document.getElementById('wall-tab')


let postData = {
  uid: null,
  body: null,
  author: null,
  state: 'public',
  starCount: 0
}

/****************** función de crear usuario******************/

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      postData.uid = user.uid

      console.log(user);

      firebase.database().ref(`users/${user.uid}/`).once('value')
        .then(result => {
          nameUser.textContent = result.val().username
          postData.author = result.val().username

          console.log(postData.author);
        })


    } else {
      location.href = 'index.html'
    }
  })


  //showPosts('Muro')
  //showPosts('Perfil')




}

//mostrar la información en el Muro
const contHome = document.getElementById('wall-tab')
contHome.addEventListener('click', () => {
  showPosts('Muro')

})


//mostrar la información en el Perfil 
const contProfile = document.getElementById('profile-tab')
contProfile.addEventListener('click', () => {
  showPosts('Perfil')

})

//tomamos la función de los posts para mostrar la imformación de Muro y Perfil
const showPosts = (view) => {
  // reloadPage.style.display = 'block'
  if (view === 'Muro') {
    profileDiv.innerHTML = ''
    posts.innerHTML = ''

    firebase.database().ref("posts").orderByChild("state")
      .equalTo('public').on("child_added", function (snapshot) {
        // console.log(snapshot.key);
        //   getPost()
        //     .then(result => {
        //       // reloadPage.style.display = 'none'
        //       // const postsList = unitPost
        console.log(snapshot.val());

        const postsList = snapshot.val()
        //console.log(postsList);

        console.log(postsList);


        let draw = `<div id= card-contend '${postsList.id}'class="card w-75" >
    <h4>${postsList.author}</h4>
    <textarea   id='text-${postsList.id}'   cols= '60' rows= '6 '>${postsList.body}</textarea>
      <br>`


        draw += `<button id=${postsList.id} value='Me gusta'>Me gusta ${postsList.starCount}</button>`

        profileDiv.innerHTML += draw

      })
  }
  else if (view === 'Perfil') {



    firebase.database().ref(`user-posts/${postData.uid}/`).once('value')
      .then(result => {
        // reloadPage.style.display = 'none'
        // const postsList = unitPost
        const postsList = result.val()
        //console.log(postsList);

        profileDiv.innerHTML = ''
        posts.innerHTML = ''

        for (let unitPost in postsList) {


          let draw = `<div id= card-contend '${unitPost}'class="card w-75" >
    <h4>${postsList[unitPost].author}</h4>
    <textarea   id='text-${unitPost}'   cols= '60' rows= '6 'disabled>${postsList[unitPost].body}</textarea>
      <br>`


      draw += `<button id= 'edit-${unitPost}' value = 'edit'>Editar</button>
      <button id= 'save-${unitPost}' value = 'save' style="display: none">Guardar</button>
      <button id= 'delete-${unitPost}' value = 'delete'>Eliminar</button></div>`

          posts.innerHTML += draw
        }
      })
  }
}
btnPublic.checked = true

//profileDiv escuchando el evento para llama a la función like
profileDiv.addEventListener('click', (event) => {
  // console.log(profileDiv) 

  const idPost = event.target.id
  console.log(event);

  const idUser = postData.uid

  if (event.target.nodeName === 'BUTTON' && event.target.value === 'Me gusta') {
    console.log('llamar a la función de me gusta')
    likePost(idUser, idPost)
    alert('Le diste Me ggusta 👍')
    reload_page(true);
  }
  // console.log(idUser);
  // console.log(idPost);


})



//divPost escuchando el evento para llamr a las funciones eliminar y editar
posts.addEventListener('click', (event) => {
  console.log(posts)
  

  //console.log(document.getElementById(`text-${event.target.id}`).textContent)

  // const idPost = event.target.id.split('-')[1]
  // console.log("idPost", idPost)
  const idPost = event.target.id.slice(event.target.id.indexOf("-") +1)
  console.log("id",idPost);
  
  const idUser = postData.uid
  // console.log(idUser)
  const textPost = document.getElementById(`text-${idPost}`).value

  if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Editar') {
    console.log('llamar a la función de editar posts')
    console.log(event.target)
    // console.log((`text-${}`));
    document.getElementById(`text-${idPost}`).disabled = false;
    
    console.log(event.target);
    console.log(event.target.id)

    
    document.getElementById(`save-${idPost}`).style.display = "block";
    console.log(event.target.id);

    document.getElementById(`edit-${idPost}`).style.display = "none";
    console.log(event.target.id);

    editPost(idUser, textPost, idPost)

    // console.log(editPost);
    
    /*
    const textPost = document.getElementById(`text-${event.target.id}`).value
    //console.log(postData.uid )
    const idUser = postData.uid
    console.log(idUser)

    

     editPost(idUser, textPost, idPost)
    // });
*/
    //alert('Se edito correctamente')
    //reload_page()

  } else if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Eliminar') {
    console.log('llamar a la función de eliminar posts')
    const idUser = postData.uid
    deletePost(idUser, idPost)
    // reload_p()

  }else if(event.target.nodeName === 'BUTTON' && event.target.textContent === 'Guardar'){
    
    //console.log(postData.uid )
    const idUser = postData.uid
    console.log(idUser)

    

     editPost(idUser, textPost, idPost)
    reload_page()
    // });

  }
})


//*********función de publicar//**********

btnToPost.addEventListener('click', () => {


  if (post.value.trim().length === 0) {

    alert("Tienes que ingresar un texto para publicar")
    return
  }

  const userId = firebase.auth().currentUser.uid
  postData.body = post.value
  const newPost = writeNewPost(postData)
  
  post.value = ""

// console.log(userId);
// console.log(newPost);


});
// // reload_page()
// console.log(userId);
// console.log(postData);
// console.log(newPost);





btnlogout.addEventListener('click', () => {
  logout()
  window.location = 'index.html'
})

function reload_page() {
  window.location.reload()
}

//estado de publico

btnPublic.addEventListener('click', () => {
  postData.state = 'public'

})

//estado de privado
btnPrivate.addEventListener('click', () => {
  postData.state = 'private'

})
