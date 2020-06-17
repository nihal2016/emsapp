// export to fetch the requests at app.
module.exports = app => {

    // Import Category Controller to route specific module.
    const categories = require('../controller/category.controller');

    // Create a new Category
    app.post('/category', categories.create);

    //Retrieve single category with category id
    app.get('/category/:id', categories.findOne);

    // Retrieve Categories for the user
    app.get('/categories/:user', categories.findAll);

    // Delete Category 
    app.delete('/category/:id', categories.delete);

    // Delete all categories for the user
    app.delete('/categories/:user', categories.deleteAll);

    // Update category with category id
    app.put('/category', categories.update);
};