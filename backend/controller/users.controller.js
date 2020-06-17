//import user model module for user obejct.
const User = require('../models/users.model');

// import request configuration module to track req object.
const reqConfig = require('../config/request.config');

// Create and save a new user.
exports.create = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First validate the reqest.
    if (!req.body) {
        console.debug('Post: user Request body is empty');
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    // Now create user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        createdAt : req.body.createdAt
    });

    // Finally sava the user into the database.
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Something gone wrong while creating the user'
            });
        else res.send(data);
    });
};

// Find a user with id.
exports.findOne = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Fetch the user from database
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error occured while retriving the user with id ${req.params.id}.`
                });
            }
        }
        else res.send(data);
    });
};

// Find All users
exports.findAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // fetch the user from database.
    User.getAll((err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no user present please create a new user.'
                });
            } else {
                res.status(500).send({
                    message: 'Error occured while retriving the users.'
                });
            }
        }
        else res.send(data);
    });
};

// Delete user with id
exports.delete = (req, res) => {

    // Track request.
    reqConfig.details(req);

    //remove user from database
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no user found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not delete user with id ${req.params.id}.`
                });
            }
        } else res.send({
            message: `user with id ${req.params.id} deleted successfully!`
        });
    });
};

// Delete all users for user.
exports.deleteAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Remove users from database
    User.removeAll((err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no user present please create new user.'
                });
            }
            else {
                res.status(500).send({
                    message: 'Could not delete users for you.'
                })
            }
        } else res.send({
            message: 'All users deleted successfully!'
        });
    })
}

// 
exports.update = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First Validate the request
    if (!req.body) {
        console.debug('Put: user request body is empty');
        res.status(400).send({
            message: 'Content can not be empty'
        });
    }

    // Synchronize new user with existing.
    const user = new user({
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        updatedAt : req.body.updatedAt
    })

    // Update changes in database.
    User.change(user, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no user found with id ${user.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not update user with id ${user.id}.`
                });
            }
        } else res.send({
            message: `user with id ${user.id} updated successfully!`
        });
    });
};