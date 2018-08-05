/* MANIPULACIÓN DEL DOM */
const posts = document.getElementById('divPosts'),
  //Acá se almacenará el valor del boby del post
  post = document.getElementById('card-text'),
  btnlogout = document.getElementById('logout'),
  btnSave = document.getElementById('btnSave'),
  btnPublic = document.querySelector('#btn-public'),
  btnPrivate = document.querySelector('#btn-private'),
  nameUser = document.querySelector('.card-title')

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
      // console.log(user);
      postData.uid = user.uid;
      postData.author = user.displayName;
      nameUser.textContent = postData.author
      // console.log(postData);
      // console.log('El usuario esta logueado');

    } else {
      location.href = 'index.html'
      // console.log('No logueado.');
    }
  });

  getPost()
    .then(result => {
      const postsList = result.val();
      // console.log(postsList);

      for (let unitPost in postsList) {
        console.log(unitPost);
        
        console.log(postsList[unitPost]);
        
        let draw = `
        <h6>${postsList[unitPost].author}</h6>
        <textarea>${postsList[unitPost].body}</textarea>
          <br>
          <button id='${unitPost}'>Editar</button>
          <button id='${unitPost}'>Eliminar</button>`
        // console.log(posts);
        posts.innerHTML += draw;
      }
    });
    btnPublic.checked = true;

}

btnSave.addEventListener('click', () => {
  console.log('funciono')
  const userId = firebase.auth().currentUser.uid;
  // console.log(post.value)
  postData.body = post.value
  console.log(postData.body)
  const newPost = writeNewPost(postData);
  console.log(userId);


  const btnUpdate = document.createElement("input");
  btnUpdate.setAttribute("value", "Update");
  btnUpdate.setAttribute("type", "button");
  const btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Delete");
  btnDelete.setAttribute("type", "button");

  reload_page();
  //const contPost = document.createElement('div');
  //const textPost = document.createElement('textarea')
  //textPost.setAttribute("id", newPost);

  //textPost.innerHTML = post.value;

  btnDelete.addEventListener('click', () => {

    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    firebase.database().ref().child('posts/' + newPost).remove();

    // while (contPost.firstChild) contPost.removeChild(contPost.firstChild);

    alert('Eliminar posts!');
    reload_page();

  });

  btnUpdate.addEventListener('click', () => {
    const newUpdate = document.getElementById(newPost);
    const nuevoPost = {
      body: newUpdate.value,
    };

    const updatesUser = {};
    const updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
    updatesPost['/posts/' + newPost] = nuevoPost;

    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);

  });
  /* 
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    posts.appendChild(contPost); */

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

/* Hacemos que el div escuche el evento */
posts.addEventListener('click', (e) => {

  /*<h6>${postsList[unitPost].author}</h6>
  <textarea class = 'textBody'>${postsList[unitPost].body}</textarea>
    <br>
    <button id='${unitPost}'>Editar</button>
    <button id='${unitPost}'>Eliminar</button>`*/
    
 
console.log(e.target.textContent)
if(e.target.nodeName  === 'BUTTON' && e.target.textContent === 'Editar'){
  console.log(postData)
  // editPost(e.target.id,postData)
} 

} )