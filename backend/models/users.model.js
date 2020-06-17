// import connection module to get databse connection.
const sql = require('./connection')

// Model constructor for User 
const User = function (user) {
    this.id = user.id,
        this.name = user.name,
        this.email = user.email,
        this.phone = user.phone,
        this.password = user.password,
        this.createdAt = user.createdAt,
        this.updatedAt = user.updatedAt
}

// Create new User
User.create = (user, result) => {

    // Run Inser query to create new user.
    sql.query("INSERT INTO users SET ?", user, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // user persisted
        console.info('Created user: ', { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
    });
};

// Retrieve user
User.findById = (id, result) => {

    // Run Select query for reterieving the User.
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No User found with id
        if (res.length) {
            console.info('Found User: ', res[0]);
            result(null, res[0]);
            return;
        }

        // User reterieved
        console.debug(`Get: no User found with id ${id}`);
        result({ kind: 'not_found' }, null);
    })
};

// Retrieve users
User.getAll = (result) => {

    // Run Select query for reterieving the users.
    sql.query('SELECT * FROM users', (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No users found with id
        if (res.length) {
            console.info('Found users: ', res);
            result(null, res);
            return;
        }

        // users reterieved
        console.debug(`Get All: No users found for user ${user}.`);
        result({ kind: 'not_found' }, null);
    })
}

// Remove User
User.remove = (id, result) => {

    // Run delete query to delete the User
    sql.query(`DELETE FROM users WHERE id = ${id}`, id, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // User not found
        if (res.affectedRows == 0) {
            console.debug(`Delete: No User found with id ${id}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // Categoty deleted
        console.info(`Delete: Deleted User with id ${id}`);
        result(null, res);

    });
};

// Remove users
User.removeAll = (result) => {

    // Run delete query to delete the users
    sql.query('DELETE FROM users ', (err, res) => {

        // Error occured from databse
        if (err) {
            console.error('error: ', err);
            result(null, err);
            return;
        }

        // users not found
        if (res.affectedRows == 0) {

            console.debug(`Delete: No users found for userId ${user}.`);
            result({ kind: 'not_found' }, null);
            return;
        }

        // All users removed
        console.info(`Delete All: Deleted all users with userId ${user}`);
        result(null, res);

    });
}

// Change User
User.change = (user, result) => {

    //validate user
    sql.query(`SELECT * FROM users WHERE id = ${user.id}`, (err, res) => {

        // Error occured
        if (err) {
            console.error('error: ', err);
            result(err, null);
            return;
        }

        // No user found with id
        if (res.length) {

            // Run update query to change the user
            sql.query("UPDATE users SET ?", user, (err, res) => {

                // Error occured
                if (err) {
                    console.error('error: ', err);
                    result(err, null);
                    return;
                }

                // user changed
                console.info(`put: Updated user with id ${user.id}`);
                result(null, res);

            });
        } else{
            // user not found
        console.debug(`put: no user found with id ${user.id}`);
        result({ kind: 'not_found' }, null);
        }
        
    })

}

module.exports = User;
