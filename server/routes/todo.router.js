const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');

//GET
todoRouter.get('/', (req,res)=>{
    console.log('GET request for tasks');
    let queryText = `
    SELECT * FROM "task-list";
    `;
    pool.query(queryText)
        .then( (result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch( (err) => {
            console.log(err)
            res.sendStatus(500);
        });
})//end of GET

module.exports = todoRouter; //what is this line doing
