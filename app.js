// constants
const PORT = process.env.PORT || 3000;

// imports
const express = require('express');

const userRouter = require('./routes/users');

// middlewares
const app = express();

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

// running server code
app.listen(PORT, (error) => {
    if(error)
       return console.log(`Error running server on PORT: [${PORT}]`);
    console.log(`Server running on PORT: [${PORT}]`);
});