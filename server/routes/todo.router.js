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

//POST
todoRouter.post('/', (req,res) =>{
    let queryText = `
    INSERT INTO "task-list"("task")
    VALUES($1);
    `
    let queryValues = [
        req.body.task
    ]

    pool.query(queryText, queryValues)
        .then(results => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

//DELETE
todoRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `
    DELETE FROM "task-list"
    WHERE "id" = $1;
    `
    pool.query(queryText, [id])
        .then(result =>{
            res.sendStatus(204);
        }).catch(err=> {
            console.log(err);
            res.sendStatus(500);
        })
})

module.exports = todoRouter; //what is this line doing
