// import connection module to get databse connection.
const sql = require('./connection')

// Model constructor for category 
const Category = function (category) {
    this.id = category.id,
        this.name = category.name,
        this.description = category.description,
        this.createdBy = category.createdBy,
        this.createdAt = category.createdAt,
        this.updatedAt = category.updatedAt
}

// Create new category
Category.create = (category, result) => {

    // Run Inser query to create new Category.
    sql.query("INSERT INTO categories SET ?", category, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // Category persisted
        console.info('Created category: ', { id: res.insertId, ...category });
        result(null, { id: res.insertId, ...category });
    });
};

// Retrieve category
Category.findById = (id, result) => {

    // Run Select query for reterieving the category.
    sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No category found with id
        if (res.length) {
            console.info('Found category: ', res[0]);
            result(null, res[0]);
            return;
        }

        // Category reterieved
        console.debug(`Get: no category found with id ${id}`);
        result({ kind: 'not_found' }, null);
    })
};

// Retrieve categories
Category.getAll = (user, result) => {

    // Run Select query for reterieving the categories.
    sql.query(`SELECT * FROM categories WHERE createdBy = ${user}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No categories found with id
        if (res.length) {
            console.info('Found categories: ', res);
            result(null, res);
            return;
        }

        // Categories reterieved
        console.debug(`Get All: No categories found for user ${user}.`);
        result({ kind: 'not_found' }, null);
    })
}

// Remove category
Category.remove = (id, result) => {

    // Run delete query to delete the category
    sql.query(`DELETE FROM categories WHERE id = ${id}`, id, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // Category not found
        if (res.affectedRows == 0) {
            console.debug(`Delete: No category found with id ${id}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // Categoty deleted
        console.info(`Delete: Deleted Category with id ${id}`);
        result(null, res);

    });
};

// Remove categories
Category.removeAll = (user, result) => {

    // Run delete query to delete the categories
    sql.query(`DELETE FROM categories WHERE createdBy = ${user}`, (err, res) => {

        // Error occured from databse
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // Categories not found
        if (res.affectedRows == 0) {

            console.debug(`Delete: No categories found for userId ${user}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // All Categories removed
        console.info(`Delete All: Deleted all Categories with userId ${user}`);
        result(null, res);

    });
}

// Change category
Category.change = (category, result) => {

    //validate category
    sql.query(`SELECT * FROM categories WHERE id = ${category.id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No category found with id
        if (res.length) {

            // Run update query to change the category
            sql.query("UPDATE categories SET ?", category, (err, res) => {

                // Error occured
                if (err) {
                    console.error('error: ', err);
                    result(err, null);
                    return;
                }

                // Category changed
                console.info(`put: Updated category with userId ${category.id}`);
                result(null, res);

            });
        } else{
            // Category not found
        console.debug(`put: no category found with id ${category.id}`);
        result({ kind: 'not_found' }, null);
        }
        
    })

}

module.exports = Category;
