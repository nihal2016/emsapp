const express = require('express');
const app = express();
const port = 3002;

app.listen(port, () => {
    console.log(`Server started at ${port}`);
    console.log('Hello welcome to Ems app');
    console.log('The Expense management app');
});

app.get('/', (req, res) => {res.send('Hello! this is EMS app.')});

app.get('/show', (req, res) => {res.send('show: This is a Expense managment app.')});
