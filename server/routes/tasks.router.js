const express = require('express');

const tasksRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
// Pool and new... Constructor
const pool = new Pool({
    database: 'weekend-to-do-app', // THIS CAN AND WILL CHANGE
    host: 'localhost',
    port: 5432,
});

tasksRouter.get('/', (req,res) => {
  let queryText = `
  SELECT * FROM "tasks"
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
});

tasksRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  let queryText= `
  UPDATE "tasks"
  SET "isdone" = TRUE
  WHERE "id" = $1;
  `;

  pool.query(queryText, [id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

tasksRouter.post('/', (req, res) => {
  let queryText = `
  INSERT INTO "tasks" 
	("nameoftask", "isdone") 
  VALUES 
	($1, FALSE);
  `

  pool.query(queryText, [req.body.task])
    .then(results =>{
      res.sendStatus(200);
    }).catch(err =>{
      console.log(err);
      res.sendStatus(500);
    })
})

tasksRouter.delete('/:id', (req, res) =>{
  const id = req.params.id;
  let queryText = `
  DELETE FROM "tasks"
  WHERE "id" = $1;
  `;

  pool.query(queryText, [id])
    .then(result =>{
      res.sendStatus(200);
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
})


module.exports = tasksRouter;