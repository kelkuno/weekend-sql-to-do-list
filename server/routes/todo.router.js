const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');

//GET
todoRouter.get('/', (req,res)=>{
    console.log('GET request for tasks');
    let queryText = `
    SELECT * FROM "task-list"
    ORDER BY "id";
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
    INSERT INTO "task-list"("task","complete")
    VALUES($1, $2);
    `
    let queryValues = [
        req.body.task,
        req.body.complete
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

//PUT
todoRouter.put('/:id', (req,res)=>{
    const id=req.params.id;
    let queryText=`
    UPDATE "task-list"
    SET "complete" = CASE 
    WHEN "complete" = true
    THEN false ELSE true END
    WHERE "id" = $1;
    `
    pool.query(queryText, [id])
        .then(result=>{
            res.sendStatus(200);
        }).catch(err =>{
            console.log(err);
            res.sendStatus(500);
        })
})

module.exports = todoRouter; //what is this line doing
