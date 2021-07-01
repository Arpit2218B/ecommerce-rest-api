// constants
const PORT = process.env.PORT || 3000;
const MONGO_URL = 'mongodb+srv://mongo_user:DxxjgWDnxJVoHXIL@practicecluster.vrjo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// imports
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');

// middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/users', userRouter);

// 404 middleware
app.use((req, res) => {
    res
    .status(404)
    .json({
        "status": 404,
        "message": "Resource not found"
    })
})

// error handler middleware
app.use((error, req, res, next) => {
    res
    .status(error.statusCode || 500)
    .json({
        message: error.message || 'Internal server error.'
    });
});

// connecting to mongodb database and running server code
mongoose
.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('> Successfully connected to database');
    app.listen(PORT, (error) => {
        if(error)
           return console.log(`Error running server on PORT: [${PORT}]`);
        console.log(`> Server running on PORT: [${PORT}]`);
    });
})
.catch(err => {
    console.log('Error connecting to mongodb database.', err.message)
});