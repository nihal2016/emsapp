//import category model module for category obejct.
const Category = require('../models/category.model');

// import request configuration module to track req object.
const reqConfig = require('../config/request.config');

// Create and save a new Category.
exports.create = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First validate the reqest.
    if (!req.body) {
        console.debug('Post: Category Request body is empty');
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    // Now create Category
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        createdAt: req.body.createdAt,
        createdBy: req.body.createdBy
    });

    // Finally sava the category into the database.
    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Something gone wrong while creating the Category'
            });
        else res.send(data);
    });
};

// Find a category with id.
exports.findOne = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Fetch the category from database
    Category.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no Category with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error occured while retriving the category with id ${req.params.id}.`
                });
            }
        }
        else res.send(data);
    });
};

// Find All Categories for user
exports.findAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // fetch the category from database.
    Category.getAll(req.params.user, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no category present please create new category.'
                });
            } else {
                res.status(500).send({
                    message: 'Error occured while retriving the categories.'
                });
            }
        }
        else res.send(data);
    });
};

// Delete category with id
exports.delete = (req, res) => {

    // Track request.
    reqConfig.details(req);

    //remove category from database
    Category.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no category found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not delete category with id ${req.params.id}.`
                });
            }
        } else res.send({
            message: `Category with id ${req.params.id} deleted successfully!`
        });
    });
};

// Delete all categories for user.
exports.deleteAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Remove categories from database
    Category.removeAll(req.params.user, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no category present please create new category.'
                });
            }
            else {
                res.status(500).send({
                    message: 'Could not delete categories for you.'
                })
            }
        } else res.send({
            message: 'All Categories deleted successfully!'
        });
    })
}

// 
exports.update = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First Validate the request
    if (!req.body) {
        console.debug('Put: Category request body is empty');
        res.status(400).send({
            message: 'Content can not be empty'
        });
    }

    // Synchronize new Category with existing.
    const category = new Category({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        createdBy: req.body.createdBy,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    })

    // Update changes in database.
    Category.change(category, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no category found with id ${category.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not update category with id ${category.id}.`
                });
            }
        } else res.send({
            message: `Category with id ${category.id} updated successfully!`
        });
    });
};