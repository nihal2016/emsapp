// export to fetch the requests at app.
module.exports = app => {

    // Import user Controller to route specific module.
    const users = require('../controller/users.controller');

    // Create a new user
    app.post('/user', users.create);

    //Retrieve single user with user id
    app.get('/user/:id', users.findOne);

    // Retrieve users
    app.get('/users', users.findAll);

    // Delete user 
    app.delete('/user/:id', users.delete);

    // Delete all users
    app.delete('/users', users.deleteAll);

    // Update user with user id
    app.put('/user', users.update);
};