// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const PORT = 5000;
//declare route variable
const todoRouter = require('./routes/todo.router');

// express static file serving - public is the folder name
app.use(express.static('server/public'));

//You need this line of code otherwise your req.body
//will be undefined. 
app.use(express.urlencoded({extended : true}));

//ROUTES
app.use('/todo', todoRouter);

// Start up our server aka
//// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});