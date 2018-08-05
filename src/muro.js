/* MANIPULACIÓN DEL DOM */
const posts = document.getElementById('divPosts');
const post = document.getElementById('card-text');
const btnlogout = document.getElementById('logout');
const btnSave = document.getElementById('btnSave');

window.onload = () => {
  firebase.auth().onAuthStateChanged( (user) =>{
    if (user) {
      console.log(user);

      console.log('User is signed in.');

    } else {
      location.href = 'index.html'
      console.log('No user is signed in.');
    }
  });

  const getPost = () => {
    firebase.database().ref('/posts/').once('value').then(function (snapshot) {
      const postsList = snapshot.val();
      // console.log(postsList);

      for (let postGeneral in postsList) {
        console.log(postsList[postGeneral]);
        let draw = `<p>${postsList[postGeneral].body}</p>
        <br>
        <button>editar</button>
        <button>Eliminar</button>`
        // console.log(posts);
        posts.innerHTML += draw;
      }


    });
  }
  getPost();

}

function writeNewPost(uid, body) {
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
  };

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;


  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);

  console.log(uid, body)
  return newPostKey;
}

btnSave.addEventListener('click', () => {
  console.log('funciono')
  const userId = firebase.auth().currentUser.uid;
  console.log(post.value)
  const newPost = writeNewPost(userId, post.value);
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

  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  posts.appendChild(contPost);

})

btnlogout.addEventListener('click', () => {
  logout()
  window.location = 'index.html'
})

function reload_page() {
  window.location.reload();
}
