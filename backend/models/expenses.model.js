// import connection module to get databse connection.
const sql = require('./connection')

// Model constructor for expense 
const Expense = function (expense) {
    this.id = expense.id,
        this.name = expense.name,
        this.category = expense.category,
        this.description = expense.description,
        this.amount = expense.amount,
        this.createdAt = expense.createdAt,
        this.updatedAt = expense.updatedAt
}

// Create new expense
Expense.create = (expense, result) => {

    // Run Inser query to create new expense.
    sql.query("INSERT INTO expenses SET ?", expense, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // expense persisted
        console.info('Created expense: ', { id: res.insertId, ...expense });
        result(null, { id: res.insertId, ...expense });
    });
};

// Retrieve expense
Expense.findById = (id, result) => {

    // Run Select query for reterieving the expense.
    sql.query(`SELECT * FROM expenses WHERE id = ${id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No expense found with id
        if (res.length) {
            console.info('Found expense: ', res[0]);
            result(null, res[0]);
            return;
        }

        // expense reterieved
        console.debug(`Get: no expense found with id ${id}`);
        result({ kind: 'not_found' }, null);
    })
};

// Retrieve expenses
Expense.getAll = (category, result) => {

    // Run Select query for reterieving the expenses.
    sql.query(`SELECT * FROM expenses WHERE category = ${category}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No expenses found with id
        if (res.length) {
            console.info('Found expenses: ', res);
            result(null, res);
            return;
        }

        // expenses reterieved
        console.debug(`Get All: No expenses found for category ${category}.`);
        result({ kind: 'not_found' }, null);
    })
}

// Remove expense
Expense.remove = (id, result) => {

    // Run delete query to delete the expense
    sql.query(`DELETE FROM expenses WHERE id = ${id}`, id, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // expense not found
        if (res.affectedRows == 0) {
            console.debug(`Delete: No expense found with id ${id}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // Categoty deleted
        console.info(`Delete: Deleted expense with id ${id}`);
        result(null, res);

    });
};

// Remove expenses
Expense.removeAll = (category, result) => {

    // Run delete query to delete the expenses
    sql.query(`DELETE FROM expenses WHERE category = ${category}`, (err, res) => {

        // Error occured from databse
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // expenses not found
        if (res.affectedRows == 0) {

            console.debug(`Delete: No expenses found for categoryId ${category}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // All expenses removed
        console.info(`Delete All: Deleted all expenses with categoryId ${category}`);
        result(null, res);

    });
}

// Change expense
Expense.change = (expense, result) => {

    //validate expense
    sql.query(`SELECT * FROM expenses WHERE id = ${expense.id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No expense found with id
        if (res.length) {

            // Run update query to change the expense
            sql.query("UPDATE expenses SET ?", expense, (err, res) => {

                // Error occured
                if (err) {
                    console.error('error: ', err);
                    result(err, null);
                    return;
                }

                // expense changed
                console.info(`put: Updated expense with categoryId ${expense.id}`);
                result(null, res);

            });
        } else{
            // expense not found
        console.debug(`put: no expense found with id ${expense.id}`);
        result({ kind: 'not_found' }, null);
        }
        
    })

}

module.exports = Expense;
