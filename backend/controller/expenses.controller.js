//import expense model module for expense obejct.
const Expense = require('../models/expenses.model');

// import request configuration module to track req object.
const reqConfig = require('../config/request.config');

// Create and save a new expense.
exports.create = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First validate the reqest.
    if (!req.body) {
        console.debug('Post: expense Request body is empty');
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    // Now create expense
    const expense = new Expense({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        amount: req.body.amount,
        createdAt: req.body.createdAt
    });

    // Finally sava the expense into the database.
    Expense.create(expense, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Something gone wrong while creating the expense'
            });
        else res.send(data);
    });
};

// Find a expense with id.
exports.findOne = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Fetch the expense from database
    Expense.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no expense with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error occured while retriving the expense with id ${req.params.id}.`
                });
            }
        }
        else res.send(data);
    });
};

// Find All expenses for category
exports.findAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // fetch the expense from database.
    Expense.getAll(req.params.category, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no expense present please create new expense.'
                });
            } else {
                res.status(500).send({
                    message: 'Error occured while retriving the expenses.'
                });
            }
        }
        else res.send(data);
    });
};

// Delete expense with id
exports.delete = (req, res) => {

    // Track request.
    reqConfig.details(req);

    //remove expense from database
    Expense.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no expense found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not delete expense with id ${req.params.id}.`
                });
            }
        } else res.send({
            message: `expense with id ${req.params.id} deleted successfully!`
        });
    });
};

// Delete all expenses for category.
exports.deleteAll = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // Remove expenses from database
    Expense.removeAll(req.params.category, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'There is no expense present please create new expense.'
                });
            }
            else {
                res.status(500).send({
                    message: 'Could not delete expenses for you.'
                })
            }
        } else res.send({
            message: 'All expenses deleted successfully!'
        });
    })
}

// 
exports.update = (req, res) => {

    // Track request.
    reqConfig.details(req);

    // First Validate the request
    if (!req.body) {
        console.debug('Put: expense request body is empty');
        res.status(400).send({
            message: 'Content can not be empty'
        });
    }

    // Synchronize new expense with existing.
    const expense = new Expense({
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        updatedAt: req.body.updatedAt
    })

    // Update changes in database.
    Expense.change(expense, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `There is no expense found with id ${expense.id}.`
                });
            } else {
                res.status(500).send({
                    message: `could not update expense with id ${expense.id}.`
                });
            }
        } else res.send({
            message: `expense with id ${expense.id} updated successfully!`
        });
    });
};