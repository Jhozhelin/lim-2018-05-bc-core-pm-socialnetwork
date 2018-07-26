describe('Post', () => {
  describe('createPost', () => {
    it('es una funcion', () => {
      assert.isFunction(createPost);
    });
    it('funciona', () => {
      createPost((error, response) => {
        if (error) {
          console.error(error)
        } else {
          console.log(response)
        }
      })
    });
  });
});
