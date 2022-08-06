const pg = require('pg');
const Pool = pg.Pool;
// Pool and new... Constructor
const pool = new Pool({
    database: 'todo_database', // THIS CAN AND WILL CHANGE
    host: 'localhost',
    port: 5432,
    // max: 10,
    // idleTimeoutMillis: 30000
});