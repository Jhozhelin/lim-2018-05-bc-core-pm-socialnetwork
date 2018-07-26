window.createPost = (cb) => {
    firebase.database().ref('/users/').once('value')
        .then(function(snapshot) {      
            cb(null, snapshot.val());
        })
        .catch(function(error) {
            cb(error);
        });
}
