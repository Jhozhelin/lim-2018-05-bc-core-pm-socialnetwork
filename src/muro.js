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
  reloadPage = document.getElementsByClassName('reloadPage')


let postData = {
  uid: null,
  body: null,
  author: null,
  state: 'public',
  starCount: 0
}



window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      postData.uid = user.uid
      postData.author = user.displayName
      nameUser.textContent = postData.author



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
  getPost()
    .then(result => {
      // reloadPage.style.display = 'none'
      //const postsList = unitPost
      const postsList = result.val()
      profileDiv.innerHTML = ''
      posts.innerHTML = ''

      for (let unitPost in postsList) {


        let draw = `<div id= card-contend '${unitPost}'class="card w-75" >
    <h4>${postsList[unitPost].author}</h4>
    <textarea   id='text-${unitPost}'   cols= '60' rows= '6 '>${postsList[unitPost].body}</textarea>
      <br>`

        if (view === 'Muro') {
          draw += `<button id=${unitPost} value='Me gusta'>Me gusta ${postsList[unitPost].starCount}</button>`
          console.log('hola')

          profileDiv.innerHTML += draw
        }

        else if (view === 'Perfil') {
          draw += `<button id=${unitPost}>Editar</button>
            <button id=${unitPost}>Eliminar</button>`

          posts.innerHTML += draw

        }

      }

    })

}
btnPublic.checked = true



//profileDiv escuchando el evento para llama a la función like
profileDiv.addEventListener('click', (event) => {
  // console.log(profileDiv) 

  const idPost = event.target.id

  const idUser = postData.uid

  if (event.target.nodeName === 'BUTTON' && event.target.value === 'Me gusta') {
    console.log('llamar a la función de me gusta')
    likePost(idUser, idPost)
    alert('Le diste Me ggusta 👍')
    reload_page()
  }


})



//divPost escuchando el evento para llamr a las funciones eliminar y editar
posts.addEventListener('click', (event) => {
  console.log(posts)

  //console.log(document.getElementById(`text-${event.target.id}`).textContent)

  const idPost = event.target.id
  console.log(idPost)

  const idUser = postData.uid
  console.log(idUser)

  if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Editar') {
    console.log('llamar a la fun  ción de editar posts')
    //console.log(postId)
    const textPost = document.getElementById(`text-${event.target.id}`).value
    //console.log(postData.uid )
    const idUser = postData.uid
    console.log(idUser)


    editPost(idUser, textPost, idPost)
    alert('Se edito correctamente')
    reload_page()


  } else if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'Eliminar') {
    console.log('llamar a la función de eliminar posts')

    deletePost(idUser, idPost)
    alert('Se elimino correctamente')
    reload_page()

  }
})


//*********función de publicar//**********

btnToPost.addEventListener('click', () => {
  const userId = firebase.auth().currentUser.uid
  postData.body = post.value
  const newPost = writeNewPost(postData)

  reload_page()


})

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
