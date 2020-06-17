const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {res.send('Hello! this is EMS app.')});

require('./backend/routes/expenses.route.js')(app);
require('./backend/routes/users.route.js')(app);
require('./backend/routes/categories.route.js')(app);

app.listen(port, err => {
    if(err){
        console.log('There was a problem', err);
        return;
    }
    console.log(`Server started at ${port}`);
    console.log('Hello welcome to Ems app');
    console.log('The Expense management app');
});

