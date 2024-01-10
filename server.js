const express = require("express");
const Recipe = require('./models/recipe');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('connected');
}).catch((err) => {
    console.log(err);
});

app.use(express.json());


app.use('/recipes', routes);


const port = 8000;
app.listen(port, console.log(`listening on port ${port}`));