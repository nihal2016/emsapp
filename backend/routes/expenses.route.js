// export to fetch the requests at app.
module.exports = app => {

    // Import expense Controller to route specific module.
    const expenses = require('../controller/expenses.controller');

    // Create a new expense
    app.post('/expense', expenses.create);

    //Retrieve single expense with expense id
    app.get('/expense/:id', expenses.findOne);

    // Retrieve expenses for the category
    app.get('/expenses/:category', expenses.findAll);

    // Delete expense 
    app.delete('/expense/:id', expenses.delete);

    // Delete all expenses for the category
    app.delete('/expenses/:category', expenses.deleteAll);

    // Update expense with expense id
    app.put('/expense', expenses.update);
};